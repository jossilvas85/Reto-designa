import { inputTextInterface } from '../../interfaces/formularioInterfaces';
import { DinamicAttributes } from './customInputs';

// FUNCIONES PARA CREAR INPUTS
const InputText = ({
  question,
  target,
}: {
  question: inputTextInterface;
  target: string[];
}) => (
  <div key={question.name} className='mb-3'>
    <label className='form-label fw-bold'>{question.title}</label>
    <input
      id={question.name}
      type={question.type}
      className={`form-control  form-input ${question.name}`}
      data-target={target.join(',')}
      data-testid={question.name}
      {...DinamicAttributes({ question })}
    ></input>
  </div>
);

export default InputText;
