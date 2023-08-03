import React from 'react'

import styles from './Header.module.css'
import Loading from '../loading/Loading'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'

const Header = () => {
    const { loading } = useSelector((state: RootState) => state.global);
    return (
        <header className={styles.header}>
            <Link className={styles.title} to="/"><h1>Podcaster</h1></Link>
            {loading && <Loading />}
        </header>
    )
}

export default Header