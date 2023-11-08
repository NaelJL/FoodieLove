import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiKey } from '../Config';
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Three random recipes to show on the home page
    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await fetch(`https://api.spoonacular.com/recipes/random?number=6&tags=vegetarian&apiKey=${apiKey}`);
                const data = await results.json();
                setRecipes(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // Recipe image slider
    const recipeImages = recipes && recipes.recipes ? recipes.recipes.map(recipe => ({
        original: recipe.image,
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
        // show the recipes when the request to the API is done
        <section className="list">
            <ImageGallery 
                items={recipeImages} 
                showFullscreenButton={false} 
                showPlayButton={false}
                showThumbnails={false}
                autoPlay={true}
            />
        </section>
        )}
        </>
    )
}