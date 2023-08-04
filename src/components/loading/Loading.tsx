import React from 'react'

import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div data-testid="loading-component" className={styles.loader}></div>
  )
}

export default Loading