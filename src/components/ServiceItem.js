import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../Hook/useAuth';

const ServiceItem = ({ service, services }) => {
    const { user } = useAuth();
    const history = useHistory();
    const { title, price, rate, description, img, _id } = service;
    const handleAddtoCart = async (id) => {
        if (user?.uid) {
            const data = services?.find(item => item._id === id);
            data.name = user?.displayName;
            data.email = user?.email;
            axios.post(`${process.env.REACT_APP_BACKEND}/orders`, data)
                .then(res => {
                    if (res.data.insertedId) {
                        alert('added to cart successfully');
                    }
                    else {
                        alert(`${res.data.message}`);
                    }
                })
            // console.log(data)
        }
        else
            history.push('/login');
    }

    return (
        <div className="rounded-xl overflow-hidden bg-white flex flex-col justify-between hover:shadow-xl transition ease-in-out duration-300">
            <div>
                <img className="w-full" src={img} alt="servicePic" />
                <div className="p-5">
                    <div className="flex justify-between my-2">
                        <h3 className="text-2xl truncate text-gray-600 font-bold">{title}</h3>
                        <h3 className="text-2xl text-gray-400 font-bold">${price}</h3>
                    </div>
                    <div className="text-gray-500">
                        <p className="my-2 font-semibold">{rate}</p>
                        <p className="overflow-ellipsis">{description.slice(0, 150)}...</p>
                    </div>
                </div>
            </div>
            <button onClick={() => handleAddtoCart(_id)} className="border-t py-2 hover:bg-blue-300 transition ease-in-out duration-200 w-full">Add to cart</button>
        </div>
    );
};

export default ServiceItem;