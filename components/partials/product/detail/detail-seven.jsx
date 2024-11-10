import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/components/features/custom-link';
import Countdown from '~/components/features/countdown';
import Quantity from '~/components/features/quantity';

const SlideToggle = dynamic(
    () => {
        return import("react-slide-toggle").then((module) => {
            return module.SlideToggle;
        })
    },
    {
        ssr: false
    }
);


import { wishlistActions } from '~/store/wishlist';
import { cartActions } from '~/store/cart';

import { toDecimal } from '~/utils';

function DetailSeven(props) {
    const { product, isStickyCart = false, adClass = '', isNav = true } = props;
    const { toggleWishlist, addToCart, wishlist } = props;
    const [curColor, setCurColor] = useState('null');
    const [curSize, setCurSize] = useState('null');
    const [curIndex, setCurIndex] = useState(0);

    // decide if the product is wishlisted
    let isWishlisted, colors = [], sizes = [];
    isWishlisted = wishlist.findIndex(item => item.name === product.name) > -1 ? true : false;

    if (product && product.variants.length > 0) {
        if (product.variants[0].size)
            product.variants.forEach(item => {
                if (sizes.findIndex(size => size.name === item.size.name) === -1) {
                    sizes.push({ name: item.size.name, value: item.size.size });
                }
            });

        if (product.variants[0].color) {
            product.variants.forEach(item => {
                if (colors.findIndex(color => color.name === item.color.name) === -1)
                    colors.push({ name: item.color.name, value: item.color.color });
            });
        }
    }

    useEffect(() => {
        if (document.querySelector('.product-form .btn-cart')) {
            if (product.variants.length > 0) {
                document.querySelector('.product-form .btn-cart').setAttribute('disabled', 'disabled');
            } else {
                document.querySelector('.product-form .btn-cart').removeAttribute('disabled');
            }
        }

        return () => {
            resetValueHandler();

            if (document.querySelector('.reset-value-button')) {
                document.querySelector('.reset-value-button').style.display = "none";
            }

            if (document.querySelector('.single-product-price')) {
                document.querySelector('.single-product-price').style.display = "none";
            }
        }
    }, [product])

    useEffect(() => {
        if (product.variants.length > 0) {
            if ((curSize !== 'null' && curColor !== 'null') || (curSize === 'null' && product.variants[0].size === null && curColor !== 'null') || (curColor === 'null' && product.variants[0].color === null && curSize !== 'null')) {
                document.querySelector('.product-form .btn-cart').removeAttribute('disabled');

                if (document.querySelector('.single-product-price') && document.querySelector('.single-product-price').classList.contains('COLLAPSED')) {
                    document.querySelector('.show-price').click();
                }
                setCurIndex(product.variants.findIndex(item => (item.size !== null && item.color !== null && item.color.name === curColor && item.size.name === curSize) || (item.size === null && item.color.name === curColor) || (item.color === null && item.size.name === curSize)));
            } else {
                document.querySelector('.product-form .btn-cart').setAttribute('disabled', 'disabled');

                if (document.querySelector('.single-product-price') && document.querySelector('.single-product-price').classList.contains('EXPANDED')) {
                    document.querySelector('.show-price').click();
                }
            }

            if (curSize !== 'null' || curColor !== 'null') {
                if (document.querySelector('.reset-value-button') && document.querySelector('.reset-value-button').classList.contains('COLLAPSED')) {
                    document.querySelector('.show-reset-button').click();
                }
            } else if (document.querySelector('.reset-value-button') && document.querySelector('.reset-value-button').classList.contains('EXPANDED')) {
                document.querySelector('.show-reset-button').click();
            }
        } else {
            document.querySelector('.product-form .btn-cart').removeAttribute('disabled');
        }

        if (product.stock === 0) {
            document.querySelector('.product-form .btn-cart').setAttribute('disabled', 'disabled');
        }
    }, [curColor, curSize])

    const wishlistHandler = (e) => {
        e.preventDefault();

        if (toggleWishlist && !isWishlisted) {
            let currentTarget = e.currentTarget;
            currentTarget.classList.add('load-more-overlay', 'loading');
            toggleWishlist(product);

            setTimeout(() => {
                currentTarget.classList.remove('load-more-overlay', 'loading');
            }, 1000);
        } else {
            router.push('/pages/wishlist');
        }
    }

    const setColorHandler = (e) => {
        setCurColor(e.target.value);
    }

    const setSizeHandler = (e) => {
        setCurSize(e.target.value);
    }

    const addToCartHandler = () => {
        let qty = document.querySelector('.product-form-group .quantity').value;

        if (product.variants.length > 0) {
            let tmpName = product.name, tmpPrice;
            tmpName += curColor !== 'null' ? '-' + curColor : '';
            tmpName += curSize !== 'null' ? '-' + curSize : '';

            if (product.price[0] === product.price[1]) {
                tmpPrice = product.price[0];
            } else {
                tmpPrice = product.variants[curIndex].sale_price ? product.variants[curIndex].sale_price : product.variants[curIndex].price;
            }

            addToCart({ ...product, name: tmpName, qty: qty, price: tmpPrice });
        } else {
            addToCart({ ...product, qty: qty, price: product.price[0] });
        }
    }

    const resetValueHandler = (e) => {
        setCurColor('null');
        setCurSize('null');

        if (document.querySelector('.select-color')) {
            document.querySelector('.select-color').value = 'null';
        }
        if (document.querySelector('.select-size')) {
            document.querySelector('.select-size').value = 'null';
        }
    }

    function isDisabled(color, size) {
        if (color === 'null' || size === 'null') return false;

        if (sizes.length === 0) {
            return product.variants.findIndex(item => item.color.name === curColor) === -1;
        }

        if (colors.length === 0) {
            return product.variants.findIndex(item => item.size.name === curSize) === -1;
        }

        return product.variants.findIndex(item => item.color.name === color && item.size.name === size) === -1;
    }

    return (
        <div className={"product-details " + adClass}>
            <h1 className="product-name">{product.name}</h1>

            <div className='product-meta'>
                SKU: <span className='product-sku'>{product.sku}</span>
                CATEGORIES: <span className='product-brand'>
                    {
                        product.categories.map((item, index) =>
                            <React.Fragment key={item.name + '-' + index}>
                                <ALink href={{ pathname: '/shop', query: { category: item.slug } }}>
                                    {item.name}
                                </ALink>
                                {index < product.categories.length - 1 ? ', ' : ''}
                            </React.Fragment>
                        )}
                </span>
            </div>

            <div className="product-price mb-2">
                {
                    product.price[0] !== product.price[1] ?
                        product.variants.length === 0 || (product.variants.length > 0 && !product.variants[0].price) ?
                            <>
                                <ins className="new-price">${toDecimal(product.price[0])}</ins>
                                <del className="old-price">${toDecimal(product.price[1])}</del>
                            </>
                            :
                            < del className="new-price">${toDecimal(product.price[0])} – ${toDecimal(product.price[1])}</del>
                        : <ins className="new-price">${toDecimal(product.price[0])}</ins>
                }
            </div>

            {
                product.price[0] !== product.price[1] && product.variants.length === 0 ?
                    <Countdown type={2} /> : ''
            }

            <div className="ratings-container">
                <div className="ratings-full">
                    <span className="ratings" style={{ width: 20 * product.ratings + '%' }}></span>
                    <span className="tooltiptext tooltip-top">{toDecimal(product.ratings)}</span>
                </div>

                <ALink href="#" className="rating-reviews">( {product.reviews} reviews )</ALink>
            </div>

            <p className="product-short-desc">{product.short_description}</p>

            {
                product && product.variants.length > 0 ?
                    <>
                        {
                            product.variants[0].color ?
                                <div className='product-form product-variations product-color'>
                                    <label>Color:</label>
                                    <div className='select-box'>
                                        <select name='color' className='form-control select-color' onChange={setColorHandler} defaultValue={curColor}>
                                            <option value="null">Choose an option</option>
                                            {
                                                colors.map(item =>
                                                    !isDisabled(item.name, curSize) ?
                                                        <option value={item.name} key={"color-" + item.name}>{item.name}</option> : ''
                                                )
                                            }
                                        </select>
                                    </div>
                                </div> : ""
                        }

                        {
                            product.variants[0].size ?
                                <div className='product-form product-variations product-size mb-0 pb-2'>
                                    <label>Size:</label>
                                    <div className='product-form-group'>
                                        <div className='select-box'>
                                            <select name='size' className='form-control select-size' onChange={setSizeHandler} defaultValue={curSize}>
                                                <option value="null">Choose an option</option>
                                                {
                                                    sizes.map(item =>
                                                        !isDisabled(curColor, item.name) ?
                                                            <option value={item.name} key={"size-" + item.name}>{item.name}</option> : ''
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <SlideToggle collapsed={'null' === curColor || 'null' === curSize}>
                                            {({ onToggle, setCollapsibleElement, toggleState }) => (
                                                <>
                                                    <button onClick={onToggle} className='show-reset-button d-none'>Click</button>
                                                    <div ref={setCollapsibleElement} className={`overflow-hidden reset-value-button w-100 mb-0 ${toggleState}`}>
                                                        <ALink href='#' className='product-variation-clean' onClick={resetValueHandler}>Clean All</ALink>
                                                    </div>
                                                </>
                                            )}
                                        </SlideToggle>
                                    </div>
                                </div> : ""
                        }

                        <div className='product-variation-price'>
                            <SlideToggle collapsed={'null' === curColor || 'null' === curSize}>
                                {({ onToggle, setCollapsibleElement, toggleState }) => (
                                    <>
                                        <button onClick={onToggle} className='show-price d-none'>Click</button>
                                        <div ref={setCollapsibleElement} className={`overflow-hidden single-product-price ${toggleState}`}>
                                            {
                                                product.variants[curIndex].price ?
                                                    product.variants[curIndex].sale_price ?
                                                        <div className="product-price mb-0">
                                                            <ins className="new-price">${toDecimal(product.variants[curIndex].sale_price)}</ins>
                                                            <del className="old-price">${toDecimal(product.variants[curIndex].price)}</del>
                                                        </div>
                                                        : <div className="product-price mb-0">
                                                            <ins className="new-price">${toDecimal(product.variants[curIndex].price)}</ins>
                                                        </div>
                                                    : ""
                                            }
                                        </div>
                                    </>
                                )}
                            </SlideToggle>
                        </div>
                    </> : ''
            }

            <hr className="product-divider"></hr>

            {
                isStickyCart ?
                    <div className="sticky-content fix-top product-sticky-content">
                        <div className="container">
                            <div className="sticky-product-details">
                                <figure className="product-image">
                                    <ALink href={'/product/default/' + product.slug}>
                                        <img src={process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[0].url} width="90" height="90"
                                            alt="Product" />
                                    </ALink>
                                </figure>
                                <div>
                                    <h4 className="product-title"><ALink href={'/product/default/' + product.slug}>{product.name}</ALink></h4>
                                    <div className="product-info">
                                        <div className="product-price mb-0">
                                            {
                                                product.price[0] !== product.price[1] ?
                                                    product.variants.length === 0 ?
                                                        <>
                                                            <ins className="new-price">${toDecimal(product.price[0])}</ins>
                                                            <del className="old-price">${toDecimal(product.price[1])}</del>
                                                        </>
                                                        :
                                                        < del className="new-price">${toDecimal(product.price[0])} – ${toDecimal(product.price[1])}</del>
                                                    : <ins className="new-price">${toDecimal(product.price[0])}</ins>
                                            }
                                        </div>

                                        <div className="ratings-container mb-0">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{ width: 20 * product.ratings + '%' }}></span>
                                                <span className="tooltiptext tooltip-top">{toDecimal(product.ratings)}</span>
                                            </div>

                                            <ALink href="#" className="rating-reviews">( {product.reviews} reviews )</ALink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-form product-qty pb-0">
                                <label className="d-none">QTY:</label>
                                <div className="product-form-group">
                                    <Quantity max={product.stock} product={product} />
                                    <button className='btn-product btn-cart text-normal ls-normal font-weight-semi-bold' onClick={addToCartHandler}><i className='d-icon-bag'></i>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="product-form product-qty pb-0">
                        <label className="d-none">QTY:</label>
                        <div className="product-form-group">
                            <Quantity max={product.stock} product={product} />
                            <button className='btn-product btn-cart text-normal ls-normal font-weight-semi-bold' onClick={addToCartHandler}><i className='d-icon-bag'></i>Add to Cart</button>
                        </div>
                    </div>
            }

            <hr className="product-divider mb-3"></hr>

            <div className="product-footer">
                <div className="social-links mr-4">
                    <ALink href="#" className="social-link social-facebook fab fa-facebook-f"></ALink>
                    <ALink href="#" className="social-link social-twitter fab fa-twitter"></ALink>
                    <ALink href="#" className="social-link social-pinterest fab fa-pinterest-p"></ALink>
                </div> <span className="divider d-lg-show"></span> <a href="#" className={`btn-product btn-wishlist`} title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'} onClick={wishlistHandler}>
                    <i className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}></i> {
                        isWishlisted ? 'Browse wishlist' : 'Add to Wishlist'
                    }
                </a>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        wishlist: state.wishlist.data ? state.wishlist.data : []
    }
}

export default connect(mapStateToProps, { toggleWishlist: wishlistActions.toggleWishlist, addToCart: cartActions.addToCart })(DetailSeven);