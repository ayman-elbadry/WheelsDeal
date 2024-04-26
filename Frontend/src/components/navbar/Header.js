import React, { useEffect } from "react";
import logo from '../../images/logo-removebg-preview (2).png';
import '../../css/header.css';
import icon from "../../images/arrow-down-sign-to-navigate.png";
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from "../../context/ContextProvider";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { HStack, Button } from "@chakra-ui/react";
import axiosClient from "../../context/axiosClient";

export default function Header() {
    const { token, setToken, setUser ,adminToken} = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            axiosClient.get('/user')
            .then(({data}) => {
                setUser(data);
            });
        }
    }, [token, setUser]);

    const logout = async(e) => {
        e.preventDefault();
        await axiosClient.post('http://127.0.0.1:8000/api/logout');
        setToken(null);
        setUser({});
        navigate('/');
    };

    const enter = () => {
        let select = document.getElementById("select_icon");
        select.style.visibility = 'visible';
    };

    const leave = () => {
        let select = document.getElementById("select_icon");
        select.style.visibility = 'hidden';
    };

    return (
        <div id='header' onMouseLeave={leave}>
            <div id='Gheader'>
                <div className="logo">
                    <img id='logo' src={logo} alt="" />
                </div>
                <nav>
                    <ul>
                        <li><Link to='/' style={{color:'white'}}>Accueil</Link></li>
                        <li><Link to='/cars'>Voitures</Link></li>
                        <li>
                            <Link to='/Location'>Réservation</Link>
                            <img alt='' onMouseEnter={enter} className='select_visible' src={icon} width={15} height={13} style={{marginLeft:"10px"}}/>
                        </li>
                        <li><Link to='/ContactUs'>Contacter-nous</Link></li>
                    </ul>
                </nav>
                <div className="login-buttons d-flex align-items-center">
                    {token || adminToken ?
                        <HStack position={"absolute"} right={0} top={3}>
                            <Button
                                color={"gray.600"}
                                colorScheme={"blackAlpha"}
                                variant="ghost"
                                leftIcon={<MdAccountCircle color="gray" />}
                                onClick={() => navigate("/profile")}
                            >
                                Profile
                            </Button>
                            <Button
                                color={"gray.600"}
                                colorScheme={"blackAlpha"}
                                variant="ghost"
                                leftIcon={<MdLogout color="gray" />}
                                onClick={(e) => logout(e)}
                            >
                                Logout
                            </Button>
                        </HStack>
                        :
                        <>
                            <button
                                type="button"
                                className="btn-outline-secondary px-3 me-2"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={() => navigate("/signup")}
                            >
                                Sign up for free
                            </button>
                        </>
                    }
                </div>
            </div>
            <div id='select_icon' className='select_visible'>
                <Link to="/location"><div >Location</div></Link>
                <Link to='/vente'><div >Vente</div></Link>
            </div>
        </div>
    );
}
