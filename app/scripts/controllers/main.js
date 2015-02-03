'use strict';

/**
 * @ngdoc function
 * @name forecastApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the forecastApp
 */
angular.module('forecastApp')
  .controller('MainCtrl', function ($scope, $http, _ , moment, $ ) {

  	$http.get('data.json').
	  success(function(data) {
	  	$scope.data = data;
	  	$scope.period= 	_.map(data.forecast_months_available, function(num){ return num + ' Months'; });
	  	$scope.selectedPeriod = $scope.period[0];
	  	$scope.growthTypes = _.map(data.growth_types_available, function(obj){ return obj.display_name; });
	  	$scope.selectedType = $scope.growthTypes[0];
	  	$scope.today = moment(data.current_date).format('MMM YYYY');
	  	$scope.periodicity = data.periodicity;
	  	$scope.graphData = data.inputs[0].graph;
	  	$scope.range = data.inputs[0].value;
      var originalData = $scope.graphData.values.prediction;
      var predictionData = originalData;
	  	console.log(data);

      $scope.onSlide = function(){
        predictionData = _.map(predictionData, function(num){return num*(1+$scope.range/100);});
        predictionData = predictionData.splice($scope.graphData.values.actual.length-1, predictionData.length-$scope.graphData.values.actual.length);
        predictionData = $scope.graphData.values.actual.concat(predictionData);
        chart.series[0].setData(predictionData,true);
      };

      var option = {
          navigation: {
              buttonOptions: {
                  enabled: false
              }
          },

          credits: {
              enabled: false
          },
          chart: {
              type: 'area',
              backgroundColor: '#EFEFEF',
              height: 300,
              renderTo: 'd3',
          },
          title: {
           text:''
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              categories: $scope.graphData.x_axis
          },
          yAxis: {

          },
          tooltip: {
              pointFormat: '{point.y}'
          },

          series: [{
              name: 'Prediction',
              data: $scope.graphData.values.prediction,
              color: '#79BCC9'

          }, {
            name: 'Actual',
            data: $scope.graphData.values.actual,
            color: '#D5D5D5'
          }]
      };
      var chart = new Highcharts.Chart(option);


	  });

});
