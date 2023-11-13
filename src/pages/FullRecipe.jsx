import { useLocation } from "react-router-dom";
import UseFetchRecipes from "../components/UseFetchRecipes";
import LoadingSpinner from "../components/LoadingSpinner";
import FullRecipeCard from "../components/FullRecipeCard";
import SimilarRecipes from "../components/SimilarRecipes";

export default function FullRecipe(){

    // catch the sended informations
    const location = useLocation()
    const additionnalInfo = location.state
    
    const apiEndpoint = `${additionnalInfo.id}/information?includeNutrition=false`;
    const { recipes, loading } = UseFetchRecipes({ apiEndpoint: apiEndpoint });

    return (
        <>  
            {loading ? (
                <LoadingSpinner />
            ) : (
            <section className="list">
                <FullRecipeCard 
                    key={recipes.id}
                    id={recipes.id}
                    title={recipes.title}
                    image={recipes.image}
                    time={recipes.readyInMinutes == 'null' ? 'unknown' : recipes.readyInMinutes }
                    number={recipes.servings == 'null' ? 'unknown' : recipes.servings }
                    vegetarian={recipes.vegetarian == 'null' ? 'unknown' : recipes.vegetarian }
                    vegan={recipes.vegan == 'null' ? 'unknown' : recipes.vegan }
                    glutenFree={recipes.glutenFree == 'null' ? 'unknown' : recipes.glutenFree }
                    cheap={recipes.cheap == 'null' ? 'unknown' : recipes.cheap }
                    ingredients={recipes.extendedIngredients === 0 ? 'null' :
                        recipes.extendedIngredients.map((ingredient) => ingredient.original).join('//')
                    }
                    instructions={recipes.analyzedInstructions.length === 0 ? 'null' :
                        recipes.analyzedInstructions.map((instruction) => instruction.steps.map((step) => step.step)).flat().join('//')
                    }
                    source={recipes.sourceUrl}
                />
                <SimilarRecipes
                    key={recipes.id}
                    id={recipes.id}
                    vegetarian={recipes.vegetarian == 'null' ? 'unknown' : recipes.vegetarian }
                    ingredients={recipes.extendedIngredients === 0 ? 'null' :
                        recipes.extendedIngredients.map((ingredient) => ingredient.original).join('//')
                    }
                />
            </section> 
        )}
        </>
    )
}