import React, { useEffect, useState } from 'react';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollFunction = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const topFunction = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollFunction);
    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <div
          id="myBtn"
          onClick={topFunction}
          className="cursor-pointer right-6 bottom-6 fixed flex justify-center items-center w-12 h-12 border-2 border-solid rounded-full border-[#8b5cf6] m-6"
        >
          <ArrowUpwardRoundedIcon style={{ color: '#8b5cf6' }} />
        </div>
      )}
    </div>
  );
}

export default BackToTop;
