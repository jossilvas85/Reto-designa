const Formulario = () => {
    return (
        <>
            <h1 className="my-5">Formulario</h1>
            <div className="form-card text-start p-5">
                {/* Form */}
                <form>
                    {/* Text */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Text input</label>
                        <input
                            type="text"
                            className="form-control form-input"
                            id=""
                        ></input>
                        <div className="form-text fw-bold">
                            Sample description
                        </div>
                    </div>

                    {/* Number */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Number input</label>
                        <input
                            type="number"
                            className="form-control form-input"
                            id=""
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
                        <select className="form-select form-input">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
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
