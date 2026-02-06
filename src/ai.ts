const getRecipeFromAPI = async (ingredients: string[]) => {
  // Use Vercel API route in production, fallback to local API route in development
  const apiUrl = import.meta.env.PROD
    ? "/api/generate-recipe"
    : import.meta.env.VITE_API_URL || "/api/generate-recipe";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.recipe || "Failed to generate recipe";
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

export { getRecipeFromAPI };