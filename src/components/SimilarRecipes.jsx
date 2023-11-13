import UseFetchRecipes from './UseFetchRecipes';
import PropTypes from 'prop-types';
import LoadingSpinner from "./LoadingSpinner";
import RecipeCard from "./RecipeCard";

export default function SimilarRecipes({ vegetarian, ingredients }){

    // if vegetarian is true, search vegetarian recipes, else search recipes with a similar ingredient
    let similarity = ''
    if (vegetarian !== 'unknown') {
        similarity = "complexSearch?diet=vegetarian"
    } else if (ingredients !== 'null' ) {
        const ingredientsList = ingredients.split('//')
        const getRandomIngredient = () => {
            const randomIndex = Math.floor(Math.random() * ingredientsList.length);
            return ingredientsList[randomIndex];
        }
        const randomIngredient = getRandomIngredient();
        similarity = `findByIngredients=${randomIngredient}`
    }

    const apiEndpoint = similarity;
    const { recipes, loading } = UseFetchRecipes({ apiEndpoint: apiEndpoint });
    
    return (
        <>
        {loading ?
            (
                <LoadingSpinner />
            ) : (
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                {recipes.length > 0 ? 
                    recipes.map((recipe) => (
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

SimilarRecipes.propTypes = {
    vegetarian: PropTypes.string,
    ingredients: PropTypes.string,
};