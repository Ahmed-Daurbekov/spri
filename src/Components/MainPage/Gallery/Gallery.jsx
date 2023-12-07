import React from 'react';
import './Gallery.scss'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import firebase from 'firebase/app';
import 'firebase/storage';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../Loader/Loader';
import { Auth } from '../../../Context/Context';

const Gallery = () => {
  const {isAuth} = React.useContext(Auth)
  const [fileLinks, setFileLinks] = React.useState([]);
  const [loader, setLoader] = React.useState(true)

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
    axios.get(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/gallery.json`)
      .then(d => {
        setFileLinks(addDataToState(d.data))
        setLoader(false)
      })
  }, [])

  function addDataToState(obj) {
    let arr = []
    for (const key in obj) {
      let newObj = {
        id: key,
        ...obj[key]
      }
      arr.push(newObj)
    }
    return arr
  }
  
  return (
    <div className="gallery">
      <h2 className="gallery_title container">Галерея</h2>
      {
        loader ? <Loader /> : <>
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
                  <img className='slide' src={link.imagePath} alt="slide" />
                </div>
              })
            }
          </Carousel>
          <div className="container">
            {
              isAuth && <div className="add-new-writter">
                <Link to='/add-photo' className="add-new-writter_btn">Добавить фото</Link>
              </div>
            }
          </div>
        </>
      }
    </div>
  );
};

export default Gallery;