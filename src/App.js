import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import AddFerry from './Components/Addferry';
import { Header } from './Components/header/header';
import FerryDetailsTable from './Components/FerryDetailsTable';
import Subferry from './Components/Subferry';
import Booking from './Components/booking';
import Allbooking from './Components/Allbooking';
import Qrcode from './Components/Qrcode';
import { isMobile } from 'react-device-detect';


function App() {
  return (
    <div className="App">
      {isMobile ? <>
        <Routes>
          <Route path="/" element={<Qrcode />} /></Routes></> :
        <>
          <Header />
          <br></br>
          <Routes>
            <Route path="/addferry" element={<AddFerry />} />
            <Route path="/" element={<FerryDetailsTable />} />
            <Route path='/subferry' element={<Subferry />} />
            <Route path='/bookings' element={<Booking />} />
            <Route path='/allbookings' element={<Allbooking />} />
            {/* <Route path='/qrcode' element={<Qrcode />} /> */}

          </Routes>
          {/* </Router> */}
        </>
      }
    </div>
  );
}

export default App;
