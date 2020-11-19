import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import Home from "./pages/home";
import Header from "./components/header";
import Footer from "./components/footer";

//lazy loaded pages and components
const Code = React.lazy(() => import('./pages/code'));
const Photo = React.lazy(() => import('./pages/photo'));

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Suspense fallback={<div>Loading Code...</div>}>
          {/* Routes for CODE part of site */}
          <Route path="/code" component={Code} />


          {/* Routes for PHOTO part of site */}
          <Route path="/photo" component={Photo} />
        </Suspense>
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
