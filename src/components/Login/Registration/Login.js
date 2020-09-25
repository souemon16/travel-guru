import React, { useContext, useState } from 'react';
import './Login.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import iconGoogle from '../../../Image/Icons/google.png';
import iconFb from '../../../Image/Icons/fb.png';
import { Alert } from 'react-bootstrap';
import { userContext } from '../../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [getUser, setUserInfo] = useContext(userContext);
    // Redirect Page 
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    // User Information 
    const [newUser, setNewUser] = useState(false);
    const [oldUser, setOldUser] = useState(true);

    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        userName: '',
        userEmail: '',
        userImage: '',
        userPassword: '',
        error: '',
        success: false,
        passwordReset: false
    });


    // Google Sign In
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(function (result) {
                const { displayName, photoUrl, email } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    userName: displayName,
                    userEmail: email,
                    userImage: photoUrl
                };
                setUser(signedInUser);
                setUserInfo(signedInUser);
                user.success = true;
                history.replace(from);
                const token = result.credential.accessToken;
                const user = result.user;
            }).catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
                user.error = errorMessage;
            });
    }
    const handleGoogleSignOut = () => {
        firebase.auth().signOut()
            .then(function () {
                const signedOutUser = {
                    isSignedIn: false,
                    userName: '',
                    userEmail: '',
                    userPassword: '',
                    userImage: '',
                };
                setUser(signedOutUser);
            }).catch(function (error) {
            });
    }

    // Facebook Sign In 
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then(function (result) {
                const token = result.credential.accessToken;
                const user = result.user;
                console.log(user);
                history.replace(from);
                user.success = true;
            }).catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
                user.error = errorMessage;
            });
    }

    // Form Submit 
    const handleForm = (event) => {
        const isFieldValid = true;
        if (event.target.name === "userEmail") {
            const eValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isFieldValid = eValidation.test(event.target.value);
        }
        if (event.target.name === "userPassword") {
            const passLengthValid = event.target.value.length > 6;
            const isPassValid = /\d{1}/.test(event.target.value);
            const isFieldValid = passLengthValid && isPassValid;
        } else {
            user.error = 'password must contain 6 letter and 1 number';
        }
        if (isFieldValid) {
            const newUser = { ...user };
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
            setUserInfo(newUser);
        }
    }
    // Create New User 
    const handleSubmit = (e) => {
        if (newUser && user.userEmail && user.userPassword) {
            firebase.auth().createUserWithEmailAndPassword(user.userEmail, user.userPassword)
                .then(res => {
                    const userInfo = { ...user };
                    userInfo.error = '';
                    setUser(userInfo);
                    setUserInfo(userInfo);
                    history.replace(from);
                    user.success = true;
                })
                .catch(function (error) {
                    const userInfo = { ...user };
                    userInfo.error = error.message;
                    setUser(userInfo);
                    setUserInfo(userInfo);
                });
        }
        e.preventDefault();
    }
    // Login User 
    const handleLogin = () => {
        if (oldUser && user.userEmail && user.userPassword) {
            firebase.auth().signInWithEmailAndPassword(user.userEmail, user.userPassword)
                .then(res => {
                    user.success = true;
                })
                .catch(function (error) {
                    const errorMessage = error.message;
                    user.error = errorMessage;
                });
        }
    }
    // PassWord Reset 
    const passwordReset = () => {
        if (oldUser && user.userEmail) {
            const auth = firebase.auth();
            auth.sendPasswordResetEmail(user.userEmail)
            .then(function () {
                user.passwordReset = true;
            }).catch(function (error) {
                user.error = error;
            });
        }
    }
    return (
        <div className='row registration-section'>
            <div className='col-md-5'>
                {oldUser && <form onSubmit={handleLogin} className="signInForm">
                    <h2>Sign In</h2>
                    <input className='form-control' onBlur={handleForm} type="email" name="userEmail" placeholder="Username or Email" required />
                    <br />
                    <input className='form-control' onBlur={handleForm} type="password" name="userPassword" id="password" placeholder="Password" required />
                    <br />
                    <div className="signInThings">
                        <input type="checkbox" name="rememberMe" id="remember" />Remember  Me
                        <a className='text-warning' onClick={passwordReset} style={{ float: 'right', textDecoration: 'underline' }} href="">FORGET PASSWORD</a>
                    </div>
                    <br />
                    <input
                        type='submit'
                        className='btn btn-warning btn-block font-weight-bold'
                        value="Login" />
                    <p className='text-center'>New User? <span className='text-info' style={{ cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => {
                            setOldUser(!oldUser)
                            setNewUser(!newUser)
                        }}>
                        Create a Account
                            </span></p>
                            {user.error && <Alert className="mt-3" variant='danger'>{user.error}</Alert>}
                    {user.success && <Alert className="mt-3" variant='success'>Accounted Created Successfully</Alert>}
                    {user.passwordReset && <Alert className="mt-3" variant='success'>Password Reset Link Sent Successfully</Alert> }
                </form>}

                {newUser && <form className='signUpForm' onSubmit={handleSubmit}>
                    <h2>Create New Account</h2>
                    <input className='form-control' onBlur={handleForm} type="text" name="userName" placeholder="First Name" required />
                    <br />
                    <input className='form-control' onBlur={handleForm} type="text" name="lastName" placeholder="Last Name" required />
                    <br />
                    <input className='form-control' onBlur={handleForm} type="email" name="userEmail" placeholder="Username or Email" required />
                    <br />
                    <input className='form-control' onBlur={handleForm} type="password" name="userPassword" id="password" placeholder="Password" required />
                    <br />
                    <input className='form-control' onBlur={handleForm} type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" required />
                    <br />
                    <input
                        type='submit'
                        className='btn btn-warning btn-block font-weight-bold mt-3'
                        value='Create a account' />
                    <p className='text-center'>Already have a account?<span className='text-info' style={{ cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => {
                            setNewUser(!newUser)
                            setOldUser(!oldUser)
                        }}>
                        Log In
                            </span></p>
                    {user.error && <Alert className="mt-3" variant='danger'>{user.error}</Alert>}
                    {user.success && <Alert className="mt-3" variant='success'>Accounted Created Successfully</Alert>}
                    {user.passwordReset && <Alert className="mt-3" variant='success'>Password Reset Link Sent Successfully</Alert> }
                </form>}
            </div>

            {user.error ? <div style={{ marginTop: '70px' }} className='col-md-5'>
                <hr className="hr-text" data-content="or"></hr>
                <button
                    className='btn btn-block btn-outline-secondary font-weight-bold mb-2'
                    style={{ borderRadius: '25px' }} onClick={handleGoogleSignIn}>
                    <img className='icon' style={{ float: 'left' }} src={iconGoogle} alt="Google" /> Continue with Google
            </button>
                <button
                    className='btn btn-block btn-outline-secondary font-weight-bold mb-2'
                    style={{ borderRadius: '25px' }} onClick={handleFbSignIn}>
                    <img className='icon' style={{ float: 'left' }} src={iconFb} alt="Facebook" /> Continue with Facebook
            </button>
            </div> : <div className='col-md-5'>
                    <hr className="hr-text" data-content="or"></hr>
                    <button
                        className='btn btn-block btn-outline-secondary font-weight-bold mb-2'
                        style={{ borderRadius: '25px' }} onClick={handleGoogleSignIn}>
                        <img className='icon' style={{ float: 'left' }} src={iconGoogle} alt="Google" /> Continue with Google
            </button>
                    <button
                        className='btn btn-block btn-outline-secondary font-weight-bold mb-2'
                        style={{ borderRadius: '25px' }} onClick={handleFbSignIn}>
                        <img className='icon' style={{ float: 'left' }} src={iconFb} alt="Facebook" /> Continue with Facebook
            </button>
                </div>}
        </div>
    );
};

export default Login;