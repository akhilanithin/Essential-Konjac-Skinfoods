import React, { useState } from 'react';
import ALink from '~/components/features/custom-link';

interface CheckoutProps {
  cartItems: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  onPlaceOrder: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onPlaceOrder }) => {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

//   const calculateTotal = () =>
//     cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaceOrder();
    console.log('Order placed:', { customerDetails, cartItems, paymentMethod });
  };

  return (
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
    </div>

  );
};

export default Checkout;
