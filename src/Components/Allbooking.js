import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URI } from '../constants/apiUrl.constant';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Allbooking() {
    const [bookingDetails, setBookingDetails] = useState([]);
    // Do something with the query params (e.g. display a success message)
    // ...

    // Truncate the query params from the URL

    useEffect(() => {

        axios
            .get(`${API_URI}/booking/`)
            .then((response) => {
                setBookingDetails(response.data);
                // console.log(response.data);
                console.log(bookingDetails);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="py-2 align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 font-bold text-xs  text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>

                                    <th scope="col" className="px-6 py-3 font-bold text-xs  text-gray-500 uppercase tracking-wider">
                                        Seats
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-bold text-xs  text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>

                                    <th scope="col" className="px-6 py-3 font-bold text-xs  text-gray-500 uppercase tracking-wider">
                                        Time Slot
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-bold text-xs  text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>


                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookingDetails.map((booking) => (
                                    <tr key={booking._id}>
                                        <td className="px-3 py-4 whitespace-nowrap text-black ">{booking.name}</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-black ">{booking.seats}</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-black ">{new Date(booking.date).toLocaleDateString()}</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-black ">{booking.time_slot}</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-black ">{booking.status}</td>
                                        {/* <td><button className='px-3 py-4 whitespace-nowrap text-black bg-rose-700 hover:bg-rose-900 h-[5vh] flex 
                                        items-center justify-center border-l-rose-800' onClick={() => navigate(`/bookings/?ferryId=${ferry._id}`)}> bookings</button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Allbooking;
