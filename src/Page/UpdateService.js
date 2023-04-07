import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import PageTitle from '../components/PageTitle';
import { useDatabase } from '../Hook/useDatabase';

const UpdateService = () => {
    const { service } = useDatabase();
    const { id } = useParams();
    const selectedService = service.find(item => item._id === id);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        // console.log(data);
        fetch(`https://travel-pagla.herokuapp.com/services/updateservice/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(service)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Successfully updated');
                    reset();
                }
            })
        // axios.post(`https://travel-pagla.herokuapp.com/services/updateservice/${id}`, data)
        //     .then(res => {
        //         if (res.data.insertedId) {
        //             alert('Successfully updated');
        //             reset();
        //         }
        //     })
    }
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <PageTitle title="Dashboard" />
            <h1 className="text-5xl font-semibold my-5">Update service</h1>
            <form className="grid grid-col-1 w-1/2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <input className="border my-1 py-2 px-1 rounded-md pl-3" type="text" placeholder="Name" defaultValue={selectedService?.name} {...register("name", { required: true, maxLength: 100 })} />
                <input className="border my-1 py-2 px-1 rounded-md pl-3" type="text" placeholder="Title" defaultValue={selectedService?.title} {...register("title", { required: true, maxLength: 80 })} />
                <input className="border my-1 py-2 px-1 rounded-md pl-3" type="text" placeholder="Email" defaultValue={selectedService?.email} {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                <input className="border my-1 py-2 px-1 rounded-md pl-3" type="text" placeholder="Price" defaultValue={selectedService?.price} {...register("price")} />
                <input className="border my-1 py-2 px-1 rounded-md pl-3" type="text" placeholder="Rating" defaultValue={selectedService?.rate} {...register("rate")} />
                <textarea className="border my-1 py-2 px-1 rounded-md pl-3" type="text" placeholder="Description" defaultValue={selectedService?.description} {...register("description")} />
                <input className="border my-1 py-2 px-1 rounded-md pl-3" type="text" placeholder="Image URL" defaultValue={selectedService?.img} {...register("img")} />
                <input className="py-3 rounded-lg" type="submit" />
            </form>
        </div>
    );
};

export default UpdateService;