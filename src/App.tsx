import { Flame, Sparkles, Zap } from "lucide-react";
import IngredientForm from "./components/IngredientForm";

function App() {
  return (
    <>
      <main className="flex flex-col gap-12">
        {/* form */}
        <IngredientForm />

        {/* ingredient list */}
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

        {/* generate button */}
        <div className="bg-backdrop rounded-2xl border-emerald-400/30 p-6 sm:py-8 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-8 flex-1">
          <div className="self-start">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 flex gap-3">
              {" "}
              <Sparkles
                className="text-emerald-400 max-[360px]:hidden"
                size={28}
              />
              Ready for Recipe
            </h3>
            <p className="text-gray-400 ">
              Generate a recipe from you list of ingredients
            </p>
          </div>
          <button className="primary-btn flex gap-2 justify-center items-center flex-0"><Flame /> Get a Recipe</button>
        </div>

        {/* generated recipe */}
        <div>
          <h2>Suggested Recipe</h2>
        </div>
      </main>
    </>
  );
}

export default App;
