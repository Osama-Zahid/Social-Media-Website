import React, { useContext } from 'react'
import { useRef } from 'react'
import './login.css'
import { logincall } from '../../apicalls';
import{AuthContext} from '../../redux/AuthContext'
export default function Login() {
    const email=useRef();
    const password=useRef();
    const {user,isFetching,error,dispatch} = useContext(AuthContext)
    
    const handlerclick=(e)=>{
        e.preventDefault()
        logincall({email:email.current.value,password:password.current.value},dispatch)
    };
  return (
    <div className='llogin'>
        <div className="lloginwrapper">
            <div className="lloginleft">
                <h3 className='lLoginlogo'>eLearn</h3>
                <span className="llogindesc">
                    Change your view on learning and growth.<br/>At eLearn, we bring meaning to learning so that you can Level Up!<br/>
                </span>
                <form className="lloginbox" onSubmit={handlerclick}>
                    <input placeholder="Email" type="email" className="llogininput" ref={email} required/>
                    <input placeholder="Password" type="password" className="llogininput" ref={password} required minLength="6"/>
                    <span className="lloginforget">Forget Password</span>
                    <button className="lloginbutton">{isFetching? "Loading":"Log-in"}</button>
                </form>
                <button className="lloginregisterbutton">Create New Account</button>
            </div>
        </div>
    </div>
  )
}
