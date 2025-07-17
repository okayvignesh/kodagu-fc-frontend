"use client";
import ENDPOINTS from '@/lib/apiconfig';
import { Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const ContributerForm = ({ onClose }) => {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [showBrandFields, setShowBrandFields] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
    transactionId: '',
    paymentMethod: '',
    brandName: '',
  });

  const [file, setFile] = useState(null);
  const [brandImage, setBrandImage] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const brandImageRef = useRef(null);

  const PRICE_PER_GRID = 500;
  const totalAmount = count * PRICE_PER_GRID;

  const handleFileClick = () => fileInputRef.current.click();
  const handleBrandImageClick = () => brandImageRef.current.click();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleBrandImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setBrandImage(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formValues.name.trim()) newErrors.name = "Name is required";
    if (!formValues.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
      newErrors.email = "Invalid email address";
    }
    if (!formValues.message.trim()) newErrors.message = "Message is required";
    if (!formValues.transactionId.trim()) newErrors.transactionId = "Transaction ID is required";
    if (!formValues.paymentMethod.trim()) newErrors.paymentMethod = "Payment method is required";
    if (!file) newErrors.file = "Proof of payment is required";

    if (showBrandFields) {
      if (!formValues.brandName.trim()) newErrors.brandName = "Brand name is required";
      if (!brandImage) newErrors.brandImage = "Brand image is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("email", formValues.email);
    formData.append("message", formValues.message);
    formData.append("txn_id", formValues.transactionId);
    formData.append("mode_of_payment", formValues.paymentMethod);
    formData.append("grids", count);
    formData.append("amount", totalAmount);
    if (file) formData.append("payment_image", file);
    if (showBrandFields) {
      formData.append("brand_name", formValues.brandName);
      if (brandImage) formData.append("brand_image", brandImage);
    }
    setIsLoading(true);
    try {
      const res = await fetch(ENDPOINTS.POSTDONATION, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setErrorMessage("Internal server error. Please try again later");
        setShowErrorPopup(true);
        throw new Error("Internal server error");
      }

      setFormValues({
        name: '',
        email: '',
        message: '',
        transactionId: '',
        paymentMethod: '',
        brandName: '',
      });
      setCount(1);
      setFile(null);
      setBrandImage(null);
      setShowBrandFields(false);

      setShowSuccessPopup(true);

      const result = await res.json();
      console.log("Success:", result);

    } catch (err) {
      console.error(err);
      if (!errorMessage) {
        setErrorMessage("Internal server error. Please try again later");
        setShowErrorPopup(true);
      }
    } finally {
      setIsLoading(false);
    }

  };

  // ✅ Handle browser back button to close modal or redirect to homepage
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
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white w-full mx-auto p-5 overflow-y-auto max-h-[100vh]">
          <div className='w-full sticky top-0'><X size={20} onClick={onClose} className='ml-auto cursor-pointer' /></div>
          <div className='w-full gap-[102px] flex  sans md:p-5'>
            <div className='md:w-1/2 w-full flex flex-col gap-6 sm:px-5 py-4'>
              <h1 className='font-bold md:text-[28px] text-[20px]'>Contribute to Build Kodagu FC’s Future!</h1>
              <form className='flex flex-col gap-y-6'>
                {/* Name */}
                <div className='flex flex-col gap-2'>
                  <label htmlFor="name" className='text-[12px] font-medium'>Full Name</label>
                  <input
                    type="text" id="name"
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                    className='rounded-[10px] w-full h-[44px] p-[10px] outline'
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className='flex flex-col gap-2'>
                  <label htmlFor="email" className='text-[12px] font-medium'>Email</label>
                  <input
                    type="email" id="email"
                    value={formValues.email}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    className='rounded-[10px] w-full h-[44px] p-[10px] outline'
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Grid Count */}
                <div className='flex justify-between'>
                  <div className='flex flex-col gap-2 text-[12px] font-medium'>
                    <p>No of Grids </p>
                    <div className='flex items-center border border-[#0C4520] w-fit px-3 gap-4 py-2 rounded-[10px]'>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setCount((prev) => Math.max(1, prev - 1));
                        }}
                      >
                        <Minus size={16} />
                      </button>

                      <input
                        type="number"
                        min="1"
                        max="100000"
                        value={count}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            if (value >= 1 && value <= 100000) {
                              setCount(value);
                            } else if (value > 100000) {
                              setCount(100000); // Enforce max limit
                            }
                          } else if (e.target.value === '') {
                            setCount('');
                          }
                        }}
                        onBlur={(e) => {
                          const value = parseInt(e.target.value);
                          if (e.target.value === '' || value < 1) {
                            setCount(1);
                          } else if (value > 100000) {
                            setCount(100000); // Enforce max on blur as well
                          }
                        }}
                        className='w-fit text-center font-semibold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                      />


                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setCount((prev) => prev + 1);
                        }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <p className='font-semibold text-[12px]'>Total Amount</p>
                    <p className='font-semibold sans'>&#8377; {totalAmount}</p>
                  </div>
                </div>


                {/* Message */}
                <div className='flex flex-col gap-2'>
                  <label htmlFor="message" className='text-[12px] font-medium'>Message</label>
                  <textarea
                    id="message"
                    placeholder='Enter Your Message'
                    className='rounded-[10px] outline h-30 w-full p-[10px]'
                    value={formValues.message}
                    onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                  />
                  {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>

                {/* Brand Checkbox */}
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="checkbox"
                    id="brandCheckbox"
                    checked={showBrandFields}
                    onChange={() => setShowBrandFields(prev => !prev)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="brandCheckbox" className="text-sm font-medium">
                    I am sponsoring as a brand
                  </label>
                </div>

                {/* Brand Fields */}
                {showBrandFields && (
                  <>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="brandName" className='text-[12px] font-medium'>Brand Name</label>
                      <input
                        type="text" id="brandName"
                        className='rounded-[10px] w-full h-[44px] p-[10px] outline'
                        value={formValues.brandName}
                        onChange={(e) => setFormValues({ ...formValues, brandName: e.target.value })}
                      />
                      {errors.brandName && <p className="text-red-500 text-sm">{errors.brandName}</p>}
                    </div>

                    <div className="flex flex-col gap-2 text-[12px]">
                      <label htmlFor="brandImage">Brand Image</label>
                      <div
                        className="border border-[#B3B3B3] py-[18px] rounded-[10px] bg-[#F8F8F8] cursor-pointer"
                        onClick={handleBrandImageClick}
                      >
                        <img
                          src="/icons/fileupload.svg"
                          alt="upload"
                          width={16}
                          height={16}
                          className="mx-auto"
                        />
                        <p className="font-medium text-[12px] text-center text-[#636363] mt-[10px]">
                          Drag & drop brand image or <span className="text-blue-700 underline">choose file</span>
                        </p>
                      </div>
                      <input
                        type="file"
                        ref={brandImageRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleBrandImageChange}
                      />
                      {brandImage && (
                        <p className="text-sm mt-2 text-gray-600">
                          Selected Brand Image: <span className="font-medium">{brandImage.name}</span>
                        </p>
                      )}
                      {errors.brandImage && <p className="text-red-500 text-sm">{errors.brandImage}</p>}
                    </div>
                  </>
                )}

                {/* Transaction ID */}
                <div className='flex flex-col gap-2'>
                  <label htmlFor="tnansectionId" className='text-[12px] font-medium'>Transaction Id</label>
                  <input
                    type="text" id="tnansectionId"
                    placeholder='paste your transaction id here'
                    className='rounded-[10px] w-full h-[44px] p-[10px] outline'
                    value={formValues.transactionId}
                    onChange={(e) => setFormValues({ ...formValues, transactionId: e.target.value })}
                  />
                  {errors.transactionId && <p className="text-red-500 text-sm">{errors.transactionId}</p>}
                </div>

                {/* Payment Method */}
                <div className='flex flex-col gap-2'>
                  <label className='text-[12px] font-medium' htmlFor="paymentmethod">Payment Method</label>
                  <select
                    className='text-[12px] py-3 px-3 border border-[#0C4520] rounded-[10px]'
                    id="paymentmethod"
                    value={formValues.paymentMethod}
                    onChange={(e) => setFormValues({ ...formValues, paymentMethod: e.target.value })}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="UPI">UPI</option>
                    <option value="netBanking">NetBanking</option>
                    <option value="Cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="cheque">Cheque</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
                </div>

                {
                  formValues && formValues.paymentMethod === "UPI" && (
                    <div className='flex justify-center'>
                      <Image src="/images/qr.png" alt="qr-code" width={300} height={500}
                        className='rounded-[20px]'
                      />
                    </div>
                  )
                }

                {/* Bank Details */}
                <div className='flex flex-col gap-2 text-[12px]'>
                  <p className='font-medium'>Make Payment to</p>
                  <div>
                    <p className='font-medium'>Bank Details :</p>

                    <p><strong>Name:</strong>   Subbayas centre for humanity and  Excellence (Trust)
                    </p>                <p><strong>Bank:</strong>  SBI &#40;State Bank of India &#41;</p>
                    <p> <strong>Account number:</strong> 38848401203</p>
                    <p> <strong>Branch:</strong>  Kushalanagara </p>
                    <p><strong>IFSC:</strong> SBINOO13342
                    </p>
                  </div>

                </div>

                {/* Payment Proof */}
                <div className="flex flex-col justify-center">
                  <p className="text-[12px] font-medium">Proof of Payment</p>
                  <div
                    className="border border-[#B3B3B3] py-[18px] rounded-[10px] bg-[#F8F8F8] cursor-pointer"
                    onClick={handleFileClick}
                  >
                    <img
                      src="/icons/fileupload.svg"
                      alt="upload"
                      width={16}
                      height={16}
                      className="mx-auto"
                    />
                    <p className="font-medium text-[12px] text-center text-[#636363] mt-[10px]">
                      Drag & drop file here or <span className="text-blue-700 underline">choose file</span>
                    </p>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {file && (
                    <p className="text-sm mt-2 text-gray-600">
                      Selected File: <span className="font-medium">{file.name}</span>
                    </p>
                  )}
                  {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
                </div>

                <div>
                  <ul className='text-[12px] text-[#636363] list-disc pl-5'>
                    <li>Your contribution will be manually verified within 24 hours.</li>
                    <li>For help, contact us at operations@kodagufc.com or +919980212063.</li>
                    <li>Contributions are non-refundable.</li>
                  </ul>
                </div>

                <button
                  type='submit'
                  onClick={handleSubmit}
                  className='bg-[linear-gradient(to_bottom,_#145133,_#0C4520,_#31733F)] cursor-pointer font-semibold py-3 rounded-[10px] text-white'
                >
                  {
                    isLoading ? "Submitting..." : "Submit"
                  }

                </button>
              </form>
            </div>

            <div className='w-1/2  mb-auto sticky top-50  h-full  items-start hidden justify-center md:flex'>
              <Image
                src="/images/logo_main.png"
                alt="Logo"
                width={296}
                height={582}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md shadow-md text-center">
            <p className="font-semibold">Thank you for your valuable contribution!
              A confirmation mail will be sent shortly.</p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-4 px-4 py-1 bg-green-600 text-white rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md shadow-md text-center">
            <p className="font-semibold">{errorMessage}</p>
            <button
              onClick={() => setShowErrorPopup(false)}
              className="mt-4 px-4 py-1 bg-red-600 text-white rounded"
            >

              Close
            </button>
          </div>
        </div>
      )}

    </>
  );
};

export default ContributerForm
