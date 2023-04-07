import React from 'react';
import Banner from '../components/Banner';
import BannerBG from '../components/BannerStyled';
import Feedback from '../components/Feedback';
import PageTitle from '../components/PageTitle';
import Blog from './Blog';



const Home = () => {
    const titleStyle = {
        top: '25%',
        fontSize: 'min(15vw, 10rem)',
        color: 'white',
        fontWeight: 'bold',
        webkitUserSelect: "none",
        mSuserSelect: "none",
        userSelect: "none",
        mixBlendMode: "overlay",
    }
    return (
        <div>
            <PageTitle title="Home" />
            <BannerBG img="assets/img/banner1.jpg">
                <div className="min-h-screen bg-black opacity-60"></div>
                <h1 style={titleStyle} className="absolute top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2">TravelWala</h1>
                <Banner
                    greeting="Travel Wala"
                />
            </BannerBG>
            <Blog />
            <Feedback />
        </div>
    );
};

export default Home;