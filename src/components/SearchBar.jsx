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

    // Go to the results page when the search button is clicked
    const handleSubmit = (event) => {
        event.preventDefault();
        const additionnalInfo = {
            ingredient: ingredient,
        }
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
                    className="text-black cursor-pointer p-2 rounded-lg text-base border border-mainBackgroundColor"
                />
                <button type="submit" className="ml-4">
                    <Search color="white"/>
                </button>
            </form>
        </div>
    )
}