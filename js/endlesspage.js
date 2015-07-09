/**
 * 动态加载首页数据实现分页效果
 */ 
var gPageSize = 1;
var i = 11; //设置当前页数，全局变量，因为进入首页的时候默认已经显示了最新的10条数据，所以动态加载的应该是从第11条开始
$(function () {
    //根据页数读取数据
    function getData(pagenumber) {		
        i++; //页码自动增加，保证下次调用时为新的一页。
        $.ajax({
            type: "post",
            url: "index.php?m=Home&c=Index&a=ajaxList",
            data: { pagesize: gPageSize, pagenumber: pagenumber, cont_type: $("#cont_type_id").val() },
            dataType: "json",
            success: function (data) {
                $(".loaddiv").hide();
                if (data.length > 0) {
                    var jsonObj = data.data;
                    insertDiv(jsonObj);
                } else {
					//$(".div_null").show();  //  显示提示信息“已经是最后一页”
                    //  设置的淡入淡出效果
                    //$("#tipLastPageInfo").fadeIn(1000);	
                    //$("#tipLastPageInfo").fadeOut(3000);
					$("#btn_Page").hide();  // 下一页
				}
            },
            beforeSend: function () {
                $(".loaddiv").show();
            },
            error: function () {
                $(".loaddiv").hide();
            }
        });
    }
    //初始化加载第一页数据
    getData(11);  //  因为进入首页的时候默认已经显示了最新的10条数据，所以动态加载的应该是从第11开始

    function insertDiv(json) {
        //  获取登录成功之后保存到session里的值
        var wbusername = $("#wbusername_id").val();
        var wbuserheadpic = $("#wbuserheadpic_id").val();
        var wbuserwebsite = $("#wbuserwebsite_id").val();
        
        //var $mainDiv = $(".ajaxNextPage");
        var $mainDiv = $("#showNewCmInfoBodyId");
        $mainDiv.show();
        var html = '';
        for (var i = 0; i < json.length; i++) {
            
            //  组装显示分享组件的div的id值
            var ids = "showShareTools_"+json[i].id;
            //console.log("ids = " + ids);
            
            html += '<div class="row">'
            html += '	<div class="col-md-12 col-sm-12">'
            html += '			<h5 style="color: #3c5269;">'
            html += '				<a href="index.php?m=Home&c=Index&a=detail&id='+json[i].id+'" style="color: #3c5269;" target="_blank">'+json[i].title+'</a>'
            html += '			</h5>'
            html += '		   <p>'+json[i].ctt_summary+'</p>'
            html += '		<!-- 标签tag区 -->'
            html += '		<!--'
            html += '		<span class="tag-tools" style="">'
            html += '			<span class="smaller400noshow">'
            html += '				<a href="http://www.weibo.com/ubuntuvim" target="_blank">tag1</a>&nbsp;'
            html += '				<a href="http://www.weibo.com/ubuntuvim" target="_blank">tag2</a>&nbsp;'
            html += '				<a href="http://www.weibo.com/ubuntuvim" target="_blank">tag3</a>'
            html += '			</span>'
            html += '		</span>'
            html += '		-->'
            html += '		<span class="u-commt-share-tools shareTo" style="">'
            html += '			<span class="smaller400noshow">'
            html += '				<a href="http://www.weibo.com/ubuntuvim" target="_blank">ubuntuvim</a>'
            html += '				&nbsp;&nbsp;<font style="color: #000;">'+json[i].public_time+'</font>&nbsp;&nbsp;'
            html += '			</span>'
            html += '			<span class="glyphicon glyphicon-arrow-up" style="cursor: pointer;" onclick="praise(this, '+json[i].id+');">顶</span>(<font id="praise_count_id_'+json[i].id+'">'+json[i].praise_count+'</font>)&nbsp;&nbsp;&nbsp;'
            html += '			<span class="glyphicon glyphicon-arrow-down" style="cursor: pointer;" onclick="bad(this, '+json[i].id+');">踩</span>(<font id="bad_count_id_'+json[i].id+'">'+json[i].bad_count+'</font>)&nbsp;&nbsp;'
            html += '			<span class="share-box js-list-share-btn shareshowbtn" aid="114718" title="分享" onmouseover="shareshow(\''+ids+'\')" onmouseout="sharehide(\''+ids+'\')" style="cursor: pointer;">'
            html += '				<span class="glyphicon glyphicon-share-alt">分享</span>'
            html += '				<div class="share" style="display: none;" bosszone="kjsy_share" id="'+ids+'">'
            html += '					<a onclick="postToWb(this.name,this.href,this.id); return false;" title="分享到微博" class="sharewb" name="'+json[i].title+'" href="'+json[i].ctt_img_url+'" id="index.php?m=Home&c=Index&a=detail&id='+json[i].id+'">分享到微薄</a>'
            html += '					<a onclick="postToQzone(this.name,'+json[i].ctt_summary+',this.href,this.id); return false;" title="分享到QQ空间" class="shareqzone" name="'+json[i].title+'" href="'+json[i].ctt_img_url+'" id="index.php?m=Home&c=Index&a=detail&id='+json[i].id+'">分享到空间</a>'
            html += '					<a href="javascript:void(0)" onclick="shareToSina(this.name,this.id); return false;" title="分享到新浪微博" class="sharesina" name="'+json[i].title+'" id="index.php?m=Home&c=Index&a=detail&id='+json[i].id+'">分享到新浪微博</a>'
            html += '					<a onclick="postToQQEmail(this.name,'+json[i].ctt_summary+',this.id,this.href); return false;" title="分享到QQ邮箱" class="shareqqemail" name="'+json[i].title+'" id="'+json[i].ctt_img_url+'" href="index.php?m=Home&c=Index&a=detail&id='+json[i].id+'">分享到QQ邮箱</a>'
            html += '					<a onclick="shareToQQ(this.name,this.href,this.id); return false;" title="分享到QQ好友" class="sharepengyou" name="'+json[i].title+'" furl="'+json[i].ctt_img_url+'" id="index.php?m=Home&c=Index&a=detail&id='+json[i].id+'">分享到QQ好友</a>'
            html += '					<a href="javascript:void(0)" onclick="shareToRenren(this.name,this.id); return false;" title="分享到人人" class="sharerenren" name="'+json[i].title+'" id="index.php?m=Home&c=Index&a=detail&id='+json[i].id+'">分享到人人</a>'
            html += '					<a href="javascript:void(0)" onclick="shareToKaixin(this.name,this.id); return false;" title="分享到开心" class="sharekaixin" name="'+json[i].title+'" id="index.php?m=Home&c=Index&a=detail&id='+json[i].id+'">分享到开心</a>'
            html += '				</div>'
            html += '			</span>'
            html += '			&nbsp;&nbsp;'
//            html += '<span><span class="glyphicon glyphicon-comment" style="cursor: pointer;" onclick="showCommentFormAnimate(\'cmtFormDiv'+json[i].id+'\');">回复(<font id="comment_count_id_'+json[i].id+'">'+json[i].comment_count+'</font>)</span>'
//            html += '	<div class="panel panel-default comment-panel-style" id="cmtFormDiv'+json[i].id+'" style="display: none;">'
//            html += '		<div class="panel-body">'
//            html += commentStr
//            html += '		</div>'
//            html += '	</div>'
//            html += '</span>'
            //  下面的URL暂时写死了！！
            html += '<span class="glyphicon glyphicon-comment" style="cursor: pointer;"  onclick="toDetailPage(\'http://ibeginner.sinaapp.com/index.php?m=Home&c=Index&a=detail&id='+json[i].id+'\');">评论('+json[i].comment_count+')</span>'
            
            html += '				&nbsp;&nbsp;'
            html += '     			<a href="index.php?m=Home&c=Index&a=index&cont_type='+json[i].cont_type_no+'">'+json[i].cont_type_name+'</a>'
            html += '		    </span>'
            html += '	</div>'
            html += '</div> <!-- //row -->'
            html += '<hr style="height:1px;border:none;border-top:1px dashed #cacaca;margin: 10px 0 10px 0;" />';
        }
        
        $mainDiv.append(html);
    }

    //==============核心代码=============
    var scrollHandler = function () {
		var scrollTop = $(document).scrollTop(); //滚动条滚动高度
		var documentH = $(document).height();  //滚动条高度 
		var windowH = $(window).height(); //窗口高度

        if (scrollTop  >= documentH - windowH) {
            /*if (i % 100 === 0) {//每100页做一次停顿！会显示 “查看更多按钮”   暂时不用这个功能
                getData(i);
                $(window).unbind('scroll');
                $("#btn_Page").show();
            }else{
                getData(i);
                $("#btn_Page").hide();
            }*/
            getData(i);
            //$("#btn_Page").hide();
        }
    }
    //定义鼠标滚动事件
    $(window).scroll(scrollHandler);
    //继续加载按钮事件
    //  由于不需要“点击更多”这个功能，直接注释掉
//    $("#btn_Page").click(function () {
//        getData(i);
//        $(window).scroll(scrollHandler);
//    });
});