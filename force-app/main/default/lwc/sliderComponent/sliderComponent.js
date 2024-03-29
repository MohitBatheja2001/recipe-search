import { LightningElement ,track,api } from 'lwc';
import caloriesList from '@salesforce/apex/RecipeData.caloriesList';
export default class SliderComponent extends LightningElement {
    @track Crecipes;
    @track error;
   // @api SelectedValue ='';

    connectedCallback(){
    this.LoadRecipes();
    }

    minCalories = 0;
    maxCalories = 1000;

 /*   handleMinChange(event) {
        this.minCalories = event.target.value;
        this.showRecipes();
    }

    handleMaxChange(event) {
        this.maxCalories = event.target.value;
        this.showRecipes();
    }
    */

    LoadRecipes(){
    caloriesList({calories: this.SelectedValue})
    .then(result=>{
        this.Crecipes = result;
        this.error=undefined;
        console.log('Result'+ this.Crecipes.data);

    })
    .catch(error=>{
        this.error=error;
        this.result=undefined;
    })
    }
    ShowRecipes(event){
        this.minCalories = event.target.value;
        this.maxCalories = event.target.value;
        this.LoadRecipes();
}
}