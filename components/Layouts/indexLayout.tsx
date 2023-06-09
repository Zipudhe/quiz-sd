import React, { FC, ReactNode } from 'react'

interface ILayout {
  children: ReactNode
}

export const Layout:FC<ILayout> = ({ children }) => (
  <main 
    style={
      {
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#050505',
      }
    } >
    { children }
  </main>
)

export default Layout