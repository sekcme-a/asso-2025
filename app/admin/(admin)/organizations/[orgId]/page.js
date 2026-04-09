"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export default function OrgDetailManagementPage() {
  const { orgId } = useParams();
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    logo_url: "",
    description: "",
    leader: "",
    contact: "",
    location: "",
    etc: "",
  });

  const DEFAULT_LOGO = "/images/logo-circle.png";

  useEffect(() => {
    async function fetchOrgDetail() {
      setLoading(true);
      const { data, error } = await supabase
        .from("organizations")
        .select("*")
        .eq("id", orgId)
        .single();

      if (data) {
        setFormData({
          name: data.name || "",
          logo_url: data.logo_url || DEFAULT_LOGO,
          description: data.description || "",
          leader: data.leader || "",
          contact: data.contact || "",
          location: data.location || "",
          etc: data.etc || "",
        });
      }
      setLoading(false);
    }
    fetchOrgDetail();
  }, [orgId, supabase]);

  // 이미지 업로드 핸들러
  const handleImageUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${orgId}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("organization")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("organization").getPublicUrl(filePath);

      setFormData({ ...formData, logo_url: publicUrl });
      alert(
        "이미지가 업로드되었습니다. '정보 저장하기'를 눌러야 최종 반영됩니다.",
      );
    } catch (error) {
      alert("업로드 실패: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // 이미지 삭제 핸들러 (Storage에서도 삭제)
  const handleDeleteImage = async () => {
    if (!window.confirm("이미지를 삭제하시겠습니까?")) return;

    try {
      setUploading(true);

      // 현재 logo_url에서 파일명 추출 (Supabase URL 구조 기준)
      if (formData.logo_url && formData.logo_url.includes("organization/")) {
        const urlParts = formData.logo_url.split("/");
        const fileName = urlParts[urlParts.length - 1];

        // Storage에서 실제 파일 삭제
        const { error: deleteError } = await supabase.storage
          .from("organization")
          .remove([fileName]);

        if (deleteError)
          console.error("Storage 삭제 실패:", deleteError.message);
      }

      // 상태 업데이트 (기본 이미지로)
      setFormData({ ...formData, logo_url: DEFAULT_LOGO });

      // input 값 초기화 (동일 파일 재선택 가능하도록)
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      alert("삭제 처리 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const { error } = await supabase
      .from("organizations")
      .update({
        ...formData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orgId);

    if (error) {
      alert("저장 오류: " + error.message);
    } else {
      alert("단체 정보가 성공적으로 업데이트되었습니다.");
    }
    setUpdating(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7f9]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-12 pb-24 px-6 mt-20">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
              단체 정보 설정
            </h1>
            <p className="text-sm font-bold text-gray-400 mt-2">
              사용자들에게 보여질 단체 소개 페이지를 구성합니다.
            </p>
          </div>
        </header>

        <form onSubmit={handleUpdate} className="space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm space-y-10">
            {/* 로고 업로드/삭제 섹션 */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative group w-32 h-32 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={formData.logo_url}
                  alt="단체 로고"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = DEFAULT_LOGO;
                  }} // 이미지 로드 실패시 대비
                />
                {uploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-3 w-full">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  단체 로고 이미지
                </label>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-6 py-3 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                  >
                    이미지 변경
                  </button>

                  {/* 삭제 버튼: 현재 로고가 기본 이미지가 아닐 때만 노출 */}
                  {formData.logo_url !== DEFAULT_LOGO && (
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      disabled={uploading}
                      className="px-6 py-3 bg-white text-red-500 border border-red-100 text-xs font-bold rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      이미지 삭제
                    </button>
                  )}
                </div>
                <p className="text-[10px] font-bold text-gray-400 ml-1 italic">
                  * 가급적 정사각형 비율의 이미지를 권장합니다.
                </p>
              </div>
            </div>

            {/* 나머지 입력 필드들은 기존과 동일 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  단체명
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 ring-blue-100 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  대표자 / 회장명
                </label>
                <input
                  type="text"
                  value={formData.leader}
                  onChange={(e) =>
                    setFormData({ ...formData, leader: e.target.value })
                  }
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 ring-blue-100 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  대표 연락처
                </label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 ring-blue-100 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  단체 위치 / 사무실
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 ring-blue-100 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                단체 소개
              </label>
              <textarea
                rows="5"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-gray-50 border-none rounded-3xl px-6 py-5 font-bold text-sm focus:ring-2 ring-blue-100 outline-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                기타 / 추가 정보
              </label>
              <textarea
                rows="5"
                type="text"
                value={formData.etc}
                onChange={(e) =>
                  setFormData({ ...formData, etc: e.target.value })
                }
                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 ring-blue-100 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              disabled={updating || uploading}
              type="submit"
              className="w-full md:w-auto px-12 py-3 bg-blue-600 text-white rounded-[1.5rem] font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {updating ? "저장 중..." : "단체 정보 저장하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
