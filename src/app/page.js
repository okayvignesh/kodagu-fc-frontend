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
import Mission from "@/components/Mission";


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
  const gap = 100000 - TotalGrids;
  const fundGap = 50000000 - totalFundraised;
  return (
    <div className="w-full flex flex-col gap-10 workSans">
      <div><Header setOpenForm={setOpenForm} /></div>
      <div className="-mt-10 ">
        <div className="flex flex-col lg:flex-row items-start lg:gap-[80px] gap-[40px] px-5 md:px-10 lg:px-[40px] pb-10">
          {/* Left Section */}
          <div className="w-full lg:max-w-[472px] flex flex-col gap-7">
            {/* Top Message for Mobile */}
            <div className="flex flex-col lg:flex-row gap-3 w-full">
              <p className="text-[20px] text-justify w-full mt-5 lg:hidden font-medium">
                Join us in building Kodagu’s first all-weather football field; ensuring every aspiring player trains year-round and competes equally with their urban peers.
              </p>
            </div>

            {/* Circular Progress Card */}
            <div className="flex flex-col shadow-md gap-2 border border-gray-300 rounded-lg p-5 bg-gradient-to-b from-[#145133] via-[#0C4520] to-[#31733F] h-[180px]">
              <div className="flex justify-between items-center gap-3">
                <p className="text-white text-[20px] lg:text-[22px] flex-1 leading-tight">Percentage of field funded</p>
                <div className="flex-shrink-0">
                  <CircularProgressBar boughtPercentage={boughtPercentage} />
                </div>
              </div>
              <button
                onClick={() => setOpenForm(true)}
                className="bg-white text-black px-3 py-2 rounded-[10px] cursor-pointer shadow-sm outline-0"
              >
                Contribute Now
              </button>
            </div>

            {/* Total Contributors */}
            <div className="rounded-[16px] p-5 border gap-y-3 border-[#E3E3E3] shadow-md">
              <div className="flex justify-between gap-2">
                <p>Total Contributors</p>
                <Image src="/icons/users.svg" alt="usericon" width={18} height={19} />
              </div>
              <div className="flex justify-between items-end gap-1">
                <p className="font-bold text-[36px]">{totalContributers}</p>
                <div onClick={() => setOpenList(true)} className="flex items-center gap-1 cursor-pointer">
                  <p className="underline font-semibold">Contributors List</p> <ArrowUpRight />
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="shadow-md rounded-[15px]">
              <ChartBarLabel data={donations} />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-7 w-full">
            <div className="flex justify-between items-center">
              <p className="md:text-[28px] text-[20px] workSans tracking-normal lg:hidden font-bold">
                Your support, builds the field. <br />
                The field, enables learning. <br />
                That Learning, equips the aspiring.
              </p>
            </div>

            {/* Fund Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="flex flex-col gap-2 w-full p-4 rounded-[5.52px] shadow-md bg-gradient-to-b from-[#145133] via-[#0C4520] to-[#31733F] text-white">
                <div className="flex justify-between">
                  <p>Total fund raised</p>
                  <FaHeart />
                </div>
                <p className="font-bold text-[24px]">&#8377; {totalFundraised}</p>
              </div>

              <div className="flex flex-col gap-2 w-full p-4 rounded-[5.52px] shadow-md bg-white text-black border border-[#E3E3E3]">
                <div className="flex justify-between">
                  <p>The Gap</p>
                  <TiDocumentText />
                </div>
                <p className="font-bold text-[24px]">&#8377; {fundGap}</p>
              </div>

              <div className="flex flex-col gap-2 w-full p-4 rounded-[5.52px] shadow-md bg-white text-black border border-[#E3E3E3]">
                <div className="flex justify-between">
                  <p>Total grids funded</p>
                  <MdFullscreen />
                </div>
                <p className="font-bold text-[24px]">{TotalGrids} grids</p>
              </div>

              <div className="flex flex-col gap-2 w-full p-4 rounded-[5.52px] shadow-md bg-white text-black border border-[#E3E3E3]">
                <div className="flex justify-between">
                  <p>The Gap</p>
                  <TiDocumentText />
                </div>
                <p className="font-bold text-[24px]">{gap} grids</p>
              </div>
            </div>

            {/* Pitch Image Grid */}
            <div className="flex flex-col gap-[7px] border border-[#E3E3E3] rounded-[20px] p-4 shadow-md">
              <p className="font-bold">1 Grid = &#8377;500</p>
              <div
                className="relative w-full aspect-[16/10] cursor-pointer rounded-lg overflow-hidden"
                onClick={() => setOpenGrid(true)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <img
                  src="/images/footballPitch.jpg"
                  alt="Football pitch"
                  height={487}
                  width={689}
                  className="absolute top-0 left-0 w-full h-full object-cover filter grayscale"
                />
                <img
                  src="/images/footballPitch.jpg"
                  alt="Colored overlay"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  height={487}
                  width={689}
                  style={{ clipPath: `inset(0 ${100 - boughtPercentage}% 0 0)`, zIndex: 10 }}
                />
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
                    className="bg-white flex flex-col justify-between p-4 rounded-lg shadow-md w-full min-h-[150px] max-h-[220px] hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex flex-col flex-grow overflow-hidden">
                      <p className="font-semibold text-[18px] text-gray-800 break-words">
                        {donation.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{donation.grids} Grids</p>
                    </div>

                    <div className="pt-2 text-right">
                      <p className="text-lg font-bold text-green-700">&#8377;{donation.amount}</p>
                    </div>
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

        {/* <div className="md:p-10 p-5 flex flex-col gap-3">
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
          </div>
        </div> */}

        <Mission />

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
                      className={`object-cover ${src === "https://kodagu-backend.s3.ap-south-1.amazonaws.com/gallery/V_J_8637_optimized_300.jpg"
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
                <span className="pb-[4px]">{openIndex === 0 ? "-" : "+"}</span></div> <p className="text-base md:text-2xl"> How can I support this project?</p> </div>
            {openIndex === 0 && (<p className="md:text-[20px] text-[16px] font-light  pl-8">You can support this project by contributing towards as many grids as you wish. Each grid represents a unit of the overall project, helping us break down the total cost into achievable parts. Our goal is to complete 1,00,000 such grids to achieve the target.
            </p>
            )}
          </div>
          <div className="flex flex-col text-[20px]">
            <div className="flex   md:items-center items-start gap-2  font-bold text-[24px]"
              onClick={() => handleToggle(1)}>
              <div className="h-6 w-6 shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
                <span className="pb-[4px]">{openIndex === 1 ? "-" : "+"}</span></div> <p className="text-base md:text-2xl">How can I Donate and what is the minimum amount?
              </p></div>
            {openIndex === 1 && (<p className=" text-[16px] md:text-[20px] font-light pl-8 ">You can click on “Contribute now” button which will guide you through to the form to be filled
              and submitted with your donation. Please ensure you upload the payment proof for our
              records.<br />
              The minimum contribution starts at ₹500, symbolically representing your support for one unit of the project, i.e One Grid. You can choose to sponsor as many units / grids as you would like. Our collective goal is to reach 1,00,000 such units / grids to complete the field.</p>)}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2  md:items-center items-start font-bold text-[24px]"
              onClick={() => handleToggle(6)}>
              <div className="h-6 w-6  shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
                <span className="pb-[4px]">{openIndex === 6 ? "-" : "+"}</span></div> <p className="text-base md:text-2xl">How is my donation acknowledged?</p>  </div>
            {openIndex === 6 && (<p className="md:text-[20px] text-base font-light  pl-8 ">Once you donate, you become part of the legacy. Your donation will symbolize the
              number of grids against the amount. It is acknowledged in the below manner:<br />
              a) Your name and your donation details will be mentioned on the contributors list. If
              you are the highest contributor your name is listed in the Top 10 donors aswell.<br />
              b) The grids your donation absorbs is mapped and reflected on the larger field grid
              for everyone to see.<br />
              c) You can anytime go and see the grids you have absorbed.<br />
              d) Everyone will be able to see your name and your dedicated message towards the
              project from the contributors list and the Field grids.<br />
              e) Organizations with larger donations can also have their logos reflected on the
              Donated grids.
            </p>)}
          </div>
          {showAll && (
            <div className="flex flex-col gap-2">
              <div className="flex   md:items-center items-start gap-2  font-bold text-[24px]"
                onClick={() => handleToggle(2)}>
                <div className="h-6 w-6 shrink-0  items-center flex justify-center  rounded-full bg-black  text-white">
                  <span className="pb-1">{openIndex === 2 ? "-" : "+"}</span>
                </div>
                <p className="text-base md:text-2xl"> Will I get a receipt or proof of donation? </p>
              </div>
              {openIndex === 2 && (<div className="md:text-[20px] text-base font-light pl-8 ">Yes, you will receive an acknowledgment and a digital receipt via email once your
                contribution is processed and verified. This typically takes up to 24 to 48 hours after
                you contribute.<br />
                All donations are routed through Subbayas Centre for Humanity & Excellence Trust,
                which is a registered charitable trust.
              </div>)}
            </div>)}
          {showAll && (
            <div className="flex flex-col gap-2">
              <div className="flex md:items-center items-start  gap-2  font-bold text-[24px]"
                onClick={() => handleToggle(4)}>
                <div className="h-6 w-6  shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
                  <span className="pb-[4px]">{openIndex === 4 ? "-" : "+"}</span></div>
                <p className="text-base md:text-2xl">Is my donation Tax exempted? </p></div>
              {openIndex === 4 && (<p className="md:text-[20px] text-base font-light pl-8">Yes, donations are eligible for Tax exemption under 80G</p>
              )}
            </div>)}
          {showAll && (
            <div className="flex flex-col gap-2">
              <div className="flex   md:items-center items-start gap-2  font-bold text-[24px]"
                onClick={() => handleToggle(5)}>
                <div className="h-6 w-6  shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
                  <span className="pb-[4px]">{openIndex === 5 ? "-" : "+"}</span></div>
                <p className="text-base md:text-2xl">Can I dedicate my contribution in someone’s name?</p></div>
              {openIndex === 5 && (<p className="md:text-[20px] text-base font-light  pl-8 ">Yes, you can dedicate your contribution to a loved one. During the contribution process, in
                the message section please mention the name you want to dedicate it to along with a message
                supporting that Dedication. The message will be highlighted as you want.
                You can mention the name in the Full Name Section as well. However, if you would need a
                receipt for tax exemption then the donor has to mention his/her name. But in the message
                section they can dedicate it to anyone. </p>)}
            </div>)}
          {showAll && (
            <div className="flex flex-col gap-2">
              <div className="flex  md:items-center items-start gap-2  font-bold text-[24px]"
                onClick={() => handleToggle(7)}>
                <div className="h-6 w-6 shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
                  <span className="pb-[4px]">{openIndex === 7 ? "-" : "+"}</span></div>
                <p className="text-base md:text-2xl">What does this Phase of the Project include and what is the total cost?</p> </div>
              {openIndex === 7 && (<p className="md:text-[20px] text-base font-light  pl-8">This phase covers the ground preparation, drainage systems, installation of all-weather
                football turf, lighting, appropriate clearance and boundary area around the field, Dug outs and
                basic amenities around it.
                It focuses on creating a top-quality playing surface that can be used year-round by aspiring
                players and the local football youth community.
                The estimated cost of this Phase is ₹5 crores.
              </p>)}
            </div>)}
          {showAll && (
            <div className="flex flex-col gap-2">
              <div className="flex  md:items-center items-start gap-2  font-bold text-[24px]"
                onClick={() => handleToggle(8)}>
                <div className="h-6 w-6 shrink-0 flex items-center justify-center  rounded-full bg-black  text-white">
                  <span className="pb-[4px]">{openIndex === 8 ? "-" : "+"}</span></div> <p className="text-base md:text-2xl">How can I track the progress of the project?</p></div>
              {openIndex === 8 && (<p className="md:text-[20px] text-base font-light  pl-8 ">You can continue to visit, stadium.kodagufc.com for all the updates on the fundraising and
                the project. The Dashboard will give you regular updates. We will try to keep it on real time
                as possible.<br />
                Once we achieve the funds needed you will find the project shaping up on the field in detail.
                The project progression report will be put up for every donor to check.
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
