import { 
  DISCORD_ICON,
  TWITTER_ICON
} from '../../../assets/images';
import { REACT_APP_ABOUT_IMG_1, REACT_APP_ABOUT_IMG_2, REACT_APP_ABOUT_IMG_3 } from '../../../config/envConfig';
import { SubHeaderLayout } from '../../../layout';

import './legal.css';

const About = () => {
  return (
    <SubHeaderLayout mainClassName="Wrapper-container about-wrapper-container">
      <div className="cms_title ps-5">About</div>
      <div className="cms_content opacity-100">
        <div className="about-img-container about-img-one-container">
          <img src={REACT_APP_ABOUT_IMG_1} className="about-img" alt="free to play" />
          <div className="about_text">
            <h2>Free to Play : </h2>
            <p>
              With our innovative General/Cadet system, F2P players who dont own any mechs will be
              able to hitchhike a mech and play for free.
            </p>
          </div>
        </div>
        <div className="about-img-container-two about-img-container">
          <img src={REACT_APP_ABOUT_IMG_2} className="about-img" alt="customise-deck" />
          <div className="about_text">
            <h2>Customize your deck :</h2>
            <p>
              Play according to your preferred playstyle by customizing your deck with attack,
              defense and power cards.
            </p>
          </div>
        </div>
        <div className="about-img-container-three about-img-container">
          <img src={REACT_APP_ABOUT_IMG_3} className="about-img" alt="utility" />
          <div className="about_text">
            <h2>Utility for all :</h2>
            <p>Battle using any PFPs you own and climb the leaderboards!</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 pt-5 text-center about-bottom-content">
            NMS - NEW MOON STUDIOS PTE. LTD <br />
            <p className="text-decoration-underline contact-mail-link-p">
              hello@newmoonstudios.xyz
            </p>
            <div className="footer-icon-container d-flex align-items-center justify-content-center mt-2">
              <p className="footer-icon">
                <a href="https://twitter.com/3verseGame" target="_blank" rel="noopener noreferrer">
                  <img src={TWITTER_ICON} className="footer-icon-img" alt="twitter" />
                </a>
              </p>
              <p className="footer-icon">
                <a
                  href="https://discord.com/invite/fwYrYBC5AD"
                  target="_blank"
                  rel="noopener noreferrer">
                  <img src={DISCORD_ICON} className="footer-icon-img" alt="discord" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SubHeaderLayout>
  );
};

export default About;
