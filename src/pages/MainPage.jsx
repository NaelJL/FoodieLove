import { useLocation } from "react-router-dom";
import UseFetchRecipes from "../components/UseFetchRecipes";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipeCard from "../components/RecipeCard";

export default function MainPage() {

    // catch the sended informations
    const location = useLocation()
    const additionnalInfo = location.state

    const apiEndpoint = `complexSearch?${additionnalInfo.info}`;
    const { recipes, loading } = UseFetchRecipes({ apiEndpoint: apiEndpoint });

    return (
        <>
        {loading ? (
            <LoadingSpinner />
        ) : (
        <section className="list">
            {recipes.results !== undefined ?
                recipes.results.length > 0 ? 
                    recipes.results.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            title={recipe.title.toLowerCase()}
                            image={recipe.image}
                        />))
                    : <p className="text-mainTextColor mb-5 bg-mainBackgroundColor p-5 rounded-lg">No recipes for now</p>
                : <p className="text-mainTextColor mb-5 bg-mainBackgroundColor p-5 rounded-lg">No recipes for now</p>
                }
            </section>
        )}
        </>
    )
}