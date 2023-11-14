import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar(){

    const navigate = useNavigate()
    const [menuDisplayed, setMenuDisplayed] = useState('')
    const [burgerMenuVisible, setBurgerMenuVisible] = useState(false);
    
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
            {/* Burger menu */}
            <div className="burger-icon">
                <button onClick={() => setBurgerMenuVisible(!burgerMenuVisible)}>
                    <Menu />
                </button>
            </div>

            <div className="menu-container">

            {/* Main menu on mobile */}
            {burgerMenuVisible && (
                <div className="main-menu-mobile">
                    {menuData.map((element) => {
                        const category = element.category;
                        return (
                            <div className="relative flex flex-row" key={category}>
                                <button onClick={() => displayMenu(category)}
                                    key={category}
                                    className={menuDisplayed === category ? 'font-black' : ''}>
                                        By {category}
                                </button>
                                <div className={menuDisplayed === category ? "absolute right-[-32px] bottom-[0px] h-6 w-6 bg-mainBackgroundColor rounded-full text-mainBackgroundColor" : 'text-transparent bg-transparent'}>°
                                </div>
                            </div>
                        )})} 
                </div>
            )}
            {/* Sub menu on mobile */}
            {menuDisplayed && burgerMenuVisible &&
                <div className='sub-menu-mobile'>
                    {menuData.find((category) => category.category === menuDisplayed)?.items.map((element) => {
                        const name = element.name
                        return (
                            <button onClick={() => handleView(`${menuDisplayed}=${name}`, name)}
                                className={window.location.pathname === `/main/${name}` ? 'bg-white text-black px-2 rounded-xl' : ''}
                                key={name}>
                                {element.label}
                            </button>
                )})}
                </div>}

            {/* Main menu on other screens*/}
            <div className="main-menu">
                {menuData.map((element) => {
                    const category = element.category;
                    return (
                        <div className="flex flex-row relative" key={category}>
                            <button onClick={() => displayMenu(category)}
                                key={category}
                                className={menuDisplayed === category ? 'font-black' : ''}>
                                By {category}
                            </button>
                            <div className={menuDisplayed === category ? "absolute bottom-[-28px] left-5 h-6 w-6 bg-mainBackgroundColor rounded-full text-mainBackgroundColor" : 'text-transparent bg-transparent'}>°</div>
                        </div>
                )})} 
            </div>
            {/* Sub menu on other screens */}
            {menuDisplayed &&
                <div className="sub-menu">
                    {menuData.find((category) => category.category === menuDisplayed)?.items.map((element) => {
                        const name = element.name
                        return (
                            <button onClick={() => handleView(`${menuDisplayed}=${name}`, name)}
                                className={window.location.pathname === `/main/${name}` ? 'bg-white text-black px-2 rounded-xl' : ''}
                                key={name}>
                                {element.label}
                            </button>
                )})}
                </div>}
            </div>
        </nav>
    )
}