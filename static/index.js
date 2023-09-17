const sio = io();

sio.on('connect', () => {
    console.log('connected');
});

sio.on('disconnect', () => {
    console.log('disconnected');
})

sio.on('return', (image) => {
    let n_img = new Image();
    n_img.src = image;
    let img_list = document.getElementById('out_images');
    img_list.replaceChildren(n_img);
})

function process() {
    let canvas = document.getElementById('canvas');
    let image = canvas.toDataURL();
    sio.emit('make', image);
}