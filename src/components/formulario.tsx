// El formulario se estructura en: sections

import { useEffect, useState } from 'react';
import {
    inputCheckInterface,
    inputEmailInterface,
    inputListInterface,
    inputNumberInterface,
    inputPasswordInterface,
    inputSelectInterface,
    inputTableInterface,
    inputTextInterface,
    sectionInterface,
} from '../interfaces/formularioInterfaces';
import Subform from './subform';

// Section
// // validate: numero de inputs requeridos
// // target: donde se va a guardar, pueden ser más de una opción
// // questions: preguntas de la seccion

// Questions que puede tener el section

// // INPUT: text
// // // title: string
// // // type: text
// // // name: string
// // // filter: ?
// // // required: boolean
// // // extra: string
// // // condition: 'México" se debe elegir Mexico para que se active
// // // hideField: "country" se esconde country cuando se activa

// // INPUT: number
// // // title: string
// // // type: number
// // // name: string
// // // min: int
// // // max: int
// // // required: boolean
// // // hideField: "country" se esconde country cuando se activa
// // // condition: 'México" se debe elegir Mexico para que se active
// // // step: int

// // SELECT: dropdown
// // // title: string
// // // type: select
// // // name: string
// // // options: [string] | function
// // // hideField: "country"
// // // condition: 'México"

// // TABLE

// // LIST

export interface formsInterface {
    section: string;
    validate: number;
    target: string[];
    questions: JSX.Element[];
}

const EventHandlerCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    console.log(value);
};

const Formulario = ({ data }: { data: sectionInterface[] | undefined }) => {
    const [arrNew, setArrNew] = useState();
    const [arrRenew, setArrRenew] = useState();
    const [country, setCountry] = useState('');
    const [forms, setForms] = useState<formsInterface[]>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    // Función para manejar el envío del formulario
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Aquí obtienes los datos del formulario
        const formFields = event.currentTarget.elements;
        if (formFields == undefined) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formData: any = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (let i = 0; i < formFields.length - 1; i++) {
            const fieldName = formFields[i].id;
            if (fieldName) {
                const formTargets = formFields[i].dataset.target.split(',');
                formTargets.forEach((target: string) => {
                    // Inicializar el objeto del target si aún no existe
                    if (!formData[target]) {
                        formData[target] = {};
                    }

                    // Asignar el valor al target específico
                    formData[target][fieldName] = formFields[i].value;
                });
            }
        }

        console.log(formData);
    };

    useEffect(() => {
        if (data != undefined) {
            const formsData = data.map((sectionObj) => {
                // Arreglo de INPUTS por section
                return {
                    section: sectionObj.section,
                    validate: sectionObj.validate,
                    target: sectionObj.target,
                    questions: InputsPerSection({ sectionObj }),
                };
            });
            setForms(formsData as formsInterface[]);
        }
    }, [data]);

    if (data == undefined) return;

    return (
        <form onSubmit={handleSubmit}>
            {forms?.map((form) => (
                <Subform key={form.section} form={form} />
            ))}
            <div className="text-end m-5">
                <button type="submit" className="btn btn-primary fw-bold">
                    Enviar formulario
                </button>
            </div>
        </form>
    );
};

export default Formulario;

// Funcion para asignar atributos dinamicos a los inputs
const SetDinamicAttributes = ({
    question,
}: {
    question:
        | inputTextInterface
        | inputNumberInterface
        | inputSelectInterface
        | inputTableInterface
        | inputListInterface
        | inputEmailInterface
        | inputCheckInterface
        | inputPasswordInterface;
}) => ({
    ...(question.required == false ? {} : { required: true }),
    // ...(question.condition ? { condition: 'México' } : {}),
    // ...(question.hideField ? { hideField: 'country' } : {}),
    ...((question as inputNumberInterface).min
        ? { min: (question as inputNumberInterface).min }
        : {}),
    ...((question as inputNumberInterface).max
        ? { max: (question as inputNumberInterface).max }
        : {}),
    // ...(question.condition == 'México' ? { disabled: true } : {}),
});

// Funcion que crea inputs por cada seccion
const InputsPerSection = ({ sectionObj }: { sectionObj: sectionInterface }) =>
    sectionObj.questions.map((question) =>
        // Se crea el INPUT adecuado dependiendo al TYPE
        InputSelecction({ question, target: sectionObj.target })
    );

// Funcion que crea el input adecuado dependiendo del TYPE
const InputSelecction = ({
    question,
    target,
}: {
    question:
        | inputNumberInterface
        | inputTextInterface
        | inputSelectInterface
        | inputTableInterface
        | inputListInterface
        | inputEmailInterface
        | inputCheckInterface
        | inputPasswordInterface;
    target: string[];
}) => {
    const type = question.type;
    switch (type) {
        case 'text':
            return CreateInputText(question as inputTextInterface, target);
        case 'number':
            return CreateInputNumber(question as inputNumberInterface, target);
        case 'select':
            return CreateInputSelect(question as inputSelectInterface, target);
        case 'table':
            return CreateInputTable(question as inputTableInterface, target);
        case 'list':
            return CreateInputList(question as inputListInterface, target);
        case 'email':
            return CreateInputEmail(question as inputEmailInterface, target);
        case 'checkbox':
            return CreateInputCheckbox(question as inputCheckInterface, target);
    }
};

// FUNCIONES PARA CREAR INPUTS
const CreateInputText = (question: inputTextInterface, target: string[]) => (
    <div key={question.name} className="mb-3">
        <label className="form-label fw-bold">{question.title}</label>
        <input
            id={question.name}
            type={question.type}
            className="form-control form-input"
            data-target={target.join(',')}
            {...SetDinamicAttributes({ question })}
        ></input>
        {/* <div className="form-text fw-bold">Sample description</div> */}
    </div>
);

const CreateInputNumber = (
    question: inputNumberInterface,
    target: string[]
) => (
    <div key={question.name} className="mb-3">
        <label className="form-label fw-bold">{question.title}</label>
        <input
            id={question.name}
            type={question.type}
            min={question.min}
            max={question.max}
            step={question.step ? question.step : undefined}
            className="form-control form-input"
            data-target={target.join(',')}
            {...SetDinamicAttributes({ question })}
        ></input>
        {question.min && question.max ? (
            <div className="form-text fw-bold">
                El valor mínimo debe ser {question.min} y el máximo{' '}
                {question.max}
            </div>
        ) : question.max ? (
            <div className="form-text fw-bold">
                El valor máximo debe ser {question.max}
            </div>
        ) : (
            ''
        )}
    </div>
);

const CreateInputSelect = (
    question: inputSelectInterface,
    target: string[]
) => (
    <div key={question.name} className="mb-3">
        <label className="form-label fw-bold">{question.title}</label>
        <select
            id={question.name}
            className="form-select form-input"
            data-target={target.join(',')}
            // disabled={}
            {...SetDinamicAttributes({ question })}
            onChange={
                question.name === 'country' ? EventHandlerCountry : undefined
            }
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

const CreateInputTable = (question: inputTableInterface, target: string[]) => (
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

const CreateInputList = (question: inputListInterface, target: string[]) => (
    <div
        key={question.name}
        className="my-5 py-4 border-top border-bottom border-3 border-secondary"
    >
        <label className="form-label fw-bold">{question.title}</label>
        <div className="container">
            <div className="row py-3">
                {question.rows.map((row) => {
                    return (
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
                                {...SetDinamicAttributes({ question: row })}
                            ></input>
                            {/* <div className="form-text fw-bold">Sample description</div> */}
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

const CreateInputEmail = (question: inputEmailInterface, target: string[]) => (
    <div key={question.name} className="mb-3">
        <label className="form-label fw-bold">{question.title}</label>
        <input
            id={question.name}
            type={question.type}
            className="form-control form-input"
            data-target={target.join(',')}
            {...SetDinamicAttributes({ question })}
        ></input>
        {/* <div className="form-text fw-bold">Sample description</div> */}
    </div>
);

const CreateInputCheckbox = (
    question: inputCheckInterface,
    target: string[]
) => (
    <div key={question.name} className="my-4 form-check">
        <label className="form-check-label fw-bold">{question.title}</label>

        {question.options.map((option) => (
            <input
                key={`${question.name}_option`}
                id={question.name}
                type="checkbox"
                className="form-check-input"
                data-target={target.join(',')}
                value={option}
            ></input>
        ))}
    </div>
);

// Funcion para no sobrepasar el limite de los number inputs
// const handleInputNumberChange = ({
//     event,
//     min = 0,
//     max = 1000,
// }: {
//     event: React.ChangeEvent<HTMLInputElement>;
//     min: number;
//     max: number;
// }) => {
//     const inputValue = event.target.value;
//     const numericValue = parseFloat(inputValue);

//     console.log(numericValue);
//     if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
//         event.target.value = numericValue.toString();
//     } else {
//         // Si no es un número válido, podrías manejarlo según tus necesidades
//         event.target.value = '';
//     }
// };
