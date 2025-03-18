const Header = () => {
  return (
    <div className="bg-black text-white rounded-xl p-4 h-16 items-center flex justify-between">
      <div className="font-mono">
        <span>$</span>
        <span className="text-green-400 ml-2 font-thin">user@user</span>
        <span className="text-yellow-400 ml-2 font-thin">
          ~/projects/devTools/
        </span>
        <span className="text-yellow-400 font-black">JUNIOR</span>
        <span className="text-blue-300 ml-2 font-thin">
          {"("}master{")"}
        </span>
      </div>
      <div className="h-full items-center justify-center flex font-mono">
        <a href="https://github.com/lemesvini" target="_blank">by vinicius</a>
      </div>
    </div>
  );
};

export default Header;
