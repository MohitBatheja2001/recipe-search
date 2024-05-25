import { LightningElement,wire } from 'lwc';
import RECIPE_SEARCH_CHANNEL from '@salesforce/messageChannel/searchRecipeChannel__c';
import { publish, MessageContext } from 'lightning/messageService';
const DELAY = 300;
export default class RecipeSearchBar extends LightningElement {

    @wire(MessageContext) messageContext;


    SelectedType  = 'None';
    handleLoading = false;
    SelectedSearch = '';
    delayTimeout ; 
    //defining one property so that we can store the output coming for api call in an array of objects;   
    SearchResult= [];

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
    
    handleChange(event)
    {
       // Destructing the values of selected Values;
       let{name,value}= event.target;
       this.handleLoading = true;
       console.log('name Detail' , name , 'value details', value);
       
       if(name === 'Cuisine Type')
       {
         this.SelectedType = value;
       }
       else if(name === 'search')
       {
        this.SelectedSearch = value;
       }

       // deboucing of methods, it means that to delay the response of method for some time;
       clearTimeout(this.delayTimeout);
       this.delayTimeout = setTimeout(() => {
        this.searchRecipe();
       }, DELAY);
    }

    //this Method will search for recipes;
    async searchRecipe()
    {
        const URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${this.SelectedSearch}&cuisineType=${this.SelectedType}&app_id=1d6f0f8c&app_key=c86dda71478c27a83481295bc2f76d6d`;
        const res = await fetch(URL);
        //fetch() Method always returs the another promise , we can handle it in JSON form as shows below;
        const data = await res.json();
        console.log('Recipe Output  + >>>' , data);
        this.handleLoading = false;

        if(data)
        {
            this.SearchResult = data.hits;
            console.log('Searched Recipes +> ' , this.SearchResult);
        }

    }

    handleClick(event)
    {
        const Payload = {recipeId : this.SearchResult};
        publish(this.messageContext, RECIPE_SEARCH_CHANNEL , Payload);

    }
}