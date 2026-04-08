// "use client";

// import { createBrowserSupabaseClient } from "@/utils/supabase/client";
// import { useEffect, useState } from "react";

// export default function DataExportPage() {
//   const [posts, setPosts] = useState([]);
//   const [count, setCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const supabase = createBrowserSupabaseClient();

//       const { data, count: total } = await supabase
//         .from("medias")
//         .select("id, news_title, press_name", { count: "exact" })
//         .order("created_at", { ascending: false })
//         .range(401, 550);

//       // 데이터 가공: post 내용 중 href 주소만 추출
//       const processedData = (data || []).map((item) => {
//         // href="..." 내부의 주소를 찾아내는 정규식
//         const hrefMatch = item.post?.match(/href="([^"]*)"/);
//         return {
//           ...item,
//           // 주소를 찾으면 해당 주소로 교체, 못 찾으면 원본 유지(혹은 null)

//           // post: hrefMatch ? hrefMatch[1] : "",
//         };
//       });

//       setPosts(processedData);
//       setCount(total || 0);
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(JSON.stringify(posts, null, 2));
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       alert("복사 실패");
//     }
//   };

//   if (loading)
//     return <div className="p-24 font-black text-center">DATA LOADING...</div>;

//   return (
//     <div className="p-10 bg-gray-50 min-h-screen font-mono mt-20">
//       <div className="max-w-5xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-2xl font-black text-gray-950">DATA EXPORTER</h1>
//             <p className="text-sm text-gray-500">
//               Category: media / Count: {count}
//             </p>
//           </div>
//           <button
//             onClick={handleCopy}
//             className={`px-8 py-4 rounded-full font-black text-sm transition-all shadow-xl ${
//               copied
//                 ? "bg-green-500 text-white"
//                 : "bg-blue-600 text-white hover:scale-105"
//             }`}
//           >
//             {copied ? "COPIED SUCCESS!" : "COPY JSON STRING"}
//           </button>
//         </div>

//         <div className="relative">
//           <textarea
//             readOnly
//             value={JSON.stringify(posts, null, 2)}
//             className="w-full h-[70vh] p-8 bg-gray-900 text-green-400 rounded-2xl border-none shadow-2xl overflow-y-auto focus:outline-none"
//             placeholder="No data found."
//           />
//           <div className="absolute bottom-6 right-6 text-[10px] text-gray-500 font-bold">
//             JSON.stringify(data, null, 2)
//           </div>
//         </div>

//         <p className="mt-6 text-center text-xs text-gray-400 font-bold">
//           이 페이지는 데이터 추출을 위한 임시 도구입니다. 사용 후 삭제하거나
//           경로를 숨기세요.
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function DataExportPage() {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createBrowserSupabaseClient();

      const { data, count: total } = await supabase
        .from("posts")
        .select("title, id", { count: "exact" })
        .eq("category", "support")
        .order("created_at", { ascending: false })
        .range(0, 100);

      // 데이터 가공: post 내용 중 href 주소만 추출
      const processedData = (data || []).map((item) => {
        // href="..." 내부의 주소를 찾아내는 정규식
        const hrefMatch = item.post?.match(/href="([^"]*)"/);
        return {
          ...item,
          // 주소를 찾으면 해당 주소로 교체, 못 찾으면 원본 유지(혹은 null)

          // post: hrefMatch ? hrefMatch[1] : "",
        };
      });

      setPosts(processedData);
      setCount(total || 0);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(posts, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("복사 실패");
    }
  };

  if (loading)
    return <div className="p-24 font-black text-center">DATA LOADING...</div>;

  return (
    <div className="p-10 bg-gray-50 min-h-screen font-mono mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-950">DATA EXPORTER</h1>
            <p className="text-sm text-gray-500">
              Category: media / Count: {count}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className={`px-8 py-4 rounded-full font-black text-sm transition-all shadow-xl ${
              copied
                ? "bg-green-500 text-white"
                : "bg-blue-600 text-white hover:scale-105"
            }`}
          >
            {copied ? "COPIED SUCCESS!" : "COPY JSON STRING"}
          </button>
        </div>

        <div className="relative">
          <textarea
            readOnly
            value={JSON.stringify(posts, null, 2)}
            className="w-full h-[70vh] p-8 bg-gray-900 text-green-400 rounded-2xl border-none shadow-2xl overflow-y-auto focus:outline-none"
            placeholder="No data found."
          />
          <div className="absolute bottom-6 right-6 text-[10px] text-gray-500 font-bold">
            JSON.stringify(data, null, 2)
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400 font-bold">
          이 페이지는 데이터 추출을 위한 임시 도구입니다. 사용 후 삭제하거나
          경로를 숨기세요.
        </p>
      </div>
    </div>
  );
}
