
const Box = {
    x: 250,
    y: 250, 
    width: 50,
    height: 50,
    color: "red",            
    dragReady: true,

    drawBox: (ctx) => {
        ctx.fillStyle = Box.color;
        ctx.fillRect(Box.x, Box.y, Box.width, Box.height);
    }
};

export default Box;
