"use client";

import { useRef, useState, ChangeEvent } from "react";
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
import { faJs, faReact } from "@fortawesome/free-brands-svg-icons";
import type { editor } from 'monaco-editor';

export default function Edit() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [lang, setLang] = useState("");
  const [fileName, setFileName] = useState("untitled");

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
            <div
              className="bg-black p-6 rounded-lg w-64 h-48 flex items-center justify-center cursor-pointer hover:bg-transparent hover:border-2 transition-colors"
              onClick={() => {
                setLang("sql");
                setModalOpen(false);
              }}
            >
              <div className="text-center">
                <div className="text-8xl font text-white mb-4">
                  <FontAwesomeIcon icon={faDatabase} />
                </div>
                <p className="text-gray-300">SQL</p>
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
              <div 
                className="flex flex-row space-x-2 items-center hover:bg-gray-950 px-6 py-2 rounded-lg hover:cursor-pointer"
                onClick={handleOpenClick}
              >
                <FontAwesomeIcon icon={faFolderOpen} />
                <div>Open</div>
              </div>
              <div 
                className="flex flex-row space-x-2 items-center hover:bg-gray-950 px-6 py-2 rounded-lg hover:cursor-pointer"
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
                     lang === "sql" ? faDatabase : 
                     faCode) : 
                    faCode}
                  className={`
                    ${lang === "javascript" ? "text-yellow-500" : ""}
                    ${lang === "typescript" ? "text-blue-500" : ""}
                    ${lang === "sql" ? "text-white" : ""}
                  `}
                />
                <div
                  className={`
                    ${lang === "javascript" ? "text-yellow-500" : ""}
                    ${lang === "typescript" ? "text-blue-500" : ""}
                    ${lang === "sql" ? "text-white" : ""}
                  `}
                >
                  {lang === "" && "Set Lang"}
                  {lang === "javascript" && "JavaScript"}
                  {lang === "typescript" && "TypeScript"}
                  {lang === "sql" && "SQL"}
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
            accept=".js,.jsx,.ts,.tsx"
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
