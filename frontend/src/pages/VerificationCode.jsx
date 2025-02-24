import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import Footer from "../components/Footer";
import axios from "axios";

const VerificationCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // cek apakah ada email_reset di localStorage
  if (!localStorage.getItem("email_reset")) {
    navigate("/forgot-password"); // Arahkan ke halaman lupa kata sandi jika tidak ada email_reset
  }

  const handleVerification = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      // Mengirim permintaan untuk cek OTP
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/cek-otp", { otp: verificationCode });

      if (response.data.message === "OTP valid") {
        navigate("/new-password"); // Arahkan ke halaman reset kata sandi
      } else {
        setError("Kode verifikasi salah. Silakan coba lagi.");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat memverifikasi OTP.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#C62E2E] text-white p-4">
        <div className="text-lg font-bold">
          <p>CENTRAL</p>
          <p className="ml-3 font-ribeye">JAVA</p>
        </div>
      </header>

      <main className="flex-grow flex justify-center items-center py-10">
        <div className="bg-red-100 p-8 rounded-lg w-[600px] shadow-lg relative">
          <button
            onClick={() => navigate("/forgot-password")}
            className="absolute top-4 left-4 text-[#C62E2E] hover:text-red-700"
          >
            <IoArrowBackSharp size={24} />
          </button>

          <h2 className="text-xl font-semibold mb-4">Masukkan Kode Verifikasi</h2>
          <p className="text-gray-600 mb-6">
            Kami telah mengirimkan kode verifikasi ke email Anda. Masukkan kode untuk melanjutkan.
          </p>
          <form onSubmit={handleVerification}>
            <input
              type="text"
              placeholder="Masukkan kode verifikasi"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full p-2 border border-red-600 rounded-[15px] mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#C62E2E] text-white py-2 rounded font-bold hover:bg-red-700"
            >
              Lanjut
            </button>
            {error && <p className="text-red-600 mt-4">{error}</p>}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VerificationCode;
