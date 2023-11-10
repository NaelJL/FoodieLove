import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom";
import { apiKey } from '../Config';
import { Undo2 } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Results() {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true)

    // catch the sended informations
    const location = useLocation()
    const additionnalInfo = location.state

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const results = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${additionnalInfo.ingredient}&apiKey=${apiKey}`);
                    const data = await results.json();
                    setRecipes(data);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData()
    }, [additionnalInfo]);

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
                    <p className="text-mainTextColor mt-20 md:mt-8 bg-mainBackgroundColor p-5 rounded-lg">No recipes for now</p>
                }
            </section>
        </div>
        )}
        </>
    )
}