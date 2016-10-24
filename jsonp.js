/**
 * Created by uc9 on 2016/9/1.
 */

function jsonp(options){
    //整理options
    options =   options || {};
    options.data    =   options.data||{};
    options.cbKey   =   options.cbKey||'cb';
    options.timeout =   options.timeout||0;

    //整理data
    var fnName=('jonsp'+Math.random()).replace('.','');
    options.data[options.cbKey]=fnName;
    //对外定义全局函数
    window[options.data[options.cbKey]]=function(json){
        clearTimeout(timer);
        options.success && options.success(json);
        //删除不用script标签，和随机函数
        document.getElementsByTagName('head')[0].removeChild(oSc);
        window[options.data[options.cbKey]]=null;
    };
    var arr=[];
    for(var key in options.data){
        arr.push(key+'='+encodeURIComponent(options.data[key]));
    }
    var str=arr.join('&');

    //创建script标签
    var oSc=document.createElement('script');
    oSc.src=options.url+'?'+str;
    document.getElementsByTagName('head')[0].appendChild(oSc);

    //超时
    if(options.timeout){
        var timer=setTimeout(function(){
            options.error && options.error();//告诉外面的error
            window[options.data[options.cbKey]]=function(){//不要数据，只删除
                document.getElementsByTagName('head')[0].removeChild(oSc);
                window[options.data[options.cbKey]]=null;
            };
        },options.timeout);
    }
}