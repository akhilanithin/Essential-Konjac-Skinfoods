import React from 'react';

import ALink from '~/components/features/custom-link';
import Accordion from '~/components/features/accordion/accordion';
import Card from '~/components/features/accordion/card';
import { toDecimal } from '~/utils';

interface Size {
    name: string;
    value: string;
}

interface Color {
    name: string;
    value: string;
}

interface Brand {
    name: string;
}

interface Category {
    name: string;
}

interface ProductVariant {
    size?: { name: string; size: string };
    color?: { name: string; color: string };
}

interface Product {
    variants: ProductVariant[];
    categories: Category[];
    brands: Brand[];
    reviews: number;
    ratings: number;
    name: string;
}

interface DescTwoProps {
    product: Product;
    adClass?: string;
}

const DescTwo: React.FC<DescTwoProps> = ({ product, adClass = '' }) => {





    const products = product?.data?.product

   





    const colors: Color[] = [];







  
    if (products?.variation?.length > 0) {

        if (products?.variation[0]?.colors) {
            products?.variation?.forEach(item => {
                if (colors.findIndex(color => color?.name === item?.colors!.name) === -1) {
                    colors.push({ name: item?.colors!.name, value: item?.colors.color });
                }
            });
        }
    }

    const setRating = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const activeElement = e.currentTarget.parentNode.querySelector('.active');
        if (activeElement) {
            activeElement.classList.remove('active');
        }

        e.currentTarget.classList.add('active');
    };




    const review = Array.isArray(products.review) ? products.review : [products.review];
    const calculateAverageRating = () => {
        const reviews = Array.isArray(products.review) ? products.review : [products.review];
        const totalRating = reviews.reduce((sum, review) => sum + (review?.star || 0), 0);
        return totalRating / reviews.length;
    };

    const averageRating = calculateAverageRating();


   
//    console.log( products?.review );
   



    return (
        <div className={`product-details ${adClass}`}>
            <Accordion adClass="accordion-simple">
                <Card title="Description" expanded={true} adClass="card-description">
                    <div className="row">
                        <div className="col-12 mb-8">
                            <p className="mb-6">
                                {products?.detaildescription}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card title="Additional information" adClass="card-additional">
                    <ul>



                        {/* categories */}



                        <li><label>Categories:</label>
                            <p>

                                <React.Fragment key={`${products?.category?.id}`}>
                                    {products?.category?.name}

                                    {products?.category?.id < products?.category?.length - 1 ? ', ' : ''}
                                </React.Fragment>

                            </p>
                        </li>
                        <br />
                        {/* brand */}
                        <li>
                            <label>Brands:</label>
                            <p>

                                <React.Fragment key={`${products?.brand?.id}`}>
                                    {products?.brand?.name}

                                    {products?.brand?.id < products?.brand?.length - 1 ? ', ' : ''}
                                </React.Fragment>

                            </p>
                        </li>
                        <br />







                        {/* colors */}

                        {products?.variation[0]?.colors?.length > 0 && (
                            <li>
                                <label>Color:</label>
                                <p>
                                    {products?.variation[0]?.colors?.map((item, index) => (
                                        <React.Fragment key={`${item?.name}-${index}`}>
                                            {item?.name}
                                            {index < products?.variation[0]?.colors.length - 1 ? ', ' : ''}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </li>
                        )}

                    </ul>

                </Card>





                <Card title={ `Reviews (${ products?.review?.length })` } adClass="card-reviews">



                    {
                       products?.review?.length  === 0 ?
                            <div className="comments mb-2 pt-2 pb-2 border-no">
                                There are no reviews yet.
                                    </div> :
                            <div className="comments mb-8 pt-2 pb-2 border-no">
                                <ul>
                                    <li>
                                        <div className="comment">

                                          {/* img Section */}

                                          <figure className="comment-media">
                                                <ALink href="#">
                                                    <img src="./images/blog/comments/1.jpg" alt="avatar" width="100" height="100" />
                                                </ALink>
                                            </figure>

                                            <div className="comment-body">


                                                 {/* Rating and review */}

                                                <div className="comment-rating ratings-container mb-0">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{ width: products.ratings * 20 + '%' }}></span>
                                                        <span className="tooltiptext tooltip-top">{toDecimal(products.ratings)}</span>
                                                    </div>
                                                </div>

                                                        {/* Reviews */}
                                                {products?.review?.map((review, index) => (

                                                    // date
                                                    <div className="comment-user" key={review.id || index}>
                                                        <span className="comment-date text-body">
                                                            {new Date(review.created_on).toLocaleDateString("en-US", {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>

                                                    {/* name of reviewer */}
                                                        <h4><ALink href="#">{review.name}</ALink></h4>
                                                        {/* comment */}
                                                        <div className="comment-content">
                                                    <p>{review?.message}</p>
                                                </div>
                                                    </div>
                                                ))}
                                               
                                            </div>
                                        </div>
                                    </li>



{/* 
                                    {
                                        product.reviews > 1 ?
                                            <li>
                                                <div className="comment">
                                                    <figure className="comment-media">
                                                        <ALink href="#">
                                                            <img src="./images/blog/comments/2.jpg" alt="avatar" width="100" height="100" />
                                                        </ALink>
                                                    </figure>

                                                    <div className="comment-body">
                                                        <div className="comment-rating ratings-container mb-0">
                                                            <div className="ratings-full">
                                                                <span className="ratings" style={ { width: product.ratings * 20 + '%' } }></span>
                                                                <span className="tooltiptext tooltip-top">{ toDecimal( product.ratings ) }</span>
                                                            </div>
                                                        </div>
                                                        <div className="comment-user">
                                                            <span className="comment-date text-body">September 22, 2020 at 9:42
															pm</span>
                                                            <h4><ALink href="#">John Doe</ALink></h4>
                                                        </div>

                                                        <div className="comment-content">
                                                            <p>Sed pretium, ligula sollicitudin laoreet viverra, tortor
                                                            libero sodales leo, eget blandit nunc tortor eu nibh. Nullam
                                                            mollis.
                                                            Ut justo. Suspendisse potenti. Sed egestas, ante et
                                                            vulputate volutpat,
                                                            eros pede semper est, vitae luctus metus libero eu augue.
                                                            Morbi purus libero,
                                                            faucibus adipiscing, commodo quis, avida id, est. Sed
                                                            lectus. Praesent elementum
                                                            hendrerit tortor. Sed semper lorem at felis. Vestibulum
															volutpat.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            : ""
                                    } */}



                                </ul>
                            </div>
                    }






{/* comment section */}

                    <div className="reply">
                 
                        <div className="title-wrapper text-left">


                            <h3 className="title title-simple text-left text-normal">
                                {
                                    products?.review?.length > 0 ? "Add a Review" :
                                        "Be The First To Review “" + product?.name + "”"
                                }
                            </h3>
                            <p>Your email address will not be published. Required fields are marked *</p>
                        </div>


                        <div className="rating-form">

                            {/* form */}


                            <label htmlFor="rating" className="text-dark">Your rating * </label>
                            <span className="rating-stars selected">
                                { [ 1, 2, 3, 4, 5 ].map( ( num, index ) =>
                                    <a className={ `star-${ num }` } href="#" onClick={ setRating } key={ 'star-' + index }>{ num }</a>
                                ) }
                            </span>
                            
{/* rating star */}
                            <select name="rating" id="rating" required="" style={ { display: 'none' } }>
                                <option value="">Rate…</option>
                                <option value="5">Perfect</option>
                                <option value="4">Good</option>
                                <option value="3">Average</option>
                                <option value="2">Not that bad</option>
                                <option value="1">Very poor</option>
                            </select>   
                        </div>


                        <form action="#">
                            <textarea id="reply-message" cols="30" rows="6" className="form-control mb-4"
                                placeholder="Comment *" required></textarea>
                            <div className="row">
                                <div className="col-md-6 mb-5">
                                    <input type="text" className="form-control" id="reply-name"
                                        name="reply-name" placeholder="Name *" required />
                                </div>
                                <div className="col-md-6 mb-5">
                                    <input type="email" className="form-control" id="reply-email"
                                        name="reply-email" placeholder="Email *" required />
                                </div>
                            </div>
                            <div className="form-checkbox mb-4">
                                <input type="checkbox" className="custom-checkbox" id="signin-remember"
                                    name="signin-remember" />
                                <label className="form-control-label" htmlFor="signin-remember">
                                    Save my name, email, and website in this browser for the next time I
                                    comment.
											</label>
                            </div>
                            <button type="submit" className="btn btn-primary btn-rounded">Submit<i
                                className="d-icon-arrow-right"></i></button>
                        </form>
                    </div>
                </Card>




            </Accordion>
        </div>
    );
};

export default DescTwo;
