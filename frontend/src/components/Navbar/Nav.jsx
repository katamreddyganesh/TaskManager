import './Navbar.css';



export default function NavBar({user, setUser}){


    const isLoggedIn = user['login'];
    const handleLogOut =() =>setUser(prev=>({...prev,["login"]:false}));
    console.log(user,"user details")
    return (
        <div className="header">

            <div className="header-title">
                <h2>TaskManager</h2>
            </div>

            <div className="header-ul">
                <label htmlFor='check' className="bread">
                    <i className="fa-solid fa-bars"></i>
                </label>
                <input  type="checkbox" id="check"/>
                <ul className="list">
                    <li>
                        <a className="nav-a" href="/">Home</a>
                    </li>
                    { !isLoggedIn ? (
                        <>
                            <li>
                                <a className="nav-a" href="/signup">Sign up</a>
                            </li>
                            <li>
                                <a className="nav-a" href="/signin">Sign in</a>
                            </li>
                            <li>
                                <a className="nav-a" href="/about">about</a>
                            </li>
                        </>
                        ):(
                        <>
                            <li>
                                <a className="nav-a" href="/about" >about</a>
                            </li>
                            <li>
                                <a className="nav-a" href="/signin" onClick={handleLogOut}>Sign out</a>
                            </li>
                            <li class="profile">
                                    {/* <span> */}
                                        <a className="nav-a" href="">
                                            {
                                                user['data']?(
                                                    <p>{user['data']["user_details"].first_name}</p>
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