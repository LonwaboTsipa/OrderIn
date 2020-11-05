import { observable, action ,computed, runInAction } from 'mobx';

class ResturantStore {
    @observable resturants = observable.array();

    //used to change state
    @action filterResturants = (searchTerm) => {
        
        //this.resturants.push(searchTerm);
        //console.log(searchTerm);
    }

    @action loadResturantData = async () => {
        const response = await fetch('http://localhost:55398/api/resturants/GetResturantsData');
         
        const data = await response.json();
       Object.keys(data).forEach((key) => {
           this.resturants.push(data[key])
       });      
    }
    
    //used for calculations
    @computed get filteredResturants(){
        //console.log('filtered', this.resturants);
        return this.resturants;
    }
}

const store = new ResturantStore();
export default store;
