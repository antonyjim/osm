import React, { Component, useState, ChangeEvent } from 'react'
import './App.css'
// import 'dragula/dist/dragula.min.css'
import FieldOptions from './designer/FieldOptions'

function App() {
  return (
    <div className='container'>
      <div className='App'>
        <FieldOptions />
        <div className='form-mod-right' />
        <div className='form-preview' />
      </div>
    </div>
  )
}

export default App
