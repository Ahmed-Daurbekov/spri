import React from 'react'
import './ProjectCard.scss'
import ProjectImg from "../../../img/project-img.png";

export const ProjectCard = () => {
    return (
        <div className='project-card'>
            <div className="project-card__img">
                <img src={ProjectImg} alt="img" />
            </div>
            <div className="project-card__content">
                <h4 className="project-card__title">Совещания в регионах</h4>
                <p className="project-card__text">Организация и поддержка региональных молодежных совещаний <span><a href='/'>Читать еще...</a></span></p>
                <span className="project-card__date">Дата: 10. 02. 2023</span>
            </div>
        </div>
    )
}

export default ProjectCard