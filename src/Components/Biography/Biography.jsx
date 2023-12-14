import React from 'react';
import './Biography.scss'
import empty from '../../img/other/empty.jpg'
import Modal from '../Modal/Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TvorshectvoCard from './TvorshectvoCard/TvorshectvoCard';

const Biography = () => {
  const [modal, setModal] = React.useState(false)
  const [text, setText] = React.useState('')
  const [biographyObj, setBiograhpObj] = React.useState({})
  const [writerProjects, setWriterProjects] = React.useState([])
  let {id} = useParams()

  React.useEffect(() => {
    axios.get(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/writers/${id}.json`)
      .then(d => {
        setBiograhpObj(d.data)
      })
  }, [])

  React.useEffect(() => {
    axios.get(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/works.json`)
      .then(d => {
        setWriterProjects(selectWriterProjects(d.data))
      })
  }, [biographyObj])

  function showModal(txt) {
    setText(txt.previousSibling.textContent)
    setModal(true)
  }

  function selectWriterProjects(obj) {
    let arr = []
    if (biographyObj.projects) {
      biographyObj.projects.map(item => {
        let newObj = {
          id: item,
          ...obj[item]
        }
        arr.push(newObj);
      })
    }
    return arr
  }
  
  return (
    <>
      <div className='biography'>
        <div className="container">
          <div className="biography-block">
            <div className="biography-block_img">
              <img src={biographyObj.imagePath ? biographyObj.imagePath : empty} alt="" />
            </div>
            <div className="biography-block_text">
              <h3 className="biography-title">{biographyObj.surname} {biographyObj.name} {biographyObj.fathername}</h3>
              {/* если текст в biography-desc будет дольше определеного длинны добавить три точки и кнопку читать далее при max-width 550px длину текста уменьшить*/}
              <div className="live">
                {
                  biographyObj.deathday ? <>
                      <span className='birthday'>{biographyObj.birthday}</span> &mdash;
                      <span className='deathday'>{biographyObj.deathday}</span>
                  </> : <>
                      Родился <div style={{marginLeft: '5px'}}></div> <span className='birthday'>{biographyObj.birthday}</span>
                  </>
                }
              </div>
              {
                biographyObj.description ? <>
                    {(biographyObj.description >= 854) ? <>
                      <p className="biography-desc">
                        {biographyObj.description.slice(0, 854)}...
                      </p>
                      <button onClick={e => showModal(e.target)} className="read-more">Читать далее...</button>
                    </> : <p className="biography-desc">
                      {biographyObj.description}
                    </p>}
                </> : <p className='no-desc'>Нет описании</p>
              }
            </div>
          </div>
          <div className="tvorshectvo-block">
            <div className="tvorshectvo-block_title">Проекты</div>
            <div className="tvorshectvo-lists">
              {
                writerProjects.length ? writerProjects.map(obj => {
                  return <TvorshectvoCard key={obj.id} obj={obj} />
                }) : <>
                  <h2 className='empty-projects'>Проекты отсуствуют</h2>
                </>
              }
            </div>
          </div>
        </div>
      </div>
      {modal && <Modal setModal={setModal} >
        <p className='modal_read-more'>{text}</p>
      </Modal>}
    </>
  );
};

export default Biography;