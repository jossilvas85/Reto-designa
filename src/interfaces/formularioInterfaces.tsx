export interface formsInterface {
    section: string;
    validate: number;
    target: string[];
    questions: JSX.Element[];
}

// Tipo para las secciones
export interface sectionInterface {
    section: string;
    validate: number;
    target: string[];
    questions: Array<
        | inputTextInterface
        | inputNumberInterface
        | inputSelectInterface
        | inputTableInterface
        | inputListInterface
        | inputEmailInterface
        | inputCheckboxInterface
        | inputPasswordInterface
    >;
}

// export interface questionInterface {
//     inputText?: inputTextInterface;
//     inputNumber?: inputNumberInterface;
//     inputSelect?: inputSelectInterface;
//     inputTable?: inputTableInterface;
//     inputList?: inputListInterface;
//     inputEmail?: inputEmailInterface;
//     inputCheck?: inputCheckboxInterface;
//     inputPassword?: inputPasswordInterface;
// }
// Tipo padre para derivar los inputs
export interface inputInterface {
    type: string;
    name?: string;
    title: string;
    required?: boolean;
    extra?: string;
    hideField?: 'country';
    condition?: 'México';
}

// Inputs distintos de ingreso de datos

// Texto
export interface inputTextInterface extends inputInterface {
    filter?: boolean;
}

// Numero
export interface inputNumberInterface extends inputInterface {
    max: number;
    min: number;
    step: number;
}

// Select
export interface inputSelectInterface extends inputInterface {
    sectionTitle?: string;
    options: string[];
}

// Talba
export interface inputTableInterface extends inputInterface {
    rows: Array<
        | inputTextInterface
        | inputNumberInterface
        | inputSelectInterface
        | inputTableInterface
        | inputListInterface
        | inputEmailInterface
        | inputCheckboxInterface
        | inputPasswordInterface
    >;
}

// Lista
export interface inputListInterface extends inputInterface {
    max: number;
    rows: Array<
        | inputTextInterface
        | inputNumberInterface
        | inputSelectInterface
        | inputTableInterface
        | inputListInterface
        | inputEmailInterface
        | inputCheckboxInterface
        | inputPasswordInterface
    >;
}

// Email
export interface inputEmailInterface extends inputInterface {
    equalTo: 'email';
}

// CheckBox
export interface inputCheckboxInterface extends inputInterface {
    replace?: boolean;
    options: string[];
}

// Password
export interface inputPasswordInterface extends inputInterface {
    min: number;
}
