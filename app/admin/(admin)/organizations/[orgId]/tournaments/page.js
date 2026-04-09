"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko"; // 한국어 로케일 추가

export default function TournamentAdminPage() {
  const { orgId } = useParams();
  const supabase = createBrowserSupabaseClient();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonthEvents, setCurrentMonthEvents] = useState([]); // 현재 달의 일정만 필터링

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    end_date: "",
    location: "",
    description: "",
    color: "#3b82f6",
  });

  useEffect(() => {
    fetchTournaments();
  }, [orgId]);

  async function fetchTournaments() {
    setLoading(true);
    const { data } = await supabase
      .from("tournaments")
      .select("*")
      .eq("org_id", orgId);

    if (data) {
      const calendarEvents = data.map((item) => ({
        id: item.id,
        title: item.title,
        start: item.start_date,
        end: item.end_date,
        backgroundColor: item.color,
        borderColor: item.color,
        extendedProps: { ...item },
      }));
      setEvents(calendarEvents);
      setCurrentMonthEvents(calendarEvents); // 초기 로드 시 전체 설정 (이후 달 변경 시 필터링 가능)
    }
    setLoading(false);
  }

  // 달 변경 시 해당 월의 리스트만 업데이트하는 핸들러
  const handleDatesSet = (dateInfo) => {
    const start = new Date(dateInfo.start);
    const end = new Date(dateInfo.end);

    const filtered = events.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate >= start && eventDate <= end;
    });
    setCurrentMonthEvents(filtered);
  };

  const handleEventClick = (info) => {
    const props = info.event.extendedProps;
    setSelectedEvent(info.event.id);
    setFormData({
      title: props.title,
      start_date: props.start_date,
      end_date: props.end_date,
      location: props.location,
      description: props.description,
      color: props.color,
    });
    setIsModalOpen(true);
  };

  const handleDateSelect = (info) => {
    setSelectedEvent(null);
    setFormData({
      title: "",
      start_date: info.startStr,
      end_date: info.startStr, // 종료일을 시작일과 동일하게 기본값 설정
      location: "",
      description: "",
      color: "#3b82f6",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, org_id: orgId };

    const { error } = selectedEvent
      ? await supabase
          .from("tournaments")
          .update(payload)
          .eq("id", selectedEvent)
      : await supabase.from("tournaments").insert(payload);

    if (!error) {
      setIsModalOpen(false);
      fetchTournaments();
    } else {
      alert("저장 중 오류 발생: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm("이 일정을 삭제하시겠습니까?")) return;
    const { error } = await supabase
      .from("tournaments")
      .delete()
      .eq("id", selectedEvent);
    if (!error) {
      setIsModalOpen(false);
      fetchTournaments();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-12 pb-24 px-6 mt-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
            대회 관리
          </h1>
          <p className="text-sm font-bold text-gray-700 mt-2">
            왼쪽 달력에서 날짜를 클릭하여 일정을 관리하고, 오른쪽에서 전체
            목록을 확인하세요.
          </p>
        </header>

        {/* 2분할 레이아웃 컨테이너 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 왼쪽: 캘린더 (7/12 비율) */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              locale={koLocale} // 한국어 설정
              events={events}
              selectable={true}
              select={handleDateSelect}
              eventClick={handleEventClick}
              datesSet={handleDatesSet} // 달 변경 감지
              height="auto"
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "today",
              }}
            />
          </div>

          {/* 오른쪽: 일정 리스트 (5/12 비율) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-black text-gray-800 ml-2 mb-4">
              이달의 일정 목록
            </h3>
            <div className="max-h-[600px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {currentMonthEvents.length > 0 ? (
                currentMonthEvents
                  .sort((a, b) => new Date(a.start) - new Date(b.start))
                  .map((event) => (
                    <div
                      key={event.id}
                      onClick={() =>
                        handleEventClick({
                          event: {
                            id: event.id,
                            extendedProps: event.extendedProps,
                          },
                        })
                      }
                      className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
                    >
                      <div
                        className="w-2 h-12 rounded-full"
                        style={{ backgroundColor: event.backgroundColor }}
                      />
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          {event.start} {event.end && `~ ${event.end}`}
                        </p>
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-500 font-medium truncate">
                          {event.extendedProps.location || "장소 미정"}
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="bg-gray-50 rounded-3xl p-10 text-center border border-dashed border-gray-200">
                  <p className="text-gray-400 font-bold">
                    등록된 일정이 없습니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 일정 편집 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-8 space-y-6 overflow-y-auto max-h-[90vh] custom-scrollbar">
              <h2 className="text-2xl font-black text-gray-900">
                {selectedEvent ? "일정 수정" : "새 대회 등록"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    대회 제목
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 font-bold outline-none focus:ring-2 ring-blue-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                      시작일
                    </label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) =>
                        setFormData({ ...formData, start_date: e.target.value })
                      }
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 font-bold text-sm outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                      종료일
                    </label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) =>
                        setFormData({ ...formData, end_date: e.target.value })
                      }
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 font-bold text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    장소
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 font-bold outline-none"
                  />
                </div>

                {/* 설명 필드 추가 */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    설명
                  </label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 font-bold outline-none focus:ring-2 ring-blue-100 resize-none"
                    placeholder="대회에 대한 상세 설명을 입력하세요."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    테마 컬러
                  </label>
                  <div className="flex gap-3 mt-2">
                    {[
                      "#3b82f6",
                      "#10b981",
                      "#f59e0b",
                      "#ef4444",
                      "#8b5cf6",
                    ].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: c })}
                        className={`w-8 h-8 rounded-full transition-transform ${formData.color === c ? "scale-125 ring-2 ring-offset-2 ring-gray-300" : ""}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-6">
                  {selectedEvent && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="flex-1 py-4 bg-red-50 text-red-500 rounded-2xl font-black text-sm hover:bg-red-100 transition-colors"
                    >
                      삭제
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 bg-gray-100 text-gray-400 rounded-2xl font-black text-sm hover:bg-gray-200 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-gray-200"
                  >
                    {selectedEvent ? "수정 완료" : "일정 추가"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .fc {
          --fc-border-color: #f1f3f5;
          font-family: inherit;
        }
        .fc .fc-toolbar-title {
          font-weight: 900;
          font-size: 1.2rem;
          letter-spacing: -0.05em;
        }
        .fc .fc-button-primary {
          background-color: #f8f9fa;
          border: none;
          color: #adb5bd;
          font-weight: 800;
          text-transform: uppercase;
          font-size: 10px;
          padding: 8px 12px;
          border-radius: 10px;
        }
        .fc .fc-button-primary:hover {
          background-color: #e9ecef;
          color: #212529;
        }
        .fc .fc-button-active {
          background-color: #212529 !important;
          color: white !important;
        }
        .fc .fc-daygrid-day-number {
          font-weight: 800;
          color: #adb5bd;
          padding: 8px;
          font-size: 12px;
        }
        .fc .fc-col-header-cell-cushion {
          font-weight: 800;
          color: #495057;
          font-size: 12px;
        }
        .fc .fc-event {
          border-radius: 4px;
          padding: 1px 4px;
          font-weight: 800;
          font-size: 10px;
          border: none;
          cursor: pointer;
        }
        .fc-theme-standard td,
        .fc-theme-standard th {
          border-color: #f8f9fa;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e9ecef;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
