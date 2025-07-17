"use client";
import React, { useEffect, useState } from "react";

const CircularProgressBar = ({boughtPercentage}) => {

  console.log("boughtPercentage",boughtPercentage);
  useEffect(() => {
    const target = boughtPercentage;
    let current = 0;
    const interval = setInterval(() => {
      if (current < target) {
        current++;
       
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const degree = (boughtPercentage / 100) * 360;

  return (
    <div className="w-20 h-20 relative flex items-center justify-center workSans flex-shrink-0">
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `conic-gradient(#4ade80 ${degree}deg, transparent 0deg)`
        }}
      />
      <div className="absolute w-16 h-16 rounded-full flex justify-center items-center bg-[linear-gradient(to_bottom,_#145133,_#0C4520)] text-gray-800">
      <p className="text-white font-semibold text-sm">{boughtPercentage}%</p>  
      </div>
    </div>
  );
};

export default CircularProgressBar;
