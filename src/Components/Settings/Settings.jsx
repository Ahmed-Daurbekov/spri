import React from 'react';
import './Settings.scss'
import test from '../../img/other/image 5.png'
import empty from '../../img/other/empty.jpg'
import MyMultipleSelect from './MyMultipleSelect/MyMultipleSelect';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';

const Settings = () => {
  const [selectImg, setSelectImg] = React.useState(null)
  const [newImage, setNewImage] = React.useState(null)
  const [writer, setWriter] = React.useState({})
  let { id } = useParams()
  const navigate = useNavigate();

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
    axios.get(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/writers/${id}.json`)
      .then(d => {
        console.log(d.data);
        setWriter(d.data)
      })
  }, [])

  async function save() {
    if (newImage) {
      if (Boolean(writer.name.trim()) && Boolean(writer.surname.trim()) && Boolean(writer.fathername.trim())) {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const imageRef = storageRef.child('images/' + newImage.name);

        try {
          let data = await imageRef.put(newImage);
          let imgPath = data._delegate.metadata.fullPath
          var imgstorage = firebase.storage();
          var imgstorageRef = imgstorage.ref();
          var fileRef = imgstorageRef.child(imgPath);
          fileRef.getDownloadURL()
            .then(function (url) {
              let newObj = {
                surname: writer.surname.slice(0, 1).toUpperCase() + writer.surname.slice(1),
                name: writer.name.slice(0, 1).toUpperCase() + writer.name.slice(1),
                fathername: writer.fathername.slice(0, 1).toUpperCase() + writer.fathername.slice(1),
                description: writer.description.slice(0, 1).toUpperCase() + writer.description.slice(1),
                projects: writer.projects,
                imagePath: url,
                birthday: writer.birthday.split('-').reverse().join('.'),
                deathday: writer.deathday ? writer.deathday.split('-').reverse().join('.') : writer.deathday
              }
              axios.put(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/writers/${id}.json`, newObj)
                .then(() => {
                  alert('Писатель изменен')
                  navigate('/writers')
                })
            })
        } catch (error) {
          console.error('Ошибка загрузки изображения: ', error);
        }
      }
    } else {
      // этот часть работает
      let newObj = {
        surname: writer.surname.slice(0, 1).toUpperCase() + writer.surname.slice(1),
        name: writer.name.slice(0, 1).toUpperCase() + writer.name.slice(1),
        fathername: writer.fathername.slice(0, 1).toUpperCase() + writer.fathername.slice(1),
        projects: writer.projects,
        description: writer.description.slice(0, 1).toUpperCase() + writer.description.slice(1),
        birthday: writer.birthday.split('-').reverse().join('.'),
        deathday: writer.deathday ? writer.deathday.split('-').reverse().join('.') : writer.deathday,       
        imagePath: writer.imagePath ? writer.imagePath : null
      }

      axios.put(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/writers/${id}.json`, newObj)
        .then(() => {
          alert('Писатель изменен')
          navigate('/writers')
        })
    }
  }


  function changeImage(e) {
    let file = e.target.files[0];
    if (file) {
      // setFileObject(file)
      let reader = new FileReader()
      reader.readAsDataURL(file);

      reader.onload = function () {
        setSelectImg(reader.result)
      }

      setNewImage(file)
    } else {
      setNewImage(null)
      setSelectImg(null)
    }
  }

  return (
    <div className='settings'>
      <div className="container">
        <button onClick={() => {
          navigate(-1)
        }} className='go-back'>Назад</button>
      </div>
      <div className="container">
        <div className="biogr">
          <div className="settings-img_block">
            {
              writer.imagePath ? <>
                <label htmlFor="selectNewImg">
                  <img src={selectImg ? selectImg : writer.imagePath} alt="img" />
                  <input onChange={(e) => changeImage(e)} type="file" id='selectNewImg' />
                </label>
              </> :
                <>
                  <label htmlFor="selectNewImg">
                    <img src={selectImg ? selectImg : empty} alt="img" />
                    <input onChange={(e) => changeImage(e)} type="file" id='selectNewImg' />
                  </label>
                </>
            }
          </div>

          <div className="settings-inputs_block">
            <div className="fio">
              <input defaultValue={writer.surname} onChange={e => setWriter({ ...writer, surname: e.target.value })} className='input surname' name='surname' type="text" placeholder='Фамилия' />
              <input defaultValue={writer.name} onChange={e => setWriter({ ...writer, name: e.target.value })} className='input name' name='name' type="text" placeholder='Имя' />
              <input defaultValue={writer.fathername} onChange={e => setWriter({ ...writer, fathername: e.target.value })} className='input fathername' name='fathername' type="text" placeholder='Отчество' />
            </div>

            <div className="data-live">
              <input defaultValue={writer.birthday && writer.birthday.split('.').reverse().join('-')} onChange={e => setWriter({...writer, birthday: e.target.value})} className='input birthday' name='birthday' type="date" placeholder='Дата рождения' />
              <input defaultValue={writer.deathday && writer.deathday.split('.').reverse().join('-')} onChange={e => setWriter({...writer, deathday: e.target.value})} onBlur={e => setWriter({...writer, deathday: e.target.value})} className='input deathday' name='deathday' type="date" placeholder='Дата смерти (при наличии)' />
            </div>
            
            <textarea onChange={e => setWriter({ ...writer, description: e.target.value })} defaultValue={writer.description ? writer.description : ''} className='textarea' placeholder='Описание'></textarea>
            <button onClick={() => save()} className='save'>Сохранить</button>
          </div>
        </div>
        <div className="projects">
          <MyMultipleSelect writer={writer} />
        </div>
      </div>
    </div>
  );
};

export default Settings;