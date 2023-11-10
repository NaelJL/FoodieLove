import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { apiKey } from '../Config';
import FullRecipeCard from "../components/FullRecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SimilarRecipeCard from "../components/SimilarRecipeCard";

export default function FullRecipe(){

    const [recipe, setRecipe] = useState('')
    const [loading, setLoading] = useState(true)

    // catch the sended informations
    const location = useLocation()
    const additionnalInfo = location.state

    const id = additionnalInfo.id

    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`
                const results = await fetch(api);
                const data = await results.json();
                setRecipe(data);
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <>  
            {loading ? (
                <LoadingSpinner />
            ) : (
            <section className="list">
                <FullRecipeCard 
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    time={recipe.readyInMinutes == 'null' ? 'unknown' : recipe.readyInMinutes }
                    number={recipe.servings == 'null' ? 'unknown' : recipe.servings }
                    vegetarian={recipe.vegetarian == 'null' ? 'unknown' : recipe.vegetarian }
                    vegan={recipe.vegan == 'null' ? 'unknown' : recipe.vegan }
                    glutenFree={recipe.glutenFree == 'null' ? 'unknown' : recipe.glutenFree }
                    cheap={recipe.cheap == 'null' ? 'unknown' : recipe.cheap }
                    ingredients={recipe.extendedIngredients === 0 ? 'null' :
                        recipe.extendedIngredients.map((ingredient) => ingredient.original).join('//')
                    }
                    instructions={recipe.analyzedInstructions.length === 0 ? 'null' :
                        recipe.analyzedInstructions.map((instruction) => instruction.steps.map((step) => step.step)).flat().join('//')
                    }
                    source={recipe.sourceUrl}
                />
                <SimilarRecipeCard 
                    key={recipe.id}
                    id={recipe.id}
                />
            </section> 
        )}
        </>
    )
}