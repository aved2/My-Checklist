import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import {useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()
    return (
    <header className = "title">
        <h1>{title}</h1>
        {location.pathname === '/' && (<Button 
        color= {showAdd ? 'coral' : 'steelblue'} 
        text = {showAdd ? 'Close' : 'Add'} 
        textColor = "white" 
        onClick = {onAdd}/>
        )}
    </header>
  )
}

Header.defailtProps = {
    title: 'My Checklist',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
