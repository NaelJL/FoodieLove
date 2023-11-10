import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";

export default function Header(){
    return (
        <header >
            <div className="header-background flex flex-col sm:flex-row justify-around border-b-2 border-b-mainBackgroundColor">
                <h1>
                    <NavLink to={'/'}>
                        Foodie Love
                    </NavLink>
                </h1>
                <SearchBar />
            </div>
            <NavBar />
        </header>
    )
}