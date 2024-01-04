import { useState, useEffect } from 'react';
import './App.css';
import { TutorFormData } from './assets/data/TutorFormData';
import Formulario from './components/formulario';
import Header from './components/header';
import { useFetch } from './hooks/useFetch';
import {
    formsInterface,
    sectionInterface,
} from './interfaces/formularioInterfaces';
import { InputsPerSection } from './components/Input.Components/customInputs';

const App = () => {
    // Creo una función que retorna una promesa, esto para mostrar una pantalla de carga mientras se resuelve la promesa
    const fetchFunction = async () => {
        return await TutorFormData();
    };

    //Paso la función que retorna la promesa que se estará resolviendo
    const { data, loading, error } = useFetch<sectionInterface[]>({
        fetchFunction,
    });

    const [forms, setForms] = useState<formsInterface[]>();
    // const [country, setCountry] = useState('');

    // const EventHandlerCountry = (
    //     event: React.ChangeEvent<HTMLSelectElement>
    // ) => {
    //     const value = event.target.value;
    //     setCountry(value);
    // };

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

    return (
        <div className="container-fluid">
            <Header />
            <div className="row mt-5">
                {loading ? (
                    <h1>Cargando datos, por favor, sea paciente</h1>
                ) : error ? (
                    <h1>ERROR EN EL CARGADO DE DATOS!!!!!!</h1>
                ) : forms !== undefined ? (
                    <Formulario forms={forms} />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
export default App;
