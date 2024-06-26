import Products from "@/components/products"
import { ProductType } from "./api/products";
import { Box } from "@mui/material";

type IndexPageProps = {
    products: ProductType[];
}

const IndexPage = ({ products }: IndexPageProps) => {
    const router = useRouter();
    const { category } = router.query;
    const [allProducts, setAllProducts] = useState<ProductType[]>([]);
    let localProducts;
    let localStorageProducts: ProductType[] = [];

    if (typeof window !== "undefined") {
        localProducts = localStorage.getItem('products');
        localStorageProducts = localProducts ? JSON.parse(localProducts) : null;
        if (category && category !== 'all') {
            localStorageProducts = localStorageProducts.filter((product: ProductType) => product.category === category)
        }
    }
    useEffect(() => {
        if (localStorageProducts?.length > 0) {
            let allProducts = [...products];
            localStorageProducts.forEach((element: ProductType) => {
                const auxElement = products.find((product) => product.id == element.id);
                if (auxElement) {
                    const productIndex = allProducts.findIndex((product) => product.id == element.id);
                    allProducts[productIndex] = element;
                } else {
                    allProducts = [element, ...allProducts];
                }
            });
            setAllProducts(allProducts)
        } else {
            setAllProducts(products);
        }
    }, [products]);

    return (
        <Box sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
            <Products products={allProducts} />
        </Box>
    )
}

import { NextPageContext } from 'next';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const getServerSideProps = async (content: NextPageContext) => {
    const { category } = content.query;
    if (category && category !== 'all') {
        const response = await fetch(`http://localhost:3000/api/products?category=${category}`);
        const products = await response.json();
        return {
            props: {
                products,
            }
        }
    }
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();

    return {
        props: {
            products,
        }
    }
}

export default IndexPage