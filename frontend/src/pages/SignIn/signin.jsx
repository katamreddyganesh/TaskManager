import {useState} from "react";
import {useNavigate} from "react-router-dom";
import  './SignIn.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


export default function SignIn({user, setUser}) {
    const [formdata, setFormData] = useState(
        {
            email:"",
            password:""
        }
    );
    const [data, setData] =  useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();

    const handleData = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormData(prev=>({...prev,[name]:value}));
    };

    const handleSubmitData = e => {
        e.preventDefault()
        console.log(formdata,"formdata");
        const form2 = new URLSearchParams();
        form2.append("username",formdata.email)
        form2.append("password", formdata.password)
        
        fetch(`${API_BASE_URL}/Login/`,
            {
            "method":"POST",
            "headers":{"Content-Type":"application/x-www-form-urlencoded"},
            "body":form2
        }
        )
        .then(response=>{
            if(!response.ok){
                console.log("hello i am new error")
                throw new Error(`this is new error ${response.msg||response.message||"unknown error"}`)
            }
            return response.json()
        })
        .then(response=>{
            const data = {
                "data":response,
                "login":true
            }
            setUser(data)
            setData(response["user_details"])
            // console.log(response.id,"user data")
            navigate(`/user/${response["user_details"].id}`);
        })
        .catch(error=>console.error(error))
    };

    return (
        <>
            <div className="signIn-Container">
                <div className="signIn-SubContainer">
                    {/* <div className="signIn-header">
                        <h1>Sign<span style={{"color":"red"}}>I</span>n Page</h1>
                    </div> */}
                    <div className="signIn-body">
                    <div className="signIn-header">
                        <h1>Sign<span style={{"color":"red"}}>I</span>n Page</h1>
                    </div>
                        <form className="form-tag" action="/" onSubmit={handleSubmitData}>
                            <div className="input-email">
                                <input className="input-email1" name="email" onChange={handleData} placeholder="email"/>
                            </div>
                            <div className="input-password">
                                <input className="input-password1" type="password" name="password" onChange={handleData} placeholder="password"/>
                            </div>
                            <div className="container-button">
                                <button class="submit-button" type="submit">submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};


































// import {useState} from "react";





// export default function Login() {
//     const [formData, setFormData] = useState({
//         "email": "",
//         "password": ""
//     });
//     const [data, setData] = useState(null);

//     const handleData = (e) =>{
//         e.preventDefault();
//         const {name, value} = e.target;
//         setFormData(prev => (
//             {...prev, [name]:value }));
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault(); //   THIS stops the page reload!
//         console.log("Form successfully submitted with data:", formData);
//         setData(formData);
//         // You can add logic here to send data to a backend server later
//     };
//     return (
//         <>
//             <h1>This is sign<span style={{'color':'red'}}>I</span>n page</h1><br/>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>email:</label>
//                     <input name="email" onChange={handleData} />
//                 </div>
//                 <div>
//                     <label>password:</label>
//                     <input name="password" onChange={handleData} />
//                 </div>
//                 <div>
//                     <button type="submit">submit</button>
//                 </div>
//             </form>
//             {data&&(
//             <h2>
//                 <p>{data.email}</p>
//                 <p>{data.password}</p>
//             </h2>)}
//         </>
//     );
// };