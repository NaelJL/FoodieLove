import { X, Dot, Timer, Utensils, Vegan, WheatOff, Coins, Instagram, Facebook } from "lucide-react"
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import table from "../assets/brooke-lark-3TwtvW1vDCw-unsplash.jpg"

export default function FullRecipeCard({ id, title, image, time, number, vegetarian, vegan, glutenFree, cheap, ingredients, instructions, source }){

    const navigate = useNavigate();

    // go back to the search page
    const handleGoBack = () => {
        navigate(-1)
    }

    // if the recipe is vg or vegan
    let vgFriendly = ''
    if(vegetarian === true || vegan === true){
        vgFriendly = 'Vegetarian friendly'
    }

    // show a list of the ingredients
    let ingredientsListFinal = ''
    if (ingredients !== 'null') {
        const ingredientsList = ingredients.split('//')
        ingredientsListFinal = ingredientsList.map((ingredient, index) => {
            return (
                <ul key={index}>
                    <li className="flex flex-row">
                        <Dot />
                        <p>{ingredient}</p>
                    </li>
                </ul>
        )})
    } else {
        ingredientsListFinal = (
            <a href={source} target="blank" className="text-sm font-bold text-mainTextColor bg-mainBackgroundColor px-4 py-3 mt-8 rounded-2xl border-none hover:cursor-pointer inline-block">
                {source ? 'See the original' : ''}
            </a>)
    }

    // show a list of the instructions
    let instructionsListFinal = ''
    if (instructions !== 'null') {
        const instructionsList = instructions.split('//')
        instructionsListFinal = instructionsList.map((instruction, index) => {
            return (
                <div key={index} className="flex flex-row items-start gap-4 mb-4">
                    <div className="bg-mainBackgroundColor font-black text-mainTextColor p-3 rounded-lg mt-1">{index}</div>
                    <div className="self-center">{instruction}</div>
                </div>
            )
        })
    } else {
        instructionsListFinal = (
            <a href={source} target="blank" className="text-sm font-bold text-mainTextColor bg-mainBackgroundColor px-4 py-3 mt-8 rounded-2xl border-none hover:cursor-pointer inline-block">
                {source ? 'See the original' : ''}
            </a>)
    }

    // share on Pinterest
    const shareOnPinterest = () => {
        const recipeUrl = encodeURIComponent(`http://localhost:5173/recipe/${id}`);
        const imageUrl = encodeURIComponent(`https://${image}`);
      
        window.open(`https://www.pinterest.com/pin/create/button/?url=${recipeUrl}&media=${imageUrl}`, '_blank');
      };

      // share on Facebook
      const shareOnFacebook = () => {
        const recipeUrl = encodeURIComponent(`http://localhost:5173/recipe/${id}`);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${recipeUrl}`, '_blank');
      };

    return (
        <article className="m-4 sm:m-6 lg:m-10 p-6 w-full bg-articleBackground text-articleText rounded-lg">
            <button onClick={handleGoBack} className="mb-2">
                <X color="black" />
            </button>
            <div className="flex flex-col md:flex-row mb-8 justify-start">
                <div className="flex flex-col">
                    <h3>{title ? title : "No title"}</h3>
                    <div className="mb-4 self-end md:self-start">
                        {time && <p className="flex flex-row align-center gap-2 items-center"><Timer size={16} />{time} minutes</p>}
                        {number && <p className="flex flex-row align-center gap-2 items-center"><Utensils size={16} />For {number} persons</p>}
                        {vgFriendly && <p className="flex flex-row align-center gap-2 items-center"><Vegan size={16} />{vgFriendly}</p>}
                        {glutenFree === true && <p className="flex flex-row align-center gap-2 items-center"><WheatOff size={16} />Gluten free</p>}
                        {cheap === true && <p className="flex flex-row align-center gap-2 items-center"><Coins size={16} />Cheap</p>}
                    </div>
                </div>
                <img 
                    src={image ? image : table} 
                    alt={title} 
                    className="mx-auto w-full md:w-6/12 md:mx-8 md:order-first"
                />
            </div>
            <div className="mx-7 bg-secondBackgroundColor text-secondTextColor rounded-lg p-3 italic inline-block"> 
                {ingredientsListFinal}
            </div>
            <p className="mt-8 sm:mt-12">{instructionsListFinal}</p>
            <div className="flex flex-row justify-end mt-8 gap-2">
                <button onClick={shareOnPinterest}>
                    <Instagram />
                </button>
                <button onClick={shareOnFacebook}>
                    <Facebook />
                </button>
                <p><a href={source} target="blank" className="text-sm font-bold text-mainTextColor bg-mainBackgroundColor px-4 py-3 rounded-2xl border-none hover:cursor-pointer inline-block">{source ? 'See the original' : ''}</a></p>
            </div>
        </article>
    )
}

FullRecipeCard.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    time: PropTypes.string,
    number: PropTypes.string,
    vegetarian: PropTypes.string,
    vegan: PropTypes.string,
    glutenFree: PropTypes.string,
    cheap: PropTypes.string,
    ingredients: PropTypes.string,
    instructions: PropTypes.string,
    source: PropTypes.string,
};