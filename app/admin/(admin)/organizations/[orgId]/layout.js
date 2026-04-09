import { createServerSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function OrganizationLayout({ children, params }) {
  const { orgId } = await params;
  const supabase = await createServerSupabaseClient();

  // 1. 현재 사용자 정보 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. 권한 체크 (Promise.all을 사용하여 병렬로 체크하면 더 빠릅니다)
  const [adminCheck, orgAdminCheck] = await Promise.all([
    // 시스템 전체 관리자 여부 확인 (role이 'admin'인지)
    supabase
      .from("admins")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single(),

    // 해당 조직의 관리자 여부 확인
    supabase
      .from("org_admins")
      .select("id")
      .eq("org_id", orgId)
      .eq("user_id", user.id)
      .single(),
  ]);

  // 3. 두 조건 중 하나라도 만족하면 통과
  const isSystemAdmin = adminCheck.data && !adminCheck.error;
  const isOrgAdmin = orgAdminCheck.data && !orgAdminCheck.error;

  if (!isSystemAdmin && !isOrgAdmin) {
    // 권한이 없으면 접근 거부 페이지로 이동
    redirect("/admin/unauthorized?message=no-permission");
  }

  return <>{children}</>;
}
