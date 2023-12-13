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

export interface inputInterface {
    type: string;
    name: string;
    title: string;
    required?: boolean;
    extra?: string;
    hideField?: 'México';
    condition?: 'country';
}

export interface inputTextInerface extends inputInterface {
    filter?: boolean;
}

export interface inputNumberInerface extends inputInterface {
    max: number;
    min: number;
    step: number;
}

export interface inputSelectInterface extends inputInterface {
    options: string[];
}

export interface inputTableInterface extends sectionInterface {
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

export interface inputListInterface extends sectionInterface {
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

export interface inputEmailInerface extends inputInterface {
    equalTo: 'email';
}

export interface inputCheckInterface extends inputInterface {
    replace?: boolean;
    options: string[];
}

export interface inputPasswordInterface extends inputInterface {
    min: number;
}
