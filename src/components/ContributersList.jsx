"use client";
import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import ENDPOINTS from '../lib/apiconfig';
import DonationGridCanvas from './Grid';
import { useRouter } from 'next/navigation';

const ContributersList = ({ onClose, data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [donations, setDonations] = useState([]);
  const [openGrid, setOpenGrid] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(ENDPOINTS.GETCONTRIBUTORLIST);
const router = useRouter();
  const fetchContributors = (url) => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setDonations(data.data.results);
        setNextUrl(data.data.next);
        setPrevUrl(data.data.previous);
        setCurrentUrl(url); // Save current URL for relative pagination
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  useEffect(() => {
    fetchContributors(ENDPOINTS.GETCONTRIBUTORLIST);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const queryUrl = `${ENDPOINTS.GETCONTRIBUTORLIST}?query=${encodeURIComponent(searchTerm)}`;
      fetchContributors(queryUrl);
    }, 500); 

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

   useEffect(() => {
      // Push a dummy state when modal opens
      window.history.pushState({ modalOpen: true }, '');
  
      const handlePopState = () => {
        if (onClose) {
          onClose(); // close modal
        } else {
          router.replace('/'); // fallback to redirecting home
        }
      };
  
      window.addEventListener('popstate', handlePopState);
  
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }, [router, onClose]);
  return (
    <div className='fixed inset-0 backdrop-blur bg-opacity-30 flex justify-center items-center z-50'>
      <div className='w-full h-full bg-white p-6 rounded-2xl shadow-md'>
        {/* Header */}
        <div className='flex flex-wrap gap-2 justify-between mb-4'>
          <div
            onClick={onClose}
            className='text-[20px] flex items-center gap-3 font-bold cursor-pointer'
          >
            <ArrowLeft /> Back
          </div>
          <div className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md'>
            <input
              type="text"
              id="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:outline-none focus:ring-0"
            />
            <label htmlFor='search'><IoIosSearch /></label>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Sl. No</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Grids</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Messages</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Show Grids</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.length > 0 ? (
                donations.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.grids}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">&#8377;{item.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => {
                          setSelectedDonation(item);
                          setOpenGrid(true);
                        }}
                        className="border-black border py-1 px-3 rounded-full"
                      >
                        Show Grids
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={() => prevUrl && fetchContributors(prevUrl)}
            disabled={!prevUrl}
            className={`px-4 py-2 border rounded-lg hover:bg-black text-white bg-neutral-800 ${!prevUrl ? 'hidden opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          <button
            onClick={() => nextUrl && fetchContributors(nextUrl)}
            disabled={!nextUrl}
            className={`px-7 py-2 border rounded-lg hover:bg-black text-white bg-neutral-800 ${!nextUrl ? 'hidden opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Grid Popup */}
      {openGrid && (
        <DonationGridCanvas
          data={data}
          onClose={() => setOpenGrid(false)}
          selectedDonation={selectedDonation}
        />
      )}
    </div>
  );
};

export default ContributersList;
