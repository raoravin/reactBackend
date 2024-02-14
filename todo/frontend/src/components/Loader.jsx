// Loader.js
import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => (prevPosition + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between bg-black w-screen h-screen">
      {/* <div
        className={`w-5 h-5 rounded-md ${
          position === 0 ? 'bg-blue-500' : 'bg-gray-300'
        } transition-all duration-300`}
      ></div>
      <div
        className={`w-5 h-5 rounded-md ${
          position === 1 ? 'bg-blue-500' : 'bg-gray-300'
        } transition-all duration-300`}
      ></div>
      <div
        className={`w-5 h-5 rounded-md ${
          position === 2 ? 'bg-blue-500' : 'bg-gray-300'
        } transition-all duration-300`}
      ></div>
      <div
        className={`w-5 h-5 rounded-md ${
          position === 3 ? 'bg-blue-500' : 'bg-gray-300'
        } transition-all duration-300`}
      ></div> */}
    </div>
  );
};

export default Loader;
