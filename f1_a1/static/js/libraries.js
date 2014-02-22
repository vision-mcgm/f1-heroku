
//DocumentReady handlers

$(window).load(fxInit);
  //$(window).on("load resize", fxInit);

  function fxInit()
{
    jQuery('ul.sf-menu').superfish();
    $('textarea').autosize();   
  }


