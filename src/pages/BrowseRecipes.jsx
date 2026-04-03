import { useMemo, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { CATEGORIES } from "../data/recipeSeed";
import { useRecipes } from "../hooks/useRecipes";

function matchesSearch(recipe, searchTerm) {
  const searchableText = [recipe.name, recipe.category, recipe.ingredients.join(" ")].join(" ").toLowerCase();
  return searchableText.includes(searchTerm);
}

function BrowseRecipes() {
  const { recipes, isLoading, error } = useRecipes();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const categoryMatch = category === "All" || recipe.category === category;
      const searchMatch = !normalizedQuery || matchesSearch(recipe, normalizedQuery);
      return categoryMatch && searchMatch;
    });
  }, [recipes, category, normalizedQuery]);

  return (
    <section className="stack-gap">
      <article className="panel">
        <p className="eyebrow">Browse and search</p>
        <h2>Find a recipe fast</h2>
        <div className="filter-bar">
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, ingredient, or category" />
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="All">All Categories</option>
            {CATEGORIES.map((categoryOption) => (
              <option key={categoryOption} value={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </select>
        </div>
      </article>

      {isLoading && <p>Loading recipes...</p>}
      {error && <p className="message error">{error}</p>}

      {!isLoading && !error && filteredRecipes.length > 0 && (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      {!isLoading && !error && filteredRecipes.length === 0 && (
        <article className="panel">
          <h3>No recipes found</h3>
          <p>Try another keyword or category to find what you are looking for.</p>
        </article>
      )}
    </section>
  );
}

export default BrowseRecipes;
