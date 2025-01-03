import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'

import ALink from '~/components/features/custom-link';
import CartMenu from '~/components/common/partials/cart-menu';
import MainMenu from '~/components/common/partials/main-menu';
import SearchBox from '~/components/common/partials/search-box';
import LoginModal from '~/components/features/modals/login-modal';
import { headerBorderRemoveList } from '~/utils/data/menu';







interface HeaderProps {
    // Define any props that you might need
}

const Header: React.FC<HeaderProps> = (props) => {

  
    
    const router = useRouter();
    const transparent = 
        router.pathname === '/' ||
        router.pathname === '/shop' ||
        router.pathname === '/shop/infinite-scroll' ||
        router.pathname === '/shop/off-canvas-filter' ||
        router.pathname === '/shop/horizontal-filter' ||
        router.pathname === '/shop/navigation-filter' ||
        router.pathname === '/shop/right-sidebar' ||
        router.pathname === '/shop/grid/[grid]';

    const noborder = router.pathname.includes('404') || router.pathname.includes('elements');

    useEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            if (headerBorderRemoveList.includes(router.pathname) && header.classList.contains('header-border')) {
                header.classList.remove('header-border');
            } else if (!headerBorderRemoveList.includes(router.pathname)) {
                header.classList.add('header-border');
            }
        }
    }, [router.pathname]);

    const showMobileMenu = () => {
        document.querySelector('body')?.classList.add('mmenu-active');
    };



// const itemCount=10

const itemCount = useSelector(state => state?.wishlist?.data.length);






    return (
        <header className={`header ${!transparent ? 'p-relative' : ''} ${noborder ? 'no-border' : ''}`}>
            <div className='header sticky-header fix-top sticky-content'>
            <div className="header-top">
                <div className="container">
                    <div className="header-left">
                        <div className="welcome-msg">
                            <ALink href="https://maps.app.goo.gl/YNFfC6q9b7Zo4TYZ9" className="contact">
                                <i className="d-icon-map"></i>G05, Nadd Al Hamar Center, Dubai, UAE
                            </ALink>
                            <a href="#" className="help">
                                <i className="d-icon-info"></i>25 AED Standard Shipping All Over UAE
                            </a>
                        </div>
                    </div>
                    <div className="header-right">
                        <a className="call" href="tel:+97143856663">
                            <i className="d-icon-phone"></i>
                            <span>Call us: </span>+(971) 4-385-6663
                        </a>
                        
                            <ALink href="/pages/wishlist" className="wishlist">
                                <i className="d-icon-heart"></i>
                                {itemCount > 0 && (
                                    <span className="wishlist-count">{itemCount}</span>
                                )}
                                Wishlist
                            </ALink>

                        <LoginModal />
                        <CartMenu />
                    </div>
                </div>
            </div>

            <div className="header-middle ">
                <div className="container">
                    <div className="header-left">
                        <ALink href="#" className="mobile-menu-toggle" onClick={showMobileMenu}>
                            <i className="d-icon-bars2"></i>
                        </ALink>

                        <ALink href="/" className="logo d-none d-lg-block">
                            <img src='./images/home/logo.png' alt="logo" width="154" height="43" />
                        </ALink>

                           
                    </div>

                    <div className="header-center d-flex justify-content-center">
                        <ALink href="/" className="logo d-block d-lg-none">
                            <img src='./images/home/logo.png' alt="logo" width="160" height="50" />
                        </ALink>
                    </div>

                    <div className="header-right">
                        <MainMenu />
                        <span className="divider mr-4"></span>
                        <SearchBox />
                    </div>
                </div>
            </div>
            </div>
          
        </header>
    );
};

export default Header;
