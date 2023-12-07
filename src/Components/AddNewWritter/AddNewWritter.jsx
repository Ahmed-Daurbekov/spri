import React from 'react';
import combine from '../../img/icons/combine.svg'
import './AddNewWritter.scss'
import firebase from 'firebase/app';
import 'firebase/storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNewWritter = () => {
  const [selectImg, setSelectImg] = React.useState(null)
  const [biograhpObj, setBiograhpObj] = React.useState({
    imagePath: null,
    surname: '',
    name: '',
    fathername: '',
    description: '',
    birthday: '',
    deathday: null
  })
  const navigate = useNavigate();
  const [fileObject, setFileObject] = React.useState(null)
  
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
    if (Boolean(biograhpObj.birthday) && Boolean(biograhpObj.name.trim()) && Boolean(biograhpObj.surname.trim()) && Boolean(biograhpObj.fathername.trim())) {
      if (fileObject) {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const imageRef = storageRef.child('images/' + fileObject.name); // Путь в хранилище, куда будет загружено изображение
      
        try {
          let data = await imageRef.put(fileObject);
          let imgPath = data._delegate.metadata.fullPath
          var imgstorage = firebase.storage();
          var imgstorageRef = imgstorage.ref();
          var fileRef = imgstorageRef.child(imgPath);
          fileRef.getDownloadURL()
          .then(function(url) {
            let newObj = {
              surname: biograhpObj.surname.slice(0, 1).toUpperCase() + biograhpObj.surname.slice(1),
              name: biograhpObj.name.slice(0, 1).toUpperCase() + biograhpObj.name.slice(1),
              fathername: biograhpObj.fathername.slice(0, 1).toUpperCase() + biograhpObj.fathername.slice(1),
              description: biograhpObj.description.slice(0, 1).toUpperCase() + biograhpObj.description.slice(1),
              imagePath: url,
              birthday: biograhpObj.birthday.split('-').reverse().join('.'),
              deathday: biograhpObj.deathday ? biograhpObj.deathday.split('-').reverse().join('.') : biograhpObj.deathday
            }
            axios.post(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/writers.json`, newObj)
              .then(() => {
                alert('Писатель добавлен')
                navigate('/writers')
              })
          })
        } catch (error) {
          console.error('Ошибка загрузки изображения: ', error);
        }
      } else {
        let newObj = {
          surname: biograhpObj.surname.slice(0, 1).toUpperCase() + biograhpObj.surname.slice(1),
          name: biograhpObj.name.slice(0, 1).toUpperCase() + biograhpObj.name.slice(1),
          fathername: biograhpObj.fathername.slice(0, 1).toUpperCase() + biograhpObj.fathername.slice(1),
          description: biograhpObj.description.slice(0, 1).toUpperCase() + biograhpObj.description.slice(1),
          birthday: biograhpObj.birthday.split('-').reverse().join('.'),
          deathday: biograhpObj.deathday ? biograhpObj.deathday.split('-').reverse().join('.') : biograhpObj.deathday
        }
        axios.post(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/writers.json`, newObj)
          .then(() => {
            alert('Писатель добавлен')
            navigate('/writers')
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
    <div className='addNewWritter'>
      <div className="container">
        <button onClick={() => {
          navigate(-1)
        }} className='go-back'>Назад</button>
      </div>
      <div className="container">
        <div className="addNewWritter-img_block">
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
        <div className="addNewWritter-inputs_block">
          <div className="fio">
            <input onChange={e => setBiograhpObj({...biograhpObj, surname: e.target.value})} className='input surname' name='surname' type="text" placeholder='Фамилия' />
            <input onChange={e => setBiograhpObj({...biograhpObj, name: e.target.value})} className='input name' name='name' type="text" placeholder='Имя' />
            <input onChange={e => setBiograhpObj({...biograhpObj, fathername: e.target.value})} className='input fathername' name='fathername' type="text" placeholder='Отчество' />
          </div>

          <div className="data-live">
            <input onChange={e => setBiograhpObj({...biograhpObj, birthday: e.target.value})} className='input birthday' name='birthday' type="date" placeholder='Дата рождения' />
            <input onChange={e => setBiograhpObj({...biograhpObj, deathday: e.target.value})} className='input deathday' name='deathday' type="date" placeholder='Дата смерти (при наличии)' />
          </div>
          
          <textarea onChange={e => setBiograhpObj({...biograhpObj, description: e.target.value})} className='textarea' placeholder='Биография'></textarea>

          <button onClick={e => {
            uploadImage()
          }} className='inputs-block_btn'>Добавить</button>
          {/* <button onClick={uploadImage(e.target.files[0])} className='inputs-block_btn'>Добавить</button> */}
        </div>
      </div>
    </div>
  );
};

export default AddNewWritter;