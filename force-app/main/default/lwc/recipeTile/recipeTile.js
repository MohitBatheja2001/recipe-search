import { LightningElement, api ,track } from 'lwc';

export default class RecipeTile extends LightningElement {

@api recipes;


@api selectedRecipeId;
handleClickrecipe(event){
    // console.log(this.recipes.recipe.label);
    console.log(this.recipes.recipe.uri);

     // creating custom Event for child to parent communication 
     // to show border  
     const evt = new CustomEvent('selectedrecipe',{
        detail : this.recipes.recipe.uri
     }); 
     // dispatch event
     this.dispatchEvent(evt);
}
 
get tileSelected(){
    return this.selectedRecipeId === this.recipes.recipe.uri 
    ? 'tile selected' 
    : 'tile' ;
}

}