import { useState } from "react";
import GetRecipe from "./components/GetRecipe";
import IngredientForm from "./components/IngredientForm";
import IngredientList from "./components/IngredientList";

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);

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

  return (
    <>
      <main className="flex flex-col gap-12">
        <IngredientForm addIngredient={addIngredient} />
        {ingredients.length > 0 && <IngredientList ingredients={ingredients} />}

        {ingredients.length > 3 && <GetRecipe />}

        {/* generated recipe */}
      </main>
    </>
  );
}

export default App;
