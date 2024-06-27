import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, context: any) {
    const { id } = context.params;

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await response.json();

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
    }
}

export async function PATCH(req: Request, context: any) {
    const body = await req.json();

    const { id } = context.params;
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const product = await response.json();
        return NextResponse.json({ product });
    } catch (error) {
        console.error(error);
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    try {
        const response = await fetch(`https://fakestoreapi.com/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const product = await response.json();
        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
    }
}
