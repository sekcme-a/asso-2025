import { createServerSupabaseClient } from "@/utils/supabase/server";
import { Button } from "@mui/material";
import Image from "next/image";

const GroupList = async ({ type }) => {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("page_settings")
    .select("data")
    .eq("type", `group_${type}`)
    .single();

  return (
    <section aria-labelledby="group-section-title">
      <ul className="columns-1 md:columns-2 gap-6">
        {data?.data?.map((group, index) => (
          <li
            key={index}
            className="mb-6 break-inside-avoid rounded-lg border border-gray-200 shadow-lg p-4"
          >
            <article>
              <header>
                <h2 className="text-xl font-bold text-blue-800">
                  {group.groupName}
                </h2>
              </header>

              <div className="flex items-start mt-4 gap-5">
                {/* 이미지 영역 */}
                <div className="w-[20%] aspect-square relative">
                  <Image
                    src={group.images[0]}
                    alt={`${group.groupName} 단체 사진`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>

                {/* 정보 및 버튼 영역 */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex gap-x-3">
                    <div className="font-bold text-sm sm:text-base">
                      <dt>회 장</dt>
                      <dt>프로필</dt>
                    </div>
                    <div className="text-sm sm:text-base flex-1">
                      <dd>{group.name}</dd>
                      <dd className="whitespace-pre-line leading-snug">
                        {group.profile}
                      </dd>
                    </div>
                  </div>

                  {/* 추가된 버튼 영역 */}
                  {group.url && (
                    <div className="mt-1">
                      <Button
                        variant="outlined"
                        color="primary"
                        href={group.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-start mt-2 min-w-[90px]"
                        size="small" // 텍스트와 균형을 맞추기 위해 small 권장
                        fullWidth
                      >
                        홈페이지로 이동
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GroupList;
