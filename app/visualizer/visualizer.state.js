module.exports = function($stateProvider) {
  $stateProvider.state('visualizer', {
    url: '/visualizer',
    template: require('./visualizer.tmpl.html'),
    controller: 'VisualizerController',
    controllerAs: 'ctrl'
  });
};
