/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {cleanup } from '@testing-library/react'
//import "jest-dom/extend-expect";

// eslint-disable-next-line no-undef
afterEach(cleanup)
it ("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<App></App>,div)
})