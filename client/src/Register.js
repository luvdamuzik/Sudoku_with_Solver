import React, {useState} from "react"
import './login.css'
import {useNavigate} from "react-router-dom";

export default function (props) {

    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    var onSubmitForm = async(e)=> {
        e.preventDefault()
        try{
            const body = {name,email,password}
            navigate("/login")
            const reponse = await fetch("http://localhost:5000/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });

        }catch (err){
            console.log(err)
        }
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <a href="/login">Sign In</a>
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="char"
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary" onClick={onSubmitForm}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}