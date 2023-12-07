import React from 'react';
import empty from '../../../img/other/empty.jpg'
import './TvorshectvoCard.scss'

const TvorshectvoCard = ({obj}) => {
  return (
    <div className="tvorshectvo-list">
      <div className="tvorshectvo-list_img">
        <img src={obj.imagePath ? obj.imagePath : empty} alt="empty" />
      </div>
      <div className="tvorshectvo-list_name">
        {obj.name}
      </div>
    </div>
  );
};

export default TvorshectvoCard;