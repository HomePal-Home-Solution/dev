import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

function Header() {
    return (
        <>
            <header className="d-flex align-items-center">
                <div className="container-fluid w-100">
                    <div className="row d-flex align-items-center w-100">
                        <div className="col-sm-2 part1">
                            <Link to={'/dashboard'} className="d-flex align-items-center logo">
                                <img src={logo} />
                                <span className="span1">Home</span>
                                <span className="span2">Pal</span>
                            </Link>
                        </div>

                        <div className="col-sm-2 d-flex align-items-center part2 pl-10">
                            Welcome User
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}


export default Header