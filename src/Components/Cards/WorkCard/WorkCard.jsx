import React from 'react'
import './WorkCard.scss'
import WorkImg from "../../../img/work-img.png";
import emptyPhoto from '../../../img/other/empty.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Auth } from '../../../Context/Context';

export const WorkCard = ({obj, deleteCard}) => {
  const {isAuth} = React.useContext(Auth)
  const [author, setAuthor] = React.useState({})
  
  React.useEffect(() => {
    axios.get(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/writers.json`)
      .then(d => {
        setAuthorFunction(d.data);
      })
  }, [])

  function setAuthorFunction(writers) {
    for (const key in writers) {
      if (writers[key].projects) {
        if (writers[key].projects.includes(obj.id)) {
          setAuthor(writers[key])
        }
      }
    }
  }
  
  return (
    <div className='work-card'>
      <Link to={`/project-info/${obj.id}`}>
      <div className="work-card__img">
        <img src={obj.imagePath ? obj.imagePath : emptyPhoto} alt="work-img" />
      </div>
      <div className="work-card__content">
        <h4 className="work-card__title">{obj.name}</h4>
        {
          (obj.description.length > 333) ? <p className="work-card__text">
            {obj.description.slice(0, 330).trim()}...
            <span className="work-card__reading">
              <Link to='/'>Читать далее</Link>
            </span>
          </p> : <p className="work-card__text">
            {obj.description}
          </p>
        }
        <p className='author'>Автор: <span>{author.name ? `${author.surname} ${author.name} ${author.fathername}` : 'Не указан'}</span></p>
      </div>
      </Link>
      {
        isAuth && <>
          <Link to={`/settings-project/${obj.id}`} className='edit' >Редактировать</Link>
          <button onClick={deleteCard} className='delete_btn'>Удалить</button>
        </>
      }
    </div>
  )
}

export default WorkCard