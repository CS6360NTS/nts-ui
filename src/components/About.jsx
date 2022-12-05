import React from 'react';
import nfta from './nfta.jpg';
import nft21 from './nft21.png';
import trend from './trend.webp';
import { Carousel } from 'react-bootstrap';

function About() {
  return (
    <div className="about">
      <div class="container" style={{ display: 'block', width: 900, height: 600, padding: 0 }}>

        <Carousel className='carousel-cls'>
          <Carousel.Item interval={1000}>
            <img src={nft21} style={{ display: 'block', width: 900, height: 500, padding: 20 }} alt="NFT 1"></img>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img src={trend} style={{ display: 'block', width: 900, height: 600 }} alt="NFT 2"></img>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img src={nfta} style={{ display: 'block', with: 900, height: 600 }} alt="NFT 3"></img>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default About;