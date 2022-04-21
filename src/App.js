import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

import {Home,AboutPage,ProductsPage,CartPage,SingleProductPage,Error,Checkout,PrivateRoute} from './pages'
function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/about'>
            <AboutPage />
          </Route>
          <Route exact path='/cart'>
            <CartPage />
          </Route>
          <Route exact path='/products'>
            <ProductsPage />
          </Route>
          <Route exact path='/products/:id' children={<SingleProductPage />} />
          <PrivateRoute exact path='/checkout'>
            <Checkout />
          </PrivateRoute>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      <Footer />
    </>
    
  )
  
  
}

export default App

