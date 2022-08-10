import React from "react";

import { Image } from "@chakra-ui/react";

import { Card, CardBody, CardContainer } from "@/layout";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const SwiperSlideBaner = () => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <CardContainer>
        <CardBody>
          <SwiperSlide>
            <Image
              alt=""
              src="https://img.freepik.com/vector-gratis/banner-negro-formas-geometricas-amarillas_1017-32327.jpg?w=2000"
            />
          </SwiperSlide>
        </CardBody>
      </CardContainer>
      <Card.Wrapper>
        <Card.Body>
          <SwiperSlide>
            <Image
              alt=""
              src="https://img.freepik.com/vector-gratis/banner-negro-formas-geometricas-amarillas_1017-32327.jpg?w=2000"
            />
          </SwiperSlide>
        </Card.Body>
      </Card.Wrapper>
      <Card.Wrapper>
        <Card.Body>
          <SwiperSlide>
            <Image
              alt=""
              src="https://img.freepik.com/vector-gratis/banner-negro-formas-geometricas-amarillas_1017-32327.jpg?w=2000"
            />
          </SwiperSlide>
        </Card.Body>
      </Card.Wrapper>
      <Card.Wrapper>
        <Card.Body>
          <SwiperSlide>
            <Image
              alt=""
              src="https://img.freepik.com/vector-gratis/banner-negro-formas-geometricas-amarillas_1017-32327.jpg?w=2000"
            />
          </SwiperSlide>
        </Card.Body>
      </Card.Wrapper>
      <Card.Wrapper>
        <Card.Body>
          <SwiperSlide>
            <Image
              alt=""
              src="https://img.freepik.com/vector-gratis/banner-negro-formas-geometricas-amarillas_1017-32327.jpg?w=2000"
            />
          </SwiperSlide>
        </Card.Body>
      </Card.Wrapper>
    </Swiper>
  );
};
