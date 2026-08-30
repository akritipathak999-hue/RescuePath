function detectAccident() {
    document.getElementById("output").innerHTML =
        "🚨 Accident Detected!<br><br>" +
        "📍 GPS location sharing initiated.<br>" +
        "👨‍👩‍👧 Family alert initiated.<br>" +
        "🚑 Emergency response initiated.<br>" +
        "🏥 Hospital assistance initiated.<br>" +
        "🚓 Police alert initiated.<br><br>" +
        "🤖 AI First Aid Guidance:<br>" +
        "If the victim is bleeding, apply firm pressure with a clean cloth. " +
        "Keep the person still and wait for emergency responders.";

    document.getElementById("sensorStatus").innerHTML =
        "🔴 Accident Detected (Impact Level: HIGH)";

    document.getElementById("impact").innerHTML =
        "Impact Level: HIGH<br>" +
        "Analysis: Potential severe impact detected.";

    document.getElementById("timeline").innerHTML =
        "🚨 00 sec - Accident Detected<br><br>" +
        "📍 02 sec - GPS Location Captured<br><br>" +
        "👨‍👩‍👧 04 sec - Family Alert Initiated<br><br>" +
        "🚑 05 sec - Emergency Response Activated<br><br>" +
        "🏥 06 sec - Hospital Assistance Initiated<br><br>" +
        "🤖 08 sec - AI First Aid Started";

    getLocation();
}


function startListening() {

    var SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        document.getElementById("voice").innerHTML =
            "Voice recognition is not supported in this browser.";
        return;
    }

    var recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    document.getElementById("voice").innerHTML =
        "🎤 Listening...";

    recognition.onresult = function(event) {

        var text =
            event.results[0][0].transcript.toLowerCase();

        document.getElementById("voice").innerHTML =
            "🎤 You said: " + text;

        if (
            text.includes("help") ||
            text.includes("accident") ||
            text.includes("emergency")
        ) {
            detectAccident();
            generateReport();
        }
    };

    recognition.onerror = function() {
        document.getElementById("voice").innerHTML =
            "❌ Voice recognition failed.";
    };
}


function getLocation() {

    if (!navigator.geolocation) {
        document.getElementById("location").innerHTML =
            "❌ GPS is not supported.";
        return;
    }

    document.getElementById("location").innerHTML =
        "📍 Getting location...";

    navigator.geolocation.getCurrentPosition(
        showPosition,
        locationError
    );
}


function showPosition(position) {

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    document.getElementById("location").innerHTML =
        "📍 Location Detected<br><br>" +
        "Latitude: " + lat + "<br>" +
        "Longitude: " + lon + "<br><br>" +
        "<a href='https://www.google.com/maps?q=" +
        lat + "," + lon +
        "' target='_blank'>🗺️ Open in Google Maps</a>";
}


function locationError() {

    document.getElementById("location").innerHTML =
        "❌ Location permission denied or unavailable.";
}


function generateReport() {

    document.getElementById("report").innerHTML =
        "<h3>🚨 Emergency Report</h3>" +

        "<p><b>Incident:</b> Accident Detected</p>" +

        "<p><b>Severity:</b> High</p>" +

        "<p><b>GPS:</b> Location detection initiated ✅</p>" +

        "<p><b>Family Alert:</b> Initiated ✅</p>" +

        "<p><b>Hospital Assistance:</b> Initiated ✅</p>" +

        "<p><b>Police Alert:</b> Initiated ✅</p>" +

        "<p><b>Emergency Response:</b> Activated ✅</p>" +

        "<p><b>AI Recommendation:</b><br>" +
        "Keep the victim still and provide appropriate " +
        "first aid while waiting for emergency responders.</p>";
}


function findHospital() {

    if (!navigator.geolocation) {
        alert("GPS is not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {

            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            window.open(
                "https://www.google.com/maps/search/hospitals/@" +
                lat + "," + lon + ",14z",
                "_blank"
            );
        },

        function() {
            alert("Please allow location access.");
        }
    );
}


function updateTime() {

    var now = new Date();

    document.getElementById("datetime").innerHTML =
        "🕒 " + now.toLocaleString();
}


setInterval(updateTime, 1000);

updateTime();
