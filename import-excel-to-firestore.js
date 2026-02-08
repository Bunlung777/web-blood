const admin = require("firebase-admin");
const XLSX = require("xlsx");
const path = require("path");

// =======================
// 1) Firebase
// =======================
const serviceAccount = require("./data/blood-hospital-500a5-firebase-adminsdk-fbsvc-32ec6c0840.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// =======================
// 2) Excel path
// =======================
const EXCEL_PATH = path.resolve("./data/สรุปตัวชี้วัดเสนอแพทย์ 68.xlsx");

// =======================
// 3) mapping (แบบเดิม + เพิ่ม totalCost)
// =======================
// ⚠️ index ต้องตรงกับไฟล์จริง
const yearCols = {
  "2563": { repeat: 1, total: 2, kpi: 3, cost: 4, totalCost: 5 },
  "2564": { repeat: 6, total: 7, kpi: 8, cost: 9, totalCost: 10 },
  "2565": { repeat: 11, total: 12, kpi: 13, cost: 14, totalCost: 15 },
  "2566": { repeat: 16, total: 17, kpi: 18, cost: 19, totalCost: 20 },
  "2567": { repeat: 21, total: 22, kpi: 23, cost: 24, totalCost: 25 },
  "2568": { repeat: 26, total: 27, kpi: 28, cost: 29, totalCost: 30 },
};


// =======================
// 4) helper: แปลงตัวเลข
// =======================
const num = (v) => {
  if (v === undefined || v === null || v === "") return null;
  if (typeof v === "string") {
    const cleaned = v.replace(/,/g, "").trim();
    if (cleaned === "" || cleaned === "-") return null;
    const n = Number(cleaned);
    return isNaN(n) ? null : n;
  }
  return Number(v);
};

// =======================
// 5) main
// =======================
async function main() {
  const wb = XLSX.readFile(EXCEL_PATH);
  const sheet = wb.Sheets[wb.SheetNames[0]];

  // array-of-arrays
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

  // ข้อมูลเริ่มแถวที่ 4 (index 3)
  const dataRows = rows.slice(3);

  const hospitalId = "loei";
  const hospitalRef = db.collection("hospitals").doc(hospitalId);

  await hospitalRef.set(
    {
      name: "Hospital Loei",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  let batch = db.batch();
  let writes = 0;

  for (const r of dataRows) {
    const test = r[0];
    if (!test) continue;

    const testId = String(test).trim();
    const testRef = hospitalRef.collection("tests").doc(testId);

    batch.set(testRef, { test: testId }, { merge: true });
    writes++;

    for (const [year, cols] of Object.entries(yearCols)) {
      const repeat = num(r[cols.repeat]);
      const total = num(r[cols.total]);
      const kpi = num(r[cols.kpi]);
      const cost = num(r[cols.cost]);             // ทุน
      const totalCost = num(r[cols.totalCost]);   // ต้นทุนรวม

      // ถ้าไม่มีข้อมูลเลย ข้าม
      if ([repeat, total, kpi, cost, totalCost].every(v => v === null)) continue;

      const yearRef = testRef.collection("years").doc(year);
      batch.set(
        yearRef,
        {
          year,
          repeat,
          total,
          kpi,
          cost,
          totalCost,
        },
        { merge: true }
      );
      writes++;
    }

    // กัน batch เกิน 500
    if (writes >= 450) {
      await batch.commit();
      batch = db.batch();
      writes = 0;
    }
  }

  if (writes > 0) {
    await batch.commit();
  }

  console.log("✅ Import done");
}

main().catch(console.error);
