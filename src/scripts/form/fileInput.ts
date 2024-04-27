const fileInput = document.querySelector(
    'input[type="file"]',
) as HTMLInputElement;
const inputContainer = document.getElementById(
    'file_input',
) as HTMLLabelElement;
const inputText = document.getElementById(
    'input_file_label',
) as HTMLSpanElement;

fileInput.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.item(0);
    if (file) {
        inputText.textContent = `Arquivo: ${file.name}`;
        inputContainer.setAttribute('data-has-file', 'tre');

        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
            console.log(event.target?.result);
        };

        reader.readAsDataURL(file);
    }
});

export function resetFileInput() {
    inputText.textContent = 'Selecione uma imagem...';
    inputContainer.removeAttribute('data-has-file');
    fileInput.files = null;
}

const deleteFileInput = document.getElementById(
    'file_delete',
) as HTMLButtonElement;

deleteFileInput.addEventListener('click', () => {
    resetFileInput();
});
