import React, { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';

const ManageOrder = () => {
    const [order, setOrder] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND}/orders`)
            .then(res => res.json())
            .then(data => {
                setOrder(data);
            })
    }, [])

    const handleDeleteOrder = (id) => {
        const confDelete = window.confirm('Do you really want to delete?');
        if (confDelete) {
            const url = `${process.env.REACT_APP_BACKEND}/orders/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.deleteCount > 0) {
                        alert('Successfully deleted :)');
                        const remOrder = order.filter(item => item._id !== id);
                        setOrder(remOrder);
                    }
                })
        }
    }
    return (
        <div>
            <PageTitle title="Dashboard" />
            <div className="text-center mt-8">
                <h1 className="text-4xl font-bold">Manage order</h1>
                <h4 className="text-xl mt-2">Total order: {order.length}</h4>
            </div>

            {
                <div className="flex justify-center items-center flex-col my-8">
                    {
                        order.map(item => {
                            return (
                                <div key={item._id} className="my-3">
                                    <div key={item._id} className="flex justify-center items-center bg-white py-3 px-4 rounded">
                                        <h1 className="font-semibold">{item.title} :: ${item.price}</h1>
                                        <button onClick={() => handleDeleteOrder(item._id)} className="bg-red-400 py-1 px-3 mx-3 rounded">X</button>
                                    </div>
                                    {
                                        item.name &&
                                        <span>Added by: {item.name}</span>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            }

        </div>
    );
};

export default ManageOrder;