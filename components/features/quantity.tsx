import { useState, useEffect } from 'react';

interface QuantityProps {
    qty?: number;
    max: number;
    adClass?: string;
    onChangeQty?: (quantity: number) => void;
    product?: any; // Adjust type as necessary based on the actual product type
}

const Quantity: React.FC<QuantityProps> = ({ qty = 1, ...props }) => {
    const { adClass = 'mr-2 input-group' } = props;
    const [quantity, setQuantity] = useState<number>(qty);

    useEffect(() => {
        setQuantity(qty);
    }, [props.product]);

    useEffect(() => {
        if (props.onChangeQty) {
            props.onChangeQty(quantity);
        }
    }, [quantity]);

    const minusQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const plusQuantity = () => {
        if (quantity < props.max) {
            setQuantity(quantity + 1);
        }
    };

    const changeQty = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newQty;

        if (e.currentTarget.value !== '') {
            newQty = Math.min(parseInt(e.currentTarget.value), props.max);
            newQty = Math.max(newQty, 1);
            setQuantity(newQty);
        }
    };

    return (
        <div className={adClass}>
            <button className='quantity-minus d-icon-minus' onClick={minusQuantity}></button>
            <input
                className='quantity form-control'
                type='number'
                min="1"
                max={props.max}
                value={quantity}
                onChange={changeQty}
            />
            <button className='quantity-plus d-icon-plus' onClick={plusQuantity}></button>
        </div>
    );
};

export default Quantity;
