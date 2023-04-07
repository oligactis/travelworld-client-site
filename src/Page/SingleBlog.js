import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleBlog = () => {
    const { id } = useParams();
    const [currentBlog, setCurrentBlog] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND}/blogs/${id}`)
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                setCurrentBlog(data[0]);
            })
    }, [id])
    // console.log(currentBlog);
    return (
        <div>
            {
                isLoading && <div className=" flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
                </div>
            }
            {
                currentBlog.title &&
                <div className="bg-white p-5 my-10 md:w-9/12 w-11/12 mx-auto">
                    <h1 className="mb-5 font-bold text-4xl">{currentBlog?.title}</h1>
                    <img className="rounded-lg" src={currentBlog?.image} alt="" />
                    <div className="flex flex-col justify-center items-center bg-green-700 opacity-80 rounded-full md:w-40 md:h-40 w-28 h-28 text-white text font-medium" style={{ marginTop: '-50px', marginLeft: '10px' }}>
                        <p className="md:text-5xl text-2xl">{currentBlog?.date[0]}</p>
                        <p className="md:text-lg">{currentBlog?.date[1]?.slice(0, 3)?.toUpperCase()}</p>
                        <hr className='border-gray-50 w-4/6 mt-2' />
                        <p className="md:text-2xl text-xl">{currentBlog?.date[2]}</p>
                    </div>
                    <div
                        className="p-5"
                        dangerouslySetInnerHTML={{
                            __html: currentBlog?.description
                        }}
                    />
                </div>
            }
        </div>
    );
};

export default SingleBlog;