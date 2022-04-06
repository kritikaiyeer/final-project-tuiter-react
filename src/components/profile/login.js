/**
    Component of showing login page to the user so that it can log in
*/
import React from "react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as service from "../../services/auth-service";
import {GoogleLogin,GoogleLogout} from "react-google-login";

export const Login = () => {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate()
    var clientId="959350101705-iulfiifgd5jt2n09cuuu9vj3a9lnqb0v.apps.googleusercontent.com"
    if (process.env.REACT_APP_ENVIRONMENT=="PRODUCTION") {
        clientId="959350101705-2b65fq1nv6o2211ipkt87cb7a5askm82.apps.googleusercontent.com"
}

    const googleLogin = (user1) =>
        service.googleLogin(user1)
            .then(() => navigate('/home'))
            .catch(e => alert(e));

    const responseGoogle = (response) => {
        const user = {
            userName: response.profileObj.givenName,
            password: response.profileObj.googleId,
            email : response.profileObj.email,
            profilePhoto: response.profileObj.imageUrl
        }
        console.log('Logged In',user);
        const t= googleLogin(user).then(response => response);
        console.log(t)
    }
    const login = () =>
        service.login(loginUser)
            .then((user) => navigate('/profile/mytuits'))
            .catch(e => alert(e));
    return (
        <div>
            <h1>Login</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setLoginUser({...loginUser, userName: e.target.value})}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setLoginUser({...loginUser, password: e.target.value})}
                   placeholder="password" type="password"/>
            <button onClick={login}
                    className="btn btn-primary mb-5">Login
            </button>
            <div>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                /></div>
        </div>

    );
};