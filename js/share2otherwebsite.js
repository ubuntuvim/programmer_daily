var myDomainUrl = "http://ibeginner.sinaapp.com";

//<!--分享到微博-->
//参数说明：title说明文字，pic小图片，url分享要链接到的地址
function postToWb(title,pic,url){
    var _t = encodeURI(title);//当前页面title，使用document.title
    var _url = encodeURIComponent(myDomainUrl+url);//当前页的链接地址使用document.location
    var _appkey = 801298467;//你从腾讯获得的appkey，如果有appkey,直接写入key值，例如：_appkey=123456
    var _pic = encodeURI(pic);//（例如：var _pic='图片url1|图片url2|图片url3....）
    var _site = myDomainUrl;//你的网站地址
    var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic;
    w = window.screen.width, h = window.screen.height;
    window.open( _u,'分享到腾讯微博', "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}

// 分享到QQ空间

//参数说明：title标题，summary摘要，pic小图片，url分享要链接到的地址
function postToQzone(title,summary,pic,url){
    var p = {
        url: myDomainUrl+url,
        showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
        desc:'',/*默认分享理由(可选)*/
        summary:summary,/*分享摘要(可选)*/
        title:title,/*分享标题(可选)*/
        site:'',/*分享来源 如：腾讯网(可选)*/
        pics:pic, /*分享图片的路径(可选)*/
        style:'203',
        width:98,
        height:22
    };
    var s = [];
    for(var i in p){
        s.push(i + '=' + encodeURIComponent(p[i]||''));
    }
    var _u='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+s.join('&');
        w = window.screen.width, h = window.screen.height;
        window.open( _u,'分享到QQ空间和朋友网', "height=580,width=708,top=" + (h-580)/2 + ",left=" + (w-708)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
    }

 function postToPengYon(title,pic,url){
    var p = {
        url:myDomainUrl+url,
        to:'pengyou',
        desc:'',/*默认分享理由(可选)*/
        summary:'',/*摘要(可选)*/
        title:title,/*分享标题(可选)*/
        site:'',/*分享来源 如：腾讯网(可选)*/
        pics:pic /*分享图片的路径(可选)*/
    };
    var s = [];
    for(var i in p){
        s.push(i + '=' + encodeURIComponent(p[i]||''));
    }
    w = window.screen.width, h = window.screen.height;
    var _u = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+s.join('&');
    window.open( _u,'分享到朋友网', "height=580,width=708,top=" + (h-580)/2 + ",left=" + (w-708)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}

/**
 * 分享到QQ邮箱
 * @param {Type} title 标题
 * @param {Type} summary 摘要
 * @param {Type} pic 文章里的图片
 * @param {Type} url 从邮箱里点击跳转到详细页面的URL
 */ 
function postToQQEmail(title,summary,pic,url){
    var p = {
        url:url,/*当前页面url，使用location.href*/
        to:'qqmail',
        desc:'', /*默认分享理由(可选)*/
        summary:summary,/*摘要(可选)*/
        title:title,/*分享标题(可选)*/
        site:'',/*分享来源 如：腾讯网(可选)*/
        pics:pic /*分享图片的路径(可选)*/
    };
    var s = [];
    for(var i in p){
        s.push(i + '=' + encodeURIComponent(p[i]||''));
    }
    w = window.screen.width, h = window.screen.height;
    var _u = 'http://mail.qq.com/cgi-bin/qm_share?'+ s.join("&");
    window.open( _u,'分享到QQ邮箱', "height=580,width=708,top=" + (h-580)/2 + ",left=" + (w-708)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
};

/**
 * 分享到新浪微博
 * @param {Type} articleTitle 
 * @param {Type} articleURL 
 */ 
function shareToSina(articleTitle, articleURL){
var url = "http://v.t.sina.com.cn/share/share.php",
    _url = myDomainUrl+articleURL,
    _title = articleTitle,
    _appkey = '670979742',
    _ralateUid = '',
    c = '', pic = [];
    w = window.screen.width, h = window.screen.height;
    c = url + "?url=" + encodeURIComponent(_url) + "&appkey=" + _appkey 
        + "&title=" + _title + "&pic" + pic + "&ralateUid=" + _ralateUid + "&language=";

    window.open(c, "shareQQ", "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 +",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}
        

  function shareToKaixin(articleTitle,articleURL){
        var url = "http://www.kaixin001.com/rest/records.php",
        _url = myDomainUrl+articleURL,
        _title = articleTitle,
        c = '', pic = [],
        w = window.screen.width, h = window.screen.height;
        c = url + "?content=" + encodeURIComponent(_title) + "&url=" + _url + "&&starid=&aid=&style=11&t=10";
        var win = window.open(c, "shareQQ", "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
  }

  /*分享到人人*/
  function shareToRenren(articleTitle,articleURL){
    var url = "http://widget.renren.com/dialog/share",
        _url = myDomainUrl+articleURL,
        _title =articleTitle,
        c = '', pic = [],
        w = window.screen.width, h = window.screen.height;

        c = url + "?resourceUrl=" + _url + "&title=" + _title + "&charset=GB2312";

        window.open(c, "shareQQ", "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
  }

  /*分享到QQ好友*/
  function shareToQQ(articleTitle, articleURL) {
    var c = "http://connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(myDomainUrl+articleURL) + "&site=qqcom&iframe=true&showcount=0&desc=&summary=&title=&pics=&style=203&width=19&height=22";
        window.open(c, "shareQQ", "height=485, width=720,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no,top=200,left=200");
    }
    
    // <!--分享到微信-->
var pageShareWX = function(title,url,pic,appid){
    var opt= {
        "title": encodeURIComponent(title),//此处也可替换成相应的文章标题
        "imgsrc":pic, //此处替换成相应的文章缩略图地址链接，若省略将显示为无图标链接
        "url": myDomainUrl+url, // 此处也可替换成对应网页的链接
        "appid":appid // 此处替换为你在微信开放平台注册的appid，若省略将显示“来自二维码扫描”
    };
    sharewx(opt);
}



// show hide home sharetag
//var shareFlag=0;
function shareshow(id){
    //console.log("id = " + id);
    document.getElementById(id).style.display = "";
    //$(o).show();
}
function sharehide(id){
    //console.log("id = " + id);
    document.getElementById(id).style.display = "none";
    //$(o).hide();
}
