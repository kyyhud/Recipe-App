import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  const ingredientPreview = recipe.ingredients.slice(0, 3).join(", ");

  return (
    <article className="recipe-card">
      <p className="recipe-category">{recipe.category}</p>
      <h3>{recipe.name}</h3>
      <p>{recipe.description}</p>
      <p className="recipe-preview">{ingredientPreview}</p>
      <div className="recipe-meta">
        <span>{recipe.prepTime + recipe.cookTime} min total</span>
        <span>{recipe.servings} servings</span>
      </div>
      <Link className="button button-ghost" to={`/recipes/${recipe.id}`}>
        View Recipe
      </Link>
    </article>
  );
}

export default RecipeCard;
