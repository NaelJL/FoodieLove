import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiKey } from '../Config';
import PropTypes from 'prop-types';
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
import LoadingSpinner from "../components/LoadingSpinner";
import table from "../assets/brooke-lark-3TwtvW1vDCw-unsplash.jpg"

export default function SimilarRecipeCard({ id }){

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    // 6 similar recipes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await fetch(`https://api.spoonacular.com/recipes/${id}/similar?number=6&apiKey=${apiKey}`);
                const data = await results.json();
                setRecipes(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    // Recipe image slider
    const recipeImages = recipes && recipes.recipes ? recipes.recipes.map(recipe => ({
        original: (recipe.image ? recipe.image : table),
        thumbnail: recipe.image,
        description: (
            <button onClick={() => handleViewRecipe(recipe.id)} className="recipe-link">
                {recipe.title}
            </button>
        ),
    })) : [];

    // Go to the full recipe page
    const navigate = useNavigate()
    const handleViewRecipe = (specificId) => {
        const additionnalInfo = {
            id: specificId,
        }
        navigate(`/recipe/${specificId}`, { state: additionnalInfo });
    }

    return (
        <>
        {loading ? (
            <LoadingSpinner />
        ) : (
            <>
            <h3>Similar Recipes</h3>
            <ImageGallery 
                items={recipeImages} 
                showFullscreenButton={false} 
                showPlayButton={false}
                showThumbnails={false}
                autoPlay={true}
            />
            </>
        )}
        </>
    )
}

SimilarRecipeCard.propTypes = {
    id: PropTypes.number,
};