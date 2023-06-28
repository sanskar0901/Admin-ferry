import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URI } from '../constants/apiUrl.constant';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function Subferry() {
  const navigate = useNavigate();
  const location = useLocation();
  const [subferryDetails, setSubFerryDetails] = useState([]);
  const [totalcapacity, setTotalcapacity] = useState(0)
  const searchParams = new URLSearchParams(location.search);
  const [timeSlotFilter, setTimeSlotFilter] = useState('');
  const [filtertimearr, setFiltertimearr] = useState([]);

  const [hideColumns, setHideColumns] = useState(true);
  const columns = [
    // { name: 'Range Id', prop: 'ferryNumber' },
    { name: 'From', prop: 'from', hidden: hideColumns },
    { name: 'To', prop: 'to', hidden: hideColumns },
    { name: 'Date', prop: 'startDate' },
    { name: 'End Date', prop: 'endDate', hidden: hideColumns },
    { name: 'Week Days', prop: 'weekDay', hidden: hideColumns },
    { name: 'Sold/Capacity', prop: 'capacity' },
    // { name: 'Fare', prop: 'fare' },
  ];

  const toggleColumns = () => {
    setHideColumns(!hideColumns);
  };

  const options = [
    { value: '', label: 'All' },
    ...filtertimearr.map((time) => ({ value: time, label: time }))
  ];


  const handleChange = (selectedOption) => {
    setTimeSlotFilter(selectedOption.value);
  };

  useEffect(() => {

    axios
      .get(`${API_URI}/ferry/subferry/${searchParams.get('ferryId')}`)
      .then((response) => {
        setSubFerryDetails(response.data.subferry);
        setTotalcapacity(response.data.capacity)
        setFiltertimearr(Array.from(new Set(response.data.subferry.map(item => item.time_slot))));
        console.log(filtertimearr)

        // console.log(response.data);
        // console.log(subferryDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.post(`${API_URI}/ferry/delete/${id}`).then((response) => {
      window.alert("Deleted Successfully");
      window.location.reload();
      console.log(response.data)
    }
    )
  }



  return (
    <div className="flex flex-col pt-20">
      <div className="flex justify-start">
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map(column => (
                    <th key={column.prop} className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.hidden ? 'hidden' : ''}`}>
                      <div className='flex justify-center py-2 gap-4 items-center w-[10vw]'>
                        {column.name}
                      </div>
                    </th>
                  ))}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <label htmlFor="timeSlotFilter" className="font-medium text-gray-700">
                      Time Slot:
                    </label>
                    <Select
                      id="timeSlotFilter"
                      name="timeSlotFilter"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                      options={options}
                      value={options.find((option) => option.value === timeSlotFilter)}
                      onChange={handleChange}
                    />

                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Function
                  </th>
                </tr>
              </thead>
              {!subferryDetails.length ? (
                <p className="text-center text-2xl text-rose-500">No Data Found</p>
              ) : (
                <tbody className="bg-white divide-y divide-gray-200">
                  {subferryDetails
                    .filter(fer => fer.time_slot === timeSlotFilter || timeSlotFilter === '')
                    .map(ferry => (
                      <tr key={ferry._id} >
                        {columns.map(column => (
                          <td key={column.prop} className={` text-black ${column.hidden ? 'hidden' : ''}`}>
                            <div className='flex justify-center py-2 gap-4 items-center'>
                              {column.prop === 'startDate' || column.prop === 'endDate' ?
                                new Date(ferry[column.prop]).toLocaleDateString() :
                                column.prop === 'capacity' ?
                                  <p className={`${ferry[column.prop] < 10 ? "text-red-500" : ferry[column.prop] < 20 ? " text-yellow-500" : "text-green-500"}`}>
                                    {`${totalcapacity - ferry[column.prop]}/${totalcapacity}`}
                                  </p> :
                                  ferry[column.prop]

                              }
                            </div>
                          </td>
                        ))}

                        <td className="px-3 py-4 whitespace-nowrap text-black ">{ferry.time_slot}</td>
                        <td className='flex justify-start py-2 gap-4 items-center'>
                          <button
                            className="px-3 py-4 whitespace-nowrap text-black bg-green-500 hover:bg-green-600 h-[5vh] flex items-center  border-l-green-500"
                            onClick={() => navigate(`/bookings/?ferryId=${ferry._id}`)}
                          >
                            Bookings
                          </button>

                          <button
                            className="px-3 py-4 whitespace-nowrap text-black bg-rose-700 hover:bg-rose-900 h-[5vh] flex items-center justify-center border-l-rose-600"
                            onClick={e => {
                              e.preventDefault();
                              handleDelete(ferry._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>

    </div >
  )
}
export default Subferry;
