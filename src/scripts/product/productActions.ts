import { getProducts } from '../api/api';
import { createProductComponent } from './productComponent';

const productsContainer = document.getElementById(
    'product_cards_container',
) as HTMLDivElement;

export async function showProducts() {
    const products = await getProducts();
    productsContainer.innerHTML = '';

    products.forEach((product) => {
        const productComponent = createProductComponent(product);
        productsContainer.appendChild(productComponent);
    });
}

showProducts();
