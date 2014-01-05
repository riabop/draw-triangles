var distancia = function (ax,ay,bx,by){
    var c1 = bx-ax;
    var c2 = by-ay;
    var h = Math.sqrt( c1 * c1 + c2 * c2 ); 
    return h;
};

var rotatePoint = function (pointX, pointY, originX, originY, angle) {
    angle = angle * Math.PI / 180.0;
    return {
        x: Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
        y: Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
    };
};

var drawTriangle = function(t,data,extra,bgColor,id){

    var string = "";
    var P1x =data[0].x + modifiers[t].data[0].x;
    var P1y =data[0].y + modifiers[t].data[0].y;
    var P2x =data[1].x + modifiers[t].data[1].x;
    var P2y =data[1].y + modifiers[t].data[1].y;
    var P3x =data[2].x + modifiers[t].data[2].x;
    var P3y =data[2].y + modifiers[t].data[2].y;

    //PSET(t,P1x,P1y,"001","P1("+P1x+","+P1y+")");
    //PSET(t,P2x,P2y,"001","P2("+P2x+","+P2y+")");
    PSET(t,P3x,P3y,"001","P3("+P3x+","+P3y+")");

    console.log("---> draw new triangle. P1("+P1x+","+P1y+"), P2("+P2x+","+P2y+"), P3("+P3x+","+P3y+")");
    
    //Pintar vertices (bolitas) a modo de plantilla. Pa ver como va el asunto.
    //------------------------------------------------------------------------
    for (var i=0; i<3; i++){
        var a=data[i].x + modifiers[t].data[i].x;
        var b=data[i].y + modifiers[t].data[i].y;
        string = string + '<div class="vertex" style="left:'+a+'px; top:'+b+'px; background-color:'+bgColor+'">'+(i*1+1)+'</div>';
    }

    // Averiguar distancia entre puntos
    // --------------------------------
    var c = distancia(P1x, P1y, P2x, P2y);
    var b = distancia(P1x, P1y, P3x, P3y);
    var a = distancia(P2x, P2y, P3x, P3y);
    /* // no!
    console.log("c:",c);
    console.log("b:",b);
    console.log("a:",a);
    */

    // calcular los diferentes Angulos
    // --------------------------------
    var A = Math.acos((b*b+c*c-a*a)/(2*b*c));
    var B = Math.acos((a*a+c*c-b*b)/(2*a*c));
    var C = Math.acos((a*a+b*b-c*c)/(2*a*b));

    // radianes a grados
    var A = A * 180 / Math.PI;
    var B = B * 180 / Math.PI;
    var C = C * 180 / Math.PI;
    /* // no!
    console.log("ang A:",A," grados");
    console.log("ang B:",B," grados");
    console.log("ang C:",C," grados");
    */

    // Hayar longitudes de Base y Altura
    // ---------------------------------

    /* 
    // Hayar altura a partir del area
    area = base * altura / 2; => altura = 2 * area / base;
    area = Raiz cuadrada de S*(S-a)*(S-b)*(S-c);
    donde 'S' es el semiperimetro. S = (a + b + c)/2;
    */

    var S = (a + b + c)/2;
    var area = Math.sqrt( S*(S-a)*(S-b)*(S-c) );
    var altura = 2 * area / c;
    /* // no!
    console.log("altura: ",altura);
    */

    // The triangle Base
    var base = c/2;

    // Calcular el giro del triangulo
    // ------------------------------
    var cateto1 = P2x-P1x;
    var cateto2 = P2y-P1y;
    var radianes = Math.atan(cateto2/cateto1);
    var figureRotation = radianes * 180 / Math.PI;
    //console.log("figureRotation:",figureRotation);

    // Hayar cuanto skew aplicar
    // -------------------------
    var Pmediox = P1x + ((P2x-P1x)/2);
    var Pmedioy = P1y + ((P2y-P1y)/2); 

    /*
    PSET(t,P1x,P1y,"001","P1");
    PSET(t,P2x,P2y,"001","P2");
    PSET(t,P3x,P3y,"001","P3");
    */
    PSET(t,Pmediox,Pmedioy,"001","Punto medio");

    var h = distancia(Pmediox, Pmedioy, P3x, P3y);
    var skewAngle = Math.acos((h*h + base*base - a*a)/(2*h*base));
    var skewAngle = -skewAngle * 180 / Math.PI;
    var skewAngle = 90 - skewAngle;
    var skewAngle = 0; // ! Quitar!!!
    //console.log("skewAngle:",skewAngle);

    // Establecer el origen de las transformaciones css
    // ------------------------------------------------
    var tOriginX = 0;
    var tOriginY = 0;

    // Traslacion desde origen x hacer skew
    // ------------------------------------

    var traslacionX = 0;
    var traslacionY = 0;
    
    var AnguloTraslacionX = skewAngle;
    h = h*2;
    traslacionX = Math.sqrt( h * h - (altura*2 * altura*2) );
    traslacionY = 0;    
    var desplz_x = P1x + traslacionX;
    var desplz_y = P1y - altura*2 + traslacionY;

    PSET(t,desplz_x,desplz_y,"001","Traslacion");

    // Traslacion desde origen x rotacion
    // ---------------------------------- 
    /* // no!
    console.log("--- Rotar punto ", figureRotation, " grados");
    console.log("Punto origen P(",P1x,",",P1y,")");
    */
    var datos = rotatePoint( P1x, P1y, 0, 0, figureRotation);
    /* // no!
    console.log("Punto calculado P(",datos.x,",",datos.y,")");
    */

    var desplz_x = desplz_x - (datos.x -P1x);
    var desplz_y = desplz_y - (datos.y -P1y);
    /* // no!
    console.log("desplazamientoX: ", desplz_x);
    console.log("desplazamientoY: ", desplz_y); 
    */

    // Create HTML
    // -----------
    string = string + 
    '<div class="triangle" style="'+
    'border-color: transparent transparent '+ bgColor +' transparent;'+
    'transform-origin: '+ tOriginX +'px '+ tOriginY +'px 0; '+
    'transform: rotate('+ figureRotation +'deg) '+
    'translate('+desplz_x+'px, '+ (desplz_y*1) +'px) '+
    'skewX('+ skewAngle +'deg); '+
    'border-width:'+ altura +'px '+ base +'px;'+
    '"></div>';

    return string;
}
