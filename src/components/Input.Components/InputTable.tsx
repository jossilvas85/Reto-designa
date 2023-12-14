import { inputTableInterface } from '../../interfaces/formularioInterfaces';
import { InputSelecction } from './customInputs';

// FUNCIONES PARA CREAR INPUTS
const InputTable = ({
    question,
    target,
}: {
    question: inputTableInterface;
    target: string[];
}) => (
    <div
        key={question.name}
        className="my-5 py-4 border-top border-bottom border-3 border-secondary"
    >
        <label className="form-label fw-bold">{question.title}</label>
        <div className="container">
            <div className="row">
                {question.rows.map((row) => {
                    return (
                        <div
                            key={row.name}
                            className="col-md-6 col-sm-12 my-2 "
                        >
                            {InputSelecction({ question: row, target })}
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

export default InputTable;
