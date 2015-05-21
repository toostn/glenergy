module.exports = function(emDateUtil, emMeters, emConsumptions) {
  var meterId = '554367a2d16a0060008b4892';
  var vm = this;
  this.meter = undefined;
  this.maxValue = 0;
  this.days = [];

  // Get meter data
  emMeters.get(meterId)
    .then(function(m) {
      var hourData, startDate, endDate, period;

      hourData = m.consumption_stats.energy.hour;
      startDate = emDateUtil.getDate(hourData.last.toString());
      startDate.setDate(startDate.getDate() - 364);
      endDate = emDateUtil.getDate(hourData.last.toString());
      period = emDateUtil.getDayPeriod([startDate, endDate]);

      vm.meter = m;
      vm.maxValue = hourData.max;

      return emConsumptions.get(meterId, 'hour', period);
    })
    .then(function(consumptions) {
      var data = consumptions[0].periods[0].energy;

      for (var d = 0; d <364; d++) {
        vm.days.push(data.splice(0, 24));
      }
    });

  this.getColor = function getColor(hourValue) {
    var max = vm.maxValue || 100;
    return 'hsl(173, 100%, ' + ((hourValue / max) * 75) + '%)';
  }
};
