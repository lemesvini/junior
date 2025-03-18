'use client';

import { useState } from 'react';
import Image from 'next/image';
import juniorPng from "../../../public/JUNIOR.png"

export default function Parser() {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedJson, setParsedJson] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setJsonInput(value);
    
    try {
      if (!value.trim()) {
        setParsedJson(null);
        setError(null);
        return;
      }
      
      const parsed = JSON.parse(value);
      setParsedJson(parsed);
      setError(null);
    } catch (err) {
        console.log(err)
      setParsedJson(null);
      setError(`Invalid JSON`);
    }
  };

  return (
    <div className="hidden lg:flex h-[100dvh] w-[100dvw] bg-[#1E1E1E] flex-col space-y-4 p-4">
      <div className="bg-black text-white rounded-xl p-4 h-16 items-center flex justify-between">
        <div className="font-mono flex flex-row justify-between w-full">
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none text-white font-mono"
            value={jsonInput}
            onChange={handleInputChange}
            placeholder="Enter JSON here..."
          />
          <div className='px-2 hover:scale-[1.1] hover:cursor-pointer' onClick={() => history.back()}>
            <Image src={juniorPng} alt='junior logo' width={100} />
          </div>
        </div>
      </div>
      <div className="flex w-full bg-black rounded-xl grow text-white flex-row p-4 overflow-hidden">
        <div className="flex w-full space-y-5 font-mono overflow-auto no-scrollbar">
          {error ? (
            <div className="text-red-400">{error}</div>
          ) : parsedJson ? (
            <pre className="whitespace-pre-wrap break-words">
              {JSON.stringify(parsedJson, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-400">No valid JSON parsed yet</p>
          )}
        </div>
      </div>
    </div>
  );
}