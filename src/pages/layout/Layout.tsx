import React from 'react'

import styles from './Layout.module.css'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>{<Outlet />}</div>
  )
}

export default Layout