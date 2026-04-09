// app/[lang]/team/[orgId]/page.js (경로에 맞게 조정)
import { cookies } from "next/headers";
import OrganizationDetail from "@/app/(homepage)/(korean)/team/[orgId]/OrganizationDetail";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function generateMetadata({ params }) {
  const { orgId, lang } = await params;
  const isEnglish = lang === "en";
  const supabase = await createServerSupabaseClient();

  const { data: org } = await supabase
    .from("organizations")
    .select("name, name_en, description, description_en")
    .eq("id", orgId)
    .single();

  if (!org) return { title: "Organization Not Found" };

  const title = isEnglish ? org.name_en || org.name : org.name;
  const description = isEnglish
    ? org.description_en || org.description
    : org.description;

  return {
    title: `${title}`,
    description: description?.substring(0, 160),
    openGraph: {
      title: title,
      description: description,
      images: [org.logo_url || "/images/logo-circle.png"],
    },
  };
}

export default async function OrganizationDetailPage({ params }) {
  const { orgId, lang } = await params;
  const isEnglish = lang === "en";
  const supabase = await createServerSupabaseClient();

  // 초기 서버 데이터 페칭
  const { data: org } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", orgId)
    .single();

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .eq("org_id", orgId)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <OrganizationDetail
      initialOrg={org}
      initialAnnouncements={announcements || []}
      orgId={orgId}
      isEnglish={isEnglish}
    />
  );
}
