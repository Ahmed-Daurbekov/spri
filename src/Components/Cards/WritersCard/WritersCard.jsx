import React from 'react'
import './WritersCard.scss'
import emptyPhoto from '../../../img/other/empty.jpg';
import { Link } from 'react-router-dom';
import { Auth } from '../../../Context/Context';

export const WritersCard = ({obj, deleteCard}) => {
    const {isAuth} = React.useContext(Auth)

    return (
        <div className='writers-card'>
            <Link to={`biography/${obj.id}`}>
                <div className="writers-card_img">
                    <img src={obj.imagePath ? obj.imagePath : emptyPhoto} alt="img" />
                </div>
                <div className="writers-card_content">
                    <div className="live">
                        {
                            obj.deathday ? <>
                                <span className='birthday'>{obj.birthday}</span> &mdash;
                                <span className='deathday'>{obj.deathday}</span>
                            </> : <>
                                Родился <div style={{marginLeft: '5px'}}></div> <span className='birthday'>{obj.birthday}</span>
                            </>
                        }
                    </div>
                    <h4 className="writers-card_title">{obj.surname} {obj.name} {obj.fathername}</h4>
                    {
                        obj.description ? <>
                            {(obj.description.length > 55) ? <p className="writers-card_text">
                                {obj.description.slice(0, 55)}...
                                <span><Link to='/writer/1'></Link>Читать далее</span>
                            </p> : <p className="writers-card_text">
                                {obj.description}
                            </p>}
                        </> : <p className='no-desc'>Нет описании</p>
                    }
                </div>
            </Link>
            {
                isAuth && <>
                    <Link to={`/settings/${obj.id}`} className='edit'>Редактировать</Link>
                    <button onClick={deleteCard} className='delete_btn'>Удалить</button>
                </>
            }
        </div>
    )
}

export default WritersCard