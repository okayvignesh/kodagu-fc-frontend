import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import ENDPOINTS from "@/lib/apiconfig";
import { useRouter } from "next/navigation";
const GRID_COLS = 250;
const GRID_ROWS = 400;
const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 1980;
const CELL_WIDTH = CANVAS_WIDTH / GRID_COLS;
const CELL_HEIGHT = CANVAS_HEIGHT / GRID_ROWS;
const PRICE_PER_GRID = 500;

const DonationGridCanvas = ({ data, onClose, selectedDonation }) => {
  const canvasRef = useRef(null);
  const tooltipRef = useRef(null);
  const [image, setImage] = useState(null);
  const cellsRef = useRef([]);
  const [highlightedDonor, setHighlightedDonor] = useState(null);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // New state to store detailed API response for clicked donation
  const [donationId, setDonationId] = useState(null);
  const [donationByIdResponse, setDonationByIdResponse] = useState(null);

  useEffect(() => {
    if (!donationId) return;

    const fetchDonationById = async () => {
      try {
        const response = await fetch(
          `${ENDPOINTS.GETDONATIONBYID}?id=${donationId}`, // fixed URL
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setDonationByIdResponse(data);
      } catch (error) {
        console.error("Error fetching donation:", error);
      }
    };

    fetchDonationById();
  }, [donationId]);

  const donations = React.useMemo(() => {
    const map = {};
    if (Array.isArray(data)) {
      let globalIndex = 0;
      data.forEach((donation) => {
        for (let i = 0; i < donation.grids; i++) {
          if (globalIndex >= GRID_COLS * GRID_ROWS) break;
          map[globalIndex] = {
            name: donation.name || "Anonymous",
            id: donation.id,
            amount: PRICE_PER_GRID,
            message: donation.message || "click to know more about grid owner",
          };
          globalIndex++;
        }
      });
    }
    return map;
  }, [data]);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/footBallPitchVertical.jpg";
    img.onload = () => {
      setImage(img);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    cellsRef.current = [];

    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = CANVAS_WIDTH;
    offscreenCanvas.height = CANVAS_HEIGHT;
    const offscreenCtx = offscreenCanvas.getContext("2d");
    offscreenCtx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.filter = "brightness(.5)";
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.filter = "none";

    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const x = col * CELL_WIDTH;
        const y = row * CELL_HEIGHT;
        const cellIndex = row * GRID_COLS + col;
        cellsRef.current.push({ x, y, index: cellIndex });

        const donation = donations[cellIndex];

        if (donation) {
          const imageData = offscreenCtx.getImageData(x, y, CELL_WIDTH, CELL_HEIGHT);
          ctx.putImageData(imageData, x, y);

          if (selectedDonation && donation.id === selectedDonation.id) {
            ctx.fillStyle = "rgba(0,255,0,0.9)";
            ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
          }


          if (highlightedDonor && donation.name === highlightedDonor) {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 2;
          } else {
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 1;
          }
        } else {
          ctx.fillStyle = "rgba(128,128,128,0.8)";
          ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
          ctx.strokeStyle = "rgba(128,128,128,0.4)";
          ctx.lineWidth = 1;
        }

        ctx.strokeRect(x, y, CELL_WIDTH, CELL_HEIGHT);
      }
    }
  }, [image, donations, highlightedDonor, selectedDonation]);

  const handleMouseMove = (e) => {
    // If we have detailed API data from clicked cell, don't show hover tooltip
    if (donationByIdResponse) return;

    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let found = false;

    for (const cell of cellsRef.current) {
      if (
        mouseX >= cell.x &&
        mouseX <= cell.x + CELL_WIDTH &&
        mouseY >= cell.y &&
        mouseY <= cell.y + CELL_HEIGHT
      ) {
        const donation = donations[cell.index];
        if (donation) {
          const isSelected = selectedDonation && donation.id === selectedDonation.id;
          const nameToShow = isSelected ? selectedDonation.name : donation.name;
          const messageToShow = isSelected ? selectedDonation.message : donation.message;

          const userDonations = Object.values(donations).filter(
            (d) => (isSelected ? d.id === selectedDonation.id : d.name === donation.name)
          );
          const totalAmount = userDonations.reduce((sum, d) => sum + d.amount, 0);
          const totalGrids = userDonations.length;

          tooltip.innerHTML = `
                                                                                                  <div style="font-size: 20px; font-weight: bold;">${nameToShow} - ₹${totalAmount}</div>
                                                                                                  <div style="font-size: 16px;">Grids: ${totalGrids}</div>
                                                                                                  <hr style="margin: 8px 0;" />
                                                                                                  <div style="font-style: italic;">"${messageToShow || ""}"</div>
                                                                                                `;

          tooltip.style.display = "block";

          requestAnimationFrame(() => {
            const tooltipHeight = tooltip.offsetHeight;
            const tooltipWidth = tooltip.offsetWidth;
            let left = cell.x + CELL_WIDTH / 2;
            left = Math.max(tooltipWidth / 2, Math.min(left, CANVAS_WIDTH - tooltipWidth / 2));

            const topAbove = cell.y - tooltipHeight - 10;
            const topBelow = cell.y + CELL_HEIGHT + 10;
            const top = mouseY > tooltipHeight + 10 ? topAbove : topBelow;

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
          });

          found = true;
          break;
        }
      }
    }

    if (!found) tooltip.style.display = "none";
  };

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (const cell of cellsRef.current) {
      if (
        mouseX >= cell.x &&
        mouseX <= cell.x + CELL_WIDTH &&
        mouseY >= cell.y &&
        mouseY <= cell.y + CELL_HEIGHT
      ) {
        const donation = donations[cell.index];
        if (donation) {
          // Set clicked donation ID to trigger API fetch
          setDonationId(donation.id);

          // Highlight donor on click
          setHighlightedDonor(donation.name);

          break;
        }
      }
    }
  };

  const scrollToBuyerGrid = (gridIndex, donorName) => {
    const cell = cellsRef.current[gridIndex];
    if (!cell) return;

    setSearching(true);
    setHighlightedDonor(donorName);

    const canvas = canvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    const scrollY = window.scrollY;
    const targetY = canvasRect.top + scrollY + cell.y;

    window.scrollTo({
      top: targetY - 150,
      left: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      const newCanvasRect = canvas.getBoundingClientRect();
      const simulatedX = newCanvasRect.left + cell.x + CELL_WIDTH / 2;
      const simulatedY = newCanvasRect.top + cell.y + CELL_HEIGHT / 2;

      const event = new MouseEvent("mousemove", {
        clientX: simulatedX,
        clientY: simulatedY,
        bubbles: true,
      });
      canvas.dispatchEvent(event);

      setSearching(false);
    }, 700);
  };

  useEffect(() => {
    if (!selectedDonation) return;

    const gridIndex = Object.entries(donations).find(
      ([_, d]) => d.id === selectedDonation.id
    )?.[0];

    if (gridIndex !== undefined) {
      scrollToBuyerGrid(Number(gridIndex), selectedDonation.email || "Anonymous");
    }
  }, [selectedDonation, donations]);

  // Show tooltip on selectedDonation using limited prop data (old behavior)
  useEffect(() => {
    // If we have detailed API data from clicked grid, skip this to avoid conflict
    if (donationByIdResponse) return;
    if (!selectedDonation || !tooltipRef.current || !canvasRef.current) return;

    const gridEntry = Object.entries(donations).find(
      ([_, d]) => d.id === selectedDonation.id
    );
    if (!gridEntry) return;

    const gridIndex = Number(gridEntry[0]);
    const cell = cellsRef.current[gridIndex];
    if (!cell) return;

    const tooltip = tooltipRef.current;

    const nameToShow = selectedDonation.email || "Anonymous";
    const messageToShow = selectedDonation.message || "";

    const userDonations = Object.values(donations).filter(
      (d) => d.id === selectedDonation.id
    );
    const totalAmount = userDonations.reduce((sum, d) => sum + d.amount, 0);
    const totalGrids = userDonations.length;

    tooltip.innerHTML = `
                                                                                            <div style="font-size: 20px; font-weight: bold;">${nameToShow} - ₹${totalAmount}</div>
                                                                                            <div style="font-size: 16px;">Grids: ${totalGrids}</div>
                                                                                            <hr style="margin: 8px 0;" />
                                                                                            <div style="font-style: italic;">"${messageToShow}"</div>
                                                                                          `;

    tooltip.style.display = "block";

    requestAnimationFrame(() => {
      const tooltipHeight = tooltip.offsetHeight;
      const tooltipWidth = tooltip.offsetWidth;
      let left = cell.x + CELL_WIDTH / 2;
      left = Math.max(
        tooltipWidth / 2,
        Math.min(left, CANVAS_WIDTH - tooltipWidth / 2)
      );

      const top = cell.y - tooltipHeight - 10;
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    });
  }, [selectedDonation, donations, donationByIdResponse]);

  // Show tooltip when detailed API data is received on click
  useEffect(() => {
    if (!donationByIdResponse || !tooltipRef.current || !canvasRef.current) return;

    const gridEntry = Object.entries(donations).find(
      ([_, d]) => d.id === donationByIdResponse.id
    );
    if (!gridEntry) return;

    const gridIndex = Number(gridEntry[0]);
    const cell = cellsRef.current[gridIndex];
    if (!cell) return;

    const tooltip = tooltipRef.current;

    const nameToShow = donationByIdResponse.name || donationByIdResponse.email || "Anonymous";
    const messageToShow = donationByIdResponse.message || "";
    const totalAmount = PRICE_PER_GRID * (donationByIdResponse.grids || 1);
    const totalGrids = donationByIdResponse.grids || 1;

    tooltip.innerHTML = `
   <div style="font-size: 20px; font-weight: bold;">${nameToShow} - ₹${totalAmount}</div>
   <div style="font-size: 16px;">Grids: ${totalGrids}</div>
   <hr style="margin: 8px 0;" />
   <div style="font-style: italic;">"${messageToShow}"</div>`;

    tooltip.style.display = "block";

    requestAnimationFrame(() => {
      const tooltipHeight = tooltip.offsetHeight;
      const tooltipWidth = tooltip.offsetWidth;
      let left = cell.x + CELL_WIDTH / 2;
      left = Math.max(
        tooltipWidth / 2,
        Math.min(left, CANVAS_WIDTH - tooltipWidth / 2)
      );

      const top = cell.y - tooltipHeight - 10;
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    });
  }, [donationByIdResponse, donations]);


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
    <div className="fixed inset-0 z-50 w-full h-full overflow-y-scroll backdrop-blur bg-white bg-opacity-80">
      {
        loading ? (
          <div className="flex items-center h-[100vh] justify-center flex-col gap-2 ">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
            <p>Loading Grids...</p>
          </div>

        ) : (
          <div>
            <div className="w-full flex items-center px-12 pt-6">
              <div className="flex  md:flex-row flex-col gap-5">
                <div className="flex  gap-3 items-center">
                  <div>
                    <span className="h-4 w-4 inline-block bg-[#15B006] border border-black"></span>
                  </div>
                  <p>User Grids</p>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="h-4 w-4 inline-block bg-[#52841D] border border-black"></span>
                  <p>Donated Grids</p>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="h-4 w-4 inline-block bg-[#656C5E] border border-black"></span>
                  <p>Undonated Grids</p>
                </div>
              </div>
              <X onClick={onClose} className="ml-auto cursor-pointer" />
            </div>

            <div className="flex flex-col gap-10 items-center justify-start w-full px-4 py-8">
              <div className="relative w-full max-w-[1400px]">

                <canvas
                  ref={canvasRef}
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => (tooltipRef.current.style.display = "none")}
                  onClick={handleClick}
                  className="w-full h-auto border border-gray-300 cursor-pointer bg-gray-200"
                />



                <div
                  ref={tooltipRef}
                  className="absolute bg-white text-black p-5 rounded-lg text-base hidden pointer-events-none max-w-[300px] shadow-lg border border-gray-300 transform -translate-x-1/2"
                />
              </div>
            </div>
          </div>
        )


      }
    </div>
  );
};

export default DonationGridCanvas;
