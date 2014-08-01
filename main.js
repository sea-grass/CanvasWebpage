var elements = {
  "container": document.querySelector("#container"),
  "header": document.querySelector("#header"),
  "body": document.querySelector("#body"),
  "left_sidebar": document.querySelector("#left_sidebar"),
  "content": document.querySelector("#content"),
  "right_sidebar": document.querySelector("#right_sidebar"),
  "footer": document.querySelector("#footer")
},
content_elements = {};

//Name all the content areas and also
//Put them in an object, content_elements
for (var key in elements) {
  (function(name, dom_element) {
    if (dom_element.childElementCount==0) {
      content_elements[name] = dom_element;
    }
  }(key, elements[key]));
}

//For each of the content elements,
//Insert a canvas that will take up all of its space
//Modifies content_elements to:
//content_elements = {
//  dom_id: {
//    "dom_el": dom_element,
//    "ctx": the context of the canvas within the dom_element
//  }
//}
for (var key in content_elements) {
  (function(name, dom_element) {
    var computeHeight = function() {
      return window.getComputedStyle(dom_element).height.substring(0,window.getComputedStyle(dom_element).height.length-2);
    };
    var computeWidth = function() {
      return window.getComputedStyle(dom_element).width.substring(0,window.getComputedStyle(dom_element).width.length-2);
    };
    var canvas_id = name+"_pjs";
    dom_element.appendChild(function(canvas, id, height, width){
      canvas.id = canvas_id;
      canvas.height = height;
      canvas.width = width;
      canvas.style.position = "absolute";
      canvas.style.top = 0;
      canvas.style.left = 0;
      return canvas;
    }(document.createElement("canvas"),canvas_id,Number.parseInt(computeHeight()),Number.parseInt(computeWidth())));
    content_elements[key].appendChild(function(p,text){
      p.innerHTML=text;
      return p;
      }(document.createElement("p"),content_elements[key].id));
    content_elements[key] = {
      "dom_el": content_elements[key],
      "ctx": document.getElementById(canvas_id).getContext("2d") 
    };
  }(key, content_elements[key]));
}

console.log(content_elements);

//Shorthand for now because I'm lazy
var els = content_elements;

//              //
//header canvas
//              //
(function(ctx){
  
  var computeHeight = function() {
    return window.getComputedStyle(ctx.canvas.parentElement).height.substring(0,window.getComputedStyle(ctx.canvas.parentElement).height.length-2);
  };
  var computeWidth = function() {
    return window.getComputedStyle(ctx.canvas.parentElement).width.substring(0,window.getComputedStyle(ctx.canvas.parentElement).width.length-2);
  };
    
  //Add draw method
  function draw() {
/*
    ctx.font = "20px Georgia";
    ctx.fillStyle = "#4b4b4b";
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.fillStyle = "#e9e9e9";
    ctx.fillText("canvas#"+ctx.canvas.id, 10, 50);
    
    //Add navbar
    ctx.fillStyle = "#abcbac";
    ctx.fillRect(0,ctx.canvas.height-"59",ctx.canvas.width,17);
      
    for (var i = 0, n = 5, w = ctx.canvas.width / n; i < ctx.canvas.width; i+=w) {
      ctx.fillStyle = "#333";
      ctx.fillRect(i, ctx.canvas.height-"54",i+1,ctx.canvas.height);
      ctx.fillStyle = "#aaa";
      ctx.fillRect(i+1, ctx.canvas.height-"54",i+w,ctx.canvas.height);
      
      
      ctx.fillStyle = "#fff";
      ctx.fillText((i/w)+1, i, ctx.canvas.height-"34");
    }
*/
  }
  function sketchProc(processing) {
    //Override draw function, by default it will be called 60 times per second
    processing.draw = function() {
	processing.height = ctx.canvas.height;
        processing.width = ctx.canvas.width;
      //determine center and max clock arm length
      var centerX = processing.width / 2, centerY = processing.height / 2;
      var maxArmLength = Math.min(centerX, centerY);

      function drawArm(position, lengthScale, weight) {
        processing.strokeWeight(weight);
        processing.line(centerX, centerY,
          centerX + Math.sin(position * 2 * Math.PI) * lengthScale * maxArmLength,
          centerY - Math.cos(position * 2 * Math.PI) * lengthScale * maxArmLength);
      }

      //erase background
      processing.background(224);

      var now = new Date();

      //Moving hours arm by small increments
      var hoursPosition = (now.getHours() % 12 + now.getMinutes() / 60) / 12;
      drawArm(hoursPosition, 0.5, 5);

      //Moving minutes arm by small increments
      var minutesPosition = (now.getMinutes() + now.getSeconds() / 60) / 60;
      drawArm(minutesPosition, 0.80, 3);

      //Moving hour arm by second increments
      var secondsPosition = now.getSeconds() / 60;
      drawArm(secondsPosition, 0.90, 1);
    };
  }


  function computeAndDraw(e) {
    var width = Number.parseInt(computeWidth()),
    height = Number.parseInt(computeHeight());
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    draw();
  }
  //Add resize event
  window.addEventListener('resize', computeAndDraw);
  computeAndDraw();
  var processingInstance = new Processing(ctx.canvas, sketchProc);
  processingInstance.height = ctx.canvas.height;
  processingInstance.width = ctx.canvas.width;
}(els["header"].ctx));

//              //
//left_sidebar canvas
//              //
(function(ctx){
  
  var computeHeight = function() {
    return window.getComputedStyle(ctx.canvas.parentElement).height.substring(0,window.getComputedStyle(ctx.canvas.parentElement).height.length-2);
  };
  var computeWidth = function() {
    return window.getComputedStyle(ctx.canvas.parentElement).width.substring(0,window.getComputedStyle(ctx.canvas.parentElement).width.length-2);
  };
  
  function draw() {
    ctx.font = "20px Georgia";
    ctx.fillStyle = "#4b4b4b";
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.fillStyle = "#e9e9e9";
    ctx.fillText("canvas#"+ctx.canvas.id, 10, 50);
  }
  
  function computeAndDraw(e) {
    var width = Number.parseInt(computeWidth()),
    height = Number.parseInt(computeHeight());
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    draw();
  }
  //Add resize event
  window.addEventListener('resize', computeAndDraw);
  computeAndDraw();
}(els["left_sidebar"].ctx));

//              //
//content canvas
//              //
(function(ctx){
  
  var computeHeight = function() {
    return window.getComputedStyle(ctx.canvas.parentElement).height.substring(0,window.getComputedStyle(ctx.canvas.parentElement).height.length-2);
  };
  var computeWidth = function() {
    return window.getComputedStyle(ctx.canvas.parentElement).width.substring(0,window.getComputedStyle(ctx.canvas.parentElement).width.length-2);
  };
  
  function draw() {
    ctx.font = "20px Georgia";
    ctx.fillStyle = "#4b4b4b";
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.fillStyle = "#e9e9e9";
    ctx.fillText("canvas#"+ctx.canvas.id, 10, 50);
  }
  
  function computeAndDraw(e) {
    var width = Number.parseInt(computeWidth()),
    height = Number.parseInt(computeHeight());
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    draw();
  }
  //Add resize event
  window.addEventListener('resize', computeAndDraw);
  computeAndDraw();
}(els["content"].ctx));

//              //
//right_sidebar canvas
//              //
(function(ctx){
  
  var computeHeight = function() {
    return window.getComputedStyle(ctx.canvas.parentElement).height.substring(0,window.getComputedStyle(ctx.canvas.parentElement).height.length-2);
  };
  var computeWidth = function() {
    return window.getComputedStyle(ctx.canvas.parentElement).width.substring(0,window.getComputedStyle(ctx.canvas.parentElement).width.length-2);
  };
  
  function draw() {
    ctx.font = "20px Georgia";
    ctx.fillStyle = "#4b4b4b";
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.fillStyle = "#e9e9e9";
    ctx.fillText("canvas#"+ctx.canvas.id, 10, 50);
  }
  
  function computeAndDraw(e) {
    var width = Number.parseInt(computeWidth()),
    height = Number.parseInt(computeHeight());
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    draw();
  }
  //Add resize event
  window.addEventListener('resize', computeAndDraw);
  computeAndDraw();
}(els["right_sidebar"].ctx));

//              //
//footer canvas
//              //
(function(ctx){
  
  var computeHeight = function() {
    return window.getComputedStyle(ctx.canvas.parentElement).height.substring(0,window.getComputedStyle(ctx.canvas.parentElement).height.length-2);
  };
  var computeWidth = function() {
    return window.getComputedStyle(ctx.canvas.parentElement).width.substring(0,window.getComputedStyle(ctx.canvas.parentElement).width.length-2);
  };
  
  function draw() {
    ctx.font = "20px Georgia";
    ctx.fillStyle = "#4b4b4b";
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.fillStyle = "#e9e9e9";
    ctx.fillText("canvas#"+ctx.canvas.id, 10, 50);
  }
  
  function computeAndDraw(e) {
    var width = Number.parseInt(computeWidth()),
    height = Number.parseInt(computeHeight());
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    draw();
  }
  //Add resize event
  window.addEventListener('resize', computeAndDraw);
  computeAndDraw();
}(els["footer"].ctx));
