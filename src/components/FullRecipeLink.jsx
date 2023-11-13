import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function FullRecipeLink ({ info }) {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    const additionalInfo = {
      info: info,
    };
    navigate(`/recipe/${info}`, { state: additionalInfo });
  };

  return (
    <button 
        onClick={handleButtonClick}
        className="text-mainTextColor bg-mainBackgroundColor px-4 py-3 mt-8 rounded-2xl border-none hover:cursor-pointer"
    >
      Show Recipe
    </button>
  );
}

FullRecipeLink.propTypes = {
    info: PropTypes.number,
};