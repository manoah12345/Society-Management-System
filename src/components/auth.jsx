import { useState } from 'react';
import { auth } from '../config/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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

    return(
        <div>
            <input placeholder="Email....." onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password......" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={signIn}>Submit</button>
        </div>
    )
}