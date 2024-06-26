import { NextApiRequest, NextApiResponse } from "next";

export type ProductType = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image?: string,
    rating?: {
        rate: number,
        count: number
    }
    error?: string
}

type ResponseData = {
    product?: ProductType,
    error?: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>
) {
    //get categories from the url
    const { category } = req.query;
    if (category) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
            const products = await response.json();
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({ error: "error al obtener los productos" });
        }
    }
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: "error al obtener los productos" });
    }
}