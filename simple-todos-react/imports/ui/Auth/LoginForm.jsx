import {Meteor} from 'meteor/meteor'
import React ,{useState} from 'react'


export const LoginForm = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const submit = e => {
        e.preventDefault()
        Meteor.loginWithPassword(username,password)
    }

    return(
        <div>
           <form onSubmit={submit} className='login-form'>
             <label htmlFor="username">Username</label>
             <input type='text'  name='username' onChange={e=>setUsername(e.target.value)}/>
             <label htmlFor="password">Password</label>
             <input type='password'  name='password' placeholder='*******' onChange={e=>setPassword(e.target.value)}/>

             <button type='submit'>Log In</button>
           </form>
        </div>
    )
}