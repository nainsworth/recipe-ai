import GetRecipe from "./components/GetRecipe";
import IngredientForm from "./components/IngredientForm";
import IngredientList from "./components/IngredientList";

function App() {
  return (
    <>
      <main className="flex flex-col gap-12">
        <IngredientForm />
        <IngredientList />
        <GetRecipe />

        {/* generated recipe */}
        <div>
          <h2>Suggested Recipe</h2>
        </div>
      </main>
    </>
  );
}

export default App;
