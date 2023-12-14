import { useState } from 'react';
import {
    inputCheckboxInterface,
    inputEmailInterface,
    inputListInterface,
    inputNumberInterface,
    inputPasswordInterface,
    inputSelectInterface,
    inputTableInterface,
    inputTextInterface,
} from '../../interfaces/formularioInterfaces';
import { DinamicAttributes } from './customInputs';

interface selectedNumbersInterface {
    name: string;
    number: number;
}

const InputList = ({
    question,
    target,
}: {
    question: inputListInterface;
    target: string[];
}) => {
    const [selectedNumbers, setSelectedNumbers] = useState<
        selectedNumbersInterface[]
    >([]);

    const HandlerSetSelectedNumbers = (data: selectedNumbersInterface[]) => {
        setSelectedNumbers(data);
    };

    return (
        <div
            key={question.name}
            className="my-5 py-4 border-top border-bottom border-3 border-secondary"
        >
            <label className="form-label fw-bold">{question.title}</label>
            <div className="container">
                <div className="row py-3">
                    {question.rows.map((row) => (
                        // <div key={row.name} className="mb-3">
                        //     <label className="form-label fw-bold">
                        //         {row.title}
                        //     </label>
                        //     <input
                        //         id={row.name}
                        //         type={row.type}
                        //         className="form-control form-input"
                        //         min={1}
                        //         max={question.max}
                        //         data-target={target.join(',')}
                        //         onChange={handleInputChange}
                        //         {...DinamicAttributes({ question: row })}
                        //     ></input>
                        //     {/* <div className="form-text fw-bold">Sample description</div> */}
                        // </div>
                        <InputList_Input
                            key={row.name}
                            selectedNumbers={selectedNumbers}
                            HandlerSetSelectedNumbers={
                                HandlerSetSelectedNumbers
                            }
                            row={row}
                            question={question}
                            dataTarget={target}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InputList;

interface InputList_Input {
    selectedNumbers: selectedNumbersInterface[];
    HandlerSetSelectedNumbers: (data: selectedNumbersInterface[]) => void;
    row:
        | inputTextInterface
        | inputNumberInterface
        | inputSelectInterface
        | inputTableInterface
        | inputListInterface
        | inputEmailInterface
        | inputCheckboxInterface
        | inputPasswordInterface;

    question: inputListInterface;
    dataTarget: string[];
}

export const InputList_Input = ({
    selectedNumbers,
    HandlerSetSelectedNumbers,
    row,
    question,
    dataTarget,
}: InputList_Input) => {
    const [previousValue, setPreviousValue] = useState<number>(NaN);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        name: string
    ) => {
        setErrorMessage('');

        if (event.target.value === '') {
            const copySelectedNumbers = [...selectedNumbers];
            const newSelectedNumbers = copySelectedNumbers.filter(
                (item) => item.name !== name
            );
            HandlerSetSelectedNumbers([...newSelectedNumbers]);
        } else {
            const enteredValue = parseInt(event.target.value, 10);

            if (enteredValue < 1 || enteredValue > question.max) {
                setErrorMessage('Valor incorrecto o repetido');
                return;
            }

            const existingNumber = selectedNumbers.some(
                (item) => item.number === enteredValue
            );

            if (existingNumber) {
                setErrorMessage('Valor incorrecto o repetido');
                return;
            } else {
                // Guardo solamente si el valor es correcto
                if (
                    typeof enteredValue === 'number' &&
                    !Number.isNaN(enteredValue)
                ) {
                    HandlerSetSelectedNumbers([
                        ...selectedNumbers,
                        { name: name, number: enteredValue },
                    ]);
                    setPreviousValue(enteredValue);
                }
            }
        }
    };

    return (
        <div className="mb-3">
            <label className="form-label fw-bold">{row.title}</label>
            <input
                id={row.name}
                type={row.type}
                className="form-control form-input"
                min={1}
                max={question.max}
                data-target={dataTarget.join(',')}
                onChange={(event) =>
                    handleInputChange(event, row.name as string)
                }
                {...DinamicAttributes({ question: row })}
            ></input>
            <p className="form-text fw-bold text-danger">{errorMessage}</p>
        </div>
    );
};
