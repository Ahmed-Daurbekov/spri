import React from 'react';
import './ProjectInfo.scss'
import empty from '../../img/other/empty.jpg'
import Modal from '../Modal/Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectInfo = () => {
  const [modal, setModal] = React.useState(false)
  const [text, setText] = React.useState('')
  const [projectObj, setProjectObj] = React.useState({})
  let {id} = useParams()

  React.useEffect(() => {
    axios.get(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/works/${id}.json`)
      .then(d => {
        setProjectObj(d.data)
      })
  }, [])

  function showModal(txt) {
    setText(txt.previousSibling.textContent)
    setModal(true)
  }

  return (
    <>
      <div className='biography'>
        <div className="container">
          <div className="biography-block">
            <div className="biography-block_img">
              <img src={projectObj.imagePath ? projectObj.imagePath : empty} alt="" />
            </div>
            <div className="biography-block_text">
              <h3 className="biography-title">{projectObj.name}</h3>
              {
                projectObj.description ? <>
                    {(projectObj.description >= 854) ? <>
                      <p className="biography-desc">
                        {projectObj.description.slice(0, 854)}...
                      </p>
                      <button onClick={e => showModal(e.target)} className="read-more">Читать далее...</button>
                    </> : <p className="biography-desc">
                      {projectObj.description}
                    </p>}
                </> : <p className='no-desc'>Нет описании</p>
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

export default ProjectInfo;