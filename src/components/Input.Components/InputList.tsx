import { useState } from 'react';
import { inputListInterface } from '../../interfaces/formularioInterfaces';
import { DinamicAttributes } from './customInputs';

const InputList = ({
    question,
    target,
}: {
    question: inputListInterface;
    target: string[];
}) => {
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessage('');
        const enteredValue = parseInt(event.target.value, 10);

        // Verificar si el valor ingresado está en el rango del 1 al 6
        if (!isNaN(enteredValue) && enteredValue >= 1 && enteredValue <= 6) {
            // Verificar si el número ya ha sido seleccionado
            if (!selectedNumbers.includes(enteredValue)) {
                setSelectedNumbers([...selectedNumbers, enteredValue]);
                // Resto de la lógica
            } else {
                // El número ya ha sido seleccionado, puedes mostrar un mensaje de error
                setErrorMessage('Verifica que no hayan numeros repetidos');
                // También puedes mostrar un mensaje en la interfaz de usuario
            }
        } else {
            setErrorMessage('Ingresa números válidos');
        }
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
                        <div key={row.name} className="mb-3">
                            <label className="form-label fw-bold">
                                {row.title}
                            </label>
                            <input
                                id={row.name}
                                type={row.type}
                                className="form-control form-input"
                                min={1}
                                max={question.max}
                                data-target={target.join(',')}
                                onChange={handleInputChange}
                                {...DinamicAttributes({ question: row })}
                            ></input>
                            {/* <div className="form-text fw-bold">Sample description</div> */}
                        </div>
                    ))}
                </div>
            </div>
            <p className='my-0 mx-3 fw-bold text-danger'>{errorMessage}</p>
        </div>
    );
};

export default InputList;
