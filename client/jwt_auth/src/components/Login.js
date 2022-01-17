import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import styled from 'styled-components'
import axiosInstance from '../axios.js'

function Login({ setUser }) {

    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const usernameRef = useRef()
    const passwordRef = useRef()
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const Login = async (e) => {
        e.preventDefault();
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        try {
            const res = await axiosInstance.post('/auth/login', user)
            setUser(res.data)
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <Container>
            <LoginContainer>

                <LoginForm>
                    <SubLoginTxt>
                        <span>LOGIN</span>
                    </SubLoginTxt>
                    <UsernameInput ref={usernameRef} value={values.username} onChange={handleChange} type='text' name='username' placeholder='Enter your Name' />
                    <PasswordInput ref={passwordRef} value={values.password} onChange={handleChange} type='password' name='password' placeholder='Enter your Name' />
                    <LoginBtn onClick={Login}>
                        <span>Login</span>
                    </LoginBtn>
                </LoginForm>

            </LoginContainer>

        </Container>
    )
}

export default Login
const Container = styled.div`
height:100vh;
width:100vw;
display:flex;
justify-content:center;
align-items:center;
`
const LoginContainer = styled.div`
display:flex;
justify-content:center;
width:30%;
height:70%;
background-color:white;
border:1px solid gray;
`
const SubLoginTxt = styled.div`
margin-bottom:25px;
span{
   font-size:22px;
}
`
const LoginForm = styled.div`
width:90%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`
const UsernameInput = styled.input`
width:100%;
height:40px;
margin-bottom:5px;
:focus{
    outline:none;
}
`
const PasswordInput = styled(UsernameInput)``
const LoginBtn = styled.div`
margin-top:10px;
display:flex;
align-items:center;
justify-content:center;
background-color:#cc0052;
width:40%;
height:30px;
border-radius:4px;
cursor:pointer;
:hover{
    background-color:#ff1a75;
}
span{
    color:white;
    font-weight:500;
}

`
