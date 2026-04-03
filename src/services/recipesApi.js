const API_BASE_URL = "http://localhost:3002";
const RECIPES_ENDPOINT = `${API_BASE_URL}/recipes`;

async function parseResponse(response, action) {
  if (!response.ok) {
    throw new Error(`Unable to ${action}. Please check that JSON Server is running.`);
  }

  return response.json();
}

export async function listRecipes() {
  const response = await fetch(RECIPES_ENDPOINT);
  return parseResponse(response, "load recipes");
}

export async function getRecipeById(recipeId) {
  const response = await fetch(`${RECIPES_ENDPOINT}/${recipeId}`);
  if (response.status === 404) {
    return null;
  }

  return parseResponse(response, "load this recipe");
}

export async function createRecipe(recipeData) {
  const response = await fetch(RECIPES_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeData),
  });

  return parseResponse(response, "save your recipe");
}

export async function updateRecipe(recipeId, recipeData) {
  const response = await fetch(`${RECIPES_ENDPOINT}/${recipeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeData),
  });

  return parseResponse(response, "update this recipe");
}

export async function deleteRecipe(recipeId) {
  const response = await fetch(`${RECIPES_ENDPOINT}/${recipeId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete this recipe. Please check that JSON Server is running.");
  }

  return true;
}
