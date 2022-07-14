import React, { useState, createContext } from 'react';
import Content from './Content';
import './App.css'

export const ThemeContext = createContext();

function Exam() {
    const [theme,setTheme] = useState('dark')

    const toggleTheme = ()=>{
        setTheme(theme === 'dark'?'light':'dark')
    }
    return (
        <ThemeContext.Provider value={theme}>
        <div >
            <button onClick={toggleTheme}>ẤN</button>
            <Content />
        </div>
        </ThemeContext.Provider>
    )
}
export default Exam