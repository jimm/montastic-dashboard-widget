var timer;

function setup() {
    createGenericButton(document.getElementById("doneButton"), "Done", 
                        doFlipToFront);
    document.getElementById("doneButton").src = "Images/done.png";
    if (document.getElementById("version"))
	document.getElementById("version").innerText = "v"+version();
}

function onshow() {
  if (timer == null) {
    getMontasticStatus();
    timer = setInterval("getMontasticStatus();", 5 * 60 * 1000);
  }
}

function onhide() {
  if (timer != null) {
    clearInterval(timer);
    timer = null;
  }
}

if (window.widget) {
  widget.onshow = onshow;
  widget.onhide = onhide;
}

function getMontasticStatus() {
  connect();			// in net.js
}

function goToServerPage(event) {
  if (window.widget)
    widget.openURL("http://www.montastic.com/servers/");
}
