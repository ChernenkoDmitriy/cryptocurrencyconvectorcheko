import { Dispatch, SetStateAction } from "react"

export const useValidation = () => {
    const validateButtonDisabled = (upNumber: string, downNumber: string, setDisabled: Dispatch<SetStateAction<boolean>>) => {
        if (upNumber === '' && downNumber === '') {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    const validateInputs = (existsValue: string, inputValue: string, setValue: Dispatch<SetStateAction<string>>) => {
        const dotsCount = existsValue.split(".").length - 1
        const dotsCountInput = inputValue.split(".").length - 1
        if (inputValue.length <= 14) {
            if (existsValue === '' && inputValue === '.') {
                return
            } else if (dotsCount < 2) {
                if (dotsCountInput < 2) {
                    setValue(inputValue)
                }
            } else {
                setValue(inputValue)
            }
        }
    }

    const validateNumbers = (number: string) => {
        if (number[number.length - 1] === '.') {
            return number.slice(0, -1)
        } else {
            return number
        }
    }

    return { validateButtonDisabled, validateInputs, validateNumbers };
}