import React from 'react'
// import { Footer } from './footer'
import { Header } from './Header'

export const Layout = ({ children }: React.PropsWithChildren<{}>) => (
  <>
    <Header />
    <main>{children}</main>
    {/* <Footer /> */}
  </>
)
