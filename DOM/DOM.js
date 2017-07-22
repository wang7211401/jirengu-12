/**
 * Created by pc on 2017/6/9.
 */
window.dom={};
window.dom.create = function (tagName,children,attributes) {
    var tag = document.createElement(tagName);
    if(typeof children === 'string'){
        var text =document.createTextNode(children);
        tag.appendChild(text);
    }else if(children instanceof HTMLElement){
        tag.appendChild(children)
    } else if(children instanceof Array){
        for(var i=0;i<children.length;i++){
            if(typeof children[i] === 'string'){
                tag.appendChild(document.createTextNode(children[i]))
            }else if(children[i] instanceof HTMLElement){
                tag.appendChild(children[i])
            }
        }
    }
    if (typeof attributes === 'object'){
        for(var key in attributes){
            tag.setAttribute(key,attributes[key])
        }
    }
    return tag;
};


window.dom.find = function(seletor,scape){
    if(scape instanceof HTMLElement){
        return scape.querySelectorAll(seletor)
    }else{
        return document.querySelectorAll(seletor)
    }
};

window.dom.empty = function(tagName){
    var firstChild = tagName.childNodes[0];
    while(firstChild){
        firstChild.remove();
        firstChild = tagName.childNodes[0];
    }
};

window.dom.children = function(tagName){
    return tagName.children
};

window.dom.text = function(tagName){
    var result = '';
    for(var i = 0;i < tagName.childNodes.length;i++){
        if(tagName.childNodes[i].nodeType === 3){
            result += tagName.childNodes[i].textContent.trim();
        }
    }
    return result;
};

window.dom.attr = function(tagName,attributes){

    for(var key in attributes){
        tagName.setAttribute(key,attributes[key])
    }
    return tagName;
};

window.dom.style = function(tagName,styles){
    for(key in styles){
        tagName.style[key] = styles[key]
    }
    return tagName;
};

window.dom.bigBorther = function(tagName){
    var previous = tagName.previousSibling;
    while(previous !== null && previous.nodeType !== 1){
        previous = previous.previousSibling
    }
    return previous;
};
window.dom.nextBorther = function(tagName){
  var next = tagName.nextSibling;
  while(next !== null && next.nodeType !== 1){
    next = next.nextSibling;
  }
  return next;
}