
import React, { useState } from 'react';

import { API_URI } from '../constants/apiUrl.constant.js'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddFerry = () => {
  const [ferry, setFerry] = useState({
    ferryNumber: '',
    to: '',
    from: '',
    startDate: new Date(),
    endDate: new Date(),
    weekDays: [],
    capacity: '',
    fare: '',
    time_slot: [],
  });
  const [timeSlots, setTimeSlots] = useState([])
  // for (let i = 0; i < 24; i++) {
  //   for (let j = 0; j < 60; j += 20) {
  //     let hour = i.toString().padStart(2, "0");
  //     let minute = j.toString().padStart(2, "0");
  //     timeSlots.push(`${hour}:${minute}`);
  //   }
  // }


  const handleInputChange = (e) => {
    setFerry({ ...ferry, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, name) => {
    setFerry({ ...ferry, [name]: date });
  };

  const handleWeekDaysChange = (event) => {
    const day = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      // add day to the array if it's not already present
      if (!ferry.weekDays.includes(day)) {
        setFerry((prevFerry) => ({
          ...prevFerry,
          weekDays: [...prevFerry.weekDays, day],
        }));
      }
    } else {
      // remove day from the array if it's present
      setFerry((prevFerry) => ({
        ...prevFerry,
        weekDays: prevFerry.weekDays.filter((d) => d !== day),
      }));
    }
  };
  // const handleTimeSlotChange = (event) => {
  //   const time = event.target.value;
  //   const checked = event.target.checked;

  //   if (checked) {
  //     // add day to the array if it's not already present
  //     if (!ferry.time_slot.includes(time)) {
  //       setFerry((prevFerry) => ({
  //         ...prevFerry,
  //         time_slot: [...prevFerry.time_slot, time],
  //       }));
  //     }
  //   } else {
  //     // remove day from the array if it's present
  //     console.log("hi")
  //     setFerry((prevFerry) => ({
  //       ...prevFerry,
  //       time_slot: prevFerry.time_slot.filter((d) => d !== time),
  //     }));
  //   }
  // };
  const handleTimeSlotChange = (event) => {
    const { value } = event.target;

    // Check if the entered value is a valid time in the 24-hour format
    const validTime = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
    if (!ferry.time_slot.includes(validTime) && validTime) {
      setFerry((prevFerry) => ({
        ...prevFerry,
        time_slot: [...prevFerry.time_slot, value],
      }));
      event.target.value = ''
    }
  }
  const handleTimeSlotRemove = (time) => {
    setFerry((prevFerry) => ({
      ...prevFerry,
      time_slot: prevFerry.time_slot.filter((d) => d !== time)
    }));
  };


  function handleSubmit(e) {
    // console.log("hie")
    e.preventDefault();
    console.log(ferry);
    axios.post(`${API_URI}/ferry/addFerry`, ferry).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
    setFerry({
      ferryNumber: '',
      to: '',
      from: '',
      startDate: new Date(),
      endDate: new Date(),
      weekDays: [],
      capacity: '',
      fare: '',
      time_slot: [],
    });
  };

  return (
    <div>
      <form className='flex flex-col gap-4 justify-center items-center'>
        <p className='text-red-500 text-xs italic font-bold'>*All Fields are Required</p>
        <div className='flex justify-center'>


          <div className='w-[40vw]'>


            <div className="mb-4 flex gap-2" >
              <label className="block mb-2 w-[10vw] font-bold text-black" htmlFor="ferryNumber">
                Ferry Number
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                id="ferryNumber"
                type="number"
                name="ferryNumber"
                value={ferry.ferryNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4 flex gap-2">
              <label className="block mb-2 w-[10vw] font-bold text-black" htmlFor="to">
                To
              </label>
              <select
                className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                id="to"
                name="to"
                value={ferry.to}
                onChange={handleInputChange}
                required
              >
                <option value="">Select starting point</option>
                <option value="DocksDrivingRange Water Taxi">DocksDrivingRange Water Taxi</option>
                <option value="Ward's Island">Ward's Island</option>
                {/* <option value="Destination 2">Destination 2</option>
                <option value="Destination 3">Destination 3</option> */}
              </select>
            </div>
            <div className="mb-4 flex gap-2">
              <label className="block mb-2 w-[10vw] font-bold text-black" htmlFor="from">
                From
              </label>
              <select
                className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                id="from"
                name="from"
                value={ferry.from}
                onChange={handleInputChange}
                required
              >
                <option value="">DocksDrivingRange Water Taxi</option>
                <option value="DocksDrivingRange Water Taxi">DocksDrivingRange Water Taxi</option>
                {/* <option value="Starting point 2">Starting point 2</option>
                <option value="Starting point 3">Starting point 3</option> */}
              </select>
            </div>
            <div className="mb-4 flex gap-2">
              <label className="block mb-2 w-[10vw] font-bold text-black" htmlFor="startDate">
                Start Date
                <p className='text-red-500 text-xs italic'>*Not Included</p>
              </label>
              <DatePicker
                className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                selected={ferry.startDate}
                onChange={(date) => handleDateChange(date, 'startDate')}
                dateFormat="yyyy-MM-dd"
                required
              />
            </div>
            <div className="mb-4 flex gap-2">
              <label className="block mb-2 w-[10vw] font-bold text-black" htmlFor="endDate">
                End Date
              </label>
              <DatePicker
                className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                selected={ferry.endDate}
                onChange={(date) => handleDateChange(date, 'endDate')}
                dateFormat="yyyy-MM-dd"
                required
              />
            </div>
            <div className="mb-4 flex gap-2">
              <label className="block mb-2 w-[10vw] font-bold text-gray-700" htmlFor="weekDays">
                Week Days
              </label>
              <div className="grid grid-cols-3 gap-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    name="weekDays"
                    value="Monday"
                    checked={ferry.weekDays.includes('Monday')}
                    onChange={handleWeekDaysChange}
                  />
                  <span className="ml-2 text-gray-700">Monday</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    name="weekDays"
                    value="Tuesday"
                    checked={ferry.weekDays.includes('Tuesday')}
                    onChange={handleWeekDaysChange}
                  />
                  <span className="ml-2 text-gray-700">Tuesday</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    name="weekDays"
                    value="Wednesday"
                    checked={ferry.weekDays.includes('Wednesday')}
                    onChange={handleWeekDaysChange}
                  />
                  <span className="ml-2 text-gray-700">Wednesday</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    name="weekDays"
                    value="Thursday"
                    checked={ferry.weekDays.includes('Thursday')}
                    onChange={handleWeekDaysChange}
                  />
                  <span className="ml-2 text-gray-700">Thursday</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    name="weekDays"
                    value="Friday"
                    checked={ferry.weekDays.includes('Friday')}
                    onChange={handleWeekDaysChange}
                  />
                  <span className="ml-2 text-gray-700">Friday</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    name="weekDays"
                    value="Saturday"
                    checked={ferry.weekDays.includes('Saturday')}
                    onChange={handleWeekDaysChange}
                  />
                  <span className="ml-2 text-gray-700">Saturday</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    name="weekDays"
                    value="Sunday"
                    checked={ferry.weekDays.includes('Sunday')}
                    onChange={handleWeekDaysChange}
                  />
                  <span className="ml-2 text-gray-700">Sunday</span>
                </label>
              </div>
            </div>
          </div>
          <div>


            <div className="mb-4 flex gap-2">
              <label className="block mb-2 w-[10vw] font-bold text-black" htmlFor="capacity">
                Capacity
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                id="capacity"
                type="number"
                name="capacity"
                value={ferry.capacity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4 flex gap-2">
              <label className="block mb-2 w-[10vw] font-bold text-black" htmlFor="fare">
                Fare
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                id="fare"
                type="number"
                name="fare"
                value={ferry.fare}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4 flex gap-2">
              <label htmlFor="time_slot" className="block mb-2 w-[10vw] font-bold text-black">
                Time Slot
                <p className='text-red-500 text-xs italic font-bold'>*Enter a time in the 24-hour format (e.g. 00:00)</p>
              </label>
              <div className="mt-1 grid grid-cols-5 gap-5 overflow-y-scroll overflow-x-hidden  w-[40vw] text-black">
                <input type="text" placeholder="00:00" onChange={handleTimeSlotChange}
                  className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                />
                <div>
                  {ferry.time_slot.map((time) => (
                    <div key={time}>
                      {time}{' '}
                      <button className="text-red-500" onClick={() => handleTimeSlotRemove(time)}>Remove</button>
                    </div>
                  ))}
                </div>
                {/* {timeSlots.map((slot) => (
                  <div key={slot}>
                    <input
                      // className="hidden"
                      className="form-checkbox h-3 w-3 text-gray-600 test"
                      id={slot}
                      type="checkbox"
                      name="time_slot"
                      value={slot}
                      checked={ferry.time_slot.includes(slot)}
                      onChange={handleTimeSlotChange}
                    />
                    <label
                      htmlFor={slot}
                      className={`inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md font-medium text-gray-700 bg-white  hover:bg-gray-100 hover:cursor-pointer peer-checked/slot:bg-red-400`}
                    >
                      {slot}
                    </label>

                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              console.log("hie")
              handleSubmit(e)
            }}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline bg-white-blue"
          //    type="submit"
          >
            Add Ferry
          </button>
          {/* <button
                           className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline bg-white-red"
                           type="button"
                           onClick={handleCancel}
                         >
                  Cancel
                  </button> */}
        </div>
      </form >
    </div >
  );
}

export default AddFerry;

