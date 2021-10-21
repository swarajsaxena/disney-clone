import styled from "styled-components";

const Viewers = (props) => {
  return (
    <Container>
      <Wrap>
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src="/videos/1564674844-disney.mp4"></source>
        </video>
        <img src="/images/viewers-disney.png" alt="" />
      </Wrap>
      <Wrap>
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src="/videos/1564676115-marvel.mp4"></source>
        </video>
        <img src="/images/viewers-marvel.png" alt="" />
      </Wrap>
      <Wrap>
        <video autoPlay="true" loop={true} playsInline={true}>
          <source src="/videos/1564676296-national-geographic.mp4"></source>
        </video>
        <img src="/images/viewers-national.png" alt="" />
      </Wrap>
      <Wrap>
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src="/videos/1608229455-star-wars.mp4"></source>
        </video>
        <img src="/images/viewers-starwars.png" alt="" />
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 70px;
  display: grid;
  gap: 30px;
  text-align: center;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Wrap = styled.div`
  border-radius: 7px;
  box-shadow: 0 10px 20px rgb(0 0 0 / 0.7);
  border: 3px solid hsla(0, 100%, 100%, 0.2);
  transition: all 150ms ease-in-out;
  position: relative;
  overflow: hidden;

  img {
    opacity: 1;
    object-position: center;
    object-fit: cover;
    width: 100%;
    transition: all 150ms ease-in-out;
  }

  video {
    transition: all 150ms ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    opacity: 0;
  }
  &:hover {
    border: 3px solid rgba(249, 249, 249, 1);
    transform: scale(1.05);
    img {
      opacity: 1;
    }
    video {
      opacity: 1;
    }
  }
`;

export default Viewers;
