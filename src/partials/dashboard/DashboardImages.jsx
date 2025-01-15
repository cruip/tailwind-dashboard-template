import React, { useState, useEffect } from 'react';
import pic1 from '../../images/dashboard-image1.jpg';
import pic2 from '../../images/dashboard-image2.jpg';
import pic3 from '../../images/dashboard-image3.avif';
import pic4 from '../../images/dashboard-image4.avif';
import './DashboardImages.css'; // Import CSS for styling

function DashboardImages() {
  const pics = [pic1, pic2, pic3, pic4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out of the current image

      setTimeout(() => {
        setCurrentIndex(nextIndex); // Update the current image
        setNextIndex((nextIndex + 1) % pics.length); // Update the next image
        setFade(true); // Start fade-in of the next image
      }, 500); // Duration of fade-out (matches CSS transition time)
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [nextIndex, pics.length]);

  return (
    <div className="w-full max-w-screen-lg mx-auto"> {/* Ensure the parent takes full width */}
      <div className="image-container">
        <img
          className={`bg-white dark:bg-gray-800 shadow-sm rounded-xl image ${
            fade ? 'fade-in' : 'fade-out'
          }`}
          src={pics[currentIndex]}
          alt={`Current Slide ${currentIndex + 1}`}
          key={currentIndex}
        />
        <img
          className={`bg-white dark:bg-gray-800 shadow-sm rounded-xl image ${
            fade ? 'fade-out' : 'fade-in'
          }`}
          src={pics[nextIndex]}
          alt={`Next Slide ${nextIndex + 1}`}
          key={nextIndex}
        />
      </div>
    </div>
  );
  
  
  
}

export default DashboardImages;
