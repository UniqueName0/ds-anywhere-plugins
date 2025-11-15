let pluginContainer = document.querySelector("#plugin-container");

var element = document.querySelector(".full-container");
panzoom(element, {
  zoomDoubleClickSpeed: 1, // disables zoom on double click
  noBind: true,
});

elem.addEventListener("pointerdown", (event) => {
  console.log(event);
  panzoom.handleDown(event);
});
document.addEventListener("pointermove", panzoom.handleMove);
document.addEventListener("pointerup", panzoom.handleUp);
