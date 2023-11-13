import UseFetchRecipes from "./UseFetchRecipes";
import RecipeCard from "./RecipeCard";
import LoadingSpinner from "./LoadingSpinner";

export default function SeasonalRecipes(){

    // Array of the vegetables depending of the season
    const seasons = [
        {season: 'winter', 
        vegetables: ['brocoli', 'kale', 'celeriac', 'leek', 'carrot', 'cabbage', 'squash']},
        {season: 'spring',
        vegetables: ['asparagus', 'cauliflower', 'pea', 'turnip', 'radish']},
        {season: 'summer',
        vegetables: ['eggplant', 'zucchini', 'tomato', 'cucumber', 'salad']},
        {season: 'autumn',
        vegetables: ['squash', 'leeks', 'cabbage', 'celeriac']}
    ]

    // Current season
    const getSeason = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        if (currentMonth >= 3 && currentMonth <= 5) {
          return 'spring';
        } else if (currentMonth >= 6 && currentMonth <= 8) {
          return 'summer';
        } else if (currentMonth >= 9 && currentMonth <= 11) {
          return 'autumn';
        } else {
          return 'winter';
        }
    };
    const currentSeason = getSeason()

    // Random vegetable from the current season
    const currentVegetables = seasons.find(seasonEntry => seasonEntry.season === currentSeason)?.vegetables
    const getRandomVegetable = () => {
        if (currentVegetables.length === 0) {
            return 'No vegetables available for the current season';
        }
        const randomIndex = Math.floor(Math.random() * currentVegetables.length);
        return currentVegetables[randomIndex];
    };
    const randomVegetable = getRandomVegetable();

    // Recipes with a random vegetable
    const apiEndpoint = `findByIngredients?ingredients=${randomVegetable}`;
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