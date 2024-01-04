import { useEffect, useState } from 'react';
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
import { stringify } from 'querystring';

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
      className='my-5 py-4 border-top border-bottom border-3 border-secondary'
    >
      <label className='form-label fw-bold'>{question.title}</label>
      <div className='container'>
        <div className='row py-3'>
          {question.rows.map((row) => (
            <InputList_Input
              key={row.name}
              selectedNumbers={selectedNumbers}
              HandlerSetSelectedNumbers={HandlerSetSelectedNumbers}
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
  const [currentValue, setCurrentValue] = useState<number | string>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [repeatedNumCheck, setRepeatedNumCheck] = useState(false);
  const [wrongNumCheck, setWrongNumCheck] = useState(false);

  // Cuidar que si se mete un valor equivocado, se mantenga el error hasta que se corrija

  // El state SOLAMENTE se encarga de buscar los numeros repetidos

  // Effect que comprueba numeros repetidos
  useEffect(() => {
    const checker = CheckRepeatedValues(selectedNumbers);
    if (typeof checker === 'number' && checker === currentValue) {
      setRepeatedNumCheck(true);
    } else {
      setRepeatedNumCheck(false);
    }
  }, [selectedNumbers]);

  useEffect(() => {
    if (wrongNumCheck) {
      setErrorMessage('Valor incorrecto o repetido');
    } else if (repeatedNumCheck) {
      setErrorMessage('Valor incorrecto o repetido');
    } else {
      setErrorMessage('');
    }
  }, [wrongNumCheck, repeatedNumCheck]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    // Funcion para borrar un numero
    const ErraseNumber = () => {
      const copySelectedNumbers = [...selectedNumbers];
      const newSelectedNumbers = copySelectedNumbers.filter(
        (item) => item.name !== name
      );
      HandlerSetSelectedNumbers([...newSelectedNumbers]);
      setCurrentValue('');
    };

    // Borro el numero de los guardados cuando se borra el input
    if (event.target.value === '') {
      ErraseNumber();
    } else {
      // Si el valor ingresado excede los limites, no lo guardo y mando la alerta
      const enteredValue = parseInt(event.target.value, 10);
      if (enteredValue < 1 || enteredValue > question.max) {
        ErraseNumber();
        setWrongNumCheck(true);
        return;
      }

      // Guardo el numero aunque sea repetido para poder hacer la comparacion
      if (typeof enteredValue === 'number' && !Number.isNaN(enteredValue)) {
        HandlerSetSelectedNumbers([
          ...selectedNumbers,
          { name: name, number: enteredValue },
        ]);
        setWrongNumCheck(false);
        setCurrentValue(enteredValue);
        // }
      }
    }
  };

  return (
    <div className='mb-3'>
      <label className='form-label fw-bold'>{row.title}</label>
      <input
        id={row.name}
        type={row.type}
        className={'form-control form-input ' + question.name}
        min={1}
        max={question.max}
        data-target={dataTarget.join(',')}
        data-testid={row.name}
        onChange={(event) => handleInputChange(event, row.name as string)}
        {...DinamicAttributes({ question: row })}
      ></input>
      <p
        className='form-text fw-bold text-danger'
        data-testid={`${row.name}_error`}
      >
        {errorMessage}
      </p>
    </div>
  );
};

const CheckRepeatedValues = (selectedNumbers: selectedNumbersInterface[]) =>
  // value: number | string;
  {
    // Crear un conjunto para realizar un seguimiento de los valores vistos
    const existingValues = new Set();
    // Recorrer las propiedades del objeto
    for (const obj of selectedNumbers) {
      const { number } = obj;

      if (existingValues.has(number)) {
        return number; // Valor repetido encontrado
      }
      existingValues.add(number);
    }
    return false;
  };
