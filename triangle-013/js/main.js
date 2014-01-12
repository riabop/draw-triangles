
'use strict';

var selectVertex = function(triangleId,vertexNum){
    console.log("Select triangle "+ triangleId +", vertex "+ vertexNum +".");
    selectedTriangle = triangleId;
    selectedVertex = vertexNum;
    setSelectorPosition(triangleId,vertexNum);
    $('.btnPencil').css('background-position','0 0');
    $('#tri-'+triangleId).find('.btnPencil').css('background-position','-24px 0');
};

var setSelectorPosition = function(triangleId,vertexNum){
    var x = triangles[triangleId].vertices[vertexNum].x + modifiers[triangleId].data[vertexNum].x;
    var y = triangles[triangleId].vertices[vertexNum].y + modifiers[triangleId].data[vertexNum].y;
    var obj = document.getElementById("select"); 
    obj.style.top = (y-7)+"px";
    obj.style.left = (x-7)+"px";
}

var selectTriangle = function(n){
    console.log("selectTriangle("+n+")");
    selectVertex(n,selectedVertex);
}

var hideTriangle = function(n){
    console.log("hideTriangle("+n+")");
    //'<div id="btnEnableTriangle" class="btnEnableTriangle" onClick="hideTriangle('+i+')" ></div>'+
    if (modifiers[n].data[3].visible == 1){
        //$('.btnEnableTriangle').css('background-position','-24px 0');
        $('#tri-'+ n).find('.btnEnableTriangle').css('background-position','-24px 0');
        $('#tri-'+ n).css('opacity','0.2');
        modifiers[n].data[3].visible = 0;
    } else {
        //$('.btnEnableTriangle').css('background-position','0 0');
        $('#tri-'+ n).find('.btnEnableTriangle').css('background-position','0 0');
        modifiers[n].data[3].visible = 1;
        $('#tri-'+ n).css('opacity','1');
    }
    draw();
}

var drawPanel = function(tri){
    var string = "";
    for (var i=0; i<tri.length; i++){
        var bgColor = tri[i].color;
        var id = tri[i].id;
        //Draw list of vertex
        string += 
        '<div id="tri-'+i+'" class="btnTriangle" style="background-color:'+bgColor+'">'+
            '<div id="btnEnableTriangle" class="btnEnableTriangle" onClick="hideTriangle('+i+')" ></div>'+
            '<div id="v-'+id+'-v0" class="btnVertex" onClick="selectVertex('+i+',0)" >1</div>'+
            '<div id="v-'+id+'-v1" class="btnVertex" onClick="selectVertex('+i+',1)" >2</div>'+
            '<div id="v-'+id+'-v2" class="btnVertex" onClick="selectVertex('+i+',2)" >3</div>'+
            '<div id="btnPencil" class="btnPencil" style="background-position: 0 0;" onClick="selectTriangle('+i+')" ></div>'+
        '</div>';
    }
    
    document.getElementById("panel").innerHTML = string;
}

var draw = function(){
    //console.log("draw()");

    // clear helpers container
    document.getElementById("helpers").innerHTML = "";

    // clear triangles container
    var content="";

    for (var i=0; i<triangles.length; i++){
        if(modifiers[i].data[3].visible == 1){
            content += drawTriangle(i,triangles[i].vertices, modifiers[i], triangles[i].color, triangles[i].id);
        }
    }
    document.getElementById("mainContainer").innerHTML = content;
}

// pset(t,Pmediox,Pmedioy,"001","Punto medio");
var PSET = function(triangle_id,x,y,id,text){
    var string = document.getElementById("helpers").innerHTML;
    document.getElementById("helpers").innerHTML = string + '<div id="helper'+id+'"class="helper" style="top:'+y+'px; left:'+x+'px"><SPAN class="help-text">'+text+'</SPAN></div>';
}

// Create traslation values array
var modifiers = [];
for (var i = 0; i < triangles.length; i++){
    modifiers[i] = {"data":[{x:0,y:0},{x:0,y:0},{x:0,y:0},{visible:1}]};
}

drawPanel(triangles);

var selectedTriangle = 0;
var selectedVertex = 0; 

var go = false;
var lastTime = new Date().getTime();
var movId;
var animate = function() {
    //console.log("animate()");
    var rightNow = new Date().getTime();
    if ((rightNow - lastTime)>250){
            lastTime = rightNow;
            draw();
    }
    if (go) movId = window.requestAnimationFrame(animate);
};

draw();
setSelectorPosition(0,0);
animate();