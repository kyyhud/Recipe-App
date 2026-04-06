import { useState } from "react";
import { CATEGORIES, EMPTY_RECIPE_FORM } from "../data/recipeSeed";

function toFormData(initialData) {
  if (!initialData) {
    return EMPTY_RECIPE_FORM;
  }

  return {
    name: initialData.name ?? "",
    category: initialData.category ?? "Dinner",
    description: initialData.description ?? "",
    ingredients: Array.isArray(initialData.ingredients) ? initialData.ingredients.join("\n") : (initialData.ingredients ?? ""),
    instructions: Array.isArray(initialData.instructions) ? initialData.instructions.join("\n") : (initialData.instructions ?? ""),
    prepTime: initialData.prepTime ?? "",
    cookTime: initialData.cookTime ?? "",
    servings: initialData.servings ?? "",
  };
}

function RecipeForm({
  onSubmit,
  isSubmitting,
  initialData = null,
  submitLabel = "Save Recipe",
  successMessage = "Recipe saved successfully.",
  resetOnSuccess = true,
}) {
  const [formData, setFormData] = useState(toFormData(initialData));
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setMessage("");

    if (!formData.name.trim() || !formData.ingredients.trim() || !formData.instructions.trim()) {
      setFormError("Please add a name, ingredients, and instructions.");
      return;
    }

    try {
      await onSubmit(formData);
      if (successMessage) {
        setMessage(successMessage);
      }

      if (resetOnSuccess) {
        setFormData(EMPTY_RECIPE_FORM);
      }
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <label>
        Recipe Name
        <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Spicy tomato pasta" />
      </label>

      <label>
        Category
        <select name="category" value={formData.category} onChange={handleChange}>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        Short Description
        <input name="description" type="text" value={formData.description} onChange={handleChange} placeholder="Comfort food in under 30 minutes" />
      </label>

      <div className="time-grid">
        <label>
          Prep (minutes)
          <input name="prepTime" type="number" min="0" value={formData.prepTime} onChange={handleChange} />
        </label>
        <label>
          Cook (minutes)
          <input name="cookTime" type="number" min="0" value={formData.cookTime} onChange={handleChange} />
        </label>
        <label>
          Servings
          <input name="servings" type="number" min="1" value={formData.servings} onChange={handleChange} />
        </label>
      </div>

      <label>
        Ingredients
        <textarea name="ingredients" rows="5" value={formData.ingredients} onChange={handleChange} placeholder={"Pasta\nCanned tomatoes\nGarlic\nBasil"} />
        <span className="field-hint">Enter one ingredient per line. Press Enter after each ingredient.</span>
      </label>

      <label>
        Instructions
        <textarea
          name="instructions"
          rows="6"
          value={formData.instructions}
          onChange={handleChange}
          placeholder={"Boil the pasta until al dente.\nSimmer the sauce for 10 minutes.\nCombine everything and serve."}
        />
        <span className="field-hint">Enter one step per line. The recipe page will number each line for you automatically.</span>
      </label>

      {formError && <p className="message error">{formError}</p>}
      {message && <p className="message success">{message}</p>}

      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default RecipeForm;
