import React from 'react';
import AboutSP_img from '../../../img/other/AboutSP_img.png'
import './AboutSP.scss'

const AboutSP = () => {
  return (
    <div className='aboutSP'>
      <div className="container">
        <div className="aboutSP_text-block">
          <h2 className="aboutSP_text-block_h2">О союзе писателей</h2>
          <p className='aboutSP_text-block_p'>Как и многие другие региональные союзы писателей в России, Союз писателей Республики Ингушетия является организацией, объединяющей писателей и литературных деятелей данной республики.</p>
          <br />
          <p className='aboutSP_text-block_p'>Он был создан в 1989 году, на территории тогдашней Ингушской АССР, и включает в себя писателей, поэтов, переводчиков, критиков и других специалистов в области литературы. Главной целью Союза является развитие литературы и культуры республики, поддержка и развитие талантливых молодых писателей и поэтов, а также организация литературных мероприятий, конкурсов и фестивалей.</p>
        </div>
        
        <div className="aboutSP_img-block">
          <img src={AboutSP_img} alt="AboutSP_img" />
        </div>
      </div>
    </div>
  );
};

export default AboutSP;