import SeasonningRecipe from "../components/SeasoningRecipe";
import HomeSlider from "../components/HomeSlider";
import FastRecipes from "../components/FastRecipes";

export default function Home() {
    return (
        <section className="list">
            <div className="flex flex-col">
                <div>
                    <h3>Seasoning recipes</h3>
                    <SeasonningRecipe />
                </div>
                <div>
                    <h3>Needing an idea ?</h3>
                    <HomeSlider />
                </div>
                <div>
                    <h3>Under 20 minutes recipes</h3>
                    <FastRecipes />
                </div>
            </div>
        </section>
    )
}