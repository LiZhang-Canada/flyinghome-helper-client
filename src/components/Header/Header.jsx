import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo/logo.webp';

function Header(){


    return (
        <header className='header'>
            <div className='header__content-main-wrap'>
                <Link to="/" className='header-logo-link'>
                    <img className='header__logo' src={Logo} alt="logo" />
                </Link>
            </div>
        </header>
    )
}
export default Header;