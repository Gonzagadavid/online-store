import React from 'react';
import './App.css';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

function App() {
  getCategories().then((result) => console.log(result));
  getProductsFromCategoryAndQuery().then((result) => console.log(result));
  return (
    <div className="App">
      <header className="App-header">
        <p>Iniciando o projeto!!! </p>
      </header>
    </div>
  );
}

export default App;
