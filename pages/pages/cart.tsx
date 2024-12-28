import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import ALink from '~/components/features/custom-link';
import Quantity from '~/components/features/quantity';
import { cartActions } from '~/store/cart';
import { toDecimal, getTotalPrice } from '~/utils';
import { RootState } from '~/store'; // Adjust the import based on your store setup
import { CartItem } from '~/types'; // Define a type for CartItem

import { countries, states } from './countries';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles




import { useRouter } from 'next/router';
import { log } from 'node:console';


interface CartProps {
    cartList: CartItem[];
    removeFromCart: (item: CartItem) => void;
    updateCart: (items: CartItem[]) => void;
}

function Cart({ cartList, removeFromCart, updateCart }: CartProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [statesList, setStatesList] = useState<string[]>([]);

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







    // Coupon state
    const [couponCode, setCouponCode] = useState<string>("");
    const [discount, setDiscount] = useState<string>("");

    const applyCoupon = async () => {
        if (!couponCode.trim()) {
            toast.error("Please enter a valid coupon code."); // Toast error if no coupon is entered
            return;
        }

        try {
            const response = await fetch("/api/coupon/apply-coupon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ couponCode }),
            });

            const data = await response.json();

            setDiscount(data?.discountAmount)


            if (response.ok && data.success) {
                toast.success(`Coupon applied! You saved ${data?.discountAmount}.`); // Success toast
            } else {
                toast.error(data.message || "Invalid coupon code."); // Error toast if coupon fails
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again."); // Error toast for network issues
        }
    };






    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Calculate total price after discount when cartItems or discount changes
        const total = cartItems.reduce((acc, item) => {
            const discountedPrice = applyDiscount(item.price, item.qty, discount || '');
            return acc + discountedPrice;
        }, 0);

        setTotalPrice(total);
    }, [discount]);





    // Helper functions
    const toDecimal = (value: number): string => {
        return value?.toFixed(2);
    };




    const applyDiscount = (price: number, qty: number, discount: string) => {
        const totalPrice = price * qty;
        if (discount.includes('%')) {
            const percentage = parseFloat(discount.replace('%', '').trim());
            return totalPrice - (totalPrice * (percentage / 100));
        } else if (discount.includes('AED')) {
            const amount = parseFloat(discount.replace('AED', '').trim());
            return totalPrice - amount;
        }
        return totalPrice;
    };




   

    const discountValue = discount? toDecimal(getTotalPrice(cartItems) - totalPrice): 0;
    const vatValue = toDecimal((discount ? totalPrice : getTotalPrice(cartItems)) * 0.05);
    const deliveryCharge = 25.00



    

    const displayPrice = discount
        ? toDecimal(totalPrice)
        : toDecimal(getTotalPrice(cartItems));





    const applyDiscounts = (cartItem, displayPrice,discountValue,vatValue,deliveryCharge) => {
        
        return {
          ...cartItem,
          totalDiscountedPrice:displayPrice,
          discountValue:discountValue,
          vatValue:vatValue,
          deliveryCharge:deliveryCharge
      };


    }




    const updatedCartItem = applyDiscounts(cartItems, displayPrice,discountValue,vatValue,deliveryCharge);
   
   const handleCheckoutClick = () => {
 
    const updatedCartItem = applyDiscounts(cartItems, displayPrice,discountValue,vatValue,deliveryCharge);
    setCartItems(updatedCartItem);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItem));
    router.push('/pages/checkout');
  
  
   
  };
    







    const calculateTotalPrice = (cartItems, totalPrice, deliveryCharge, discount) => {
        const basePrice = discount ? totalPrice : getTotalPrice(cartItems);
        const vat = basePrice * 0.05;
        return basePrice + vat + deliveryCharge;
    };



    const [value, setValue] = useState()
    
    // const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const countryCode = e.target.value;
    //     setSelectedCountry(countryCode);
    //     setStatesList(states[countryCode] || []);
    // };








    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        state: '',
      });
      
    //   const [selectedCountry, setSelectedCountry] = useState('');
    //   const [statesList, setStatesList] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [success, setSuccess] = useState(null);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
   
      
      
      const handleCountryChange = (e) => {
        const countryCode = e.target.value;
        setSelectedCountry(countryCode);
        setStatesList(states[countryCode] || []);  // Update states based on selected country
        setFormData({
          ...formData,
          country: countryCode,
          state: '',  // Reset state when country changes
        });
      };
    
      const handlePhoneChange = (value) => {
        setFormData({
          ...formData,
          phone: value,
        });
      };
    


      const router = useRouter();


    //   useEffect(() => {
    //     // Get the saved form data from localStorage if it exists
    //     const savedData = localStorage.getItem('shippingData');
    //     if (savedData) {
    //       setFormData(JSON.parse(savedData)); // Populate form with saved data
    //     }
    //   }, []);z
    



      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
    
        try {
          const response = await fetch('/api/shipping', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error('All Fields are Required');
          }
    
          const result = await response.json();
          setSuccess('Shipping details saves successfully!');

 

             
    if (response.ok) {
       
               localStorage.setItem('shippingData', JSON.stringify(formData));
               
    } 

    
          setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            zip: '',
            country: '',
            state: '',
          });
        } catch (err) {
          setError(err.message || 'Error occurred while saving data');
        } finally {
          setLoading(false);
        }
      };





      const update = () => {
        updateCart(cartItems,);
    };

console.log(cartItems);

    

    return (
        <div className="main cart">
            <div className="page-content pt-7 pb-10">
                
                <div className="step-by pr-4 pl-4">
                    <h3 className="title title-simple title-step active">
                        <ALink href="#">1. Shopping Cart</ALink>
                    </h3>
                    <h3 className="title title-simple title-step">
                        <ALink href="/pages/checkout">2. Checkout</ALink>
                    </h3>
                    <h3 className="title title-simple title-step">
                        <ALink href="/pages/order">3. Order Complete</ALink>
                    </h3>
                </div>

                <div className="container mt-7 mb-2">
                    <div className="row">
                        {cartItems.length > 0 ? (
                            <>

                                {/* Table  */}

                                <div className="col-lg-8 col-md-12 pr-lg-4">
                                    <table className="shop-table cart-table">
                                        <thead>
                                            <tr>
                                                <th><span>Product</span></th>
                                                <th></th>
                                                <th><span>Price</span></th>
                                                <th><span>Quantity</span></th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map(item => (

                                         

                                                <tr key={'cart' + item.name}>
                                                    <td className="product-thumbnail">
                                                        <figure>
                                                            <ALink href={'/product/' + item?.id}>
                                                                <img
                                                                    src={`${PRODUCT_IMAGE_BASEURL}/products/${item?.image}`}
                                                                    width="100"
                                                                    height="100"
                                                                    alt="product"
                                                                />
                                                            </ALink>
                                                        </figure>
                                                    </td>
                                                    <td className="product-name">
                                                        <div className="product-name-section">
                                                            <ALink href={'/product/' + item?.id}>{item.name}</ALink>
                                                        </div>

                                                        {item?.selectedColor ? (
                                                            <>

                                                             
                                                         
                                                                    <div className="product-variations mt-3">
                                                                    <p className="product-short-desc">
                                                                     Variation: {item?.selectedVariation?.name}</p>

                                                                    </div>
                                                            





                                                                <div className="product-form product-color">
                                                                    <label>Color:</label>
                                                                    <div className="product-variations">
                                                                      
                                                                            <ALink
                                                                                href="#"
                                                                                className={`color`}
                                                                                key={`color-${item?.selectedColor?.id}`}
                                                                                style={{ backgroundColor: item?.selectedColor?.name, width: '2rem', height: '2rem' }}
        
                                                                            />
                                                                      
                                                                    </div>
                                                                </div>


                                                                <div>
                                                       
                                                            </div>
                                                            </>
                                                            
                                                        ) : ''}
                                                    </td>
                                                    <td className="product-subtotal">
                                                        <span className="amount">AED {toDecimal(item.price)}</span>
                                                    </td>
                                                    <td className="product-quantity">
                                                        <Quantity qty={item?.qty}max={item?.variation?.[0]?.stock || 0} onChangeQty={qty => onChangeQty(item?.name, qty)} />
                                                    </td>
                                                    {/* <td className="product-price">
                                                        <span className="amount">AED {toDecimal(item.price * item.qty)}</span>
                                                    </td> */}


                                                    <td className="product-price">
                                                        <span className="amount">
                                                            AED {toDecimal(applyDiscount(item.price, item.qty, discount || ''))}
                                                        </span>
                                                    </td>

                                                    <td className="product-close">
                                                        <ALink href="#" className="product-remove" title="Remove this product" onClick={() => removeFromCart(item)}>
                                                            <i className="fas fa-times"></i>
                                                        </ALink>
                                                    </td>
                                                </tr>

                                            ))}
                                        </tbody>
                                    </table>


                                    <div className="cart-actions mb-6 pt-4">
                                        {/* Redirection of shop */}
                                        <ALink href="/shop" className="btn btn-dark btn-md btn-rounded btn-icon-left mr-4 mb-4">
                                            <i className="d-icon-arrow-left"></i>Continue Shopping
                                        </ALink>

                                        {/* Update Cart */}
                                        <button
                                            type="button"
                                            className={`btn btn-outline btn-dark btn-md btn-rounded ${compareItems() ? 'btn-disabled' : ''}`}
                                            onClick={update}
                                        >
                                            Update Cart
                                        </button>
                                    </div>


                                    {/* Apply Coupon */}

                                    <div className="cart-coupon-box mb-8">
                                        <h4 className="title coupon-title text-uppercase ls-m">Coupon Discount</h4>
                                        <input
                                            type="text"
                                            name="coupon_code"
                                            className="input-text form-control text-grey ls-m mb-4"
                                            id="coupon_code"
                                            placeholder="Enter coupon code here..."
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-md btn-dark btn-rounded btn-outline"
                                            onClick={applyCoupon}
                                        >
                                            Apply Coupon
                                        </button>

                                        <div>
                                            <h1 className="title coupon-title text-uppercase ls-m">How to get a promo code?</h1>
                                            <p>
                                                Follow our news on the website, as well as subscribe to our social networks. So you will not only be able to receive up-to-date codes, but also learn about new products and promotional items.
                                            </p>
                                        </div>
                                        <div className="social-links share-on">
                                            <h5 className="text-uppercase font-weight-bold mb-0 mr-4 ls-s">Find us here:</h5>

                                            <ALink href="https://www.facebook.com/konjacskinfood/" className="social-link social-icon social-facebook" title="Facebook"><i className="fab fa-facebook-f"></i></ALink>

                                            <ALink href="https://twitter.com/KonjacSkin" className="social-link social-icon social-twitter" title="Twitter"><i className="fab fa-twitter"></i></ALink>

                                            <ALink href="https://www.instagram.com/konjacskinfood/" className="social-link social-icon social-instagram" title="Instagram"><i className="fab fa-instagram"></i></ALink>

                                            <ALink href="https://ae.linkedin.com/company/essential-konjac-skin-food" className="social-link social-icon social-pinterest" title="Linkdin"><i className="fab fa-linkedin-in"></i></ALink>
                                        </div>

                                    </div>
                                </div>


                                <aside className="col-lg-4 sticky-sidebar-wrapper">
                                    <div className="sticky-sidebar" data-sticky-options="{'bottom': 20}">
                                        <div className="summary mb-4">
                                            <h3 className="summary-title text-left">Cart Totals</h3>
                                            <table className="shipping">

                                                <tbody>

                                                    {/* Subtotal */}
                                                    <tr className="summary-subtotal">
                                                        <td>
                                                            <h4 className="summary-subtitle">Subtotal</h4>
                                                        </td>
                                                        <td>
                                                            <p className="summary-subtotal-price">AED {discount ? toDecimal(totalPrice) : toDecimal(getTotalPrice(cartItems))}</p>


                                                        </td>
                                                    </tr>


                                                    {/* Discount on promo code  */}


                                                    <tr className="summary-subtotal">
                                                        <td>
                                                            <h4 className="summary-subtitle">Discount on promo code</h4>
                                                        </td>
                                                        <td>
                                                            <p className="summary-subtotal-price">AED {discount && discount ? toDecimal(getTotalPrice(cartItems) - toDecimal(totalPrice)) : 0}</p>


                                                        </td>
                                                    </tr>

                                                    {/* VAT calaculations  */}


                                                    <tr className="summary-subtotal">
                                                        <td>
                                                            <h4 className="summary-subtitle">VAT (+5%)</h4>
                                                        </td>
                                                        <td>
                                                            <p className="summary-subtotal-price">AED {toDecimal((discount ? totalPrice : getTotalPrice(cartItems)) * 0.05)}</p>


                                                        </td>
                                                    </tr>

                                                    {/* Delivery charge */}
                                                    <tr className="summary-subtotal">
                                                        <td>
                                                            <h4 className="summary-subtitle">Delivery Charge</h4>
                                                        </td>
                                                        <td>
                                                            <p className="summary-subtotal-price">AED {`${toDecimal(deliveryCharge)}`}</p>


                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>


                                            {/* Delivery Details */}


                                            <div className="shipping-address">
                                                <label>Shipping <strong>Details</strong></label>

                                                {/* Name */}
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    placeholder="Enter full name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />

                                                {/* Phone Number */}
                                                <div className="form-control">
                                                    <PhoneInput
                                                        placeholder="Enter phone number"
                                                        country=""
                                                        value={formData.phone}
                                                        onChange={handlePhoneChange}
                                                        onlyCountries={["ae", "sa", "qa", "kw", "bh", "om"]}
                                                        autoFormat={true}
                                                    />
                                                </div>

                                                {/* Email */}
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    placeholder="Enter Email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />

                                                {/* Address */}
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="address"
                                                    placeholder="Enter address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                />

                                                {/* City */}
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="city"
                                                    placeholder="Town / City"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                />

                                                {/* Zip */}
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="zip"
                                                    placeholder="ZIP"
                                                    value={formData.zip}
                                                    onChange={handleChange}
                                                />

                                                {/* Country */}
                                                <div className="select-box">
                                                    <select
                                                        id="country"
                                                        name="country"
                                                        value={formData.country}
                                                        onChange={handleCountryChange}
                                                        className="form-control"
                                                    >
                                                        <option value="">Select Country</option>
                                                        {countries.map((country) => (
                                                            <option key={country.code} value={country.code}>
                                                                {country.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* State */}
                                                <div className="select-box">
                                                    <select
                                                        id="state"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                    >
                                                        <option value="">Select State</option>
                                                        {statesList.map((state, index) => (
                                                            <option key={index} value={state}>
                                                                {state}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Submit Button */}
                                                <button
                                                    type="submit"
                                                    onClick={handleSubmit}
                                                    className="btn btn-md btn-dark btn-rounded btn-outline"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Saving...' : 'Save Details'}
                                                </button>

                                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                                {success && <p style={{ color: 'green' }}>{success}</p>}
                                            </div>



                                            {/* Total */}

                                            <table className="total">
                                                <tbody>
                                                    <tr className="summary-subtotal">
                                                        <td>
                                                            <h4 className="summary-subtitle">Total</h4>
                                                        </td>
                                                        <td>
                                                            <p className="summary-total-price ls-s">  AED {toDecimal(calculateTotalPrice(cartItems, totalPrice, deliveryCharge, discount))}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>



                                            {/* <ALink href="/pages/checkout" className="btn btn-dark btn-rounded btn-checkout">Proceed to checkout</ALink> */}


                                            <button
                                                className="btn btn-dark btn-rounded btn-checkout"
                                                onClick={handleCheckoutClick}
                                            >
                                                Proceed to checkout
                                            </button>

                                        </div>
                                    </div>
                                </aside>
                            </>
                        ) : (
                            <div className="empty-cart text-center">
                                <p>Your cart is currently empty.</p>
                                <i className="cart-empty d-icon-bag"></i>
                                <p className="return-to-shop mb-0">
                                    <ALink className="button wc-backward btn btn-dark btn-md" href="/shop">
                                        Return to shop
                                    </ALink>
                                </p>
                            </div>
                        )}
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
