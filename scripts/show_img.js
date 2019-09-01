/* global
document, window, clearTimeout, setTimeout
*/

function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById) {return false; }
    if (!document.getElementById(elementID)) {return false; }
    var elem = document.getElementById(elementID);
    if (elem.movement) { clearTimeout(elem.movement); }
    if (!elem.style.marginLeft) { elem.style.marginLeft = "0px"; }
    if (!elem.style.marginTop) { elem.style.marginTop = "0px"; }

    var xpos = parseInt(elem.style.marginLeft);
    var ypos = parseInt(elem.style.marginTop);
    var dist = 0;
    
    if (xpos < final_x) {
        dist = Math.ceil((final_x - xpos) / 10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        dist = Math.ceil((xpos - final_x) / 10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        dist = Math.ceil((final_y - ypos) / 10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        dist = Math.ceil((ypos - final_y) / 10);
        ypos = ypos - dist;
    }
    elem.style.marginLeft = xpos + "px";
    elem.style.marginTop = ypos + "px";
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
    elem.movement = setTimeout(repeat, interval);
}

var thumb_position = 0;
var end_position = 0;

function prepare_img() {
    
    if (!document.getElementsByTagName) {return false; }
    if (!document.getElementById) {return false; }
    if (!document.getElementById("thumb_img_div")) {return false; }
    
    var thumb_list = document.getElementById("thumb_img_div");
    
    var display_text = document.getElementById("img_note");
    var display_text_flag = false;
    display_text.onmouseover = function display_text_mouseover() {
        display_text.parentElement.style.borderTop = "1px solid rgba(0,0,0,0.5)";
        display_text.parentElement.style.borderLeft = "1px solid rgba(0,0,0,0.5)";
        display_text.parentElement.style.borderRight = "1px solid rgba(0,0,0,0.5)";
        display_text.parentElement.style.borderBottom = "1px solid rgba(0,0,0,0.5)";
        return false;
    };
    display_text.onmouseout = function () {
        display_text.parentElement.style.borderTop = "0px solid rgba(0,0,0,0.5)";
        display_text.parentElement.style.borderLeft = "0px solid rgba(0,0,0,0.5)";
        display_text.parentElement.style.borderRight = "2px solid rgba(0,0,0,0.5)";
        display_text.parentElement.style.borderBottom = "2px solid rgba(0,0,0,0.5)";
        return false;
    };
    display_text.onclick = function () {
        display_text.parentElement.style.borderTop = "2px solid rgba(0,0,0,0.5)";
        display_text.parentElement.style.borderLeft = "2px solid rgba(0,0,0,0.5)";
        display_text.parentElement.style.borderRight = "0px solid rgba(0,0,0,0.5)";
        display_text.parentElement.style.borderBottom = "0px solid rgba(0,0,0,0.5)";
        
    var img_description = document.getElementById("large_img_description");
        display_text_flag = !display_text_flag;
        if (display_text_flag) {
            display_text.firstChild.nodeValue = "Hide image description";
            img_description.style.display = "block";
        } else {
            display_text.firstChild.nodeValue = "Show image description";
            img_description.style.display = "none";
        }      
        return false;
    };
    
    var about_me = document.getElementById("about_me");
    var about_me_flag = false;
    about_me.onmouseover = function display_text_mouseover() {
        about_me.parentElement.style.borderTop = "1px solid rgba(0,0,0,0.5)";
        about_me.parentElement.style.borderLeft = "1px solid rgba(0,0,0,0.5)";
        about_me.parentElement.style.borderRight = "1px solid rgba(0,0,0,0.5)";
        about_me.parentElement.style.borderBottom = "1px solid rgba(0,0,0,0.5)";
        return false;
    };
    about_me.onmouseout = function () {
        about_me.parentElement.style.borderTop = "0px solid rgba(0,0,0,0.5)";
        about_me.parentElement.style.borderLeft = "0px solid rgba(0,0,0,0.5)";
        about_me.parentElement.style.borderRight = "2px solid rgba(0,0,0,0.5)";
        about_me.parentElement.style.borderBottom = "2px solid rgba(0,0,0,0.5)";
        return false;
    };
    about_me.onclick = function () {
        about_me.parentElement.style.borderTop = "2px solid rgba(0,0,0,0.5)";
        about_me.parentElement.style.borderLeft = "2px solid rgba(0,0,0,0.5)";
        about_me.parentElement.style.borderRight = "0px solid rgba(0,0,0,0.5)";
        about_me.parentElement.style.borderBottom = "0px solid rgba(0,0,0,0.5)";
        
        var all_img_display = document.getElementById("all_image_display");
        var about_me_div = document.getElementById("about_me_div");
        about_me_flag = !about_me_flag;
        if (about_me_flag) {
            about_me.firstChild.nodeValue = "Back to gallery";
            all_img_display.style.display = "none";
            about_me_div.style.display = "block";
        } else {
            about_me.firstChild.nodeValue = "About Me ...";
            about_me_div.style.display = "none";
            all_img_display.style.display = "block";
        }      
        return false;
    };

    var thumb_imgs = thumb_list.getElementsByTagName("img");
    end_position = thumb_imgs[thumb_imgs.length -1].offsetLeft
                    + thumb_imgs[thumb_imgs.length -1].width
                    - Math.floor(parseInt(window.innerWidth) / 1.8) + 90;
    
    var scroll_left = document.getElementById("scroll_left_img");
    var scroll_right = document.getElementById("scroll_right_img");
    var movement_length = Math.floor(parseInt(window.innerWidth) * 0.8 / 1.8);
    
    scroll_left.onmouseover = function() {
        scroll_left.setAttribute("src", "texture/left1.png"); return false;}
    scroll_left.onmouseout = function() {
        scroll_left.setAttribute("src", "texture/left0.png"); return false;}
    scroll_left.onclick = function() {
            if (thumb_position + movement_length < 0) {
                moveElement("thumb_list_ul", thumb_position += movement_length, 0, 10); }
            else {
                thumb_position = 0;
                moveElement("thumb_list_ul", 0, 0, 10);
        }
        return false;
    }

    scroll_right.onmouseover = function() {
        scroll_right.setAttribute("src", "texture/right1.png"); return false;}
    scroll_right.onmouseout = function() {
        scroll_right.setAttribute("src", "texture/right0.png"); return false;}
    scroll_right.onclick = function() {
            if (thumb_position - movement_length + end_position > 0) {
                moveElement("thumb_list_ul", thumb_position -= movement_length, 0, 10); }
            else {
                thumb_position = -end_position;
                moveElement("thumb_list_ul", -end_position, 0, 10);
        }
        return false;
    }
    
    var prev_img = document.getElementById("leftarrow");
    var next_img = document.getElementById("rightarrow");
    prev_img.onmouseover = function() {prev_img.setAttribute("src", "texture/prev1.png"); return false;}
    prev_img.onmouseout = function() {prev_img.setAttribute("src", "texture/prev0.png"); return false;}
    next_img.onmouseover = function() {next_img.setAttribute("src", "texture/next1.png"); return false;}
    next_img.onmouseout = function() {next_img.setAttribute("src", "texture/next0.png"); return false;}

    var thumb_links = thumb_list.getElementsByTagName("a");
 
    for (var j = 0; j < thumb_links.length; j++) {
        thumb_links[j].setAttribute("a_index", j);
        thumb_links[j].onclick = function() {
            show_img(this, thumb_links.length - 1);
            return false;
        }
    }
}

var last_img = 0;

function show_img(img_id, max_index) {
    if (!document.getElementById("placeholder")) {return false; }
    var source = img_id.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName !== "IMG") {return false;}
    placeholder.setAttribute("src", source);
    placeholder.parentElement.setAttribute("href", source);

    thumb_position = -img_id.offsetLeft + 
                    parseInt(document.getElementById("thumb_list_ul").style.marginLeft) +
                    Math.floor(parseInt(window.innerWidth) * 0.2);

    if (thumb_position > 0) {thumb_position = 0; }
    if (thumb_position < -end_position) {thumb_position = -end_position; }
    moveElement("thumb_list_ul", thumb_position, 0, 10); 
    
    if (last_img != 0) {last_img.style.border = "7px solid rgba(255,255,255,0.5)";}
    img_id.childNodes[1].style.border = "7px solid rgba(70,150,255,0.5)";
    last_img = img_id.childNodes[1];
    
    var prev_img_button = document.getElementById("previous_large");
    var next_img_button = document.getElementById("next_large");
    var img_index = img_id.getAttribute("a_index");
    var thumb_list = document.getElementById("thumb_img_div");
    var thumb_links = thumb_list.getElementsByTagName("a");
    
    
    if (img_index == 0) {
        prev_img_button.onclick = function() {show_img(thumb_links[max_index], max_index); return false;}
        next_img_button.onclick = function() {show_img(thumb_links[1], max_index); return false;}
    } else if (img_index == max_index) {
        prev_img_button.onclick = function() {show_img(thumb_links[max_index-1], max_index); return false;}
        next_img_button.onclick = function() {show_img(thumb_links[0], max_index); return false;}
    } else {
        prev_img_button.onclick = function() {show_img(thumb_links[img_index-1], max_index); return false;}
        next_img_button.onclick = function() {show_img(thumb_links[parseInt(img_index)+1], max_index); return false;}
    }
    
    var text = img_id.getAttribute("img_note") ? img_id.getAttribute("img_note") : "";
    var description = document.getElementById("large_img_description");
    description.firstChild.nodeValue = text;
}


document.body.onselectstart = document.body.ondrag = function(){
    return false;
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        };
    }
}

addLoadEvent(prepare_img);
