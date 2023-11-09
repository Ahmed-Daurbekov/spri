import React from 'react';
import test from '../../img/other/image 5.png'
import empty from '../../img/other/empty.jpg'
import './SettingsProject.scss'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/storage';

const SettingsProject = () => {
  const [selectImg, setSelectImg] = React.useState(null)
  const [newImage, setNewImage] = React.useState(null)
  const [projectObj, setProjectObj] = React.useState({})
  let {id} = useParams()
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
    axios.get(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/works/${id}.json`)
      .then(d => {
        setProjectObj(d.data)
      })
  }, [])
  
  async function editProject() {
    if (newImage) {
      if (Boolean(projectObj.name.trim()) && Boolean(projectObj.description.trim())) {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const imageRef = storageRef.child('images/' + newImage.name); // Путь в хранилище, куда будет загружено изображение
      
        try {
          let data = await imageRef.put(newImage);
          let imgPath = data._delegate.metadata.fullPath
          var imgstorage = firebase.storage();
          var imgstorageRef = imgstorage.ref();
          var fileRef = imgstorageRef.child(imgPath);
          fileRef.getDownloadURL()
          .then(function(url) {
            let newObj = {
              name: projectObj.name.slice(0, 1).toUpperCase() + projectObj.name.slice(1),
              description: projectObj.description.slice(0, 1).toUpperCase() + projectObj.description.slice(1),
              imagePath: url
            }
            axios.put(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/works/${id}.json`, newObj)
              .then(() => {
                alert('Изменении сохранены')
                navigate('/writers-works')
              })
          })
        } catch (error) {
          console.error('Ошибка загрузки изображения: ', error);
        }
      }
    } else {
      if (Boolean(projectObj.name.trim()) && Boolean(projectObj.description.trim())) {
        axios.put(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/works/${id}.json`, projectObj)
        .then((d) => {
          alert('Изменении сохранены')
          navigate('/writers-works')
        })
      }
    }
  }
  
  function changeImage(e) {
    let file = e.target.files[0];
    if (file) {
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
    <div className='settingsProject'>
      <div className="container">
        <button onClick={() => {
          navigate(-1)
        }} className='go-back'>Назад</button>
      </div>
      <div className="container">
        <div className="biogr">
          <div className="settingsProject-img_block">
            {/* <img src={projectObj.imagePath ? projectObj.imagePath : empty} alt="" /> */}
            {
              projectObj.imagePath ? <>
                <label htmlFor="selectNewImg">
                  <img src={selectImg ? selectImg : projectObj.imagePath} alt="img" />
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
          <div className="settingsProject-inputs_block">
            <input onChange={e => setProjectObj({...projectObj, name: e.target.value})} defaultValue={projectObj.name} className='input name' name='name' type="text" placeholder='Имя' />
            <textarea onChange={e => setProjectObj({...projectObj, description: e.target.value})} defaultValue={projectObj.description} className='textarea' name='description' placeholder='Описание' ></textarea>
            
            <button className='edit_btn' onClick={editProject} >Изменить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsProject;