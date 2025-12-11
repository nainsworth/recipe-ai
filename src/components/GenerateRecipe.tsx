import { Flame, Sparkles } from "lucide-react";

type Props = {
  getRecipe: () => void;
};

const GenerateRecipe = ({ getRecipe }: Props) => {
  return (
    <div className="bg-backdrop rounded-2xl border-emerald-400/30 p-6 sm:py-8 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-8 flex-1">
      <div className="self-start">
        <h3 className="text-2xl sm:text-3xl font-bold mb-2 flex gap-3">
          {" "}
          <Sparkles className="text-emerald-400 max-[360px]:hidden" size={28} />
          Ready for Recipe
        </h3>
        <p className="text-gray-400 ">
          Generate a recipe from you list of ingredients
        </p>
      </div>
      <button
        className="primary-btn flex gap-2 justify-center items-center flex-0"
        onClick={getRecipe}
      >
        <Flame /> Get a Recipe
      </button>
    </div>
  );
};

export default GenerateRecipe;
