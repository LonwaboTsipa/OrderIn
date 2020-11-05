import { observable, action ,computed } from 'mobx';

class ResturantStore {
    @observable resturants = observable.array();

    //used to change state
    @action filterResturants = (searchTerm) => {
        console.log(searchTerm)
        this.resturants.push(searchTerm);
        console.log(this.resturants)
    }
    
    //used for calculations
    @computed get filteredResturants(){
        
        return this.resturants.length;
    }
}

const store = new ResturantStore();
export default store;
