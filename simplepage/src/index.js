function go(index) {
    $('.menu > li').eq(index).addClass('active').siblings().removeClass('active');
    let width = $('.slide>li>a>img').width();
    $('.slide > li').css({
        transform: 'translateX(' + (-width * index) + 'px)'
    })
}
let current = 0;
let player = false;
function play(){
    if(player){
        current = $('.menu > li.active').index();
    }
    current = current + 1;
    if (current === 4) {
        current = 0
    }
    go(current);
}
let setIndex = setInterval(play, 3000);

$('#next').on('click',function(){
    player =true;
    clearInterval(setIndex);
    let indexLi = $('.menu > li.active').index();
    indexLi++;
    if (indexLi === 4){
        indexLi = 0
    }
    go(indexLi);
});
$('#prev').on('click',function(){
    player = true;
    clearInterval(setIndex);
    let indexLi = $('.menu > li.active').index();
    indexLi--;
    if (indexLi === -1){
        indexLi = 3
    }
    go(indexLi);
});
$('.menu').on('click', 'li', function(e){
    player = true;
    clearInterval(setIndex);
    let $li = $(e.currentTarget);
    let index = $li.index();
    go(index);
});
$('.slides').on('mouseover',function(){
    clearInterval(setIndex);
});
$('.slides').on('mouseout',function(){
    setIndex = setInterval(play,3000);
})


// 预加载
var loadingImage = new Image();
loadingImage.src="https://i.loli.net/2017/08/08/5989307b6c87b.gif";
let list = document.querySelector('#list');
let loadMoreButton = document.querySelector('#loadMoreButton');
let n =1;
let demand = false;
loadMoreButton.onclick = function(){
    if(demand){return}
    let request = new XMLHttpRequest();
    request.open('GET',`./page-${n+1}.html`);
    request.onerror = function(){
        demand = false
    };
    request.onload =function(){
        demand = false;
        n +=1;
        let response = request.responseText;
        let data = JSON.parse(response);
        for(var i=0;i < data.content.length;i++){
            let liString = `
                            <li>
                                <div class="oneToOne">
                                    <img src="https://i.loli.net/2017/08/08/5989307b6c87b.gif" data-xxx="${data.content[i].url}">
                                </div>
                                <h3><span>${data.content[i].title}</span></h3>
                                <p>${data.content[i].text}</p>
                            </li>`;
            list.insertAdjacentHTML('beforeend',liString)
        }
        if(data.hasNextPage === false){
            loadMoreButton.disabled = true;
            loadMoreButton.classList.add('active')
        }
    };
    demand = true;
    request.send()
};
window.onscroll = function(){
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    var clientHeight = doc.clientHeight;
    var viewportOffset = loadMoreButton.getBoundingClientRect();
    var buttonTop = viewportOffset.top;
    if( buttonTop <= clientHeight){
        loadMoreButton.click()
    }
    var images =document.querySelectorAll('img[data-xxx]');
    for (var i=0;i<images.length;i++){
        var imagesviewportOffset =images[i] .getBoundingClientRect();
        var imagesTop = imagesviewportOffset.top;
        if( imagesTop <= clientHeight){
            images[i].src = images[i].getAttribute('data-xxx');
            images[i].removeAttribute('data-xxx')
        }
    }
}