// Zoom control for the hybrid images. Shrinking the picture mimics viewing it
// from far away, so the low frequencies win; enlarging it mimics leaning in,
// so the high frequencies win. The slider, the mouse wheel over the image, and
// a double-click (reset) all drive the same value.
document.querySelectorAll("figure.zoom").forEach((figure) => {
    const stage = figure.querySelector(".zoom-stage");
    const slider = figure.querySelector("input[type='range']");
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);

    const setZoom = (zoom) => {
        zoom = Math.min(max, Math.max(min, zoom));
        slider.value = zoom;
        stage.style.setProperty("--zoom", zoom);
    };

    slider.addEventListener("input", () => setZoom(parseFloat(slider.value)));

    stage.addEventListener("wheel", (event) => {
        event.preventDefault(); // zoom the image instead of scrolling the page
        const step = event.deltaY < 0 ? 1.1 : 1 / 1.1;
        setZoom(parseFloat(slider.value) * step);
    }, { passive: false });

    stage.addEventListener("dblclick", () => setZoom(1));
});
