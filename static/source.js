function drawOnImage(image = null) {
    const canvasElement = document.getElementById("canvas");

    const context = canvasElement.getContext("2d");

    // if an image is present,
    // the image passed as a parameter is drawn in the canvas
    if (image) {
        const imageWidth = image.width;
        const imageHeight = image.height;
        // rescaling the canvas element
        canvasElement.width = imageWidth;
        canvasElement.height = imageHeight;
        context.drawImage(image, 0, 0, imageWidth, imageHeight);
    }

    let isDrawing;
    canvasElement.onmousedown = (e) => {
        isDrawing = true;
        context.beginPath();
        context.lineWidth = 10;
        context.strokeStyle = "black";
        context.lineJoin = "round";
        context.lineCap = "round";
        context.moveTo(e.clientX, e.clientY);
    };

    canvasElement.onmousemove = (e) => {
        if (isDrawing) {
            context.lineTo(e.clientX, e.clientY);
            context.stroke();
        }
    };

    canvasElement.onmouseup = function () {
        isDrawing = false;
        context.closePath();
    };
}


const fileInput = document.querySelector("#upload");

// enabling drawing on the blank canvas
drawOnImage();

fileInput.addEventListener("change", async (e) => {
    const [file] = fileInput.files;

    // displaying the uploaded image
    const image = document.createElement("img");
    image.src = await fileToDataUri(file);

    // enabling the brush after the image
    // has been uploaded
    image.addEventListener("load", () => {
        drawOnImage(image);
    });

    return false;
});

function fileToDataUri(field) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            resolve(reader.result);
        });
        reader.readAsDataURL(field);
    });
}

const sizeElement = document.querySelector("#sizeRange");
let size = sizeElement.value;
sizeElement.oninput = (e) => {
    size = e.target.value;
};


function drawOnImage(image = null) {
    const canvasElement = document.getElementById("canvas");

    const context = canvasElement.getContext("2d");

    // if an image is present,
    // the image passed as parameter is drawn in the canvas
    if (image) {
        const imageWidth = image.width;
        const imageHeight = image.height;

        // rescaling the canvas element
        canvasElement.width = imageWidth;
        canvasElement.height = imageHeight;

        context.drawImage(image, 0, 0, imageWidth, imageHeight);
    }

    const clearElement = document.getElementById("clear");
    clearElement.onclick = () => {
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        let img_list = document.getElementById('out_images');
        img_list.replaceChildren('');
        document.getElementById('save_btn').style.display = "none";
    };

    let isDrawing;
    canvasElement.onmousedown = (e) => {
        isDrawing = true;
        context.beginPath();
        context.lineWidth = size;
        context.lineJoin = "round";
        context.lineCap = "round";
        context.moveTo(e.clientX, e.clientY);
    };

    canvasElement.onmousemove = (e) => {
        if (isDrawing) {
            context.lineTo(e.clientX, e.clientY);
            context.stroke();
        }
    };

    canvasElement.onmouseup = function () {
        isDrawing = false;
        context.closePath();
    };
}