import { createServerSupabaseClient } from "@/utils/supabase/server";
import Image from "next/image";

const MouList = async () => {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("page_settings")
    .select("data")
    .eq("type", `mou`)
    .single();

  return (
    <section
      aria-labelledby="group-section-title"
      className="flex justify-center"
    >
      <ul className="w-full max-w-5xl space-y-6 px-0">
        {data?.data?.map((group, index) => (
          <li key={index}>
            <a
              href={group.url}
              target="_blank"
              rel="noopener noreferrer"
              className=" flex flex-col lg:flex-row items-center my-4
                gap-4 rounded-xl border border-gray-200 shadow-lg p-4 
                hover:shadow-xl transition-shadow duration-200 "
            >
              <div className="relative w-full lg:w-[30%] aspect-[4/1] mx-auto rounded-md border-[1px] border-gray-300">
                <Image
                  src={group?.images[0] ?? "/placeholder.png"}
                  alt={group.title}
                  fill
                  className="object-contain rounded"
                />
              </div>
              <article className="w-full lg:w-[70%] text-center lg:text-left">
                <h2 className="text-lg font-semibold mb-2">{group.title}</h2>
                <p className="whitespace-pre-line break-keep">
                  {group.content}
                </p>
              </article>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MouList;
