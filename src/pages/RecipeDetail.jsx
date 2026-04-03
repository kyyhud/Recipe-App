import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { useRecipes } from "../hooks/useRecipes";
import { getRecipeById } from "../services/recipesApi";

function RecipeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { recipes, isLoading: isRecipesLoading, error: recipesError, editRecipe, removeRecipe } = useRecipes();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadRecipe() {
      setIsLoading(true);
      setError("");

      const localRecipe = recipes.find((item) => String(item.id) === String(id));
      if (localRecipe) {
        if (isMounted) {
          setRecipe(localRecipe);
          setIsEditing(false);
          setIsLoading(false);
        }
        return;
      }

      try {
        const fetchedRecipe = await getRecipeById(id);
        if (isMounted) {
          setRecipe(fetchedRecipe);
          setIsEditing(false);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadRecipe();

    return () => {
      isMounted = false;
    };
  }, [id, recipes]);

  if (isLoading || isRecipesLoading) {
    return <p>Loading recipe...</p>;
  }

  if (error || recipesError) {
    return <p className="message error">{error || recipesError}</p>;
  }

  if (!recipe) {
    return (
      <article className="panel stack-gap">
        <h2>Recipe not found</h2>
        <p>That recipe could not be located. It may have been removed.</p>
        <Link className="button" to="/recipes">
          Back to Browse
        </Link>
      </article>
    );
  }

  const handleUpdateRecipe = async (formData) => {
    setIsSaving(true);
    setError("");

    try {
      const updatedRecipe = await editRecipe(recipe.id, formData);
      setRecipe(updatedRecipe);
      setIsEditing(false);
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteRecipe = async () => {
    const shouldDelete = window.confirm("Delete this recipe? This cannot be undone.");
    if (!shouldDelete) {
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      await removeRecipe(recipe.id);
      navigate("/recipes");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isEditing) {
    return (
      <section className="panel stack-gap">
        <div className="recipe-actions">
          <h2>Edit Recipe</h2>
          <button className="button button-ghost" type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
        {error && <p className="message error">{error}</p>}
        <RecipeForm
          onSubmit={handleUpdateRecipe}
          isSubmitting={isSaving}
          initialData={recipe}
          submitLabel="Update Recipe"
          successMessage="Recipe updated successfully."
          resetOnSuccess={false}
        />
      </section>
    );
  }

  return (
    <section className="panel stack-gap">
      <div className="recipe-actions">
        <p className="recipe-category">{recipe.category}</p>
        <div className="button-row">
          <button className="button button-ghost" type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="button button-danger" type="button" onClick={handleDeleteRecipe} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>

      <div className="recipe-meta">
        <span>Prep: {recipe.prepTime} min</span>
        <span>Cook: {recipe.cookTime} min</span>
        <span>Serves: {recipe.servings}</span>
      </div>

      <div className="details-grid">
        <article>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Instructions</h3>
          <ol>
            {recipe.instructions.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}

export default RecipeDetail;
