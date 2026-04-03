import { Link } from "react-router-dom";
import { useRecipes } from "../hooks/useRecipes";

function Home() {
  const { recipes, isLoading, error } = useRecipes();
  const featuredRecipe = recipes[0];

  return (
    <section className="stack-gap">
      <article className="panel hero-panel">
        <p className="eyebrow">Plan your next meal</p>
        <h2>Build your personal recipe library.</h2>
        <p>Add your own dishes, keep one-click details, and browse everything in one place.</p>
        <div className="button-row">
          <Link className="button" to="/add">
            Add a Recipe
          </Link>
          <Link className="button button-ghost" to="/recipes">
            Browse Recipes
          </Link>
        </div>
      </article>

      <article className="panel">
        <h3>Featured Recipe</h3>
        {isLoading && <p>Loading recipes...</p>}
        {error && <p className="message error">{error}</p>}
        {!isLoading && !error && featuredRecipe && (
          <div className="featured-card">
            <p className="recipe-category">{featuredRecipe.category}</p>
            <h4>{featuredRecipe.name}</h4>
            <p>{featuredRecipe.description}</p>
            <Link className="button button-ghost" to={`/recipes/${featuredRecipe.id}`}>
              Open Recipe Detail
            </Link>
          </div>
        )}
      </article>
    </section>
  );
}

export default Home;
