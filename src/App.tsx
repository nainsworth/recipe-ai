import { useState } from "react";
import GenerateRecipe from "./components/GenerateRecipe";
import IngredientForm from "./components/IngredientForm";
import IngredientList from "./components/IngredientList";
import Recipe from "./components/Recipe";
import { getRecipeFromAPI } from "./ai";

function App() {
  const [ingredients, setIngredients] = useState<string[]>([
    "chicken breast",
    "rice",
    "spinach",
    "broccoli",
  ]);
  const [recipe, setRecipe] = useState<string>("");

  const addIngredient = (formData: FormData) => {
    const newIngredient = formData.get("ingredient");
    if (newIngredient) {
      setIngredients((prevIngredients) => [
        ...prevIngredients,
        newIngredient as string,
      ]);
    } else {
      alert("No ingredient provided");
    }
  };

  const getRecipe = async () => {
    const recipeMarkdown = await getRecipeFromAPI(ingredients);
    setRecipe(recipeMarkdown);
  };

  return (
    <>
      <main className="flex flex-col gap-12">
        <IngredientForm addIngredient={addIngredient} />
        {ingredients.length > 0 && <IngredientList ingredients={ingredients} />}

        {ingredients.length > 3 && <GenerateRecipe getRecipe={getRecipe} />}

        {/* generated recipe */}
        {recipe && <Recipe recipe={recipe} />}
      </main>
    </>
  );
}

export default App;
