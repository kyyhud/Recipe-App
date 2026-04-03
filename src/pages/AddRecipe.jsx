import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { useRecipes } from "../hooks/useRecipes";

function AddRecipe() {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddRecipe = async (formData) => {
    setIsSubmitting(true);

    try {
      const newRecipe = await addRecipe(formData);
      navigate(`/recipes/${newRecipe.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="panel stack-gap">
      <div>
        <p className="eyebrow">Create recipe</p>
        <h2>Add your own recipe</h2>
        <p>Save the ingredients and steps so you can revisit them anytime.</p>
      </div>
      <RecipeForm onSubmit={handleAddRecipe} isSubmitting={isSubmitting} />
    </section>
  );
}

export default AddRecipe;
