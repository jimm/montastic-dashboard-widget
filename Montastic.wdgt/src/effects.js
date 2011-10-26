/*
effects.js -- home of javascript gone wild!
           -- Joshua Emmons (skia.net) 
	   -- Nov/16/05

This license intentionally left blank. COPY IT! STEAL IT! MAKE IT YOUR OWN!

[I've added the Montastic key stuff and removed code I don't need. -- jimm]
*/


var eyeShown = false;
var animation = {duration:0, starttime:0, to:1.0, now:0.0, from:0.0, firstElement:null, timer:null};
 

/// Calling these next two will cause the "i" button that flips the
/// widget to fade in and fade out, respectively.
function fadeInEye(){
    if (!eyeShown){
        if (animation.timer != null){
            clearInterval (animation.timer);
            animation.timer  = null;
        }
 
        var starttime = (new Date).getTime() - 13;

        animation.duration = 500;
        animation.starttime = starttime;
        animation.firstElement = document.getElementById('eyeFront');
        animation.timer = setInterval ("animate();", 13);
        animation.from = animation.now;
        animation.to = 1.0;
        animate();
        eyeShown = true;
    }
}


function fadeOutEye(){
    if (eyeShown){
        if (animation.timer != null){
            clearInterval (animation.timer);
            animation.timer  = null;
        }
 
        var starttime = (new Date).getTime() - 13;
 
        animation.duration = 500;
        animation.starttime = starttime;
        animation.firstElement = document.getElementById ('eyeFront');
        animation.timer = setInterval ("animate();", 13);
        animation.from = animation.now;
        animation.to = 0.0;
        animate();
        eyeShown = false;
    }
}

/// These flip the widget from front to back, and from back to front,
/// respectively.
function doFlipToBack(){
    document.getElementById("key").value = montasticKey() || "";

    var front = document.getElementById("front");
    var back = document.getElementById("back");
	
    if (window.widget)
	widget.prepareForTransition("ToBack");

    front.style.display="none";
    back.style.display="block";

    if (window.widget)
	setTimeout("widget.performTransition();", 0);
}

function doFlipToFront(){
    setMontasticKey(document.getElementById("key").value);

    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget)
	widget.prepareForTransition("ToFront");

    document.getElementById("doneButton").src = "Images/done.png";

    back.style.display="none";
    front.style.display="block";
	
    if (window.widget)
	setTimeout("widget.performTransition();", 0);
}


/// This animates things in that classic Apple logarithmic
/// fashion. It's used by fadeInEye() and fadeOutEye(), but could be
/// used by anything that needs a smooth animated effect (minimizing,
/// resizing, etc).
function animate(){
    var T;
    var ease;
    var time = (new Date).getTime();
 
    T = limit_3(time-animation.starttime, 0, animation.duration);
    
    if (T >= animation.duration){
        clearInterval (animation.timer);
        animation.timer = null;
        animation.now = animation.to;
    
    }else{
        ease = 0.5 - (0.5 * Math.cos(Math.PI * T / animation.duration));
        animation.now = computeNextFloat (animation.from, animation.to, ease);
    }
 
    animation.firstElement.style.opacity = animation.now;
}


/// Support function for animate()
function limit_3 (a, b, c){
    return a<b ? b : (a>c ? c : a);
}


/// Support function for animate()
function computeNextFloat (from, to, ease){
    return from + (to - from) * ease;
}
