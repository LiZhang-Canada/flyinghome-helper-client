import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo/logo.webp';
import account from '../../assets/images/account.svg';
import shoppingbag from '../../assets/images/shopping-bag.svg';

function Header(){


    return (
        <header className='header'>
            <div className='header__content-main-wrap'>
                <Link to="/" className='header-logo-link'>
                    <img className='header__logo' src={Logo} alt="logo" />
                </Link>
                <div className="header__nav">
                <Link to='/signup'>
                    <img className='header__icons' src={account} alt="account" />
                </Link>
                <Link to='/mylist'>
                    <img className='header__icons' src={shoppingbag} alt="shopping-bag"></img>
                </Link>
                </div>
                
            </div>
        </header>
    )
}
export default Header;