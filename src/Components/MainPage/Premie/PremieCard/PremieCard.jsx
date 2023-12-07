import React from 'react';
import emptyPhoto from '../../../../img/other/empty.jpg';

const PremieCard = ({obj}) => {
  console.log(obj);
  return (
    <div className="premie-block">
      <div className="premie-block_img-block">
        <img src={obj.imagePath ? obj.imagePath : emptyPhoto} alt="img" />
      </div>
      <div className="premie-block_text-block">
        <p className="premie-block_text-block_title">{obj.description} - {obj.name}</p>
        <span className="premie-block_text-block_date">Год: {obj.date}</span>
      </div>
    </div>
  );
};

export default PremieCard;