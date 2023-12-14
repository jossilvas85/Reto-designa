// El formulario se estructura en: sections
// import { useState } from 'react';
import Subform from './subform';
import { formsInterface } from '../interfaces/formularioInterfaces';

const Formulario = ({ forms }: { forms: formsInterface[] }) => {
    // const [arrNew, setArrNew] = useState();
    // const [arrRenew, setArrRenew] = useState();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    // Función para manejar el envío del formulario
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formFields = event.currentTarget
            .elements as HTMLFormControlsCollection;

        if (!formFields) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formData: any = [];

        for (let i = 0; i < formFields.length - 1; i++) {
            const field = formFields[i] as HTMLInputElement;

            const fieldName = field.id;

            if (fieldName) {
                const formTargets = field.dataset.target?.split(',') || [];

                formTargets.forEach((target: string) => {
                    // Inicializar el objeto del target si aún no existe
                    if (!formData[target]) {
                        formData[target] = {};
                    }

                    // Asignar el valor al target específico
                    formData[target][fieldName] = field.value;
                });
            }
        }

        console.log(formData);
    };

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
