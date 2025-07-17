
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { MdEmail } from 'react-icons/md';

const data = [
  { image: "/images/twitter.png", url: "https://x.com/kodagufc" },
  { image: "/images/facebook.png", url: "https://www.facebook.com/kodagufc/" },
  { image: "/images/instagram.png", url: "https://www.instagram.com/kodagufc/?hl=en" },
  { image: "/images/youtube.png", url: "https://www.youtube.com/channel/UCKZHOWmsGA1mmK54Nx2VVEg" }
];

const Footer = () => {
  return (
    <div className="flex sm:flex-row flex-col  gap-y-2 items-center justify-between md:px-[46px]   py-5 workSans ">
      <Image
        src="/images/logo_main.png"
        alt="Logo"
        width={110}
        height={145}
      />
      <div className='flex flex-col  gap-3'>
         <p className='w-full  font-bold text-center'>Contact Us </p>
         <div className='flex flex-col items-center gap-2'>
           <div className='flex items-center  gap-2'><Phone size={15}/><p>Phone: <a href="tel:+919980212063">+919980212063</a> </p></div>
           <div className='flex items-center gap-2'> <Mail size={15}/> <p>Email: <a href="mailto:operations@kodagufc.com">operations@kodagufc.com</a> </p></div>
          
         </div>
      </div>
      <div className="flex flex-col items-center md:gap-10  gap-5">
        <div className="flex gap-3">
          {data.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={item.image}
                alt={`Social icon ${index}`}
                width={36}
                height={38}
              />
            </a>
          ))}
        </div>
        <p>© 2025 by Kodagu FC</p>
      </div>
    </div>
  );
};

export default Footer;
