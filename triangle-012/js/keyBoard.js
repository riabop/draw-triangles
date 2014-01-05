function callkeydownhandler(evnt) {
   var ev = (evnt) ? evnt : event;
   var code=(ev.which) ? ev.which : event.keyCode;

   console.log("El código de la tecla pulsada es: " + code);
   switch (code) {
    case 38:
        modifiers[ selectedTriangle ].data[ selectedVertex ].y -= 10;
        break;
    case 40:
        modifiers[ selectedTriangle ].data[ selectedVertex ].y += 10;
        break;
    case 39:
        modifiers[ selectedTriangle ].data[ selectedVertex ].x += 10;
        break;
    case 37:
        modifiers[ selectedTriangle ].data[ selectedVertex ].x -= 10;
        break;
    case 86: // v | Select next vertex
        selectedVertex++;
        if(selectedVertex>2) selectedVertex = 0;
        selectVertex(selectedTriangle,selectedVertex);
        break;
    case 84: // t | Select next triangle
        selectedTriangle++;
        if(selectedTriangle > triangles.length-1) selectedTriangle = 0;
        selectVertex(selectedTriangle,selectedVertex);
        break;
   }
   setSelectorPosition(selectedTriangle,selectedVertex);
   draw();
   console.log("modifiers:",JSON.stringify(modifiers));
}

if (window.document.addEventListener) {
   window.document.addEventListener("keydown", callkeydownhandler, false);
} else {
   window.document.attachEvent("onkeydown", callkeydownhandler);
}
