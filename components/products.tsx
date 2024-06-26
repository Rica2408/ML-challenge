import { ProductType } from '@/pages/api/products';
import ProductCard from './product-card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Alert, Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import AddProductoModal from './add-product-modal';
type ProductProps = {
    products: ProductType[];
}

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Products = ({ products }: ProductProps) => {
    const router = useRouter();
    const { category } = router.query;
    const carouselRef = useRef<any>(null);
    const [localProducts, setLocalProducts] = useState<ProductType[]>([])
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [textAlert, setTextAlert] = useState('');

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.goToSlide(0);
        }
    }, [category]);

    useEffect(() => {
        setLocalProducts(products);
    }, [products]);

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        const localStorageProducts = storedProducts ? JSON.parse(storedProducts) : [];
        if (category && category !== 'all') {
            const filteredProducts = localStorageProducts.filter((product: ProductType) => product.category === category);
            setLocalProducts([...filteredProducts, ...products]);
        } else {
            setLocalProducts([...localStorageProducts, ...products]);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [showAlert]);

    return (
        <Box sx={{ height: "100%", alignContent: "center" }}>
            <Carousel
                ref={carouselRef}
                responsive={responsive}
                ssr
                infinite={false}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {localProducts.map((product) => (
                    <Box key={product.id} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                        <ProductCard product={product} />
                    </Box>
                ))}
            </Carousel>
            <Box display="flex" justifyContent="center" m={1}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Nuevo producto
                </Button>
            </Box>
            <AddProductoModal 
                open={open}
                handleClose={() => setOpen(false)}
                setLocalProducts={setLocalProducts}
                products={localProducts}
                setShowAlert={setShowAlert}
                setTextAlert={setTextAlert}

            />
            {showAlert && (
                <Alert variant="outlined" severity={textAlert === "Error" ? "error" : "success"}>
                    {textAlert}
                </Alert>
            )}
        </Box>
    );
}

export default Products;
