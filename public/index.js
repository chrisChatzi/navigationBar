let objClass = new ccClass();
let obj = {
    content : "cc-content",
    attrs : {
        position : "left",
        color : "#fff",                                 //color
        background : "#242428",                         //background
        opacity : 1,                                    //opacity of header
        fixed : false,                                   //fixed header or not
        padding : 30,                                   //left-right padding
        height : 70,                                    //height of header
        borderBottom : "0",                             //border at bottom
        shadow : "3px 2px 2px 2px rgba(0,0,0,0.25)",    //shadow at bottom
        scrolledRatio : 1.5,                            //change header size when not at top
        item : {
            color : "",
            background : "",
            backgroundImage : "",
            width : 0,                                  //width of item (if <=0 it becomes auto)
            padding : 20,                               //menu item left-right padding,
            border: "",
            margin : 1,
            align : "center",
            fontStyle : "",
            fontWeight : ""
        },
        hover : {
            color : "#777",
            background : "#454548"
        }
    },
    active : {
        color : "red",                                  //active item color
        background : "",                                 //active item background
        decoration : "",
        fontStyle : "",
        fontWeight : ""
    },
    mobile : {
        itemHeight : 40,                                //height of mobilemenu item
        itemPadding : 5,                                //top-bottom padding of mobilemenu item
    },
    logo : {
        width : 100,                                    //logo width
        padding : 40,                                   //logo left-right padding
        align : "center",                               //logo align
    },
    bar : {
        alwaysOn : false,                               //always show bar button and hide items
        width : 40,                                     //width of bars button
        color : "#fff"                                  //color of bar lines
    },
    menus : ["Home", "About", "Contact", "instagram", "./css/img/me.jpg"],
    menuTitles : ["","","","Follow us on Instantgram", "Profile"],
    menuLinks : ["","","",""]
};
objClass.init(obj);

////
//set content info position
function setContent(){
    let h = window.innerHeight;
    document.getElementById("cc-title").style.height = (h-obj.attrs.height)+"px";
    document.getElementById("cc-title").style.lineHeight = (h-obj.attrs.height)+"px";
    for(i=0; i<document.getElementsByClassName("infoMain").length; i++)
        document.getElementsByClassName("infoMain")[i].style.paddingTop = (window.innerHeight/2.25-obj.attrs.height)+"px";
    document.getElementById("json-main").style.height = (h-obj.attrs.height)+"px";
}
setContent();
// resize
window.addEventListener('resize', function(e){
    setContent();
}, false);

let anime = "travel linear 1.5s 1 forwards";
// dots handler
var dots = document.getElementsByClassName("dot");

var dotsHandler = function(e) {
    let id = e.target.id;
    if(!id) id = e.target.parentElement.id
    let screen = id.substring(3,4)
    let info = document.getElementsByClassName("info");
    let dot = document.getElementsByClassName("dot");
    for(let i=0, l=info.length; i<l; i++){
        info[i].style.display = "none";
        dot[i].innerHTML = '<i class="fa fa-circle-thin"></i>';
    }
    document.getElementById("info"+screen).style.display = "block";
    document.getElementById("info"+screen).style.animation = anime;
    document.getElementById("dot"+screen).innerHTML = '<i class="fa fa-circle"></i>';
};

for (var i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', dotsHandler, false);
}
//wheel navigation
let screen = 1;
window.addEventListener('wheel', function(e){
    if(e.deltaY > 0) screen++;
    else screen--;
    if(screen == 4) screen = 1;
    if(screen == 0) screen = 3;
    let info = document.getElementsByClassName("info");
    let dot = document.getElementsByClassName("dot");
    for(let i=0, l=info.length; i<l; i++){
        info[i].style.display = "none";
        dot[i].innerHTML = '<i class="fa fa-circle-thin"></i>';
    }
    document.getElementById("info"+screen).style.display = "block";
    document.getElementById("info"+screen).style.animation = anime;
    document.getElementById("dot"+screen).innerHTML = '<i class="fa fa-circle"></i>';
}, false);

// getting started & default themes handler
var buttons = document.getElementsByClassName("infoButton");

var buttonsHandler = function(e) {
    if(e.target.id == "cc-start"){
        document.getElementById("cc-title").style.display = "none";
        document.getElementById("cc-json").style.display = "block";
    }else objClass.default(e.target.id);
};

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', buttonsHandler, false);
}
//getting started preview code
var previewButtons = document.getElementsByClassName("cc-item");

var previewButtonsHandler = function(e) {
    for (var i = 0; i < previewButtons.length; i++) {
        previewButtons[i].classList.remove("play-active");
    }
    document.getElementById(e.target.id).classList += " play-active";
    let id = document.getElementById("preview");
    id.innerHTML = "";
    //
        let p1 = document.createElement("p");
        let span1 = document.createElement("span");
        let span2 = document.createElement("span");
        span1.style.color = "#f4d03f";
        span1.innerHTML = "let ";
        span2.style.color = "#59abe3";
        span2.innerHTML = "obj";
        p1.appendChild(span1);
        p1.appendChild(span2);
        p1.innerHTML += " = {";
        id.appendChild(p1);
    let keys = [];
    switch(e.target.id){
        case "play-header":
            keys = [["color", "#fff", "", ","], ["background", "#242428", "", ","], ["height", "70", "px", ""]];
        break;
        case "play-hover":
            keys = [["color", "#fff", "", ","], ["background", "#242428", "", ""]];
        break;
        case "play-active":
            let spanInfo = document.createElement("p");
            spanInfo.classList += " item";
            spanInfo.style.color = "#d2d7d3";
            spanInfo.innerHTML = "/* After you change an attribute click on a header item */";
            id.appendChild(spanInfo);
            keys = [["color", "red", "", ","], ["background", "#242428", "", ","], ["fontWeight", "normal", "", ""]];
        break;
    }
    for(let i=0; i<keys.length; i++) id.appendChild(addHtml(e.target.id, keys[i][0], keys[i][1], keys[i][2], keys[i][3]));
    //
        let p3 = document.createElement("p");
        p3.innerHTML += "};";
        id.appendChild(p3);
};

function addHtml(id, key, text, unit, comma){
    let pEl = document.createElement("p");
    pEl.classList += " item";
    let spanKey1 = document.createElement("span");
    let spanSep = document.createElement("span");
    let spanUnit = document.createElement("span");
    let spanVal1 = document.createElement("input");
    spanKey1.style.color = "#90C695";
    spanKey1.innerHTML = key;
    spanSep.innerHTML = " : ";
    spanVal1.classList += "previewInput";
    spanVal1.value = text;
    spanVal1.id = id+"-"+key;
    spanVal1.addEventListener('keyup', function(e){
        let id = e.target.id;
        let attr = id.substring(id.lastIndexOf("-")+1, id.length);
        id = id.substring(id.indexOf("-")+1, id.lastIndexOf("-"));
        switch(id){
            case "header":
                obj.attrs[attr] = e.target.value;
                objClass.init(obj);
            break;
            case "hover":
                obj.attrs.hover[attr] = e.target.value;
                objClass.init(obj);
            break;
            case "active":
                obj.active[attr] = e.target.value;
                objClass.init(obj);
            break;
        }
    }, false);
    if(key == "menus") spanVal1.style.width = "auto"
    spanUnit.style.color = "#90C695";
    spanUnit.innerHTML = unit+comma;
    pEl.appendChild(spanKey1);
    pEl.appendChild(spanSep);
    pEl.appendChild(spanVal1);
    pEl.appendChild(spanUnit);
    return pEl;
}

for (var i = 0; i < previewButtons.length; i++) {
    previewButtons[i].addEventListener('click', previewButtonsHandler, false);
}

//back
document.getElementById("json-back").addEventListener('click', function(){
    document.getElementById("cc-title").style.display = "block";
    document.getElementById("cc-json").style.display = "none";
}, false);
