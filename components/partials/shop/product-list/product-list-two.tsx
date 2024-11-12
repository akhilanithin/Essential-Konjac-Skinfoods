// ProductComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductRequest } from '~/store/productActions';

const ProductComponent = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductRequest());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Product List</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProductComponent;
