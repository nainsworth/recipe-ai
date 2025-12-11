import IngredientForm from "./components/IngredientForm";

function App() {
  return (
    <>
      <main className="flex flex-col gap-12">
        {/* form */}
        <IngredientForm />

        {/* ingredient list */}
        <div className="ingredient-list">
          <div className="flex items-center gap-4 mb-8">
            <p className="max-[368px]:hidden sm:block h-full">icon</p>
            <h2 className="text-3xl sm:text-4xl font-bold flex flex-wrap items-center gap-2">
              Ingredients on hand{" "}
              <span className="bg-backdrop text-base font-normal rounded-xl py-1 px-3">
                5 items
              </span>
            </h2>
            {/* <p className="bg-backdrop rounded-4xl py-2 px-4">5 items</p> */}
          </div>
          <ul className="ingredient-list grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li>Chicken</li>
            <li>Milk</li>
            <li>Basic Seasoning</li>
            <li>Broccoli</li>
            <li>Butter</li>
          </ul>
        </div>

        {/* generate button */}
        <div className="bg-backdrop rounded-2xl border-emerald-400/30 p-6 sm:py-8 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-8 ">
          <div className="self-start">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">Ready for Recipe</h3>
            <p className="text-gray-400 ">Generate a recipe from you list of ingredients</p>
          </div>
          <button className="primary-btn">Get a Recipe</button>
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
