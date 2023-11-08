import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBar() {

    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState('');

    // When the user changes the input
    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };
    const ingredient = searchInput.toLowerCase();
    
    // Additionnal info to pass the ingredient name
    const additionnalInfo = {
        ingredient: ingredient,
    }

    // Go to the results page when the search button is clicked
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search/${ingredient}`, { state: additionnalInfo });
    }

    return (
        <div className="flex flex-row justify-center mb-8 sm:mb-0 self-center">
            <form onSubmit={handleSubmit} className="flex flex-row justify-center content-center">
                <input 
                    type="text"
                    placeholder="Search an ingredient"
                    aria-label="Search an ingredient" 
                    value={searchInput}
                    onChange={handleInputChange}
                    className="text-black cursor-pointer p-2 rounded-lg text-base border border-gray-300"
                />
                <button type="submit" className="ml-4">
                    <Search color="white"/>
                </button>
            </form>
        </div>
    )
}