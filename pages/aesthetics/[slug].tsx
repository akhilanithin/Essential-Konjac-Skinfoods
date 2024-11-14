import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import ALink from '~/components/features/custom-link';
import Quantity from '~/components/features/quantity';
import { cartActions } from '~/store/cart';
import { toDecimal, getTotalPrice } from '~/utils';
import { RootState } from '~/store'; // Adjust the import based on your store setup
import { CartItem } from '~/types'; // Define a type for CartItem

import SlideToggle from 'react-slide-toggle';

import { Container, Row, Col, Image,} from "react-bootstrap";

interface CartProps {
    cartList: CartItem[];
    removeFromCart: (item: CartItem) => void;
    updateCart: (items: CartItem[]) => void;
}

function Cart({ cartList, removeFromCart, updateCart }: CartProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const PRODUCT_IMAGE_BASEURL = process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASEURL;

    useEffect(() => {
        setCartItems([...cartList]);
    }, [cartList]);

    const onChangeQty = (name: string, qty: number) => {
        setCartItems(cartItems.map(item => (
            item.name === name ? { ...item, qty } : item
        )));
    };

    const compareItems = () => {
        if (cartItems.length !== cartList.length) return false;

        for (let index = 0; index < cartItems.length; index++) {
            if (cartItems[index].qty !== cartList[index].qty) return false;
        }

        return true;
    };

    const update = () => {
        updateCart(cartItems);
    };


    console.log(cartItems[0]?.variation[0]?.stock);






    return (
        <div className="main cart">
            <div className="page-content pt-7 pb-10">
                <div className="step-by pr-4 pl-4">
                    <h3 className="title title-simple title-step active">
                        <ALink href="#">1. Shopping Cart</ALink>
                    </h3>
                    <h3 className="title title-simple title-step">
                        <ALink href="/aesthetics/checkout">2. Checkout</ALink>
                    </h3>
                    <h3 className="title title-simple title-step">
                        <ALink href="/aesthetics/order">3. Order Complete</ALink>
                    </h3>
                </div>

                <div className="container mt-7 mb-2">
                    <div className="row">

                        <>
                            <div className="col-lg-7 col-md-12 pr-lg-4">

                                {/* left side */}



                                <form action="#" className="form">
                                    <div className="row">
                                        <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                                            <h3 className="title title-simple text-left text-uppercase">Info about you</h3>
                                  
                                            <div className="row">
                                                <div className="col-12 mb-3">
                                                    <label>First Name *</label>
                                                    <input type="text" className="form-control" name="first-name" placeholder="Enter your first name" required />
                                                </div>

                                                <div className="col-12">
                                                    <label>Last Name *</label>
                                                    <input type="text" className="form-control" name="last-name" placeholder="Enter your Last name" required />
                                                </div>
                                            </div>


                                            <div className="row">


                                                <div className="col-xs-6">
                                                    <label>Phone *</label>
                                                    <input type="text" className="form-control" name="phone" placeholder="Enter your Phone" required />
                                                </div>
                                                <div className="col-xs-6">
                                                    <label>Email*</label>
                                                    <input type="text" className="form-control" name="email-address" placeholder="Enter your Email" required />
                                                </div>
                                            </div>

<br />

                                            <h3 className="title title-simple text-left text-uppercase">Delivery Info</h3>
                                                         
                                       
                                           
                
                                            <label>Street Address *</label>
                                            <input type="text" className="form-control" name="address1" required
                                                placeholder="House number and street name" />

                                        
                                                
                                            <div className="row">
                                                <div className="col-xs-6">
                                                    <label>Town / City *</label>
                                                    <input type="text" className="form-control" name="city" placeholder="Enter the City"required />
                                                </div>
                                                <div className="col-xs-6">
                                                    <label>Country *</label>
                                                    <input type="text" className="form-control" name="state" required placeholder="Enter the Country"  />
                                                </div>
                                            </div>

                                         

                                  

                                        

                                            <h2 className="title title-simple text-uppercase text-left mt-6">Note</h2>
                                            <label>Order Notes (Optional)</label>
                                            <textarea className="form-control pb-2 pt-2 mb-0" cols="30" rows="5"
                                                placeholder="Notes about your order, e.g. special notes for delivery"></textarea>



                                        </div>
                                    </div>
                                </form>

                                <br />

                                        <ALink href="/aesthetics/checkout" passHref>
                                            <button type="button" className="btn btn-dark btn-rounded btn-checkout">
                                               Next
                                            </button>
                                        </ALink>

                            </div>

                            <aside className="col-lg-5 sticky-sidebar-wrapper">
                                {/* Order Summary */}
                                <div className="border" style={{ border: "1px solid #eee", borderRadius: "5px", padding: "15px" }}>
                                    {/* Your Order */}
                                    <Container className="checkout-order">
                                        <h5>Your Order</h5>
                                        <Row className="checkout-order__item align-items-center" style={{ borderBottom: "1px solid #eee", padding: "10px", borderRadius: "5px" }}>
                                            <Col xs={4} className="checkout-order__item-img">
                                                <a href="/service-checkout/58">
                                                    <Image
                                                        src="https://konjac.s3.me-central-1.amazonaws.com/products/1727778853141-blob"
                                                        alt="Product Image"
                                                        fluid
                                                    />
                                                </a>
                                            </Col>
                                            <Col xs={8} className="checkout-order__item-info">
                                                <a className="title6" href="/service-checkout/58">
                                                    Botox-Bunny line <span>x1</span>
                                                </a>
                                                <br />
                                                <span className="checkout-order__item-price">AED 300.00</span>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>

                                {/* Amount Summary */}
                                <br />

                                <div className="summary mb-4" style={{ border: "1px solid #eee", borderRadius: "5px", padding: "15px" }}>
                                    <h3 className="summary-title text-left">Cart Totals</h3>



                                    <div className="cart-bottom__total">
                                        <table className="shipping">
                                            <tbody>
                                                <tr className="summary-subtotal">
                                                    <td>
                                                        <h4 className="summary-subtitle">Subtotal</h4>
                                                    </td>
                                                    <td>
                                                        <p className="summary-subtotal-price">AED {toDecimal(getTotalPrice(cartItems))}</p>
                                                    </td>
                                                </tr>
                                                <tr className="summary-subtotal">
                                                    <td>
                                                        <h4 className="summary-subtitle">VAT (+5%)</h4>
                                                    </td>
                                                    <td>
                                                        <p className="summary-subtotal-price">AED 15.00</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <table className="total">
                                            <tbody>
                                                <tr className="summary-total">
                                                    <td>
                                                        <h4 className="summary-subtitle">Total</h4>
                                                    </td>
                                                    <td>
                                                        <p className="summary-total-price ls-s">AED {toDecimal(getTotalPrice(cartItems) + 15)}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>




                                  
                                </div>
                            </aside>



                            
                        </>


                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: RootState) => ({
    cartList: state.cart.data ? state.cart.data : []
});

export default connect(mapStateToProps, {
    removeFromCart: cartActions.removeFromCart,
    updateCart: cartActions.updateCart,
})(Cart);
