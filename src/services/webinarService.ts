import { supabase } from "@/integrations/supabase/client";

export interface WebinarEvent {
  id: string;
  title: string | null;
  webinar_date: string | null;
  webinar_time: string | null;
  duration: string | null;
  speaker_name: string | null;
  meeting_link: string | null;
  banner_image: string | null;
  is_active: boolean | null;
  created_at: string | null;
}

export const fetchActiveWebinar = async (): Promise<WebinarEvent | null> => {
  const { data, error } = await supabase
    .from("webinar_events")
    .select(
      "id, title, webinar_date, webinar_time, duration, speaker_name, meeting_link, banner_image, is_active, created_at",
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};
