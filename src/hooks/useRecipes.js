import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createRecipe, deleteRecipe, listRecipes, updateRecipe } from "../services/recipesApi";

const RecipesContext = createContext(null);

function normalizeRecipe(formData) {
  const splitLines = (value) =>
    value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);

  return {
    name: formData.name.trim(),
    category: formData.category,
    description: formData.description.trim(),
    ingredients: splitLines(formData.ingredients),
    instructions: splitLines(formData.instructions),
    prepTime: Number(formData.prepTime) || 0,
    cookTime: Number(formData.cookTime) || 0,
    servings: Number(formData.servings) || 1,
  };
}

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRecipes = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await listRecipes();
      setRecipes(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const addRecipe = useCallback(async (formData) => {
    const payload = normalizeRecipe(formData);
    const savedRecipe = await createRecipe(payload);
    setRecipes((current) => [savedRecipe, ...current]);
    return savedRecipe;
  }, []);

  const editRecipe = useCallback(async (recipeId, formData) => {
    const payload = normalizeRecipe(formData);
    const updatedRecipe = await updateRecipe(recipeId, payload);

    setRecipes((current) => current.map((recipe) => (String(recipe.id) === String(recipeId) ? updatedRecipe : recipe)));

    return updatedRecipe;
  }, []);

  const removeRecipe = useCallback(async (recipeId) => {
    await deleteRecipe(recipeId);
    setRecipes((current) => current.filter((recipe) => String(recipe.id) !== String(recipeId)));
  }, []);

  const value = useMemo(
    () => ({
      recipes,
      isLoading,
      error,
      addRecipe,
      editRecipe,
      removeRecipe,
      refreshRecipes: loadRecipes,
    }),
    [recipes, isLoading, error, addRecipe, editRecipe, removeRecipe, loadRecipes],
  );

  return createElement(RecipesContext.Provider, { value }, children);
}

export function useRecipes() {
  const context = useContext(RecipesContext);

  if (!context) {
    throw new Error("useRecipes must be used within RecipesProvider");
  }

  return context;
}
