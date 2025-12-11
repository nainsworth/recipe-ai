import { Flame } from "lucide-react";

const Header = () => {
  return (
    <header className="font-bold bg-backdrop border-0 border-b flex justify-center items-center p-5">
      <Flame className="text-emerald-400" size={48} />
      
      <h1 className="text-5xl ">Recipe<span className="text-emerald-400">AI</span></h1>
    </header>
  );
};

export default Header;
