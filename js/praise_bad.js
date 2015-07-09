/**
 * 顶，踩效果设置js
 */ 

/**
 * 触发效果
 */ 
function praise(e, cttId) {
	var $i=$("<b>").text("+1");
	var x=e.offsetLeft,y=e.offsetTop;
	$i.css({top:y-20,left:0,position:"absolute",color:"#E94F06"});  //absolute  relative
	$(e).append($i);
	$i.animate({top:y-80,opacity:0,"font-size":"1.4em"},1000,function(){
		$i.remove();
	});

    var pcId = "#praise_count_id_"+cttId;
    var currCount = parseInt($(pcId).text());
    var sv = currCount+1;
    $(pcId).text(sv);
//    console.log("currCount="+currCount);
    //  改变顶的数量，直接把后台的值增一即可
    var myurl='index.php?m=Home&c=Index&a=praiseInc' + "&c_id=" + cttId + "&nextCount=" + sv;
    //alert("myurl: " + myurl);
    $.get(myurl, function(data){
        //console.log("data=" + data);
    });
}

function bad(e, cttId) {
	var $i=$("<b>").text("+1");
	var x=e.offsetLeft,y=e.offsetTop;
	$i.css({top:y+20,left:0,position:"absolute",color:"#E94F06"});  //absolute  relative
	$(e).append($i);
	$i.animate({top:y+80,opacity:0,"font-size":"1.4em"},1000,function(){
		$i.remove();
	});
    
    
    var pcId = "#bad_count_id_"+cttId;
    var currCount = parseInt($(pcId).text());
    var sv = currCount+1;
    $(pcId).text(sv);
//    console.log("currCount="+currCount);
    //  改变顶的数量，直接把后台的值增一即可
    var myurl='index.php?m=Home&c=Index&a=badInc' + "&c_id=" + cttId + "&nextCount=" + sv;
    //alert("myurl: " + myurl);
    $.get(myurl, function(data){
        //console.log("data=" + data);
    });
}
