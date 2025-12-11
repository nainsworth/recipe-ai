const IngredientForm = () => {
  return (
    <form
      action=""
      className="bg-backdrop max-full rounded-2xl flex flex-col sm:flex-row justify-center items-center gap-4 p-6 sm:p-8"
    >
      <input
        type="text"
        placeholder="e.g. chicken breast, rice, spinach..."
        className="bg-black border border-neutral-800 w-full h-full px-6 py-4 rounded-xl xs:text-base sm:text-xl focus:outline-emerald-400"
      />
      <button className="bg-emerald-600 text-black text-xl w-full h-full sm:max-w-40  p-3 rounded-xl cursor-pointer hover:bg-emerald-800 transition-colors">
        + Add
      </button>
    </form>
  );
};

export default IngredientForm;
