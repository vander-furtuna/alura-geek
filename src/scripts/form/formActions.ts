import { createProduct } from '../api/api';
import { showProducts } from '../product/productActions';
import { resetFileInput } from './fileInput';
import { resetErrors } from './formValidation';

const formElement = document.querySelector('form') as HTMLFormElement;

const nameInput = document.querySelector(
    'input[name=name]',
) as HTMLInputElement;

const priceInput = document.querySelector(
    'input[name=price]',
) as HTMLInputElement;

const imageInput = document.querySelector(
    'input[name=image]',
) as HTMLInputElement;

const clearButton = document.querySelector(
    'button[type=reset]',
) as HTMLButtonElement;

function resetForm() {
    nameInput.value = '';
    priceInput.value = '';

    resetFileInput();
    resetErrors();
}

clearButton.addEventListener('click', resetForm);

async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    try {
        const imageFile = imageInput.files?.item(0)!;

        const imageBase64 = await convertImageToBase64(imageFile);
        const product = {
            name: nameInput.value,
            price: Number(priceInput.value.replace(',', '.')),
            image: imageBase64 as string,
        };

        await createProduct(product);

        resetForm();
        showProducts();
    } catch (error) {
        console.error(error);
    }
}

async function convertImageToBase64(image: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
            resolve(event.target?.result);
        };

        reader.readAsDataURL(image);

        reader.onerror = reject;
    });
}

formElement.addEventListener('submit', handleSubmit);
