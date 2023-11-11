import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiKey } from '../Config';
import LoadingSpinner from "./LoadingSpinner";
import table from "../assets/brooke-lark-3TwtvW1vDCw-unsplash.jpg";

export default function HomeSlider(){
    
    const [recipes, setRecipes] = useState({ recipes: []});
    const [loading, setLoading] = useState(true);

    // Three fast recipes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await fetch(`https://api.spoonacular.com/recipes/complexSearch?maxReadyTime=20&apiKey=${apiKey}`);
                const data = await results.json();
                setRecipes(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData()
    }, []);

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
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                {recipes.length > 0 ? 
                    recipes.map((recipe) => (
                        <article key={recipe.id} className="p-6 w-56 bg-articleBackground text-articleText rounded-lg">
                            <img src={recipe.image ? recipe.image : table} alt={recipe.title} />
                            <p>{recipe.title}</p> 
                            <button 
                                onClick={() => handleViewRecipe(recipe.id)}
                                className="text-mainTextColor bg-mainBackgroundColor px-4 py-3 mt-8 rounded-2xl border-none hover:cursor-pointer">
                                Show the recipe
                            </button>
                        </article>
                        )) : 
                        <p className="text-mainTextColor mt-20 md:mt-8 bg-mainBackgroundColor p-5 rounded-lg">No recipes for now</p>
                }
            </div>
            )
        }
        </>
    )
}