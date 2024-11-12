import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { Magnifier } from 'react-image-magnifiers';
import Modal from 'react-modal';
import imagesLoaded from 'imagesloaded';

import { GET_PRODUCT } from '~/server/queries';
import withApollo from '~/server/apollo';

import OwlCarousel from '~/components/features/owl-carousel';

import DetailOne from '~/components/partials/product/detail/detail-one';

import { modalActions } from '~/store/modal';

import { mainSlider3 } from '~/utils/data/carousel';

const customStyles = {
    content: {
        position: "relative"
    },
    overlay: {
        background: 'rgba(0,0,0,.4)',
        zIndex: '10000',
        overflowX: 'hidden',
        overflowY: 'auto'
    }
}

Modal.setAppElement('#__next');

function Quickview(props) {

    
    const { slug, closeQuickview, isOpen } = props;

    if (!isOpen) return <div></div>;

   


    
    const [loaded, setLoadingState] = useState(false);


    // useEffect(() => {
    //     setTimeout(() => {
    //         if (!loading && data && isOpen && document.querySelector('.quickview-modal'))
    //             imagesLoaded('.quickview-modal').on('done', function () {
    //                 setLoadingState(true);
    //                 window.jQuery('.quickview-modal .product-single-carousel').trigger('refresh.owl.carousel');
    //             }).on('progress', function () {
    //                 setLoadingState(false);
    //             });
    //     }, 200);
    // }, [data, isOpen]);



    const closeQuick = () => {
        document.querySelector(".ReactModal__Overlay").classList.add('removed');
        document.querySelector('.quickview-modal').classList.add('removed');
        setLoadingState(false)
        setTimeout(() => {
            closeQuickview();
        }, 330);
    }

    const [data, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://essentialkonjacskinfoods.com/api/v1/en/products/getproductdetails/${slug}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {

                setLoading(false);
                
            }
        };

        fetchProductDetails();
    }, []); // Empty dependency array means this runs once when the component mounts

   
    const product=data?.data?.product

    const variations = Array.isArray(product?.variation) ? product?.variation : [product?.variation];
    const discounts = variations.flatMap(variation => variation?.offers || []);
    const discount = discounts?.length > 0 ? discounts[0] : null;
    const discountValue = discount ? discount?.discount : 0;
    




    const lgImages = product?.variation[0]?.images ? product?.variation[0]?.images : product?.pictures;

    const PRODUCT_IMAGE_BASEURL = process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASEURL;

    useEffect(() => {
        setTimeout(() => {
            if (!loading && data && isOpen && document.querySelector('.quickview-modal'))
                imagesLoaded('.quickview-modal').on('done', function () {
                    setLoadingState(true);
                    window.jQuery('.quickview-modal .product-single-carousel').trigger('refresh.owl.carousel');
                }).on('progress', function () {
                    setLoadingState(false);
                });
        }, 200);
    }, [product, isOpen]);


 



    {/* 
                            https://admin.essentialkonjacskinfoods.com/assets/img/products/1709408674611-mahnnnn.jpg */}

    





    return (
        <Modal
            isOpen={isOpen}
            contentLabel="QuickView"
            onRequestClose={closeQuick}
            shouldFocusAfterRender={false}
            style={customStyles}
            className="product product-single row product-popup quickview-modal" id="product-quickview"
        >


            <>
                <div className={`row p-0 m-0 ${loaded ? '' : 'd-none'}`} >
                    <div className="col-md-6">
                        <div className="product-gallery mb-md-0 pb-0">


                            <div className="product-label-group">

                                {product?.fresharrival ? <label className="product-label label-new">New</label> : ''}
                                
                                {product?.trending && product?.feature? <label className="product-label label-top">Top</label> : ''}

                                {
                                    discountValue > 0 ?
                                       variations.length === 0 ?
                                            <label className="product-label label-sale">{discountValue}% OFF</label>
                                            : <label className="product-label label-sale">Sale</label>
                                        : ''
                                }

                            </div>



                            <OwlCarousel adClass="product-single-carousel owl-theme owl-nav-inner" options={mainSlider3}>


                                {
                                   lgImages?.map((item, index) =>
                                    
                                        <Magnifier
                                            key={'quickview-image-' + index}
                                            imageSrc={`${PRODUCT_IMAGE_BASEURL}/products/${item?.image}`}
                                            imageAlt="magnifier"
                                            largeImageSrc={`${PRODUCT_IMAGE_BASEURL}/products/${item?.image}`}
                                            dragToMove={false}
                                            mouseActivation="hover"
                                            cursorStyleActive="crosshair"
                                            className="product-image large-image"
                                        />
                                    )
                                }
                            </OwlCarousel>


                        </div>
                    </div>

                    <div className="col-md-6">
                        <DetailOne data={data} adClass="scrollable pr-3" isNav={false} />
                    </div>


                </div>

                <button title="Close (Esc)" type="button" className="mfp-close p-0" onClick={closeQuick} ><span>×</span></button>
            </>


            {
                loaded ? '' : <div className="product row p-0 m-0 skeleton-body mfp-product" >
                    <div className="col-md-6">
                        <div className="skel-pro-gallery">
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="skel-pro-summary"></div>
                    </div>
                </div>
            }



        </Modal>
    )
}

function mapStateToProps(state) {

    return {
        slug: state.modal.singleSlug, 
        isOpen: state.modal.quickview
    }
}

export default withApollo({ ssr: typeof window === 'undefined' })(connect(mapStateToProps, { closeQuickview: modalActions.closeQuickview })(Quickview));