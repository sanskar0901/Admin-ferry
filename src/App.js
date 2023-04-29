import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import AddFerry from './Components/Addferry';
import { Header } from './Components/header/header';
import FerryDetailsTable from './Components/FerryDetailsTable';
import Subferry from './Components/Subferry';
import Booking from './Components/booking';


function App() {
  return (
    <div className="App">

      <Header />
      <br></br>
      <Routes>
        <Route path="/" element={<AddFerry />} />
        <Route path="/ferry" element={<FerryDetailsTable />} />
        <Route path='/subferry' element={<Subferry />} />
        <Route path='/bookings' element={<Booking />} />

      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
