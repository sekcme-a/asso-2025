"use client";

import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import SubHero from "../../info/components/SubHero";
import { useParams } from "next/navigation";

export default function SchedulePage() {
  const params = useParams();
  const isEnglish = params.lang === "en";

  // 번역 헬퍼 함수
  const t = (ko, en) => (isEnglish ? en : ko);
  const supabase = createBrowserSupabaseClient();
  const [events, setEvents] = useState([]);
  const [currentMonthEvents, setCurrentMonthEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournaments();
  }, []);

  async function fetchTournaments() {
    setLoading(true);
    // 모든 단체의 대회를 가져오며, 단체명을 조인합니다.
    const { data } = await supabase.from("tournaments").select(`
        *,
        organizations:org_id (name)
      `);

    if (data) {
      const calendarEvents = data.map((item) => ({
        id: item.id,
        title: `[${item.organizations?.name}] ${item.title}`,
        start: item.start_date,
        end: item.end_date,
        backgroundColor: item.color,
        borderColor: item.color,
        extendedProps: {
          orgName: item.organizations?.name,
          location: item.location,
          description: item.description,
        },
      }));
      setEvents(calendarEvents);
      setCurrentMonthEvents(calendarEvents);
    }
    setLoading(false);
  }

  // 캘린더 달(Month) 변경 시 우측 리스트 필터링
  const handleDatesSet = (dateInfo) => {
    const start = new Date(dateInfo.start);
    const end = new Date(dateInfo.end);

    const filtered = events.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate >= start && eventDate <= end;
    });
    setCurrentMonthEvents(filtered);
  };

  return (
    <>
      <SubHero
        breadcrumb={[
          t("체육 단체", "Sports Organizations"),
          t("대회/행사일정", "Events & Competitions"),
        ]}
        title={t("대회/행사일정", "Events & Competitions")}
        subTitle={
          <>
            {t(
              "서울특별시생활체육회의 다양한 대회와 행사 일정을 확인해보세요.",
              "Check out various events and competition schedules of the Seoul Sports Council.",
            )}
            <br />
            <strong className="font-bold text-gray-950">
              {t(
                "시민과 함께하는 건강한 스포츠 문화",
                "Building a healthy sports culture with citizens",
              )}
            </strong>
          </>
        }
      />
      <div className=" bg-[#f8f9fa] pt-26 pb-24 px-6 ">
        <div className="max-w-7xl mx-auto">
          {/* <header className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
            전체 대회 일정
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-2">
            협회 산하 모든 단체의 경기 및 대회 일정을 확인하실 수 있습니다.
          </p>
        </header> */}

          {/* 2분할 레이아웃 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 왼쪽: 한국어 캘린더 (7/12) */}
            <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              {loading ? (
                <div className="h-[500px] flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  locale={koLocale}
                  events={events}
                  datesSet={handleDatesSet}
                  height="auto"
                  selectable={false} // 선택 불가 (Read-Only)
                  editable={false} // 드래그 수정 불가
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "",
                  }}
                />
              )}
            </div>

            {/* 오른쪽: 이달의 일정 리스트 (5/12) */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xl font-black text-gray-800 ml-2 mb-4">
                이달의 상세 일정
              </h3>
              <div className="max-h-[700px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {currentMonthEvents.length > 0 ? (
                  currentMonthEvents
                    .sort((a, b) => new Date(a.start) - new Date(b.start))
                    .map((event) => (
                      <div
                        key={event.id}
                        className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:border-blue-200 transition-all flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-1.5 h-10 rounded-full"
                            style={{ backgroundColor: event.backgroundColor }}
                          />
                          <div>
                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                              {event.extendedProps.orgName}
                            </p>
                            <h4 className="text-lg font-bold text-gray-900 leading-tight">
                              {event.title.split("] ")[1]}{" "}
                              {/* 단체명 제외한 제목만 출력 */}
                            </h4>
                          </div>
                        </div>

                        <div className="space-y-1 ml-4">
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                            <span className="w-12 text-gray-300">일시</span>
                            <span>
                              {event.start} {event.end && `~ ${event.end}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                            <span className="w-12 text-gray-300">장소</span>
                            <span>
                              {event.extendedProps.location || "장소 미정"}
                            </span>
                          </div>
                          {event.extendedProps.description && (
                            <div className="mt-3 pt-3 border-t border-gray-50 text-xs text-gray-400 font-medium leading-relaxed">
                              {event.extendedProps.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="bg-gray-50 rounded-[2rem] p-16 text-center border border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold italic">
                      해당 기간에 예정된 대회가 없습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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
            padding: 8px 14px;
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
            padding: 10px;
            font-size: 12px;
          }
          .fc .fc-col-header-cell-cushion {
            font-weight: 800;
            color: #495057;
            font-size: 12px;
            text-decoration: none;
          }
          .fc .fc-event {
            border-radius: 6px;
            padding: 2px 6px;
            font-weight: 800;
            font-size: 10px;
            border: none;
            cursor: default;
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
    </>
  );
}
