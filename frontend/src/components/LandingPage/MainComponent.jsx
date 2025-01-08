import React, { useState } from 'react';
import Button from '../Common/Button/Button';
import iphone from '../../assets/iphone.png';
import gradient from '../../assets/gradient.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RWebShare } from "react-web-share";
import { toast } from "react-toastify";

function MainComponent() {
  const [hover, setHover] = useState(false);

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between items-start px-2 py-12">
      <div className="text-slate-100 m-0">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-8xl font-bold text-white"
          style={{
            WebkitTextStroke: '2px white', // Stroke color
            color: hover ? 'transparent' : '', // Transparent fill on hover
            transition: 'color 0.3s ease, WebkitTextStroke 0.3s ease', // Smooth transition
          }}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          Track Crypto
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-8xl font-bold text-violet-500"
        >
          Real Time
        </motion.h1>
        <p className="m-8 text-slate-400">
          Track crypto through a public API in real time. Visit the dashboard to do so!
        </p>
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex md:justify-start justify-evenly items-center gap-6"
        >
          <Link to="/dashboard"><Button text="Dashboard" outline={false} /></Link>
          <RWebShare
            data={{
              text: "CryptoDashboard made by Gopal using React JS.",
              url: "https://crypoTracker-Gopal.netlify.app",
              title: "CrypoTrack.",
            }}
            onClick={() => toast.info("App Shared!")}
          >
            <Button text={"Share App"} outlined={true} />
          </RWebShare>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.25 }}
        className="w-full md:w-1/2 mt-8 md:mt-0 relative"
      >
        <motion.img
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{ type: 'smooth', repeatType: 'mirror', duration: 2, repeat: Infinity }}
          className="w-[50%] min-w-[300px] absolute left-12 sm:left-[20%] md:left-[20%] sm:right-0 sm:top-0 z-10 cursor-pointer"
          src={iphone}
          alt="iPhone displaying crypto tracking app"
        />
        <img
          className="w-[50%] min-w-[300px] absolute left-16 sm:left-[22%] md:left-[25%] top-12 sm:right-0 sm:top-12"
          src={gradient}
          alt="Gradient effect behind iPhone"
        />
      </motion.div>
    </div>
  );
}

export default MainComponent;