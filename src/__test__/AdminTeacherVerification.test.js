/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import AdminVerify from '../container/AdminTeacherVerify';

it ("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<AdminVerify></AdminVerify>,div)
})
