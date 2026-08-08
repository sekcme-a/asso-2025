'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PopupModal() {
  // 👇 팝업을 잠시 완전히 끄고 싶을 때 여기에 추가해 두세요!
  return null;
  const [isOpen, setIsOpen] = useState(false);
  const [todayClose, setTodayClose] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // 메인 페이지('/')에서만 팝업 노출 여부 확인
    if (pathname === '/') {
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('popupClosed='));

      if (!cookie) {
        setIsOpen(true);
      }
    }
  }, [pathname]);

  const closePopup = () => {
    if (todayClose) {
      // 오늘 하루 동안 유지되는 쿠키 설정 (24시간)
      const date = new Date();
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
      document.cookie = `popupClosed=true; expires=${date.toUTCString()}; path=/`;
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <div style={styles.content}>
          <img 
            src="/img.png" 
            alt="공지 이미지" 
            style={styles.image} 
          />
        </div>
        <div style={styles.footer}>
          <label style={styles.label}>
            <input 
              type="checkbox" 
              checked={todayClose} 
              onChange={(e) => setTodayClose(e.target.checked)} 
              style={{ marginRight: '5px' }}
            />
            오늘 하루 보지 않기
          </label>
          <button style={styles.btn} onClick={closePopup}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

// 600x800 세로형 직사각형 비율 및 모바일 반응형이 반영된 스타일 객체
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  box: {
    background: '#ffffff',
    width: '600px',     // PC 가로 크기 600px
    height: '800px',    // PC 세로 크기 800px
    maxWidth: '100%',
    maxHeight: '90vh',   // 화면 높이가 부족할 경우 스크롤이 생기도록 제한
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  content: {
    marginBottom: '15px',
    overflow: 'hidden',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain', // 이미지가 찌그러지지 않고 세로형 비율에 쏙 들어가도록 조절
    borderRadius: '4px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #eee',
    paddingTop: '10px',
    flexShrink: 0,
  },
  label: {
    fontSize: '13px',
    cursor: 'pointer',
    color: '#555',
    display: 'flex',
    alignItems: 'center',
  },
  btn: {
    background: '#007bff',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};  