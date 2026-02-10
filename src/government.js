import React, { useState } from 'react';
import Navbar from './Navbar';
// --- UI Components ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-5 flex-1 flex flex-col ${className}`}>{children}</div>
);

const Badge = ({ children, variant, className = "" }) => {
  const variants = {
    success: "bg-green-100 text-green-800 border border-green-200",
    destructive: "bg-red-50 text-red-600 border border-red-100",
    warning: "bg-yellow-50 text-yellow-700 border border-yellow-100",
    neutral: "bg-slate-100 text-slate-600 border border-slate-200"
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${variants[variant] || variants.neutral} ${className}`}>
      {children}
    </span>
  );
};

const Progress = ({ value, colorClass = "bg-blue-600" }) => (
  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
    <div 
      className={`h-2.5 rounded-full transition-all duration-500 ${colorClass}`}
      style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
    />
  </div>
);

const GovernmentDashboard = () => {
  // State สำหรับเก็บค่า Filter ที่เลือก (ค่าเริ่มต้นคือ "ทั้งหมด")
  const [selectedGroup, setSelectedGroup] = useState("ทั้งหมด");

  // --- Data Sets ---
  const kpiData = [
    {
      groupTitle: "ประเด็นที่ 1 ส่งเสริมสุขภาพ ป้องกันโรคและคุ้มครองผู้บริโภคเป็นเลิศ (PP & P Excellence)",
      subGroups: [
        {
          subTitle: "PP & P 1 (3 ตัวชี้วัด)",
          indicators: [
            {
              id: 1,
              name: "อัตราส่วนการตายมารดาไทยต่อการเกิดมีชีพแสนคน",
              target: "ไม่เกิน 15 ต่อการเกิดมีชีพแสนคน",
              details: "A = จํานวนมารดาตายระหว่างตั้งครรภ์ คลอด และหลังคลอดภายใน 42 วัน ทุกสาเหตุยกเว้นอุบัติเหตุ ในช่วงเวลาที่กําหนด | B = จํานวนเด็กเกิดมีชีพในช่วงเวลาเดียวกัน | สูตร: (A/B) x 100,000",
              check: "X",
              department: "PCT สูติกรรม",
              result: "223.71"
            },
            {
              id: 2,
              name: "ร้อยละของเด็ก อายุ 0 - 5 ปี มีพัฒนาการสมวัย",
              target: "ร้อยละ 88",
              details: "A = จํานวนเด็กอายุ 9, 18, 30, 42 และ 60 เดือน ที่ได้รับการตรวจคัดกรองพัฒนาการโดยใช้คู่มือ DSPM แล้วผลการตรวจคัดกรองผ่านครบ 5 ด้านในการตรวจคัดกรองครั้งแรก | a = จํานวนเด็กที่สงสัยล่าช้าและได้รับการกระตุ้นพัฒนาการด้วยคู่มือ AIM แล้วกลับมาสมวัยในการตรวจซ้ำ 5 ด้านภายใน 30 วัน (1B260) | B = จํานวนเด็กอายุ 9, 18, 30, 42 และ 60 เดือน ทั้งหมดในช่วงเวลาที่กําหนด | สูตร: (A9+a9)+(A18+a18)+(A30+a30)+(A42+a42)+(A60+a60) × 100/B",
              check: "/",
              department: "กลุ่มงานเวชกรรมสังคม",
              result: "ร้อยละ 94.68"
            },
            {
              id: 3,
              name: "ร้อยละของเด็กปฐมวัยที่มีพัฒนาการล่าช้าเข้าถึงบริการพัฒนาการและสุขภาพจิตที่ได้มาตรฐาน",
              target: "ร้อยละ 30",
              details: "A = จำนวนเด็กปฐมวัยอายุ 0 – 5 ปี ที่มีพัฒนาการล่าช้าที่เข้าถึงบริการพัฒนาการและสุขภาพจิตที่ได้มาตรฐาน (สะสม) ในเขตสุขภาพ | B = จำนวนเด็กปฐมวัยอายุ 0 – 5 ปี ในเขตสุขภาพ x ความชุก 21.7 | สูตร: (A/B) x 100",
              check: "ตัวชี้วัดระดับจังหวัด",
              department: "OPD เด็ก กลุ่มงานเวชกรรมสังคม",
              result: "NA"
            },
            {
              id: 4,
              name: "ร้อยละของเด็ก อายุ 0 – 5 ปี ฟันดีไม่มีผุ (Cavity Free)",
              target: "ร้อยละ 80",
              details: "A = จํานวนเด็กอายุ 0 - 5 ปี 11 เดือน 29 วัน DFILLING>=0 และ DEXTRACT=0 และ DCARIES=0 | B = จํานวนเด็กอายุ 0 – 5 ปี 11 เดือน 29 วัน ที่ได้รับการตรวจคัดกรองสภาวะทันตสุขภาพ | สูตร: (A/B) x 100",
              check: "X",
              department: "กลุ่มงานทันตกรรม",
              result: "ร้อยละ 69.37"
            },
            {
              id: 5,
              name: "ร้อยละของเด็กอายุ 0-2 ปี สูงดีส่วนรวมและส่วนสูงเฉลี่ย",
              target: "ร้อยละ 56",
              details: "A = จำนวนเด็ก 0-2 ปี (18, 24 เดือน) ที่มีส่วนสูงระดับดีและสมส่วน | B = จำนวนเด็ก 0-2 ปี ทั้งหมดที่ชั่งน้ำหนักวัดส่วนสูง | สูตร: (A/B) x 100",
              check: "/",
              department: "กลุ่มงานเวชกรรมสังคม",
              result: "ร้อยละ 63.09"
            }
          ]
        },
        {
          subTitle: "PP & P 2 (2 ตัวชี้วัด)",
          indicators: [
            {
              id: 6,
              name: "อัตราความรอบรู้ด้านสุขภาพของประชาชนไทย อายุ 15 ปี ขึ้นไป",
              target: "ร้อยละ 83",
              details: "A = จํานวนกลุ่มตัวอย่างที่มีผลการประเมินในระดับเพียงพอขึ้นไป | B = จํานวนกลุ่มตัวอย่างทั้งหมดที่ได้รับการประเมิน | สูตร: (A / B) x 100",
              check: "X",
              department: "กลุ่มงานสุขศึกษา",
              result: "อยู่ระหว่างดำเนินการ"
            }
          ]
        },
        {
          subTitle: "PP & P 3 (3 ตัวชี้วัด)",
          indicators: [
            {
              id: "7.1",
              name: "ร้อยละการตรวจติดตามยืนยันวินิจฉัยกลุ่มสงสัยป่วยโรคเบาหวาน",
              target: "≥ ร้อยละ 70",
              details: "A = จํานวนประชากรใน B ได้รับการตรวจยืนยันวินิจฉัยโดยการตรวจ FPG ทางห้องปฏิบัติการ ภายใน 1 - 180 วัน | B = จํานวนประชากรอายุ 35 ปี ขึ้นไป ที่ได้รับการคัดกรองและเป็นกลุ่มสงสัยป่วยโรคเบาหวาน | สูตร: (A/B) x 100",
              check: "X",
              department: "คลินิกเบาหวาน กลุ่มงานเวชกรรมสังคม",
              result: "ร้อยละ 35.28"
            },
            {
              id: "7.2",
              name: "ร้อยละการตรวจติดตามยืนยันวินิจฉัยกลุ่มสงสัยป่วยโรคความดันโลหิตสูง",
              target: "≥ ร้อยละ 70",
              details: "A = จำนวนประชากรใน B ได้รับการตรวจยืนยันวินิจฉัยความดันโลหิตตามแนวทางเวชปฏิบัติฯ | B = จํานวนประชากรอายุ 35 ปี ขึ้นไป ที่ได้รับการคัดกรองและเป็นกลุ่มสงสัยป่วยโรคความดันโลหิตสูง | สูตร: (A/B) x 100",
              check: "/",
              department: "คลินิกความดัน กลุ่มงานเวชกรรมสังคม",
              result: "ร้อยละ 41.49"
            },
            {
              id: 8,
              name: "อัตราการเสียชีวิตและบาดเจ็บจากอุบัติเหตุทางถนนในกลุ่มเด็กและเยาวชน (1-18 ปี) ลดลง",
              target: "ร้อยละ 3",
              details: "A = (จํานวนผู้เสียชีวิตรวมกับจํานวนผู้บาดเจ็บปี 2569) – (จํานวนผู้เสียชีวิตรวมกับจํานวนผู้บาดเจ็บค่าเฉลี่ย 3 ปี 2566 - 2568) | B = จํานวนผู้เสียชีวิตรวมกับจํานวนผู้บาดเจ็บค่าเฉลี่ย ปี 2566 - 2568 | สูตร: (A/B) x 100",
              check: "/",
              department: "กลุ่มงานอุบัติเหตุฉุกเฉิน",
              result: "ร้อยละ 30.67"
            },
            {
              id: 9,
              name: "ร้อยละความครอบคลุมของวัคซีนป้องกันหัด-คางทูม-หัดเยอรมัน เข็มที่ 2 (MMR2) ในเด็กอายุต่ำกว่า 3 ปี",
              target: ">= ร้อยละ 95",
              details: "A = ประชากรเป้าหมายที่ได้รับวัคซีน... | B = ประชากรเป้าหมายที่อาศัยอยู่จริง... | สูตร: (A/B) x 100",
              check: "/",
              department: "กรมควบคุมโรค",
              result: "ร้อยละ 100"
            }
          ]
        },
        {
          subTitle: "PP & P 4 (1 ตัวชี้วัด)",
          indicators: [
            {
              id: 10,
              name: "ร้อยละของโรงพยาบาลที่พัฒนาอนามัยสิ่งแวดล้อมได้ตามเกณฑ์ GREEN & CLEAN Hospital Challenge",
              target: "ร้อยละ 80",
              details: "คะแนนที่ทําได้ | สูตร: (คะแนนที่ทําได้ x 80 ) / 100",
              check: "/",
              department: "คลินิกเบาหวาน กลุ่มงานเวชกรรมสังคม",
              result: "ผ่านระดับท้าทาย"
            },
          ]
        }
      ]
    }
  ];

  const kpiDataServiceFull = [
    {
      groupTitle: "ประเด็นที่ 2 ระบบบริการสุขภาพเป็นเลิศ (Service Excellence)",
      subGroups: [
        {
          subTitle: "Service 1 (ไต, ติดเชื้อ, วัณโรค)",
          indicators: [
            {
              id: "11",
              name: "ร้อยละผู้ป่วยไตเรื้อรัง stage 5 รายใหม่ ลดลงจากปีงบประมาณก่อนหน้า",
              target: "ลดลง >= ร้อยละ 5",
              details: "A = จำนวนผู้ป่วยโรคไตเรื้อรังระยะที่ 5 รายใหม่ ของปีงบประมาณปัจจุบั | B = จำนวนผู้ป่วยโรคไตเรื้อรังระยะที่ 5 รายใหม่ ของปีงบประมาณก่อนหน้า | ( B – A) x 100/B",
              check: "/",
              department: "กรมการแพทย์",
              result: "26.15"
            },
            {
              id: "12",
              name: "อัตราตายผู้ป่วยติดเชื้อในกระแสเลือดแบบรุนแรงชนิด community-acquired",
              target: "< ร้อยละ 24",
              details: "A = จํานวนผู้ป่วยที่เสียชีวิต (Dead)... | C = จํานวนผู้ป่วยที่ปฏิเสธการรักษา... | D = จํานวนผู้ป่วยติดเชื้อ... | (A+C) / D × 100",
              check: "X",
              department: "กรมการแพทย์",
              result: "ร้อยละ 38.1"
            },
            {
              id: "13.1",
              name: "อัตราความสําเร็จการรักษาผู้ป่วยวัณโรคปอดรายใหม่",
              target: "> 88",
              details: "A = จํานวนผู้ป่วยวัณโรคปอดรายใหม่ ที่ขึ้นทะเบียน... | B = จํานวนผู้ป่วยวัณโรคปอดรายใหม่... | (A/B) x 100",
              check: "/",
              department: "กรมควบคุมโรค",
              result: "0"
            },
            {
              id: "13.2",
              name: "ผู้ต้องขังก่อนปล่อยตัวพ้นโทษได้รับการคัดกรองวัณโรคด้วยการถ่ายภาพรังสีทรวงอก (CXR)",
              target: ">= ร้อยละ 35",
              details: "A =จํานวนผู้ต้องขังก่อนปล่อยตัวพ้นโทษที่ได้รับการคัดกรอง CXR | B =จํานวนผู้ต้องขังก่อนปล่อยตัวพ้นโทษทั้งหมด | C = จำนวนผู้ต้องขังก่อนปล่อยตัวพ้นโทษที่ได้รับคัดกรองมาก่อนภายใน 6 เดือน | A/(B-C) x 100",
              check: "/",
              department: "กรมควบคุมโรค",
              result: "ร้อยละ 100"
            }
          ]
        },
        {
          subTitle: "Service 2 (Stroke, STEMI, ทารก, Palliative)",
          indicators: [
            {
              id: "14",
              name: "อัตราตายของผู้ป่วยโรคหลอดเลือดสมอง (Stroke; I60 - I64)",
              target: "< ร้อยละ 7",
              details: "A = จํานวนครั้งของการจําหน่ายสถานะตายของผู้ป่วยโรคหลอดเลือดสมอง... | B = จํานวนครั้งของการจําหน่ายของผู้ป่วยโรคหลอดเลือดสมอง... | (A/B) × 100",
              check: "/",
              department: "กรมการแพทย์",
              result: "ร้อยละ 7.95"
            },
            {
              id: "14.1",
              name: "ร้อยละผู้ป่วยโรคหลอดเลือดสมอง (I60 - I64) ที่มีอาการไม่เกิน 72 ชั่วโมง ได้รับการรักษาใน Stroke Unit",
              target: ">= ร้อยละ 80",
              details: "A = จํานวนผู้ป่วยโรคหลอดเลือดสมอง (I60 - I64) ที่มีอาการไม่เกิน 72 ชั่วโมง... | B = จํานวนผู้ป่วยโรคหลอดเลือดสมอง (I60 - I64)... | (A/B) × 100",
              check: "/",
              department: "กรมการแพทย์",
              result: "ร้อยละ 96.6"
            },
            {
              id: "15",
              name: "อัตราตายของผู้ป่วยโรคกล้ามเนื้อหัวใจตายเฉียบพลันชนิด STEMI",
              target: "< ร้อยละ 8",
              details: "A = จํานวนผู้ป่วยใน รหัส ICD10 - WHO - I21.0 - I21.3 ที่เสียชีวิต... | B = จํานวนผู้ป่วยใน รหัส ICD10 - WHO - I21.0 - I21.3 ที่รับไว้รักษา... | (A/B) x 100",
              check: "X",
              department: "กรมการแพทย์",
              result: "ร้อยละ 7.69"
            },
            {
              id: "15.1",
              name: "ร้อยละของผู้ป่วย STEMI ที่ได้รับยาละลายลิ่มเลือดได้ตามมาตรฐานเวลาที่กำหนด",
              target: ">= ร้อยละ 70",
              details: "A = จำนวนครั้งการรักษาที่สามารถให้ยาละลายลิ่มเลือดภายใน 30 นาที... | B = จำนวนผู้ป่วย STEMI ที่มาถึงโรงพยาบาล... | (A/B) x 100",
              check: "X",
              department: "กรมการแพทย์",
              result: "ร้อยละ 0"
            },
            {
              id: "15.2",
              name: "ร้อยละของผู้ป่วย STEMI ที่ได้รับการทำ Primary PCI ได้ตามมาตรฐานเวลาที่กำหนด",
              target: ">= ร้อยละ 70",
              details: "C = จำนวนครงั้ ที่สามารถส่งต่อไปที่โรงพยาบาลที่ทำ PCI ได้... | D = จำนวนผู้ป่วย STEMI ที่มาถึงโรงพยาบาล... | (C/D) x 100",
              check: "/",
              department: "กรมการแพทย์",
              result: "ร้อยละ 90.09"
            },
            {
              id: "15.3",
              name: "อัตราตายของผู้ป่วยโรคกล้ามเนื้อหัวใจตายเฉียบพลันชนิด STEMI ภายใน 30 วัน",
              target: "< ร้อยละ 9",
              details: "A = จำนวนผู้ป่วยใน รหัส ICD10... | B = จำนวนผู้ป่วยใน รหัส ICD10... | (A/B) x 100",
              check: "/",
              department: "กรมการแพทย์",
              result: "0"
            },
            {
              id: "16",
              name: "อัตราตายทารกแรกเกิดอายุน้อยกว่าหรือเท่ากับ 28 วัน",
              target: "< 3.60 ต่อ 1,000",
              details: "A = จํานวนทารกที่เสียชีวิต น้อยกว่าหรือเท่ากับ 28 วัน | B = จํานวนทารกแรกเกิดมีชีพ | (A/B) x 1,000",
              check: "/",
              department: "กรมการแพทย์",
              result: "0"
            },
            {
              id: "16.1",
              name: "จํานวนเตียง NICU ในเขตสุขภาพ",
              target: "<= 1:300 ทารกเกิดมีชีพ",
              details: "A = จํานวนทารกเกิดมีชีพเฉลี่ยของ ปีงบประมาณ พ.ศ. 2566 - 2568 | B = จํานวนเตียง NICU | A/B",
              check: "/",
              department: "กรมการแพทย์",
              result: "1:76.92"
            },
            {
              id: "16.2",
              name: "ร้อยละของการใช้นมแม่ Exclusive breastfeeding ในทารกป่วยเมื่อกลับบ้าน",
              target: "> ร้อยละ 65",
              details: "A = จํานวนทารกแรกเกิดป่วยได้รับนมแม่อย่างเดียว... | B = จํานวนทารกแรกเกิดป่วยจําหน่ายทั้งหมด | (A/B) x 100",
              check: "X",
              department: "กรมการแพทย์",
              result: "0"
            },
            {
              id: "17",
              name: "ร้อยละความครอบคลุมการคัดกรองการได้ยินของทารกแรกเกิด",
              target: "> ร้อยละ 95",
              details: "A = จํานวนทารกแรกเกิดมีชีพทั้งหมด... | B = จํานวนทารกแรกเกิดมีชีพทั้งหมด ในโรงพยาบาล... | (A/B) x 100",
              check: "/",
              department: "กรมการแพทย์",
              result: "ร้อยละ 112.47"
            },
            {
              id: "18",
              name: "โรงพยาบาลศูนย์/ทั่วไป มีหอผู้ป่วยประคับประคอง/ชีวาภิบาล",
              target: "มีให้บริการ",
              details: "มีหอผู้ป่วยประคับประคองหรือชีวาภิบาลของโรงพยาบาล และให้บริการระบบชีวาภิบาล",
              check: "/",
              department: "กรมการแพทย์",
              result: "3"
            },
            {
              id: "18.1",
              name: "1. ค่าเฉลี่ยคะแนนถ่วงน้ำหนักความพร้อมด้านทรัพยากร Palliative Care (มิติที่ 1)",
              target: "ระดับ 4",
              details: "A =ผลรวมของผลคูณของ “ระดับทรัพยากรและระบบ (A1)” คูณกับ “คะแนนถ่วงน้ําหนัก (A2)”... | B = ผลรวมคะแนนถ่วงน้ำหนักของโรงพยาบาลทั้งจังหวัด (SUM: A2) | A/B",
              check: "/",
              department: "กรมการแพทย์",
              result: "3"
            },
            {
              id: "18.2",
              name: "2. ร้อยละของผู้ป่วยผู้ใหญ่สามารถเข้าถึงบริการ Palliative Care (มิติที่ 2)",
              target: "ร้อยละ 80",
              details: "A =จํานวนผู้ป่วย Palliative Careผู้ใหญ่... | B = ค่าคาดการณ์จํานวนผู้ป่วยผู้ใหญ่ที่ต้องการบริการ... | (A/B) x 100",
              check: "X",
              department: "กรมการแพทย์",
              result: "ร้อยละ 68.47"
            },
            {
              id: "18.3",
              name: "3. ร้อยละของผู้ป่วยเด็กสามารถเข้าถึงบริการ Palliative Care (มิติที่ 2)",
              target: "ร้อยละ 50",
              details: "A =จํานวนผู้ป่วย Palliative Care เด็ก... | B = ค่าคาดการณ์จํานวนผู้ป่วยเด็กที่ต้องการบริการ... | (A/B) x 100",
              check: "X",
              department: "กรมการแพทย์",
              result: "ร้อยละ 0"
            },
            {
              id: "18.4",
              name: "4. ร้อยละของผู้ป่วย Palliative Care ได้รับบริการดูแลต่อเนื่องที่บ้าน/ชุมชน (มิติที่ 3)",
              target: "ร้อยละ 55",
              details: "A = จำนวนผู้ป่วย Palliative Care(Z51.5) ที่ไรับการดูแลต่อเนื่อง ที่บ้าน | B = จำนวนผู้ป่วย Palliative Care (Z51.5)ที่เข้าสู่บริการ (HDC) | (A/B) x 100",
              check: "/",
              department: "กรมการแพทย์",
              result: "ร้อยละ 66.21"
            },
            {
              id: "18.5",
              name: "5. ร้อยละของผู้ป่วย PC ที่ได้รับการทำ Family Meeting และ ACP (มิติที่ 4)",
              target: "ร้อยละ 85",
              details: "A =จำนวนผู้ป่วย PC (Z51.5) ที่ได้รับการจัดทำ FM หรือ ACP (Z71.8) | B = จำนวนผู้ป่วย Palliative Care (Z51.5) ที่เข้าสู่บริการ | (A/B) x 100",
              check: "/",
              department: "กรมการแพทย์",
              result: "ร้อยละ 97.77"
            },
            {
              id: "18.6",
              name: "6. อัตราประชากรที่จัดทำ Living Will (ต่อประชากร 1,000 คน) (มิติที่ 4)",
              target: "15",
              details: "A =จำนวนประชาชนที่มีอายุมากกว่า 18 ปี บริบูรณ์ ที่ได้จัดทำ Living Willเป็นลายลักษณอักษร | B = จำนวนประชากรของประเทศไทยที่มีอายุมากกว่า 18 ปี บริบูรณ์ | (A/B) x 1000",
              check: "X",
              department: "กรมการแพทย์",
              result: "NA"
            },
            {
              id: "18.7",
              name: "7. ร้อยละของผู้ป่วย Palliative Care ที่ได้รับการดูแลตามแผนดูแลล่วงหน้า (ACP) อย่างมีคุณภาพ (มิติที่ 4)",
              target: "ร้อยละ 60",
              details: "A =จํานวนผู้ป่วยประคับประคอง (Z51.5)ที่ได้รับการจัดทํา ACP... | B = จํานวนผู้ป่วยประคับประคอง (Z51.5)... | (A/B) x 100",
              check: "/",
              department: "กรมการแพทย์",
              result: "ร้อยละ 97.77"
            },
            {
              id: "18.8",
              name: "8. ร้อยละของผู้ป่วยมะเร็งระยะประคับประคองที่ได้รับการจัดการอาการปวด (มิติที่ 5)",
              target: "ร้อยละ 55",
              details: "A =จํานวนผู้ป่วยกลุ่มโรคมะเร็งระยะประคับประคอง... | B = จํานวนผู้ป่วยกลุ่มโรคมะเร็งระยะประคับประคอง... | (A/B) x 100",
              check: "/",
              department: "กรมการแพทย์",
              result: "ร้อยละ 77.37"
            },
            {
              id: "18.9",
              name: "9. โรงพยาบาลที่ให้บริการ Home ward for active dying patient (มิติที่ 6)",
              target: "มีให้บริการ",
              details: "โรงพยาบาลที่ให้บริการ Home ward for active dying patient",
              check: "/",
              department: "กรมการแพทย์",
              result: "มี"
            }
          ]
        },
        {
          subTitle: "Service 3 (บริจาคอวัยวะ, มะเร็ง)",
          indicators: [
            {
              id: "19",
              name: "อัตราส่วนผู้บริจาคอวัยวะสมองตายที่ได้รับการผ่าตัดนำอวัยวะออก ต่อผู้ป่วยเสียชีวิต",
              target: "เพิ่มขี้นร้อยละ 10",
              details: "A = จํานวนผู้บริจาคอวัยวะจากผู้ป่วยสมองตายที่ได้รับการผ่าตัดนําอวัยวะออก... | B = จํานวนผู้ป่วยที่เสียชีวิตในโรงพยาบาลจากทุกสาเหตุ... | (A/B) x 100",
              check: "X",
              department: "กรมการแพทย์",
              result: "0"
            },
            {
              id: "20.1",
              name: "1) ร้อยละของผู้ป่วยที่ได้รับการรักษาด้วยการผ่าตัดภายในระยะเวลา 4 สัปดาห์",
              target: ">= ร้อยละ 70",
              details: "A(s) = จํานวนผู้ป่วยที่แพทย์วางแผนการรักษาด้วยการผ่าตัด... | B(s) = จํานวนผู้ป่วยที่ได้รับการผ่าตัดเพื่อรักษามะเร็งทั้งหมด... | (A(s) / B(s)) X 100",
              check: "/",
              department: "กรมการแพทย์",
              result: "ร้อยละ 85.71"
            },
            {
              id: "20.2",
              name: "2) ร้อยละของผู้ป่วยที่ได้รับการรักษาด้วยเคมีบำบัดภายในระยะเวลา 6 สัปดาห์",
              target: ">= ร้อยละ 70",
              details: "A(c) = จํานวนผู้ป่วยที่แพทย์วางแผนการรักษาด้วยเคมีบําบัด... | B(c) = จํานวนผู้ป่วยที่ได้รับเคมีบําบัดเพื่อรักษามะเร็งทั้งหมด... | (A(c) / B(c)) X 100",
              check: "/",
              department: "กรมการแพทย์",
              result: "ร้อยละ 100"
            },
            {
              id: "20.3",
              name: "3) ร้อยละของผู้ป่วยที่ได้รับการรักษาด้วยรังสีรักษาภายในระยะเวลา 6 สัปดาห์",
              target: ">= ร้อยละ 60",
              details: "A(R) = จํานวนผู้ป่วยที่แพทย์วางแผนการรักษาด้วยรังสีรักษา... | B(R) = จํานวนผู้ป่วยที่ได้รับรังสีรักษาเพื่อรักษามะเร็งทั้งหมด... | (A(R) / B(R)) X 100",
              check: "/",
              department: "กรมการแพทย์",
              result: "ร้อยละ 93.48"
            }
          ]
        },
        {
          subTitle: "Service 4 (ปฐมภูมิ)",
          indicators: [
            {
              id: "21",
              name: "จำนวนหน่วยบริการปฐมภูมิที่ผ่านเกณฑ์คุณภาพมาตรฐานตาม พ.ร.บ. ระบบสุขภาพปฐมภูมิ",
              target: "ร้อยละ 85",
              details: "A = จํานวนหน่วยบริการที่ผ่านเกณฑ์คุณภาพมาตรฐาน | B = จํานวนหน่วยบริการทั้งหมดที่มีในระบบข้อมูลและมาตรฐานหน่วยบริการปฐมภูมิ | (A/B) x 100",
              check: "/",
              department: "กองสนับสนุนระบบสุขภาพปฐมภูมิ สป.",
              result: "ร้อยละ 100"
            }
          ]
        },
        {
          subTitle: "Service 5 (สุขภาพจิต, ยาเสพติด)",
          indicators: [
            {
              id: "22",
              name: "อัตราการฆ่าตัวตายสำเร็จ",
              target: "7.8 ต่อประชากรแสนคน",
              details: "A = รายงานการเฝ้าระวังการทําร้ายตนเอง รง.506S version 11 กรณีเสียชีวิต | B = จํานวนประชากรกลางปี 2568... | (A/B) x 100,000",
              check: "/",
              department: "กรมสุขภาพจิต",
              result: "6.95 ต่อประชากรแสนคน"
            },
            {
              id: "22.1",
              name: "ร้อยละของผู้พยายามฆ่าตัวตายเข้าถึงบริการที่มีประสิทธิภาพ",
              target: ">= ร้อยละ 70",
              details: "A = จํานวนผู้พยายามฆ่าตัวตายเข้าถึงบริการที่มีประสิทธิภาพ... | B = จํานวนผู้พยายามฆ่าตัวตายทั้งหมดอายุตั้งแต่ 10 ปีขึ้นไป... | (A/B) x 100",
              check: "/",
              department: "กรมสุขภาพจิต",
              result: "ร้อยละ 95.23"
            },
            {
              id: "23",
              name: "ร้อยละของผู้ป่วยยาเสพติดเข้าสู่กระบวนการบำบัดรักษาและได้รับการดูแลต่อเนื่อง (Retention Rate)",
              target: "ร้อยละ 75",
              details: "A = จำนวนผู้ป่วยยาเสพติดที่เข้าสู่กระบวนการบำบัดรักษาและฟื้นฟู... | B = จำนวนผู้ป่วยยาเสพติดที่เข้าสู่กระบวนการบำบัดรักษาทั้งหมด... | (A/B) x100",
              check: "/",
              department: "สคส.สธ./กรมการแพทย์/กรมสุขภาพจิต",
              result: "ร้อยละ 100"
            }
          ]
        }
      ]
    }
  ];

  const kpiDataGroups3to5 = [
    {
      groupTitle: "ประเด็นที่ 3 บุคลากรเป็นเลิศ (People Excellence)",
      subGroups: [
        {
          subTitle: "Service Plan สาขาที่ 1 : การบริหารจัดการกำลังคน",
          indicators: [
            {
              id: "24",
              name: "สัดส่วนการกระจายแพทย์ในโรงพยาบาลชุมชนสังกัดสำนักงานปลัดกระทรวงสาธารณสุข",
              target: "รพช. ผ่านเกณฑ์ >= ร้อยละ 80",
              details: "ไม่มีรายละเอียดสูตรคำนวณในไฟล์ (ระบุเพียงเป้าหมาย)",
              check: "NA",
              department: "กองบริหารทรัพยากรบุคคล สป.",
              result: "NA"
            }
          ]
        }
      ]
    },
    {
      groupTitle: "ประเด็นที่ 4 บริหารเป็นเลิศด้วยธรรมาภิบาล (Governance Excellence)",
      subGroups: [
        {
          subTitle: "Digital Health & RLU Hospital",
          indicators: [
            {
              id: "25",
              name: "ร้อยละของหน่วยงานที่ผ่านเกณฑ์มาตรฐานความมั่นคงปลอดภัยไซเบอร์ระดับสูง",
              target: "ร้อยละ 100",
              details: "ประเมินตามเกณฑ์มาตรฐานความมั่นคงปลอดภัยไซเบอร์ (Cyber Security)",
              check: "/",
              department: "ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร สป.",
              result: "ผ่าน"
            },
            {
              id: "26",
              name: "ร้อยละของโรงพยาบาลในเขตสุขภาพผ่านเกณฑ์ RLU hospital Plus",
              target: "ผ่านเกณฑ์พัฒนา",
              details: "ประเมินผลการผ่านเกณฑ์ RLU Hospital Plus ตามรายการย่อย 26.1 - 26.4",
              check: "/",
              department: "กรมวิทยาศาสตร์การแพทย์",
              result: "ผ่าน"
            },
            {
              id: "26.1",
              name: "ร้อยละของผู้ป่วยโรคเบาหวาน ได้รับการตรวจ HbA1c ซ้ำภายใน 90 วัน",
              target: "ไม่เกินร้อยละ 5",
              details: "C = จำนวนครั้งของผู้ป่วยโรคเบาหวานที่ได้รับการตรวจ HbA1c ซ้ำภายใน 90 วัน | D = จำนวนครั้งของการสั่งตรวจ HbA1c ในผู้ป่วยนอกโรคเบาหวานทั้งหมด | (C/D) x 100",
              check: "/",
              department: "กรมวิทยาศาสตร์การแพทย์",
              result: "ร้อยละ 4.14"
            },
            {
              id: "26.2",
              name: "ร้อยละของผู้ป่วยนอกที่ได้รับการตรวจ Lipid Profile ซ้ำภายใน 180 วัน",
              target: "ไม่เกินร้อยละ 5",
              details: "G = จำนวนครั้งที่ได้รับการตรวจ Lipid Profile ซ้ำภายใน 180 วัน | H = จำนวนครั้งที่ได้รับการตรวจ Lipid Profile ทั้งหมด | (G/H) x 100",
              check: "/",
              department: "กรมวิทยาศาสตร์การแพทย์",
              result: "ร้อยละ 3.39"
            },
            {
              id: "26.3",
              name: "ร้อยละของผู้ป่วยนอกที่ได้รับการตรวจ Thyroid Function Test ซ้ำภายใน 30 วัน",
              target: "ไม่เกินร้อยละ 5",
              details: "K = จำนวนครั้งที่ได้รับการตรวจ Thyroid Function Test ซ้ำภายใน 30 วัน | L = จำนวนครั้งที่ได้รับการตรวจ Thyroid Function Test ทั้งหมด | (K/L) x 100",
              check: "/",
              department: "กรมวิทยาศาสตร์การแพทย์",
              result: "ร้อยละ 0.49"
            },
            {
              id: "26.4",
              name: "ร้อยละของผู้รับบริการ ได้รับการตรวจ Triglycerides ซ้ำภายใน 90 วัน",
              target: "ไม่เกินร้อยละ 5",
              details: "O = จำนวนครั้งที่ได้รับการตรวจ Triglycerides ซ้ำภายใน 90 วัน | P = จำนวนครั้งที่ได้รับการตรวจ Triglycerides ทั้งหมด | (O/P) x 100",
              check: "/",
              department: "กรมวิทยาศาสตร์การแพทย์",
              result: "ร้อยละ 3.02"
            },
            {
              id: "27",
              name: "ร้อยละของหน่วยบริการที่ผ่านเกณฑ์การประเมินประสิทธิภาพ Total Performance Score (TPS)",
              target: "ผ่านเกณฑ์ TPS",
              details: "พิจารณาจากผลการประเมินประสิทธิภาพตามเกณฑ์ QOF และเกณฑ์อื่นๆ",
              check: "/",
              department: "กองเศรษฐกิจสุขภาพฯ สป.",
              result: "ผ่านเกณฑ์ระดับ B"
            }
          ]
        }
      ]
    },
    {
      groupTitle: "ประเด็นที่ 5 เศรษฐกิจสุขภาพเป็นเลิศ (Health-Related Economy Excellence)",
      subGroups: [
        {
          subTitle: "Hub for Wellness and Medical Services",
          indicators: [
            {
              id: "28",
              name: "อัตราการเพิ่มขึ้นของจำนวนสถานประกอบการด้านการท่องเที่ยวเชิงสุขภาพที่ได้รับมาตรฐาน",
              target: "ร้อยละ 20",
              details: "A = จํานวนสถานประกอบการเพื่อสุขภาพ... | B = จํานวนสถานประกอบการเพื่อสุขภาพ... | (A/B x 100)",
              check: "ตัวชี้วัดระดับจังหวัด",
              department: "กรมสนับสนุนบริการสุขภาพ",
              result: "NA"
            },
            {
              id: "29",
              name: "จำนวนผลิตภัณฑ์สุขภาพที่ได้รับการพัฒนาให้มีศักยภาพในการส่งออก",
              target: "ร้อยละ 100 ของค่าเป้าหมาย",
              details: "A = จํานวนผลิตภัณฑ์สุขภาพชุมชน... | B = จํานวนผลิตภัณฑ์สุขภาพชุมชนเป้าหมาย | (A/B) x 100",
              check: "ตัวชี้วัดระดับจังหวัด",
              department: "อย.",
              result: "NA"
            },
            {
              id: "30",
              name: "มูลค่าการใช้ยาสมุนไพรในสถานบริการสาธารณสุข",
              target: "เพิ่มขึ้นร้อยละ 3",
              details: "A = มูลค่าการใช้ยาสมุนไพร... ปี 2569 | B = มูลค่าการใช้ยาสมุนไพร... ปี 2568 | ((A-B)/B) x 100",
              check: "/",
              department: "กรมการแพทย์แผนไทยฯ",
              result: "ร้อยละ 24.33"
            }
          ]
        }
      ]
    }
  ];

  // รวมข้อมูลทั้งหมด
  const allGroups = [...kpiData, ...kpiDataServiceFull, ...kpiDataGroups3to5];

  // หาชื่อ Groups ทั้งหมดเพื่อนำมาทำเป็นปุ่ม Filter
  const availableGroups = ["ทั้งหมด", ...allGroups.map(g => g.groupTitle)];

  // กรองข้อมูลตามที่เลือก
  const filteredGroups = selectedGroup === "ทั้งหมด" 
    ? allGroups 
    : allGroups.filter(g => g.groupTitle === selectedGroup);

  // Helper Functions
  const getBadgeVariant = (status) => {
    if (status === "/") return "success";
    if (status === "X") return "destructive";
    if (status === "NA" || status === "ตัวชี้วัดระดับจังหวัด") return "neutral";
    return "warning";
  };

  const getStatusLabel = (status) => {
    if (status === "/") return "ผ่าน";
    if (status === "X") return "ไม่ผ่าน";
    if (status === "NA") return "N/A";
    if (status === "ตัวชี้วัดระดับจังหวัด") return "ระดับจังหวัด";
    return status;
  };

  const getProgressValue = (status, result) => {
    if (status === "/") return 100;
    if (status === "X") return 40;
    return 0;
  };

  const getProgressColor = (status) => {
    if (status === "/") return "bg-green-500";
    if (status === "X") return "bg-red-500";
    return "bg-slate-300";
  };

  const renderDetailLines = (detailsStr) => {
    if (!detailsStr) return null;
    return detailsStr.split('|').map((line, idx) => (
      <p key={idx} className="truncate" title={line.trim()}>
        {line.trim()}
      </p>
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
        <Navbar />
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            ตัวชี้วัดตรวจราชการ
          </h1>
          <p className="text-slate-500 mt-2">ปีงบประมาณ 2569 | เขตสุขภาพ</p>
        </header>
        {/* --- Filter Section --- */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex flex-wrap gap-2">
            {availableGroups.map((group, index) => (
              <button
                key={index}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap
                  ${selectedGroup === group 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-800"
                  }`}
              >
                {/* ตัดคำให้สั้นลงถ้าเป็นชื่อยาวๆ (Optional: แสดงแค่ "ประเด็นที่ X" ถ้าต้องการ) */}
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* --- Content Section --- */}
        <div className="space-y-12">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              ไม่พบข้อมูล
            </div>
          ) : (
            filteredGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="animate-fade-in">
                {/* Group Title */}
                <div className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur py-4 mb-4 border-b border-slate-200">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-700">
                    {group.groupTitle}
                  </h2>
                </div>

                <div className="space-y-8">
                  {group.subGroups.map((sub, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="text-lg font-semibold text-slate-600 mb-4 pl-2 border-l-4 border-blue-500">
                        {sub.subTitle}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {sub.indicators.map((item, itemIndex) => (
                          <Card key={`${item.id}-${itemIndex}`}>
                            <CardContent className="space-y-4">
                              <div className="flex justify-between items-start gap-3">
                                <div className="flex-1">
                                  <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mb-2">
                                    ตัวชี้วัดที่ {item.id}
                                  </span>
                                  <h4 className="font-semibold text-slate-800 leading-snug">
                                    {item.name}
                                  </h4>
                                  <p className="text-xs text-slate-400 mt-1">
                                    {item.department}
                                  </p>
                                </div>
                                <Badge variant={getBadgeVariant(item.check)}>
                                  {getStatusLabel(item.check)}
                                </Badge>
                              </div>

                              <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 space-y-1 border border-slate-100 flex-1">
                                {renderDetailLines(item.details)}
                              </div>

                              <div className="pt-2 space-y-3 mt-auto">
                                <div className="flex justify-between items-end text-sm">
                                  <div className="text-slate-500">
                                    <span className="block text-xs">ผลงาน</span>
                                    <span className={`font-bold text-lg ${item.check === '/' ? 'text-green-600' : item.check === 'X' ? 'text-red-600' : 'text-slate-600'}`}>
                                      {item.result}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-slate-400 mb-1">เป้าหมาย</p>
                                    <span className="text-xs font-medium bg-slate-100 px-2 py-1 rounded text-slate-600">
                                      {item.target}
                                    </span>
                                  </div>
                                </div>
                                
                                <Progress 
                                  value={getProgressValue(item.check, item.result)} 
                                  colorClass={getProgressColor(item.check)}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GovernmentDashboard;