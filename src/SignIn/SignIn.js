import { Grid } from '@mui/material';
import { signin } from 'actions/auth.actions';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SignIn.css'
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Root = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
    //   backgroundColor: red[500],
    
    },
    [theme.breakpoints.up('md')]: {
    //   backgroundColor: blue[500],
    },
    [theme.breakpoints.up('lg')]: {
    //   backgroundColor: green[500],
    },
  }));

const SignIn = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
  
        const user = { email, password };
        console.log('user :>> ', user);
        dispatch(signin(user));
  
        console.log('auth :>> ', auth);
    };
    if (auth.authenticate) {
        return <Redirect replace={true} to='/' />
    }
    
  return (
    
    <form className='form' onSubmit={handleSubmit}>
        <div className="formGroup">
            <label htmlFor="label" className="formLabel">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className='formField' />
        </div>
        <div className="formGroup">
            <label htmlFor="label" className="formLabel">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='formField' />
        </div>
        {/* <div className="formGroup">
            <label htmlFor="label" className="formLabel">Confirm Password</label>
            <input className='formField' value="" />
        </div> */}
        <button type='submit' className='formSubmitBtn'>
            Signin
        </button>
    </form>
    
  )
}

export default SignIn;