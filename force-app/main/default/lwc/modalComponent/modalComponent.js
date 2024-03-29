import { LightningElement, track,api } from 'lwc';
import allRecipes from '@salesforce/apex/RecipeData.allRecipes';
export default class ModalComponent extends LightningElement {

    @track Recipes;
    @track error;
    @api recordId;
    showModal = false;


    handleSearch(event){
        const searchedData = event.target.value;
        allRecipes({strName : searchedData})
        .then(result=>{
            this.Recipes =result;
            this.error = undefined;
            console.log('Recipe Data =' + result);
        })
        .catch(error=>{
            this.error=error;
            this.Recipes= undefined;
        })
    }
    showRecipeDetail(event){
        this.showModal=true;
        this.recordId = event.target.dataset.recordId;
    }


    closeModal(event){
        this.showModal = false;
     }
     handlecancel(event){
        this.showModal= false;
     }
     handleSucess(event){
        this.showModal = false;
     }

}