import Slider from 'react-slick';

import { horizontalSliderSetting, nftData } from './horizontalSliderData';

import './mechSection.css';

const MechSection = () => {
  return (
    // <div className="horizontal-slider">
    //   <Slider {...horizontalSliderSetting}>
    //     {nftData?.map((index) => (
    //       <Slider {...mechSectionSliderSetting} className="horizontal" key={index}>
    //         {nftData?.map((index) => (
    //           <img width="650" height="330" src={MECH_CARD} key={index} />
    //         ))}
    //       </Slider>
    //     ))}
    //   </Slider>
    // </div>
    <Slider {...horizontalSliderSetting} className="image_slider">
      {nftData?.map((item, index) => (
        <img className='mech-slider-image' src={item?.img} key={index} alt="mech-images"/>
      ))}
    </Slider>
  );
};

export default MechSection;
