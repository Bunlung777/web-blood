import { useNavigate } from "react-router-dom";
import React from "react";
import { Activity, BarChart3, ChevronRight } from "lucide-react"; // ลงเพิ่ม: npm install lucide-react
import logo from "./image/Unknown.jpg";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] font-kanit text-slate-800">

      {/* ===== Header with Gradient ===== */}
      <header className="bg-gradient-to-r from-[#5bafeb] to-[#0683dd] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-lg rounded-full"></div>
            <img
              src={logo}
              alt="Logo"
              className="relative h-16 w-16 rounded-full border-2 border-white/30 bg-white object-cover"
            />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              ระบบบันทึกและติดตามผลการดำเนินงาน
            </h1>
            <div className="flex flex-col opacity-90 border-l-2 border-emerald-400/50 pl-4 mt-1">
              <span className="text-sm font-light">การตรวจทางห้องปฏิบัติการอย่างสมเหตุสมผล (RLU)</span>
              <span className="text-xs font-medium tracking-wider uppercase">โรงพยาบาลเลย</span>
            </div>
          </div>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      {/* <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h2 className="text-slate-500 text-sm font-medium uppercase tracking-widest">ยินดีต้อนรับเข้าสู่ระบบ</h2>
          <p className="text-slate-400 text-xs mt-1">กรุณาเลือกเมนูที่ต้องการเพื่อดูรายละเอียดข้อมูล</p>
        </div>
      </div> */}

      {/* ===== Main Menu ===== */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1: ตัวชี้วัดตามราชการ */}
          <button
            onClick={() => navigate("/App")}
            className="group relative bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Activity size={32} />
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              ตัวชี้วัดตามราชการ
            </h3>
            <p className="text-slate-500 leading-relaxed">
              ภาพรวมผลการดำเนินงานตัวชี้วัดระดับประเทศ และเขตสุขภาพ ประจำปีงบประมาณ
            </p>
            
            <div className="mt-6 flex items-center text-emerald-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              เข้าใช้งานระบบ <span>→</span>
            </div>
          </button>

          {/* Card 2: ตัวชี้วัดโรงพยาบาล */}
          <button
            onClick={() => navigate("/Graph")}
            className="group relative bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BarChart3 size={32} />
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              ตัวชี้วัดโรงพยาบาล
            </h3>
            <p className="text-slate-500 leading-relaxed">
              รายงานการตรวจราชการเชิงลึก และสถิติการตรวจคัดกรองภายในสถานพยาบาล
            </p>

            <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              ดูรายงานกราฟ <span>→</span>
            </div>
          </button>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-slate-400 text-xs">
        © 2024 ระบบบริหารจัดการข้อมูล RLU - โรงพยาบาลเลย
      </footer>
    </div>
  );
};

export default Home;