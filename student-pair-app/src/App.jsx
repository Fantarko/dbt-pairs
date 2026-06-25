import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ===== ใส่ค่าของคุณตรงนี้ =====
const SUPABASE_URL = "https://qnwniwyqgwrrffsvhcma.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_FNyUTVdDL5YGo1GdNZ1VfA_rFUIZQJP";
// ================================

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const students = [
  { id: 1, code: "69319100001", name: "นายกวิน อ่อนชัย" },
  { id: 2, code: "69319100002", name: "นางสาวกาญจนา จำปาสอน" },
  { id: 3, code: "69319100003", name: "นางสาวจิดาภา  คัชฎทัศน์" },
  { id: 4, code: "69319100004", name: "นายชนาชิป บริบูรณ์" },
  { id: 5, code: "69319100005", name: "นายชิตติรัตน์ ขึ้นชม" },
  { id: 6, code: "69319100006", name: "นางสาวญาณิศา นาหมื่น" },
  { id: 7, code: "69319100007", name: "นางสาวญาดา ทุมโคตร" },
  { id: 8, code: "69319100008", name: "นางสาวณคประภา อินพิทักษ์" },
  { id: 9, code: "69319100009", name: "นางสาวณัฏฐณิชา โครดอ่อน" },
  { id: 10, code: "69319100010", name: "นายณัฐพล ศรีสังข์" },
  { id: 11, code: "69319100011", name: "นางสาวเดือนเต็ม เสียวสวาท" },
  { id: 12, code: "69319100012", name: "นางสาวตรีทิพยนิภา เหล่าวงษา" },
  { id: 13, code: "69319100013", name: "นายธนวัฒน์ โสภาศรี" },
  { id: 14, code: "69319100014", name: "นายธนากร นุสีวอ" },
  { id: 15, code: "69319100015", name: "นางสาวธัญชนก นามมนตรี" },
  { id: 16, code: "69319100016", name: "นางสาวธัญญรัตน์ กิ่งพุ่ม" },
  { id: 17, code: "69319100017", name: "นางสาวธิติยา คำวงศ์" },
  { id: 18, code: "69319100018", name: "นางสาวนิลาวรรณ สินธุรักษ์" },
  { id: 19, code: "69319100019", name: "นางสาวปริญากร เนื่องพัดร" },
  { id: 20, code: "69319100020", name: "นางสาวพชรนันท์ แก่นนาคำ" },
  { id: 21, code: "69319100021", name: "นายพรรณเศรษฐ์ คำพิทูลย์" },
  { id: 22, code: "69319100022", name: "นายพลวัฒน์ ท้าวพา" },
  { id: 23, code: "69319100023", name: "นางสาวพิญดา กมลคร" },
  { id: 24, code: "69319100024", name: "นางสาวพิมลพัชร พันตะเภา" },
  { id: 25, code: "69319100025", name: "นางสาวภัสสร ทุมขะ" },
  { id: 26, code: "69319100026", name: "นายภานุเดช สิทธิศักดิ์" },
  { id: 27, code: "69319100027", name: "นายยศภัทร มากหมุน" },
  { id: 28, code: "69319100028", name: "นายระพีพันธ์ คู่กระสังข์" },
  { id: 29, code: "69319100029", name: "นางสาววิภาดา คณารักษ์" },
  { id: 30, code: "69319100030", name: "นายวีรชัย วรสิทธิ์" },
  { id: 31, code: "69319100031", name: "นางสาวสุมิตรดรา เชื้อบุญมา" },
  { id: 32, code: "69319100032", name: "นายสุรชัย มีปากดี" },
  { id: 33, code: "69319100033", name: "นายอภิชาติ คำตุ" },
  { id: 34, code: "69319100034", name: "นายอรรถภูมิ มนตรีไพรี" },
  { id: 35, code: "69319100035", name: "นายภานุพงศ์ สืบแสนตอ" },
  { id: 36, code: "69319100036", name: "นางสาวศศิญา แกพิษ" },
  { id: 37, code: "69319100037", name: "นางสาวอริศา เมืองนาง" },
  { id: 38, code: "69319100039", name: "นายอัษฎาวุธ จันทพล" },
  { id: 39, code: "69319100045", name: "นายฐิติวัฒน์ คงบุ่งค้า" },
  { id: 40, code: "69319100060", name: "นายสัจจพงศ์ สุทธิสานนท์" },
  { id: 41, code: "69319100061", name: "นางสาวดวงฤดี ชัยหาญ" },
  { id: 42, code: "69319100062", name: "นางสาวหนึ่งฤทัย หงษา" },
  { id: 43, code: "69319100066", name: "นางสาวจุฑามณี นิสีดา" },
  { id: 44, code: "69319100067", name: "นายวรเดช โสภา" },
  { id: 45, code: "69319100067", name: "นางสาวบุณยวีร์ คามเขต" }
];

const AVATAR_COLORS = [
  ["#534AB7", "#EEEDFE"], ["#0F6E56", "#E1F5EE"], ["#993C1D", "#FAECE7"],
  ["#993556", "#FBEAF0"], ["#185FA5", "#E6F1FB"], ["#3B6D11", "#EAF3DE"],
  ["#854F0B", "#FAEEDA"], ["#A32D2D", "#FCEBEB"], ["#5F5E5A", "#F1EFE8"],
  ["#7F77DD", "#EEEDFE"],
];

const PREFIXES = ["นางสาว", "นาง", "นาย"];

function firstName(name) {
  let s = name.trim();
  for (const p of PREFIXES) {
    if (s.startsWith(p)) { s = s.slice(p.length).trim(); break; }
  }
  return s.split(" ")[0];
}

function getInitial(name) {
  return firstName(name).charAt(0) || "?";
}

function Avatar({ name, colorIdx, size = 40 }) {
  const [fg, bg] = AVATAR_COLORS[colorIdx % AVATAR_COLORS.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bg, color: fg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 600, fontSize: Math.round(size * 0.4),
      flexShrink: 0,
    }}>
      {getInitial(name)}
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  const bg = toast.type === "error" ? "#A32D2D" : toast.type === "info" ? "#185FA5" : "#0F6E56";
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24,
      background: bg, color: "#fff",
      borderRadius: 10, padding: "11px 20px",
      fontSize: 14, fontWeight: 500,
      boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
      zIndex: 9999, fontFamily: "inherit",
      animation: "fadeIn .2s ease",
    }}>
      {toast.msg}
    </div>
  );
}

export default function App() {
  // pairs: { studentId: { pairRowId, partnerId } }
  const [pairs, setPairs] = useState({});
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const toastTimer = useRef(null);

  // ── โหลดข้อมูลจาก Supabase ──────────────────────────
  async function fetchPairs() {
    const { data, error } = await supabase
      .from("pairs")
      .select("*");
    if (error) { console.error(error); return; }

    const map = {};
    data.forEach(row => {
      map[row.student_a] = { pairRowId: row.id, partnerId: row.student_b };
      map[row.student_b] = { pairRowId: row.id, partnerId: row.student_a };
    });
    setPairs(map);
  }

  useEffect(() => {
    fetchPairs().finally(() => setLoading(false));

    // Realtime — ทุกคนเห็นพร้อมกัน
    const channel = supabase
      .channel("pairs-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "pairs" }, () => {
        fetchPairs();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // ── Toast ────────────────────────────────────────────
  function showToast(msg, type = "success") {
    setToast({ msg, type });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }

  // ── Logic ────────────────────────────────────────────
  function isPaired(id) { return !!pairs[id]; }
  function getPartner(id) {
    if (!pairs[id]) return null;
    return students.find(s => s.id === pairs[id].partnerId) || null;
  }

  async function handleSelect(student) {
    if (busy) return;

    // คลิกคนที่มีคู่แล้ว → ยกเลิกคู่
    if (isPaired(student.id)) {
      const rowId = pairs[student.id].pairRowId;
      setBusy(true);
      const { error } = await supabase.from("pairs").delete().eq("id", rowId);
      setBusy(false);
      if (error) { showToast("เกิดข้อผิดพลาด", "error"); return; }
      showToast(`ยกเลิกคู่ ${firstName(student.name)} แล้ว`, "info");
      setSelected(null);
      return;
    }

    // ยังไม่มีใครถูกเลือก → เลือกคนนี้
    if (!selected) {
      setSelected(student.id);
      return;
    }

    // คลิกคนเดิม → ยกเลิกการเลือก
    if (selected === student.id) {
      setSelected(null);
      return;
    }

    // จับคู่
    const s1 = students.find(s => s.id === selected);
    setBusy(true);
    const { error } = await supabase.from("pairs").insert({
      student_a: selected,
      student_b: student.id,
    });
    setBusy(false);
    if (error) { showToast("เกิดข้อผิดพลาด", "error"); return; }
    showToast(`จับคู่ ${firstName(s1.name)} & ${firstName(student.name)} สำเร็จ! 🎉`);
    setSelected(null);
  }

  async function clearAll() {
    if (!window.confirm("ต้องการล้างการจับคู่ทั้งหมดใช่หรือไม่?")) return;
    setBusy(true);
    const { error } = await supabase.from("pairs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    setBusy(false);
    if (error) { showToast("เกิดข้อผิดพลาด", "error"); return; }
    showToast("ล้างการจับคู่ทั้งหมดแล้ว", "info");
    setSelected(null);
  }

  // ── Derived ──────────────────────────────────────────
  const pairedCount = Object.keys(pairs).length / 2;
  const unpairedCount = students.filter(s => !isPaired(s.id)).length;

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.code.includes(search);
    const matchTab =
      tab === "all" ||
      (tab === "paired" && isPaired(s.id)) ||
      (tab === "unpaired" && !isPaired(s.id));
    return matchSearch && matchTab;
  });

  const seen = new Set();
  const pairGroups = [];
  students.forEach(s => {
    if (!isPaired(s.id) || seen.has(s.id)) return;
    const partner = getPartner(s.id);
    if (!partner) return;
    pairGroups.push([s, partner]);
    seen.add(s.id);
    seen.add(partner.id);
  });

  // ── Render ───────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sarabun', sans-serif", color: "#534AB7", fontSize: 16 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>⏳</div>
          <div>กำลังโหลดข้อมูล...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8fb", fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif", color: "#1a1a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #AFA9EC; border-radius: 3px; }
        .s-card { transition: box-shadow .15s, border-color .15s; cursor: pointer; }
        .s-card:hover { box-shadow: 0 2px 12px rgba(83,74,183,.10); }
      `}</style>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #ececf4", padding: "24px 20px 20px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#7F77DD", textTransform: "uppercase", marginBottom: 2 }}>
            เทคโนโลยีธุรกิจดิจิทัล
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e", marginBottom: 16 }}>
            จับคู่ทำงานกลุ่ม
          </h1>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "นักศึกษาทั้งหมด", value: students.length, color: "#534AB7" },
              { label: "จับคู่แล้ว", value: `${pairedCount} คู่`, color: "#0F6E56" },
              { label: "ยังไม่มีคู่", value: unpairedCount, color: "#854F0B" },
            ].map(s => (
              <div key={s.label} style={{ background: "#f4f3fd", borderRadius: 10, padding: "10px 18px", minWidth: 110 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "20px 16px" }}>

        {/* Banner เลือกอยู่ */}
        {selected && (
          <div style={{ background: "#EEEDFE", border: "1px solid #AFA9EC", borderRadius: 10, padding: "12px 18px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10, animation: "fadeIn .2s ease" }}>
            <span style={{ fontSize: 20 }}>👆</span>
            <div>
              <div style={{ fontWeight: 600, color: "#534AB7" }}>
                เลือก: {students.find(s => s.id === selected)?.name}
              </div>
              <div style={{ fontSize: 13, color: "#7F77DD" }}>คลิกเพื่อนคนถัดไปเพื่อจับคู่ หรือคลิกคนเดิมเพื่อยกเลิก</div>
            </div>
          </div>
        )}

        {/* Pair chips */}
        {pairGroups.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10, letterSpacing: 1 }}>
              คู่ที่จับแล้ว ({pairGroups.length} คู่)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {pairGroups.map(([a, b], i) => {
                const [fg, bg] = AVATAR_COLORS[i % AVATAR_COLORS.length];
                return (
                  <div key={i} style={{ background: bg, border: `1px solid ${fg}33`, borderRadius: 20, padding: "5px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: fg, fontWeight: 500 }}>{firstName(a.name)}</span>
                    <span style={{ color: fg, opacity: .5 }}>⟷</span>
                    <span style={{ color: fg, fontWeight: 500 }}>{firstName(b.name)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Controls */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 ค้นหาชื่อหรือรหัส..."
            style={{ flex: 1, minWidth: 180, border: "1px solid #ddd", borderRadius: 8, padding: "9px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", background: "#fff" }}
          />
          <div style={{ display: "flex", gap: 4, background: "#f0f0f8", borderRadius: 8, padding: 3 }}>
            {[["all", "ทั้งหมด"], ["paired", "มีคู่"], ["unpaired", "ยังไม่มี"]].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} style={{
                padding: "7px 14px", borderRadius: 6, border: "none", fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                background: tab === k ? "#534AB7" : "transparent",
                color: tab === k ? "#fff" : "#888",
                fontWeight: tab === k ? 600 : 400,
              }}>{l}</button>
            ))}
          </div>
          {pairedCount > 0 && (
            <button onClick={clearAll} disabled={busy} style={{ padding: "9px 14px", background: "#fff", border: "1px solid #f09595", borderRadius: 8, color: "#A32D2D", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              🗑 ล้างทั้งหมด
            </button>
          )}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(195px, 1fr))", gap: 10 }}>
          {filtered.map((student, i) => {
            const isSelected = selected === student.id;
            const paired = isPaired(student.id);
            const partner = paired ? getPartner(student.id) : null;
            const colorIdx = paired
              ? students.findIndex(s => s.id === Math.min(student.id, partner?.id ?? 0)) % AVATAR_COLORS.length
              : i % AVATAR_COLORS.length;
            const [fg, bg] = AVATAR_COLORS[colorIdx];

            return (
              <div
                key={student.id}
                className="s-card"
                onClick={() => handleSelect(student)}
                style={{
                  background: isSelected ? "#EEEDFE" : paired ? bg + "55" : "#fff",
                  border: isSelected ? `2px solid ${fg}` : paired ? `1px solid ${fg}44` : "1px solid #ececf4",
                  borderRadius: 12,
                  padding: "13px 14px",
                  position: "relative",
                  opacity: busy ? 0.7 : 1,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: paired || isSelected ? 8 : 0 }}>
                  <Avatar name={student.name} colorIdx={colorIdx} size={38} />
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {firstName(student.name)}
                    </div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>#{String(student.id).padStart(2, "0")}</div>
                  </div>
                </div>

                {paired && partner && (
                  <div style={{ background: "#fff", borderRadius: 7, padding: "5px 9px", display: "flex", alignItems: "center", gap: 6, border: `1px solid ${fg}22` }}>
                    <Avatar name={partner.name} colorIdx={colorIdx} size={20} />
                    <span style={{ fontSize: 11, color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {firstName(partner.name)}
                    </span>
                    <span style={{ marginLeft: "auto", fontSize: 12 }}>💞</span>
                  </div>
                )}

                {isSelected && (
                  <div style={{ fontSize: 11, color: fg, fontWeight: 600 }}>✓ เลือกอยู่</div>
                )}

                {!paired && !isSelected && (
                  <div style={{ fontSize: 11, color: "#bbb" }}>คลิกเพื่อเลือก</div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 48, color: "#bbb" }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
              <div>ไม่พบรายชื่อที่ค้นหา</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 32, color: "#ccc", fontSize: 12 }}>
          เทคโนโลยีธุรกิจดิจิทัล · ผู้สอน นายวรุฒ เนื่องชมภู · 4 มิถุนายน 2569
        </div>
      </div>

      <Toast toast={toast} />
    </div>
  );
}
