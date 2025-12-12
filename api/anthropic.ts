import Anthropic from "@anthropic-ai/sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. Also put all measurements in either grams or milliliters and in bold. Have total time and servings in normal text under the Recipe title. "Total Time:" and "Servings:" must be bold and separated by a "|". Include total estimated calories and macros for each serving and the number of servings. Nutrition information must be above the ingredients listed in a table. Remove Nutrition Information title. Servings must 2, 4, or 6, 4 being the preferred option. Not important, but try to generate a recipe where there's 10g of protein for every 100 calories.`;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const getRecipeFromAPI = async (req: VercelRequest, res: VercelResponse) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, DELETE, PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { ingredients } = req.body;

    if (
      !ingredients ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {
      return res.status(400).json({ error: "Please provide ingredients" });
    }

    const ingredientsList = ingredients.join(", ");

    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Create a recipe using the following ingredients: ${ingredientsList}`,
        },
      ],
    });

    const recipe =
      msg.content[0].type === "text"
        ? msg.content[0].text
        : "Unexpected response from API";

    return res.status(200).json({ recipe });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return res
      .status(500)
      .json({ error: "Failed to generate recipe", details: errorMessage });
  }
};

// const getRecipeFromAPI = async (ingredients: string[]) => {
//   const ingredientsList = ingredients.join(", ");
//   const msg = await anthropic.messages.create({
//     model: "claude-haiku-4-5-20251001",
//     max_tokens: 1024,
//     system: SYSTEM_PROMPT,
//     messages: [
//       {
//         role: "user",
//         content: `Create a recipe using the following ingredients: ${ingredientsList}`,
//       },
//     ],
//   });
//   return msg.content[0].type === "text"
//     ? msg.content[0].text
//     : "Unexpected response from API";
// };

export { getRecipeFromAPI };
