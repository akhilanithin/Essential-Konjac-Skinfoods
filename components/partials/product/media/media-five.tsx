import React, { useState, useEffect, RefObject } from 'react';
import { Magnifier } from 'react-image-magnifiers';
import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';
import ThumbTwo from '~/components/partials/product/thumb/thumb-two';
import MediaLightBox from '~/components/partials/product/light-box';
import { mainSlider3 } from '~/utils/data/carousel';

interface Image {
    url: string;
}

interface Product {
    stock: number;
    is_top: boolean;
    is_new: boolean;
    discount: boolean;
    large_pictures?: Image[];
    pictures?: Image[];
}

interface Props {
    product: Product;
    adClass?: string;
}

const MediaOne: React.FC<Props> = ({ product, adClass = '' }) => {


    const [index, setIndex] = useState<number>(0);
    const [mediaIndex, setMediaIndex] = useState<number>(0);
    const [isOpen, setOpenState] = useState<boolean>(false);
    const [mediaRef, setMediaRef] = useState<RefObject<any> | null>(null);



    


    const lgImages = product?.variation[0]?.images ? product?.variation[0]?.images : product?.pictures;
    

  
    
    

    // https://admin.essentialkonjacskinfoods.com/assets/img/products/1722945495569-Hydro Moist Treatment T 1.jpg




    useEffect(() => {
        setIndex(0);
    }, [window.location.pathname]);

    useEffect(() => {
        if (mediaRef && mediaRef.current && index >= 0) {
            mediaRef.current.$car.to(index, 300, true);
        }
    }, [index]);

    const setIndexHandler = (mediaIndex: number) => {
        if (mediaIndex !== index) {
            setIndex(mediaIndex);
        }
    };

    const changeRefHandler = (carRef: RefObject<any>) => {
        if (carRef.current) {
            setMediaRef(carRef);
        }
    };

    const changeOpenState = (openState: boolean) => {
        setOpenState(openState);
    };

    const openLightBox = () => {
        setOpenState(true);
    };

    const events = {
        onTranslate: (e: any) => {
            if (!e.target) return;
            const thumbs = document.querySelector('.product-thumbs');
            if (thumbs) {
                thumbs.querySelector('.product-thumb.active')?.classList.remove('active');
                thumbs.querySelectorAll('.product-thumb')[e.item.index].classList.add('active');
            }
        }
    };



    const PRODUCT_IMAGE_BASEURL = process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASEURL;

    return (
        <div className={`product-gallery product-gallery-vertical product-gallery-sticky ${adClass}`}>
            <div className="product-label-group">
                {/* out of stock */}
                {product?.variation?.map((variation) => variation.stock === 0 ? <label key={variation.id} className="product-label label-out">out</label> : null)}
                {/* new */}

                {!product?.fresharrival && <label className="product-label label-new">new</label>}

                {/* sale */}
                {product?.variation[0]?.offers && <label className="product-label label-sale">sale</label>}
            </div>

            <OwlCarousel
                adClass="product-single-carousel owl-theme owl-nav-inner"
                options={mainSlider3}
                onChangeIndex={setIndexHandler}
                onChangeRef={changeRefHandler}
                events={events}
            >
                {lgImages.map((image, index) => (
            
                    <div key={ image + '-' + index }>
                            <Magnifier
                                imageSrc={`${PRODUCT_IMAGE_BASEURL}/products/${image?.image}`}
                                imageAlt="magnifier"
                                largeImageSrc={`${PRODUCT_IMAGE_BASEURL}/products/${image?.image}`}
                                dragToMove={ false }
                                mouseActivation="hover"
                                cursorStyleActive="crosshair"
                                className="product-image large-image"

                            />
                        </div>
                ))}

                
            </OwlCarousel>

            <ALink href="#" className="product-image-full" onClick={openLightBox}>
                <i className="d-icon-zoom"></i>
            </ALink>

            <ThumbTwo product={product} index={index} onChangeIndex={setIndexHandler} />

            <MediaLightBox images={lgImages} isOpen={isOpen} changeOpenState={changeOpenState} index={index} product={product} />
        </div>
    );
};

export default MediaOne;
