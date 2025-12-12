import { useState } from "react";
import GenerateRecipe from "./components/GenerateRecipe";
import IngredientForm from "./components/IngredientForm";
import IngredientList from "./components/IngredientList";
import Recipe from "./components/Recipe";
import { getRecipeFromAPI } from "./utils/recipeAPI";

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
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
    try {
      const recipeMarkdown = await getRecipeFromAPI(ingredients);
      setRecipe(recipeMarkdown);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate recipe.");
    }
  };

  return (
    <>
      <main>
        <div className="main-container">
          <IngredientForm addIngredient={addIngredient} />
          <IngredientList ingredients={ingredients} />
          {ingredients.length > 3 && <GenerateRecipe getRecipe={getRecipe} />}
          {recipe && <Recipe recipe={recipe} />}
        </div>
      </main>
    </>
  );
}

export default App;
