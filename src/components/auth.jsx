import { useState } from 'react';
import { auth } from '../config/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error){
            console.error(error);
        }
    }

    const logIn = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error){
            console.error(error);
        }
    }

    return(
        <div>
            <label>Sign In</label>
            <input placeholder="Email....." onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password......" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={signIn}>Submit</button><br /><br />
            <label>Log In</label>
            <input placeholder="Email....." onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password......" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={logIn}>Submit</button>
        </div>
    )
}