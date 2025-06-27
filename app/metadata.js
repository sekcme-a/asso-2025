const DATA = {
  NAME: `대한생활체육회`,
  DESCRIPTION: `국민의 건강과 행복의 장을 여는 대한생활체육회. 국민생활체육의 권장, 발전을 목표로 하고 있습니다.`,
  URL: `https://www.xn--vk1by6xrzecngs4l6obxj.com`,
};

const metadata = {
  metadataBase: new URL(DATA.URL),
  title: `${DATA.NAME}`,
  title: {
    default: `${DATA.NAME}`,
    template: `%s - ${DATA.NAME}`,
  },
  description: DATA.DESCRIPTION,
  keywords: `${DATA.NAME},체육회,체육`,
  openGraph: {
    title: `${DATA.NAME}`,
    description: DATA.DESCRIPTION,
    url: DATA.URL,
    siteName: DATA.NAME,
    images: [
      {
        url: `${DATA.URL}/images/og_logo.png`,
        width: 1200,
        height: 630,
        alt: `${DATA.NAME} 대표 이미지`,
      },
    ],
    type: `website`,
  },
  twitter: {
    title: DATA.NAME,
    description: DATA.DESCRIPTION,
    images: [`${DATA.URL}/images/og_logo.png`],
  },
};

export default metadata;
