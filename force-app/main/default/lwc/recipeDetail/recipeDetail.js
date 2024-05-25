import { LightningElement,wire ,track } from 'lwc';
import CreateRecipe from '@salesforce/apex/CreateRecipe.recipeInput';
// importing message service
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import RECIPE_CHANNEL from '@salesforce/messageChannel/recipeChannel__c';

export default class RecipeDetail extends LightningElement{

    RECIPENAME;
    RECIPEURL;
    subscription = null;
    loadComponent = false;
    clickedRecipeDetails = {};
    @wire(MessageContext)
    messageContext;
    // subscribing to meessage channel

    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

     // Handler for message received by component
     handleMessage(message) {
     let recipeId = message.recipeId;
     let recipeId1 = recipeId.substring(recipeId.lastIndexOf("_") + 1);
     console.log(recipeId1); 
     // logging that details
     this.fetchRecipeDetail(recipeId1);   
    }

    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                RECIPE_CHANNEL,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    
    async fetchRecipeDetail(recipeId1){
       let url =  `https://api.edamam.com/api/recipes/v2/${recipeId1}?app_id=1d6f0f8c&app_key=2318296c96125fe736fe16b9d9e372e6&type=public`
        const res = await fetch(url);
        const data  = await res.json();
        console.log('Recipe Detail 2 : -> ',data);
        this.loadComponent = true;
        this.clickedRecipeDetails = data;
        
    }

    handleFavoriteClick(event)
    {

        this.RECIPENAME = clickedRecipeDetails.recipe.label
        this.RECIPEURL =  clickedRecipeDetails.recipe.url;
        CreateRecipe(
            recipeNames = this.RECIPENAME ,
            recipeUrls = this.RECIPEURL 
        );
    }
    
 
}