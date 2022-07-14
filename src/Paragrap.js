import React, {useContext} from 'react'
import {ThemeContext} from './learn'

const Paragrap = () => {
    const theme = useContext(ThemeContext)

  return (
    <p className={theme}> Paragrap</p>
  )
}

export default Paragrap