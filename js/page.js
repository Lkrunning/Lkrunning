 var showPage=(function () {
    
    var pageIndex =2;
    var nextPageIndex = null;
    var pages = $$(".page_container .page");
    
    
    function setStatic() {
        nextPageIndex = null;
        for (var i = 0; i < pages.length; i++) {
    
            //设置zIndex
            if (i === pageIndex) {
                pages[i].style.zIndex = 1;
            } else {
                pages[i].style.zIndex = 10;
            }
            //设置位置
            pages[i].style.top = (i - pageIndex) * GetHeight() + "px";
        }
    }
    
    setStatic() ;
    //移动的过程中
    function moving(dis) {
        for (var i = 0; i < pages.length; i++) {
            if (i !== pageIndex) {
                //设置位置
                pages[i].style.top = (i - pageIndex) * GetHeight() + dis + "px";
            }
        }
    
        if (Math.abs(dis) < 20) {
            dis = 0;
        }
    
        //拿到下一个要显示的页面index
        if (dis > 0 && pageIndex > 0) {
            nextPageIndex = pageIndex - 1;
        } else if (dis < 0 && pageIndex < pages.length - 1) {
            nextPageIndex = pageIndex + 1;
        } else {
            nextPageIndex = pageIndex;
        }
    }
    
    
    //完成移动
    function finishMove() {
        if (nextPageIndex === null) {
            return;
        }
    
        //设置要显示的页面
        var page = pages[nextPageIndex];
        page.style.transition = "0.5s"
        page.style.top = 0;
        setTimeout(() => {
            pageIndex = nextPageIndex;
            //重新设置页面的位置
            setStatic();
            page.style.transition = "";
        }, 500);
    }
    
    //事件
    var pageContainer = $(".page_container");
    //手指按下事件
    pageContainer.ontouchstart = function (e) {
    
        var y = e.touches[0].clientY;
    
        //手指按下移动事件
        pageContainer.ontouchmove = function (e) {
            var dis = e.touches[0].clientY - y;
            moving(dis);
        }
    
        //手指按下移动停止事件
        pageContainer.ontouchend = function () {
            finishMove();
            pageContainer.ontouchmove = null;
        }
    }
    
    function showPage(index) {
    
        var nextPage = pages[index];
        //下一个页面在当前页面的上方
        if (index < pageIndex) {
            nextPage.style.top = -GetHeight() + "px";

        //下一个页面在当前页面的下方
        } else if (index > pageIndex) {
            nextPage.style.top = GetHeight() + "px";
        } else {
            if (pageIndex === 0) {
                pageIndex++;
                setStatic();
            }
            else{
                pageIndex--;
                setStatic();
            }
        }
    
        //读取dom的属性值，会让浏览器强行渲染
        nextPage.clientHeight;
        nextPageIndex = index;
        finishMove();
    }

    return showPage;
})();

