import {useState, useEffect, useRef} from "react";

import './Navbar.css';



export default function NavBar({user, setUser}){
    const [isOpen, setIsOpen] = useState(false);
    const navWrapper = useRef(null);

    const isLoggedIn = user['login'];
    const handleLogOut =() =>setUser(prev=>({...prev,["login"]:false}));
    console.log(user,"user details")
    

    useEffect(()=>{
        function handleClickOutSide(event){
            if (isOpen && navWrapper.current && !navWrapper.current.contains(event.target)){
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown",handleClickOutSide)

        return ()=>{
            document.removeEventListener("mousedown", handleClickOutSide)
        }

    },[isOpen])


    

    return (
        <div className="header">

            <div className="header-title">
                <h2>TaskManager</h2>
            </div>

            <div className="header-ul" ref={navWrapper}>
                <label htmlFor='check' className="bread">
                    <i className="fa-solid fa-bars"></i>
                </label>
                <input  type="checkbox" id="check" checked={isOpen} onChange={(e)=>setIsOpen(!isOpen)}/>
                <ul className="list">
                    <li>
                        <a className="nav-a" href="/">Home</a>
                    </li>
                    { !isLoggedIn ? (
                        <>
                            <li>
                                <a className="nav-a" href="/signup">SignUp</a>
                            </li>
                            <li>
                                <a className="nav-a" href="/signin">SignIn</a>
                            </li>
                            <li>
                                <a className="nav-a" href="/about">About</a>
                            </li>
                        </>
                        ):(
                        <>
                            <li>
                                <a className="nav-a" href="/about" >About</a>
                            </li>
                            <li>
                                <a className="nav-a" href="/signin" onClick={handleLogOut}>SignOut</a>
                            </li>
                            <li class="profile">
                                    {/* <span> */}
                                        <a className="nav-a" href="">
                                            {
                                                user['data']?(
                                                    <p>{user['data']["user_details"].first_name.charAt(0).toUpperCase()+user['data']["user_details"].first_name.slice(1)}</p>
                                                ):("not present")
                                            }
                                        </a>
                                        <i class="fa-slab-press fa-regular fa-circle-user"></i>
                                    {/* </span> */}
                            </li>    
                        </>
                        )
                    }
                </ul>
            </div>

</div>

    );
};