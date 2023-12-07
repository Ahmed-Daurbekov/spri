import React from 'react';
import './AddNewPremie.scss'
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';
import axios from 'axios';

const AddNewPremie = () => {
  const [selectImg, setSelectImg] = React.useState(null)
  const navigate = useNavigate();
  const [fileObject, setFileObject] = React.useState(null)
  const [premieObj, setPremieObj] = React.useState({
    imagePath: null,
    name: '',
    date: '',
    description: ''
  })

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
  
  const uploadImage = async () => {
    if (Boolean(premieObj.name.trim()) && Boolean(premieObj.date.trim()) && Boolean(premieObj.description.trim())) {
      if (fileObject) {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const imageRef = storageRef.child('images/' + fileObject.name);
      
        try {
          let data = await imageRef.put(fileObject);
          let imgPath = data._delegate.metadata.fullPath
          var imgstorage = firebase.storage();
          var imgstorageRef = imgstorage.ref();
          var fileRef = imgstorageRef.child(imgPath);
          fileRef.getDownloadURL()
          .then(function(url) {
            let newObj = {
              ...premieObj,
              imagePath: url
            }
            axios.post(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/premie.json`, newObj)
              .then(() => {
                alert('Усппешно добавлена')
                navigate('/')
              })
          })
        } catch (error) {
          console.error('Ошибка загрузки изображения: ', error);
        }
      } else {
        axios.post(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/premie.json`, premieObj)
          .then(() => {
            alert('Усппешно добавлена')
            navigate('/')
          })
      }
    }
  };

  
  function changeImage(e) {
    let file = e.target.files[0];
    if (file) {
      setFileObject(file)
      let reader = new FileReader()
      reader.readAsDataURL(file);

      reader.onload = function () {
        setSelectImg(reader.result)
      }
    } else {
      setFileObject(null)
      setSelectImg(null)
    }
  }

  return (
    <div className='addNewPremie'>
      <button onClick={() => {
        navigate(-1)
      }} className='go-back'>Назад</button>
      <div className="container">
        <div className="addNewPremie-img_block">
          {
            selectImg ? <>
              <label htmlFor="file">
                <img src={selectImg} alt="Выбраное изображение" />
                <input onChange={(e) => changeImage(e)} type="file" id='file' />
              </label>
            </> :
            <label htmlFor='file'>
              <span className='click-to-select'>Нажмите чтобы выбрать фотографию</span>
              <input onChange={(e) => {
                changeImage(e)
              }} type="file" id='file' />
            </label>
          }
        </div>

        <div className="addNewPremie-inputs_block">
          <input onChange={e => setPremieObj({...premieObj, name: e.target.value})} className='input name' name='name' type="text" placeholder='Название' />
          <textarea onChange={e => setPremieObj({...premieObj, description: e.target.value})}  className='textarea' placeholder='Описание'></textarea>
          <input onChange={e => setPremieObj({...premieObj, date: e.target.value})} className='input date' name='date' type="text" placeholder='Дата' />
          <button onClick={uploadImage} className='inputs-block_btn'>Добавить</button>
        </div>

      </div>
    </div>
  );
};

export default AddNewPremie;