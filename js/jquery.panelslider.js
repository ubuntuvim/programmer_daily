/*
www.sucaijiayuan.com
*/
(function($) {
  'use strict';

  var $body = $('body'),
      _sliding = false;

  function _slideIn(panel, options) {
    var panelWidth = panel.outerWidth(true),
        bodyAnimation = {},
        panelAnimation = {};

    if(panel.is(':visible') || _sliding) {
      return;
    }

    _sliding = true;
    panel.addClass('ps-active-panel').css({
      position: 'fixed',
      top: 0,
      height: '100%',
      'z-index': 999999
    });
    panel.data(options);

    switch (options.side) {
      case 'left':
        panel.css({
          left: '-' + panelWidth + 'px',
          right: 'auto'
        });
        bodyAnimation['margin-left'] = '+=' + panelWidth;
        panelAnimation.left = '+=' + panelWidth;
        
        break;

      case 'right':
        panel.css({
          left: 'auto',
          right: '-' + panelWidth + 'px'
        });
        bodyAnimation['margin-left'] = '-=' + panelWidth;
        panelAnimation.right = '+=' + panelWidth;
        break;
    }

    $body.animate(bodyAnimation, options.duration);
    panel.show().animate(panelAnimation, options.duration, function() {
      _sliding = false;
        //  修改按钮的图片
        //document.getElementById("openMenuId").style.display = 'none';  //点击展开菜单时候隐藏打开按钮
        //document.getElementById("closeMenuId").style.display = 'block'; // 显示关闭按钮
        //  展开时候显示关闭按钮，把图片 src 和 a 的 href 属性修改了
        $("#openMenuIdImg").addClass("openMenuIdImgStyle");
        $("#wsTitleId").addClass("openMenuIdImgStyle");  // 控制网站名称显示位置
        $("#openMenuIdImg").attr("src", "images/menu/close3.png");
        $("#openMenuIdImg").parent().attr("id", "close-panel-bt");
    });
  }

  $.panelslider = function(element, options) {
    var active = $('.ps-active-panel');
    var defaults = {
      side: 'left', // panel side: left or right
      duration: 200, // Transition duration in miliseconds
      clickClose: true // If true closes panel when clicking outside it
    };

    options = $.extend({}, defaults, options);

    // If another panel is opened, close it before opening the new one
    if(active.is(':visible') && active[0] != element[0]) {
      $.panelslider.close(function() {
        _slideIn(element, options);
      });
    } else if(!active.length || active.is(':hidden')) {
      _slideIn(element, options);
    }
  };

  $.panelslider.close = function(callback) {
    var active = $('.ps-active-panel'),
        duration = active.data('duration'),
        panelWidth = active.outerWidth(true),
        bodyAnimation = {},
        panelAnimation = {};

    if(!active.length || active.is(':hidden') || _sliding) {
      return;
    }

    _sliding = true;

    switch(active.data('side')) {
      case 'left':
        bodyAnimation['margin-left'] = '-=' + panelWidth;
        panelAnimation.left = '-=' + panelWidth;
        $("#openMenuIdImg").removeClass("openMenuIdImgStyle");
            
        break;

      case 'right':
        bodyAnimation['margin-left'] = '+=' + panelWidth;
        panelAnimation.right = '-=' + panelWidth;
        break;
    }

    active.animate(panelAnimation, duration);
    $body.animate(bodyAnimation, duration, function() {
      active.hide();
      active.removeClass('ps-active-panel');
      _sliding = false;

      if(callback) {
        callback();
      }
        //  修改按钮的图片
//        document.getElementById("openMenuId").style.display = 'block';  //点击关闭菜单时候显示打开按钮
//        document.getElementById("closeMenuId").style.display = 'none'; // 隐藏关闭按钮
            
        //  展开时候显示关闭按钮，把图片 src 和 a 的 href 属性修改了
        $("#openMenuIdImg").attr("src", "images/menu/open2.png");
        $("#openMenuIdImg").parent().attr("id", "left-panel-link");
        $("#wsTitleId").removeClass("openMenuIdImgStyle");  // 控制网站名称显示位置
    });
  };

  // Bind click outside panel and ESC key to close panel if clickClose is true
  $(document).bind('click keyup', function(e) {
    var active = $('.ps-active-panel');

    if(e.type == 'keyup' && e.keyCode != 27) {
      return;
    }

    if(active.is(':visible') && active.data('clickClose')) {
      $.panelslider.close();
    }
  });

  // Prevent click on panel to close it
  $(document).on('click', '.ps-active-panel', function(e) {
    e.stopPropagation();
  });

  $.fn.panelslider = function(options) {
    this.click(function(e) {
      var active = $('.ps-active-panel'),
          panel = $(this.getAttribute('href'));

      // Close panel if it is already opened otherwise open it
      if (active.is(':visible') && panel[0] == active[0]) {
        $.panelslider.close();
      } else {
        $.panelslider(panel, options);
      }

      e.preventDefault();
      e.stopPropagation();
    });

    return this;
  };
})(jQuery);
