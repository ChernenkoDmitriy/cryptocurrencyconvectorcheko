import { Dispatch, SetStateAction } from "react"

export const useValidation = () => {
    const validateButtonDisabled = (upNumber: string, downNumber: string, setDisabled: Dispatch<SetStateAction<boolean>>) => {
        if (upNumber === '' && downNumber === '') {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    const validateCurrency = (value: string): string | null => {
        if (value && !isNaN(Number(value.replace(/,/g, '.')))) {
            return value;
        }
        return '';
    }

    const validateNumbers = (number: string) => {
        return String(Number(number));
    }

    return { validateButtonDisabled, validateCurrency, validateNumbers };
}