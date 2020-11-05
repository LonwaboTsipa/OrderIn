import './App.css';
import React, {Component}from 'react';
import { inject, observer } from 'mobx-react';

@inject('ResturantStore')
@observer
class App extends Component {

  componentDidMount(){
    this.props.ResturantStore.loadResturantData();
  }

  handleSearch = (val) => {
    val.preventDefault();
    const keyword = this.keyword.value;
    this.props.ResturantStore.filterResturants(keyword);

  }
  render(){

    return (
      <div className="App">
        <h2>You have { this.props.ResturantStore.filteredResturants}</h2>

        <form onSubmit={e => this.handleSearch(e)}>
          <input type="text" placeholder="Enter search keyword" ref={ input => this.keyword = input} /> 
          <button>Search</button>
        </form>

        <ul>
          {this.props.ResturantStore.resturants.map((e,i) => 
            {
            return <li key={i}>{e.Name}</li>
            })}
        </ul>
      </div>
    );
  }
}

export default App;
