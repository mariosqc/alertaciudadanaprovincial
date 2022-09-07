import React from "react";

import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Cookies from "universal-cookie";
import { MenuBanner } from "./MenuBanner";
import { useBannerContext } from "@/contexts";

const cookies = new Cookies();

export const SwiperSlideBaner = () => {
  const { banners } = useBannerContext();
  return (
    <Box overflow="hidden" maxH="96">
      <Swiper loop spaceBetween={10} slidesPerView={3}>
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <Flex mb="1" alignItems="center" justifyContent="space-between">
              <Text fontSize="lg" fontWeight="semibold">
                {item.title || "No existe un título"}
              </Text>
            </Flex>
            <Image
              userSelect="none"
              alt=""
              src={`https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/${item.url.replace(
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
