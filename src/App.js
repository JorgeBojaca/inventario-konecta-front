import React from 'react';
import ProductoForm from './ProductoForm';
import ProductosIndex from './ProductosIndex';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Container } from 'semantic-ui-react'


function App() {
  return (
    <div>
      <Container>
      <Router>
      <div>

        <Switch>
          <Route path="/create">
            <ProductoForm action="create" />
          </Route>
          <Route path="/edit/:id">
            <ProductoForm action="update"/>
          </Route>
          <Route path="/">
            <ProductosIndex />
          </Route>
        </Switch>
      </div>
    </Router>
    </Container>
    </div>
  );
}

export default App;
