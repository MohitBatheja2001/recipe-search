public with sharing class CreateRecipe {

    @AuraEnabled
    public static void recipeInput(List<String> recipeNames, List<String> recipeUrls) {
        List<Recipes__c> recipesToInsert = new List<Recipes__c>();
        
        for(Integer i = 0; i < recipeNames.size(); i++) {
            Recipes__c rc = new Recipes__c();
            rc.Name = recipeNames[i];
            rc.Recipe_Url__c = recipeUrls[i];
            recipesToInsert.add(rc);
        }
        
        if(!recipesToInsert.isEmpty()) {
            insert recipesToInsert;
        }
    }

}