import "../styling/Login.css";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app, auth } from '../firbase-config'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                alert("Successfully created an account")
                routeChange()
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                //const errorMessage = error.message;
                alert(errorCode)
                // ..
            });
    }

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                alert("Successfully signed in")
                routeChange()
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                //const errorMessage = error.message;
                alert(errorCode)
            });
    }

    return (
        <div className="loginCreateAccount">
            <div classsName='login'>
                <div>
                    <h1>Please enter login information below</h1>
                </div>
                <div>
                    <TextField type={"email"} label="please enter your email" style={{width:275}} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <TextField type={"password"} label="please enter your password" style={{width:275}} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button variant="contained" onClick={signUp}>Create Account</button>
                </div>
                <div>
                    <button variant="contained" onClick={signIn}>Sign in</button>
                </div>
            </div>
        </div>
    );
}

export default Login;