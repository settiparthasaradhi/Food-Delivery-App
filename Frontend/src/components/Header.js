import LogoImage from "./logo.jpg";
import './Header.css'
const Header = () => {
    return (
        <header id="main-header">
            <div id="title">
                <img src={LogoImage} alt="Logo" />
                <h1>Food-Ordering-App</h1>
            </div>
            
        </header>
    );
}

export default Header;

 