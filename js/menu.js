(function(){
    var menu_switch = $(".menu_switch");
    var menu_nav = $(".menu_nav");

    function toggleNav() {
        menu_switch.classList.toggle("menu_switch--expend");
        menu_nav.classList.toggle("menu_nav--visible");
    }

    menu_switch.onclick=toggleNav;

    menu_nav.addEventListener("click",function () {
        toggleNav();
    })
    
})();