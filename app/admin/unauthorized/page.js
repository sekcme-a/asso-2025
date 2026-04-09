"use client";

import { use } from "react"; // React.use() 대신 간단히 use로 임포트
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage({ searchParams }) {
  const router = useRouter();

  // 1. Promise인 searchParams를 unwrapping 합니다.
  const resolvedSearchParams = use(searchParams);
  const message = resolvedSearchParams?.message;

  return (
    <div style={styles.container}>
      <div style={styles.icon}>🔒</div>
      <h1 style={styles.title}>접근 권한이 없습니다</h1>
      <p style={styles.description}>
        {message === "no-permission"
          ? "해당 조직의 관리자 권한이 없거나 접근이 거부되었습니다."
          : "이 페이지에 접근할 수 있는 권한이 없습니다. 관리자에게 문의하세요."}
      </p>

      <div style={styles.buttonGroup}>
        <Link href="/" style={styles.homeButton}>
          홈으로 돌아가기
        </Link>
        <button onClick={() => router.back()} style={styles.backButton}>
          이전 페이지로
        </button>
      </div>
    </div>
  );
}

// 스타일 부분은 이전과 동일합니다.
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f9fafb",
    padding: "20px",
  },
  icon: { fontSize: "4rem", marginBottom: "20px" },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#111827",
  },
  description: {
    fontSize: "1.1rem",
    color: "#4b5563",
    marginBottom: "2rem",
    lineHeight: "1.5",
    maxWidth: "400px",
  },
  buttonGroup: { display: "flex", gap: "12px" },
  homeButton: {
    padding: "12px 24px",
    backgroundColor: "#2563eb",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
  },
  backButton: {
    padding: "12px 24px",
    backgroundColor: "white",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.95rem",
  },
};
