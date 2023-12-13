// El formulario se estructura en: sections

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

const Formulario = () => {
    return (
        <>
            <h1 className="my-5">Section</h1>

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

export default Formulario;
