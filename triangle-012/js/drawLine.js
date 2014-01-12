var LINE = function (x1,y1,x2,y2,weight,color,opacity, roundBorder, longSombra, colSombra){

    //console.log("---> draw new line: ",x1,y1,x2,y2);
    //PSET(x2,y2,"001","End of line");

    if (x2 < x1){
        var aux_x = x1; x1 = x2; x2 = aux_x;
        var aux_y = y1; y1 = y2; y2 = aux_y;
    }
    var w=hypotenuse + weight;
    
    var i = 0;
    var cathetus1 = x2-x1
    var cathetus2 = y2-y1;
    var hypotenuse = Math.sqrt(cathetus1*cathetus1+cathetus2*cathetus2); 
    var angRadians = Math.asin(cathetus2/hypotenuse);
    var ang = angRadians * 180 / Math.PI; 

    var string = '<div id="line-'+i+'" class="line" style="top:'+y1+'px;left:'+x1+'px; width:'+w+'px; height:'+weight+'px; transform: rotateZ('+ang+'deg) translateX(-'+weight/2+'px) translateY(-'+weight/2+'px); background-color: '+color+'; opacity:'+opacity+'; border-radius: '+weight+'px; box-shadow: 0 0 '+ longSombra +'px '+ colSombra +';"></div>';

    //PSET(x2,y2,"001","ang:"+ang.toFixed(2)+"; c1:"+cathetus1+"; c2: "+cathetus1+";");

    //return string;
    drawLine(string);
}

var drawLine = function(html){
    var string = document.getElementById("helpers").innerHTML;
    document.getElementById("helpers").innerHTML = string + html;
}

/*
    var h = distancia(Pmediox, Pmedioy, P3x, P3y);
    var skewAngle = Math.acos((h*h + base*base - a*a)/(2*h*base));
    var skewAngle = -skewAngle * 180 / Math.PI;
    var skewAngle = 90 - skewAngle;
    var skewAngle = 0; // ! Quitar!!!
    //console.log("skewAngle:",skewAngle);

    ANGLE("skewAngle", skewAngle, Pmediox, Pmedioy, P3x, P3y);
*/
var ANGLE = function (text, angle, a, b, c, d){
    LINE(a,b,c,d,1,"#00ff00",1,false,5,"#00ff00");
    var x = a - (a-c)/2;
    var y = b - (b-d)/2; 
    var string = document.getElementById("helpers").innerHTML;
    document.getElementById("helpers").innerHTML = string + '<div id="helper'+text+'"class="angle" style="top:'+y+'px; left:'+x+'px"><SPAN class="angle-text">'+text+', '+angle+'</SPAN></div>';
}