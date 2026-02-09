import React from 'react';

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-slate-200 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const Badge = ({ children, variant, className = "" }) => {
  const variants = {
    success: "bg-green-100 text-green-800",
    destructive: "bg-red-100 text-red-800"
  };
  return (
    <span className={`px-2 py-1 rounded-full font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Progress = ({ value }) => (
  <div className="w-full bg-slate-200 rounded-full h-2">
    <div 
      className="bg-blue-600 h-2 rounded-full transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
);

const Government = () => {
const indicators = [
  {
    topic: "ประเด็นที่ 1 ส่งเสริมสุขภาพ ป้องกันโรคและคุ้มครองผู้บริโภคเป็นเลิศ (PP & P Excellence)",
    group: "PP & P 1",
    order: 1,
    name: "อัตราส่วนการตายมารดาไทยต่อการเกิดมีชีพแสนคน",

    definition: {
      A: "จำนวนมารดาตายระหว่างตั้งครรภ์ คลอด และหลังคลอดภายใน 42 วัน ทุกสาเหตุยกเว้นอุบัติเหตุ ในช่วงเวลาที่กำหนด",
      B: "จำนวนเด็กเกิดมีชีพในช่วงเวลาเดียวกัน",
      formula: "(A/B) x 100,000"
    },

    target6Month: "ไม่เกิน 15 ต่อการเกิดมีชีพแสนคน",
    result3Month: 223.71,
    evaluation: "ไม่ผ่าน"
  },
  {
    topic: "ประเด็นที่ 1 ส่งเสริมสุขภาพ ป้องกันโรคและคุ้มครองผู้บริโภคเป็นเลิศ (PP & P Excellence)",
    group: "PP & P 1",
    order: 2,
    name: "ร้อยละของเด็ก อายุ 0 - 5 ปี มีพัฒนาการสมวัย",

    definition: {
      A: "จำนวนเด็กอายุ 9, 18, 30, 42 และ 60 เดือน ที่ได้รับการตรวจคัดกรองพัฒนาการ โดยใช้คู่มือเฝ้าระวังและส่งเสริมพัฒนาการเด็กปฐมวัย (DSPM) แล้วผลการตรวจคัดกรองผ่านครบ 5 ด้าน ในการตรวจคัดกรองพัฒนาการครั้งแรก",
      a: "จำนวนเด็กอายุ 9, 18, 30, 42 และ 60 เดือน ที่ได้รับการตรวจคัดกรอง พัฒนาการพบพัฒนาการสงสัยล่าช้าและได้รับการติดตามกระตุ้น",
      B: "จำนวนเด็กอายุ 9, 18, 30, 42 และ 60 เดือน ทั้งหมดในช่วงเวลาที่กำหนด",
      formula: "(A9+a9)+(A18+a18)+(A30+a30)+(A42+a42)+(A60+a60) x 100 / B"
    },

    target6Month: "ร้อยละ 88",
    result3Month: 94.68,
    evaluation: "ผ่าน"
  },
  {
    topic: "ประเด็นที่ 1 ส่งเสริมสุขภาพ ป้องกันโรคและคุ้มครองผู้บริโภคเป็นเลิศ (PP & P Excellence)",
    group: "PP & P 1",
    order: 3,
    name: "ร้อยละของเด็กปฐมวัยที่มีพัฒนาการล่าช้าเข้าถึงบริการพัฒนาการและสุขภาพจิตที่ได้มาตรฐาน",

    definition: {
      A: "จำนวนเด็กปฐมวัยอายุ 0 - 5 ปี ที่มีพัฒนาการล่าช้าเข้าถึงบริการพัฒนาการและสุขภาพจิตที่ได้มาตรฐาน (สะสม) ในเขตสุขภาพ",
      B: "จำนวนเด็กปฐมวัยอายุ 0 - 5 ปี ในเขตสุขภาพ x ความชุก 21.7",
      formula: "(A/B) x 100"
    },

    target6Month: "ร้อยละ 30",
    result3Month: "NA",
    evaluation: "ตัวชี้วัดระดับจังหวัด"
  },
  {
    topic: "ประเด็นที่ 1 ส่งเสริมสุขภาพ ป้องกันโรคและคุ้มครองผู้บริโภคเป็นเลิศ (PP & P Excellence)",
    group: "PP & P 1",
    order: 4,
    name: "ร้อยละของเด็ก อายุ 0 - 5 ปี ฟันดีไม่มีผุ (Cavity Free)",

    definition: {
      A: "จำนวนเด็กในรายการ (B) ที่มีเงื่อนไขคือ เด็กอายุ 0 - 5 ปี 11 เดือน 29 วัน ที่ตรวจสุขภาพช่องปากแล้วไม่พบฟันผุ",
      B: "จำนวนเด็กอายุ 0 - 5 ปี 11 เดือน 29 วัน ที่ได้รับการตรวจสุขภาพช่องปากทั้งหมด",
      formula: "(A/B) x 100"
    },

    target6Month: "ร้อยละ 80",
    result3Month: 69.37,
    evaluation: "ไม่ผ่าน"
  },
  {
    topic: "ประเด็นที่ 1 ส่งเสริมสุขภาพ ป้องกันโรคและคุ้มครองผู้บริโภคเป็นเลิศ (PP & P Excellence)",
    group: "PP & P 1",
    order: 5,
    name: "ร้อยละของชุมชนมีการดำเนินการจัดการสุขภาพที่เหมาะสมกับประชาชน",

    definition: {
      A: "จำนวนชุมชนที่มีการดำเนินการจัดการสุขภาพตามเกณฑ์ที่กำหนด",
      B: "จำนวนชุมชนทั้งหมดในพื้นที่รับผิดชอบ",
      formula: "(A/B) x 100"
    },

    target6Month: "ร้อยละ 90",
    result3Month: 100,
    evaluation: "ผ่าน"
  },
  {
    topic: "ประเด็นที่ 1 ส่งเสริมสุขภาพ ป้องกันโรคและคุ้มครองผู้บริโภคเป็นเลิศ (PP & P Excellence)",
    group: "PP & P 2",
    order: 6,
    name: "อัตราความรอบรู้ด้านสุขภาพของประชาชนไทย อายุ 15 ปีขึ้นไป",

    definition: {
      A: "จำนวนประชาชนไทยอายุ 15 ปีขึ้นไปที่มีระดับความรอบรู้ด้านสุขภาพตามเกณฑ์",
      B: "จำนวนประชาชนไทยอายุ 15 ปีขึ้นไปที่ได้รับการประเมินทั้งหมด",
      formula: "(A/B) x 100"
    },

    target6Month: "ร้อยละ 85",
    result3Month: "อยู่ระหว่างดำเนินการ",
    evaluation: "ไม่ผ่าน"
  }
];


  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Dashboard ตัวชี้วัดตรวจราชการ
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {indicators.map((item) => (
          <Card key={item.order} className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500">{item.group}</p>
                  <h2 className="font-semibold text-slate-800 leading-snug w-80">
                    {item.order}. {item.name}
                  </h2>
                </div>
                <Badge
                  variant={item.pass ? "success" : "destructive"}
                  className="text-xs"
                >
                  {item.pass ? "ผ่าน" : "ไม่ผ่าน"}
                </Badge>
              </div>
              <div className="text-sm text-slate-600 space-y-1">
                <p><b>A:</b> {item.definition.A}</p>
                <p><b>B:</b> {item.definition.B}</p>
                <p className="text-slate-500"><b>สูตร:</b> {item.definition.formula}</p>
              </div>
              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">ผลงาน 3 เดือน</span>
                  <span className="font-semibold">{item.result}</span>
                </div>
                <Progress value={item.pass ? 100 : 40} />
                <p className="text-xs text-slate-400">เป้าหมาย 6 เดือน: {item.target}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Government;