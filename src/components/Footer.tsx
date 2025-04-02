"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import JuniorPNG from "../../public/JUNIOR.png";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Image
              src={JuniorPNG}
              alt="Junior"
              width={80}
              height={30}
            />
            <p className="text-gray-400">© 2025 Junior. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <FontAwesomeIcon icon={faGithub} className="text-gray-400 hover:text-white cursor-pointer text-xl" />
            <FontAwesomeIcon icon={faTwitter} className="text-gray-400 hover:text-white cursor-pointer text-xl" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 