import React from 'react';

const Banner = ({ greeting, title, title2nd, img }) => {
    return (
        <>
            <div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-full lg:w-3/4 overflow-hidden bottom-0 p-10 bg-gray-100">
                    {/* <h1 className="md:text-7xl text-3xl font-bold bg-gray-800 bg-opacity-60 py-8">{greeting}</h1> */}
                    <div className="flex flex-row sm:justify-evenly flex-wrap gap-3">
                        <div className="flex flex-col">
                            <span>Flying from:</span>
                            <select className="py-1 px-2 mt-2 rounded-md shadow-md">
                                <option value="">City or Airport</option>
                                <option value="">Alaska</option>
                                <option value="">Bahamas</option>
                                <option value="">Barmuda</option>
                                <option value="">Canada</option>
                                <option value="">Caribbean</option>
                                <option value="">Europe</option>
                                <option value="">Hawaii</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <span>to:</span>
                            <select className="py-1 px-2 mt-2 rounded-md shadow-md">
                                <option value="">City or Airport</option>
                                <option value="">Alaska</option>
                                <option value="">Bahamas</option>
                                <option value="">Barmuda</option>
                                <option value="">Canada</option>
                                <option value="">Caribbean</option>
                                <option value="">Europe</option>
                                <option value="">Hawaii</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <span>Departing:</span>
                            <input type="date" className="py-0.5 px-2 mt-2 rounded-md shadow-md" />
                        </div>
                        <div className="flex flex-col">
                            <span>Returning:</span>
                            <input type="date" className="py-0.5 px-2 mt-2 rounded-md shadow-md" />
                        </div>
                        <div className="flex flex-col">
                            <span>Adult:</span>
                            <select className="py-1 px-2 mt-2 rounded-md shadow-md">
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                                <option value="">5</option>
                                <option value="">6</option>
                                <option value="">7</option>
                                <option value="">8</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <span>Child:</span>
                            <select className="py-1 px-2 mt-2 rounded-md shadow-md">
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                                <option value="">5</option>
                                <option value="">6</option>
                                <option value="">7</option>
                                <option value="">8</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <span>&nbsp;</span>
                            <button className="text-gray-100 bg-gray-400 font-semibold mt-2 px-4 py-1 transition duration-300 hover:bg-red-600 rounded-md shadow-md">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;