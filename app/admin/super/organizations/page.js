"use client";

import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import AdminNavbar from "../components/Navbar";

export default function AdminOrgPage() {
  const supabase = createBrowserSupabaseClient();
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);

  // 폼 상태
  const [formData, setFormData] = useState({
    name: "",
    leader: "",
    contact: "",
    location: "",
  });

  // 1. 데이터 불러오기 (Read)
  const fetchOrgs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("데이터 로드 실패:", error.message);
    } else {
      setOrgs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  // 2. 모달 열기/닫기 처리
  const handleOpenModal = (org = null) => {
    if (org) {
      setEditingOrg(org);
      setFormData({
        name: org.name,
        leader: org.leader,
        contact: org.contact,
        location: org.location,
      });
    } else {
      setEditingOrg(null);
      setFormData({ name: "", leader: "", contact: "", location: "" });
    }
    setIsModalOpen(true);
  };

  // 3. 단체 추가 및 수정 (Create & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      updated_at: new Date().toISOString(),
    };

    // 수정 시에는 기존 ID를 포함하여 upsert
    if (editingOrg) {
      payload.id = editingOrg.id;
    }

    const { error } = await supabase.from("organizations").upsert(payload);

    if (error) {
      alert("오류가 발생했습니다: " + error.message);
    } else {
      alert(
        editingOrg
          ? "단체 정보가 수정되었습니다."
          : "새 단체가 등록되었습니다.",
      );
      setIsModalOpen(false);
      fetchOrgs(); // 리스트 갱신
    }
    setLoading(false);
  };

  // 4. 단체 삭제 (Delete)
  const handleDelete = async (id) => {
    if (
      !confirm(
        "정말로 이 단체를 삭제하시겠습니까? 데이터는 복구할 수 없습니다.",
      )
    )
      return;

    const { error } = await supabase
      .from("organizations")
      .delete()
      .eq("id", id);

    if (error) {
      alert("삭제 실패: " + error.message);
    } else {
      fetchOrgs();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        {/* 상단 섹션 */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">
              Organization Management
            </h1>
            <p className="text-sm font-bold text-gray-400">
              대한생활체육회 산하 단체 정보를 관리합니다.
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
          >
            + 새 가맹 단체 등록
          </button>
        </header>

        {/* 데이터 리스트 영역 */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
          {loading && orgs.length === 0 ? (
            <div className="flex items-center justify-center py-40">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-50">
                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                      단체명
                    </th>
                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                      대표자
                    </th>
                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                      연락처
                    </th>
                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                      소재지
                    </th>
                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orgs.length > 0 ? (
                    orgs.map((org) => (
                      <tr
                        key={org.id}
                        className="hover:bg-gray-50/30 transition-colors group"
                      >
                        <td className="px-8 py-6">
                          <span className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                            {org.name}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-gray-600">
                          {org.leader}
                        </td>
                        <td className="px-8 py-6 text-sm font-mono text-gray-400 font-bold">
                          {org.contact}
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-gray-400">
                          <span className="bg-gray-100 px-3 py-1 rounded-full text-[11px]">
                            {org.location}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right space-x-3">
                          <button
                            onClick={() => handleOpenModal(org)}
                            className="text-xs font-black text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDelete(org.id)}
                            className="text-xs font-black text-red-300 hover:text-red-600 transition-colors"
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-8 py-20 text-center text-gray-400 font-bold text-sm"
                      >
                        등록된 단체가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* 모달 UI (이전과 동일하지만 로딩 상태 대응 추가) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-gray-950/20 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <h2 className="text-2xl font-black text-gray-950 tracking-tight">
                {editingOrg ? "단체 정보 수정" : "새 단체 등록"}
              </h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">
                    Organization Name
                  </label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm focus:ring-2 ring-blue-100 outline-none"
                    placeholder="단체명"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">
                      Leader
                    </label>
                    <input
                      required
                      value={formData.leader}
                      onChange={(e) =>
                        setFormData({ ...formData, leader: e.target.value })
                      }
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm outline-none"
                      placeholder="성함"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">
                      Contact
                    </label>
                    <input
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm outline-none"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">
                    Location
                  </label>
                  <input
                    require
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-bold text-sm outline-none"
                    placeholder="지역 예) 서울 강남구"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 font-black text-gray-400 hover:text-gray-950 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] bg-gray-950 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-600 transition-all disabled:bg-gray-200"
                >
                  {loading
                    ? "처리 중..."
                    : editingOrg
                      ? "수정 완료"
                      : "등록 완료"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
