/**
 * Created by jessicateh on 13/01/2016.
 */
angular.module('app')

    .controller('ResultsCtrl', function($scope, recipeAPI){

        var page = 1;
        $scope.uniqueIngredients = {};
        $scope.recipes = [];


        //unique function
        function checkUnique(ingredient){
            return !$scope.uniqueIngredients[ingredient];
        }

        //make function
        function getIngredients(data) {
            //loop through result recipes
            for (var i = 0; i < data.length; i++) {

                //split ingredients by comma
                var tempArr = data[i].ingredients.split(',');

                //trim whitespace around text
                tempArr = tempArr.map(function (e) {
                    return e.trim();
                });

                //loop through this page's ingredients
                for (var j = 0; j < tempArr.length; j++) {
                    //check uniqueness
                    //if unique, push to ingredients array
                    if (checkUnique(tempArr[j])) {
                        $scope.uniqueIngredients[tempArr[j]] = true;
                    }
                }
            }
        }

        function readRecipes() {
            recipeAPI.getIngredients(page)
                .success(function (data) {
                    data = data.results;

                    $scope.recipes = $scope.recipes.concat(data);

                    console.log($scope.recipes)
                    //console.log(page, data);
                    if (data.length != 0) {
                        getIngredients(data);
                        page++;
                        //readRecipes();
                    }
                    else {
                        console.log('empty page', data);
                        console.log(JSON.stringify($scope.uniqueIngredients))
                    }
                })
                .error(function (e, status) {
                    console.log('service', e, status);
                })
        }

        readRecipes()


    });