import React from 'react';
import ReactStars from "react-rating-stars-component";
// import htmlToDraft from 'html-to-draftjs';
import { NavLink } from 'react-router-dom';

const BlogItem = (props) => {
    const { blog } = props;
    // const description = htmlToDraft(blog.description);
    return (
        <div className="flex justify-center">
            <div className="rounded-lg shadow-lg bg-white max-w-sm w-full">
                <NavLink to={`/blog/${blog._id}`}>
                    <img className="rounded-t-lg w-full" src={blog.image} alt="" />
                </NavLink>
                <div className="p-6 w-full">
                    <p className="text-gray-400 w-auto">{blog.date[0]} {blog.date[1]}, {blog.date[2]}</p>
                    <h3 className="text-gray-900 text-xl font-semibold mb-2 w-full">{blog.title.slice(0, 60)}{blog.title.length > 60 && '...'}</h3>
                    <ReactStars
                        size={20}
                        count={5}
                        value={blog.rating}
                        edit={false}
                        isHalf="true"
                    />
                    <p>
                        {blog.summary.slice(0, 150)}...
                    </p>
                    {/* <div className="text-gray-700 text-base mb-4 blog_brief"
                        dangerouslySetInnerHTML={{
                            __html: blog?.description.slice(0, 150) + '...'
                        }}
                    >
                    </div> */}
                    <NavLink to={`/blog/${blog._id}`}>
                        <button type="button" className=" inline-block mt-4 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            See more
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default BlogItem;