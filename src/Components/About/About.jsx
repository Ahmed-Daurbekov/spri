import React from 'react'
import './About.scss'
import WritersCard from '../Cards/WritersCard/WritersCard'
import WorkCard from '../Cards/WorkCard/WorkCard'
import Button from '../UI/Button/Button'
import { Link } from 'react-router-dom'

export const About = () => {
    return (
        <main className='about'>
            <div className="container">
                <h2 className='about_title'>О нас</h2>
                <section className="writers">
                    <h3 className="about_subtitle">Писатели</h3>
                    <div className="writers_items">
                        <WritersCard />
                        <WritersCard />
                        <WritersCard />
                    </div>
                    <div className='works_button about-button'>
                        <Link to='/writers' className='btn'>Смотреть еще</Link>
                    </div>
                </section>
                <section className="works">
                    <h3 className="about_subtitle">Творчество</h3>
                    <div className="works_items">
                        <WorkCard />
                        <WorkCard />
                        <WorkCard />
                        <WorkCard />
                    </div>
                    <div className='works_button about-button'>
                        <Link to='/writers-works' className='btn'>Смотреть еще</Link>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default About