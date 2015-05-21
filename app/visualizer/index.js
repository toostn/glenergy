var visualizer = require('angular').module('visualizer', []);
module.exports = visualizer.name;

visualizer.config(require('./visualizer.state.js'));
visualizer.controller('VisualizerController', require('./visualizer.ctrl.js'));
