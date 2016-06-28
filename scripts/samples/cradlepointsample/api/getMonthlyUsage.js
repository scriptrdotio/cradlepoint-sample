/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 /**
 * API that returns the monthly bytes (bytes in +  bytes out) usage of a predefined router
 * in a format that can be displayed as a Google gauge chart
 * @module getRouter
 * @param {String} email: email address to send notifications to (optional)
 * @param {Nmuber} threshold: max usage thereshold starting at which the script should send notifications (optional)
 */

var monitorModule = require("../monitor");

try {
  
  var monitor = new monitorModule.Monitor("ob-wan");
  var total = monitor.geTotalMonthlyUsage(); 
  var totalBytes = total.bytesIn + total.bytesOut
    
  // retrieve target email address and max threshold from request parameters
  var email = request.parameters.email;
  // determine threshold value, if not specified used default
  var threshold = request.parameters.threshold ? Number(request.parameters.threshold) : 4500000;
 
  // if email address is provided check if total usage is great or equal to max threshold
  // if so, send a notification by email
  if (email) {
    
    if (totalBytes >= threshold) {
      
      var msg = "Your usage <b>(" +  totalBytes + ")</b> is above the threshold <b>(" +  threshold + ")</b>";
      sendMail(email, "Usage monitor", "Monthly usage alert", msg);      
    }
  }   
  
  return [
    ["Usage", "Total"],
    ["Bytes", totalBytes]
  ];
}catch(exception) {
  return exception;
}			