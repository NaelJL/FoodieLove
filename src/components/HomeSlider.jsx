import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiKey } from '../Config';
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
import LoadingSpinner from "../components/LoadingSpinner";
import table from "../assets/brooke-lark-3TwtvW1vDCw-unsplash.jpg";

export default function HomeSlider(){
    
    const [recipes, setRecipes] = useState({ recipes: []});
    const [loading, setLoading] = useState(true);

    // Recipes depending on the hour of the day
    const currentTime = new Date()
    const currentHour = currentTime.toLocaleTimeString()
    let recipe = ''
    if (currentHour >= 6 && currentHour <= 10){
        recipe = 'breakfast'
    } else if (currentHour >= 11 && currentHour <= 13){
        recipe = 'main-course'
    } else if (currentHour >= 14 && currentHour <= 17){
        recipe = 'snack'
    } else if (currentHour >= 18 && currentHour <= 20){
        recipe = 'main-course'
    } else if (currentHour >= 21 && currentHour <= 5) {
        recipe = 'finger-food'
    }

    // Three random desserts to show on the home page
    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await fetch(`https://api.spoonacular.com/recipes/complexSearch?type=${recipe}&apiKey=${apiKey}`);
                const data = await results.json();
                setRecipes(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData()
    }, [recipe]);

    // Recipe image slider
    const recipeImages = recipes && recipes.recipes ? recipes.recipes.map(recipe => ({
        original: (recipe.image ? recipe.image : table),
        thumbnail: recipe.image,
        description: (
            <button onClick={() => handleViewRecipe(recipe.id)} className="recipe-link">
                {recipe.title}
            </button>
        ),
        onClick: () => handleViewRecipe(recipe.id),
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
        {loading ?
            (
                <LoadingSpinner />
            ) : (
                <div className="mt-4 bg-white p-2">
                    <ImageGallery 
                        items={recipeImages} 
                        showFullscreenButton={false} 
                        showPlayButton={false}
                        showThumbnails={false}
                        autoPlay={true}
                    />
                </div>
            )
        }
        </>
    )
}