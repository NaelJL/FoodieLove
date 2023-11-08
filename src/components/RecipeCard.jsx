import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RecipeCard({ id, title, image, usedIngredients = "", missedIngredients = "" }) {

    // Go to the correct page when the show recipe is clicked
    const navigate = useNavigate()
    const additionnalInfo = {
        id: id,
    }
    const handleButtonClick = () => {
        navigate(`/recipe/${id}`, { state: additionnalInfo });
    }

    return (
        <article className="p-6 w-96 bg-white shadow-lg shadow-gray-800 text-black rounded-lg">
            <img
                src={image} 
                alt={title}
                className='w-full bg-cover bg-no-repeat'
            />
            <h3>{title}</h3>
            <p className='text-left'>{usedIngredients}</p>
            <p className='text-left'>{missedIngredients}</p>
            <button 
                onClick={handleButtonClick}
                className="text-white bg-orange-700 px-4 py-3 mt-8 rounded-2xl border-none hover:cursor-pointer">
                Show the recipe
            </button>
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