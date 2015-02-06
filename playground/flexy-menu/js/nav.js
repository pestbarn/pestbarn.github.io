$(function() {
  //Replace all SVG images in nav with inline SVG
  $('.flexbox nav img[src$=".svg"]').each(function(){
    var $img = $(this);
    var imgURL = $img.attr('src');
    $.get(imgURL, function(data) {
      var $svg = $(data).find('svg');
      $svg = $svg.removeAttr('xmlns:a');
      $img.replaceWith($svg);
    }, 'xml');
  });
  $('.no-inlinesvg img[src$=".svg"]').each(function(index,element) {
    element.src = element.src.replace('.svg','.png');
  });
  var $el, leftPos, newWidth, $mainNav = $(".nav-sub");
  $('.nav-sub-item:first-child').addClass('navactive');
  //rewrite this so that the ".active" class gets
  //added to the current active page instead
  $mainNav.append("<div class='magic-line'></div>");
  var $magicLine = $(".magic-line");
  if($('.navactive').length !== 0) {
    $magicLine
    .width($(".navactive a").width()+15)
    .css("left", $(".navactive a").position().left-5)
    .data("origLeft", $magicLine.position().left)
    .data("origWidth", $magicLine.width());
  }
  $(".nav-sub-item a").click(function() {
    $el = $(this);
    $('.nav-sub-item').removeClass('navactive');
    $el.parent().addClass('navactive');
    leftPos = $el.position().left-5;
    newWidth = $el.width()+15;
    $magicLine.stop().animate({
      left: leftPos,
      width: newWidth,
    });
  });
  $(".nav-item label").click(function(){
    var trigger = $(this).next().find('.nav-sub-item:first-child a');
    trigger.trigger('click');
  });
  $("label").click(function(e){
    e.preventDefault();
    $("#"+$(this).attr("for")).click().change();
  });
  var defaultCust = $('.acctSelect').find('input[type="radio"]:checked').next('label').children('span').html();
  $('.acctSel').html(defaultCust);
  var defaultUser = $('.userSel').html();
  $('.nav-mobile-user').html(defaultUser);

  // DEMO: placeholder image and loaded indicator
  $('label, .nav-sub-item a').click(function(){
    var loaded = $.trim($(this).text()).replace(/\s+/g, " ").toLowerCase();
    var el = $('h6 span');
    el.html(loaded);
    $('.fake-content img')
    .attr('src','//placehold.it/450x1000/fcfcfc/323232&text='+ loaded);
  });

  // DROPDOWNS
  $('.dropdown dt a').on('click', function(){
    $('.dropdown ul').slideUp();
    $('.dropdown').removeClass('ddactive');
    var that = $(this).parent().parent().find('ul');
    if(that.css('display') != 'block') {
      that.slideToggle('fast');
      $(this).parent().parent().addClass('ddactive');
    };
  });
  $(document).bind('click', function(e){
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass('dropdown ddactive')) {
      $('.dropdown dd ul').slideUp('fast');
      $('.dropdown').removeClass('ddactive');
    };
  });
  $('.acctSelect input[type="radio"]').on('click', function(){
    var title = $(this).next('label').children('span').html();
    if($(this).is(':checked')){
      var html = '<span>' + title + '</span>';
      $('.acctSel').html(html);
      $(".dropdown dd ul").slideUp('fast');
      $('.dropdown').removeClass('ddactive');
    }
  });
  $('.nav-mobile-button').click(function(){
    $('.nav-mobile-button li').toggleClass('nav-mobile-active');
    $('html').toggleClass('menu-open');
  });
});
