import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URI } from '../constants/apiUrl.constant';
import { useNavigate } from 'react-router-dom';

function FerryDetailsTable() {
    const navigate = useNavigate();
    const [ferryDetails, setFerryDetails] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_URI}/ferry/`)
            .then((response) => {
                setFerryDetails(response.data);
                console.log(response.data);
                console.log(ferryDetails);
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
                        {!ferryDetails.length === 0 ? <p className='text-center text-2xl text-rose-500'>No Data Found</p> :
                            <>
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
                                                Time Slot
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Function
                                            </th>

                                        </tr>
                                    </thead>


                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {ferryDetails.map((ferry) => (
                                            <tr key={ferry._id}>
                                                <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.ferryNumber}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.from}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.to}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-black ">{new Date(ferry.startDate).toLocaleDateString()}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-black ">{new Date(ferry.endDate).toLocaleDateString()}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.weekDays.join(", ")}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.capacity}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.fare}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.time_slots.join(", ")}</td>
                                                <td><button className='px-3 py-4 whitespace-nowrap text-black bg-green-500 hover:bg-green-600 h-[5vh] flex 
                                        items-center justify-center border-l-green-500' onClick={() => navigate(`/subferry/?ferryId=${ferry._id}`)}>Sub Ferries</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FerryDetailsTable;
