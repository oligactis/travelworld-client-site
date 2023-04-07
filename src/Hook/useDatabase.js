import { useState, useEffect } from 'react';

export const useDatabase = () => {
    const [blog, setBlog] = useState([]);
    const [isDataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        setDataLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND}/blogs`)
            .then(res => res.json())
            .then(data => {
                setBlog(data);
                setDataLoading(false);
            })
    }, [])
    return {
        blog,
        setBlog,
        isDataLoading
    }
}