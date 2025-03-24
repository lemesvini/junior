"use client";

import { useRef, useState, useEffect, ChangeEvent, Suspense } from "react";
import Image from "next/image";
import juniorPng from "../../../public/JUNIOR.png";
import Editor, { OnMount } from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faFloppyDisk,
  faFolderOpen,
  faPlay,
  faTerminal,
  faUsers,
  faCopy
} from "@fortawesome/free-solid-svg-icons";
import { faJs, faReact } from "@fortawesome/free-brands-svg-icons";
import type { editor } from 'monaco-editor';
import { useSearchParams } from 'next/navigation';
import { 
  getDatabase, 
  ref, 
  set, 
  onValue, 
  update,
  push,
  get
} from '../firebase';

// Client component that uses useSearchParams
function LiveCodeContent() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [lang, setLang] = useState("");
  const [fileName, setFileName] = useState("untitled");
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const code = searchParams.get('code');
  const [sessionCode, setSessionCode] = useState<string>("");
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [collaborationStatus, setCollaborationStatus] = useState("");
  const [currentContent, setCurrentContent] = useState("// happy coding!");
  const [isReceivingExternalUpdate, setIsReceivingExternalUpdate] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedContentRef = useRef<string>("// happy coding!");
  const initialLoadCompleteRef = useRef(false);

  // Initialize session
  useEffect(() => {
    if (!type) return;
    
    const db = getDatabase();
    
    if (type === 'new') {
      // Generate a new 9-digit code
      const newCode = Math.floor(100000000 + Math.random() * 900000000).toString();
      setSessionCode(newCode);
      
      // Create a new document in Firebase
      const docRef = ref(db, `liveCode/${newCode}`);
      set(docRef, {
        content: "// happy coding!",
        lang: "",
        fileName: "untitled",
        createdAt: Date.now()
      }).then(() => {
        setCollaborationStatus(`Created new session. Share code: ${newCode}`);
        setIsCollaborating(true);
        initialLoadCompleteRef.current = true;
      }).catch(error => {
        console.error("Error creating new session:", error);
        setCollaborationStatus("Failed to create session. Please try again.");
      });
    } 
    else if (type === 'join' && code) {
      setSessionCode(code);
      
      // Try to find the document with the given code
      const docRef = ref(db, `liveCode/${code}`);
      get(docRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data.content) {
            // Set the correct content from Firebase
            setCurrentContent(data.content);
            lastSavedContentRef.current = data.content;
            
            // Update the editor if it's already mounted
            if (editorRef.current) {
              editorRef.current.setValue(data.content);
            }
          }
          if (data.lang) setLang(data.lang);
          if (data.fileName) setFileName(data.fileName);
          
          setCollaborationStatus(`Joined session with code: ${code}`);
          setIsCollaborating(true);
          initialLoadCompleteRef.current = true;
        } else {
          setCollaborationStatus(`No session found with code: ${code}`);
        }
      }).catch(error => {
        console.error("Error joining session:", error);
        setCollaborationStatus("Failed to join session. Please check the code and try again.");
      });
    }
  }, [type, code]);
  
  // Set up Firebase realtime listener
  useEffect(() => {
    if (!isCollaborating || !sessionCode) return;
    
    const db = getDatabase();
    const docRef = ref(db, `liveCode/${sessionCode}`);
    
    const unsubscribe = onValue(docRef, (snapshot) => {
      if (!snapshot.exists()) return;
      
      const data = snapshot.val();
      
      // Update other properties
      if (data.lang && data.lang !== lang) {
        setLang(data.lang);
      }
      
      if (data.fileName && data.fileName !== fileName) {
        setFileName(data.fileName);
      }
      
      // Only update content if it's from an external source AND different from what we last saved
      if (data.content && data.content !== lastSavedContentRef.current) {
        console.log("Received new content from Firebase");
        setIsReceivingExternalUpdate(true);
        setCurrentContent(data.content);
        lastSavedContentRef.current = data.content;
      }
    });
    
    return () => unsubscribe();
  }, [isCollaborating, sessionCode, lang, fileName]);
  
  // Set up interval saving
  useEffect(() => {
    if (!isCollaborating || !sessionCode || !editorRef.current) return;
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Set up a new interval to save content every 2 seconds
    intervalRef.current = setInterval(() => {
      if (editorRef.current && !isReceivingExternalUpdate && initialLoadCompleteRef.current) {
        const content = editorRef.current.getValue();
        
        // Only save if content has changed from last saved content
        if (content !== lastSavedContentRef.current) {
          console.log("Saving content to Firebase (interval)");
          
          // Update the ref to track what we last saved
          lastSavedContentRef.current = content;
          
          const db = getDatabase();
          const docRef = ref(db, `liveCode/${sessionCode}`);
          update(docRef, {
            content,
            lastUpdated: Date.now()
          }).catch(error => {
            console.error("Error updating content:", error);
          });
        }
      }
    }, 2000); // Save every 2 seconds
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isCollaborating, sessionCode, isReceivingExternalUpdate]);
  
  // Update editor when currentContent changes (from Firebase)
  useEffect(() => {
    if (!editorRef.current || !isReceivingExternalUpdate) return;
    
    console.log("Updating editor with external content");
    
    // Remember cursor position
    const currentPosition = editorRef.current.getPosition();
    const currentSelection = editorRef.current.getSelection();
    
    // Update content
    editorRef.current.setValue(currentContent);
    
    // Restore cursor position if possible
    if (currentPosition) {
      editorRef.current.setPosition(currentPosition);
    }
    
    if (currentSelection) {
      editorRef.current.setSelection(currentSelection);
    }
    
    // Reset flag
    setIsReceivingExternalUpdate(false);
  }, [currentContent, isReceivingExternalUpdate]);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    
    // Don't automatically set initial content - we need to check if we already have content from joining
    if (initialLoadCompleteRef.current) {
      // If we already completed an initial load from Firebase, use that content
      editor.setValue(currentContent);
    } else {
      // If no initial load yet, set the default
      editor.setValue("// happy coding!");
    }
    
    lastSavedContentRef.current = editor.getValue();
    
    // We'll handle content changes through the interval timer
    editor.onDidChangeModelContent(() => {
      // No need to update state on each keystroke - we'll rely on the interval
    });
  };

  const handleOpenClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const baseName = file.name.split('.')[0];
    setFileName(baseName);

    const extension = file.name.split('.').pop()?.toLowerCase();
    const newLang = (extension === 'ts' || extension === 'tsx') ? 'typescript' : 'javascript';
    setLang(newLang);
    
    // Update language in Firebase
    if (isCollaborating && sessionCode) {
      const db = getDatabase();
      const docRef = ref(db, `liveCode/${sessionCode}`);
      update(docRef, {
        lang: newLang,
        fileName: baseName
      }).catch(error => {
        console.error("Error updating language:", error);
      });
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (editorRef.current && e.target?.result) {
        const content = e.target.result as string;
        editorRef.current.setValue(content);
        
        // Force immediate update to Firebase
        if (isCollaborating && sessionCode) {
          lastSavedContentRef.current = content;
          
          const db = getDatabase();
          const docRef = ref(db, `liveCode/${sessionCode}`);
          update(docRef, {
            content,
            lastUpdated: Date.now()
          }).catch(error => {
            console.error("Error updating content:", error);
          });
        }
      }
    };
    reader.readAsText(file);

    if (event.target) {
      event.target.value = '';
    }
  };

  const handleSaveClick = () => {
    if (!editorRef.current) return;
    
    const content = editorRef.current.getValue();
    
    const extension = lang === 'typescript' ? '.ts' : '.js';
    
    const mimeType = 'text/plain';
    const blob = new Blob([content], { type: mimeType });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}${extension}`;
    document.body.appendChild(link);
    
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const copySessionCode = () => {
    if (sessionCode) {
      navigator.clipboard.writeText(sessionCode)
        .then(() => {
          setCollaborationStatus("Code copied to clipboard!");
          setTimeout(() => {
            setCollaborationStatus(`Session code: ${sessionCode}`);
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy code: ', err);
        });
    }
  };

  // Force save current content to Firebase
  const forceSaveToFirebase = () => {
    if (!isCollaborating || !sessionCode || !editorRef.current) return;
    
    const content = editorRef.current.getValue();
    console.log("Force saving to Firebase");
    
    // Update our reference to what's been saved
    lastSavedContentRef.current = content;
    
    const db = getDatabase();
    const docRef = ref(db, `liveCode/${sessionCode}`);
    update(docRef, {
      content,
      lastUpdated: Date.now()
    }).catch(error => {
      console.error("Error updating content:", error);
    });
  };

  const LangModal = () => {
    return (
      <div
        className="absolute flex z-10 w-full h-[100dvh] items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        <div className="relative w-3/5 h-2/5 min-h-[400px] min-w-[600px] bg-[#1E1E1E] rounded-lg flex flex-col items-center justify-center space-y-16">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-400 transition-colors"
            onClick={() => setModalOpen(false)}
          >
            <span className="text-red-500 text-xl mr-2 hover:cursor-pointer items-center">
              &times;
            </span>
          </button>

          <div className="font-mono font-black text-white text-2xl">
            Available Languages:
          </div>

          <div className="flex space-x-8 items-center justify-center">
            <div
              className="bg-black p-6 rounded-lg w-64 h-48 flex items-center justify-center cursor-pointer hover:bg-transparent hover:border-2 transition-colors"
              onClick={() => {
                setLang("javascript");
                
                // Update language in Firebase
                if (isCollaborating && sessionCode) {
                  const db = getDatabase();
                  const docRef = ref(db, `liveCode/${sessionCode}`);
                  update(docRef, {
                    lang: "javascript"
                  }).catch(error => {
                    console.error("Error updating language:", error);
                  });
                }
                
                setModalOpen(false);
              }}
            >
              <div className="text-center">
                <div className="text-8xl font text-yellow-500 mb-4">
                  <FontAwesomeIcon icon={faJs} />
                </div>
                <p className="text-gray-300">JavaScript</p>
              </div>
            </div>

            <div
              className="bg-black p-6 rounded-lg w-64 h-48 flex items-center justify-center cursor-pointer hover:bg-transparent hover:border-2 transition-colors"
              onClick={() => {
                setLang("typescript");
                
                // Update language in Firebase
                if (isCollaborating && sessionCode) {
                  const db = getDatabase();
                  const docRef = ref(db, `liveCode/${sessionCode}`);
                  update(docRef, {
                    lang: "typescript"
                  }).catch(error => {
                    console.error("Error updating language:", error);
                  });
                }
                
                setModalOpen(false);
              }}
            >
              <div className="text-center">
                <div className="text-8xl font text-blue-500 mb-4">
                  <FontAwesomeIcon icon={faReact} />
                </div>
                <p className="text-gray-300">TypeScript</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {modalOpen && <LangModal />}
      <div className="hidden sm:flex h-[100dvh] w-[100dvw] bg-[#1E1E1E] flex-col space-y-4 p-4">
        <div className="bg-black text-white rounded-xl p-4 h-16 items-center flex justify-between">
          <div className="font-mono flex flex-row justify-between items-center w-full">
            <div className="grow flex flex-row space-x-8">
              
              {/* <div 
                className="flex flex-row space-x-2 items-center hover:bg-gray-950 px-6 py-2 rounded-lg hover:cursor-pointer"
                onClick={handleOpenClick}
              >
                <FontAwesomeIcon icon={faFolderOpen} />
                <div>Open</div>
              </div> */}
              {/* <div 
                className="flex flex-row space-x-2 items-center hover:bg-gray-950 px-6 py-2 rounded-lg hover:cursor-pointer"
                onClick={handleSaveClick}
              >
                <FontAwesomeIcon icon={faFloppyDisk} />
                <div>Save</div>
              </div> */}
              
              {/* Collaboration status and copy code button */}
              {isCollaborating && sessionCode && (
                <div className="flex flex-row items-center text-green-400 px-6 py-2 rounded-lg">
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  <div className="mr-2">{collaborationStatus}</div>
                  <button 
                    onClick={copySessionCode}
                    className="ml-2 hover:text-white"
                    title="Copy session code"
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>
              )}
            </div>
            <div
                className="flex flex-row space-x-2 items-center hover:bg-gray-950 px-6 py-2 rounded-lg hover:cursor-pointer"
                onClick={() => setModalOpen(true)}
              >
                <FontAwesomeIcon
                  icon={lang ? (lang === "javascript" ? faJs : faReact) : faCode}
                  className={`
                    ${lang === "javascript" ? "text-yellow-500" : ""}
                    ${lang === "typescript" ? "text-blue-500" : ""}
                  `}
                />
                <div
                  className={`
                    ${lang === "javascript" ? "text-yellow-500" : ""}
                    ${lang === "typescript" ? "text-blue-500" : ""}
                  `}
                >
                  {lang === "" && "Set Lang"}
                  {lang === "javascript" && "JavaScript"}
                  {lang === "typescript" && "TypeScript"}
                </div>
              </div>
            <div 
                className="flex flex-row space-x-2 text-white items-center px-6 py-2 rounded-lg hover:bg-gray-950 hover:text-white hover:cursor-pointer"
                onClick={forceSaveToFirebase}
              >
                <FontAwesomeIcon icon={faPlay} />
                <div>Force Save</div>
              </div>
            <div
              className="px-2 hover:scale-[1.1] hover:cursor-pointer"
              onClick={() => history.back()}
            >
              <Image src={juniorPng} alt="junior logo" width={100} />
            </div>
          </div>
        </div>
        <div className="flex w-full bg-black p-2 border-black rounded-xl grow text-white flex-row overflow-hidden">
          <input 
            type="file" 
            ref={fileInputRef}
            style={{ display: 'none' }} 
            accept=".js,.jsx,.ts,.tsx"
            onChange={handleFileChange}
          />
          
          <Editor
            height="100%"
            width="100%"
            language={
              lang === "typescript" ? "typescript" : "javascript"
            }
            defaultValue={currentContent}
            theme="hc-black"
            onMount={handleEditorDidMount}
            options={{
              // Autocomplete and IntelliSense
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
              acceptSuggestionOnCommitCharacter: true,
              acceptSuggestionOnEnter: "on",

              // Code formatting and validation
              formatOnPaste: true,
              formatOnType: true,

              // Editor appearance
              minimap: { enabled: true },
              fontSize: 14,
              scrollBeyondLastLine: true,
              wordWrap: "on",
              automaticLayout: true,
              lineNumbers: "on",
              glyphMargin: true,
              folding: true,

              // Developer experience
              snippetSuggestions: "inline",
              tabCompletion: "on",
              cursorBlinking: "blink",
              cursorSmoothCaretAnimation: "on",

              // Performance
              fastScrollSensitivity: 5,
              scrollBeyondLastColumn: 5,

              // Additional conveniences
              links: true, // Clickable links
              mouseWheelZoom: true, // Ctrl+scroll to zoom
              multiCursorModifier: "alt", // Use Alt+Click for multi-cursor
              renderWhitespace: "selection", // Show whitespace in selections
            }}
          />
        </div>
      </div>
    </>
  );
}

// Main component with Suspense boundary
export default function LiveCode() {
  return (
    <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center bg-[#1E1E1E] text-white text-xl">
      Loading editor...
    </div>}>
      <LiveCodeContent />
    </Suspense>
  );
}