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







   
//    console.log( products?.review );
   

// console.log(products?.productbenefit);

    return (
        <div className={`product-details ${adClass}`}>
            <Accordion adClass="accordion-simple">




                
            <Card title="Additional information"  expanded={true}  adClass="card-additional">
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








                    </ul>

                </Card>


                <Card title="Description"adClass="card-description">
                    <div className="row">
                        <div className="col-12 mb-8">
                            <p className="mb-6">
                                {products?.detaildescription}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card title="Benefits" adClass="card-additional" >
                    <ul  >
                        {products?.productbenefit.map((benefitItem) => (
                            <li key={benefitItem.id}>
                                <p>
                                    &#8226; {benefitItem.benefit}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Card>



                <Card title="How to Use" adClass="card-additional" >
                    <ul  >
                        {products?.productuse?.map((benefitItem) => (
                            <li key={benefitItem.id}>
                                <p>
                                    &#8226; {benefitItem?.step}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Card>




                



                <Card title={`Reviews (${products?.review?.length})`}>

                    <div className="comments-section">

                        {products?.review?.length === 0 ? (
                            <div className="no-reviews text-center">
                                <p>There are no reviews yet.</p>
                            </div>
                        ) : (
                            <div className="reviews-container">
                                <ul className="list-unstyled">
                                    {products?.review?.map((review, index) => (
                                        <li key={review.id || index} className="mb-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex">
                                                        {/* Avatar Section */}
                                                        <figure className="mr-3">
                                                            <ALink href="#">
                                                                <img
                                                                    src="./images/blog/comments/1.jpg" // You can make this dynamic based on the reviewer's image if available
                                                                    alt="avatar"
                                                                    className="rounded-circle"
                                                                    width="80"
                                                                    height="80"
                                                                />
                                                            </ALink>
                                                        </figure>

                                                        {/* Review Content */}
                                                        <div className="flex-fill">
                                                            {/* Rating */}
                                                            <div className="comment-rating mb-2">
                                                                <div className="ratings-container">
                                                                    <span
                                                                        className="ratings"
                                                                        style={{ width: review.rating * 20 + "%" }} // Convert rating to percentage
                                                                    ></span>
                                                                    {/* <span className="tooltiptext">{review.rating.toFixed(1)}</span> */}
                                                                </div>
                                                            </div>

                                                            {/* Reviewer Name and Date */}
                                                            <div className="review-meta mb-2">
                                                                <h5 className="card-title">
                                                                    <ALink href="#">{review.name}</ALink>
                                                                </h5>
                                                                <span className="text-muted">
                                                                    {new Date(review.created_on).toLocaleDateString("en-US", {
                                                                        year: "numeric",
                                                                        month: "long",
                                                                        day: "numeric",
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    })}
                                                                </span>
                                                            </div>

                                                            {/* Review Message */}
                                                            <div className="review-content">
                                                                <p>{review?.message}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                </Card>





                <Card title={ `Comments` } adClass="card-reviews">

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
