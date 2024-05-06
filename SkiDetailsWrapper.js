// SkiDetailsWrapper.js
import React from 'react';
import { useParams } from 'react-router-dom';
import SkiDetails from './skiDetails'; // Ensure SkiDetails is correctly imported

function SkiDetailsWrapper() {
    const { skiId } = useParams(); // This hook extracts the parameter from the URL
    return <SkiDetails skiId={skiId} />;
}

export default SkiDetailsWrapper;
