"use client";

import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const FooterSetting = () => {
  const [form, setForm] = useState({
    leftText: "",
    location: "",
    phone: "",
    mail: "",
    rightTitle: "",
    rightText: "",
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const supabase = createBrowserSupabaseClient();
      const { data, error } = await supabase
        .from("page_settings")
        .select("data")
        .eq("type", "main_footer")
        .single();

      if (error) {
        console.error("푸터 내용 조회 실패:", error);
      } else {
        setForm(data?.data || {});
      }
    } catch (error) {
      console.error("푸터 내용 조회 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase
        .from("page_settings")
        .update({ type: "main_footer", data: form })
        .eq("type", "main_footer");

      if (error) throw error;
      alert("푸터 내용이 저장되었습니다.");
    } catch (error) {
      console.error("푸터 내용 저장 실패:", error);
      alert("푸터 내용 저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <Loader />;
  return (
    <div className="p-10 space-y-4">
      <p className="font-bold text-lg">좌측 푸터</p>
      <TextField
        name="leftText"
        label="왼쪽 텍스트"
        variant="outlined"
        fullWidth
        value={form.leftText}
        onChange={handleChange}
        size="small"
        multiline
        rows={6}
        placeholder="왼쪽 텍스트를 입력하세요."
      />
      <p className="font-bold text-lg mt-3">중간 푸터</p>
      <TextField
        name="location"
        label="주소"
        variant="outlined"
        fullWidth
        value={form.location}
        onChange={handleChange}
        size="small"
      />
      <TextField
        name="phone"
        label="전화번호"
        variant="outlined"
        fullWidth
        value={form.phone}
        onChange={handleChange}
        size="small"
      />
      <TextField
        name="mail"
        label="이메일"
        variant="outlined"
        fullWidth
        value={form.mail}
        onChange={handleChange}
        size="small"
      />
      <p className="font-bold text-lg mt-3">우측 푸터</p>
      <TextField
        name="rightTitle"
        label="오른쪽 타이틀"
        variant="outlined"
        fullWidth
        value={form.rightTitle}
        onChange={handleChange}
        size="small"
      />
      <TextField
        name="rightText"
        label="오른쪽 텍스트"
        variant="outlined"
        fullWidth
        value={form.rightText}
        onChange={handleChange}
        size="small"
        multiline
        rows={3}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={saving}
        fullWidth
      >
        {saving ? "저장 중..." : "저장"}
      </Button>
    </div>
  );
};

export default FooterSetting;
