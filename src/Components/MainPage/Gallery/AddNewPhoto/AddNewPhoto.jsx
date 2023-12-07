import React from 'react';
import './AddNewPhoto.scss'
import firebase from 'firebase/app';
import 'firebase/storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNewPhoto = () => {
  const [dragging, setDragging] = React.useState(false);
  const navigate = useNavigate();
  const [haveFile, setHaveFile] = React.useState(false)
  const [selectImg, setSelectImg] = React.useState(null)
  const [fileObject, setFileObject] = React.useState(null)

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    setHaveFile(true)

    let file = e.dataTransfer.files[0];
    if (file) {
      setFileObject(file)
      let reader = new FileReader()
      reader.readAsDataURL(file);

      reader.onload = function () {
        // console.log(reader.result.split('/'));
        setSelectImg(reader.result)
      }
    }
    // setFiles([...files, ...newFiles]);
  };

  // const handleFileDelete = (index) => {
  //   const newFiles = [...files];
  //   newFiles.splice(index, 1);
  //   setFiles(newFiles);
  // };

  async function submitPhoto() {
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
          imagePath: url
        }
        axios.post(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/gallery.json`, newObj)
          .then(() => {
            alert('Усппешно добавлена')
            navigate('/')
          })
      })
    } catch (error) {
      console.error('Ошибка загрузки изображения: ', error);
    }
  }

  return (
    <div className="addNewPhoto">
      <div className="container">
        {
          haveFile ? <div 
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className='select-photo'
          >
            <ul>
              <li className='photo'>
                <img src={selectImg} alt="" />
              </li>
            </ul>
            <button onClick={submitPhoto} className='submitToFB'>Добавить</button>
            </div> : <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className='select-photo'
            >
              <p className='text'>Перетащите фото сюда</p>
            </div>
        }
      </div>
    </div>
  );
};

export default AddNewPhoto;