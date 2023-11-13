import { NavLink, useLocation } from "react-router-dom";
import { Undo2 } from "lucide-react";
import UseFetchRecipes from "../components/UseFetchRecipes";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipeCard from "../components/RecipeCard";

export default function Results() {

    // catch the sended informations
    const location = useLocation()
    const additionnalInfo = location.state

    const apiEndpoint = `findByIngredients?ingredients=${additionnalInfo.ingredient}`;
    const { recipes, loading } = UseFetchRecipes({ apiEndpoint: apiEndpoint });

    return (
        <>
        {loading ? (
            <LoadingSpinner />
        ) : (
        <div>
            <div className="mt-4 ml-8">
                <NavLink to={'/'} className="flex flex-row">
                    <Undo2 color="white"/>
                    <p className="text-white ml-2">Back</p>
                </NavLink>
            </div>
            <section className="list">
                {recipes.length > 0 ? 
                    recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            title={recipe.title.toLowerCase()}
                            image={recipe.image}
                            usedIngredients={recipe.usedIngredients.map((ingredient) => ingredient.original).join(', ')}
                            missedIngredients={recipe.missedIngredients.map((ingredient) => ingredient.original).join(', ')}
                        />)) : 
                    <p className="text-mainTextColor mb-5 bg-mainBackgroundColor p-5 rounded-lg">No recipes for now</p>
                }
            </section>
        </div>
        )}
        </>
    )
}