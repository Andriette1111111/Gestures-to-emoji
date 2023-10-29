Webcam.set({
    width: 350,
    height: 280,
    img_format: 'png',
    png_quality: 90
});

camera= document.getElementById("camera");
Webcam.attach("#camera");


function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML= '<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log("ml5 version",ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/i2rEF-6No/model.json',modelLoaded);
function modelLoaded(){
    console.log("model loaded");
}


function speak(){
    var synth= window.speechSynthesis;
    speak_data="The hand gesture prediction is"+prediction;

    var utter_This= new
    SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_This);
}

function check(){
    img= document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML= results[0].label;
        prediction= results[0].label;
        speak();
        
        if(results[0].label=="Good Job"){
            document.getElementById("update_emoji").innerHTML="&#x1f44d;";
        }
        if(results[0].label=="Victory"){
            document.getElementById("update_emoji").innerHTML="&#x270C;";
        }
        if(results[0].label=="Good Luck"){
            document.getElementById("update_emoji").innerHTML="&#x1F91E;";
        }
        if(results[0].label=="Amazing"){
            document.getElementById("update_emoji").innerHTML="&#x1F44C;";
        }
        if(results[0].label=="Thankyou"){
            document.getElementById("update_emoji").innerHTML="&#x1F64F;";
        }
    }
}
