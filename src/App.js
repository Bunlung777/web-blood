import React, { useState, useMemo, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { Activity, TrendingDown, DollarSign, Award, Plus, FileText, ClipboardList } from 'lucide-react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs,setDoc,doc,serverTimestamp } from 'firebase/firestore';
import { firebaseConfig } from './firebase';

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const App = () => {
  const [data, setData] = useState([]);
  const [selectedTest, setSelectedTest] = useState('HbA1C');
  const [openModal, setOpenModal] = useState(false);
const [form, setForm] = useState({
  year: '',
  kpi: '',
  repeat: '',
  total: '',
  cost: '',
  totalCost: '',
});
const handleChange = e => {
  setForm({ ...form, [e.target.name]: e.target.value });
};
const totalCost = (Number(form.cost) || 0) * (Number(form.repeat) || 0);


  useEffect(() => {
    const load = async () => {
      const hospitalId = 'loei';
      const testsSnap = await getDocs(
        collection(db, 'hospitals', hospitalId, 'tests')
      );

      const all = [];

      for (const t of testsSnap.docs) {
        const yearsSnap = await getDocs(
          collection(db, 'hospitals', hospitalId, 'tests', t.id, 'years')
        );

        all.push({
          test: t.id,
          years: yearsSnap.docs
            .map(y => ({ year: y.id, ...y.data() }))
            .sort((a, b) => Number(a.year) - Number(b.year)),
        });
      }

      setData(all);
    };

    load();
  }, []);
const saveYearData = async () => {
  const hospitalId = "loei";
  const testId = selectedTest;
  const yearId = form.year;

  await setDoc(
    doc(db, "hospitals", hospitalId, "tests", testId, "years", yearId),
    {
      kpi: Number(form.kpi),
      repeat: Number(form.repeat),
      total: Number(form.total),
      cost: Number(form.cost),
      totalCost: Number(form.totalCost),
      createdAt: serverTimestamp(), 
    }
  );

  setOpenModal(false);
};

  const currentTestData = useMemo(() => {
    return data.find(d => d.test === selectedTest)?.years ?? [];
  }, [data, selectedTest]);
  console.log("Current Test Data:", currentTestData);

  const kpiImprovement = useMemo(() => {
    if (currentTestData.length < 2) return null;
    const latest = currentTestData.at(-1);
    const prev = currentTestData.at(-2);
    return ((prev.kpi - latest.kpi) / prev.kpi) * 100;
  }, [currentTestData]);

console.log("cuerrentTestData:", currentTestData);

const currentYear = new Date().getFullYear() + 543;
const yearList = Array.from({ length: 5 }, (_, i) => currentYear + i);
return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-kanit">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#5bafeb] p-2 rounded-lg text-white">
              <ClipboardList size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">แดชบอร์ดสรุปตัวชี้วัด (KPI)</h1>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">รายงานการตรวจซ้ำและต้นทุน ปี 2563 - 2567</p>
            </div>
          </div>
          
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#5bafeb] hover:bg-[#4a9de0] text-white rounded-lg font-bold shadow-sm transition-all text-sm"
          >
            <Plus size={18} />
            เพิ่มข้อมูล
          </button>
        </div>
      </div>
</header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
      
<div className="overflow-x-auto pb-2">
          <div className="flex gap-2 p-1 bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200 w-max mx-auto shadow-sm">
            {data.length > 0 ? data.map(item => (
              <button
                key={item.test}
                onClick={() => setSelectedTest(item.test)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  selectedTest === item.test
                    ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-100'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
                }`}
              >
                {selectedTest === item.test && <Activity size={16} className="animate-pulse" />}
                {item.test}
              </button>
            )) : (
              <span className="px-6 py-2 text-sm text-slate-400">กำลังโหลดข้อมูล...</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard 
            title="ค่า KPI ประจำปีล่าสุด" 
            value={`${currentTestData.at(-1)?.kpi?.toFixed(2) ?? '—'}%`} 
            icon={<Activity size={20} className="text-blue-700" />} 
            trend={`เปรียบเทียบปีก่อน: ${kpiImprovement?.toFixed(2)}%`} 
            trendValue={kpiImprovement}
          />
          <StatCard 
            title="จำนวนตรวจซ้ำ" 
            value={currentTestData.at(-1)?.repeat?.toLocaleString() ?? '—'} 
            icon={<TrendingDown size={20} className="text-slate-500" />} 
            subValue={`จากทั้งหมด ${currentTestData.at(-1)?.total?.toLocaleString() ?? '—'} ครั้ง`}
          />
          <StatCard 
            title="งบประมาณที่ใช้" 
            value={`฿${currentTestData.at(-1)?.cost?.toLocaleString() ?? '—'}`} 
          />
          <StatCard 
            title="สถานะการประเมิน" 
            value="ผ่านเกณฑ์"
            subValue={`เป้สหมาย < 5.0%`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-6 flex items-center gap-2">
              <Activity size={16} /> สถิติแนวโน้ม KPI ย้อนหลัง
            </h3>
            <ChartLine data={currentTestData} />
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-6 flex items-center gap-2">
              สถิติต้นทุนรายปีงบประมาณ
            </h3>
            <ChartBar data={currentTestData} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
            <FileText size={18} className="text-slate-400" />
            <h3 className="font-bold text-slate-700">รายละเอียดข้อมูลประกอบรายงาน</h3>
          </div>
  <table className="w-full text-sm">
    <thead>
      <tr className="bg-slate-50 text-slate-500 text-[13px] font-black tracking-widest border-b border-slate-200">
        <th className="px-6 py-4 text-left">ปีงบประมาณ</th>
        <th className="px-6 py-4 text-right">จำนวนตรวจซ้ำ (ครั้ง)</th>
        <th className="px-6 py-4 text-right">จำนวนทั้งหมด (ครั้ง)</th>
        <th className="px-6 py-4 text-right">ผลสัมฤทธิ์ KPI</th>
        <th className="px-6 py-4 text-right">งบประมาณดำเนินการ</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-100">
      {currentTestData.map(r => (
        <tr key={r.year} className="hover:bg-slate-50 transition-colors">
          <td className="px-6 py-4 font-bold text-slate-700">พ.ศ. {r.year}</td>
          <td className="px-6 py-4 text-right">{r.repeat?.toLocaleString()}</td>
          <td className="px-6 py-4 text-right">{r.total?.toLocaleString()}</td>
          <td className="px-6 py-4 text-right">
            <span className="font-bold text-blue-800 bg-blue-50 px-2 py-1 rounded border border-blue-100">
              {r.kpi?.toFixed(2)}%
            </span>
          </td>
          <td className="px-6 py-4 text-right text-slate-600">฿{r.totalCost?.toLocaleString()}</td>
        </tr>
      ))}
      {currentTestData.length === 0 && (
        <tr>
          <td colSpan="5" className="px-6 py-10 text-center text-slate-400 italic">ไม่พบข้อมูลในฐานข้อมูล</td>
        </tr>
      )}
    </tbody>
  </table>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-[#5bafeb] text-white flex justify-between items-center">
              <h2 className="font-bold">แบบฟอร์มบันทึกข้อมูลปีงบประมาณ</h2>
              <button onClick={()=>setOpenModal(false)} className="text-white/70 hover:text-white transition-all text-xl">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                  <div className='col-span-1'>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">ปี</label>
                    <select
                          name="year"
                          onChange={handleChange}
                          defaultValue=""
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-slate-50 appearance-none cursor-pointer"
                        >
                          <option value="" disabled>เลือกปี</option>
                          {yearList.map((y) => (
                            <option key={y} value={y}>
                              พ.ศ. {y}
                            </option>
                          ))}
                        </select>
                  </div>
                                    <div className='col-span-1'>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">KPI</label>
                    <input
                          name="kpi"
                          onChange={handleChange}
                          type='number'
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-slate-50 appearance-none cursor-pointer"
                        />
                  </div>
                                                      <div className='col-span-1'>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">จำนวน</label>
                    <input
                          name="repeat"
                          onChange={handleChange}
                          type='number'
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-slate-50 appearance-none cursor-pointer"
                        />
                  </div>
                 <div className='col-span-1'>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">ตรวจทั้งหมด</label>
                    <input
                          name="total"
                          onChange={handleChange}
                          type='number'
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-slate-50 appearance-none cursor-pointer"
                        />
                  </div>
                                   <div className='col-span-1'>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">ทุน</label>
                    <input
                          name="cost"
                          onChange={handleChange}
                          type='number'
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-slate-50 appearance-none cursor-pointer"
                        />
                  </div>
                                   <div className='col-span-1'>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">ต้นทุนรวม</label>
                    <input
                          name="totalCost"
                          value={totalCost}
                          type='number'
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-slate-50 appearance-none cursor-pointer"
                        />
                  </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 bg-slate-50 border-t border-slate-200">
              <button onClick={()=>setOpenModal(false)} className="px-6 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-all">ยกเลิก</button>
              <button onClick={saveYearData} className="px-8 py-2 bg-[#5bafeb] hover:bg-[#4a9de0] text-white rounded-lg text-sm font-bold shadow-md transition-all">
                ยืนยันการบันทึกข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



const StatCard = ({ title, value, icon, trend, trendValue, subValue }) => {
  const isNegative = typeof trendValue === 'number' && trendValue < 0;
  console.log("StatCard - trendValue:", trendValue, "isNegative:", isNegative);
  return (
    <div className="bg-white p-5 rounded-xl border">
      <div className="flex justify-between mb-3">
        <span className="text-sm text-slate-500">{title}</span>
        {icon}
      </div>

      <div className="text-2xl font-bold">{value}</div>

      {trend && (
        <div
          className={`text-xs ${
            isNegative ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {trend}
        </div>
      )}

      {subValue && <div className="text-xs text-slate-400">{subValue}</div>}
    </div>
  );
};


const ChartLine = ({ data }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
    <h3 className="mb-6 font-bold text-slate-700 flex items-center gap-2">
      <span className="w-1 h-5 bg-slate-400 rounded-full"></span>
      แนวโน้มดัชนีชี้วัด (KPI Trend)
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart 
        data={data.map(d => ({ ...d, kpi: d.kpi }))} 
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
        
        <XAxis 
          dataKey="year" 
          axisLine={false} 
          tickLine={false} 
          tick={{fill: '#64748B', fontSize: 12}}
          dy={10}
        />
        
        <YAxis 
          width={60}
          axisLine={false} 
          tickLine={false} 
          tick={{fill: '#64748B', fontSize: 12}}
          tickFormatter={(value) => `${value}%`}
        />
        
        <Tooltip 
          contentStyle={{
            borderRadius: '8px', 
            border: '1px solid #E2E8F0', 
            boxShadow: 'none',
            fontSize: '14px'
          }}
          formatter={(value) => [`${Number(value).toFixed(2)}%`, 'ค่า KPI']}
        />
        
        <Line 
          type="monotone" 
          dataKey="kpi" 
          stroke="#1E3A8A" 
          strokeWidth={3} 
          dot={{ r: 5, fill: '#1E3A8A', strokeWidth: 2, stroke: '#fff' }}
          activeDot={{ r: 7, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const ChartBar = ({ data }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
    <h3 className="mb-6 font-bold text-slate-700 flex items-center gap-2">
      <span className="w-1 h-5 bg-slate-400 rounded-full"></span>
      ต้นทุนรายปีงบประมาณ
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart 
        data={data} 
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis 
          dataKey="year" 
          axisLine={false} 
          tickLine={false} 
          tick={{fill: '#64748B', fontSize: 12}}
          dy={10}
        />
        <YAxis 
          width={60}
          axisLine={false} 
          tickLine={false} 
          tick={{fill: '#64748B', fontSize: 12}}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <Tooltip 
          cursor={{fill: '#F8FAFC'}} 
          contentStyle={{
            borderRadius: '8px', 
            border: '1px solid #E2E8F0', 
            boxShadow: 'none',
            fontSize: '14px'
          }}
          formatter={(value) => [value.toLocaleString(), 'ต้นทุน']}
        />
        <Bar dataKey="totalCost" radius={[4, 4, 0, 0]} barSize={40}>
          {data.map((_, i) => (
            <Cell 
              key={i} 
              fill={i === data.length - 1 ? '#1E3A8A' : '#CBD5E1'} 
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);


export default App;