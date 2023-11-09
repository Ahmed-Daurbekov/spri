import React from 'react'
import ProjectCard from '../Cards/ProjectCard/ProjectCard'
import './AboutProjects.scss'

export const AboutProjects = () => {
  return (
    <div className='about-projects container'>
      <h2 className='about-projects__title'>Проекты</h2>
      <div className="about-projects__items">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  )
}

export default AboutProjects