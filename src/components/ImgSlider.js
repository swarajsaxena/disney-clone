import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Carousel {...settings}>
      <Wrapper>
        <a>
          <img src="/images/slider-badging.jpg" alt="" />
        </a>
      </Wrapper>

      <Wrapper>
        <a>
          <img src="/images/slider-scale.jpg" alt="" />
        </a>
      </Wrapper>
      <Wrapper>
        <a>
          <img src="/images/slider-badag.jpg" alt="" />
        </a>
      </Wrapper>
      <Wrapper>
        <a>
          <img src="/images/slider-scales.jpg" alt="" />
        </a>
      </Wrapper>
    </Carousel>
  );
};

const Carousel = styled(Slider)`
  & > button {
    opacity: 0;
    height: 100%;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease;
    }
  }

  ul li button {
    &:before {
      width: 10px !important;
      height: 10px !important;
      color: white !important;
    }
  }

  line-height.slick-active button&before {
    color: white !important;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-dots {
    transform: translate(0px, 25px) scale(0.7);
  }

  .sick-prev {
    left: -10px;
  }
  .sick-next {
    left: -10px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  a {
    box-shadow: 0px 10px 20px rgb(0, 0, 0, 0.5);
    overflow: hidden;
    border-radius: 10px;
    height: 100%;
    display: block;
    margin: 0 18px;
    border: 4px solid transparent;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &:hover a {
    border: 4px solid white;
    transition: all 150ms ease-in;
  }
`;

export default ImgSlider;
