type ValidityStateKeys = keyof ValidityState;

type InputNames = 'name' | 'price' | 'image';

type ErrorMessages = {
    [key in InputNames]: {
        [key in ValidityStateKeys]?: string;
    };
};

const typeOfErrors: ValidityStateKeys[] = [
    'valueMissing',
    'patternMismatch',
    'tooShort',
];

interface InputType extends HTMLInputElement {
    name: InputNames;
}

const submitButton = document.querySelector(
    'button[type=submit]',
) as HTMLButtonElement;
const formInputs = document.querySelectorAll(
    '[required]',
) as NodeListOf<InputType>;

formInputs.forEach((input) => {
    input.addEventListener('blur', () => verifyInput(input));

    input.addEventListener('invalid', (event) => event.preventDefault());
});

submitButton.addEventListener('click', () => {
    formInputs.forEach((input) => verifyInput(input));
    console.log('entrou');
});

const errorMessages: ErrorMessages = {
    name: {
        valueMissing: 'Preencha o nome do produto!',
        patternMismatch: 'Preencha um nome válido!',
        tooShort: 'O nome deve ter no mínimo 3 caracteres!',
    },
    price: {
        valueMissing: 'Preencha o preço do produto!',
        patternMismatch: 'Preencha um preço válido!',
        tooShort: '',
    },
    image: {
        valueMissing: 'Selecione uma imagem!',
        patternMismatch: 'Selecione um arquivo de imagem válido!',
        tooShort: '',
    },
};

function verifyInput(input: InputType) {
    let message = '';

    input.setCustomValidity('');

    typeOfErrors.forEach((error) => {
        if (input?.validity[error]) {
            message = errorMessages[input?.name][error] ?? '';
        }
    });

    const errorMessageElement = input.parentNode?.querySelector(
        '.error_message',
    ) as HTMLSpanElement;
    const isInputValid = input.checkValidity();

    if (isInputValid) {
        errorMessageElement.textContent = '';
        input.removeAttribute('data-invalid');
    } else {
        errorMessageElement.textContent = message;
        input.setAttribute('data-invalid', '');
    }
}

export function resetErrors() {
    formInputs.forEach((input) => {
        const errorMessageElement = input.parentNode?.querySelector(
            '.error_message',
        ) as HTMLSpanElement;

        errorMessageElement.textContent = '';
        input.removeAttribute('data-invalid');
    });
}
