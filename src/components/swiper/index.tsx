import React, { useEffect, useMemo, useState } from "react";

import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";

import { CardBody, CardContainer } from "@/layout";

import { database } from "@/firebase";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Cookies from "universal-cookie";
import { MenuBanner } from "./MenuBanner";

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
        title: value.title,
      }));
      setBanners(banners);
    });
  }

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <Box overflow="hidden" maxH="96">
      <Swiper loop spaceBetween={10} slidesPerView={3}>
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <Flex mb="1" alignItems="center" justifyContent="space-between">
              <Text fontSize="lg" fontWeight="semibold">
                {item.title || "No existe un título"}
              </Text>
              <MenuBanner bannerId={item.id} />
            </Flex>
            <Image
              userSelect="none"
              alt=""
              src={`https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/${item.fullPath.replace(
                /\//,
                "%2F"
              )}?alt=media`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
