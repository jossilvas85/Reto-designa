import logo from '../assets/images/logo.png'

const Header = () => {
    return (
        <nav className="fixed-top navbar navbar-container px-2">
            <div className="d-flex navbar-brand py-3">
                <img
                    src={logo}
                    width="30"
                    height="30"
                    className="logo mx-2"
                    alt=""
                ></img>
               <p className="fw-bold mx-2 my-0">Formulario para preparatorias</p> 
            </div>
        </nav>
    );
};

export default Header;
