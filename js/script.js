// 封装代替getElementById的方法
function byId(id){
    return typeof(id)==="string"?document.getElementById(id):id;
}

//全局变量
var index=0,
    timer=null,
    pics=byId("banner").getElementsByTagName("div"),
    dots=byId("dots").getElementsByTagName("span"),
    prev=byId("prev"),
    next=byId("next"),
    len=pics.length,
    menu=byId("menu-content"),
    menuItems=menu.getElementsByClassName("menu-item"),
    subMenu=byId("sub-menu"),
    innerBox=subMenu.getElementsByClassName("inner-box");

function slideImg() {
    var main=byId("main");
    //滑过清除定时器,离开继续
    main.onmouseover=function(){
        //滑过定清除时器
        if (timer) clearInterval(timer);
    }
    main.onmouseout=function(){
        timer=setInterval(function(){
            index++;
            if (index>=len) {
                index=0;
            }
            //切换图片
            changeImg();
        },3000)
    }
    //自动在main上触发鼠标离开事件
    main.onmouseout();

    //遍历所有点击,且绑定点击事件,点击圆点切换图片
    for (let d = 0; d < len; d++) {
        //给所有span添加一个id的属性,值为d作为span的索引
        dots[d].id=d;
        dots[d].onclick=function(){
            index=this.id;
            changeImg();
        }
        
    }

    // 按钮
    next.onclick=function(){
        index++;
        if(index>=len) index=0;
        changeImg();
    }
    prev.onclick=function(){

        index--;
        if(index<0) index=len-1;
        changeImg();
    }

}
    //遍历主菜单,绑定事件
    for (let m = 0; m < menuItems.length; m++) {
        menuItems[m].setAttribute("data-index",m);
        menuItems[m].onmouseover=function(){
            subMenu.className="sub-menu";
            var idx=this.getAttribute("data-index");
            for(var j=0; j<innerBox.length; j++){
                innerBox[j].style.display="none";
                menuItems[j].style.background="none";
            }
            menuItems[idx].style.background="rgba(0,0,0,0.1)";
            innerBox[idx].style.display="block";
        };  
        
    }
    menu.onmouseout=function(){
        subMenu.className="sub-menu hide";
    }
    subMenu.onmouseover=function(){
        this.className="sub-menu";
    }
    subMenu.onmouseout=function () {
        this.className="sub-menu hide"
    }
//切换图片
function changeImg(){
    //遍历banner下所有div及dots下所有span,将div隐藏,将span清除类
    for (let i = 0; i < len; i++) {
       pics[i].style.display="none"; 
       dots[i].className="";     
    }
    pics[index].style.display="block";
    dots[index].className="active";
}
slideImg();
