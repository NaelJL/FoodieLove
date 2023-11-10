import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar(){

    const navigate = useNavigate()
    const [menuDisplayed, setMenuDisplayed] = useState('')
    
    // menu data
    const menuData = [
        { category: 'type',
        items: [
            { label: 'Appetizer', name: 'appetizer' },
            { label: 'Main course', name: 'main-course' },
            { label: 'Salad', name: 'salad' },
            { label: 'Dessert', name: 'dessert' },
            { label: 'Sauce', name: 'sauce' },
            { label: 'Finger food', name: 'finger-food' },
            { label: 'Beverage', name: 'beverage' },
        ]},
        { category: 'cuisine',
        items: [
            { label: 'Italian', name: 'italian' },
            { label: 'Greek', name: 'greek' },
            { label: 'Asian', name: 'asian' },
            { label: 'European', name: 'european' },
            { label: 'Indian', name: 'indian' },
            { label: 'Mexican', name: 'mexican' },
            { label: 'Japanese', name: 'japanese' },
            { label: 'Caribbean', name: 'caribbean' },
        ]},
        { category: 'theme',
        items: [
            { label: 'Halloween', name: 'halloween' },
            { label: 'Thanksgiving', name: 'thanksgiving' },
            { label: 'Christmas', name: 'christmas' },
        ]},
        {category: 'diet',
        items: [
            { label: 'Vegan', name: 'vegan' },
            { label: 'Vegetarian', name: 'vegetarian' },
            { label: 'Gluten free', name: 'gluten-free' },
            { label: 'Eggs free', name: 'eggs-free' },
        ]}
    ]

    // display the submenu
    const displayMenu = (category) => {
        setMenuDisplayed(menuDisplayed === category ? '' : category)
    }

    // Go to the main page when the link in the navbar is clicked
    const handleView = (info, name) => {
        const additionnalInfo = {
            info: info,
        }
        navigate(`/main/${name}`, { state: additionnalInfo });
    }

    return (
        <nav className="bg-navStyleBackground text-navStyleText border-b-mainBackgroundColor">
            {/* Main menu */}
            <div className="hidden sm:block sm:flex sm:flex-row p-6 bg-white gap-4 justify-center content-center">
                {menuData.map((element) => {
                    const category = element.category;
                    return (
                        <button onClick={() => displayMenu(category)}
                            className={menuDisplayed === category ? 'bg-mainBackgroundColor rounded-xl text-mainTextColor p-2' : ''}
                            key={category}>
                            By {category}
                        </button>
                )})} 
            </div>

            {/* Sub menu */}
            <div className="bg-none">
                {menuDisplayed &&
                <div className="hidden sm:block sm:flex sm:flex-row p-2 bg-mainBackgroundColor text-mainTextColor gap-4 justify-center">
                    {menuData.find((category) => category.category === menuDisplayed)?.items.map((element) => {
                        const name = element.name
                        return (
                            <button onClick={() => handleView(`type=${name}`, name)}
                                className={window.location.pathname === `/main/${name}` ? 'bg-white text-black p-2 rounded-xl' : ''}
                                key={name}>
                                {element.label}
                            </button>
                    )})}
                </div>
                }
            </div>
        </nav>
    )
}