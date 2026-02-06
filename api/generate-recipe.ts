import Anthropic from "@anthropic-ai/sdk";

type RequestBody = {
  ingredients?: string[];
};

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. Also put all measurements in either grams or milliliters and in bold. Have total time and servings in normal text under the Recipe title. "Total Time:" and "Servings:" must be bold and separated by a "|". Include total estimated calories and macros for each serving and the number of servings. Nutrition information must be above the ingredients listed in a table. Remove Nutrition Information title. Servings must 2, 4, or 6, 4 being the preferred option. Not important, but try to generate a recipe where there's 10g of protein for every 100 calories.`;

export async function POST(request: Request) {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    let body: RequestBody;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { status: 400, headers },
      );
    }

    if (!body || !body.ingredients || !Array.isArray(body.ingredients)) {
      return new Response(
        JSON.stringify({ error: "Ingredients array is required" }),
        { status: 400, headers },
      );
    }

    let apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY is not set in environment variables");
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers,
      });
    }

    // Remove quotes if present (common in .env files)
    apiKey = apiKey.replace(/^["']|["']$/g, "");

    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    const ingredientsList = body.ingredients.join(", ");
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

    const recipeText =
      msg.content[0].type === "text"
        ? msg.content[0].text
        : "Unexpected response from API";

    return new Response(JSON.stringify({ recipe: recipeText }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error calling Anthropic API:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({
        error: "Failed to generate recipe",
        details: errorMessage,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
