"use client";
import Image from "next/image";
import Header from "@/components/header";
import JuniorPNG from "../../public/JUNIOR.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudArrowUp,
  faFileCode,
  faLaptopCode,
  faPersonChalkboard,
  faSatelliteDish,
  faTowerBroadcast,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const router = useRouter();
  const [liveModal, setLivemodal] = useState(false);
  const LiveModal = () => {
    const [selectedOption, setSelectedOption] = useState("button1");
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const routeCollaboration = (type: string, code: string) => {
      if (type === 'new') {
        // logic for new collab
        console.log(type)
        router.push(`/liveCode?type=${type}`)
      }
      if (type === 'join') {
        // logic for join here
        router.push(`/liveCode?type=${type}&code=${code}`)
        console.log(code)
      }
    }
    return (
      <div
        className="absolute flex z-10 w-full h-[100dvh] items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        <div className="relative w-3/5 h-2/5 min-h-[400px] min-w-[600px] bg-[#1E1E1E] rounded-lg flex flex-col items-center justify-center">
          <div className="border flex flex-col w-full h-full p-4 font-mono">
            <div className="w-full flex flex-row justify-between px-2">
              <div className="font-black text-white">Live Code Options:</div>
              <div
                onClick={() => setLivemodal(false)}
                className="hover:font-black text-red-600 hover:cursor-pointer hover:text-red-400"
              >
                &times;
              </div>
            </div>
            <div className="h-full mt-4 flex flex-row">
              <div className="h-full w-1/2 flex flex-col space-y-2">
                <div
                  className={`w-full bg-black p-4 text-white flex flex-col rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
                    selectedOption === "button1" ? "flex-grow" : ""
                  }`}
                  onClick={() => setSelectedOption("button1")}
                >
                  <div className="font-black">Collaboration</div>
                  {selectedOption === "button1" && (
                    <div className="mt-2 flex flex-grow">
                      <div className="flex flex-col items-center h-full w-full justify-center space-y-2">
                        <FontAwesomeIcon icon={faUsers} className="text-5xl " />
                        <div>Edit together</div>
                      </div>
                      <div className="flex flex-col items-center h-full w-full justify-center space-y-2">
                        <FontAwesomeIcon
                          icon={faSatelliteDish}
                          className="text-5xl "
                        />
                        <div>Live Coding</div>
                      </div>
                    </div>
                  )}
                </div>
                {/* <div
                  className={`w-full bg-black p-4 text-white flex flex-col rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
                    selectedOption === "button2" ? "flex-grow" : ""
                  }`}
                  onClick={() => setSelectedOption("button2")}
                >
                  <div className="font-black">Presentation</div>
                  {selectedOption === "button2" && (
                    <div className="mt-2 flex flex-grow">
                      <div className="flex flex-col items-center h-full w-full justify-center space-y-2">
                        <FontAwesomeIcon
                          icon={faPersonChalkboard}
                          className="text-5xl "
                        />
                        <div>Share ideas</div>
                      </div>
                      <div className="flex flex-col items-center h-full w-full justify-center space-y-2">
                        <FontAwesomeIcon
                          icon={faSatelliteDish}
                          className="text-5xl "
                        />
                        <div>Live Coding</div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`w-full bg-black p-4 text-white flex flex-col rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
                    selectedOption === "button3" ? "flex-grow" : ""
                  }`}
                  onClick={() => setSelectedOption("button3")}
                >
                  <div className="font-black">Shared File</div>
                  {selectedOption === "button3" && (
                    <div className="mt-2 flex flex-grow">
                      <div className="flex flex-col items-center h-full w-full justify-center space-y-2">
                        <FontAwesomeIcon
                          icon={faFileCode}
                          className="text-5xl "
                        />
                        <div>Edit Realtime</div>
                      </div>
                      <div className="flex flex-col items-center h-full w-full justify-center space-y-2">
                        <FontAwesomeIcon
                          icon={faCloudArrowUp}
                          className="text-5xl "
                        />
                        <div>Cloud Saving</div>
                      </div>
                    </div>
                  )}
                </div> */}
              </div>
              <div className="h-full w-1/2 p-4 text-white flex flex-col">
                {selectedOption === "button1" && (
                  <div className="border-l border-black pl-4 flex flex-col flex-grow justify-center space-y-3 items-center w-full">
                    <div>Code together in realtime.</div>
                    <br />
                    <button 
                    className="hover:text-lg cursor-pointer bg-white w-full p-3 text-black font-medium text-center rounded-lg shadow-sm transition-all hover:bg-gray-50 hover:shadow-md active:scale-98"
                    onClick={() => routeCollaboration('new', '')}
                    >
                      New Collaboration
                    </button>
                    <div className="flex items-center w-full my-2">
                      <hr className="flex-grow border-t border-gray-300" />
                      <span className="px-3 text-sm text-gray-300">or</span>
                      <hr className="flex-grow border-t border-gray-300" />
                    </div>
                    <div className="text-sm font-medium mb-1 self-start">
                      Join an ongoing collaboration:
                    </div>
                    <div></div>
                    <div className="relative w-full mt-2">
                      <input
                        className="border border-gray-300 w-full p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                        placeholder="Enter collaboration code..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      />
                      {inputValue && (
                        <button 
                        className="absolute right-3 top-1/2 hover:cursor-pointer -translate-y-1/2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm hover:shadow-md transition-all"
                        onClick={() =>  routeCollaboration('join', `${inputValue}`)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 font-black"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {liveModal && <LiveModal />}
      <div className="hidden md:flex h-[100dvh] w-[100dvw] bg-[#1E1E1E] flex-col space-y-4 p-4">
        <Header />
        <div className="flex w-full bg-black rounded-xl grow text-white flex-row p-4">
          <div className="w-[70%] h-full items-center justify-center flex pl-8">
            <Image
              src={JuniorPNG}
              alt="Junior Text"
              layout=""
              objectFit="contain"
            />
          </div>
          <div className="w-[30%] flex flex-col items-center justify-center space-y-5 font-mono">
            <div
              onClick={() => router.push("/monaco")}
              className="border border-gray-500 hover:border-white hover:cursor-pointer hover:font-black rounded-lg w-[70%] min-w-[70px] p-1 text-center"
            >
              <div className="bg-white rounded-sm text-black  p-2">
                <FontAwesomeIcon icon={faFileCode} />
                {"  "}
                Code Editor
              </div>
            </div>
            <div
              onClick={() => router.push("/jsonParser")}
              className="border border-gray-500 hover:border-white hover:cursor-pointer hover:font-black rounded-lg w-[70%] min-w-[70px] p-1 text-center"
            >
              <div className="bg-white rounded-sm text-black  p-2">
                <span className="font-black">{"{;}"}</span> Json Parser
              </div>
            </div>
            <div
              onClick={() => setLivemodal(true)}
              className="border border-gray-500 hover:border-white text-black hover:text-blue-500 hover:cursor-pointer hover:font-black rounded-lg w-[70%] min-w-[70px] p-1 text-center"
            >
              <div className="bg-white rounded-sm  p-2">
                <FontAwesomeIcon
                  icon={faSatelliteDish}
                  className="text-blue-500"
                />
                {"  "}
                Live Code
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
