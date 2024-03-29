import { LightningElement, track,wire } from 'lwc';
import RecipesList from '@salesforce/apex/RecipeData.RecipesList';
export default class RecipeDataTable extends LightningElement {

    @track Recipes;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;
    sortBy(field, reverse, primer) {
      const key = primer
          ? function (x) {
                return primer(x[field]);
            }
          : function (x) {
                return x[field];
            };

      return function (a, b) {
          a = key(a);
          b = key(b);
          return reverse * ((a > b) - (b > a));
      };
    }

   /*  sortBy(field, reverse, primer) {
      const key = primer
          ? function (x) {
                return primer(x[field]);
            }
          : function (x) {
                return x[field];
            };

      return function (a, b) {
          a = key(a);
          b = key(b);
          return reverse * ((a > b) - (b > a));
      };
    } */

    handleSort(event) {
      const { fieldName: sortedBy, sortDirection } = event.detail;
      const cloneData = [...this.Recipes];

      cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
      this.Recipes = cloneData;
      this.sortDirection = sortDirection;
      this.sortedBy = sortedBy;
  }

    @wire(RecipesList) CurrentRecipes({data,error}){
      if(data){
         this.Recipes=data;
         console.log(data); 
      }
      else if(error){
        this.error=error;

      }
    }

    @track col= [
        {label:'Type',fieldName:'Recipe_Type__c', sortable: true},
        {label:'Recipe Name', fieldName:'Name' ,sortable: true},
        {label:'Calories', fieldName:'Calories__c' ,sortable: true},
        {label:'Servings', fieldName:'Servings__c', sortable: true}
    ];

}