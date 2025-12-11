import { Zap } from "lucide-react";

const IngredientList = () => {
  return (
    <div className="ingredient-list">
      <h2 className="text-3xl sm:text-4xl font-bold flex flex-wrap items-center gap-2 mb-10">
        {" "}
        <Zap className="text-emerald-400 max-[360px]:hidden" size={32} />
        Ingredients on hand{" "}
        <span className="bg-backdrop text-base font-normal rounded-xl py-1 px-3 ml-1">
          5 items
        </span>
      </h2>
      <ul className="ingredient-list grid grid-cols-1 sm:grid-cols-2 gap-4">
        <li>Chicken</li>
        <li>Milk</li>
        <li>Basic Seasoning</li>
        <li>Broccoli</li>
        <li>Butter</li>
      </ul>
    </div>
  );
};

export default IngredientList;
