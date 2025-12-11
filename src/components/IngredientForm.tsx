import { Plus } from "lucide-react";

const IngredientForm = () => {
  return (
    <form
      action=""
      className="bg-backdrop max-full rounded-2xl flex flex-col sm:flex-row justify-center items-center gap-4 p-6 sm:p-8"
    >
      <input
        type="text"
        placeholder="e.g. chicken breast, rice, spinach..."
        className="bg-black border border-neutral-800 w-full h-full px-6 py-4 rounded-xl xs:text-base sm:text-xl outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 flex-1"
      />
      <button className="primary-btn flex-0 flex gap-2 justify-center items-center">
        <Plus /> Add
      </button>
    </form>
  );
};

export default IngredientForm;
