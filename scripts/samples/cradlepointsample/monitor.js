/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 // require the principal module to wrap our ECM credentials
var principalModule = require("modules/cradlepoint/auth/principal");
// require the cradlepointmanagement module
var cradlepointManagementModule = require("modules/cradlepoint/cradlepointmanagement");

/**
 * This simple class leverages the Cradlepoint connector to read data from a given Cradlepoint router
 * @class Monitor
 * @constructor
 * @param {String} name: the name of the targeted router
 * @throw Error
 */
function Monitor(name) {
  
  if (!name) {
    
    throw {
      errorCode:"Missing_Parameter",
      errorDetail: "You need to pass the name of the router as a parmeter"
    };
  }
  
  // Create principal with administrator role
  this.principal = new principalModule.Principal({app:"scriptr", role:"administrator"});
  
  // Instanciate a CradlepointMananger
  this.cradlepointManager = new cradlepointManagementModule.CradlepointManager({principal:this.principal});

  //  Obtain an instance of RouterManager to manipulate Routers
  this.routerManager = this.cradlepointManager.getRouterManager();

  // Obtain a reference to a specific Router
  this.router = this.routerManager.getRouter({name:name});
}

/**
 * Calculate the total usage of bytes (in and out) of the current router for the current month
 * @method geTotalMonthlyUsage
 * @return {Object} {bytesIn, bytesOut}
 */
Monitor.prototype.geTotalMonthlyUsage = function(){
  
  var data =  this.listMonthlyUsage();
  var bytesIn = 0;
  var bytesOut = 0;
  for (var i = 0; i < data.length; i++) {
    
    bytesIn += data[i].bytes_in;
    bytesOut += data[i].bytes_out;
  }
  
  return {bytesIn:bytesIn, bytesOut:bytesOut};
};

/**
 * Return all available usage day by day records of the current router for the current month
 * @method listMonthlyUsage
 * @return {Object}
 */
Monitor.prototype.listMonthlyUsage = function() {
    
  var date = new Date();
  var month = date.getMonth() + 1; 
  var year = date.getFullYear();
  var firstOfMonth = new Date(year + "/" + month + "/01");
  
  // Retrieve usage samples for that net device (all available pages)                         
  return this.router.listStreamUsageSamples ({filter:{created_at__gt:firstOfMonth.toISOString()}, paging:{offset:1, limit:99999}}).data;
};

/**
 * Return current router's data augmented with routers's location data based on router IP
 * location data is obtained by invoking a third party API
 * @method getRouter
 * @return {Object}
 */
Monitor.prototype.getRouter = function() {
  
  // Invoke the IP-To-Coordinates API
  var http = require("http");
  var queryParams = {
    "url": "http://ip-api.com/json/" + this.router["ipv4_address"]
  };

  var queryResponse = http.request(queryParams);
  
  // If a response was obtained, combined returned data to router's data
  if (queryResponse.body) {
    
    var location = JSON.parse(queryResponse.body);
    for (var prop in location) {
      this.router[prop] = location[prop];      
    }
    
    delete this.router.client; // remove client (connector) specific data
    return this.router;
  }else {
   return {};
  }
};			