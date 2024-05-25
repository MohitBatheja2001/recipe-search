import { LightningElement, wire } from 'lwc';
import RECIPE_SEARCH_CHANNEL from '@salesforce/messageChannel/searchRecipeChannel__c';
import { subscribe,MessageContext,APPLICATION_SCOPE } from 'lightning/messageService';
export default class RecipeResult extends LightningElement {
 
     @wire(MessageContext) messageContext;

     subscription = null;
     searchedRecipe;
     

     subscribeToMessageChannel()
     {

        if(!this.subscription)
        {
            this.subscription = subscribe(this.messageContext , 
                                          RECIPE_SEARCH_CHANNEL ,
                                          (message)=>{this.handleMessage(message)},
                                          {Scope : APPLICATION_SCOPE} );
        }

     }

     connectedCallback()
     {
        this.subscribeToMessageChannel();
     }

     handleMessage(message) 
     {
        let recipeId = message.recipeId;
        console.log( 'SEARCHED IDS',recipeId);
        // declaring recipeId to the property so that we can display the content on HTML
        this.searchedRecipe = recipeId;

     }
     

}