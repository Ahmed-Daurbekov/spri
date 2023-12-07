import React from 'react';
import './ShowPremies.scss'
import axios from 'axios';
import PremieCard from '../PremieCard/PremieCard';
import { useNavigate } from 'react-router-dom';

const ShowPremies = () => {
  const [premeData, setPremieData] = React.useState([])
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/premie.json`)
      .then(d => {
        setPremieData(addDataToState(d.data))
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
    <div className='showPremies'>
      <button onClick={() => {
        navigate(-1)
      }} className='go-back'>Назад</button>
      <div className="container">
        <div className="cards">
          {
            premeData.map(obj => {
              return <PremieCard key={obj.id} obj={obj} />
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ShowPremies;