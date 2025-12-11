import { Zap } from "lucide-react";

type Props = {
  ingredients: string[];
};

const IngredientList = ({ ingredients }: Props) => {
  return (
    <div className="ingredient-list">
      <h2 className="text-3xl sm:text-4xl font-bold flex flex-wrap items-center gap-2 mb-10">
        <Zap className="text-emerald-400 max-[360px]:hidden" size={32} />
        Ingredients on hand
        <span className="bg-backdrop text-base font-normal rounded-xl py-1 px-3 ml-1">
          {ingredients.length} {ingredients.length === 1 ? "item" : "items"}
        </span>
      </h2>
      {ingredients.length === 0 ? (
        <p className="text-gray-400 pl-8">No ingredients added yet.</p>
      ) : (
        <ul className="ingredient-list grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientList;
