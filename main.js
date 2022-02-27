video=" ";
status=" ";
objects=[];

function setup(){
    canvas=createCanvas(600,520);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(600,520);
    video.hide();
}

function draw(){
    image(video,0,0,600,520);
    if(status!=" "){
        objectDetector.detect(video,gotResults);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Status:Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are:" + objects.length;

            fill("green");
            percent=Math.floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("green")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("number_of_objects").innerHTML="object mentioned found";
                synth=window.speechSynthesis;
                UtterThis=new SpeechSynthesisUtterance(object_name);
                synth.speak(UtterThis);
            }
            else{
                document.getElementById("number_of_objects").innerHTML="object mentioned not found";
            }
           
        }
    }
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
    }

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML= "Status:Detecting Objects!!!!";
    object_name=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log(modelLoaded);
    status=true;
    video.loop();
    video.speed(1);
    video.volume(1);
}