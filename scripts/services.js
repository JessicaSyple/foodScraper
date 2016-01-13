/**
 * Created by jessicateh on 13/01/2016.
 */
angular.module('app')

    .factory('recipeAPI', ['$http', function($http){

        function callApi(pageNo){

            var req =
            {
                method: 'GET',
                url: 'http://www.recipepuppy.com/api/?p=' + pageNo

            };



            return $http(req);
        }

        return {
            getIngredients : callApi
        }
    }]);