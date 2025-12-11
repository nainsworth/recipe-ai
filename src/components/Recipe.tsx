import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  recipe: string;
};

const Recipe = ({ recipe }: Props) => {
  return (
    <div className="generated-recipe bg-backdrop rounded-2xl flex flex-col gap-4 p-6 sm:p-10 text-lg">
      <Markdown remarkPlugins={[remarkGfm]}>{recipe}</Markdown>
      <p>Enjoy! ;)</p>
    </div>
  );
};

export default Recipe;
