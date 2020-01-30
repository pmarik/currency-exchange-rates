import React, { Component } from 'react';
import axios from 'axios';
import CardList from './components/card-list/Card-List.component';
import { SearchBox } from './components/search-box/Search-Box.component';
import './App.css';

class App extends Component { 
  constructor(){
    super();

    this.state = {
      currencies: [],
      searchField: ''
    }
  }

  componentDidMount() {
    // fetch('https://api.exchangeratesapi.io/latest?base=USD')
    //   .then(res => res.json()
    //   .then(users => console.log(users)))

    axios.get('https://api.exchangeratesapi.io/latest?base=USD').then(res => {
      const ratesArray = [];
      let idPlaceholder = 0;

      for (let [key, value] of Object.entries(res.data.rates)) {

        let currencyObj = {
          "id": idPlaceholder,
          "name": key,
          "rate": value
        }
        ratesArray.push(currencyObj);
        idPlaceholder++;
      }

      this.setState({ currencies: ratesArray});
    })
  }

  handleChange = (e) =>{
   this.setState({ searchField: e.target.value }, () =>{
   })
  }

  render(){
    const { currencies, searchField } = this.state;
    const filteredCurrencies = currencies.filter(currency => {
      return currency.name.toLowerCase().includes(searchField.toLowerCase())
     } );  

    return (
      <div className="App">
        <h1> Exchange Rates </h1>
        <SearchBox 
          placeholder='search currencies'
          handleChange={this.handleChange}
        />
        <CardList currencies={filteredCurrencies} />
      </div>
    );
  }
}

export default App;
