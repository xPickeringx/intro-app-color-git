document.addEventListener("DOMContentLoaded", function () {
    const red = document.getElementById("red");
    const green = document.getElementById("green");
    const blue = document.getElementById("blue");

    const redInput = document.getElementById("redInput");
    const greenInput = document.getElementById("greenInput");
    const blueInput = document.getElementById("blueInput");

    const colorBox = document.getElementById("colorBox");
    const hexCode = document.getElementById("hexCode");
    const colorPicker = document.getElementById("colorPicker");
    const copyHex = document.getElementById("copyHex");

    function updateColor() {
        let r = parseInt(red.value);
        let g = parseInt(green.value);
        let b = parseInt(blue.value);
        let hex = rgbToHex(r, g, b);

        colorBox.style.backgroundColor = hex;
        hexCode.textContent = hex;
        colorPicker.value = hex;

        redInput.value = r;
        greenInput.value = g;
        blueInput.value = b;
    }

    function updateFromInputs() {
        let r = Math.min(Math.max(parseInt(redInput.value) || 0, 0), 255);
        let g = Math.min(Math.max(parseInt(greenInput.value) || 0, 0), 255);
        let b = Math.min(Math.max(parseInt(blueInput.value) || 0, 0), 255);

        red.value = r;
        green.value = g;
        blue.value = b;

        updateColor();
    }

    function updateFromColorPicker() {
        let hex = colorPicker.value;
        let { r, g, b } = hexToRgb(hex);

        red.value = r;
        green.value = g;
        blue.value = b;

        redInput.value = r;
        greenInput.value = g;
        blueInput.value = b;

        updateColor();
    }

    function rgbToHex(r, g, b) {
        return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
    }

    function hexToRgb(hex) {
        let bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(hexCode.textContent).then(() => {
            alert("Código HEX copiado: " + hexCode.textContent);
        });
    }

    red.addEventListener("input", updateColor);
    green.addEventListener("input", updateColor);
    blue.addEventListener("input", updateColor);

    redInput.addEventListener("input", updateFromInputs);
    greenInput.addEventListener("input", updateFromInputs);
    blueInput.addEventListener("input", updateFromInputs);

    colorPicker.addEventListener("input", updateFromColorPicker);
    copyHex.addEventListener("click", copyToClipboard);

    updateColor();
});
