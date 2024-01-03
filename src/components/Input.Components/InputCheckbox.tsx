import { inputCheckboxInterface } from '../../interfaces/formularioInterfaces';

// FUNCIONES PARA CREAR INPUTS
const InputCheckbox = ({
  question,
  target,
}: {
  question: inputCheckboxInterface;
  target: string[];
}) => (
  <div key={question.name} className='my-4 form-check'>
    <label className='form-check-label fw-bold'>{question.title}</label>

    {question.options.map((option) => (
      <input
        key={`${question.name}_option`}
        id={question.name}
        type='checkbox'
        className={'form-input '}
        data-testid={question.name}
        data-target={target.join(',')}
        value={option}
      ></input>
    ))}
  </div>
);

export default InputCheckbox;
