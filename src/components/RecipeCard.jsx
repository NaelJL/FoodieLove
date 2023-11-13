import PropTypes from 'prop-types';
import table from "../assets/brooke-lark-3TwtvW1vDCw-unsplash.jpg"
import FullRecipeLink from "./FullRecipeLink"

export default function RecipeCard({ id, title, image, usedIngredients = "", missedIngredients = "" }) {

    return (
        <article className="p-6 w-96 bg-articleBackground text-articleText shadow-lg shadow-gray-800 rounded-lg">
            <img
                src={image ? image : table}  
                alt={title}
                className='w-full bg-cover bg-no-repeat'
            />
            <p className='text-black'>{title}</p>
            <p className='text-left'><b>{usedIngredients ? usedIngredients : ''}</b></p>
            <p className='text-left'>{missedIngredients ? missedIngredients : ''}</p>
            <FullRecipeLink 
                key={id}
                info={id}
            />
        </article>
    )
}

RecipeCard.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    usedIngredients: PropTypes.string,
    missedIngredient: PropTypes.string
};