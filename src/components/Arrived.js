import React from "react";

import ArrivedItem from "./ArrivedItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

function Arrived({ items }) {
  return (
    <section className="flex flex-col py-16">
      <div className="container mx-auto mb-4">
        <div className="flex justify-center text-center mb-4">
          <h3 className="text-2xl capitalize font-semibold">
            Just Arrived <br className="" />
            this summer for you
          </h3>
        </div>
      </div>
      <div className="overflow-x-hidden px-4">
        <div className="container mx-auto"></div>
        <div className="flex -mx-4 flex-row relative">
        <Swiper
        spaceBetween={287}
        slidesPerView={1}
        loop={true}
          >
            {items &&
              items.map((item, index) => (
                <SwiperSlide key={item.id} style={{ width: "278px" }}>
                <div className="flex">
                  <ArrivedItem item={item} />
                  <ArrivedItem item={items[(index + 1) % items.length]} className="ml-6"/>
                </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Arrived;


