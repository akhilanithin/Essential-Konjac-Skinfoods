import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';

interface ProductCountDownProps {
    date?: string; // Optional prop for the countdown date
    type?: number; // Optional prop for the countdown type
    adClass?: string; // Optional prop for additional classes
}

const ProductCountDown: React.FC<ProductCountDownProps> = ({
    date = "2021-08-20",
    type = 1,
    adClass = ''
}) => {
    const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
        if (completed) {
            return <span>Product Selling Finished!</span>;
        } else {
            return (
                type === 1 ? (
                    <div className={`countdown ${adClass}`}>
                        <div className="countdown-row countdown-show4">
                            <span className="countdown-section">
                                <span className="countdown-amount">{zeroPad(days)}</span>
                                <span className="countdown-period">DAYS</span>
                            </span>

                            <span className="countdown-section">
                                <span className="countdown-amount">{zeroPad(hours)}</span>
                                <span className="countdown-period">HOURS</span>
                            </span>

                            <span className="countdown-section">
                                <span className="countdown-amount">{zeroPad(minutes)}</span>
                                <span className="countdown-period">MINUTES</span>
                            </span>

                            <span className="countdown-section">
                                <span className="countdown-amount">{zeroPad(seconds)}</span>
                                <span className="countdown-period">SECONDS</span>
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="product-countdown-container font-weight-semi-bold">
                        <span className="product-countdown-title">Offer Ends In:&nbsp;</span>

                        <div className="product-countdown countdown-compact">
                            <span className="countdown-section days">
                                <span className="countdown-amount">{zeroPad(days)} </span>
                                <span className="countdown-period">days,&nbsp;</span>
                            </span>

                            <span className="countdown-section hours">
                                <span className="countdown-amount">{zeroPad(hours)}<span className="mr-1 ml-1">:</span></span>
                            </span>

                            <span className="countdown-section minutes">
                                <span className="countdown-amount">{zeroPad(minutes)}<span className="mr-1 ml-1">:</span></span>
                            </span>

                            <span className="countdown-section seconds">
                                <span className="countdown-amount">{zeroPad(seconds)}</span>
                            </span>
                        </div>
                    </div>
                )
            );
        }
    };

    return (
        <Countdown
            date={new Date(date)}
            renderer={renderer}
        />
    );
};

export default ProductCountDown;
