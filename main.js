i=0;
pause="";
status_objects="";
object=[]
percent=0;
function preload(){
video=createVideo("video.mp4");
pause=loadImage("pause.png");
}
function setup(){
canvas=createCanvas(600,500);
canvas.position(480,190);
video.hide();

}
function draw(){
image(video,0,0,600,500)
if(status_objects!=""){
objectDetection.detect(video,gotResult);
for ( x= 0; x < object.length; x++) {
r=random(255)
g=random(255)
b=random(255)
document.getElementById("status").innerHTML="Status:Object(s) Detected";
document.getElementById("num_obj_detected").innerHTML="Number Of Object(s) Detected: "+object.length;
fill("#00ffbb");
percent=Math.floor(object[x].confidence*100);
console.log(percent);
text(object[x].label+" "+percent+"%",object[x].x,object[x].y);
noFill()
stroke(r,g,b);
strokeWeight(3);
rect(object[x].x,object[x].y, object[x].width, object[x].height);
}
}
}
function start(){
objectDetection=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="Status:Detecting Object(s)🔍"
}
function stop(){
video.stop();
}
function modelLoaded(){
console.log("Great Job👍🏾")
if (i==0) {  
    video.loop();
    status_objects="true";
    i=1; 
    }
    else if(i==1){
    video.pause();
    i=0    
    }
}
function gotResult(error,result){
if (error) {
console.log("Try again in 1,000 years...Thank you for joining our service.🙂");
}else{
console.log(result);
object=result;
}
}
