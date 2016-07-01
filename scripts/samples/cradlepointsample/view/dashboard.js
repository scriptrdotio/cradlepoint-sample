/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 /*#*SCRIPTR_PLUGIN*#*{"metadata":{"name":"CodeMirrorArbitraryFile","plugindata":{"fileData":"<html>\n  <head>\n  \t<title>Router consumption</title>\n\t<meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta charset=\"utf-8\">\n    <style>\n      html, body {\n        height: 100%;\n        margin: 0;\n        padding: 0;\n      }\n      #map {\n        height: 400px;\n        width: 100%;\n      }\n\t .modal {\n        display: none; \n        position: fixed;\n        z-index: 1; \n        left: 0;\n        top: 0;\n        width: 100%; \n        height: 100%; \n        overflow: auto;\n        background-color: rgb(0,0,0); \n        background-color: rgba(0,0,0,0.4); \n     }\n     .modal-content {\n        background-color: #FFFFFF;\n        margin: 15% auto; \n        padding: 20px;\n        border: 1px solid #888;\n        font-family:calibri;\n        font-size:22px;\n        width: 60%;\n      }\n    </style>\n\t<script>\n\n\t\tfunction locateRouter() {\n       \n          var xhr = new XMLHttpRequest();\n          xhr.open(\"GET\", \"https://iotdemos.scriptrapps.io/samples/cradlepointsample/api/getRouter\");\n          xhr.onload = function() {\n\n            var httpResponse = JSON.parse(xhr.responseText);\n            var router =  httpResponse.response.result;\n            var marker = new google.maps.Marker({\n              position: {lat:Number(router.lat), lng: Number(router.lon)},\n              map: map,\n              label:\"Router\",\n              title: \"name: \" + router.name + \",\\nstate: \" + router.state + \",\\nconfig status: \" + router.config_status + \",\\nupdated at: \" + router.updated_at,\n            });\n            \n            map.setCenter(marker.getPosition());\n          };\n\n          xhr.onerror = function(error) {\n\n            if (typeof(error) == \"object\") {\n              alert(JSON.stringify(error));\n            }else{\n              alert(error);\n            }\n          };\n\n          xhr.send();\n      }\n\n      function parseParams() {\n\t\t\n        if (document.location.search) {\n        \twindow.frames[\"total\"].src = \"https://iotdemos.scriptrapps.io/samples/cradlepointsample/view/totalusage\" +  document.location.search;  \n        }        \n      }\n\t</script>\n  </head>\n  <body onload=\"locateRouter(); parseParams()\">\n\t<div id=\"map\"></div>\n    <script>\n      \n\t  var map = null;\n      function initMap() {\n        map = new google.maps.Map(document.getElementById('map'), {\n          center: {lat: 40.7053111, lng: -74.258188},\n          zoom: 15\n        });\n      }\n    </script>\n\t<script src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyBT2lgr9B0CzZSipJK9XSGllkfTUXICbQw&callback=initMap&libraries=drawing\" async defer></script>\n      <table align=\"center\">\n      \t<tr>\n      \t\t<td><iframe width=\"650px\" height=\"600px\" src=\"https://iotdemos.scriptrapps.io/samples/cradlepointsample/view/usagemetrics\" frameborder=\"0\"></iframe></td>\n            <td><iframe id=\"total\" width=\"600px\" height=\"500px\" src=\"https://iotdemos.scriptrapps.io/samples/cradlepointsample/view/totalusage\" frameborder=\"0\"></iframe></td>\n        </tr>\n      </table>\n  </body>\n</html>            "},"scriptrdata":[]}}*#*#*/
var content= '<html>\n\
  <head>\n\
  	<title>Router consumption</title>\n\
	<meta name=\"viewport\" content=\"initial-scale=1.0\">\n\
    <meta charset=\"utf-8\">\n\
    <style>\n\
      html, body {\n\
        height: 100%;\n\
        margin: 0;\n\
        padding: 0;\n\
      }\n\
      #map {\n\
        height: 400px;\n\
        width: 100%;\n\
      }\n\
	 .modal {\n\
        display: none; \n\
        position: fixed;\n\
        z-index: 1; \n\
        left: 0;\n\
        top: 0;\n\
        width: 100%; \n\
        height: 100%; \n\
        overflow: auto;\n\
        background-color: rgb(0,0,0); \n\
        background-color: rgba(0,0,0,0.4); \n\
     }\n\
     .modal-content {\n\
        background-color: #FFFFFF;\n\
        margin: 15% auto; \n\
        padding: 20px;\n\
        border: 1px solid #888;\n\
        font-family:calibri;\n\
        font-size:22px;\n\
        width: 60%;\n\
      }\n\
    </style>\n\
	<script>\n\
\n\
		function locateRouter() {\n\
       \n\
          var xhr = new XMLHttpRequest();\n\
          xhr.open(\"GET\", \"https://iotdemos.scriptrapps.io/samples/cradlepointsample/api/getRouter\");\n\
          xhr.onload = function() {\n\
\n\
            var httpResponse = JSON.parse(xhr.responseText);\n\
            var router =  httpResponse.response.result;\n\
            var marker = new google.maps.Marker({\n\
              position: {lat:Number(router.lat), lng: Number(router.lon)},\n\
              map: map,\n\
              label:\"Router\",\n\
              title: \"name: \" + router.name + \",\\nstate: \" + router.state + \",\\nconfig status: \" + router.config_status + \",\\nupdated at: \" + router.updated_at,\n\
            });\n\
            \n\
            map.setCenter(marker.getPosition());\n\
          };\n\
\n\
          xhr.onerror = function(error) {\n\
\n\
            if (typeof(error) == \"object\") {\n\
              alert(JSON.stringify(error));\n\
            }else{\n\
              alert(error);\n\
            }\n\
          };\n\
\n\
          xhr.send();\n\
      }\n\
\n\
      function parseParams() {\n\
		\n\
        if (document.location.search) {\n\
        	window.frames[\"total\"].src = \"https://iotdemos.scriptrapps.io/samples/cradlepointsample/view/totalusage\" +  document.location.search;  \n\
        }        \n\
      }\n\
	</script>\n\
  </head>\n\
  <body onload=\"locateRouter(); parseParams()\">\n\
	<div id=\"map\"></div>\n\
    <script>\n\
      \n\
	  var map = null;\n\
      function initMap() {\n\
        map = new google.maps.Map(document.getElementById(\'map\'), {\n\
          center: {lat: 40.7053111, lng: -74.258188},\n\
          zoom: 15\n\
        });\n\
      }\n\
    </script>\n\
	<script src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyBT2lgr9B0CzZSipJK9XSGllkfTUXICbQw&callback=initMap&libraries=drawing\" async defer></script>\n\
      <table align=\"center\">\n\
      	<tr>\n\
      		<td><iframe width=\"650px\" height=\"600px\" src=\"https://iotdemos.scriptrapps.io/samples/cradlepointsample/view/usagemetrics\" frameborder=\"0\"></iframe></td>\n\
            <td><iframe id=\"total\" width=\"600px\" height=\"500px\" src=\"https://iotdemos.scriptrapps.io/samples/cradlepointsample/view/totalusage\" frameborder=\"0\"></iframe></td>\n\
        </tr>\n\
      </table>\n\
  </body>\n\
</html>            ';  response.write(content);response.close();			