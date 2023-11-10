import { useEffect, useState } from "react";
import table from "../assets/brooke-lark-3TwtvW1vDCw-unsplash.jpg";
import { useNavigate } from "react-router-dom";

export default function SeasonningRecipeCard(){

    const [recipes, setRecipes] = useState()

    // Array of the vegetables depending of the season
    const seasons = [
        {season: 'winter', 
        vegetables: ['brocoli', 'kale', 'celeriac', 'leek', 'carrot', 'cabbage', 'squash']},
        {season: 'spring',
        vegetables: ['asparagus', 'cauliflower', 'pea', 'turnip', 'radish']},
        {season: 'summer',
        vegetables: ['eggplant', 'zucchini', 'tomato', 'cucumber']},
        {season: 'autumn',
        vegetables: ['squash', 'leeks', 'cabbage']}
    ]

    // Find the current season
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

    // Vegetable from the current season
    const currentVegetables = seasons.find(seasonEntry => seasonEntry.season === currentSeason)?.vegetables

    // Random vegetable from the current season
    const getRandomVegetable = () => {
        if (currentVegetables.length === 0) {
            return 'No vegetables available for the current season';
        }
        const randomIndex = Math.floor(Math.random() * currentVegetables.length);
        return currentVegetables[randomIndex];
    };
    const randomVegetable = getRandomVegetable();
    
    // Ask for recipes with current season vegetables
    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${randomVegetable}&apiKey=${apiKey}`);
                const data = await results.json();
                setRecipes(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [randomVegetable]);

    // Go to the correct page when the show recipe is clicked
    const navigate = useNavigate()
    const handleButtonClick = (id) => {
        const additionnalInfo = {
            id: id,
        }
        navigate(`/recipe/${id}`, { state: additionnalInfo });
    }

    return (
        <div className="flex flex-row gap-4 flex-wrap justify-center">
            {recipes.length > 0 ? 
                recipes.map((recipe) => (
                    <article key={recipe.id} className="p-6 w-56 bg-articleBackground text-articleText rounded-lg">
                        <img src={recipe.image ? recipe.image : table} alt={recipe.title} />
                        <p>{recipe.title}</p> 
                        <button 
                            onClick={() => handleButtonClick(recipe.id)}
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