(function(){
    'use strict';
    let i=0,l=0;
    let ccClass = function(){
        this.headerElem = document.getElementById("cc-header");
        this.headerLogo = document.getElementById("cc-header-logo");
        this.headerMobile = document.getElementById("cc-header-mobile");
        this.content = "";
        this.items = document.getElementById("cc-header-ul");
        this.bars = document.getElementById("cc-header-bars");
        this.itemList = document.getElementById("cc-header-ul");
        this.liElems = document.getElementsByClassName('cc-header-ul-li');
        this.liElemsMobile = document.getElementsByClassName('cc-header-sub-ul-li');
        this.mobileCreated = false;     //check if mobile menu has been created
        this.activeItem = -1;

        this.header = {
            content : "",
            attrs : {
                position : "left",
                color : "#fff",                                 //color
                background : "#242428",                         //background
                opacity : 1,                                    //opacity of header
                fixed : true,                                   //fixed header or not
                padding : 30,                                   //left-right padding
                height : 70,                                    //height of header
                borderBottom : "",                              //border at bottom
                shadow : "3px 2px 2px 2px rgba(0,0,0,0.25)",    //shadow at bottom
                scrolledRatio : 1,                              //change header size when not at top
                item : {
                    color : "",
                    background : "",
                    backgroundImage : "",
                    width : 100,                                //width of item (if <=0 it becomes auto)
                    padding : 20,                               //menu item left-right padding,
                    border: "",
                    margin : 1,
                    align : "center",
                    fontStyle  : "",
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
                fontStyle  : "",
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
                alwaysOn : true,                               //always show bar button and hide items
                width : 40,                                     //width of bars button
                color : "#fff"                                  //color of bar lines
            },
            menus : ["Home", "About", "Contact" /*"./css/img/me.jpg"*/],
            menuTitles : [],
            menuLinks : []
        };
    }
    ccClass.prototype = {
        init : function(obj, updateOnly){
            let self = this;
            this.header = {
                content : obj.content,
                attrs : {
                    position : (obj.attrs.position) ? obj.attrs.position : this.header.attrs.position,
                    color : (obj.attrs.color) ? obj.attrs.color : this.header.attrs.color,
                    background : (obj.attrs.background) ? obj.attrs.background : this.header.attrs.background,
                    opacity : (obj.attrs.opacity) ? obj.attrs.opacity : this.header.attrs.opacity,
                    fixed : (obj.attrs.fixed),
                    padding : (obj.attrs.padding) ? obj.attrs.padding : this.header.attrs.padding,
                    height : (obj.attrs.height) ? obj.attrs.height : this.header.attrs.height,
                    borderBottom : (obj.attrs.borderBottom) ? obj.attrs.borderBottom : this.header.attrs.borderBottom,
                    shadow : (obj.attrs.shadow) ? obj.attrs.shadow : this.header.attrs.shadow,
                    scrolledRatio : (obj.attrs.scrolledRatio) ? obj.attrs.scrolledRatio : this.header.attrs.scrolledRatio,
                    item : {
                        color : (obj.attrs.item.color) ? obj.attrs.item.color : this.header.attrs.color,
                        background : (obj.attrs.item.background) ? obj.attrs.item.background : this.header.attrs.background,
                        backgroundImage : (obj.attrs.item.backgroundImage) ? obj.attrs.item.backgroundImage : this.header.attrs.item.backgroundImage,
                        width : (obj.attrs.item.width) ? obj.attrs.item.width : this.header.attrs.item.width,
                        padding : (obj.attrs.item.padding) ? obj.attrs.item.padding : this.header.attrs.item.padding,
                        border: (obj.attrs.item.border) ? obj.attrs.item.border : this.header.attrs.item.border,
                        margin: (obj.attrs.item.margin) ? obj.attrs.item.margin : this.header.attrs.item.margin,
                        align: (obj.attrs.item.align) ? obj.attrs.item.align : this.header.attrs.item.align,
                        fontStyle: (obj.attrs.item.fontStyle) ? obj.attrs.item.fontStyle : this.header.attrs.item.fontStyle,
                        fontWeight: (obj.attrs.item.fontWeight) ? obj.attrs.item.fontWeight : this.header.attrs.item.fontWeight,
                    },
                    hover : {
                        color : (obj.attrs.hover.color) ? obj.attrs.hover.color : this.header.atts.hover.color,
                        background : (obj.attrs.hover.background) ? obj.attrs.hover.background : this.header.atts.hover.background
                    }
                },
                active : {
                    color : (obj.active.color) ? obj.active.color : this.header.active.color,
                    background : (obj.active.background) ? obj.active.background : this.header.active.background,
                    decoration : (obj.active.decoration) ? obj.active.decoration : this.header.active.decoration,
                    fontStyle : (obj.active.fontStyle) ? obj.active.fontStyle : this.header.active.fontStyle,
                    fontWeight : (obj.active.fontWeight) ? obj.active.fontWeight : this.header.active.fontWeight
                },
                mobile : {
                    itemHeight : (obj.mobile.itemHeight) ? obj.mobile.itemHeight : this.header.mobile.itemHeight,
                    itemPadding :(obj.mobile.itemPadding) ? obj.mobile.itemPadding : this.header.mobile.itemPadding
                },
                logo : {
                    width : (obj.logo.width) ? obj.logo.width : this.header.logowidth,
                    padding :(obj.logo.padding) ? obj.logo.padding : this.header.logo.padding,
                    align : (obj.logo.align) ? obj.logo.align : this.header.logo.align
                },
                bar : {
                    alwaysOn :  obj.bar.alwaysOn ,
                    width : (obj.bar.width) ? obj.bar.width : this.header.bar.width,
                    color : (obj.bar.color) ? obj.bar.color : this.header.bar.color
                },
                menus : (obj.menus.length > 0) ? obj.menus : this.header.menus,
                menuTitles : (obj.menuTitles.length > 0) ? obj.menuTitles : this.header.menuTitles,
                menuLinks : (obj.menuLinks.length > 0) ? obj.menuLinks : this.header.menuLinks,
            }
            this.setBasic();
            this.createItems(this.itemList);
            this.checkWidth(this.itemList, self);
            if(!updateOnly){
            // event listeners
                // item click and hover
                for (i=0, l=this.liElems.length; i<l; i++)
                    this.liElems[i].addEventListener('click', function(e){self.itemClickHandler(e, self)}, false);
                for (i=0, l=this.liElems.length; i<l; i++)
                    this.liElems[i].addEventListener('touchend', function(e){self.itemClickHandler(e, self)}, false);
                for (i=0, l=this.liElems.length; i<l; i++)
                    this.liElems[i].addEventListener('mouseover', function(e){self.itemMouseoverHandler(e, self)}, false);
                for (i=0, l=this.liElems.length; i<l; i++)
                    this.liElems[i].addEventListener('mouseout', function(e){self.itemMouseoutHandler(e, self)}, false);
                //logo click
                document.getElementById("cc-header-logo").addEventListener('click', function(e){self.itemClickHandler(e, self)}, false);
                //bars click
                document.getElementById("cc-header-bars").addEventListener('click', function(e){self.barClickHandler(e, self)}, false);
                // resize
                window.addEventListener('resize', function(e){ self.checkWidth(self.itemList, self); }, false);
                //scroll
                window.addEventListener('scroll', function(e){self.scrollHandler(e, self)}, false);
            }
        },
        // set basic attributes
        setBasic : function(){
            // set header css
            Object.assign(this.headerElem.style, {
                color : this.header.attrs.color,
                background : this.header.attrs.background,
                width : "calc(100% - "+(this.header.attrs.padding*2)+"px)",
                padding : "0 "+this.header.attrs.padding+"px",
                height : this.header.attrs.height+"px",
                lineHeight : this.header.attrs.height+"px",
                position : (this.header.attrs.fixed) ? "fixed" : "inherit",
                opacity : this.header.attrs.opacity,
                borderBottom : this.header.attrs.borderBottom,
                boxShadow : this.header.attrs.shadow
            });
            //set content
            let elContent = document.getElementById(this.header.content)
            elContent.style.marginTop = (this.header.attrs.fixed) ? this.header.attrs.height+"px" : "0";
            // mobile
            Object.assign(this.headerMobile.style, {
                color : this.header.attrs.color,
                background : this.header.attrs.background,
                top : this.header.attrs.height+"px",
                borderBottom : this.header.attrs.borderBottom,
                boxShadow : this.header.attrs.shadow
            });
            // logo
            Object.assign(this.headerLogo.style, {
                width : this.header.logo.width+"px",
                padding : "0 "+this.header.logo.padding+"px",
                height : this.header.attrs.height+"px",
                lineHeight : this.header.attrs.height+"px",
                align : this.header.logo.align
            });
            // bar
            Object.assign(this.bars.style, {
                width : this.header.bar.width+"px",
                color : this.header.bar.color
            });
            for(i=0, l=document.getElementsByClassName("cc-line").length; i<l; i++){
                Object.assign(document.getElementsByClassName("cc-line")[i].style, {
                    width : (this.header.bar.width - 10)+"px",
                    background : this.header.bar.color,
                    top : this.header.attrs.height*(i*0.15 + 0.35)+"px"
                });
            }
        },
        // default themes
        default : function(theme){
            switch (theme) {
                case "cc-dark":
                    this.header.attrs.color = "#fff";
                    this.header.attrs.background = "#242428";
                    this.header.attrs.borderBottom = "0";
                    this.header.attrs.item.color = "#fff";
                    this.header.attrs.item.background = "#242428";
                    this.header.attrs.hover.color = "#c0392b";
                    this.header.attrs.hover.background = "#454548";
                    this.header.active.color = "#c0392b";
                    this.init(this.header, true);
                break;
                case "cc-light":
                    this.header.attrs.color = "#a9a9a9";
                    this.header.attrs.background = "#efefef";
                    this.header.attrs.borderBottom = "1px solid #ff3b3f";
                    this.header.attrs.item.color = "#a9a9a9";
                    this.header.attrs.item.background = "#efefef";
                    this.header.attrs.hover.color = "#ff3b3f";
                    this.header.attrs.hover.background = "#dcd0c0";
                    this.header.active.color = "#ff3b3f";
                    this.init(this.header, true);
                break;
                case "cc-blue":
                    this.header.attrs.color = "#f4f4f4";
                    this.header.attrs.background = "#07889b";
                    this.header.attrs.borderBottom = "0";
                    this.header.attrs.item.color = "#f4f4f4";
                    this.header.attrs.item.background = "#07889b";
                    this.header.attrs.hover.color = "#e37222";
                    this.header.attrs.hover.background = "#389faf";
                    this.header.active.color = "#e37222";
                    this.init(this.header, true);
                break;
                case "cc-gold":
                    this.header.attrs.color = "#f4f4f4";
                    this.header.attrs.background = "#c0b283";
                    this.header.attrs.borderBottom = "0";
                    this.header.attrs.item.color = "#f4f4f4";
                    this.header.attrs.item.background = "#c0b283";
                    this.header.attrs.hover.color = "#373737";
                    this.header.attrs.hover.background = "#ccc19b";
                    this.header.active.color = "#373737";
                    this.init(this.header, true);
                break;
            }
        },
        // create item list
        createItems : function (el){
            el.innerHTML = ""
            for(i=0, l=this.header.menus.length; i<l; i++){
                //append menu items to header
                let li = document.createElement("li");
                let arr = this.header.menus[i].split("");
                if(this.header.menus[i].indexOf("css/img") >= 0){
                    let img = new Image(40,40);
                    img.src = this.header.menus[i];
                    li.appendChild(img);
                }else if(this.header.menus[i].toLowerCase() == "facebook"){
                    let i = document.createElement("i");
                    i.classList += "fa fa-facebook";
                    li.appendChild(i)
                }else if(this.header.menus[i].toLowerCase() == "twitter"){
                    let i = document.createElement("i");
                    i.classList += "fa fa-twitter";
                    li.appendChild(i)
                }else if(this.header.menus[i].toLowerCase() == "google"){
                    let i = document.createElement("i");
                    i.classList += "fa fa-google-plus";
                    li.appendChild(i)
                }else if(this.header.menus[i].toLowerCase() == "instagram"){
                    let i = document.createElement("i");
                    i.classList += "fa fa-instagram";
                    li.appendChild(i)
                }else li.appendChild(document.createTextNode(this.header.menus[i]));
                li.title = this.header.menuTitles[i];
                li.setAttribute("name", this.header.menus[i]);
                li.classList = "cc-header-ul-li";
                let id = this.header.menus[i].trim();
                id = id.split('.').join("");
                id = id.split('/').join("");
                li.id = "cc-"+id;
                Object.assign(li.style, {
                    padding : "0 "+this.header.attrs.item.padding+"px",
                    color : this.header.attrs.item.color,
                    background : this.header.attrs.item.background,
                    backgroundImage : "url("+this.header.attrs.item.backgroundImage+")",
                    backgroundSize : "100% 100%",
                    backgroundRepeat : "no-repeat",
                    borderRight : this.header.attrs.item.border,
                    borderLeft : this.header.attrs.item.border,
                    margin : "0 "+this.header.attrs.item.margin+"px",
                    height : this.header.attrs.height+"px",
                    textAlign : this.header.attrs.item.align,
                    lineHeight : this.header.attrs.height+"px",
                    fontStyle : this.header.attrs.item.fontStyle,
                    fontWeight : this.header.attrs.item.fontWeight
                })

                if(this.header.attrs.itemWidth > 0) li.style.width = this.header.attrs.item.width+"px";
                else li.style.width = "auto";

                el.appendChild(li);
            }
        },
        // create item list (mobile mode)
        createItemsMobile : function(el){
            this.mobileCreated = true;
            for(i=0, l=this.header.menus.length; i<l; i++){
                //append menu items to header
                let li = document.createElement("li");
                if(this.header.menus[i].indexOf("css/img") >= 0){
                    let img = new Image(40,40);
                    img.src = this.header.menus[i];
                    li.appendChild(img);
                }else if(this.header.menus[i].toLowerCase() == "facebook"){
                    let i = document.createElement("i");
                    i.classList += "fa fa-facebook";
                    li.appendChild(i)
                }else if(this.header.menus[i].toLowerCase() == "twitter"){
                    let i = document.createElement("i");
                    i.classList += "fa fa-twitter";
                    li.appendChild(i)
                }else if(this.header.menus[i].toLowerCase() == "google"){
                    let i = document.createElement("i");
                    i.classList += "fa fa-google-plus";
                    li.appendChild(i)
                }else if(this.header.menus[i].toLowerCase() == "instagram"){
                    let i = document.createElement("i");
                    i.classList += "fa fa-instagram";
                    li.appendChild(i)
                }else li.appendChild(document.createTextNode(this.header.menus[i]));
                li.classList = "cc-header-sub-ul-li";
                //check which item is active and transfer it for mobile
                if(i == this.activeItem){
                    li.classList += " cc-header-active";
                    Object.assign(li.style, {
                        color : this.header.active.color,
                        background : this.header.active.background,
                        textDecoration : this.header.active.decoration,
                        fontStyle : this.header.active.fontStyle,
                        fontWeight : this.header.active.fontWeight
                    });
                }
                li.id = "cc-"+this.header.menus[i].trim()+"-mobile";
                li.style.padding = this.header.mobile.itemPadding+"px 0";
                li.style.height = this.header.mobile.itemHeight+"px";
                li.style.lineHeight = this.header.mobile.itemHeight+"px";
                el.appendChild(li);
            }
            //add listeners
            let self = this;
            for (i=0, l=this.liElemsMobile.length; i<l; i++)
                this.liElemsMobile[i].addEventListener('click', function(e){self.itemClickHandler(e, self)}, false);
        },
        //check if items+logo exceed header's width
        checkWidth : function (el, self){
            //close mobile submenu
            this.barClick(true, this);
            //check width of items, if it exceeds the window widths go to mobile mode
            if(self.header.bar.alwaysOn){
                self.items.style.display = "none";
                self.itemList.style.display = "none";
                self.bars.style.display = "block";
                self.headerLogo.style.padding = "0px";
            }else{
                if(self.headerElem.offsetWidth >= (el.offsetWidth+100+self.header.logo.width+self.header.logo.padding)
                    && !self.header.bar.alwaysOn){
                    self.items.style.display = "block";
                    self.bars.style.display = "none";
                    self.headerMobile.style.display = "none";
                    self.headerLogo.style.padding = "0 "+this.header.logo.padding+"px";
                }else{
                    self.items.style.display = "none";
                    self.itemList.style.display = "none";
                    self.bars.style.display = "block";
                    self.headerLogo.style.padding = "0px";
                }
            }
        },
        //show mobile menu
        showMobile : function (){
            this.headerMobile.style.display = "block";
            //check if mobile items submenu is already created
            if(!this.mobileCreated){
                let el = document.getElementById("cc-header-mobile-ul");
                el.innerHTML = "";
                this.createItemsMobile(el);
            }
        },

        // EVENTS
            //scroll
                scrollHandler : function(e, self){
                    let top  = window.pageYOffset || document.documentElement.scrollTop;
                    if(top > 0){
                        self.headerElem.style.height = self.header.attrs.height*self.header.attrs.scrolledRatio+"px";
                        self.headerLogo.style.height = self.header.attrs.height*self.header.attrs.scrolledRatio+"px";
                        self.headerLogo.style.lineHeight = self.header.attrs.height*self.header.attrs.scrolledRatio+"px";
                        for(i=0, l=self.liElems.length; i<l; i++){
                            self.liElems[i].style.height = self.header.attrs.height*self.header.attrs.scrolledRatio+"px";
                            self.liElems[i].style.lineHeight = self.header.attrs.height*self.header.attrs.scrolledRatio+"px";
                        }
                    }
                    else{
                        self.headerElem.style.height = self.header.attrs.height+"px";
                        self.headerLogo.style.height = self.header.attrs.height+"px";
                        self.headerLogo.style.lineHeight = self.header.attrs.height+"px";
                        for(i=0, l=this.liElems.length; i<l; i++){
                            self.liElems[i].style.height = self.header.attrs.height+"px";
                            self.liElems[i].style.lineHeight = self.header.attrs.height+"px";
                        }
                    }
                },
            // item click event handler
                itemClick : function(id, self){
                    let items = document.getElementsByClassName("cc-header-ul-li");
                    let itemsMobile = document.getElementsByClassName("cc-header-sub-ul-li");
                    //clear active style
                    for (i=0, l=self.liElems.length; i<l; i++) self.liElems[i].classList.remove("cc-header-active");
                    for (i=0, l=self.liElemsMobile.length; i<l; i++) self.liElemsMobile[i].classList.remove("cc-header-active");
                    //clear all
                    for(i=0, l=items.length; i<l; i++){
                        Object.assign(items[i].style, {
                            color : "",
                            background : "",
                            textDecoration : "",
                            fontStyle : "",
                            fontWeight : ""
                        });
                        if(itemsMobile.length > 0){
                            Object.assign(itemsMobile[i].style, {
                                color : "",
                                background : "",
                                textDecoration : "",
                                fontStyle : "",
                                fontWeight : ""
                            });
                        }
                    }
                    if(id == "cc-header-logo"){
                        //close mobile submenu
                        self.barClick(true, this);
                        return;
                    }
                    //add active style to clicked element for both full and mobile modes
                    document.getElementById(id).classList += " cc-header-active";
                    document.getElementById(id).style.background = "";
                    if(document.getElementById(id+"-mobile")){
                        document.getElementById(id+"-mobile").classList += " cc-header-active";
                        document.getElementById(id+"-mobile").style.background = "";
                    }
                    //check which item is active and change its style
                    for(i=0, l=document.getElementsByClassName("cc-header-active").length; i<l; i++){
                        Object.assign(document.getElementsByClassName("cc-header-active")[i].style, {
                            color : self.header.active.color,
                            background : self.header.active.background,
                            textDecoration : self.header.active.decoration,
                            fontStyle : self.header.active.fontStyle,
                            fontWeight : self.header.active.fontWeight
                        });
                        self.activeItem = i;
                    }
                },
                itemClickHandler : function(e, self){
                    //get id (also for mobile)
                    let id = e.target.id;
                    if(!id) id = e.target.parentElement.id;
                    if(e.target.id.indexOf("-mobile") >= 0) id = id.substring(0, e.target.id.lastIndexOf("-"));
                    //action
                    var self = this;
                    this.itemClick(id, self);
                    // TODO: handle the action here
                    let idx = -1;
                    for(i=0, l=self.header.menus.length; i<l; i++){
                        if(self.header.menus[i] == document.getElementById(id).attributes["name"].value) idx = i;
                    }
                    // self.header.menuLinks[idx];     ---> the link
                },
            //item mouse over/out
                itemMouseoverHandler : function(e, self){
                    let id = e.target.id;
                    if(!id) id = e.target.parentElement.id;
                    //if its not active
                    if(document.getElementById(id).className.indexOf("active") < 0){
                        document.getElementById(id).style.color = self.header.attrs.hover.color;
                        document.getElementById(id).style.background = self.header.attrs.hover.background;
                    }
                },
                itemMouseoutHandler : function(e, self){
                    let id = e.target.id;
                    if(!id) id = e.target.parentElement.id;
                    if(document.getElementById(id).className.indexOf("active") < 0){
                        document.getElementById(id).style.color = "";
                        document.getElementById(id).style.background = "";
                        document.getElementById(id).style.backgroundImage = "url("+self.header.attrs.item.backgroundImage+")";
                        document.getElementById(id).style.backgroundSize = "100% 100%";
                        document.getElementById(id).style.backgroundRepeat = "no-repeat";
                    }
                },
            //bars handler
                barClick : function(flag, self){
                    let top = document.getElementById("cc-lineTop");
                    let mid = document.getElementById("cc-lineMid");
                    let bot = document.getElementById("cc-lineBot");
                    if(flag){
                        self.headerMobile.style.display = "none";
                        top.classList.remove("cc-rotate");
                        top.classList += " cc-unrotate";
                        mid.classList.remove("cc-rotate2");
                        mid.classList += " cc-unrotate";
                        bot.classList.remove("cc-barHide");
                        bot.classList += " cc-barShow";
                    }else{                                      //show submenu
                        top.classList.remove("cc-unrotate");
                        top.classList += " cc-rotate";
                        mid.classList.remove("cc-unrotate");
                        mid.classList += " cc-rotate2";
                        bot.classList.remove("cc-barShow");
                        bot.classList += " cc-barHide";
                        self.showMobile();
                    }
                },
                barClickHandler : function(e, self){
                    if(self.headerMobile.style.display == "block") this.barClick(true, self);
                    else this.barClick(false, self);
                },
        }

    //exports
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = {
            init : init
        }
    else  window.ccClass = ccClass;
})();
