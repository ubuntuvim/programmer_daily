//alert("dd");

$(function(){
    /**
     * 给右侧的菜单添加点击事件
     */
    $(".list-group-item").click(function() {
        //点击的时候先清空所有的激活状态
        $(".list-group-item").each(function() {
           $(this).removeClass("active");
        });
        // 设置被点击的元素为激活状态
        $(this).addClass("active");
    });

//    /**
//     * 由于后台编辑器插入的图片都是放在p标签里的，所以为了适应移动端的屏幕给每个插入的图片都加上响应式的类img-responsive
//     */
//     $("p > img").each(function() {
//           $(this).addClass("img-responsive");
//     });

    /**
     * 用户点击“清空内容”按钮时候，把编辑框里的内容清空
     * 通过刷新本页面达到目的
     */
    $("#emptyContent").click(function() {
        //alert("d");
        location.reload();
    });
});


/**
* 保存评论信息
*/
function saveComm(self) {
	//console.log("提交评论信息");
	var vv = $("#contentId").val();
    //    如果评论内容为空提示用户
    if (!vv || typeof(vv) == 'undefined' || vv == undefined) {
        return false;
    } else {
    }
    
    $.ajax({
        type: "POST",
        dataType: "text",
        url: 'index.php?m=Home&c=Index&a=saveCommentInfo',
        data: $('#commFormId').serialize(),  // 获取表单输入框的值，形式：nichName=23&email=23&website=23&com_content=3
        success: function (data) {
        	var obj = jQuery.parseJSON(data);  
        	//console.log("ret val = " + obj.success);
        	if (obj.success) {
        		$("#tipErrorInfo").html("<font color='green'>评论成功！</font>");
        		$("#tipErrorInfo").hide();
        		//  设置显示文字的淡入淡出效果
        		$("#tipErrorInfo").fadeIn(1000);	
				$("#tipErrorInfo").fadeOut(3000);

        		//  把评论的信息设置到评论信息列表的最前面
        		var str = "<div class='panel panel-default showcmtinfo'><div class='panel-body' id='cxt-font-gb'><div class='pl-box'><div class='pl-box-top'><a href='/member/13108.html' target='_blank' class='a-img'><img src='"+obj.headerPic+"'></a><p class='name'>"+obj.nickName+"</p><p class='time'>"+obj.publicTime+"</p></div><div class='pl-box-ctt context-font-style'>"+obj.content+"</div><div class='pl-box-btn'><i onclick='' id='agree_post' stat='0' pid='514634' aid='113138'>顶(<em id='up_514634'>0</em>)</i><i onclick='' id='disagree_post' stat='1' pid='514634' aid='113138'>踩(<em id='down_514634'>0</em>)</i><a href='/review/113138/514634.html'>回复(0)</a></div></div></div></div>";
        		$("#showNewCmInfoBodyId").prepend(str);
        		$("#showNewCmInfoBodyId").slideDown(3000);
        		
        		//  清空表单的内容
        		$('#commFormId')[0].reset();
        	} else {
        		$("#tipErrorInfo").html("<font color='red'>评论失败，请重试！</font>");
        	}
            
        },
        error: function(data) {
            $("#tipErrorInfo").html("<font color='red'>服务器罢工了，正在修复中……！</font>");
        }
    });
	
}

/**
 * 首页： 点击评论图片进行评论
 * @param {Type}     formId          表单id字符串
 * @param {[[Type]]} [提示信息的标签id]
 * @param {[[Type]]} [文章id]
 * @param {[[Type]]} [[提交按钮的id]]
 */ 
function saveCommInIndexPage(formId, tipInfoTagId, cttId, btnId) {
	//console.log("提交评论信息");
    var id1 = "#wbusername_"+cttId;
    var id2 = "#wbuserheadpic_"+cttId;
    var id3 = "#wbuserwebsite_"+cttId;
    var id4 = "#commentId_"+cttId;
    var id5 = "#content_"+cttId;
    var id5Val = $(id5).val();
    var dataStr = "wbusername="+$(id1).val()
            +"&wbuserheadpic="+$(id2).val()
            +"&wbuserwebsite="+$(id3).val()
            +"&content="+id5Val
            +"&comm_id="+$(id4).val();

//    如果评论内容为空提示用户
    if (!id5Val || typeof(id5Val) == 'undefined' || id5Val == undefined) {
//        $(tipInfoTagIdStr).fadeIn(600, function() {
//            var vll = "#content_fromGroup_"+cttId;
//            var vl = "#"+btnId;
//            $(vll).addClass("has-error");
//            $(vl).addClass("disabled");
//        });
//        $(tipInfoTagIdStr).fadeOut(400, function() { 
//            $(vll).removeClass("has-error");
//            $(vl).removeClass("disabled");
//        });
//        
        return false;
    } else {
    }
    
	var formIdStr = "#"+formId;
	var tipInfoTagIdStr = "#"+tipInfoTagId;
//    console.log("$(formIdStr).serialize()="+$(formIdStr).serialize());
    $.ajax({
        type: "POST",
        dataType: "text",
        url: 'index.php?m=Home&c=Index&a=saveCommentInfo',
//        data: $(formIdStr).serialize(),  // 获取表单输入框的值，形式：nichName=23&email=23&website=23&com_content=3
//        data: { 
//            "wbusername": $(id1).val(), 
//            "wbuserheadpic": $(id2).val(), 
//            "wbuserwebsite": $(id3).val(), 
//            "content": $(id4).val(), 
//            "comm_id": $(id5).val() 
//        },
        data: dataStr,
        success: function (data) {
        	var obj = jQuery.parseJSON(data);  
        	//console.log("ret val = " + obj.success);
        	if (obj.success) {
        		$(tipInfoTagIdStr).html("<font color='green'>评论成功！</font>");
        		$(tipInfoTagIdStr).hide();
        		//  设置显示文字的淡入淡出效果
        		$(tipInfoTagIdStr).fadeIn(1000);	
				$(tipInfoTagIdStr).fadeOut(2000, function() { 
                    //  关闭评论框
                    var s = "#cmtFormDiv"+cttId;
                    $(s).hide();
                    //  评论数量加1
                    var pcId = "#comment_count_id_"+cttId;
                    var currCount = parseInt($(pcId).text());
                    var sv = currCount+1;
                    $(pcId).text(sv);
                });
                //  清空评论的内容
                $(id5).val("");
                
        	} else {
        		$(tipInfoTagIdStr).html("<font color='red'>评论失败，请重试！</font>");
        	}
            
        },
        error: function(data) {
            $(tipInfoTagIdStr).html("<font color='red'>服务器罢工了，正在修复中……！</font>");
        }
    });
	
}

function cancelComment(cttId) { 
    //  关闭评论框
    var s = "#cmtFormDiv"+cttId;
    $(s).hide();
}

/**
 * 首页： 点击评论图片跳转到详细页面
 * @param {Type}  
 */ 
function toDetailPage(toUrl) {
   //top.href = toUrl + "#commentPanel";  // commentPanel参数使用锚，使得页面直接滚到评论区
    //window.navigate(toUrl + "#commentPanel");
    var url = toUrl + "#commentPanel";
    window.open(url);
}

/**
 * 首页顶部，点击tasklist的时候，如果用户没有使用第三方账号登录的显示登录界面
 */ 
function showTaskListLoginPage() {
    //  触发显示登录界面
    $('#showTaskListLoginPage_id').modal('show');
}

/**
 * 字体动画 
 */
$(function () {
    $('.font-animate-style').textillate();
})

/**
 * 点击右侧的标题再左侧显示对应的文章内容
 */
function showContent(art_id) {
    $("#contentAeraId").html();
    //  显示一秒钟背景图片  background:url(images/main/mn.jpg);
    $("#contentAeraId").addClass("set-article-content-bg-style");
//    $("#contentBgImg").slideDown(5000);
    // 延迟一秒钟再执行删除
    setTimeout(function () { 
        $("#contentAeraId").removeClass("set-article-content-bg-style");
    }, 1000);
//    $("#contentAeraId").removeClass("set-article-content-bg-style");
    
    $("#contentAeraId").html("<font color='red' size='4'>测试内容</font>");
}

/**
 * 点击左侧的菜单显示相应的内容
 * @param {Type} typeId 类型id；
 */ 
function showAllTitleByType(typeId) {
    // 测试
    if ('id1' === typeId) {
        $("#articleTitleId").html();
        $("#articleTitleId").html("<font color='red' size='5'>这是首页的内容</font>");
        $.panelslider.close();  //关闭菜单
    } else if ('id2' === typeId) { //最奇葩的需求
        $("#articleTitleId").html();
        $("#articleTitleId").html("<font color='red' size='5'>最奇葩的需求</font>");
        $.panelslider.close();
    } else { //最奇葩的需求
        $("#articleTitleId").html();
        $("#articleTitleId").html("<font color='red' size='5'>其他。。。</font>");
        $.panelslider.close();
    }
    //  获取后台的数据
    $.ajax({
        type: "POST",
        dataType: "text",
        url: '',
//        data: dataStr,
        success: function (data) {
        	var obj = jQuery.parseJSON(data);  
        	//console.log("ret val = " + obj.success);
        	if (obj.success) {
                
        	} else {
                
        	}
            
        },
        error: function(data) {
        }
    });
}