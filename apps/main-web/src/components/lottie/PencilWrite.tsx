import React from 'react';
import Lottie from 'lottie-react';
import PencilAnimation from '../../../public/json/pencilwrite.json'; // Ensure the path is correct

function PencilWrite() {
  return <Lottie animationData={PencilAnimation} loop />;
}

export default PencilWrite;
