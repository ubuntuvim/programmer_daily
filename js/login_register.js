//$(function() {
    /**
     * 校验用户名和密码不能为空；
     * 如果为空输入框变为红色
     * 当页面的js校验通过时给div添加2个类：通过时候 has-success  fui-check 不通过时候： has-error 改变输入框的颜色
     * 由于是使用onclick函数触发button的，所以需要手动提交表单
     */
function checkHasNullValue() {
    // 'loginForm'
    var username = $("#username").val();  //获取用户名
    //alert("username:" + username);
    var password = $("#password").val();  //获取密码
    //alert("password:" + password);
    if ("" == username) {
        // 把用户名输入框的边框设置为红色
        $("#userTip").addClass("has-error");
        $("#showInfo22").tooltip("show");
        //return false;
    }

    if ("" == password) {
        // 把密码输入框的边框设置为红色
        $("#pswTip").addClass("has-error");
        $("#showInfo").tooltip("show");
    }

    // 如果前面的校验都通过了则提交表单
    /**
    * 采用ajax的方式，如果输入的用户名和密码不正确则在页面上显示提示文字，
    * 否则转到首页，并刷新页面保存用户信息到session
    * {:U('Home/Index/login'}
    */
    var myurl='index.php?m=Home&c=Index&a=login' + "&username=" + username + "&password=" + password;
    //alert("myurl: " + myurl);
    $.get(myurl, function(data){
       //alert("data" + data);
        if ('1' == data) { //登录成功，刷新页面
            location.reload();
        } else {
            $("#loginErrorTip").show();  //显示出出错信息
        }
    });

    //return true;

}


/**
 * 当输入框不为空的时候去掉提示信息
 * @param {Type} id1 设置边框的id
 * @param {Type} id2 提示信息的id
 */
function hideTipInfo1() {
    //alert("ea");
    $("#userTip").removeClass("has-error");  //去掉红色警告
    $("#showInfo22").tooltip("hide");  //去掉提示信息
}

function hideTipInfo2() {
    //alert("ea");
    $("#pswTip").removeClass("has-error");  //去掉红色警告
    $("#showInfo").tooltip("hide");  //去掉提示信息
}

/**
 * 检查是否为空
 * @param {Type}
 */
function checkUserInfo() {
    // 采用最原始的校验方式
    if(document.registeForm.username.value.length == "") {
		//alert("用户名不能为空！");
		document.registeForm.username.focus();
        $("#username").addClass("has-error");

		return false;
	}
}

/**
 *  ///<summary>获得字符串实际长度，中文2，英文1</summary>
 * @param {Type} str >要获得长度的字符串
 */
function getCount4Str(str) {

    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) { // 如果是数字、字母，或者是字符
            realLength += 1;
        } else {  //汉字
            realLength += 2;
        }
    }

    return realLength;
}
