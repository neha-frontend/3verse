import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CollectionSection from './collectionSection/CollectionSection';
import MechSection from './mechSection/MechSection';
import NewItems from './newItems/NewItems';
import { PLAY_BANNER_BTN } from '../../../assets/images';
import { RenderIf } from '../../../utils';
import { AlertMessageModal, PrimaryButton, Spinner } from '../../../components';
// import dummyVideo from '../../../assets/trailer_site.mp4';
import { REACT_APP_BANNER_VIDEO } from '../../../config/envConfig';

import './home.css';

const HomePage = () => {
  const { isLoading: rentLoader } = useSelector((state) => state.nft.putNftOnRent);
  const [Loading, setLoading] = useState(false);

   useEffect(() => {
     if (Loading || rentLoader) {
       document.body.style.overflow = 'hidden';
     } else {
       document.body.style.overflow = 'unset';
     }
   }, [Loading, rentLoader]);
  return (
    <>
      <RenderIf isTrue={rentLoader || Loading}>
        <Spinner className="global-spinner" />
      </RenderIf>
      <div className={`row ${Loading ? 'hidesection' : ''} `}>
        <div className="relative banner_img">
          <div className="homepage_BackgroundVideoContainer_33v9_">
            <video autoPlay={true} preload="auto" loop={true} muted={true}>
              <source type="video/mp4" src={REACT_APP_BANNER_VIDEO} />
            </video>
          </div>
          <div className="banner_text d-md-block d-none">
            <div className="banner_heading">
              <span className="glow">Welcome to 3VERSE</span>
              <br /> Play and compete in this browser-based blockchain game. Power up your mech
              using any PFP and battle others in the ultimate PVP arena for casual and midcore
              players alike.
            </div>
            <div className="d-flex mt-5">
              <PrimaryButton
                type="button"
                text={
                  <a
                    href="https://139-162-7-242.ip.linodeusercontent.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="play-btn-a">
                    Play Now
                  </a>
                }
                primaryClassName="play_btn"
              />
            </div>
          </div>
          <a href="" className="d-md-none d-block banner-play-btn">
            <img src={PLAY_BANNER_BTN} alt="play-icon" />
          </a>
        </div>
        {/* <div className="banner_text d-md-none d-block">
          <div className="banner_heading">
            <span className="glow">Welcome to 3VERSE</span>
            <br className="banner_br" /> Play and compete in this browser-based blockchain game.
            Power up your mech using any PFP and battle others in the ultimate PVP arena for casual
            and midcore players alike.
          </div>
          <div className="d-flex mt-5">
            <a
              href="https://139-162-7-242.ip.linodeusercontent.com/"
              target="_blank"
              rel="noreferrer"
              className="play-btn-a">
              <PrimaryButton type="button" text="Play Now" primaryClassName="play_btn" />
            </a>
          </div>
        </div> */}
        {/* <a href="" className="d-md-none d-block banner-play-btn">
          <img src={PLAY_BANNER_BTN} />
        </a> */}
      </div>
      <div className="banner_text d-md-none d-block">
        <div className="banner_heading">
          <span className="glow">Welcome to 3VERSE</span>
          <br className="banner_br" /> Play and compete in this browser-based blockchain game. Power
          up your mech using any PFP and battle others in the ultimate PVP arena for casual and
          midcore players alike.
        </div>
        <div className="d-flex mt-5 flex-column banner_btn_container">
          <a
            href="https://139-162-7-242.ip.linodeusercontent.com/"
            target="_blank"
            rel="noreferrer"
            className="play-btn-a">
            <PrimaryButton type="button" text="Play Now" primaryClassName="play_btn" />
          </a>
        </div>
      </div>

      <div className="mt-4">
        {/* <div className="row widget_box "> */}
        <MechSection />
        {/* </div> */}
      </div>
      <div className="widget_wrapper newItems-wrapper">
        <div className="row widget_box">
          <NewItems setLoading={(val) => setLoading(val)} />
        </div>
      </div>
      <div className="widget_wrapper collectionWrapper mb-5">
        <div className="row widget_box">
          <CollectionSection />
        </div>
      </div>
      <AlertMessageModal />
    </>
  );
};

export default HomePage;
