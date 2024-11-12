import React, { useEffect, useState, useRef } from 'react';
import OwlCarousel from '~/components/features/owl-carousel';
import { mainSlider15 } from '~/utils/data/carousel';

interface ThumbTwoProps {
    product: {
        pictures: Array<{
            url: string;
        }>;
    };
    index?: number;
    onChangeIndex: (index: number) => void;
}

function ThumbTwo(props: ThumbTwoProps) {
    const { product, index = 0 } = props;
    const thumbs =product?.variation[0]?.images

    

    const [thumbRef, setThumbRef] = useState<any>(null); // Replace `any` with the correct type if available

    useEffect(() => {
        if (thumbRef !== null && index >= 0) {
            thumbRef.current.$car.to(index, 300, true);

            const thumbsElement = document.querySelector('.product-thumbs');
            if (thumbsElement) {
                const activeThumb = thumbsElement.querySelector('.product-thumb.active');
                if (activeThumb) activeThumb.classList.remove('active');

                const owlItems = thumbsElement.querySelectorAll('.owl-item');
                if (owlItems[index]) {
                    owlItems[index].querySelector('.product-thumb')?.classList.add('active');
                }
            }
        }
    }, [index, thumbRef]);

    const thumbActiveHandler = (e: React.MouseEvent<HTMLDivElement>, thumbIndex: number) => {
        props.onChangeIndex(thumbIndex);

        const thumbsElement = document.querySelector('.product-thumbs');
        if (thumbsElement) {
            const activeThumb = thumbsElement.querySelector('.product-thumb.active');
            if (activeThumb) activeThumb.classList.remove('active');
        }

        e.currentTarget.classList.add('active');
    };

    const changeRefHandler = (carRef: React.RefObject<any>) => {
        if (carRef.current !== undefined && thumbRef === null) {
            setThumbRef(carRef);
        }
    };

    const PRODUCT_IMAGE_BASEURL = process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASEURL;




    return (
   
        <div className="product-thumbs-wrap product-thumbs-two">
            <OwlCarousel
                adClass="product-thumbs product-thumb-carousel"
                options={mainSlider15}
                onChangeRef={changeRefHandler}
            >

                {thumbs?.map((thumb, index) => (
                             
                    <div
                        className={`product-thumb ${index === 0 ? 'active' : ''}`}
                        onClick={(e) => thumbActiveHandler(e, index)}
                        key={`${thumb?.id}-2-${index}`}
                    >
                        <img
                           src={`${PRODUCT_IMAGE_BASEURL}/products/${thumb?.image}`}
                            alt="product thumbnail"
                            width="137"
                            height="137"
                        />
                    </div>
                ))}
            </OwlCarousel>
        </div>
    );
}

export default React.memo(ThumbTwo);
