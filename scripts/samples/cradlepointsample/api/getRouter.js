/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 /**
 * API that returns all data of a predefined router, including location data
 * @module getRouter
 */


var monitorModule = require("../monitor");

try {
  
  var monitor = new monitorModule.Monitor("YOUR_ROUTER_NAME");
  return monitor.getRouter();
}catch(exception) {
  return exception;
}			