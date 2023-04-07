import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ReactStars from "react-rating-stars-component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Feedback = () => {
    const [feedback, setFeedback] = useState([]);
    useEffect(() => {
        fetch('./feedback_data.json')
            .then(res => res.json())
            .then(data => setFeedback(data))
    }, [])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        className: "w-full md:w-4/6 m-auto",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <p className="text-center font-semibold text-blue-500 text-2xl">Testimonial</p>
            <div className="m-auto my-10">
                <Slider {...settings}>
                    {feedback &&
                        feedback.map((item, index) => (
                            <div key={index} className="flex justify-center my-5" style={{ width: '360px' }}>
                                <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-white max-w-sm m-auto">
                                    <img
                                        src={`https://i.pravatar.cc/150?img=${index}`}
                                        className="rounded-full w-32 shadow-lg"
                                        alt="Avatar"
                                    />
                                    <h5 className="text-xl font-medium leading-tight mt-5">{item.name}</h5>
                                    <h6 className='font-light text-sm leading-tight text-gray-400 mt-1 mb-5'>{item.occupation}</h6>
                                    <ReactStars
                                        size={20}
                                        count={5}
                                        value={parseFloat(item.rate)}
                                        edit={false}
                                        isHalf="true"
                                    />
                                    <p className="text-gray-500">{item.description}</p>
                                </div>
                            </div>

                        ))
                    }
                </Slider>
            </div>
        </>
    );
};

export default Feedback;