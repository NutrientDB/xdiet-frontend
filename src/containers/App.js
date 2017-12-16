import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Products from './Products'
import './App.scss';

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/product/1">Product</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/products" component={Products} />
    </main>
  </div>
)

export default App;
