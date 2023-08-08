
const Box = {
    x: 250,
    y: 250, 
    width: 100,
    height: 100,
    color: "red",            
    dragReady: true,

    drawBox: (ctx) => {
        ctx.strokeStyle = Box.color;
        ctx.lineWidth = 5;
        ctx.rect(Box.x, Box.y, Box.width, Box.height);
        ctx.stroke();
    }
};

export default Box;
