import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URI } from '../constants/apiUrl.constant';
import { useNavigate } from 'react-router-dom';

function FerryDetailsTable() {
    const navigate = useNavigate();
    const [ferryDetails, setFerryDetails] = useState([]);

    const [hideColumns, setHideColumns] = useState(true);
    const toggleColumns = () => {
        setHideColumns(!hideColumns);
    };

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


    return (
        <div className="flex flex-col">
            <div className="flex justify-center">
                <button
                    className="px-3 py-4 whitespace-nowrap text-black bg-blue-500 hover:bg-blue-600 h-[5vh] flex items-center justify-center border-l-blue-500"
                    onClick={toggleColumns}
                >
                    Toggle Columns
                </button>
            </div>
            <div className="overflow-x-auto">
                <div className="py-2 align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        {!ferryDetails.length === 0 ? <p className='text-center text-2xl text-rose-500'>No Data Found</p> :
                            <>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <div className='flex items-center justify-center'>
                                                    Range ID
                                                </div>
                                            </th>
                                            {hideColumns ? null : <>

                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <div className='flex items-center justify-center'>
                                                        From
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <div className='flex items-center justify-center'>
                                                        To
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <div className='flex items-center justify-center'>
                                                        Start Date
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <div className='flex items-center justify-center'>
                                                        End Date
                                                    </div>
                                                </th>
                                            </>
                                            }
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <div className='flex items-center justify-center'>
                                                    Week Days

                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <div className='flex items-center justify-center'>
                                                    Capacity
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                                <div className='flex items-center justify-center'>
                                                    Fare
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <div className='flex items-center justify-center w-[10vw]'>
                                                    Time Slot
                                                </div>
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
                                                {hideColumns ? null : <>
                                                    <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.from}</td>
                                                    <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.to}</td>
                                                    <td className="px-3 py-4 whitespace-nowrap text-black ">{new Date(ferry.startDate).toLocaleDateString()}</td>
                                                    <td className="px-3 py-4 whitespace-nowrap text-black ">{new Date(ferry.endDate).toLocaleDateString()}</td>
                                                </>
                                                }
                                                <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.weekDays.join(", ")}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.capacity}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.fare}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-black"><div className='w-[10vw] overflow-x-scroll scrollbar-thin'>{ferry.time_slots.join(", ")}</div></td>
                                                <td><button className='px-3 py-4 whitespace-nowrap text-black bg-green-500 hover:bg-green-600 h-[5vh] flex 
                                        items-center justify-center border-l-green-500' onClick={() => navigate(`/subferry/?ferryId=${ferry._id}`)}>Events</button>
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
