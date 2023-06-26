import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie';

const Login = ({ isLoggedIn, setIsLoggedIn }) => {

    const navigate = useNavigate()

    const [userId, setUserId] = useState("")
    const [password, setPassWord] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()
        if (userId == "TheOtterGuy" && password == "WardToronto23") {
            Cookies.set("email", userId)
            Cookies.set("password", password)
            setIsLoggedIn(true)
            navigate("/")
        } else {
            alert("Wrong username or Password!!")
        }
    }

    return (
        <div className="w-full mt-10 flex justify-center items-center">
            <form className="flex flex-col justify-center items-center gap-3 p-5 bg-blue-300 rounded-md" onSubmit={(e) => handleLogin(e)}>
                <h2 className="text-2xl font-semibold">Login</h2>
                <div className="flex flex-col justify-center items-center">
                    <label>UserId</label>
                    <input className="p-4 py-2 w-72 rounded-md text-black" onChange={(e) => setUserId(e.target.value)} type="text" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <label>Password</label>
                    <input className="p-4 py-2 w-72 rounded-md text-black" onChange={(e) => setPassWord(e.target.value)} type="password" />
                </div>
                <button className="w-fit px-8 py-1 text-black bg-green-300 rounded-md">Login</button>
            </form>
        </div>
    )
}

export default Login
