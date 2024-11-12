import React from 'react';
import { connect } from 'react-redux';
import ALink from '~/components/features/custom-link';
import { cartActions } from '~/store/cart';
import { getTotalPrice, getCartCount, toDecimal } from '~/utils';
import { useSelector } from 'react-redux'

// Define the types for the cart item and the props
interface CartItem {
    id: number;
    image: string;
    name: string;
    slug: string;
    qty: number;
}

interface CartMenuProps {
    cartList: CartItem[];
    removeFromCart: (item: CartItem) => void;
}

const CartMenu: React.FC<CartMenuProps> = (props) => {
    const { cartList, removeFromCart } = props;

    const PRODUCT_IMAGE_BASEURL = process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASEURL;

    const showCartMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.currentTarget.closest('.cart-dropdown')?.classList.add('opened');
    };

    const hideCartMenu = () => {
        const dropdown = document.querySelector('.cart-dropdown');
        if (dropdown?.classList.contains('opened')) {
            dropdown.classList.remove('opened');
        }
    };

    const removeCart = (item: CartItem) => {
        removeFromCart(item);
    };



    const itemCount = useSelector(state => state.cart?.data?.length);

    return (
        <>
            <div className="dropdown cart-dropdown cart-offcanvas type3 ml-2">

                <a href="#" className="cart-toggle" onClick={showCartMenu}>
                    <div className='carts'>
                        <i className="d-icon-bag"></i>
                        {itemCount > 0 ? (
                                    <span className="cart-counts">{itemCount}</span>
                                ) : (
                                    <span className="cart-counts" style={{ display: 'none' }}></span>
                                )}
                        My Cart
                    </div>
                </a>
                
                <div className="cart-overlay" onClick={hideCartMenu}></div>
                <div className="dropdown-box">
                    <div className="cart-header">
                        <h4 className="cart-title">Shopping Cart</h4>
                        <ALink href="#" className="btn btn-dark btn-link btn-icon-right btn-close" onClick={hideCartMenu}>
                            close<i className="d-icon-arrow-right"></i><span className="sr-only">Cart</span>
                        </ALink>
                    </div>
                    {
                        cartList.length > 0 ? (
                            <>
                                <div className="products scrollable">
                                    {
                                        cartList.map((item, index) => (
                                            <div className="product product-cart" key={`cart-menu-product-${index}`}>

                                                <figure className="product-media pure-media"
                                            >
                                                    <ALink href={`/product/default/${item?.id}`}>
                                                        <img
                                                            src={`${PRODUCT_IMAGE_BASEURL}/products/${item?.image}`}
                                                            alt="product"
                                                            width="90"
                                                            height="90"
                                                            style={{height: 'auto' }}
                                                        />
                                                    </ALink>
                                                    <button className="btn btn-link btn-close" onClick={() => removeCart(item)}>
                                                        <i className="fas fa-times"></i><span className="sr-only">Close</span>
                                                    </button>
                                                </figure>



                                                <div className="product-detail">
                                                    <ALink href={`/product/default/${item.slug}`} className="product-name">{item.name}</ALink>
                                                    <div className="price-box">
                                                        <span className="product-quantity">{item.qty}</span>
                                                        <span className="product-price">AED {toDecimal(item?.price)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="cart-total">
                                    <label>Subtotal:</label>
                                    <span className="price">AED {toDecimal(getTotalPrice(cartList))}</span>
                                </div>

                                <div className="cart-action">
                                    <ALink href="/pages/cart" className="btn btn-dark btn-link" onClick={hideCartMenu}>View Cart</ALink>
                                    <ALink href="/pages/checkout" className="btn btn-dark" onClick={hideCartMenu}><span>Go To Checkout</span></ALink>
                                </div>
                            </>
                        ) : (
                            <p className="mt-4 text-center font-weight-semi-bold ls-normal text-body">No products in the cart.</p>
                        )
                    }
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: any) => ({
    cartList: state.cart.data,
});

export default connect(mapStateToProps, { removeFromCart: cartActions.removeFromCart })(CartMenu);
