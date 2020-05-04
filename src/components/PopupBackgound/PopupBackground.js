import React from 'react';
import './PopupBackground.scss'


export const PopupBackground = ({children}) => {
 return (
  <div className='fade-background'>
      {children}
  </div>
 );
};