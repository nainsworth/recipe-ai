import { useState } from "react";
import GenerateRecipe from "./components/GenerateRecipe";
import IngredientForm from "./components/IngredientForm";
import IngredientList from "./components/IngredientList";
import Recipe from "./components/Recipe";

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
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const data = await response.json();
      setRecipe(data.recipe);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate recipe. Please try again.");
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
