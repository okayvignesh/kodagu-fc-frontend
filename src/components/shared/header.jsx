import Image from 'next/image';
import React from 'react'

const Header = ({setOpenForm}) => {
      const goToMainPage = () => {
        window.open('https://www.kodagufc.com/', '_blank');
      }
  return (
   <div className='flex justify-between items-center lg:gap-[100px]  md:gap-[50px] gap-[20px] pl-5 md:pr-10 pr-5'>
      <div className='flex max-w-[492px] items-center' >
      <div className='w-[150%]'>
        <Image src="/images/logo_main.png" alt="Logo" width={150} height={145} />
        </div>  
        <p className='text-[20px] text-left  font-medium hidden lg:block'>Join us in building Kodagu’s first all-weather football field, ensuring every
            aspiring player trains year-round.</p>
      </div>
      <div className='flex items-center lg:justify-between  justify-end w-full gap-5 mt-[5px]'>
        <p className='text-[24px] text-justify max-w-[600px] font-bold hidden lg:block'>Your Support, Builds The Field. <br></br>The Field, Enables Learning.<br></br> That Learning, Equips The Aspiring.</p>
        <div className='flex flex-col gap-4'>
            <button onClick={goToMainPage} className="bg-black text-white px-[22px] py-2 text-xs md:text-base  cursor-pointer rounded-lg  shadow-md 
        bg-[linear-gradient(to_bottom,_#145133,_#0C4520,_#31733F)] text-white">Visit Website</button>
            <button onClick={() => setOpenForm(true)} className="bg-black text-white px-3 py-2  text-xs md:text-base cursor-pointer rounded-lg  shadow-md 
        bg-[linear-gradient(to_bottom,_#145133,_#0C4520,_#31733F)] text-white">Contribute Now</button>
        </div>
      </div>
   </div>
  )
}

export default Header