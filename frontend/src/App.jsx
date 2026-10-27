import { useState, useEffect } from 'react'
import {Routes, Route, Navigate} from "react-router-dom";
import "./App.css"
import SignIn from "./pages/SignIn/signin.jsx"
import SignUp from "./pages/SignUp/signup.jsx"
import About from "./pages/about/about.jsx"
import Task from "./pages/Task/task.jsx"
import NavBar from "./components/Navbar/Nav.jsx"
import Footer from "./components/Footer/footer.jsx"
import ProtectRoutes from "./routes/ProtectedRoutes.jsx"
import NotFoundPage from "./pages/NotFound/notfound.jsx"




export default function App() {
    const [user, setUser] = useState(()=>{
            const savedUser = localStorage.getItem('app_user');
            return savedUser?JSON.parse(savedUser):{"data":"","login":false,"count":0};
            })
    useEffect(() => {
        localStorage.setItem('app_user', JSON.stringify(user));
    }, [user]);
    return (
            <div className="app-container">
                <NavBar user={user} setUser={setUser}/>
                <Routes>

                    <Route element={<ProtectRoutes user={user}/>}>
                        <Route path="/user/:id" element={
                            <>
                                <Task user={user} setUser={setUser}/>
                            </>
                        } 
                        />
                    </Route>

                    <Route path="/" element={
                        <>
                            <Task user={user} setUser={setUser}/>
                        </>
                    }
                    />

                    <Route path="/signup" element={
                        <>
                        <SignUp user={user} setUser={setUser}/>
                        </>
                    }
                    />

                    <Route path="/signin" element={
                        <>
                        <SignIn setUser={setUser} />
                        </>
                    }
                    />
                    <Route path="/about" element={
                        <>
                        <About/>
                        </>
                    }
                    />
                    <Route path="*" element={
                        user?.login && user?.data?.['user-details']?.id ? <Navigate to={`/user/${user.data['user-details'].id}`} replace/> : <Navigate to="/"/>
                    }
                    />

                </Routes>
            <Footer />

            </div>
    );
};