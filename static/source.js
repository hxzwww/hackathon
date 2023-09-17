const fileInput = document.querySelector("#upload");

let shift = 100;

drawOnImage();

fileInput.addEventListener("change", async (e) => {
    const [file] = fileInput.files;

    const image = document.createElement("img");
    image.src = await fileToDataUri(file);

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
    const inputCanvasElement = document.getElementById("input_canvas");
    const input_context = inputCanvasElement.getContext("2d");

    const outputCanvasElement = document.getElementById("output_canvas");
    const output_context = outputCanvasElement.getContext("2d");

    if (image) {
        let real_width = image.height / image.width * 500
        const imageWidth = real_width;
        const imageHeight = 200;

        input_context.drawImage(image, (500 - real_width) / 2, 0, imageWidth, imageHeight);
    }

    const clearElement = document.getElementById("clear");
    clearElement.onclick = () => {
        input_context.clearRect(0, 0, inputCanvasElement.width, inputCanvasElement.height);
        output_context.clearRect(0, 0, outputCanvasElement.width, outputCanvasElement.height);
        outputCanvasElement.style.display = "none";
        document.getElementById('save_btn').style.display = "none";
        document.getElementById('process_btn').setAttribute('disabled', true);
        document.getElementById('styles_list').value = 'default';
    };

    let isDrawing;
    inputCanvasElement.onmousedown = (e) => {
        document.getElementById('process_btn').removeAttribute('disabled');
        isDrawing = true;
        input_context.beginPath();
        input_context.lineWidth = size;
        input_context.lineJoin = "round";
        input_context.lineCap = "round";
        input_context.moveTo(e.clientX - shift, e.clientY - shift);
    };

    inputCanvasElement.onmousemove = (e) => {
        if (isDrawing) {
            input_context.lineTo(e.clientX - shift, e.clientY - shift);
            input_context.stroke();
        }
    };

    inputCanvasElement.onmouseup = function () {
        isDrawing = false;
        input_context.closePath();
    };
}