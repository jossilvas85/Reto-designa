import './App.css';
import { TutorFormData } from './assets/data/TutorFormData';
import Formulario from './components/formulario';
import Header from './components/header';
import { useFetch } from './hooks/useFetch';
import { sectionInterface } from './interfaces/formularioInterfaces';

const App = () => {
    // Creo una función que retorna una promesa, esto para mostrar una pantalla de carga mientras se resuelve la promesa
    const fetchFunction = async () => {
        return await TutorFormData();
    };

    //Paso la función que retorna la promesa que se estará resolviendo
    const {
        data,
        loading,
        // loading = true,
        error,
    } = useFetch<sectionInterface[]>({
        fetchFunction,
    });

    // Muestro una pantalla de error si existe
    if (error) {
        return (
            <div className="container-fluid">
                <Header />
                <div className="row mt-5 pt-5">
                    <h1>ERROR EN EL CARGADO DE DATOS!!!!!!</h1>
                </div>
            </div>
        );
    }

    // Muestro el loading mientras los datos cargan
    if (loading) {
        return (
            <div className="container-fluid">
                <Header />
                <div className="row mt-5 pt-5">
                    <h1>Cargando datos, por favor, sea paciente</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <Header />
            <div className="row mt-5">
                <Formulario data={data} />
            </div>
        </div>
    );
};

export default App;
