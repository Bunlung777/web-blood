import React, { useState} from 'react';
import { FileText, ChevronLeft, ChevronRight,LayoutGrid } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
const mockIndicators = [
  {
    id: '26.1',
    name: 'ร้อยละของผู้ป่วยโรคเบาหวาน ได้รับการตรวจ HbA1c ซ้ำภายใน 90 วัน',
    target: 'ไม่เกินร้อยละ 5',
    result: 'ร้อยละ 3.65',
  },
  {
    id: '26.2',
    name: 'ร้อยละของผู้ป่วยโรคเบาหวาน ได้รับการตรวจ LDL-Cholesterol ซ้ำภายใน 90 วัน',
    target: 'ไม่เกินร้อยละ 5',
    result: 'ร้อยละ 2.91',
  },
  {
    id: '26.3',
    name: 'ร้อยละของผู้ป่วยโรคเบาหวาน ได้รับการตรวจ HbA1c อย่างน้อยปีละ 1 ครั้ง',
    target: 'มากกว่าร้อยละ 70',
    result: 'ร้อยละ 56.39',
  },
  {
    id: '26.4',
    name: 'ร้อยละของผู้ป่วยโรคเบาหวาน ได้รับการตรวจ LDL-Cholesterol อย่างน้อยปีละ 1 ครั้ง',
    target: 'มากกว่าร้อยละ 70',
    result: 'ร้อยละ 55.90',
  },
  {
    id: '26.5',
    name: 'ร้อยละของผู้ป่วยโรคเบาหวาน ได้รับการตรวจ Creatinine อย่างน้อยปีละ 1 ครั้ง',
    target: 'มากกว่าร้อยละ 70',
    result: 'ร้อยละ 69.52',
  },
  {
    id: '26.6',
    name: 'ร้อยละของผู้มารับบริการ ได้รับการตรวจ Total Cholesterol ซ้ำภายใน 90 วัน',
    target: 'ไม่เกินร้อยละ 5',
    result: 'ร้อยละ 2.73',
  },
  {
    id: '26.7',
    name: 'ร้อยละของผู้มารับบริการ ได้รับการตรวจ Triglycerides ซ้ำภายใน 90 วัน',
    target: 'ไม่เกินร้อยละ 5',
    result: 'ร้อยละ 3.02',
  },
];
const chartData = [
  {
    name: 'HbA1c ซ้ำ 90 วัน',
    total: 7218,
    used: 265,
    percent: 3.67,
  },
  {
    name: 'LDL ซ้ำ 90 วัน',
    total: 6946,
    used: 200,
    percent: 2.88,
  },
  {
    name: 'Cholesterol ซ้ำ 90 วัน',
    total: 11528,
    used: 310,
    percent: 2.69,
  },
  {
    name: 'Triglyceride ซ้ำ 90 วัน',
    total: 11557,
    used: 334,
    percent: 2.89,
  },
  {
    name: 'HbA1c ปีละ 1 ครั้ง',
    total: 9887,
    used: 5799,
    percent: 58.65,
  },
  {
    name: 'LDL ปีละ 1 ครั้ง',
    total: 9887,
    used: 5776,
    percent: 58.42,
  },
  {
    name: 'Creatinine ปีละ 1 ครั้ง',
    total: 9887,
    used: 7083,
    percent: 71.64,
  },
];



  // คำนวณข้อมูลสำหรับหน้าปัจจุบัน
  const totalPages = Math.ceil(mockIndicators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTestData = mockIndicators.slice(startIndex, endIndex);

  // ฟังก์ชันสำหรับเปลี่ยนหน้า
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

return (
<div>
       <Navbar />

    <div className="flex flex-col items-center p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen font-kanit gap-6">
      {/* ===== Top Navigation Bar ===== */}
{/* ===== 1. Page Header Section (เพิ่มส่วนนี้) ===== */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hospital Dashboard</h1>
          <p className="text-slate-500 text-sm">ภาพรวมข้อมูลการตรวจทางห้องปฏิบัติการ</p>
        </div>
        
        {/* ปุ่มของคุณ */}
        <button
          onClick={() => navigate("/Government")}
          className="flex items-center gap-2 bg-white text-[#5bafeb] border border-[#5bafeb] px-5 py-2.5 rounded-xl shadow-sm hover:bg-[#5bafeb] hover:text-white hover:shadow-md transition-all active:scale-95 text-sm font-bold group"
        >
          <LayoutGrid size={18} className="group-hover:rotate-180 transition-transform duration-500"/>
          <span>ตัวชี้วัดราชการ</span>
        </button>
      </div>
      {/* --- Section 1: Chart Card --- */}
      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 max-w-6xl w-full p-6 md:p-10 backdrop-blur-sm relative overflow-hidden">
        {/* ตกแต่งพื้นหลังเล็กน้อย */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
        
        <div className="mb-10 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-6 bg-[#5bafeb] rounded-full"></div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">สรุปการตรวจห้องปฏิบัติการ</h2>
          </div>
          <p className="text-sm text-slate-500 ml-4">วิเคราะห์เปรียบเทียบสัดส่วนการตรวจซ้ำภายในระยะเวลา 90 วัน</p>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={chartData} margin={{ top: 5, right: 60, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" hide domain={[0, 100]} />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={140}
                tick={{ fontSize: 13, fill: '#475569', fontWeight: 600 }}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc', radius: 8 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-4 border border-slate-100 shadow-2xl rounded-2xl">
                        <p className="font-bold text-slate-800 mb-2 border-b pb-1">{data.name}</p>
                        <p className="text-[#5bafeb] font-bold text-lg">{data.percent}%</p>
                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                          ปริมาณการใช้: {data.used.toLocaleString()} ครั้ง<br/>
                          จากทั้งหมด: {data.total.toLocaleString()} ครั้ง
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="percent" radius={[0, 10, 10, 0]} barSize={32}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.percent > 10 ? '#5bafeb' : '#cbd5e1'} 
                    className="transition-all duration-500"
                  />
                ))}
                <LabelList 
                  dataKey="percent" 
                  position="right" 
                  formatter={(val) => `${val}%`} 
                  className="fill-slate-600 text-[13px] font-black" 
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm border-t border-slate-50 pt-8">
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full">
            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
            <span className="text-slate-600 font-semibold text-xs">ผ่านเกณฑ์ RLU (สัดส่วนปกติ)</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full">
            <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
            <span className="text-slate-600 font-semibold text-xs">ต้องเฝ้าระวัง (ตรวจซ้ำบ่อย)</span>
          </div>
        </div> */}
      </div>

      {/* --- Section 2: Table Card --- */}
      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 max-w-6xl w-full flex flex-col backdrop-blur-sm overflow-hidden mb-12">
        
        {/* Header Table */}
        <div className="px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-50">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5bafeb] to-[#4a90e2] flex items-center justify-center text-white shadow-xl shadow-[#5bafeb]/20">
              <FileText size={24} strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-xl tracking-tight">รายละเอียดตัวชี้วัดรายรายการ</h3>
              <p className="text-slate-400 text-sm mt-0.5">จำแนกตามเกณฑ์เป้าหมายกระทรวงสาธารณสุข</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#5bafeb] px-4 py-2 rounded-xl border border-[#5bafeb]">
            <span className="text-white text-sm font-bold">
              ทั้งหมด {mockIndicators.length} รายการ
            </span>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto px-4">
          <table className="w-full">
            <thead>
              <tr className="text-slate-400 text-[11px] uppercase tracking-widest font-black border-b border-slate-50">
                <th className="px-6 py-5 text-left w-24">ลำดับ</th>
                <th className="px-4 py-5 text-left">ชื่อรายการตรวจทางห้องปฏิบัติการ</th>
                <th className="px-4 py-5 text-center">เกณฑ์เป้าหมาย</th>
                <th className="px-4 py-5 text-right pr-8">ผลการดำเนินงาน</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50/80">
              {currentTestData.map((r, i) => (
                <tr key={r.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                  <td className="px-6 py-5">
                    <span className="bg-slate-100 text-slate-500 py-1 px-2.5 rounded-lg font-mono text-xs font-bold group-hover:bg-[#5bafeb] group-hover:text-[#5bafeb]">
                      {(startIndex + i + 1).toString().padStart(2, '0')}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <span className="font-bold text-slate-700 group-hover:text-[#5bafeb] transition-colors">{r.name}</span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="text-slate-500 font-medium text-sm italic">{r.target}</span>
                  </td>
                  <td className="px-4 py-5 text-right pr-8">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-black bg-white border border-slate-200 text-slate-700 group-hover:border-[#5bafeb] ">
                      {r.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 text-sm font-medium">
            กำลังแสดงหน้า <span className="text-[#5bafeb] font-bold">{currentPage}</span> จากทั้งหมด {totalPages} หน้า
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl bg-white text-slate-400 hover:text-emerald-600 disabled:opacity-30 transition-all border border-slate-200 shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-1.5">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => goToPage(index + 1)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                    currentPage === index + 1
                      ? 'bg-[#5bafeb] text-white shadow-lg shadow-[#5bafeb] border-[#5bafeb]'
                      : 'bg-white text-slate-400 hover:border-emerald-300 border border-slate-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl bg-white text-slate-400 hover:text-emerald-600 disabled:opacity-30 transition-all border border-slate-200 shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};


export default App;