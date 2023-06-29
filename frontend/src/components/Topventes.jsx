import React from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { EffectCoverflow, Pagination, Navigation } from "swiper"

const Topventes = () => {
  return (
    <div className="topvente">
      <h1 className="toptitle">Les meilleures ventes</h1>
      <div className="wrapper">
        <section id="section1">
          <a href="#section3" className="arrow__btn">
            <IoIosArrowBack className="arrowNetflix" />
          </a>
          <div className="item">
            <div>
              <span className="span1">top ventes</span>
            </div>
            <img
              className="item-picture"
              src="https://d29xot63vimef3.cloudfront.net/image/berserk/1-1.jpg"
              alt="Describe Image"
            />
          </div>
          <div className="item">
            <div>
              <span className="span2">top ventes</span>
            </div>
            <img
              className="item-picture"
              src="https://d29xot63vimef3.cloudfront.net/image/one-piece/2-1.jpg"
              alt="Describe Image"
            />
          </div>
          <div className="item">
            <div>
              <span className="span3">top ventes</span>
            </div>
            <img
              className="item-picture"
              src="https://d29xot63vimef3.cloudfront.net/image/berserk/3-1.jpg"
              alt="Describe Image"
            />
          </div>
          <a href="#section2" className="arrow__btn">
            <IoIosArrowForward />
          </a>
        </section>
        <section id="section2">
          <a href="#section1" className="arrow__btn">
            <IoIosArrowBack />
          </a>
          <div className="item">
            <div>
              <span className="span1">top ventes</span>
            </div>
            <img
              className="item-picture"
              src="https://d29xot63vimef3.cloudfront.net/image/one-piece/3-1.jpg"
              alt="Describe Image"
            />
          </div>
          <div className="item">
            <div>
              <span className="span2">top ventes</span>
            </div>
            <img
              className="item-picture"
              src="https://d29xot63vimef3.cloudfront.net/image/berserk/2-1.jpg"
              alt="Describe Image"
            />
          </div>
          <div className="item">
            <div>
              <span className="span3">top ventes</span>
            </div>
            <img
              className="item-picture"
              src="https://m.media-amazon.com/images/I/51OvkZ5O6bL._SY291_BO1,204,203,200_QL40_ML2_.jpg"
              alt="Describe Image"
            />
          </div>
          <a href="#section3" className="arrow__btn">
            <IoIosArrowForward />
          </a>
        </section>
        <section id="section3">
          <a href="#section2" className="arrow__btn">
            <IoIosArrowBack />
          </a>
          <div className="item">
            <div>
              <span className="span1">top ventes</span>
            </div>
            <img
              className="item-picture"
              src="https://m.media-amazon.com/images/I/517G4sTzXdL._SY291_BO1,204,203,200_QL40_ML2_.jpg"
              alt="Describe Image"
            />
          </div>
          <div className="item">
            <div>
              <span className="span2">top ventes</span>
            </div>
            <img
              className="item-picture"
              src="https://m.media-amazon.com/images/I/41110KFb2XL._SY291_BO1,204,203,200_QL40_ML2_.jpg"
              alt="Describe Image"
            />
          </div>
          <div className="item">
            <div>
              <span className="span3">top ventes</span>
            </div>
            <img
              className="item-picture"
              src="https://m.media-amazon.com/images/I/51XY8XVHMNL._SY291_BO1,204,203,200_QL40_ML2_.jpg"
              alt="Describe Image"
            />
          </div>
          <a href="#section1" className="arrow__btn">
            <IoIosArrowForward />
          </a>
        </section>
      </div>
      <div className="carousel">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={false}
          // slidesPerGroup={3}
          // centeredSlidesBounds={true}
          centerInsufficientSlides={true}
          spaceBetween={300}
          // rewind={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          // pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          <SwiperSlide className="item">
            <div>
              <span className="span1">top ventes</span>
            </div>
            <img
              src="https://d29xot63vimef3.cloudfront.net/image/berserk/1-1.jpg"
              alt="manga cover"
              className="item-picture"
            />
          </SwiperSlide>
          <SwiperSlide className="item">
            <div>
              <span className="span1">top ventes</span>
            </div>
            <img
              src="https://d29xot63vimef3.cloudfront.net/image/one-piece/2-1.jpg"
              alt="manga cover"
              className="item-picture"
            />
          </SwiperSlide>
          <SwiperSlide className="item">
            <div>
              <span className="span1">top ventes</span>
            </div>
            <img
              src="https://d29xot63vimef3.cloudfront.net/image/berserk/3-1.jpg"
              alt="manga cover"
              className="item-picture"
            />
          </SwiperSlide>
          <SwiperSlide className="item">
            <div>
              <span className="span1">top ventes</span>
            </div>
            <img
              src="https://d29xot63vimef3.cloudfront.net/image/one-piece/3-1.jpg"
              alt="manga cover"
              className="item-picture"
            />
          </SwiperSlide>
          <SwiperSlide className="item">
            <div>
              <span className="span1">top ventes</span>
            </div>
            <img
              src="https://d29xot63vimef3.cloudfront.net/image/berserk/2-1.jpg"
              alt="manga cover"
              className="item-picture"
            />
          </SwiperSlide>
          <SwiperSlide className="item">
            <div>
              <span className="span1">top ventes</span>
            </div>
            <img
              src="https://m.media-amazon.com/images/I/51OvkZ5O6bL._SY291_BO1,204,203,200_QL40_ML2_.jpg"
              alt="manga cover"
              className="item-picture"
            />
          </SwiperSlide>
          <SwiperSlide className="item">
            <div>
              <span className="span1">top ventes</span>
            </div>
            <img
              src="https://m.media-amazon.com/images/I/517G4sTzXdL._SY291_BO1,204,203,200_QL40_ML2_.jpg"
              alt="manga cover"
              className="item-picture"
            />
          </SwiperSlide>
          <SwiperSlide className="item">
            <div>
              <span className="span1">top ventes</span>
            </div>
            <img
              src="https://m.media-amazon.com/images/I/41110KFb2XL._SY291_BO1,204,203,200_QL40_ML2_.jpg"
              alt="manga cover"
              className="item-picture"
            />
          </SwiperSlide>
          <SwiperSlide className="item">
            <div>
              <span className="span1">top ventes</span>
            </div>
            <img
              src="https://m.media-amazon.com/images/I/51XY8XVHMNL._SY291_BO1,204,203,200_QL40_ML2_.jpg"
              alt="manga cover"
              className="item-picture"
            />
          </SwiperSlide>

          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <HiArrowCircleLeft className="arrowLeft" />
            </div>
            <div className="swiper-button-next slider-arrow">
              <HiArrowCircleRight className="arrowRight" />
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </div>
  )
}

export default Topventes
