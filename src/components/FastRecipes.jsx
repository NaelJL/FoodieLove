import UseFetchRecipes from "./UseFetchRecipes";
import LoadingSpinner from "./LoadingSpinner";
import RecipeCard from './RecipeCard'

export default function FastRecipes(){
    
    const apiEndpoint = 'complexSearch?maxReadyTime=20';
    const { recipes, loading } = UseFetchRecipes({ apiEndpoint: apiEndpoint });

    return (
        <>
        {loading ?
            (
                <LoadingSpinner />
            ) : (
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                {recipes.results !== undefined ?
                    recipes.results.length > 0 ? 
                        recipes.results.map((recipe) => (
                            <RecipeCard 
                                key={recipe.id}
                                id={recipe.id}
                                image={recipe.image}
                                title={recipe.title}
                            />
                            ))
                        : <p className="text-mainTextColor mb-5 bg-mainBackgroundColor p-5 rounded-lg">No recipes for now</p>
                : <p className="text-mainTextColor mb-5 bg-mainBackgroundColor p-5 rounded-lg">No recipes for now</p>
                }
            </div>
            )
        }
        </>
    )
}