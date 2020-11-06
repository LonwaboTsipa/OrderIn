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
    this.keyword.value = "";

  }

  handleOrder(e,menuItem){
    if(e.target.checked){
      this.props.ResturantStore.addOrder(menuItem)
    }else{
      this.props.ResturantStore.removeOrder(menuItem.Id)
    }
  }

  handlePlaceOrder(){
    this.props.ResturantStore.sendOrderToChef()
  }

  sortList(list){
    const sorted = list.slice().sort((a, b) => a.Rank - b.Rank);
    return sorted;
  }

  sortListbyMenuItems(list){
    const sorted = list.slice().sort((a, b) => b.MenuItems.length - a.MenuItems.length);
    return sorted;
  }
  render(){

    var cityValue = this.props.ResturantStore.filteredResturantsByTerm.length > 0 ? this.props.ResturantStore.filteredResturantsByTerm[0].City : null
    var keywordValue = this.props.ResturantStore.filteredResturantsByTerm.length > 0 ? this.props.ResturantStore.filteredResturantsByTerm[0].searchWord : null
    let filteredList = this.props.ResturantStore.filteredResturantsByTerm;
    
    filteredList = filteredList.length > 0 ? this.sortListbyMenuItems(filteredList): filteredList;
    filteredList = filteredList.length > 0 ? this.sortList(filteredList) : filteredList;
    return (
      <div className="App">
        {(keywordValue !== null && cityValue !== null )
        && <h2>{keywordValue} resturants in { cityValue}</h2>}

        <form onSubmit={e => this.handleSearch(e)}>
          <input type="text" placeholder="Enter search keyword" ref={ input => this.keyword = input} /> 
          <button>Search</button>
        </form>

        <div className={"Resturant-container"}>
          {filteredList.length > 0 && filteredList.map((e,i) => 
            {

              if(e.Categories.length === 1){
                if(e.Categories[0].MenuItems.length === e.MenuItems.length){


                  return <div key={i} className={"Resturant-header"}>
                              <div className={"Resturant-Description"}>{e.Name} {e.Suburb} {e.Rank}</div>
                              <div className={"Category-header"}>{e.Categories[0].Name}</div>
                              {
                                e.Categories.map((cat) => {
                                return cat.MenuItems.map((men) => {

                                  return <div key={men.Id}><input type="checkbox" value={men} onClick={(e) => this.handleOrder(e,men)}/> {men.Name} - {men.Price}</div>
                                  })
                                  
                                })
                              }
                          </div>
                }
              }else{
                return <div key={i} className={"Resturant-header"}>
                          <div className={"Resturant-Description"}>{e.Name} {e.Suburb} {e.Rank}</div>
                          {
                            e.MenuItems.map((men) => {
                                return <div key={men.Id}><input type="checkbox" value={men} onClick={(e) => this.handleOrder(e,men)}/> {men.Name} - {men.Price}</div> 
                              })
                          }
                      </div>
              }
              
            })}
        </div>

        <div>
          {
          this.props.ResturantStore.getSuccessMessage !== null &&
          <div>{this.props.ResturantStore.getSuccessMessage}</div>
          }
        </div>

        <div>
          {this.props.ResturantStore.orderSum > 0 && <button onClick={() => this.props.ResturantStore.sendOrderToChef()}>Order {this.props.ResturantStore.orderSum}</button>}
        </div>
      </div>
    );
  }
}

export default App;
