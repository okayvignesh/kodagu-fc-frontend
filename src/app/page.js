"use client";

import { ArrowUpRight, Calendar, Heart, Users } from "lucide-react";
import Image from "next/image";

import CircularProgressBar from "../components/ProgressLoader";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { MdFullscreen } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { TfiArrowTopRight } from "react-icons/tfi";
import ContributersList from "../components/ContributersList";
import { Image as NextImage } from "next/image";
import { useRouter } from "next/navigation";
import { ChartBarLabel } from "../components/chart";
import ContributerForm from "@/components/ContributerForm";
import DonationGridCanvas from "@/components/Grid";
import ENDPOINTS from "@/lib/apiconfig";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from "@/components/shared/header";


const imageData = [

  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4178_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4196_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4232_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4290_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4291_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4314_1_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4317_1_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4321_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4326_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4332_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4350_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4358_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4360_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4365_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4369_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4374_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4375_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4382_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4388_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4394_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4396_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4401_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4409_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4437_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4443_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4446_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4457_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4461_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4477_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4488_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4502_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4503_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4543_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4552_optimized_300.jpg",
  "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4559_optimized_300.jpg",
   "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4576_optimized_300.jpg",
    "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4601_optimized_300.jpg",
     "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_4636_optimized_300.jpg",
];
const startDate = new Date('2025-07-16'); // Replace with actual date of website launch   

function getDayCount() {
  const today = new Date();


  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffTime = now - start; // milliseconds difference
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1;
}

export default function Home() {
  const [isSelectedCard, setIsSelectedCard] = useState(null);
  const [openList, setOpenList] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recentDonations, setRecentDonations] = useState([]);
  const [topDonations, setTopDonations] = useState([]);
  const [openGrid, setOpenGrid] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);
 const [showAll, setShowAll] = useState(false);

  const [dayCount, setDayCount] = useState(getDayCount());
 const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };


  useEffect(() => {
    // Optional: update the day count at midnight automatically

    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0, 0
    );

    const msUntilMidnight = nextMidnight - now;

    const timer = setTimeout(() => {
      setDayCount(getDayCount());
    }, msUntilMidnight + 1000); // +1s to be safe after midnight

    return () => clearTimeout(timer);
  }, [dayCount]);
  const fetchDonations = async () => {
    try {
      const res = await fetch(ENDPOINTS.GETDONATION);
      if (!res.ok) throw new Error("Failed to fetch donations");
      const data = await res.json();

      setDonations(data?.data?.donations || []);
      setRecentDonations(data?.data?.recent_donations || []);
      setTopDonations(data?.data?.top_donations || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDonations();
  }, []);

  const TotalGrids = donations.reduce((sum, item) => sum + item.grids, 0);
  const totalFundraised = TotalGrids * 500;
  const bougntGrids = (TotalGrids / 100000) * 100;
  const boughtPercentage = bougntGrids.toFixed(2);
  console.log("total", boughtPercentage);
  const totalContributers = donations.length;
  const gap = 100000 - TotalGrids
  return (
    <div className="w-full flex flex-col gap-10 workSans">
       <div><Header setOpenForm={setOpenForm}/></div>
       <div className="-mt-10 ">
         <div className="flex lg:flex-row flex-col lg:gap-[100px] gap-[50px]  lg:px-[40px] md:px-10 px-5 pb-10 ">
        <div className="lg:max-w-[472px] w-full  flex flex-col gap-7">
      <div className="flex flex-col  lg:flex-row gap-3 w-full">
      
          <p className="text-[20px] text-justify  w-full mt-5  lg:hidden font-medium">Join us in building Kodagu’s first all-weather football field; ensuring every
            aspiring player trains year-round and competes equally with their urban peers.</p>
            </div>    
          <div className="rounded-[16px]  p-5  border gap-y-3 border-[#E3E3E3] shadow-md">
            <div className="flex justify-between gap-2">
              <p>Total Contributors</p>
              <Image
                src="/icons/users.svg"
                alt="usericon"
                width={18}
                height={19}
              />
            </div>
            <div className="flex justify-between items-end gap-1">
              <p className="font-bold text-[36px]">{totalContributers}</p>
              <div
                onClick={() => {
                  setOpenList(true);

                }}
                className="flex">
                <p className="underline font-semibold cursor-pointer">Contributors List</p> <ArrowUpRight />
              </div>
            </div>
          </div>
          <div className="shadow-md rounded-[15px]"> <ChartBarLabel data={donations} /></div>

          <div className="flex flex-col shadow-md gap-2  border border-gray-300 rounded-lg p-5 bg-[linear-gradient(to_bottom,_#145133,_#0C4520,_#31733F)]">
            <div className="flex justify-between items-center gap-3">
              <p className="text-white text-[20px] lg:text-[22px] flex-1 leading-tight">Percentage of field funded</p>
              <div className="flex-shrink-0">
                <CircularProgressBar boughtPercentage={boughtPercentage} />
              </div>
            </div>
            <button onClick={() => setOpenForm(true)} className="bg-white text-black px-3 py-2 rounded-[10px] cursor-pointer shadow-sm outline-0 ">Contribute Now</button>
          </div>
        </div>
        <div className="flex flex-col gap-7  w-full  ">
    <div className="flex justify-between items-center">
       <div className="flex  justify-between items-center">
            <p className="md:text-[28px] text-[20px]  workSans tracking-normal lg:hidden  font-bold  ">Your support, builds the field.<br/> 
              The field, enables learning. <br/> 
              That Learning, equips the aspiring. </p>

          </div>
         
      </div>    
          <div className="grid lg:grid-cols-2 grid-cols-1   gap-2 gap-y-3">
            <div

              className={`flex flex-col gap-2 w-full  p-[13.24px_11px] rounded-[5.52px]  shadow-md 
        bg-[linear-gradient(to_bottom,_#145133,_#0C4520,_#31733F)] text-white `}>
              <div className="flex justify-between"><p>Total fund raised</p>
                <FaHeart />
              </div>
              <p className="font-bold text-[24px] ">
                &#8377; {totalFundraised}
              </p>
            </div>
            <div

              className={`flex flex-col gap-2 w-full p-[13.24px_11px] rounded-[5.52px]  shadow-md 
         : 'bg-white text-black border border-[#E3E3E3]'}
        `}>
              <div className="flex justify-between"><p>Total sq ft funded</p>
                <MdFullscreen />
              </div>
              <p className="font-bold text-[24px] ">
                {TotalGrids} sq ft
              </p>
            </div>
            <div

              className={`flex flex-col gap-2 w-full p-[13.24px_11px] rounded-[5.52px]  shadow-md 
       bg-white text-black border border-[#E3E3E3]
        `}>
              <div className="flex justify-between"><p>The Gap</p>
                <TiDocumentText />
              </div>
              <p className="font-bold text-[24px] ">
                {gap} sq. ft
              </p>
            </div>
            <div

              className={`flex flex-col gap-2  p-[13.24px_11px] rounded-[5.52px]  shadow-md w-full
         bg-white text-black border border-[#E3E3E3]} `}>
              <div className="flex justify-between"><p>Day Number</p>
                <Calendar size={15} />
              </div>
              <p className="font-bold text-[24px] ">
                {dayCount}
              </p>
            </div>
          </div>
          <div className="flex flex-col   gap-[7px] border border-[#E3E3E3] rounded-[20px] p-[13.24px_11px] shadow-md ">
            <p className="font-bold">1 Grid = 1 sq.ft = &#8377;500</p>
            <div
              className="relative w- max-w-full aspect-[16/10] cursor-pointer rounded-lg overflow-hidden"

              onClick={() => setOpenGrid(true)}
            >
              {/* Grayscale background image */}
              <img
                src="/images/footballPitch.jpg"
                alt="Football pitch"
                height={487}
                width={689}
                className="absolute top-0 left-0 w-full h-full object-cover filter grayscale"
              />

              {/* Colored overlay clipped based on percentage */}
              <img
                src="/images/footballPitch.jpg"
                alt="Colored overlay"
                className="absolute top-0 left-0 w-full h-full object-cover"
                  height={487}
                width={689}
                style={{
                  clipPath: `inset(0 ${100 - boughtPercentage}% 0 0)`,
                  zIndex: 10,
                }}
              />

              {/* Tooltip */}
              {showTooltip && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 text-black px-4 py-2 rounded-md text-sm font-medium z-20">
                  Open Grid
                </div>
              )}
            </div>


          </div>
        </div>
      </div>
      <div className="flex flex-col gap-7 mx-5 md:mx-10  rounded-lg  md:px-10 md:py-11 p-5 bg-[url('/images/bgrecentdonations.png')] mb-10 bg-no-repeat bg-cover" >
        <div className="flex items-center gap-2  md:text-[40px]  text-[24px] font-bold text-white md:-mt-5 -mt-2 ">
          <TfiArrowTopRight className="mt-3" />
          Recent Donations
        </div>
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={8}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={10000}
            allowTouchMove={false}
            freeMode={true}
            className="w-full"
          >
            {recentDonations.map((donation) => (
              <SwiperSlide key={donation.id} className="!w-[300px] flex-shrink-0">
                <div
                  onClick={() => {
                    setSelectedDonation(donation);
                    setOpenGrid(true);
                  }}
                  className="bg-white flex flex-col gap-3 p-3 rounded-[10px] shadow-md h-full"
                >
                  <div className="flex flex-col bg-white gap-1 px-1 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-[20px]">{donation.name}</p>
                        <p className="text-[#8A8A8A]">{donation.grids} Grids</p>
                      </div>
                      <p className="font-semibold text-[20px]">&#8377;{donation.amount}</p>
                    </div>
                  </div>
                  {/* <p className="text-[20px] italic">&quot;{donation.message}&quot;</p> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="flex flex-col gap-7 mx-5 md:mx-10  rounded-lg md:px-10 md:py-11 p-5 bg-[#F7F7F7]" >
        <div className="flex items-center gap-2  md:text-[40px] text-[24px] font-bold text-black md:-mt-5 -mt-2  ">
          <TfiArrowTopRight className="mt-3" />
          Top 10 Donations
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">

          {topDonations.map((donation) => (

            <div
              key={donation.id}
              onClick={() => {
                setSelectedDonation(donation);
                setOpenGrid(true);
              }}
              className="bg-white flex flex-col gap-3 p-3 rounded-[10px] shadow-md h-full">
              <div className="flex flex-col bg-white  gap-1 px-1 py-3 ">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-[54px] h-[54px] rounded-full bg-[linear-gradient(to_bottom,_#145133,_#0C4520,_#31733F)]
                    text-[28px] text-white flex items-center justify-center">
                      {donation.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-[20px]">{donation.name}</p>
                      <p className="text-[#8A8A8A]">{donation.grids} Grids</p>
                    </div>
                  </div>
                  <p className="font-semibold text-[20px] ">&#8377;{donation.amount}</p>
                </div>

              </div>
              {/* <p className="text-[20px] italic">&quot;{donation.message}&quot;</p> */}
            </div>

          ))}

        </div>
      </div>
      <div className="md:p-10 p-5 flex flex-col gap-3">
          <p className="text-transparent bg-clip-text md:text-[40px] text-[24px] font-extrabold"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #145133, #0C4520, #31733F)',
            }}> About Project</p>
          <div className="flex  lg:flex-row flex-col md:gap-[108px] gap-10   " >
        <div className="lg:max-w-1/2 w-full flex flex-col gap-6" >
          <p className="md:text-[40px] text-[28px] p-0   font-bold">Transforming Our Ground, Empowering Our Players</p>
          <p className="text-[20px] text-justify ">The heart of this initiative is our ambition to convert Kodagu FC&apos;s
             traditional natural grass field into a state-of-the-art artificial turf facility.
             This upgrade is not just about infrastructure — it&apos;s about giving our players a consistent, safe, and
              professional-grade environment to train and compete, regardless of the season. <br /> <br />
            Our current field becomes waterlogged and unusable for grids Contributed during the monsoon, affecting 
            training schedules and player progress. With an all-weather turf, we&apos;re aiming to eliminate these interruptions and boost year-round development for hundreds of young footballers.
          </p>
        </div>
        <div className="width-full height-full mt-3"> 
          <Image src="/images/publicpitch.png" alt="image" width={600} height={520}
           className="object-cover"
          />
        </div>
      </div></div>
    
      <div className="md:p-10 p-5 flex flex-col gap-11">
        <h1 className="md:text-[40px] text-[28px] font-bold  ">Gallery</h1>
        <div className="relative overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={40}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={10000}
            allowTouchMove={false}
            className="w-full flex gap-10"
          >
           {imageData.map((src, index) => (
  <SwiperSlide key={index} className="!w-[240px] flex-shrink-0">
    <div className="relative w-[240px] h-[240px] rounded-[10px] flex overflow-hidden">
      <Image
        src={src}
        alt={`Gallery image ${index + 1}`}
        fill
        className={`object-cover ${
          src === "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_8637_optimized_300.jpg"
            ? "-rotate-90"
            : ""
        }`}
      />
    </div>
  </SwiperSlide>
))}

          </Swiper>
        </div>
      </div>
      <div className="flex flex-col gap-10 md:p-10  p-0 py-5 px-2 bg-[#F7F7F7]">
        <h1 className="md:text-[40px]  text-[28px] font-bold pl-3 ">FAQ's </h1>
        <div className="flex  flex-col gap-2">
          <div className="flex   md:items-center items-start  gap-2  font-bold text-[24px]"
           onClick={() => handleToggle(0)}
          >
            <div className="h-6 w-6 shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
              <span className="pb-[4px]">{openIndex === 0 ? "-" : "+"}</span></div> <p className="text-base md:text-2xl">What is this fundraising initiative about?</p> </div>
        {openIndex === 0 && (   <p className="md:text-[20px] text-[16px] font-light  pl-8">We are raising funds to build a FIFA-standard artificial turf football field in
            Kodagu — an all-weather facility that will serve as the home ground for Kodagu
            FC and a hub for football education in the region. The larger vision is to create a
            full-fledged football centre with supporting infrastructure which can make the
            sport accessible to aspiring footballers.</p>
        )}
        </div>
        <div className="flex flex-col text-[20px]">
          <div className="flex   md:items-center items-start gap-2  font-bold text-[24px]"
          onClick={() => handleToggle(1)}>
            <div className="h-6 w-6 shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
              <span className="pb-[4px]">{openIndex === 1 ? "-" : "+"}</span></div> <p className="text-base md:text-2xl">What is the problem we are trying to solve?</p></div>
        {openIndex === 1 && (   <p className=" text-[16px] md:text-[20px] font-light pl-8 ">The Problem We are Solving
            Kodagu, despite its talent base, is held back by a harsh six-month monsoon
            season that severely disrupts training and development. During this period,
            natural grounds usually become unplayable, halting progress for young players
            who need consistent, year-round preparation. <br /><br />
            Meanwhile, professional leagues, scouting events, and youth competitions in
            urban centers continue uninterrupted — creating a gap that disadvantages
            players from Kodagu. Rain may stop play here, but opportunity elsewhere
            doesn’t wait. This seasonal limitation means our players miss critical windows
            for growth, selection, and performance on bigger stages. <br /><br />
            With the senior division pre-season and the junior division leagues kicking off
            just as the rains begin, we are forced to move to Bangalore, lugging our entire
            squad, coaches, and support staff for a period of 6 long months. We seek
            refuge on artificial turf in Bangalore while being dependent on rented facilities
            and services. <br /><br />
            While the senior team still manage to hone their skills on artificial turf, the
            juniors in the academy at Kodagu struggle with irregular practice sessions,
            stalling their progress. This setback not only disrupts momentum but also
            inflates operational costs, making it tough to keep the club's activities running
            smoothly. It is a financial strain for us and a blow to the morale of aspiring kids. <br /><br />
            Worse still, the lack of a reliable training facility deters quality coaches from
            joining, depriving Kodagu of mentorship for its budding talents. It's a tale of
            perseverance against the elements, where the quest for success is washed in
            rain and uncertainty. This isn't just a problem for the club; it's a blow to the
            dreams of kids and youngsters who aspire to play football. Without a solid
            infrastructure for consistent training, the beautiful game struggles to progress
            in Kodagu.</p>)}
        </div>
         <div className="flex flex-col gap-2">
          <div className="flex gap-2  md:items-center items-start font-bold text-[24px]"
            onClick={() => handleToggle(6)}>
            <div className="h-6 w-6  shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
              <span className="pb-[4px]">{openIndex === 6 ? "-" : "+"}</span></div> <p className="text-base md:text-2xl">How can I contribute?</p>  </div>
         {openIndex === 6 && (  <p className="md:text-[20px] text-base font-light  pl-8 ">You can contribute directly through this website. We offer simple payment
            options. Every contribution big or small helps us move closer to our goal.
          </p>)}
        </div>
         {showAll && (
        <div className="flex flex-col gap-2">
          <div className="flex   md:items-center items-start gap-2  font-bold text-[24px]"
          onClick={() => handleToggle(2)}>
            <div className="h-6 w-6 shrink-0  items-center flex justify-center  rounded-full bg-black  text-white">
              <span className="pb-1">{openIndex === 2 ? "-" : "+"}</span>
            </div>
            <p className="text-base md:text-2xl"> What is the beneficial impact of having an all weather FIFA-Certified Artificial
            Football Turf in Kodagu? </p>
            </div>
         {openIndex === 2 && (  <div className="md:text-[20px] text-base font-light pl-8 ">Impact of Having a FIFA-Certified Artificial Football Turf in Kodagu :
            <p className="font-semibold">  1. Year-Round Training & Uninterrupted Development</p>
            <ul >
              <li>  - Enables continuous grassroots and youth football programs despite Kodagu’s
                6-month monsoon.</li>
              <li>  - Provides a consistent, high-quality surface for player development at all
                levels.</li>
              <li> - Ensures players maintain fitness, technical skills, and tactical awareness
                throughout the year.</li>
            </ul>

            <p className="font-semibold">  2. Professional-Quality Playing Conditions</p>
            <ul >
              <li>   - Offers a top-tier surface that meets international standards for training and
                matches.</li>
              <li>  - Reduces injury risks compared to uneven or poorly maintained grass fields.</li>
              <li>   - Allows players to train like professionals, preparing them for higher levels of
                competition.</li>
            </ul>

            <p className="font-semibold">   3. Attracting & Retaining Talent</p>
            <ul>
              <li>    - Encourages more young players to take up football seriously with world-class
                infrastructure.</li>
              <li>  - Attracts better coaches, trainers, and scouts from across the country,
                strengthening Kodagu FC’s development pipeline.</li>
              <li>   - Retains and motivates local talent, reducing the need to travel to other cities
                for better facilities.</li>
            </ul>

            <p className="font-semibold">    4. Hosting High-Quality Matches & Tournaments</p>
            <ul >
              <li>     - Enables state and national-level tournaments to be hosted in Kodagu.</li>
              <li>   - Provides Kodagu with a home ground for competitive matches.</li>
              <li>  - Inspires young players by allowing them to watch and learn from top-level
                football in their own region.</li>
            </ul>

            <p className="font-semibold">      5. Strengthening Kodagu’s Brand & Football Ecosystem</p>
            <ul >
              <li>   - Establishes Kodagu as a leading football development hub in Karnataka.</li>
              <li>    - Enhances sponsorship and investment opportunities by showcasing top-class
                infrastructure.</li>
              <li>  - Positions Kodagu as a footballing destination, boosting local sports tourism
                and economy.</li>
              <li> - Positions Kodagu as a footballing destination, boosting local sports tourism
                and economy.</li>
            </ul>


            <p className="font-semibold">       6. Long-Term Sustainability & Growth</p>
            <ul >
              <li>   - Establishes Kodagu as a leading football development hub in Karnataka.</li>
              <li>    - Reduces maintenance costs compared to natural grass fields.</li>
              <li>  - Ensures higher utilization rates, maximizing the facility for training, matches,
                and events.</li>
              <li>    - Creates a self-sustaining football ecosystem, benefiting players, coaches, and
                the broader community.</li>
            </ul>
          </div>)}
        </div>)}
        {showAll && (
        <div className="flex flex-col gap-2">
          <div className="flex  md:items-center items-start gap-2  font-bold text-[24px]"
            onClick={() => handleToggle(3)}>
            <div className="h-6 w-6  shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
              <span className="pb-[4px]">{openIndex === 3 ? "-" : "+"}</span></div><p className="text-base md:text-2xl"> Without an all weather FIFA-Certified Artificial Football Turf in Kodagu, what is
            the scale of set back? </p></div>
          {openIndex === 3 && ( <div className="md:text-[20px] text-base font-light pl-8">
            <p className="font-semibold" > 1. Disrupts Player Development & Skill Progression</p>
            <ul className="mb-2" >
              <li>Inconsistent Training: Long gaps in training hinder skill acquisition and
                development.</li>
              <li>Loss of Momentum: Young players struggle to maintain fitness,
                technique, and tactical awareness.</li>
              <li>Delayed Learning Curve: Players take longer to grasp essential
                footballing principles due to interruptions.</li>
            </ul>
            <p className="font-semibold ">2. Physical & Tactical Setbacks</p>
            <ul className="mb-2">
              <li>Reduced Match Readiness: Players lose sharpness, match fitness, and
                confidence.</li>
              <li>Limited Tactical Growth: Lack of regular practice hampers team
                coordination and game understanding.</li>
              <li>Injury Risks Increase: Players returning after long breaks are more
                prone to injuries due to sudden workload.</li>
            </ul>
            <p className="font-semibold">3. Weakens Grassroots & Youth Football Pipeline</p>
            <ul className="mb-2">
              <li>Fewer Scouting & Exposure Opportunities: Without consistent training
                and matches, young talents miss chances to be identified.</li>

              <li>Reduced Player Retention: Extended breaks may lead to loss of
                interest and motivation among young players.</li>
              <li>Lack of Competitive Spirit: Without regular matches, players struggle
                to develop a winning mentality  </li>
            </ul>
            <p className="font-semibold">4. Affects Growth & Football Ecosystem</p>
            <ul className="mb-2">
              <li>Struggles to Build a Strong Squad: Training disruptions make it harder
                to develop a competitive team.
              </li>

              <li>Difficulty in Maintaining a Structured Program: Long breaks make it
                challenging to implement a well-planned football curriculum.</li>
              <li>Lower Attraction for Coaches & Scouts: Inconsistent training
                environments deter high-level coaching and scouting opportunities. </li>
            </ul>
          </div>)}
        </div>)}
        {showAll && (
        <div className="flex flex-col gap-2">
          <div className="flex md:items-center items-start  gap-2  font-bold text-[24px]"
            onClick={() => handleToggle(4)}>
            <div className="h-6 w-6  shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
              <span className="pb-[4px]">{openIndex === 4 ? "-" : "+"}</span></div>
              <p className="text-base md:text-2xl">  What does Phase 1 include? </p></div>
         {openIndex === 4 && (  <p className="md:text-[20px] text-base font-light pl-8">Phase 1 covers the installation of artificial turf, ground preparation, drainage
            systems, lighting and the clearance area around the field which also enables
            warm up. This phase focuses on creating a top-quality playing surface that can
            be used year-round by aspiring players and the local football community.</p>
         )}
        </div>)}
        {showAll && (
          <div className="flex flex-col gap-2">
          <div className="flex   md:items-center items-start gap-2  font-bold text-[24px]"
            onClick={() => handleToggle(5)}>
            <div className="h-6 w-6  shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
              <span className="pb-[4px]">{openIndex === 5 ? "-" : "+"}</span></div>
              <p className="text-base md:text-2xl"> What is the total cost of Phase 1? </p></div>
        {openIndex === 5 && (   <p className="md:text-[20px] text-base font-light  pl-8 ">The estimated cost of Phase 1 is ₹5 crores. We are inviting individuals, families, and organizations
            to contribute and be part of this foundational step.</p>)}
        </div> )}
          {showAll && (
         <div className="flex flex-col gap-2">
          <div className="flex  md:items-center items-start gap-2  font-bold text-[24px]"
            onClick={() => handleToggle(7)}>
            <div className="h-6 w-6 shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
              <span className="pb-[4px]">{openIndex === 7 ? "-" : "+"}</span></div> 
              <p className="text-base md:text-2xl">Is there a minimum amount I can donate?</p> </div>
           {openIndex === 7 && (<p className="md:text-[20px] text-base font-light  pl-8">Yes, the minimum contribution starts at ₹500, which symbolically represents
            sponsoring 1 square foot of the turf. You can choose to sponsor multiple square
            feet.
          </p>)}
        </div>)}
         {showAll && (
        <div className="flex flex-col gap-2">
          <div className="flex  md:items-center items-start gap-2  font-bold text-[24px]"
            onClick={() => handleToggle(8)}>
            <div className="h-6 w-6 shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
              <span className="pb-[4px]">{openIndex === 8 ? "-" : "+"}</span></div> <p className="text-base md:text-2xl">Will I get a receipt or proof of donation?</p></div>
        {openIndex === 8 && (   <p className="md:text-[20px] text-base font-light  pl-8 ">Yes, you will receive an acknowledgment and a digital receipt via email once
            your contribution is processed and verified. This typically takes up to 24 hours after you contribute. All donations are routed through Subbayas Centre for
            Humanity & Excellence Trust, a registered charitable trust.
          </p>)}
        </div>)}
         {showAll && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2  md:items-center items-start font-bold text-[24px]"
            onClick={() => handleToggle(9)}>
            <div className="h-6 w-6 shrink-0  flex items-center justify-center  rounded-full bg-black  text-white">
              <span className="pb-[4px]">{openIndex === 9 ? "-" : "+"}</span></div>
              <p className="text-base md:text-2xl">Is my donation tax-deductible?</p></div>
        {openIndex === 9 && (   <p className="md:text-[20px] text-base font-light  pl-8">Yes, donations are eligible for tax deduction under Section 80G of the Income
            Tax Act.
          </p>)}
        </div>)}
         {showAll && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2  md:items-center items-start font-bold text-[24px]"
            onClick={() => handleToggle(10)}>
            <div className="h-6 w-6 shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
              <span className="pb-[4px]">{openIndex === 10 ? "-" : "+"}</span></div>
              <p className="text-base md:text-2xl">How can I track the progress of the project?</p></div>
         {openIndex === 10 && (  <p className="md:text-[20px] text-base font-light  pl-8 ">We will share regular updates on this website and our social media handles.
            Donors can also view their contribution marked live on our interactive turf grid,
            visualizing the collective progress.
          </p>)}
        </div>)}
         {showAll && (
        <div className="flex flex-col gap-2">
          <div className="flex  gap-2  md:items-center items-start font-bold text-[24px]"
            onClick={() => handleToggle(11)}>
            <div className="h-6 w-6  shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
              <span className="pb-[4px]">{openIndex === 11 ? "-" : "+"}</span></div>
              <p className="text-base md:text-2xl">Can I dedicate my contribution in someone’s name?</p></div>
         {openIndex === 11 && (  <p className="md:text-[20px] text-base font-light pl-8 ">Yes, you can dedicate your contribution to a loved one. Let us know during the
            donation process, and we will reflect it appropriately on our digital wall of
            supporters.
          </p>)}
        </div>)}
         {showAll && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2  md:items-center items-start font-bold text-[24px]"
            onClick={() => handleToggle(12)}>
            <div className="h-6 w-6  shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
              <span className="pb-[4px]">{openIndex === 12 ? "-" : "+"}</span></div>
              
             <p className="text-base md:text-2xl"> Who is behind this initiative?</p></div>
       {openIndex === 12 && (    <p className="md:text-[20px] text-base font-light  pl-8 ">The project is led by Kodagu FC, under the aegis of Subbayas Centre for
            Humanity and Excellence Trust, a grassroots initiative committed to developing
            footballers across Kodagu through structured training, and access to
            opportunities.
          </p>)}
        </div>)}
        <button
  onClick={() => setShowAll(!showAll)}
  className="  cursor-pointer"
>
  {showAll ? "Show Less Questions " : "Show More Questions "}
</button>
      </div>

      <div className="ml-10 ">
        {
          openGrid && (<DonationGridCanvas data={donations}
            selectedDonation={selectedDonation}
            onClose={() => setOpenGrid(false)} />)
        }
      </div>
      {
        openList && (
          <ContributersList onClose={() => setOpenList(false)} data={donations} />
        )
      }
      {
        openForm && (
          <ContributerForm onClose={() => setOpenForm(false)} />
        )
      }
       </div>
     
    </div>
  );
}
