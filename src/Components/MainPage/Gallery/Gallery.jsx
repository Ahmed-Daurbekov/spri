import React from 'react';
import './Gallery.scss'
import img1 from '../../../img/other/image 4.png'
import img2 from '../../../img/other/image 5.png'
import img3 from '../../../img/other/image 6.png'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import firebase from 'firebase/app';
import 'firebase/storage';

const Gallery = () => {
  const [fileLinks, setFileLinks] = React.useState([]);

  React.useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDO-e8ZFVEzA12XusFQq1FsnUs6yEB0eGc",
      authDomain: "dimpom-4d9fe.firebaseapp.com",
      projectId: "dimpom-4d9fe",
      storageBucket: "dimpom-4d9fe.appspot.com",
      messagingSenderId: "213650717391",
      appId: "1:213650717391:web:f90b88e48105a3d96b95ba",

      databaseURL: "https://dimpom-4d9fe-default-rtdb.firebaseio.com",
      measurementId: "G-C5GYKMLBBL"
    };
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);
  
  React.useEffect(() => {
    const storageRef = firebase.storage().ref();
    const folderRef = storageRef.child('images/');
    
    folderRef
    .listAll()
    .then((result) => {
      const promises = result.items.map((item) => item.getDownloadURL());
      Promise.all(promises)
        .then((urls) => {
          setFileLinks(urls)
        })
        .catch((error) => {
          console.error('Ошибка при получении URL файлов из Firebase Storage:', error);
        });
    })
    .catch((error) => {
      console.error('Ошибка при получении списка файлов из Firebase Storage:', error);
    });
  }, [])
  
  
  return (
    <div className="gallery">
      <h2 className="gallery_title container">Галерея</h2>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        containerClass="container"
        customTransition="all .5"
        draggable
        focusOnSelect={false}
        infinite
        itemClass="carousel-item-padding-40-px"
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1250,
            },
            items: 3,
          },
          tablet: {
            breakpoint: {
              max: 1250,
              min: 890,
            },
            items: 2,
          },
          mobile: {
            breakpoint: {
              max: 890,
              min: 0,
            },
            items: 1,
          },
        }}
        showDots={false}
        sliderClass="carousel-slider"
        slidesToSlide={1}
        swipeable
      >
        {
          fileLinks.map((link, index) => {
            return <div key={index} className="slide">
              <img className='slide' src={link} alt="slide" />
            </div>
          })
        }
      </Carousel>
    </div>
  );
};

export default Gallery;