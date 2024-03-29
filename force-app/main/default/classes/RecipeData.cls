public with sharing class RecipeData {
    @AuraEnabled(cacheable=true)

    public static List<Recipes__c> allRecipes(String strName){
    String strnameLike = '%'+strName+'%';

    return[Select Id,Name,Making_Process__c, Item_Image__c FROM Recipes__C WHERE Name LIKE:strnameLike];
    }

    @AuraEnabled(cacheable=true)
    public static List<Recipes__c> RecipesList(){
      return [Select Id,Name, Calories__c, Recipe_Type__c, Servings__c From Recipes__c Where Status__c = 'Approved'];
    }

    @AuraEnabled(cacheable = true)
    public static List<Recipes__c> caloriesList(Integer calories){

    String query = 'SELECT Id, Name, Image__c,Calories__c FROM Recipes__c WHERE Calories__c <= :calories Limit 10';
    return Database.query(query);
    }

    

  }

  