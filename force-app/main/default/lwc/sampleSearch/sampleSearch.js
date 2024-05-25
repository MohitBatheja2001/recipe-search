import { LightningElement ,api, track } from 'lwc';
const DELAY = 300;
export default class SampleSearch extends LightningElement {
    SelectedType = 'None';
    loading = false; 
    SelectedSearch = ''; 
    delayTimeout ; 
    @api SearchResult = []; 
    CurrentSelectedRecipe = '';   

       get typeoptions() {
        return [
            {label:'None', value:'--'},
            { label: 'American', value: 'American' },
            { label: 'Asian', value: 'Asian' },
            { label: 'British', value: 'British' },
            { label: 'Chinese', value: 'Chinese' },
            { label: 'Indian', value: 'Indian' },
            { label: 'Mediterranean', value: 'Mediterranean' },
            { label: 'Mexican', value: 'Mexican' },
            { label: 'South American', value: 'South American' },
            { label: 'Japanese', value: 'Japanese' },
            { label: 'Nordic', value: 'Nordic' }
        ];
   } 

    handleChange(event) {
        // Destructing the values of selected Values;
        let{ name, value} = event.target;
        this.loading = true;
        console.log("name details" , name , "value details", value);
        if(name === 'Cuisine Type'){
          this.SelectedType = value;
        }
        else if(name === 'search'){
            this.SelectedSearch = value;
       }
       // deboucing of methods, it means that to delay the response of method for some time;
       clearTimeout(this.delayTimeout);
       this.delayTimeout = setTimeout(()=>{
        this.searchRecipe();
       }, DELAY)
        
    }

    //this Method will search for recipes;
    async searchRecipe(){
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${this.SelectedSearch}&cuisineType=${this.SelectedType}&app_id=1d6f0f8c&app_key=2318296c96125fe736fe16b9d9e372e6`;
      const res = await fetch(url);
      //fetch() Method always returs the another promise , we can handle it in JSON form as shows below;
      const data = await res.json();      
      console.log("Recipe Search output =>", data);
      this.loading = false;

      if(data){
        this.SearchResult = data.hits;
        console.log("SearchResult" , this.SearchResult);
      }
    }

}