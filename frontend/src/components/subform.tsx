import { formsInterface } from "../interfaces/formularioInterfaces";

const Subform = ({ form }: { form: formsInterface }) => {
    return (
        <div key={`${form.section}_${form.target}`}>
            <h2 className="my-5">{form.section}</h2>
            <div className="form-card text-start p-md-5 py-2 container ">
                <div>
                    {form.questions.map((question, index) => (
                        <div key={`${form.target}_${index}`}>{question}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Subform;
