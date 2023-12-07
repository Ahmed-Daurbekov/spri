import React from 'react'
import WorkCard from '../Cards/WorkCard/WorkCard'
import './AboutWorks.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Auth } from '../../Context/Context'
import Loader from '../Loader/Loader'

export const AboutWorks = () => {
  const {isAuth} = React.useContext(Auth)
  const [filterWriters, setFilterWriters] = React.useState('')
  const [writersList, setWritersList] = React.useState([])
  const [loader, setLoader] = React.useState(true)
  
  React.useEffect(() => {
    axios.get(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/works.json`)
      .then(d => {
        setWritersList(addDataToState(d.data))
        setLoader(false)
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

  function searchWriters(e) {
    setFilterWriters(e.target.value);
  }
  let filteredItems = []
  name()
  function name() {
    if (writersList.length) {
      filteredItems = writersList.filter((item) =>
        item.name.toLowerCase().includes(filterWriters.toLowerCase())
      );
    }
  }

  function deleteCard(id) {
    let confirm = window.confirm('Вы уверены что хотите удалить проект')
    if (confirm) {
      axios.delete(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/works/${id}.json`)
        .then(d => {
          alert('Успешно удалено')
          setWritersList(filteredItems.filter((item) => {
            return item.id != id
          }))
        })
    }
  }
  
  return (
    <div className='about-works'>
      <div className="container">
        <div className='search-block'>
          <h2 className='about-works_title'>Творчество</h2>
          <div className="search">
            <input onChange={e => searchWriters(e)} type="text" className='search-loop' placeholder='Введит название' />
            <svg width="30" height="30" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.57609 14.1522C11.208 14.1522 14.1522 11.208 14.1522 7.57609C14.1522 3.94421 11.208 1 7.57609 1C3.94421 1 1 3.94421 1 7.57609C1 11.208 3.94421 14.1522 7.57609 14.1522Z" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.3696 18.3696L12 13" stroke="#292D32" strokeWidth="2.23735" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {
          isAuth && <div className="add-new-writter">
            <Link to='/addNewProject' className="add-new-writter_btn">Добавить новую произведению</Link>
          </div>
        }
        {
          loader ? <Loader /> : <>
            <div className="about-works_items">
              {
                filteredItems.reverse().map(obj => {
                  return <WorkCard deleteCard={() => deleteCard(obj.id)} key={obj.id} obj={obj} />
                })
              }
            </div>

            {
              filteredItems.length == 0 && <h2 className="writer-absent">
                Произведение отсутствует
              </h2>
            }
          </>
        }
      </div>
    </div>
  )
}

export default AboutWorks