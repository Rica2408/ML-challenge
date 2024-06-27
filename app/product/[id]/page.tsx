'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert, Box, Button } from '@mui/material';
import ProductCard from '../../components/product-card';
import { ProductType } from '@/app/api/products/route';
import { useParams } from 'next/navigation';

const fetchProduct = async (id: string, setCurrentProduct: Dispatch<SetStateAction<ProductType>>) => {
  try {
    const response = await fetch(`http://localhost:3000/api/product/${id}`);
    let product = await response.json();
    setCurrentProduct(product);
  } catch (error) {
    console.error("Error al obtener el producto pero existe en el localstorage");
  }
}

const updateProduct = async (product: ProductType): Promise<ProductType | boolean> => {
  try {
    const response = await fetch(`http://localhost:3000/api/product/${product.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    const updatedProduct = await response.json();
    return updatedProduct.product;
  } catch (error) {
    return false;
  }
}

const ProductDetails = () => {
  const { id } = useParams();
  const [isEditabled, setIsEditabled] = useState(false);

  const [product, setProduct] = useState<ProductType>({} as ProductType); //el que se obtiene de la api
  const [auxProduct, setAuxProduct] = useState<ProductType>({} as ProductType); //el el originar o sino el del local
  const [currentProduct, setCurrentProduct] = useState<ProductType>({} as ProductType); //el que se esta editando

  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState('');
  const [isCancel, setIsCancel] = useState(false);
  const toggleEdit = () => setIsEditabled(!isEditabled);

  const resetProductDetails = () => {
    setIsCancel(true);
    setIsEditabled(false);
    setCurrentProduct({ ...auxProduct });
  };

  const saveChanges = () => {
    updateProduct(currentProduct).then((success) => {
      setShowAlert(true);
      if (success) {
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
        setAuxProduct(currentProduct);
      } else {
        setTextAlert('Error');
        setCurrentProduct({ ...auxProduct });
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
  }, [product])

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
        setTextAlert('');
      }, 2000);
    }
  }, [showAlert]);

  useEffect(() => {
    fetchProduct(id as string, setProduct);
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={2} height="100%">
      {auxProduct.category &&
        <>
          <ProductCard
            product={auxProduct}
            isEditabled={isEditabled}
            details={true}
            isCancel={isCancel}
            setIsCancel={setIsCancel}
            setCurrentProduct={setCurrentProduct}
          />
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
        </>
      }
      {showAlert && (
        <Alert variant="outlined" severity={textAlert === "Error" ? "error" : "success"}>
          {textAlert}
        </Alert>
      )}
    </Box>
  );
};

export default ProductDetails;