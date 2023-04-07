import React, { useEffect, useState } from 'react';
import ServiceItem from './ServiceItem';

const Service = () => {
    const [service, setService] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND}/services`)
            .then(res => res.json())
            .then(data => {
                setService(data)
            })
    }, [])
    return (
        <>
            <h1 className="text-5xl text-center mt-8 font-semibold">Services</h1>
            {!service.length ? <div className=" flex justify-center items-center my-10">
                <div className="animate-spin rounded-full h-52 w-52 border-t-2 border-b-2 border-purple-300"></div>
            </div> :

                <div className="grid md:grid-cols-3 gap-y-3 md:gap-5 w-9/12 mx-auto my-12">
                    {
                        service.map(item => <ServiceItem key={item._id} services={service} service={item} />)
                    }
                </div>
            }
        </>
    );
};

export default Service;