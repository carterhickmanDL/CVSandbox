
import Box from './Box';

let dragReady = false;
const startLandmark = new Array(0,0); //green, this is thumb, 8
const endLandmark = new Array(0,0); //red, this is index, 12

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
  12: { color: "red", size: 6 },
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
  let paddingConstant = 30;
  //Check if we're squishing
  if ((Math.abs(startLandmark[0] - endLandmark[0]) < 30) && (Math.abs(startLandmark[1] - endLandmark[1]) < 30)){
    
    //Check if we're initiating drag
      if (startLandmark[0] > (Box.x - paddingConstant) && startLandmark[0] < (Box.x + Box.width + paddingConstant)){
        if (startLandmark[1] > (Box.y - paddingConstant) && startLandmark[1] < (Box.y + Box.height + paddingConstant)){
          if (endLandmark[0] > (Box.x - paddingConstant) && endLandmark[0] < (Box.x + Box.width + paddingConstant)){
            if (endLandmark[1] > (Box.y - paddingConstant) && endLandmark[1] < (Box.y + Box.height + paddingConstant)){
              console.log("Drag Ready!");
              Box.dragReady = true;
              Box.color = "green";
            }
          }
        }
      }
  } else {
    console.log("Drag Not Ready!");
    Box.dragReady = false;
    Box.color = "red";
  }

};

export function insideBoundsCheck(){

  if (startLandmark[0] >= Box.x && startLandmark[0] <= (Box.x + Box.width)){
    if (startLandmark[1] >= Box.y && startLandmark[1] <= (Box.y + Box.height)){
      if (endLandmark[0] >= Box.x && endLandmark[0] <= (Box.x + Box.width)){
        if (endLandmark[1] >= Box.y && endLandmark[1] <= (Box.y + Box.height)){
          Box.dragReady = true;
          Box.color = 'green';
        }
        else {
          Box.dragReady = false;
          Box.color = 'red';
        }
      }
    }
  }
  

};

export function dragBox(){
  
  // Box.x = (startLandmark[0] + endLandmark[0]) / 2;
  // Box.y = (startLandmark[1] + endLandmark[1]) / 2;
  // if (Box.x > 400) {
  //   Box.x = 400;
  // }
  // if (Box.x < 0) {
  //   Box.x = 0;
  // }
  // if (Box.y > 300) {
  //   Box.y = 300;
  // }
  // if (Box.y < 100) {
  //   Box.y = 100;
  // }

  const middleX = (startLandmark[0] + endLandmark[0])/2;
  const middleY = (startLandmark[1] + endLandmark[1])/2;
  Box.x = middleX - (0.5 * Box.width);
  Box.y = middleY - (0.5 * Box.height);

}


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
        if (i === 8){
          startLandmark[0] = landmarks[i][0];
          startLandmark[1] = landmarks[i][1];

        }
        else if (i === 12){
          endLandmark[0] = landmarks[i][0];
          endLandmark[1] = landmarks[i][1];
        };
      }
    });
  }

  //Draw box around fingers 

  // if (emoji === 'victory'){
  //   ctx.beginPath();
  //   ctx.strokeStyle = 'green';
  //   ctx.lineWidth = 1;
  //   //start is green, end is red
  //   //rect parameters
  //   ctx.rect(startLandmark[0], startLandmark[1], endLandmark[0] - startLandmark[0], endLandmark[0] - startLandmark[0]);
  //   ctx.stroke();
  // }

};



function getBoxProperties() {
  return {
    x: Box.x,
    y: Box.y,
    width: Box.width,
    height: Box.height,
    color: Box.color,
    dragReady: Box.dragReady
  };
}

export { getBoxProperties };