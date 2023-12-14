import {
    inputTextInterface,
    inputNumberInterface,
    inputSelectInterface,
    inputTableInterface,
    inputListInterface,
    inputEmailInterface,
    inputCheckboxInterface,
    inputPasswordInterface,
    sectionInterface,
} from '../../interfaces/formularioInterfaces';
import InputList from './InputList';
import InputText from './InputText';
import InputNumber from './InputNumber';
import InputSelect from './InputSelect';
import InputTable from './InputTable';
import InputEmail from './InputEmail';
import InputCheckbox from './InputCheckbox';

// Funcion para asignar atributos dinamicos a los inputs
export const DinamicAttributes = ({
    question,
}: {
    question:
        | inputTextInterface
        | inputNumberInterface
        | inputSelectInterface
        | inputTableInterface
        | inputListInterface
        | inputEmailInterface
        | inputCheckboxInterface
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
export const InputsPerSection = ({
    sectionObj,
}: {
    sectionObj: sectionInterface;
}) =>
    sectionObj.questions.map((question) =>
        // Se crea el INPUT adecuado dependiendo al TYPE
        InputSelecction({ question, target: sectionObj.target })
    );

// Funcion que crea el input adecuado dependiendo del TYPE
export const InputSelecction = ({
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
        | inputCheckboxInterface
        | inputPasswordInterface;
    target: string[];
}) => {
    const type = question.type;
    switch (type) {
        case 'text':
            return (
                <InputText
                    question={question as inputTextInterface}
                    target={target}
                />
            );
        case 'number':
            return (
                <InputNumber
                    question={question as inputNumberInterface}
                    target={target}
                />
            );
        case 'select':
            return (
                <InputSelect
                    question={question as inputSelectInterface}
                    target={target}
                />
            );
        case 'table':
            return (
                <InputTable
                    question={question as inputTableInterface}
                    target={target}
                />
            );
        case 'list':
            return (
                <InputList
                    question={question as inputListInterface}
                    target={target}
                />
            );
        case 'email':
            return (
                <InputEmail
                    question={question as inputEmailInterface}
                    target={target}
                />
            );
        case 'checkbox':
            return (
                <InputCheckbox
                    question={question as inputCheckboxInterface}
                    target={target}
                />
            );
    }
};
