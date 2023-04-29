import React from 'react'
import classes from './header.module.css'
import logo from "../../assets/img1.svg"
import { Navigate, useNavigate } from 'react-router-dom'

export const Header = () => {
    const navigate = useNavigate()
    return (
        <div className={classes.majorContainer}>
            <img src={logo} className={classes.logo} />
            <ul className={classes.list} >
                <li className={classes.opt} onClick={() => { navigate('/addferry') }}>Add Ferry</li>
                <li className={classes.opt} onClick={() => { navigate('/') }}>Ferries</li>
                <li className={classes.opt} onClick={() => { navigate('/allbookings') }}>All bookings</li>

            </ul>
        </div>
    )
}
