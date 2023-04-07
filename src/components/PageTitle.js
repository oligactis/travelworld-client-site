import React from 'react';
import { Helmet } from 'react-helmet';

const PageTitle = ({ title }) => {
    return (
        <Helmet>
            <title>TravelWala - {title}</title>
        </Helmet>
    );
};

export default PageTitle;