"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSatelliteDish, faCopy, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface LiveModalProps {
  setLivemodal: (value: boolean) => void;
}

const LiveModal = ({ setLivemodal }: LiveModalProps) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("button1");
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const routeCollaboration = (type: string, code: string) => {
    if (type === 'new') {
      router.push(`/liveCode?type=${type}`)
    }
    if (type === 'join') {
      router.push(`/liveCode?type=${type}&code=${code}`)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#0A0A0A] p-8 rounded-xl w-full max-w-md relative border border-white/10">
        <button 
          onClick={() => setLivemodal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <FontAwesomeIcon 
            icon={faSatelliteDish} 
            className="text-blue-500 text-2xl animate-pulse" 
          />
          <h2 className="text-2xl font-bold text-white">Live Collaboration</h2>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              className={`flex-1 py-2 px-4 rounded-lg font-mono text-sm transition-colors ${
                selectedOption === "button1"
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
              onClick={() => setSelectedOption("button1")}
            >
              Create Session
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-lg font-mono text-sm transition-colors ${
                selectedOption === "button2"
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
              onClick={() => setSelectedOption("button2")}
            >
              Join Session
            </button>
          </div>

          {selectedOption === "button1" ? (
            <button
              onClick={() => routeCollaboration('new', '')}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-mono text-sm hover:opacity-90 transition-opacity"
            >
              Start New Session
            </button>
          ) : (
            <div className="space-y-4">
              <div
                className={`p-3 rounded-lg bg-white/5 flex items-center space-x-2 border-2 transition-colors ${
                  isFocused ? "border-blue-500/50" : "border-transparent"
                }`}
              >
                <input
                  type="text"
                  placeholder="Enter session code"
                  className="flex-1 bg-transparent text-white outline-none font-mono text-sm"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(inputValue);
                    }
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => routeCollaboration('join', inputValue)}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-mono text-sm hover:opacity-90 transition-opacity"
              >
                Join Session
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveModal; 