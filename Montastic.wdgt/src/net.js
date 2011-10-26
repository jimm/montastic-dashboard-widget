/*
net.js -- home of javascript gone wild!
       -- Joshua Emmons (skia.net) 
       -- Nov/16/05

This license intentionally left blank. COPY IT! STEAL IT! MAKE IT YOUR OWN!

[Heavily modified from the original. --jimm]
*/
function getServerStatus(req) {
  if (req.readyState == 4){	// Response has come back...
    if (req.status == 200) {	// Everything is ok!
      if (req.responseText == "0")
        displayGreen();
      else
        displayRed(req.responseText + " server" + plural(req.responseText) +
                   " down");
    }
    else {
      displayRed(req.responseStatus ? req.responseStatus : "can't connect");
    }
  }
}

function connect() {
  var key = montasticKey();
  if (key == null) {
    displayRed("please enter key");
    return null;
  }

  req = new XMLHttpRequest();
  req.onload = function(e) { getServerStatus(req); }
  req.setRequestHeader("Cache-Control", "no-cache");
  var url =  "http://www.montastic.com/feeds/quick_status?key=" + key;
  req.open("GET", url, true);	// true == async, false == sync
  req.send(null);
}

function plural(n) {
  return n > 1 ? "s" : "";
}

function displayGreen() {
  document.getElementById("statusText").innerText = "all systems go";
  display("screen", "icon_up", "all systems go", "overlay");
}

function displayRed(text) {
  display("screen_red", "icon_down", text, "overlay");
}

function display(screen, icon, text, overlay) {
  displayImage("screen", screen);
  displayImage("icon", icon);
  document.getElementById("statusText").innerText = text;
  displayImage("overlay", overlay);
}

function displayImage(name, value) {
  document.getElementById(name).innerHTML =
    "<img src=\"Images/" + value + ".png\"/>";
}
