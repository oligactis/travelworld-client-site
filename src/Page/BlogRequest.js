import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const BlogRequest = () => {
    const [blogList, setBlogList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [updateCount, setUpdateCount] = useState(0);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND}/blogs`)
            .then(res => res.json())
            .then(data => {
                setBlogList(data)
                setIsLoading(false);
            })
    }, [updateCount])
    const handleAllowBlog = (id, status) => {
        fetch(`${process.env.REACT_APP_BACKEND}/blogs/allow/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status })
        }).then(res => res.json())
            .then(data => {
                if (data?.modifiedCount)
                    setUpdateCount(updateCount + 1)
            })
    }
    const handleDeleteBlog = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND}/blogs/delete/${id}`, {
            method: "DELETE"
        }).then(res => res.json())
            .then(data => {
                if (data?.deletedCount)
                    setUpdateCount(updateCount + 1);
            })
    }
    return (
        <div>
            <p className='text-xl font-semibold text-center my-10'>Blog request</p>
            <div className='flex flex-col items-center'>
                {
                    isLoading ? <div className=" flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
                    </div>
                        :
                        blogList.map(item => (
                            <div key={item._id} className='border-t-2 border-b-2 py-2 my-2 px-5 w-9/12 md:w-6/12'>
                                <NavLink to={`/blog/${item._id}`}><p className="font-semibold text-blue-600">{item.title}</p></NavLink>
                                <p>by: <span className="text-blue-400">{item.email}</span> <span className="text-xs text-gray-400">({item.displayName})</span></p>
                                <div className="flex items-center">
                                    <div>
                                        {
                                            (item.status === 'pending') ?
                                                <button onClick={() => handleAllowBlog(item._id, 'allow')} className='border-1 text-xs bg-blue-500 text-gray-50 font-semibold my-1 px-3 py-1 rounded-lg hover:bg-blue-600 hover:shadow-sm'>Allow</button> :
                                                <button onClick={() => handleAllowBlog(item._id, 'pending')} className='border-1 text-xs bg-gray-300 text-gray-50 font-semibold my-1 px-3 py-1 rounded-lg'>Allowed</button>

                                        }
                                    </div>
                                    <button onClick={() => handleDeleteBlog(item._id)} className='ml-2 text-xs border-1 bg-red-500 text-gray-50 font-semibold my-1 px-3 py-1 rounded-lg hover:bg-red-600 hover:shadow-sm'>Delete</button>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    );
};

export default BlogRequest;