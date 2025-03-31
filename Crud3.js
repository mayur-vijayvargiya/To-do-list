
import React, { useState } from 'react';
function Crud3() {
    // States
    const [object, setObject] = useState({ name: "", model: "", description: "" });
    const [arr, setArr] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // To track whether we're editing
  
    // Handle input changes
    const manageObject = (e) => {
      setObject({ ...object, [e.target.name]: e.target.value });
    };
  
    // Add or Update Function
    const saveFn = () => {
      if (!object.name || !object.model || !object.description) {
        alert("All fields are required!");
        return;
      }
  
      if (editIndex !== null) {
        // Update existing item
        const updatedArr = [...arr];
        updatedArr[editIndex] = object;
        setArr(updatedArr);
        setEditIndex(null);
      } else {
        // Add new item
        setArr([...arr, object]);
      }
  
      // Reset the form
      setObject({ name: "", model: "", description: "" });
    };
  
    // Delete Function
    const deleteFn = (index) => {
      const updatedArr = arr.filter((_, i) => i !== index);
      setArr(updatedArr);
    };
  
    // Edit Function
    const editFn = (item, index) => {
      setObject(item);
      setEditIndex(index);
    };
  
    return (
      <div className='bg-slate-100 p-4 rounded-md shadow-md'>
        <h1 className='text-2xl font-bold text-center mb-4'>Task Management System</h1>
  
        {/* Input Fields */}
        <div className='flex justify-center gap-4 mb-4'>
          <input
            value={object.name}
            name='name'
            onChange={manageObject}
            placeholder='Task Name'
            className='p-2 border rounded-md w-60'
          />
          <input
            value={object.model}
            name='model'
            onChange={manageObject}
            placeholder='Task Model'
            className='p-2 border rounded-md w-60'
          />
          <input
            value={object.description}
            name='description'
            onChange={manageObject}
            placeholder='Task Description'
            className='p-2 border rounded-md w-60'
          />
          <button
            onClick={saveFn}
            className={'w-32 h-10 rounded-md text-white font-semibold ${editIndex !== null ? "bg-orange-500" : "bg-green-500"}'}
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
  
        {/* Table */}
        {arr.length > 0 ? (
          <table className='w-full bg-white shadow-md rounded-md'>
            <thead>
              <tr className='bg-blue-500 text-white'>
                <th className='p-3'>S.No.</th>
                <th className='p-3'>Task Name</th>
                <th className='p-3'>Task Model</th>
                <th className='p-3'>Task Price</th>
                <th className='p-3'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((item, index) => (
                <tr key={index} className='text-center border-b'>
                  <td className='p-3'>{index + 1}</td>
                  <td className='p-3'>{item.name}</td>
                  <td className='p-3'>{item.model}</td>
                  <td className='p-3'>{item.description}</td>
                  <td className='p-3'>
                    <button
                      onClick={() => editFn(item, index)}
                      className='bg-orange-400 text-white px-3 py-1 rounded-md mr-2'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteFn(index)}
                      className='bg-red-500 text-white px-3 py-1 rounded-md'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='text-center text-gray-500 mt-4'>No cars added yet!</p>
        )}
      </div>
    );
  }
  
  export default Crud3;
