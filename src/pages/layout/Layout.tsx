import React from 'react'

import styles from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Header from '../../components/header/Header'

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        {<Outlet />}
      </main>

    </div>
  )
}

export default Layout