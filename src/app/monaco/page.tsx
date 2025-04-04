"use client";

import { useRef, useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import juniorPng from "../../../public/JUNIOR.png";
import Editor, { OnMount } from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faDatabase,
  faFloppyDisk,
  faFolderOpen,
  faPlay,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { faJs, faReact, faJava } from "@fortawesome/free-brands-svg-icons";
import type { editor } from 'monaco-editor';

export default function Edit() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [lang, setLang] = useState("");
  const [fileName, setFileName] = useState("untitled");

  useEffect(() => {
    document.title = "Junior | Code Editor";
  }, []);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleOpenClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const baseName = file.name.split('.')[0];
    setFileName(baseName);

    if (!lang) {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (extension === 'ts' || extension === 'tsx') {
        setLang('typescript');
      } else if (extension === 'js' || extension === 'jsx') {
        setLang('javascript');
      } else if (extension === 'c') {
        setLang('c');
      } else if (extension === 'cpp' || extension === 'cc' || extension === 'h' || extension === 'hpp') {
        setLang('cpp');
      } else if (extension === 'java') {
        setLang('java');
      }
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (editorRef.current && e.target?.result) {
        editorRef.current.setValue(e.target.result as string);
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
    
    let extension = '.js';
    if (lang === 'typescript') extension = '.ts';
    else if (lang === 'c') extension = '.c';
    else if (lang === 'cpp') extension = '.cpp';
    else if (lang === 'java') extension = '.java';
    else if (lang === 'sql') extension = '.sql';
    
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

  const LangModal = () => {
    return (
      <div
        className="fixed inset-0 flex z-10 w-full h-[100dvh] items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        <div className="relative w-11/12 md:w-4/5 lg:w-3/5 max-w-3xl max-h-[90vh] bg-[#1E1E1E] rounded-lg flex flex-col items-center p-8 overflow-y-auto">
          <button
            className="sticky top-0 float-right text-white hover:text-gray-400 transition-colors self-end"
            onClick={() => setModalOpen(false)}
          >
            <span className="text-red-500 text-2xl hover:cursor-pointer items-center">
              &times;
            </span>
          </button>
  
          <div className="font-mono font-black text-white text-xl md:text-2xl mb-8 text-center">
            Available Languages:
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <div
              className="bg-black p-4 rounded-lg flex items-center justify-center cursor-pointer hover:bg-transparent hover:border-2 border-2 border-transparent transition-colors h-40"
              onClick={() => {
                setLang("javascript");
                setModalOpen(false);
              }}
            >
              <div className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl text-yellow-500 mb-4">
                  <FontAwesomeIcon icon={faJs} />
                </div>
                <p className="text-gray-300">JavaScript</p>
              </div>
            </div>
  
            <div
              className="bg-black p-4 rounded-lg flex items-center justify-center cursor-pointer hover:bg-transparent hover:border-2 border-2 border-transparent transition-colors h-40"
              onClick={() => {
                setLang("typescript");
                setModalOpen(false);
              }}
            >
              <div className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl text-blue-500 mb-4">
                  <FontAwesomeIcon icon={faReact} />
                </div>
                <p className="text-gray-300">TypeScript</p>
              </div>
            </div>
  
            <div
              className="bg-black p-4 rounded-lg flex items-center justify-center cursor-pointer hover:bg-transparent hover:border-2 border-2 border-transparent transition-colors h-40"
              onClick={() => {
                setLang("sql");
                setModalOpen(false);
              }}
            >
              <div className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl text-white mb-4">
                  <FontAwesomeIcon icon={faDatabase} />
                </div>
                <p className="text-gray-300">SQL</p>
              </div>
            </div>

            <div
              className="bg-black p-4 rounded-lg flex items-center justify-center cursor-pointer hover:bg-transparent hover:border-2 border-2 border-transparent transition-colors h-40"
              onClick={() => {
                setLang("c");
                setModalOpen(false);
              }}
            >
              <div className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl text-gray-300 mb-4">
                  <FontAwesomeIcon icon={faCode} />
                </div>
                <p className="text-gray-300">C</p>
              </div>
            </div>

            <div
              className="bg-black p-4 rounded-lg flex items-center justify-center cursor-pointer hover:bg-transparent hover:border-2 border-2 border-transparent transition-colors h-40"
              onClick={() => {
                setLang("cpp");
                setModalOpen(false);
              }}
            >
              <div className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl text-blue-400 mb-4">
                  <FontAwesomeIcon icon={faCode} />
                </div>
                <p className="text-gray-300">C++</p>
              </div>
            </div>

            <div
              className="bg-black p-4 rounded-lg flex items-center justify-center cursor-pointer hover:bg-transparent hover:border-2 border-2 border-transparent transition-colors h-40"
              onClick={() => {
                setLang("java");
                setModalOpen(false);
              }}
            >
              <div className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl text-orange-500 mb-4">
                  <FontAwesomeIcon icon={faJava} />
                </div>
                <p className="text-gray-300">Java</p>
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
      <div className="flex h-[100dvh] w-[100dvw] bg-[#1E1E1E] flex-col space-y-4 p-4">
        <div className="bg-black text-white rounded-xl p-4 h-16 items-center flex justify-between">
          <div className="font-mono flex flex-row justify-between items-center w-full">
            <div className="grow flex flex-row space-x-8">
              <div 
                className="hidden lg:flex flex-row space-x-2 items-center hover:bg-gray-950 px-6 py-2 rounded-lg hover:cursor-pointer"
                onClick={handleOpenClick}
              >
                <FontAwesomeIcon icon={faFolderOpen} />
                <div>Open</div>
              </div>
              <div 
                className="hidden lg:flex flex-row space-x-2 items-center hover:bg-gray-950 px-6 py-2 rounded-lg hover:cursor-pointer"
                onClick={handleSaveClick}
              >
                <FontAwesomeIcon icon={faFloppyDisk} />
                <div>Save</div>
              </div>
              <div
                className="flex flex-row space-x-2 items-center hover:bg-gray-950 px-6 py-2 rounded-lg hover:cursor-pointer"
                onClick={() => setModalOpen(true)}
              >
                <FontAwesomeIcon
                  icon={lang ? 
                    (lang === "javascript" ? faJs : 
                     lang === "typescript" ? faReact : 
                     lang === "java" ? faJava :
                     lang === "sql" ? faDatabase : 
                     faCode) : 
                    faCode}
                  className={`
                    ${lang === "javascript" ? "text-yellow-500" : ""}
                    ${lang === "typescript" ? "text-blue-500" : ""}
                    ${lang === "sql" ? "text-white" : ""}
                    ${lang === "c" ? "text-gray-300" : ""}
                    ${lang === "cpp" ? "text-blue-400" : ""}
                    ${lang === "java" ? "text-orange-500" : ""}
                  `}
                />
                <div
                  className={`
                    ${lang === "javascript" ? "text-yellow-500" : ""}
                    ${lang === "typescript" ? "text-blue-500" : ""}
                    ${lang === "sql" ? "text-white" : ""}
                    ${lang === "c" ? "text-gray-300" : ""}
                    ${lang === "cpp" ? "text-blue-400" : ""}
                    ${lang === "java" ? "text-orange-500" : ""}
                  `}
                >
                  {lang === "" && "Set Lang"}
                  {lang === "javascript" && "JavaScript"}
                  {lang === "typescript" && "TypeScript"}
                  {lang === "sql" && "SQL"}
                  {lang === "c" && "C"}
                  {lang === "cpp" && "C++"}
                  {lang === "java" && "Java"}
                </div>
              </div>
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
            accept=".js,.jsx,.ts,.tsx,.c,.cpp,.cc,.h,.hpp,.java"
            onChange={handleFileChange}
          />
          
          <Editor
            height="100%"
            width="100%"
            language={lang || 'javascript'}
            defaultValue="// happy coding!"
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