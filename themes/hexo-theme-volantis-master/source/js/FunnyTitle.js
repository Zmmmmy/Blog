// 浏览器搞笑标题
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "/img/家园.svg");
        document.title = '干啥去了！';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/img/家园.svg");
        document.title = '呀！回来啦 ~';
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});