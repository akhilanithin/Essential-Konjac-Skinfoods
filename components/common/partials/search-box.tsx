import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';

import { GET_PRODUCTS } from '~/server/queries';
import withApollo from '~/server/apollo';

import { toDecimal } from '~/utils';

function SearchForm() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    // const [searchProducts, { data }] = useLazyQuery(GET_PRODUCTS);

    const [timer, setTimer] = useState('null');

    const [filteredResults, setFilteredResults] = useState([]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);




    
    const [data, setData] = useState(null);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

  
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://essentialkonjacskinfoods.com/api/v1/en/shop/0/0/0/0/5000/false/false/true/undefined/`
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setData(data)
               
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); 







    const products = data?.data?.products || [];

    const filterActiveProducts = (products) => products?.filter(item => !item?.status) || [];

    const getFilteredResults = (searchTerm) => {
        const activeProducts = filterActiveProducts(products);
        return activeProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    useEffect(() => {
        document.querySelector("body").addEventListener("click", onBodyClick);

        return (() => {
            document.querySelector("body").removeEventListener("click", onBodyClick);
        })
    }, [])

    useEffect(() => {
        setSearch("");
    }, [router.query.slug])
    

    useEffect(() => {
        if (search.length > 2) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                const results = getFilteredResults(search);
                setFilteredResults(results);
            }, 50);
        } else {
            setFilteredResults([]);
        }
    
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [search, products]); // Add `products` dependency
    

    useEffect(() => {
        document.querySelector('.header-search.show-results') && document.querySelector('.header-search.show-results').classList.remove('show-results');
    }, [router.pathname])

    function removeXSSAttacks(html) {
        const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

        // Removing the <script> tags
        while (SCRIPT_REGEX.test(html)) {
            html = html.replace(SCRIPT_REGEX, "");
        }

        // Removing all events from tags...
        html = html.replace(/ on\w+="[^"]*"/g, "");

        return {
            __html: html
        }
    }

    function matchEmphasize(name) {
        let regExp = new RegExp(search, "i");
        return name.replace(
            regExp,
            (match) => "<strong>" + match + "</strong>"
        );
    }

    function showSearchBox(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.closest('.header-search').classList.toggle('show');
    }

    function onBodyClick(e) {
        if (e.target.closest('.header-search')) return e.target.closest('.header-search').classList.contains('show-results') || e.target.closest('.header-search').classList.add('show-results');

        document.querySelector('.header-search.show') && document.querySelector('.header-search.show').classList.remove('show');
        document.querySelector('.header-search.show-results') && document.querySelector('.header-search.show-results').classList.remove('show-results');
    }

    function onSearchChange(e) {
        setSearch(e.target.value);
    }

    function onSubmitSearchForm(e) {
        e.preventDefault();

        router.push({
            pathname: '/shop',
            query: {
                search: search
            }
        });
    }


    const PRODUCT_IMAGE_BASEURL = process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASEURL;

// console.log(filteredResults);


    const eachVariations=filteredResults?.map(cat => cat?.variation);

    const variations = Array.isArray(eachVariations) ?eachVariations : [eachVariations];
    

    // console.log(filteredResults);
    // console.log(variations);

    const result = variations?.flatMap(group =>
        group.map(item => ({
          mainPrice: item.price, 
          offerPrice: item.offers.length > 0 ? item.offers[0].price : null 
        }))
      );
    

    //   console.log(result[0]?.offerPrice);

    //   result[0]?.mainPrice
    
    // const discounts = variations.flatMap(variation => variation?.offers || []);
    // const discount = discounts.length > 0 ? discounts[0] : null;
    // const discountValue = discount ? discount.discount : 0;
    // const discountPrice = discount ? discount.price : null;
    // const basePrice = variations[0]?.price || 0;

    
    const showDiscountedPrice = result[0]?.mainPrice && result[0]?.mainPrice < result[0]?.offerPrice;


    return (      
        <div className="header-search hs-toggle d-block">
            <ALink href="#" className="search-toggle d-flex align-items-center" role="button"><i className="d-icon-search"></i></ALink>
            <form action="#" method="get" onSubmit={onSubmitSearchForm} className="input-wrapper">
                <input type="text" className="form-control" name="search" autoComplete="off" value={search} onChange={onSearchChange}
                    placeholder="Search..." required onClick={showSearchBox} />

                <button className="btn btn-search" type="submit">
                    <i className="d-icon-search"></i>
                </button>
                <div className="live-search-list bg-grey-light scrollable">


                    {search?.length > 2 && filteredResults && filteredResults?.map((product, index) => (

                   


                        <ALink href={`/product/${product?.id}`} className="autocomplete-suggestion" key={`search-result-${index}`}>
                            <LazyLoadImage  src={`${PRODUCT_IMAGE_BASEURL}/products/${product.image}`} width={40} height={40} alt="product" />
                            <div className="search-name" dangerouslySetInnerHTML={removeXSSAttacks(matchEmphasize(product?.name))}></div>
                            <span className="search-price">



{/* 


                                {
                                    result[0]?.mainPrice !== result[0]?.offerPrice ? (
                                        filteredResults?.variation?.length === 1 ? (
                                            <>
                                                <ins className="new-price">AED {toDecimal(result[0]?.mainPrice)}</ins>
                                                <del className="old-price">AED {toDecimal(result[0]?.offerPrice)}</del>
                                            </>
                                        ) : (
                                            <ins className="new-price">
                                                AED {toDecimal(result[0]?.mainPrice)}
                                            </ins>
                                        )
                                    ) : (
                                        <ins className="new-price">AED {toDecimal(result[0]?.mainPrice)}</ins>
                                    )
                                } */}









{/* 
                                {showDiscountedPrice ? (
                                    <>
                                        <del className="old-price"> AED {toDecimal(result[0]?.mainPrice)}</del>
                                        <ins className="new-price"> AED {toDecimal(result[0]?.offerPrice)}</ins>
                                    </>
                                ) : (
                                    <ins className="new-price">AED {toDecimal(result[0]?.offerPrice)}</ins>
                                    
                                )}  */}



                                

                            </span>
                            
                        </ALink>



                    ))
                    }



                </div>
            </form>
        </div>
    );
}

export default withApollo({ ssr: typeof window === 'undefined' })(SearchForm);