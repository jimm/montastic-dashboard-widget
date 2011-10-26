/*
prefs.js -- home of javascript gone wild!
         -- Joshua Emmons (skia.net) 
	 -- Nov/16/05

This license intentionally left blank. COPY IT! STEAL IT! MAKE IT YOUR OWN!

[I've done just that. -- jimm]
*/

/// This opens the Info.plist as an XML document, navigates to the
/// part that has the version number, and returns it, thus ensuring
/// the version displayed is never out of sync with the Info file.
function version(){
  var xmlReq = new XMLHttpRequest(); 
  xmlReq.open("GET", "Info.plist", false); 
  xmlReq.send(null); 
    
  var xml = xmlReq.responseXML; 
  var keys = xml.getElementsByTagName("key");
  var ver = "0.0";

  for (i=0; i<keys.length; ++i) {
    if ("CFBundleVersion" == keys[i].firstChild.data) {
      ver = keys[i].nextSibling.nextSibling.firstChild.data;
      break;
    }
  }

  return ver; 
}

function montasticKey() {
  return window.widget ? widget.preferenceForKey("montasticKey") : null;
}

function setMontasticKey(val) {
  if (window.widget)
    widget.setPreferenceForKey(val, "montasticKey");
}
