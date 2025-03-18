"use client";

import { useRef } from "react";
import Image from "next/image";
import juniorPng from "../../../public/JUNIOR.png";
import Editor from "@monaco-editor/react";

export default function Parser() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  return (
    <div className="hidden lg:flex h-[100dvh] w-[100dvw] bg-[#1E1E1E] flex-col space-y-4 p-4">
      <div className="bg-black text-white rounded-xl p-4 h-16 items-center flex justify-between">
        <div className="font-mono flex flex-row justify-between w-full">
          <div>
            <span>$</span>
            <span className="text-green-400 ml-2 font-thin">user@user</span>
            <span className="text-yellow-400 ml-2 font-thin">
              ~/projects/devTools/
            </span>
            <span className="text-yellow-400 font-black">JUNIOR/</span>
            <span className="text-yellow-400 font-black">MonacoEditor</span>
            <span className="text-blue-300 ml-2 font-thin">
              {"("}master{")"}
            </span>
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
        <Editor
          height="100%"
          width="100%"
          defaultLanguage="javascript"
          defaultValue="// Write your code here"
          theme="hc-black"
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
