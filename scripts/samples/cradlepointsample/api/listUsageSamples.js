/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 /**
 * API that returns the usage day-by-day records of a predefined router for the current month
 * in a format that can be displayed as a Google line chart
 * @module listUsageSamples
 */

var monitorModule = require("../monitor");

try {
  
  var monitor = new monitorModule.Monitor("YOUR_ROUTER_NAME");
  var listMonthlyUsage = monitor.listMonthlyUsage();
  return formatData(listMonthlyUsage);
}catch(exception) {
  return exception;
}

/* 
 * Calculate the amount of bytes_in and bytes_out per day, then transform the result into 
 * a structure that fits Google chart's columns structure
 */
function formatData(data) {
  
  var cols = [
      {"id":"","label":"Date","pattern":"","type":"string"},
      {"id":"","label":"Bytes out","pattern":"","type":"number"},
      {"id":"","label":"Bytes in","pattern":"","type":"number"}
  ];
  
  var minDate = data[data.length - 1].created_at;
  var maxDate = data[0].created_at;
  
  var rows = [];
  var totalPerDay = getTimeframe(minDate, maxDate);
   
  // fill with data when available
  for (var i = 0; i < data.length; i++) {
   
    var date = toShortDate(data[i].created_at);
    totalPerDay[date].bytes_in += data[i].bytes_in;
    totalPerDay[date].bytes_out += data[i].bytes_out;
  }
  
  // transform into Google chart column structure
  var rows = [];
  for (var day in totalPerDay) {
    
    var row = {"c":[{"v":day},{"v":totalPerDay[day].bytes_in},{"v":totalPerDay[day].bytes_out}]};
    rows.push(row);
  }
  
  return {
    
    "cols": cols,
    "rows": rows
  };
}

/* 
 * Returns an object where properties are dates between dMax and dMin 
 * e.g. { "2016-06-01":{bytes_in:0, bytes_out:0}, "2016-05-01":{bytes_in:0, bytes_out:0}, ...}
 */
function getTimeframe(dMin, dMax) {

  var dMax = (new Date(toShortDate(dMax))).getTime();
  var dMin = (new Date(toShortDate(dMin))).getTime();
  var step = 24 * 3600000;
  var dates = {};
  for (var i = dMin; i <= dMax; i = i + step) {

    var date = new Date(i).toISOString();
    date = toShortDate(date);
    dates[date] = {
      
      bytes_in: 0,
      bytes_out: 0
    };
  }

  return dates;
}

/*
 * Returns "YYYY-MM-dd"
 */
function toShortDate(date) {  
  return date.substring(0, date.indexOf("T"));
}			