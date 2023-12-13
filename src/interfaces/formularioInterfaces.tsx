// Tipo para las secciones
export interface sectionInterface {
    section: string;
    validate: number;
    target: string[];
    questions: Array<
        | inputTextInerface
        | inputNumberInerface
        | inputSelectInterface
        | inputTableInterface
        | inputListInterface
        | inputEmailInerface
        | inputCheckInterface
        | inputPasswordInterface
    >;
}

// export interface questionInterface {
//     inputText?: inputTextInerface;
//     inputNumber?: inputNumberInerface;
//     inputSelect?: inputSelectInterface;
//     inputTable?: inputTableInterface;
//     inputList?: inputListInterface;
//     inputEmail?: inputEmailInerface;
//     inputCheck?: inputCheckInterface;
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
export interface inputTextInerface extends inputInterface {
    filter?: boolean;
}

// Numero
export interface inputNumberInerface extends inputInterface {
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
    max?: number;
    rows: Array<
        | inputTextInerface
        | inputNumberInerface
        | inputSelectInterface
        | inputTableInterface
        | inputListInterface
        | inputEmailInerface
        | inputCheckInterface
        | inputPasswordInterface
    >;
}

// Lista
export interface inputListInterface extends inputInterface {
    max: number;
    rows: Array<
        | inputTextInerface
        | inputNumberInerface
        | inputSelectInterface
        | inputTableInterface
        | inputListInterface
        | inputEmailInerface
        | inputCheckInterface
        | inputPasswordInterface
    >;
}

// Email
export interface inputEmailInerface extends inputInterface {
    equalTo: 'email';
}

// CheckBox
export interface inputCheckInterface extends inputInterface {
    replace?: boolean;
    options: string[];
}

// Password
export interface inputPasswordInterface extends inputInterface {
    min: number;
}
