import './App.css';
import Formulario from './components/formulario';
import Header from './components/header';

function App() {
    return (
        <div className="container-fluid">
            <Header />
            <div className="row mt-5">
                <Formulario />
            </div>
        </div>
    );
}

export default App;
