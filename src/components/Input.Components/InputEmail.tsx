import { inputEmailInterface } from '../../interfaces/formularioInterfaces';
import { DinamicAttributes } from './customInputs';

// FUNCIONES PARA CREAR INPUTS
const InputEmail = ({
  question,
  target,
}: {
  question: inputEmailInterface;
  target: string[];
}) => (
  <div key={question.name} className='mb-3'>
    <label className='form-label fw-bold'>{question.title}</label>
    <input
      id={question.name}
      type={question.type}
      className={'form-control form-input ' + question.name}
      data-target={target.join(',')}
      data-testid={question.name}
      {...DinamicAttributes({ question })}
    ></input>
    {/* <div className="form-text fw-bold">Sample description</div> */}
  </div>
);

export default InputEmail;
