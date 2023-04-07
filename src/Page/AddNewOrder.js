import axios from 'axios';
import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import { useAuth } from '../Hook/useAuth';

const AddNewOrder = () => {
    const [data, setData] = useState({});
    const { user } = useAuth();

    const handleOnChange = (e) => {
        const tmpData = { ...data };
        tmpData[e.target.name] = e.target.value;
        setData(tmpData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND}/services`, data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('added successfully');
                }
            })
    }



    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <PageTitle title="Dashboard" />
            <h1 className="text-5xl font-semibold my-5">Add new service</h1>
            <form className="grid grid-col-1 w-1/2 mx-auto" onSubmit={handleSubmit}>
                <input onChange={handleOnChange} required disabled className="border my-1 py-2 px-1 rounded-md pl-3 text-gray-400" type="text" placeholder="Name" name="displayName" defaultValue={user.displayName} />
                <input onChange={handleOnChange} required disabled className="border my-1 py-2 px-1 rounded-md pl-3 text-gray-400" type="text" placeholder="Email" name="email" defaultValue={user.email} />
                <input onChange={handleOnChange} required className="border my-1 py-2 px-1 rounded-md pl-3" type="text" placeholder="Title" name="title" />
                <input onChange={handleOnChange} required className="border my-1 py-2 px-1 rounded-md pl-3" type="text" placeholder="Price" name="price" />
                <input onChange={handleOnChange} required className="border my-1 py-2 px-1 rounded-md pl-3" type="text" placeholder="Rating" name="rate" />
                <textarea onChange={handleOnChange} required className="border my-1 py-2 px-1 rounded-md pl-3" type="text" placeholder="Description" name="description" />
                <input onChange={handleOnChange} required className="border my-1 py-2 px-1 rounded-md pl-3" type="text" placeholder="Image URL" name="img" />
                <input className="py-3 rounded-lg bg-blue-300 cursor-pointer" type="submit" />
            </form>
        </div>
    );
};

export default AddNewOrder;