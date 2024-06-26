import { NextApiRequest, NextApiResponse } from 'next';
import { ProductType } from "../products";

type ResponseData = {
    product?: ProductType,
    error?: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const { id } = req.query;

    switch (req.method) {
        case 'PATCH':
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(req.body)
                });
                const product = await response.json();
                res.status(200).json({ product });
            } catch (error) {
                res.status(500).json({ error: "error al actualizar el producto" });
            }
            break;

        case 'GET':
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const product = await response.json();
                res.status(200).json({ product });
            } catch (error) {
                res.status(500).json({ error: "error al obtener el producto" });
            }
            break;

        case 'POST':
            try {
                const response = await fetch(`https://fakestoreapi.com/products`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(req.body)
                });
                const product = await response.json();
                res.status(201).json({ product });
            } catch (error) {
                res.status(500).json({ error: "error al crear el producto" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PATCH', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}