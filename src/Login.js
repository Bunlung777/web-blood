import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase";
import logo from "./image/Unknown.jpg";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!name || !password) {
      setError("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    try {
      const q = query(
        collection(db, "User"),
        where("Name", "==", name.trim())
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("ไม่พบผู้ใช้");
        return;
      }

      let isValid = false;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.Password === password) {
          isValid = true;
        }
      });

      if (isValid) {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("username", name);

        navigate("/");
      } else {
        setError("รหัสผ่านไม่ถูกต้อง");
      }
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาด");
    }
  };

  return (
<div className="min-h-screen bg-[#f8fafc] font-kanit flex flex-col text-slate-800">
  
  {/* Header Section */}
  <header className="bg-gradient-to-r from-[#5bafeb] to-[#0683dd] text-white shadow-lg z-10">
    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-6">
      <div className="relative">
        <div className="absolute inset-0 bg-white/20 blur-lg rounded-full"></div>
        <img
          src={logo}
          alt="Logo"
          className="relative h-16 w-16 rounded-full border-2 border-white/30 bg-white object-cover"
        />
      </div>

      <div className="space-y-1">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
          ระบบบันทึกและติดตามผลการดำเนินงาน
        </h1>
        <div className="flex flex-col opacity-90 border-l-2 border-emerald-400/50 pl-4 mt-1">
          <span className="text-sm font-light">การตรวจทางห้องปฏิบัติการอย่างสมเหตุสมผล (RLU)</span>
          <span className="text-xs font-medium tracking-wider uppercase">โรงพยาบาลเลย</span>
        </div>
      </div>
    </div>
  </header>

  {/* Main Content (Login Section) */}
  <main className="flex-1 flex flex-col justify-center items-center p-4">
    <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full max-w-sm">
      
      <div className="flex flex-col items-center mb-8">
        <img src={logo} alt="Login Logo" className="w-16 h-16 rounded-full mb-4 shadow-sm" />
        <h2 className="text-2xl font-semibold text-slate-800">เข้าสู่ระบบ</h2>
        <p className="text-sm text-slate-500 mt-1">กรุณากรอกข้อมูลเพื่อเข้าใช้งาน</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">ชื่อผู้ใช้งาน (Username)</label>
          <input
            type="text"
            placeholder="กรอกชื่อผู้ใช้งาน"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5bafeb] focus:bg-white transition-all duration-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">รหัสผ่าน (Password)</label>
          <input
            type="password"
            placeholder="กรอกรหัสผ่าน"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5bafeb] focus:bg-white transition-all duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-[#5bafeb] to-[#0683dd] text-white py-2.5 rounded-lg font-medium shadow-md hover:shadow-blue-200 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            เข้าสู่ระบบ
          </button>

          {/* ปุ่มสำหรับ Guest ตกแต่งแบบ Outline ให้ดูไม่แย่งซีนปุ่มหลัก */}
          <button
         onClick={() => navigate("/")}
            className="w-full bg-white border-2 border-slate-100 text-slate-500 py-2.5 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-200 hover:text-slate-600 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            เข้าใช้งานแบบผู้เยี่ยมชม
          </button>
        </div>
      </div>
    </div>
  </main>

  {/* Footer */}
  <footer className="py-6 text-center text-sm text-slate-400">
    © 2024 ระบบบันทึกและติดตามผลการดำเนินงาน RLU
  </footer>

</div>
  );
};

export default Login;