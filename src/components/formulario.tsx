// El formulario se estructura en: sections
import { useState } from 'react';
import Subform from './subform';
import { formsInterface } from '../interfaces/formularioInterfaces';

const Formulario = ({ forms }: { forms: formsInterface[] }) => {
//   const [generalFormData, setGeneralFormData] = useState({});

  // Función para manejar el envío del formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formFields = event.currentTarget
      .elements as HTMLFormControlsCollection;

    if (!formFields) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formData: any = {};

    for (let i = 0; i < formFields.length - 1; i++) {
      const field = formFields[i] as HTMLInputElement;

      const fieldName = field.id;

      if (fieldName) {
        formData[fieldName] = field.value;
      }
    }
    console.log(formData);
    // setGeneralFormData(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {forms?.map((form) => (
        <Subform key={form.section} form={form} />
      ))}
      <div className='text-end m-5'>
        <button
          type='submit'
          className='btn btn-primary fw-bold'
          data-testid='submit-button'
        >
          Enviar formulario
        </button>
      </div>
    </form>
  );
};

export default Formulario;
