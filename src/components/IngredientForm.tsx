import { Plus } from "lucide-react";

type Props = {
  addIngredient: (formData: FormData) => void;
};

const IngredientForm = ({ addIngredient }: Props) => {
  return (
    <form
      action={addIngredient}
      className="bg-backdrop max-full rounded-2xl flex flex-col sm:flex-row justify-center items-center gap-4 p-6 sm:p-8"
    >
      <input
        type="text"
        name="ingredient"
        placeholder="e.g. chicken breast, rice, spinach..."
        className="bg-black border border-neutral-800 w-full h-full px-6 py-4 rounded-xl xs:text-base sm:text-xl outline-none focus:ring-2 focus:ring-emerald-400 flex-1"
      />
      <button className="primary-btn flex-0 flex gap-2 justify-center items-center">
        <Plus /> Add
      </button>
    </form>
  );
};

export default IngredientForm;
