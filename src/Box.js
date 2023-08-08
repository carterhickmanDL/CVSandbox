
const Box = {
    x: 250,
    y: 250, 
    width: 50,
    height: 50,

    drawBox: (color, ctx) => {
        ctx.fillStyle = color;
        ctx.fillRect(Box.x, Box.y, Box.width, Box.height);
    }
};

export default Box;
