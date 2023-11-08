import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header(){
    return (
        <header className="flex flex-col sm:flex-row justify-around">
            <h1>
                <NavLink to={'/'}>
                    Foodie Love
                </NavLink>
            </h1>
            <SearchBar />
        </header>
    )
}