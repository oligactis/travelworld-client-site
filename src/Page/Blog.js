import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import BlogItem from '../components/BlogItem';

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const [isDataLoading, setDataLoading] = useState(true);
    const [pageOffset, setPageOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        setDataLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND}/blogs`)
            .then(res => res.json())
            .then(data => {
                // console.log(data.length);
                setPageCount(Math.ceil(data.length / 6));
                setBlog(data.slice(pageOffset * 6, (pageOffset + 1) * 6));
                setDataLoading(false);
            })
    }, [pageOffset])

    const handlePageChange = (event) => {
        // console.log(event);
        setPageOffset(event.selected);
    };

    return (
        <>
            <h1 className="text-5xl text-center mt-8 font-semibold">Blogs</h1>
            {
                isDataLoading ? <div className=" flex justify-center items-center my-10">
                    <div className="animate-spin rounded-full h-52 w-52 border-t-2 border-b-2 border-purple-300"></div>
                </div> :
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-y-3 md:gap-5 w-9/12 mx-auto my-12">
                        {
                            blog.map(item => (item.status === 'allow') && <BlogItem key={item._id} blog={item} />)
                        }
                    </div>
            }
            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                nextLinkClassName="page-link"
                previousLinkClassName="page-link"
                previousClassName="page-item"
                nextClassName="page-item"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={6}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={pageOffset}
            />
        </>
    );
};

export default Blog;