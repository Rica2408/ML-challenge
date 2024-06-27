import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

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

export async function GET(req: NextApiRequest) {

    const url = req.url ?? ""
    const parsedUrl = new URL(url);
    const category = parsedUrl.searchParams.get("category");

    if (category && category !== "all") {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
            const products = await response.json();
            return NextResponse.json(products)
        } catch (error) {
            console.error(error);
        }
    }
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        return NextResponse.json(products)

    } catch (error) {
        console.error(error);
    }
}