import React from 'react';
import pero from '../../../img/other/pero.jpg'
// import  from '../../../img/other/pero.jpg'
import './Premie.scss'
import PremieCard from './PremieCard/PremieCard';
import { Link } from 'react-router-dom';
import { Auth } from '../../../Context/Context';
import axios from 'axios';

const Premie = () => {
  const {isAuth} = React.useContext(Auth)
  const [premieList, setPremieList] = React.useState([])
  
  React.useEffect(() => {
    axios.get(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/premie.json`)
      .then(d => {
        console.log(d.data);
        setPremieList(addDataToState(d.data))
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

  function deleteCard(id) {
    let confirm = window.confirm('Вы уверены что хотите удалить проект')
    if (confirm) {
        axios.delete(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/writers/${id}.json`)
          .then(d => {
              alert('Писатель удален')
              setPremieList(premieList.filter((item) => {
                return item.id != id
              }))
          })
    }
  }
  
  return (
    <div className='premie'>
      <div className="container">
        <h2 className="premie_title">Премии и награды</h2>
        <div className="premie-blocks">
          {
            premieList.slice(0, 3).map(obj => {
              return <PremieCard key={obj.id} obj={obj} />
            })
          }
        </div>
        {
          isAuth && <div className="add-new-writter">
            <Link to='/addNewPremie' className="add-new-writter_btn">Добавить награду</Link>
          </div>
        }
      </div>
    </div>
  );
};

export default Premie;