import React, { useEffect, useMemo, useState } from "react";

import { Image } from "@chakra-ui/react";

import { CardBody, CardContainer } from "@/layout";

import { database } from "@/firebase";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const SwiperSlideBaner = () => {
  const districtId = useMemo(() => cookies.get("district_id"), []);
  const [banners, setBanners] = useState<any[]>([]);

  function getBanners() {
    database.ref(`district/${districtId}/banner`).on("value", (snapshot) => {
      let bannerSnapshot = snapshot.val();

      if (!bannerSnapshot) {
        return;
      }

      const banners = Object.entries(bannerSnapshot || {}).map(([key, value]: any) => ({
        id: key,
        fullPath: value.fullPath,
      }));
      setBanners(banners);
    });
  }

  console.log(banners);

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <Swiper loop spaceBetween={10} slidesPerView={3}>
      {banners.map((item) => (
        <CardContainer key={item.id}>
          <CardBody>
            <SwiperSlide>
              <Image
                alt=""
                src={`https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/${item.fullPath.replace(
                  /\//,
                  "%2F"
                )}?alt=media`}
              />
            </SwiperSlide>
          </CardBody>
        </CardContainer>
      ))}
    </Swiper>
  );
};
