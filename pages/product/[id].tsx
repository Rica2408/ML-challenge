import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert, Box, Button } from '@mui/material';
import { GetServerSideProps } from 'next';
import ProductCard from '@/components/product-card';
import { ProductType } from '../api/products';
import { useRouter } from 'next/router';

interface ProductDetailsProps {
  product: ProductType;

}

const updateProduct = async (product: ProductType, setCurrentProduct: Dispatch<SetStateAction<ProductType>>): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:3000/api/product/${product.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    const updatedProduct = await response.json();
    setCurrentProduct(updatedProduct.product);
    return true;
  } catch (error) {
    return false;
  }
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [isEditabled, setIsEditabled] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const [currentProduct, setCurrentProduct] = useState(product);
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState('');
  const [auxProduct, setAuxProduct] = useState(product);
  const [isCancel, setIsCancel] = useState(false);
  const toggleEdit = () => setIsEditabled(!isEditabled);

  const resetProductDetails = () => {
    setIsCancel(true);
    setIsEditabled(false);
    setCurrentProduct({ ...product });
  };

  const saveChanges = () => {
    updateProduct(currentProduct, setCurrentProduct).then((success) => {
      setShowAlert(true);

      if (!success) {
        setTextAlert('Error');
        setCurrentProduct({ ...product });
      } else {
        setTextAlert('Se actualizo el product ocorrectamente');
        const storedProducts = localStorage.getItem('products');
        const localStorageProducts = storedProducts ? JSON.parse(storedProducts) : [];
        const isOnLocalStorage = localStorageProducts.find((product: ProductType) => product.id === currentProduct.id);
        if (isOnLocalStorage) {
          const newLocalStorageProducts = localStorageProducts.map((product: ProductType) => {
            if (product.id === currentProduct.id) {
              return currentProduct;
            }
            return product;
          });
          localStorage.setItem('products', JSON.stringify(newLocalStorageProducts));
        } else {
          localStorage.setItem('products', JSON.stringify([...localStorageProducts, currentProduct]));
        }
      }
    });
    setIsEditabled(false);
  };

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    const localStorageProducts = storedProducts ? JSON.parse(storedProducts) : [];
    const localStorageProduct = localStorageProducts.find((product: ProductType) => product.id === parseInt(id as string));
    setAuxProduct(localStorageProduct ? localStorageProduct : product);
    setCurrentProduct(localStorageProduct ? localStorageProduct : product);
  }, [])

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
        setTextAlert('');
      }, 2000);
    }
  }, [showAlert]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={2} height="100%">
      {auxProduct &&
        <ProductCard
          product={auxProduct}
          isEditabled={isEditabled}
          details={true}
          isCancel={isCancel}
          setIsCancel={setIsCancel}
          setCurrentProduct={setCurrentProduct}
        />
      }
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          onClick={isEditabled ? resetProductDetails : toggleEdit}
          style={{ marginRight: isEditabled ? '10px' : '0', backgroundColor: '#1976d2', color: 'white' }}
        >
          {isEditabled ? 'Cancelar' : 'Editar'}
        </Button>
        {isEditabled && (
          <Button onClick={saveChanges} style={{ backgroundColor: '#4caf50', color: 'white' }}>
            Guardar
          </Button>
        )}
      </Box>
      {showAlert && (
        <Alert variant="outlined" severity={textAlert === "Error" ? "error" : "success"}>
          {textAlert}
        </Alert>
      )}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<ProductDetailsProps> = async (context) => {
  const { id } = context.params as { id: string };
  const response = await fetch(`http://localhost:3000/api/product/${id}`);
  let product = await response.json();

  return {
    props: {
      product: product.product ? product.product : null
    }
  };
};

export default ProductDetails;