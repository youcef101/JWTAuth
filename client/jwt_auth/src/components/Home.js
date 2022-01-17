import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import axiosInstance from '../axios'
import jwt_decode from 'jwt-decode'

function Home({ user, setUser }) {
    //const [isAdmin, setIsAdmin] = useState(true)
    const [accounts, setAccounts] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const getUsersAccount = async () => {
            try {
                const res = await axiosInstance.get(`/user/${user?.id}/all`)
                setAccounts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUsersAccount()
    }, [user?.id])

    const RefreshToken = async () => {
        try {
            const res = await axiosInstance.post(`/token/refresh`, { refreshToken: user.refreshToken })
            setUser({
                ...user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken
            })
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    axiosInstance.interceptors.request.use(async (config) => {
        let currentDate = new Date()
        let decodedData = jwt_decode(user.accessToken)
        if (decodedData.exp * 1000 < currentDate.getTime()) {
            const data = await RefreshToken()
            config.headers['authorization'] = 'Bearer ' + data.accessToken;
        }
        return config;
    }, (err) => {
        return Promise.reject(err)
    });


    const DeleteAccount = async (id) => {

        setSuccess(false)
        try {
            await axiosInstance.delete(`/user/delete/${id}`,
                {
                    headers: {
                        authorization: 'Bearer ' + user.accessToken
                    }
                })
            setSuccess(true)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container>
            <HomeContainer>
                <TopContainer>
                    {user?.isAdmin === false ?
                        <span>Welcome <b>{user?.user}</b>.</span>
                        :
                        <span>Welcome to <b>admin</b> dashboard <b>{user?.user}</b></span>
                    }
                </TopContainer>
                <MiddleContainer>
                    {user.isAdmin === true ? <>
                        <Txt>Delete Users Accounts:</Txt>
                        <BtnContainer>
                            {accounts &&
                                accounts.map(account =>
                                    <DeleteBtn onClick={() => DeleteAccount(account.id)} key={Math.random()}>
                                        <span>Delete {account.username} account</span>
                                    </DeleteBtn>
                                )}
                            {success === true ? <span>account deleted successfully</span> : null}
                        </BtnContainer>
                    </> :
                        <DeleteBtn onClick={() => DeleteAccount(user.id)}>
                            <span>Delete My Account</span>
                        </DeleteBtn>
                    }
                    {success === true ? <span>account deleted successfully</span> : null}
                </MiddleContainer>
                <BottomContainer>
                    <LogoutBtn>
                        <span>LOGOUT</span>
                    </LogoutBtn>
                </BottomContainer>

            </HomeContainer>

        </Container>
    )
}

export default Home
const Container = styled.div`
height:100vh;
width:100vw;
display:flex;
justify-content:center;
align-items:center;
`
const HomeContainer = styled.div`
display:flex;
align-items:center;
flex-direction:column;
width:30%;
height:70%;
background-color:white;
border:1px solid gray;
`
const TopContainer = styled.div`
margin-top:15px;
width:99%;
span{
    font-size:15px;
}
`
const MiddleContainer = styled.div`
width:80%;
margin-top:15px;
span{
    color:green;
}

`
const BottomContainer = styled.div`
width:50%;
margin-top:40px;
`
const Txt = styled.div`
margin-bottom:10px;
`
const BtnContainer = styled.div`
span{
    color:green;
}
`
const DeleteBtn = styled.div`
display:flex;
align-items:center;
justify-content:center;
border-radius:4px;
background-color:#cc0000;
margin-bottom:5px;
cursor:pointer;
height:30px;
:hover{
    background-color:#ff3333;
}
span{
    color:white;
    font-size:12px;
    font-weight:500;
}
`
const LogoutBtn = styled(DeleteBtn)``