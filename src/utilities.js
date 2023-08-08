
//import { start } from 'repl';
import Box from './Box';

let dragReady = false;
const startLandmark = new Array(0,0); //purple, this is thumb
const endLandmark = new Array(0,0); //green, this is index 

// Points for fingers
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Infinity Gauntlet Style
const style = {
  0: { color: "gold", size: 15 },
  1: { color: "gold", size: 6 },
  2: { color: "gold", size: 10 },
  3: { color: "gold", size: 6 },
  4: { color: "indigo", size: 6 },
  5: { color: "gold", size: 10 },
  6: { color: "gold", size: 6 },
  7: { color: "gold", size: 6 },
  8: { color: "green", size: 6 },
  9: { color: "gold", size: 10 },
  10: { color: "gold", size: 6 },
  11: { color: "gold", size: 6 },
  12: { color: "gold", size: 6 },
  13: { color: "gold", size: 10 },
  14: { color: "gold", size: 6 },
  15: { color: "gold", size: 6 },
  16: { color: "gold", size: 6 },
  17: { color: "gold", size: 10 },
  18: { color: "gold", size: 6 },
  19: { color: "gold", size: 6 },
  20: { color: "gold", size: 6 },
};

export function squishCheck(){

  if ((Math.abs(startLandmark[0] - endLandmark[0]) < 35) && (Math.abs(startLandmark[1] - endLandmark[1]) < 35)){
    Box.x = (startLandmark[0] + endLandmark[0]) / 2;
    Box.y = (startLandmark[1] + endLandmark[1]) / 2;
    //console.log("here");
  }

  // if (startLandmark[0] > Box.x && startLandmark[0] < (Box.x + Box.width)){
  //   if (startLandmark[1] > Box.y && startLandmark[1] < (Box.y + Box.height)){
  //     if (endLandmark[0] > Box.x && endLandmark[0] < (Box.x + Box.width)){
  //       if (endLandmark[1] > Box.y && endLandmark[1] < (Box.y + Box.height)){
  //       console.log("hoooo");

        //Box.drawBox("red", ctx);
  //      }
  //     }
  //   }
  // }
  //console.log("x: " startLandmark[0])
};


const detectIntersection = () => {
  
  // if (x >= 100 && x <= 150){
  //     if (y >= 50 && y <= 100){
  //         ctx.fillStyle = "green";
  //         ctx.fillRect(400, 200, 20, 20);
  //     };
  // };
  
};


// Drawing function
export const drawHand = (predictions, ctx, emoji) => {
  // Check if we have predictions
  if (predictions.length > 0) {
    // Loop through each prediction
    predictions.forEach((prediction) => {
      // Grab landmarks
      const landmarks = prediction.landmarks;

      // Loop through fingers
      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];
        //  Loop through pairs of joints
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          // Get pairs of joints
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];

          // Draw path
          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1]
          );
          ctx.lineTo(
            landmarks[secondJointIndex][0],
            landmarks[secondJointIndex][1]
          );
          ctx.strokeStyle = "plum";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }

      // Loop through landmarks and draw em
      for (let i = 0; i < landmarks.length; i++) {
        // Get x point
        const x = landmarks[i][0];
        // Get y point
        const y = landmarks[i][1];
        // Start drawing
        ctx.beginPath();
        ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);

        // Set line color
        ctx.fillStyle = style[i]["color"];
        ctx.fill();
        //console.log('emoji: ', emoji);
        if (i === 4){
          startLandmark[0] = landmarks[i][0];
          startLandmark[1] = landmarks[i][1];
        }
        else if (i === 8){
          endLandmark[0] = landmarks[i][0];
          endLandmark[1] = landmarks[i][1];
        };
      }
    });
  }
  if (emoji === 'squish'){
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;
    ctx.rect(((startLandmark[0] + endLandmark[0])/2)+20, startLandmark[1], endLandmark[1] - startLandmark[1], endLandmark[1] - startLandmark[1]);
    ctx.stroke();
  }

};



function getBoxProperties() {
  return {
    x: Box.x,
    y: Box.y,
    width: Box.width,
    height: Box.height
  };
}

export { getBoxProperties };