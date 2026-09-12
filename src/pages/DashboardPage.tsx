import { useEffect, useState } from "react";
import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";

const STORAGE_KEY = "registrants";

export default function DashboardPage() {
  const [registrants, setRegistrants] = useState<Registrant[]>([]);

  // STEP 6: ดึงข้อมูลผู้ลงทะเบียนทั้งหมดจาก LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRegistrants(JSON.parse(stored));
      } catch {
        setRegistrants([]);
      }
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <p className="text-muted">ผู้ลงทะเบียนแล้ว ({registrants.length} คน)</p>

      {/* Conditional Rendering + Render Component */}
      {registrants.length === 0 ? (
        <p className="text-muted">ยังไม่มีผู้ลงทะเบียน</p>
      ) : (
        registrants.map((r) => (
          <UserRegisterCard key={r.id} registrant={r} />
        ))
      )}
    </div>
  );
}