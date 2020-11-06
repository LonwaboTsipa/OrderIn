import { observable, action ,computed, runInAction } from 'mobx';

class ResturantStore {
    @observable resturants = observable.array();
    @observable currentSearchCity = observable.array();
    @observable filteredResturantsByTerm = observable.array();
    @observable currentOrder = observable.array();
    @observable successMessage = observable.array();

    @action clearFilter = () => {
        this.filteredResturantsByTerm.splice(0,this.filteredResturantsByTerm.length);
    }

    @action clearOrder = () => {
        this.currentOrder.splice(0,this.currentOrder.length);
    }

    @action addOrder = (order) => {
        this.currentOrder.push(order);

    }

    @action removeOrder = (id) => {
        let index = this.currentOrder.map(x => {
            return x.Id;
          }).indexOf(id);
          this.currentOrder.splice(index, 1);
    }

    @computed get orderSum(){
        if(this.currentOrder.length > 0){
            const sum = this.currentOrder.reduce((a, {Price}) => a + Price, 0);
            return sum;
        }
        return 0;
    }

    @action sendOrderToChef = () => {
        fetch('http://localhost:55398/api/resturants/PostOrder', {
        method: 'POST',
        body: JSON.stringify(this.currentOrder),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(response => response.json())
    .then(json => {
        console.log('successeee',json);

        if(json === "success"){
            this.clearFilter();
            this.clearOrder();
            this.addSuccessfulOrder("Successfully placed order");
        }
    });
    }
    @action addSuccessfulOrder = (msg) => {
        this.successMessage.push(msg)
    }
    
    @action removeSuccessfulOrder = () => {
        this.successMessage.splice(0,this.successMessage.length);
    }
    //used to change state
    @action filterResturants = (searchTerm) => {
        let rest = this.resturants;

        if(rest.length > 0)
        {

            this.removeSuccessfulOrder()
            let filteredByTown = rest.filter((res) => {
                    return searchTerm.toLowerCase().includes(res.City.toLowerCase());
            });

            if(this.filteredResturantsByTerm.length > 0){
                this.clearFilter();
            }

            if(filteredByTown.length > 0){
                let searchWordref = this.removeUselessWords(searchTerm, filteredByTown[0].City);
                searchWordref = searchWordref.trim();
                
                filteredByTown.forEach((res) => {
                    let resturant = {
                        Name:null,
                        Rank: 0,
                        Suburb: null,
                        City:filteredByTown[0].City,
                        searchWord: this.firstLetter(searchWordref),
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
            }
        }
    }

    firstLetter = (word) => {
        return word.replace(/^.{1}/g, word[0].toUpperCase());
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

      @computed get getSuccessMessage(){
          if(this.successMessage.length > 0){
            return this.successMessage[0];
          }else{
            return null;
          }
          
      }

    @action loadResturantData = async () => {
        const response = await fetch('http://localhost:55398/api/resturants/GetResturantsData');
         
        const data = await response.json();
       Object.keys(data).forEach((key) => {
           this.resturants.push(data[key])
       });      
    }
    
    @computed get filteredResturants(){
        return this.resturants;
    }

    @computed get getSearchCity(){
        return this.currentSearchCity;
    }
}

const store = new ResturantStore();
export default store;
