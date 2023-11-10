import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { apiKey } from '../Config';
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
                    const results = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${additionnalInfo.info}&apiKey=${apiKey}`);
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
        <section className="list">
            {recipes ? 
                recipes.results.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        title={recipe.title.toLowerCase()}
                        image={recipe.image}
                    />)) : 
                <p className="text-mainTextColor mt-20 md:mt-8 bg-mainBackgroundColor p-5 rounded-lg">No recipes for now</p>
            }
            </section>
        )}
        </>
    )
}