import './App.css';
import React, {Component}from 'react';
import { inject, observer } from 'mobx-react';

@inject('ResturantStore')
@observer
class App extends Component {

  handleSearch = (val) => {
    val.preventDefault();
    const keyword = this.keyword.value;
//console.log(keyword)
    this.props.ResturantStore.filterResturants(keyword);

  }
  render(){
   // const { ResturantStore } = this.props;

    return (
      <div className="App">
        <h2>You have { this.props.ResturantStore.filteredResturants}</h2>

        <form onSubmit={e => this.handleSearch(e)}>
          <input type="text" placeholder="Enter search keyword" ref={ input => this.keyword = input} /> 
          <button>Search</button>
        </form>
      </div>
    );
  }
}

export default App;
