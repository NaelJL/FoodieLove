import UseFetchRecipes from "./UseFetchRecipes";
import LoadingSpinner from "./LoadingSpinner";
import RecipeCard from './RecipeCard';

export default function TimeDependentRecipes(){

    // Recipes depending on the hour of the day
    const currentTime = new Date()
    var currentTimeString = currentTime.toLocaleTimeString();
    const currentHour = parseInt(currentTimeString.split(':')[0], 10);
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

    const apiEndpoint = `complexSearch?type=${recipe}`;
    const { recipes, loading } = UseFetchRecipes({ apiEndpoint: apiEndpoint });
    
    return (
        <>
        {loading ?
            (
                <LoadingSpinner />
            ) : (
                <div className="flex flex-row gap-4 flex-nowrap w-full">
                {recipes.results !== undefined && recipes.results.length > 0 ? 
                    recipes.results.map((recipe) => (
                        <RecipeCard 
                            key={recipe.id}
                            id={recipe.id}
                            image={recipe.image}
                            title={recipe.title}
                        />
                    )) :
                <p className="text-mainTextColor mb-5 bg-mainBackgroundColor p-5 rounded-lg">No recipes for now</p>
                }
            </div>
            )
        }
        </>
    )
}