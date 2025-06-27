"use client";

import { useEffect, useRef } from "react";

const KakaoMap = ({ latitude, longitude, markerText }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=10143b83ffc3b3f9b4dfefb69908cb81&autoload=false";
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `
            <div style="
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 5px;
              font-size: 14px;
              width:160px;
              font-weight: 600;
              text-align: center;
            ">
              ${markerText}
            </div>
          `,
        });

        infowindow.open(map, marker);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude, markerText]);

  return <div ref={mapRef} className="w-full h-96 rounded-lg shadow " />;
};

export default KakaoMap;
