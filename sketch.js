// ml5.js: Object Detection with COCO-SSD (Webcam)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/1.3-object-detection.html
// https://youtu.be/QEzRxnuaZCk

// p5.js Web Editor - Image: https://editor.p5js.org/codingtrain/sketches/ZNQQx2n5o
// p5.js Web Editor - Webcam: https://editor.p5js.org/codingtrain/sketches/VIYRpcME3
// p5.js Web Editor - Webcam Persistence: https://editor.p5js.org/codingtrain/sketches/Vt9xeTxWJ

// let img;
let video;
let detector;
let detections = [];

// For Camera Switch
var ctxt;
var capture;
let switchFlag = false;
let switchBtn;

var options = {
     video: {
         facingMode: {
          exact: "user"
        }
     }
   };

   // video constraints
const constraints = {
       video: {
         width: {
           min: 1280,
           ideal: 1920,
           max: 2560,
         },
         height: {
           min: 720,
           ideal: 1080,
           max: 1440,
         },
       },
     };

async function initializeCamera() {
      stopVideoStream();
      constraints.video.facingMode = useFrontCamera ? "user" : "environment";

      try {
           videoStream = await navigator.mediaDevices.getUserMedia(constraints);
           video.srcObject = videoStream;
         } catch (err) {
           alert("Could not access the camera");
         }
      }



function preload() {
  // img = loadImage('dog_cat.jpg');
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function setup() {
  ctxt = createCanvas(640, 480 + 200);
  //initializeCamera();
  if (  !"mediaDevices" in navigator ||
        !"getUserMedia" in navigator.mediaDevices) {
          alert("Camera API is not available in your browser");
    return;
  }else{
      console.log(" have camera ");
  }

  video = createCapture(options);
  video.size(640, 480);
  video.hide();

  // For Switch Camera

  //capture = createCapture(options);

  switchBtn = createButton('Switch Camera');
  switchBtn.position(19, 19);
  switchBtn.mousePressed(switchCamera);

  //detector.detect(video, gotDetections);
}

function draw() {
  image(video, 0, 200);
/*
  textSize(14);

  text(' detect length '+ detections.length ,  20, 24);

  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    let s = second();
    let millisecond = millis();

    stroke(0, 200+255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y + 200, object.width, object.height);
    noStroke();
    fill(255);
    textSize(14);
    text('Curr sec , ms :' + s+','+ millisecond.toFixed(1) +'\n',object.x + 10,200 + object.y -25);
    text(' ('+ object.x.toFixed(1) +','+object.y.toFixed(1)+')',object.x + 10,200 + object.y -10 );
    textSize(24);
    text(object.label, object.x + 10, 200+ object.y + 24);
  }
  */
}


function switchCamera()
{
  switchFlag = !switchFlag;
  stopCapture();

  if(switchFlag==true)
  {
     video.remove();
     options = {
          video: {
              facingMode: {
              exact: "environment"
              }
            }
          };
     console.log("switch camera environment");
  } else{
    video.remove();
    options = {
     video: {
         facingMode: {
          exact: "user"
        }
     }
   };
   console.log("switch camera user");
  }
  video = createCapture(options);
  if(!video){
       console.log(" after switch camera , capture create fail ");
  }
}

function stopCapture() {
  if (this instanceof p5.MediaElement) {
        let stream = this.elt.srcObject;
        if (undefined != stream){
            let tracks = stream.getTracks();
            tracks.forEach(function(track) {
                track.stop();
              });
        }
          this.elt.srcObject = null;
        }
        //detector.detect(video, gotDetections);
}

/*
if (this instanceof _main.default.MediaElement) {
                this.stop(); // Stop the MediaElement
                var sources = this.elt.srcObject;
                if (undefined != sources) { // Only proceed if sources is not null
                    var tracks = sources.getTracks();
                    tracks.forEach(function(track) {
                        track.stop();
                    });
                }
            }
*/
