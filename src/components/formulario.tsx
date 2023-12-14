// El formulario se estructura en: sections

import { useEffect, useState } from 'react';
import {
    inputCheckInterface,
    inputEmailInterface,
    inputListInterface,
    inputNumberInerface,
    inputPasswordInterface,
    inputSelectInterface,
    inputTableInterface,
    inputTextInerface,
    sectionInterface,
} from '../interfaces/formularioInterfaces';

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

interface formsInterface {
    section: string;
    validate: number;
    target: string[];
    questions: JSX.Element[];
}

const Formulario = ({ data }: { data: sectionInterface[] | undefined }) => {
    const [arrNew, setArrNew] = useState();
    const [arrRenew, setArrRenew] = useState();
    const [forms, setForms] = useState<formsInterface[]>();

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
        <>
            {forms?.map((form, index) => (
                <div key={`${form.section}_${form.target}`}>
                    <h2 className="my-5">{form.section}</h2>

                    <div className="form-card text-start p-md-5 py-2 container ">
                        <form>
                            {form.questions.map((question) => (
                                <div>{question}</div>
                            ))}
                        </form>

                        {index === forms.length - 1 ? (
                            <div className="text-end mt-5">
                                <button
                                    type="submit"
                                    className="btn btn-primary fw-bold"
                                >
                                    Enviar formulario
                                </button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default Formulario;

// Funcion para asignar atributos dinamicos a los inputs
const SetDinamicAttributes = ({
    question,
}: {
    question:
        | inputTextInerface
        | inputNumberInerface
        | inputSelectInterface
        | inputTableInterface
        | inputListInterface
        | inputEmailInterface
        | inputCheckInterface
        | inputPasswordInterface;
}) => {
    return { ...(question.required == false ? {} : { required: true }) };
};

// Funcion que crea inputs por cada seccion
const InputsPerSection = ({ sectionObj }: { sectionObj: sectionInterface }) =>
    sectionObj.questions.map((question) =>
        // Se crea el INPUT adecuado dependiendo al TYPE
        InputSelecction({ question })
    );

// Funcion que crea el input adecuado dependiendo del TYPE
const InputSelecction = ({
    question,
}: {
    question:
        | inputNumberInerface
        | inputTextInerface
        | inputSelectInterface
        | inputTableInterface
        | inputListInterface
        | inputEmailInterface
        | inputCheckInterface
        | inputPasswordInterface;
}) => {
    const type = question.type;
    switch (type) {
        case 'text':
            return CreateInputText(question as inputTextInerface);
        case 'number':
            return CreateInputNumber(question as inputNumberInerface);
        case 'select':
            return CreateInputSelect(question as inputSelectInterface);
        case 'table':
            return CreateInputTable(question as inputTableInterface);
        case 'list':
            return CreateInputList(question as inputListInterface);
        case 'email':
            return CreateInputEmail(question as inputEmailInterface);
        case 'checkbox':
            return CreateInputCheckbox(question as inputCheckInterface);
    }
};

// FUNCIONES PARA CREAR INPUTS
const CreateInputText = (question: inputTextInerface) => (
    <div key={question.name} className="mb-3">
        <label className="form-label fw-bold">{question.title}</label>
        <input
            id={question.name}
            type={question.type}
            className="form-control form-input"
            {...SetDinamicAttributes({ question })}
        ></input>
        {/* <div className="form-text fw-bold">Sample description</div> */}
    </div>
);

const CreateInputNumber = (question: inputNumberInerface) => (
    <div key={question.name} className="mb-3">
        <label className="form-label fw-bold">{question.title}</label>
        <input
            id={question.name}
            type={question.type}
            className="form-control form-input"
            {...SetDinamicAttributes({ question })}
        ></input>
        {/* <div className="form-text fw-bold">Sample description</div> */}
    </div>
);

const CreateInputSelect = (question: inputSelectInterface) => (
    <div key={question.name} className="mb-3">
        <label className="form-label fw-bold">{question.title}</label>
        <select
            id={question.name}
            className="form-select form-input"
            {...SetDinamicAttributes({ question })}
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

const CreateInputTable = (question: inputTableInterface) => (
    <div
        key={question.name}
        className="my-5 py-4 border-top border-bottom border-3 border-secondary"
    >
        <label className="form-label fw-bold">{question.title}</label>
        <div className="container">
            <div className="row">
                {question.rows.map((row) => {
                    return (
                        <div className="col-md-6 col-sm-12 my-2 ">
                            {InputSelecction({ question: row })}
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

const CreateInputList = (question: inputListInterface) => (
    <div
        key={question.name}
        className="my-5 py-4 border-top border-bottom border-3 border-secondary"
    >
        <label className="form-label fw-bold">{question.title}</label>
        <div className="container">
            <div className="row py-3">
                {question.rows.map((row) => {
                    const { max } = row;
                    return (
                        <div key={row.name} className="mb-3">
                            <label className="form-label fw-bold">
                                {row.title}
                            </label>
                            <input
                                id={row.name}
                                type={row.type}
                                className="form-control form-input"
                                {...SetDinamicAttributes({ question })}
                            ></input>
                            {/* <div className="form-text fw-bold">Sample description</div> */}
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

const CreateInputEmail = (question: inputEmailInterface) => (
    <div key={question.name} className="mb-3">
        <label className="form-label fw-bold">{question.title}</label>
        <input
            id={question.name}
            type={question.type}
            className="form-control form-input"
            {...SetDinamicAttributes({ question })}
        ></input>
        {/* <div className="form-text fw-bold">Sample description</div> */}
    </div>
);

const CreateInputCheckbox = (question: inputCheckInterface) => (
    <div key={question.name} className="my-4 form-check">
        <label className="form-check-label fw-bold">{question.title}</label>

        {question.options.map((option) => (
            <>
                <input
                    id={option}
                    type="checkbox"
                    className="form-check-input"
                ></input>
            </>
        ))}
    </div>
);

const template = () => {
    return (
        <>
            <h2 className="my-5">Section</h2>

            <div className="form-card text-start p-5 container">
                {/* Form */}
                <form>
                    {/* Text */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Text input</label>
                        <input
                            id=""
                            name=""
                            type="text"
                            className="form-control form-input"
                        ></input>
                        <div className="form-text fw-bold">
                            Sample description
                        </div>
                    </div>

                    {/* Number */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">
                            Number input
                        </label>
                        <input
                            id=""
                            name=""
                            type="number"
                            min={1}
                            max={10}
                            className="form-control form-input"
                        ></input>
                        <div className="form-text fw-bold">
                            Sample description
                        </div>
                    </div>

                    {/* Select */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">
                            Select input
                        </label>
                        <select
                            id=""
                            name=""
                            className="form-select form-input"
                        >
                            <option hidden defaultValue={''}>
                                Selecciona una opción
                            </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    {/* Table */}
                    <div className="my-5">
                        <label className="form-label fw-bold">Table</label>
                        <div className="row p-3 my-3 border-bottom border-3 border-secondary">
                            <label className="align-self-center fw-bold col-9">
                                Text
                            </label>
                            <select
                                id=""
                                name=""
                                className="form-select form-input col"
                            >
                                <option hidden defaultValue={''}>
                                    Selecciona una opción
                                </option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>

                    {/* List */}
                    <div className="my-5">
                        <label className="form-label fw-bold">List</label>
                        <div className="row p-3 my-3">
                            <label className="align-self-center fw-bold col-10">
                                Text
                            </label>
                            <select
                                id=""
                                name=""
                                className="form-select form-input col"
                            >
                                <option hidden defaultValue={''}></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div className="row p-3 my-3">
                            <label className="align-self-center fw-bold col-10">
                                Text
                            </label>
                            <select
                                id=""
                                name=""
                                className="form-select form-input col"
                            >
                                <option hidden defaultValue={''}></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div className="row p-3 my-3 border-bottom border-3 border-secondary">
                            <label className="align-self-center fw-bold col-10">
                                Text
                            </label>
                            <select
                                id=""
                                name=""
                                className="form-select form-input col"
                            >
                                <option hidden defaultValue={''}></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input
                            id=""
                            name=""
                            type="email"
                            className="form-control form-input"
                        ></input>
                        <div className="form-text fw-bold">
                            Ingresa el correo
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Password</label>
                        <input
                            id=""
                            name=""
                            type="password"
                            min={10}
                            className="form-control form-input"
                        ></input>
                        <div className="form-text fw-bold">
                            La contraseña tiene que tener al menos x caracteres
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                        ></input>
                        <label className="form-check-label fw-bold">
                            Check box
                        </label>
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary fw-bold">
                        Enviar formulario
                    </button>
                </form>
            </div>
        </>
    );
};
