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

    var cityValue = this.props.ResturantStore.currentSearchCity.length > 0 ? this.props.ResturantStore.currentSearchCity : ''
    return (
      <div className="App">
        <h2>You have { cityValue}</h2>

        <form onSubmit={e => this.handleSearch(e)}>
          <input type="text" placeholder="Enter search keyword" ref={ input => this.keyword = input} /> 
          <button>Search</button>
        </form>

        <div className={"Resturant-container"}>
          {this.props.ResturantStore.filteredResturantsByTerm.map((e,i) => 
            {

              if(e.Categories.length === 1){
                if(e.Categories[0].MenuItems.length === e.MenuItems.length){


                  return <div key={i} className={"Resturant-header"}>
                              <div>{e.Name} {e.Suburb} {e.Rank}</div>
                              <div>{e.Categories[0]}</div>
                              {
                                e.Categories.map((cat) => {
                                return cat.MenuItems.map((men) => {

                                  return <div key={men.Id}><input type="checkbox" /> {men.Name} - {men.Price}</div>
                                  })
                                  
                                })
                              }
                          </div>
                }
              }else{
                return <div key={i} className={"Resturant-header"}>
                          <div>{e.Name} {e.Suburb} {e.Rank}</div>
                      </div>
              }
              
            })}
        </div>
      </div>
    );
  }
}

export default App;
