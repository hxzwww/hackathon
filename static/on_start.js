function onload() {
    let styles = ['default', 'default', 'default', 'default']


    let styles_list = document.getElementById('styles_list');
    for (i in styles) {
        let opt = document.createElement('option');
        opt.text = styles[i];
        opt.value = styles[i];
        styles_list.appendChild(opt);
    }
}

window.onload = onload();