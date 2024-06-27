
import { Box } from "@mui/material";
import Products from "./components/products";
import { ProductType } from "./api/products/route";

const IndexPage = async ({
    searchParams = {},
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const category = searchParams.category ?? undefined
    const response = await fetch(category ? `http://localhost:3000/api/products?category=${category}` : 'http://localhost:3000/api/products', {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const products: ProductType[] = await response.json();

    return (
        <Box sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
            <Products products={products} />
        </Box>
    )
}

export default IndexPage