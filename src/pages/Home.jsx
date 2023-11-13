import SeasonalRecipes from "../components/SeasonalRecipes";
import TimeDependentRecipes from "../components/TimeDependentRecipes";
import FastRecipes from "../components/FastRecipes";

export default function Home() {
    return (
        <section className="list">
            <div className="flex flex-col">
                <div>
                    <h3 className="text-center">Seasonal recipes</h3>
                    <SeasonalRecipes />
                </div>
                <div>
                    <h3 className="text-center">Need an idea ?</h3>
                    <TimeDependentRecipes />
                </div>
                <div>
                    <h3 className="text-center">Under 20 minutes recipes</h3>
                    <FastRecipes />
                </div>
            </div>
        </section>
    )
}