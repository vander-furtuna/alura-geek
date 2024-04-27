import { type Product } from '../types/product';

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);
    return await response.json();
}

export async function createProduct(product: Product) {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
}

export async function deleteProduct(id: number) {
    return await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
}
