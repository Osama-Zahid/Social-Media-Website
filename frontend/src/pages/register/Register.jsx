import axios from 'axios';
import React, { useRef } from 'react'
import './register.css'
import {useHistory} from 'react-router'
export default function Register() {
    const firstname=useRef();
    const lastname=useRef();
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const passwordagain=useRef(); 
    const history=useHistory();
    const handlerclick= async (e)=>{
        e.preventDefault()
        if(passwordagain.current.value !== password.current.value){
            passwordagain.current.setCustomValidity("Password don't match")
        } else{
            const user={
                firstname:firstname.current.value,
                lastname:lastname.current.value,
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
            }
            try{
                await axios.post("/auth/register",user)
                history.push("/login")
            }catch(err)
            {
                console.log(err)
            }
        }
    };
  return (
    <div className='login'>
        <div className="loginwrapper">
            <div className="loginleft">
                <h3 className='Loginlogo'>eLearn</h3>
                <span className="logindesc">
                    Change your view on learning and growth.<br/>At eLearn, we bring meaning to learning so that you can Level Up!<br/>
                </span>
                <form className="loginbox" onSubmit={handlerclick}>
                    <div className="name">
                        <input placeholder="First Name" required ref={firstname} className="logininput" />
                        <input placeholder="Last Name" required ref={lastname} className="logininput" />
                    </div>
                    <input placeholder="username" required ref={username} className="logininput"/>
                    <input placeholder="Email" required ref={email} className="logininput" type="email"/>
                    <input placeholder="Password" required ref={password} className="logininput" minLength="6" type="password"/>
                    <input placeholder="Confirm Password" required ref={passwordagain} className="logininput" minLength="6" type="password"/>
                    <button className="loginbutton" type="submit">Sign up</button>
                    <a href="https:/www.gmail.com" className="gmail">Sign in using G-Mail</a>
                </form>
            </div>
        </div>
    </div>
  )
}
