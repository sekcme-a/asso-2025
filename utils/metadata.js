const DATA = {
  NAME: `대한생활체육회`,
  DESCRIPTION: `국민의 건강과 행복의 장을 여는 대한생활체육회. 국민생활체육의 권장, 발전을 목표로 하고 있습니다.`,
  URL: `https://www.xn--vk1by6xrzecngs4l6obxj.com`,
};

export function createMetadata({ title, description, url }) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${DATA.URL}${url}`,
      siteName: DATA.NAME,
      type: "website",
      images: [
        {
          url: `${DATA.URL}/images/og_logo.png`,
          width: 1200,
          height: 630,
          alt: `${DATA.NAME} 대표 이미지`,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [`${DATA.URL}/images/og_logo.png`],
    },
  };
}
