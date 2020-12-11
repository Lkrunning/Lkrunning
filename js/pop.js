

var showPop=(function()
{
    function showPop(id) {
        $("#" + id).style.display = "";
    }
    
    var closes = $$(".pop_close")
    for (var index = 0; index < closes.length; index++) {
    
        closes[index].onclick = function () {
            var container = this.parentElement.parentElement;
            container.style.display = "none";
        };
    }


    //处理一些特殊的逻辑
    var popWeixin=$(".pop_weixin");
    var popQq=$(".pop_qq");
    popWeixin.onclick=function()
    {
        popWeixin.classList.add("selected")
        popQq.classList.remove("selected")
    }
    popQq.onclick=function()
    {
        popQq.classList.add("selected")
        popWeixin.classList.remove("selected")
    }
    return showPop;
})();