var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-37313457-1']);
_gaq.push(['_trackPageview']);

window.onload = function(){
	//initialize
	addHangoutURL()
	addSavedValues();
	selectText("messagePart1", "end");
	//Add event handlers
	document.getElementById("feedbackLink").onclick = function(){
		clicked("mailto:showmescreenshare@google.com?Subject=ShowMe%20Feedback");
	}
	document.getElementById("editLink").onclick = editMessage;
	document.getElementById("saveEdits").onclick = saveChanges;
	document.getElementById("hangoutLink").onclick = function(){
		clicked(hangoutURL);
	};
	//Google Analytics code
	(function() {
	  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	  ga.src = 'https://ssl.google-analytics.com/ga.js';
	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
};

function addHangoutURL() {
	var a = Math.random()*10000000000000000;
	var reqURL = "https://plus.google.com/hangouts/_/lite/customer_support/" + a + "?gd=customer";
	//var req = new XMLHttpRequest();
	//req.open('GET', reqURL, false);
	//req.send(null);
	//var content = req.responseText;
	//var start = content.indexOf("https://plus.google.com/hangouts/_/lite/", 0);
	//var end = content.indexOf('"', start);
	//hangoutURL = (content) ? content.substring(start,end) : 'Unable to retrieve Hangout URL.';
	hangoutURL = reqURL
	document.getElementById("insertURL").innerHTML = "<a href='"+ hangoutURL +"' id='hangoutLink'>" + hangoutURL + "</a>";
};

function addSavedValues(){
	var myMessage1 = localStorage["message_part_1"];
	var myMessage2 = localStorage["message_part_2"];	
	var mynumber = localStorage["conference_number"];
	var mycode = localStorage["conference_code"];
	if (!mynumber || !mycode) {
    mynumber = "Not saved.";
	mycode = "Not saved.";
	}
	if(!myMessage1) {
	myMessage1 = "Please click on the link below so that we can share screens:";
	}
	if(!myMessage2) {
	myMessage2 = "Let me know if your computer doesn't have a microphone. If not, we can use the conference line below to discuss:";
	}
	document.getElementById("messagePart1").innerHTML = myMessage1;
	document.getElementById("messagePart2").innerHTML = myMessage2;
	document.getElementById("conferenceLine").innerHTML = " " + mynumber;
	document.getElementById("conferenceCode").innerHTML = " " + mycode;
};

function selectText(startid, endid) {
	if (window.getSelection) {
        var range = document.createRange();
        range.setStart(document.getElementById(startid));
		range.setEnd(document.getElementById(endid));
        window.getSelection().addRange(range);
    };
};

function clicked(ctURL) {
	chrome.tabs.create({url : ctURL})
};

function editMessage() {
	window.getSelection().removeAllRanges();
	document.getElementById('messagePart1').setAttribute('style','display:none');
	document.getElementById('messagePart2').setAttribute('style','display:none');
	document.getElementById('conferenceLine').setAttribute('style','display:none');
	document.getElementById('conferenceCode').setAttribute('style','display:none');
	document.getElementById('editLink').setAttribute('style','display:none');
	document.getElementById('end').setAttribute('style','display:none');
	document.getElementById('editMessage1').setAttribute('style','display:block');
	document.getElementById('spacer1').setAttribute('style','display:block');
	document.getElementById('editMessage2').setAttribute('style','display:block');
	document.getElementById('spacer2').setAttribute('style','display:block');
	document.getElementById('editNumber').setAttribute('style','display:inline');
	document.getElementById('editPassword').setAttribute('style','display:inline');
	document.getElementById('saveEdits').setAttribute('style','display:inline-block');
	document.getElementsByTagName("body")[0].style.height = '274px';
	var myMessage1 = localStorage["message_part_1"];
	var myMessage2 = localStorage["message_part_2"];
	var mynumber = localStorage["conference_number"];
	var mycode = localStorage["conference_code"];
	if(myMessage1) {
		document.getElementById("editMessage1").value = myMessage1;
	} else {
		myMessage1 = "Please click on the link below so that we can share screens:";
		document.getElementById("editMessage1").value = myMessage1;
	};
	if(typeof myMessage2 == 'string' || myMessage2 instanceof String) {
		document.getElementById("editMessage2").value = myMessage2;
	} else {
		myMessage2 = "Let me know if your computer doesn't have a microphone. If not, we can use the conference line below to discuss:";
		document.getElementById("editMessage2").value = myMessage2;
	};
	if (mynumber) {
		document.getElementById("editNumber").value = "" + mynumber;
	} else {
		document.getElementById("editNumber").value = "Not saved";
		document.getElementById("editNumber").style.fontStyle = "italic";
		document.getElementById("editNumber").style.color = "#575757";
		document.getElementById("editNumber").onclick = function(){
			document.getElementById("editNumber").style.fontStyle = "normal";
			document.getElementById("editNumber").style.color = "black";
			document.getElementById("editNumber").value = "";
		};
	};
	if (mycode) {
		document.getElementById("editPassword").value = "" + mycode;
	} else {
		document.getElementById("editPassword").value = "Not saved";
		document.getElementById("editPassword").style.fontStyle = "italic";
		document.getElementById("editPassword").style.color = "#575757";
		document.getElementById("editPassword").onclick = function(){
			document.getElementById("editPassword").style.fontStyle = "normal";
			document.getElementById("editPassword").style.color = "black";
			document.getElementById("editPassword").value = "";
		};
	};
};

function saveChanges(){
	var messagePart1 = (document.getElementById("editMessage1").value != "" || " ") ? document.getElementById("editMessage1").value : "Please click on the link below so that we can share screens:";
	var messagePart2 = (document.getElementById("editMessage2").value != "" || " ") ? document.getElementById("editMessage2").value : "Let me know if your computer doesn't have a microphone. If not, we can use the conference line below to discuss:";
	var number = (document.getElementById("editNumber").value != "" || " " || "Not saved") ? document.getElementById("editNumber").value : "Not saved.";
	var code = (document.getElementById("editPassword").value != "" || " " || "Not saved") ? document.getElementById("editPassword").value : "Not saved.";
	document.getElementById('messagePart1').setAttribute('style','display:block');
	document.getElementById('messagePart2').setAttribute('style','display:block');
	document.getElementById('conferenceLine').setAttribute('style','display:inline');
	document.getElementById('conferenceCode').setAttribute('style','display:inline');
	document.getElementById('editLink').setAttribute('style','display:inline-block');
	document.getElementById('end').setAttribute('style','display:inline-block');
	document.getElementById('editMessage1').setAttribute('style','display:none');
	document.getElementById('spacer1').setAttribute('style','display:none');
	document.getElementById('editMessage2').setAttribute('style','display:none');
	document.getElementById('spacer2').setAttribute('style','display:none');
	document.getElementById('editNumber').setAttribute('style','display:none');
	document.getElementById('editPassword').setAttribute('style','display:none');
	document.getElementById('saveEdits').setAttribute('style','display:none');
	document.getElementsByTagName("body")[0].style.height = '250px';
	localStorage["message_part_1"] = messagePart1;
	localStorage["message_part_2"] = messagePart2;
	localStorage["conference_number"] = number;
	localStorage["conference_code"] = code;
	addSavedValues();
	selectText("messagePart1", "end");
};