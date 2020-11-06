import { observable, action ,computed, runInAction } from 'mobx';

class ResturantStore {
    @observable resturants = observable.array();
    @observable currentSearchCity = observable.array();
    @observable filteredResturantsByTerm = observable.array();

    //used to change state
    @action filterResturants = (searchTerm) => {
        let rest = this.resturants;

        if(rest.length > 0)
        {
            let filteredByTown = rest.filter((res) => {
                    return searchTerm.toLowerCase().includes(res.City.toLowerCase());
            });

            if(filteredByTown.length > 0){
                //make these interfaces for clean code
                
                let searchWordref = this.removeUselessWords(searchTerm, filteredByTown[0].City);
                searchWordref = searchWordref.trim();

              //  let resturants = [];
                
                filteredByTown.forEach((res) => {
                    let resturant = {
                        Name:null,
                        Rank: 0,
                        Suburb: null,
                        City:filteredByTown[0].City,
                        searchWord: searchWordref,
                        MenuItems: [],
                        Categories: [],
                    };

                    if(res.Categories.length > 0){

                        res.Categories.forEach((cat) => {
                            if(cat.Name.toString().toLowerCase().includes(searchWordref)){
                                resturant.Categories.push(cat)
                            }

                            if(cat.MenuItems.length > 0){
                                
                                cat.MenuItems.forEach((men) => {
                                    if(men.Name.toString().toLowerCase().includes(searchWordref)){
                                       resturant.MenuItems.push(men)
                                    }
                                })
                            }
                        })
                    }

                    resturant.Name = res.Name;
                    resturant.Rank = res.Rank;
                    resturant.Suburb = res.Suburb;
                    
                    if(resturant.Categories.length > 0 || resturant.MenuItems.length > 0){
                        this.filteredResturantsByTerm.push(resturant)
                    }
                });
                console.log(this.filteredResturantsByTerm);


            }

            
            console.log('filteredByTown', filteredByTown);


        }
    }

    @action removeUselessWords = (txt, city) => {
        var uselessWordsArray = 
            [
              "a","in", "is", "of", "on", "or", "the", "to", "we", city
            ];

          var expStr = uselessWordsArray.join("|");
          return txt.replace(new RegExp('\\b(' + expStr + ')\\b', 'gi'), ' ')
                        .replace(/\s{2,}/g, ' ');
      }

      @action setSearchTown(city){
          this.currentSearchCity = city;
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

    @computed get getSearchCity(){
        //console.log('filtered', this.resturants);
        return this.currentSearchCity;
    }
}

const store = new ResturantStore();
export default store;
