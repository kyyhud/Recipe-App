import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AddRecipe from "./pages/AddRecipe";
import BrowseRecipes from "./pages/BrowseRecipes";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="add" element={<AddRecipe />} />
        <Route path="recipes" element={<BrowseRecipes />} />
        <Route path="recipes/:id" element={<RecipeDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
