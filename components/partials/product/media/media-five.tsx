import { useState, useEffect } from 'react';
import { Magnifier } from 'react-image-magnifiers';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import ThumbTwo from '~/components/partials/product/thumb/thumb-two';
import MediaLightBox from '~/components/partials/product/light-box';

import { mainSlider3 } from '~/utils/data/carousel';
import products from '~/pages/elements/products';

export default function MediaOne ( props ) {
    const { product, adClass = '' } = props;


  
    const [ index, setIndex ] = useState( 0 );
    const [ mediaIndex, setMediaIndex ] = useState( 0 );
    const [ isOpen, setOpenState ] = useState( false );
    const [ mediaRef, setMediaRef ] = useState( null );

    // if ( !product ) {
    //     window.location.pathname = process.env.NEXT_PUBLIC_ASSET_URI + '/pages/404';
    // }


    const lgImages = product?.variation[0]?.images ? product?.variation[0]?.images : product?.pictures;


    const PRODUCT_IMAGE_BASEURL = process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASEURL;

    

    useEffect( () => {
        setIndex( 0 );
    }, [ window.location.pathname ] )

    useEffect( () => {
        if ( mediaRef !== null && mediaRef.current !== null && index >= 0 ) {
            mediaRef.current.$car.to( index, 300, true );
        }
    }, [ index ] )

    const setIndexHandler = ( mediaIndex ) => {
        if ( mediaIndex !== index ) {
            setIndex( mediaIndex );
        }
    }

    const changeRefHandler = ( carRef ) => {
        if ( carRef.current !== undefined ) {
            setMediaRef( carRef );
        }
    }

    const changeOpenState = openState => {
        setOpenState( openState );
    }

    const openLightBox = () => {
        setOpenState( true );
    }

    let events = {
        onTranslate: function ( e ) {
            if ( !e.target ) return;
            if ( document.querySelector( '.product-thumbs' ) ) {
                document.querySelector( '.product-thumbs' ).querySelector( '.product-thumb.active' ).classList.remove( 'active' );
                document.querySelector( '.product-thumbs' ).querySelectorAll( '.product-thumb' )[ e.item.index ].classList.add( 'active' );
            }
        }
    }

    return (
        <div className={ `product-gallery product-gallery-vertical product-gallery-sticky ${ adClass }` }>
           <div className="product-label-group">
                {/* out of stock */}
                {product?.variation?.map((variation) => variation.stock === 0 ? <label key={variation.id} className="product-label label-out">out</label> : null)}
                {/* new */}

                {!product?.fresharrival && <label className="product-label label-new">new</label>}

                {/* sale */}
                {product?.variation[0]?.offers && <label className="product-label label-sale">sale</label>}
            </div>


            <OwlCarousel adClass="product-single-carousel owl-theme owl-nav-inner"
                options={ mainSlider3 }
                onChangeIndex={ setIndexHandler }
                onChangeRef={ changeRefHandler }
                events={ events }
            >

                
{lgImages?.map((image, index) => (
            
            <div key={ image + '-' + index }>
                    <Magnifier
                        imageSrc={`${PRODUCT_IMAGE_BASEURL}/products/${image?.image}`}
                        imageAlt="magnifier"
                        largeImageSrc={`${PRODUCT_IMAGE_BASEURL}/products/${image?.image}`}
                        dragToMove={ false }
                        mouseActivation="hover"
                        cursorStyleActive="crosshair"
                        className="product-image large-image"
                        // style={{
                        //     width: '100%', 
                        //     display: 'inline-block',
                        //     height: '570px', 
                        //     objectFit: 'cover', 
                      
                        // }}
                    />
  
                </div>
        ))}

                    
            </OwlCarousel>

            <ALink href="#" className="product-image-full" onClick={ openLightBox }><i className="d-icon-zoom"></i></ALink>

            <ThumbTwo product={ product } index={ index } onChangeIndex={ setIndexHandler } />

            <MediaLightBox images={ lgImages } isOpen={ isOpen } changeOpenState={ changeOpenState } index={ index } product={ product } />
        </div>
    )
}