"use client";
import Image from "next/image";
import Header from "@/components/header";
import JuniorPNG from "../../public/JUNIOR.png";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
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
              <div className="bg-white rounded-sm text-black  p-2">Code Editor</div>
            </div>
            <div 
              onClick={() => router.push("/jsonParser")}
              className="border border-gray-500 hover:border-white hover:cursor-pointer hover:font-black rounded-lg w-[70%] min-w-[70px] p-1 text-center"
            >
              <div className="bg-white rounded-sm text-black  p-2">Json Parser</div>
            </div>
            <div className="border border-gray-500 rounded-lg w-[70%] min-w-[70px] p-1 text-center">
              <div className="bg-white opacity-50 rounded-sm text-black  p-2">Coming soon...</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
