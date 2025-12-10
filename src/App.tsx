import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* form */}
        <form action="">
          <input
            type="text"
            placeholder="e.g. chicken breast, rice, spinach..."
          />
          <button>+ Add</button>
        </form>

        {/* ingredient list */}
        <div>
          <h2>Ingredients on hand:</h2>
          <ul>
            <li>Chicken</li>
            <li>Milk</li>
            <li>Basic Seasoning</li>
            <li>Broccoli</li>
            <li>Butter</li>
          </ul>
        </div>

        {/* generate button */}
        <div>
          <div>
            <h3>Ready for Recipe</h3>
            <p>Generate a recipe from you list of ingredients</p>
          </div>
          <button>Get a Recipe</button>
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
