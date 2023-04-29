import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URI } from '../constants/apiUrl.constant';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Subferry() {
  const navigate = useNavigate();
  const location = useLocation();
  const [subferryDetails, setSubFerryDetails] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const [timeSlotFilter, setTimeSlotFilter] = useState('');
  const [filtertimearr, setFiltertimearr] = useState([]);




  // Do something with the query params (e.g. display a success message)
  // ...

  // Truncate the query params from the URL

  useEffect(() => {

    axios
      .get(`${API_URI}/ferry/subferry/${searchParams.get('ferryId')}`)
      .then((response) => {
        setSubFerryDetails(response.data);
        setFiltertimearr(Array.from(new Set(response.data.map(item => item.time_slot))));

        // console.log(response.data);
        // console.log(subferryDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDelete = (id) => {
    axios.post(`${API_URI}/ferry/delete/${id}`).then((response) => {
      console.log(response.data)
    }
    )
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ferry Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    To
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Week Days
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fare
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <label htmlFor="timeSlotFilter" className="font-medium text-gray-700">
                      Time Slot:
                    </label>
                    <select
                      id="timeSlotFilter"
                      name="timeSlotFilter"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                      value={timeSlotFilter}
                      onChange={(e) => setTimeSlotFilter(e.target.value)}
                    >
                      <option value="">All</option>
                      {
                        filtertimearr.map((time) => (
                          <option value={time}>{time}</option>
                        ))
                      }


                    </select>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Function
                  </th>

                </tr>
              </thead>
              {!subferryDetails.length === 0 ? <p className='text-center text-2xl text-rose-500'>No Data Found</p> :
                <>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subferryDetails.filter(
                      (fer) => fer.time_slot === timeSlotFilter || timeSlotFilter === ''
                    ).map((ferry) => (
                      <tr key={ferry._id}>
                        <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.ferryNumber}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.from}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.to}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-black ">{new Date(ferry.startDate).toLocaleDateString()}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-black ">{new Date(ferry.endDate).toLocaleDateString()}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.weekDay}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.capacity}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.fare}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.time_slot}</td>
                        <td><button className='px-3 py-4 whitespace-nowrap text-black bg-green-500 hover:bg-green-600 h-[5vh] flex 
                                        items-center justify-center border-l-green-500' onClick={() => navigate(`/bookings/?ferryId=${ferry._id}`)}> bookings</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              }
            </table>
          </div>
        </div>
      </div>
    </div >
  )
}
export default Subferry;
