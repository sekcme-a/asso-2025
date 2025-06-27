import { createServerSupabaseClient } from "@/utils/supabase/server";
import SubscribeButton from "./SubscribeButton";

const Subscribe = async () => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div>
      <p></p>
      <SubscribeButton user={user} />
    </div>
  );
};

export default Subscribe;
