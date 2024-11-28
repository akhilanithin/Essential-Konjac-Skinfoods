import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ALink from '~/components/features/custom-link';
import Quantity from '~/components/features/quantity';
import { cartActions } from '~/store/cart';
import { toDecimal, getTotalPrice } from '~/utils';
import { RootState } from '~/store'; // Adjust the import based on your store setup
import { CartItem } from '~/types'; // Define a type for CartItem

import SlideToggle from 'react-slide-toggle';

import { Container, Row, Col, Image, } from "react-bootstrap";

import { Card, Form } from 'react-bootstrap';

interface CartProps {
    cartList: CartItem[];
    removeFromCart: (item: CartItem) => void;
    updateCart: (items: CartItem[]) => void;
}

function Cart({ cartList, removeFromCart, updateCart }: CartProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);


    useEffect(() => {
        setCartItems([...cartList]);
    }, [cartList]);







    const [bookingDate, setBookingDate] = useState<string>('2024-11-12');

    const router = useRouter();
    const { query } = router;
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');
    const [product, setProduct] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.eksfc.com/api/clinic-serice?search=&limit=1000&page=1&sortField=id&sortOrder=DESC&filterName=id&filterValue=${query?.slug}` as string, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLINIC_TOKEN}`,
                        'konjac-version': '1.0.1',
                    },
                });

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();

                setProduct(data.data || []); // Set all posts

            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Depend on slug so it refetches when it changes

    // Render loading, error, or the product
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;


    const price = product ? product[0]?.price : 0;
    const fivePercent = price * 0.05;
    const tax = fivePercent.toFixed(2);


    const sum = parseFloat(price) + parseFloat(tax);
    const total = sum.toFixed(2)






    return (
        <div className="main cart">
            <div className="page-content pt-7 pb-10">
                <div className="step-by pr-4 pl-4">
                    <h3 className="title title-simple title-step active">
                        <ALink href="#">1. Shopping Cart</ALink>
                    </h3>

                    <h3 className="title title-simple title-step">
                        <ALink href="/aesthetics/order/">2. Order Complete</ALink>
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

                                            <div>
                                                <label>Order Notes (Optional)</label>
                                                <textarea className="form-control pb-2 pt-2 mb-0" cols="30" rows="5"
                                                    placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
                                            </div>
<br />

                                            {/* datepicker */}


                                            <h3 className="title title-simple text-left text-uppercase">Booking Details</h3>
                                            <Card className="checkout-payment__item active">
                                                <Card.Body>
                                                    <Card.Title>Please Select the Date for Your Booking</Card.Title>
                                                    <div className="box-field" style={{ marginTop: '2rem' }}>
                                                        <Form.Control
                                                            type="date"
                                                            placeholder="Select booking date"
                                                            value={bookingDate}
                                                            onChange={(e) => setBookingDate(e.target.value)}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </Card.Body>
                                            </Card>

                                            {/* payment Method */}
                                            <h3 className="title title-simple text-left text-uppercase">Payment Methods</h3>


                                            <Card className="checkout-payment__item active">
                                                <Card.Body>
                                                    <div className="checkout-payment__item-head">
                                                        <Form.Check
                                                            type="radio"
                                                            id="payment-option"
                                                            name="radio"
                                                            label="Credit/Debit card AED-30 (Pay 10% to confirm the appointment)"
                                                            defaultChecked
                                                            custom
                                                            className="radio-box"
                                                        />
                                                        <div className="radio-box__info">
                                                            <i className="icon-info"></i>
                                                            <span className="radio-box__info-content"></span>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>


                                        </div>
                                    </div>
                                </form>

                                <br />

                                <ALink href="#" passHref>
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

                                                <Image
                                                    src={`${product ? product[0]?.imageUrls : []}`}
                                                    alt="Product Image"
                                                    fluid
                                                />

                                            </Col>

                                            <Col xs={8} className="checkout-order__item-info">
                                                <a className="title6">
                                                    {product ? product[0]?.name : []} <span>x1</span>
                                                </a>
                                                <br />
                                                <span className="checkout-order__item-price">AED price</span>
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
                                                        <p className="summary-subtotal-price">AED {toDecimal(price)}</p>
                                                    </td>
                                                </tr>
                                                <tr className="summary-subtotal">
                                                    <td>
                                                        <h4 className="summary-subtitle">VAT (+5%)</h4>
                                                    </td>
                                                    <td>
                                                        <p className="summary-subtotal-price">AED {toDecimal(tax)}</p>
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
                                                        <p className="summary-total-price ls-s">AED {total} </p>
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
