import { inputNumberInterface } from '../../interfaces/formularioInterfaces';
import { DinamicAttributes } from './customInputs';

// FUNCIONES PARA CREAR INPUTS
const InputNumber = ({
  question,
  target,
}: {
  question: inputNumberInterface;
  target: string[];
}) => (
  <div key={question.name} className='mb-3'>
    <label className='form-label fw-bold'>{question.title}</label>
    <input
      id={question.name}
      type={question.type}
      min={question.min}
      max={question.max}
      step={question.step ? question.step : undefined}
      className={'form-control form-input ' + question.name}
      data-target={target.join(',')}
      data-testid={question.name}
      {...DinamicAttributes({ question })}
    ></input>
    {question.min && question.max ? (
      <div className='form-text fw-bold'>
        El valor mínimo debe ser {question.min} y el máximo {question.max}
      </div>
    ) : question.max ? (
      <div className='form-text fw-bold'>
        El valor máximo debe ser {question.max}
      </div>
    ) : (
      ''
    )}
  </div>
);

export default InputNumber;
