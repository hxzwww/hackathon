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
    document.getElementById('save_btn').style.display = "block";
})

function process() {
    let canvas = document.getElementById('canvas');
    let image = canvas.toDataURL();
    sio.emit('make', image);
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
    let processed_img = document.getElementById('out_images');
    let image = processed_img.firstChild.getAttribute('src');
    console.log("Image: ", image);
    downloadImage(image);
}