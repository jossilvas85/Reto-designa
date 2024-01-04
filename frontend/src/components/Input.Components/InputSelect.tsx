import { inputSelectInterface } from '../../interfaces/formularioInterfaces';
import { DinamicAttributes } from './customInputs';

// FUNCIONES PARA CREAR INPUTS
const InputSelect = ({
  question,
  target,
}: {
  question: inputSelectInterface;
  target: string[];
}) => (
  <div key={question.name} className='mb-3'>
    <label className='form-label fw-bold'>{question.title}</label>
    <select
      id={question.name}
      className={'form-select form-input '}
      data-target={target.join(',')}
      data-testid={question.name}
      {...DinamicAttributes({ question })}
    >
      <option hidden defaultValue={''}>
        Selecciona una opción
      </option>
      {question.options.map((option) => (
        <option key={`${question.name}_${option}`} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default InputSelect;
