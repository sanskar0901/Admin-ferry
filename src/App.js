import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import AddFerry from './Components/Addferry';
import { Header } from './Components/header/header';
import FerryDetailsTable from './Components/FerryDetailsTable';
import Subferry from './Components/Subferry';
import Booking from './Components/booking';
import Allbooking from './Components/Allbooking';
import Cookies from 'js-cookie';


import Login from './Components/login';
import { useEffect, useState } from 'react';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    Cookies.get('email') === "TheOtterGuy" && Cookies.get('password') === "WardToronto23" && setIsLoggedIn(true)
  })


  return (
    <div className="App">

      <Header />
      <br></br>
      <Routes>
        {
          !isLoggedIn &&
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        }
        {
          isLoggedIn &&
          <>
            <Route path="/addferry" element={<AddFerry />} />
            <Route path="/" element={<FerryDetailsTable />} />
            <Route path='/subferry' element={<Subferry />} />
            <Route path='/bookings' element={<Booking />} />
            <Route path='/allbookings' element={<Allbooking />} />
          </>
        }
        {/* <Route path='/qrcode' element={<Qrcode />} /> */}

      </Routes>
      {/* </Router> */}


    </div>
  );
}

export default App;
