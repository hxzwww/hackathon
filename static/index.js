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
    var output_canvas = document.getElementById('output_canvas'),
    context = output_canvas.getContext('2d');
    n_img.onload = () => {
        console.log("AAAA: ", image);
        context.drawImage(n_img, 0, 0);
    }
    document.getElementById('save_btn').style.display = "block";
})

function on_process_btn_clicked() {
    let canvas = document.getElementById('input_canvas');
    let image = canvas.toDataURL();
    sio.emit('make', image);
    document.getElementById('output_canvas').style.display = "block";
    document.getElementById('process_btn').setAttribute('disabled', true);
}

async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a')
  link.href = imageURL
  link.download = 'processed_image'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function save() {
    let output_canvas = document.getElementById('output_canvas');
    let image = output_canvas.toDataURL();
    console.log("Image: ", image);
    downloadImage(image);
}