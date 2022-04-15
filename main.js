var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function (event) {
    console.log(event);
    var content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = content;
    content = content.toLowerCase();
    if (content.includes("take my selfie")) {
        speak();
    }
}

function speak() {
    synth = window.speechSynthesis;
    speakData = "Taking your selfie in 5 seconds";
    utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function () {
        photo();
    }, 5000);

}

Webcam.set({
    width: 320,
    height: 240,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");

function photo() {
    Webcam.snap(function (data) {
        document.getElementById("result").innerHTML = "<img id='selfie_image' src='" + data + "'>";
        dwdSpeak = "Wow this is great. Would you like to download it?";
        sayThis = new SpeechSynthesisUtterance(dwdSpeak);
        synth.speak(sayThis);
        document.getElementById("agree").style.display = "inline";
    })
}

function save(){
    link=document.getElementById("link");
    image=document.getElementById("selfie_image").src;
    link.href=image;
    link.click();
}

function yes() {
    yesSpeak = "Great! It will be downloaded in just a few seconds";
    saidYes = new SpeechSynthesisUtterance(yesSpeak);
    synth.speak(saidYes);
    save()
    document.getElementById("agree").style.display = "none";
}
function no() {
    noSpeak = "Ok. As your wish";
    saidNo = new SpeechSynthesisUtterance(noSpeak);
    synth.speak(saidNo);
    document.getElementById("agree").style.display = "none";
}