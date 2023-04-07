import React, { useState } from 'react';

const ManageServices = () => {
    const [services, setServices] = React.useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [updateCount, setUpdateCount] = useState(0);
    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND}/services`)
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                setServices(data)
            })
    }, [updateCount])
    const handleDeleteService = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND}/services/${id}`, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(data => {
                if (data?.deletedCount)
                    setUpdateCount(updateCount + 1)
            })
    }
    return (
        <div className="flex flex-col lg:w-4/12 md:w-6/12 w-11/12 mx-auto mt-10 bg-white p-5 rounded-lg">
            <h1 className="text-center font-semibold text-xl mb-5 uppercase">manage services - {services.length}</h1>
            {
                isLoading ? <div className=" flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
                </div>
                    :
                    services.map(item => (
                        <div key={item._id} className="flex justify-between items-center my-2">
                            <div key={item._id} className="flex justify-between w-9/12">
                                <p>{item.title}</p>
                                <p>${item.price}</p>
                            </div>
                            <div className="flex justify-center items-center">
                                <button onClick={() => handleDeleteService(item._id)} className="text-center bg-red-500 px-2 text-lg rounded-full text-gray-50 cursor-pointer">X</button>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
};

export default ManageServices;