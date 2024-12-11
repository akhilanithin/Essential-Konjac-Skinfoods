import { useRouter } from 'next/router';
import ALink from '~/components/features/custom-link';
import { mainMenu } from '~/utils/data/menu';

interface MenuItem {
    title: string;
    url: string;
    hot?: boolean;
    new?: boolean;
}

interface MainMenuProps {
    shop: {
        variation1: MenuItem[];
        variation2: MenuItem[];
    };
    product: {
        pages: MenuItem[];
        layout: MenuItem[];
    };
    other: MenuItem[];
    element: MenuItem[];
}

function MainMenu() {
    const { pathname } = useRouter();

    return (
        <nav className="main-nav mr-4">


            <ul className="menu menu-active">

                {/* home */}
                <li id="menu-home" className={pathname === '/' ? 'active' : ''}>
                    <ALink href="/">HOME</ALink>
                </li>


                {/* About Us */}

                <li>
                    <ALink href="/about-us/">ABOUT US</ALink>
                </li>



                {/* Shop */}
                <li>
                    <ALink href="/shop">SHOP</ALink>
                </li>




                {/* Aesthetics */}

                <li>
                    <ALink href="/aesthetics">AESTHETICS</ALink>
                </li>
  

           {/* Blogs */}

           <li>
                    <ALink href="/blog-posts/">BLOGS</ALink>
                </li>





                {/* Elements */}


                <li className={` d-xl-show submenu`}>
                    <ALink href="#">ELEMENTS</ALink>
                    <ul>
                        {mainMenu.element.map((item) => (
                            <li key={`elements-${item.title}`}>
                                <ALink href={`/${item.url}`}>
                                    {item.title}
                                </ALink>
                            </li>
                        ))}
                    </ul>
                </li>


     

                {/* FAQ */}

                <li>
                    <ALink href="/faqs/">FAQ</ALink>
                </li>

{/* Contact-Us */}
        
                <li>
                    <ALink href="/contact-us/">CONTACT</ALink>
                </li>


            </ul>
        </nav>
    );
}

export default MainMenu;
