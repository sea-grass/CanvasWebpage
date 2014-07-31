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
    if (!dom_element.hasChildNodes()) {
      dom_element.innerHTML = name;
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
    dom_element.innerHTML="<canvas id='"+canvas_id+"' height='"+Number.parseInt(computeHeight())+"' width='"+Number.parseInt(computeWidth())+"'></canvas>";
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