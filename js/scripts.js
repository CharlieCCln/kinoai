let actors = []
let imgBg = $('.video').css("background-image");
let cropper = null;


$(document).ready(function(){

  $(".tracklet").hide();
  $("#videoimg").hide();

  $("#framing").on('click', function(){
    if($("#framing").hasClass('ui-accordion-header-active')){
      $(".tracklet").hide();
      $("#videoimg").css({"opacity": "0"});
      cropper.destroy();
    }
    else{
      $(".tracklet").show();
    }
  })

  $("#accordion").accordion({
    collapsible: true,
    heightStyle: "content"
  });

  $( "#tabs" ).tabs({
    active: 0
  });

  // état initial du choix de cadrage
  $("#frame").selectmenu();

  // tab custom
  $('#custom-a').on('click', function(){
    $(".tracklet").hide();
    $("#videoimg").css({"opacity": "1"});
    let i = 0;

    croppingImg();
  })

  function croppingImg(){

    const myGreatImage = document.getElementById('videoimg');
    cropper = new Cropper(myGreatImage, {
      zoomable: false,
      crop(event) {
        const canvas = this.cropper.getCroppedCanvas();
      }
    });
  }

  $('#create').on('click', function(){
    const imgUrl = cropper.getCroppedCanvas().toDataURL();
    i++;

    $('.timeline').append("<div class='scene-row'><div class='scene'><img src='"+imgUrl+"' class='scene-crop' id='"+i+"'><span id='"+i+"-info'></span></div> <div class='trash' id='"+i+"-trash'></div></div>");
    $('#'+i+'-info').html('Custom');
    $('#'+i+'-info').hide();

    //afficher les infos de la scène
    $('.scene').mouseover(function(){
      $(this).css({
        "box-shadow": "inset 2000px 0 0 0 #418CFF"
      });
      $(this).find('span').show();
      $(this).find('img').hide();
    })

    $('.scene').mouseout(function(){
      $(this).css({
        "box-shadow": "none"
      });
      $(this).find('span').hide();
      $(this).find('img').show();
    })

    $('.trash').on('click', function(){
      $(this).closest('.scene-row').remove();
      i++;
    })
  })

  $('#cancel').on('click', function(){
    cropper.reset();
  })

  // état initial du tab preset
  $('#preset-a').on('click', function(){
    $("#videoimg").css({"opacity": "0"});
    $(".tracklet").show();
    cropper.destroy();
    $(".video").show();
  })

  // choix de ratio (sans acteurs)
  $("#ratio").selectmenu({
    change: function( event, data ) {
      if(data.item.value == "original-ratio" || data.item.value == "169"){
        $(".video").css("background-size", "auto 100%");
        $("#woman-blue").css({"left": "70%", "top": "21%"});
        $("#man-red-tie").css({"left": "55%", "top": "40%"});
        $("#man-green-tie").css({"left": "45%", "top": "40%"});
      }
      if(data.item.value == "half"){
        $(".video").css("background-size", "50% 100%");
        $("#man-red-tie").css("left", "53%");
        $("#woman-blue").css({"left": "60%", "top": "21%"});
      }
      if(data.item.value == "twice"){
        $(".video").css("background-size", "100% 50%");
        $("#man-red-tie").css("left", "58%");
        $("#woman-blue").css({"left": "75%", "top": "35%"});
      }
      if(data.item.value == "43"){
        $(".video").css("background-size", "75% 100%");
        $("#woman-blue").css({"left": "67.5%", "top": "21%"});
        $("#man-red-tie").css({"left": "55%", "top": "40%"});
      }
      if(data.item.value == "4k2k"){
        $(".video").css("background-size", "100% 90%");
        $("#woman-blue").css({"left": "74%", "top": "22.5%"});
      }
    }
  });

  // lorsqu'on clique sur un tracklet
  $('.tracklet').on('click', function(){
    // afficher les acteurs sélectionnés
    $('#actors-preset').addClass('selected');
    let cible = $(this).data('cible');

    $('#'+cible+" .border").toggleClass('greenborder');
    $('#'+cible+" span").toggleClass('greenname');

    if($('#'+cible+" .border").hasClass('greenborder')){
      actors.push(cible);
    }
    else {
      actors = jQuery.grep(actors, function(value) {
        return value != cible;
      });
    }

    $('#actors-preset').text(actors);

    // type de plan

    if($('#woman-blue .border').hasClass('greenborder')){
      $("#frame").selectmenu({
        change: function( event, data ) {
          let bg = data.item.value;
          // si l'on ne choisit pas de type de cadrage
          if(data.item.value == "video"){
            var imageVideo = "./assets/video.jpg"
            $(".video").css("background-image", "url(" + imageVideo + ")");
            $(".tracklet").show();
            $("#ratio").selectmenu({
              change: function( event, data ) {
                if(data.item.value == "original-ratio" || data.item.value == "169"){
                  $(".video").css("background-size", "auto 100%");
                  $("#woman-blue").css({"left": "70%", "top": "21%"});
                  $("#man-red-tie").css({"left": "55%", "top": "40%"});
                  $("#man-green-tie").css({"left": "45%", "top": "40%"});
                }
                if(data.item.value == "half"){
                  $(".video").css("background-size", "50% 100%");
                  $("#man-red-tie").css("left", "53%");
                  $("#woman-blue").css({"left": "60%", "top": "21%"});
                }
                if(data.item.value == "twice"){
                  $(".video").css("background-size", "100% 50%");
                  $("#man-red-tie").css("left", "58%");
                  $("#woman-blue").css({"left": "75%", "top": "35%"});
                }
                if(data.item.value == "43"){
                  $(".video").css("background-size", "75% 100%");
                  $("#woman-blue").css({"left": "67.5%", "top": "21%"});
                  $("#man-red-tie").css({"left": "55%", "top": "40%"});
                }
                if(data.item.value == "4k2k"){
                  $(".video").css("background-size", "100% 90%");
                  $("#woman-blue").css({"left": "74%", "top": "22.5%"});
                }
              }
            });
          }
          // si l'on choisit un cadrage
          else{
            var imageUrl = "./assets/woman-blue-"+data.item.value+".jpg"
            $(".video").css("background-image", "url(" + imageUrl + ")");
            $(".tracklet").hide();

            $("#ratio").selectmenu({
              change: function( event, data ) {
                if(data.item.value == "original-ratio" || data.item.value == "169"){
                  $(".video").css({"background-size": "auto 100%", "width": "100%", "height": "100%"});
                }
                if(data.item.value == "half"){
                  $(".video").css({"background-size": "auto 100%", "width": "50%", "height": "100%"});
                }
                if(data.item.value == "twice"){
                  $(".video").css({"background-image": "url(./assets/woman-blue-"+bg+"-twice.jpg)", "background-size": "100% auto", "width": "100%", "height": "100%"});
                }
                if(data.item.value == "43"){
                  $(".video").css({"background-size": "auto 100%", "width": "75%", "height": "100%"});
                }
                if(data.item.value == "4k2k"){
                  $(".video").css({"background-size": "100% auto", "width": "100%", "height": "90%"});
                }
              }
            });
          }
        }
      });
    }

    if($('#man-red-tie .border').hasClass('greenborder')){
      $("#frame").selectmenu({
        change: function( event, data ) {
          let bg = data.item.value;
          // si l'on ne choisit pas de type de cadrage
          if(data.item.value == "video"){
            var imageVideo = "./assets/video.jpg"
            $(".video").css("background-image", "url(" + imageVideo + ")");
            $(".tracklet").show();
            $("#ratio").selectmenu({
              change: function( event, data ) {
                if(data.item.value == "original-ratio" || data.item.value == "169"){
                  $(".video").css("background-size", "auto 100%");
                  $("#woman-blue").css({"left": "70%", "top": "21%"});
                  $("#man-red-tie").css({"left": "55%", "top": "40%"});
                  $("#man-green-tie").css({"left": "45%", "top": "40%"});
                }
                if(data.item.value == "half"){
                  $(".video").css("background-size", "50% 100%");
                  $("#man-red-tie").css("left", "53%");
                  $("#woman-blue").css({"left": "60%", "top": "21%"});
                }
                if(data.item.value == "twice"){
                  $(".video").css("background-size", "100% 50%");
                  $("#man-red-tie").css("left", "58%");
                  $("#woman-blue").css({"left": "75%", "top": "35%"});
                }
                if(data.item.value == "43"){
                  $(".video").css("background-size", "75% 100%");
                  $("#woman-blue").css({"left": "67.5%", "top": "21%"});
                  $("#man-red-tie").css({"left": "55%", "top": "40%"});
                }
                if(data.item.value == "4k2k"){
                  $(".video").css("background-size", "100% 90%");
                  $("#woman-blue").css({"left": "74%", "top": "22.5%"});
                }
              }
            });
          }
          // si l'on choisit un cadrage
          else{
            var imageUrl = "./assets/man-red-tie-"+data.item.value+".jpg"
            $(".video").css("background-image", "url(" + imageUrl + ")");
            $(".tracklet").hide();

            $("#ratio").selectmenu({
              change: function( event, data ) {
                if(data.item.value == "original-ratio" || data.item.value == "169"){
                  $(".video").css({"background-size": "auto 100%", "width": "100%", "height": "100%"});
                }
                if(data.item.value == "half"){
                  $(".video").css({"background-size": "auto 100%", "width": "50%", "height": "100%"});
                }
                if(data.item.value == "twice"){
                  $(".video").css({"background-image": "url(./assets/man-red-tie-"+bg+"-twice.jpg)", "background-size": "100% auto", "width": "100%", "height": "100%"});
                }
                if(data.item.value == "43"){
                  $(".video").css({"background-size": "auto 100%", "width": "75%", "height": "100%"});
                }
                if(data.item.value == "4k2k"){
                  $(".video").css({"background-size": "100% auto", "width": "100%", "height": "90%"});
                }
              }
            });
          }
        }
      });
    }

    if($('#man-green-tie .border').hasClass('greenborder')){
      $("#frame").selectmenu({
        change: function( event, data ) {
          let bg = data.item.value;
          // si l'on ne choisit pas de type de cadrage
          if(data.item.value == "video"){
            var imageVideo = "./assets/video.jpg"
            $(".video").css("background-image", "url(" + imageVideo + ")");
            $(".tracklet").show();
            $("#ratio").selectmenu({
              change: function( event, data ) {
                if(data.item.value == "original-ratio" || data.item.value == "169"){
                  $(".video").css("background-size", "auto 100%");
                  $("#woman-blue").css({"left": "70%", "top": "21%"});
                  $("#man-red-tie").css({"left": "55%", "top": "40%"});
                  $("#man-green-tie").css({"left": "45%", "top": "40%"});
                }
                if(data.item.value == "half"){
                  $(".video").css("background-size", "50% 100%");
                  $("#man-red-tie").css("left", "53%");
                  $("#woman-blue").css({"left": "60%", "top": "21%"});
                }
                if(data.item.value == "twice"){
                  $(".video").css("background-size", "100% 50%");
                  $("#man-red-tie").css("left", "58%");
                  $("#woman-blue").css({"left": "75%", "top": "35%"});
                }
                if(data.item.value == "43"){
                  $(".video").css("background-size", "75% 100%");
                  $("#woman-blue").css({"left": "67.5%", "top": "21%"});
                  $("#man-red-tie").css({"left": "55%", "top": "40%"});
                }
                if(data.item.value == "4k2k"){
                  $(".video").css("background-size", "100% 90%");
                  $("#woman-blue").css({"left": "74%", "top": "22.5%"});
                }
              }
            });
          }
          // si l'on choisit un cadrage
          else{
            var imageUrl = "./assets/man-green-tie-"+data.item.value+".jpg"
            $(".video").css("background-image", "url(" + imageUrl + ")");
            $(".tracklet").hide();

            $("#ratio").selectmenu({
              change: function( event, data ) {
                if(data.item.value == "original-ratio" || data.item.value == "169"){
                  $(".video").css({"background-size": "auto 100%", "width": "100%", "height": "100%"});
                }
                if(data.item.value == "half"){
                  $(".video").css({"background-size": "auto 100%", "width": "50%", "height": "100%"});
                }
                if(data.item.value == "twice"){
                  $(".video").css({"background-image": "url(./assets/man-green-tie-"+bg+"-twice.jpg)", "background-size": "100% auto", "width": "100%", "height": "100%"});
                }
                if(data.item.value == "43"){
                  $(".video").css({"background-size": "auto 100%", "width": "75%", "height": "100%"});
                }
                if(data.item.value == "4k2k"){
                  $(".video").css({"background-size": "100% auto", "width": "100%", "height": "90%"});
                }
              }
            });
          }
        }
      });
    }

    if($('#woman-blue .border').hasClass('greenborder') && $('#man-red-tie .border').hasClass('greenborder')){
      $("#frame").selectmenu({
        change: function( event, data ) {
          let bg = data.item.value;
          // si l'on ne choisit pas de type de cadrage
          if(data.item.value == "video"){
            var imageVideo = "./assets/video.jpg"
            $(".video").css("background-image", "url(" + imageVideo + ")");
            $(".tracklet").show();
            $("#ratio").selectmenu({
              change: function( event, data ) {
                if(data.item.value == "original-ratio" || data.item.value == "169"){
                  $(".video").css("background-size", "auto 100%");
                  $("#woman-blue").css({"left": "70%", "top": "21%"});
                  $("#man-red-tie").css({"left": "55%", "top": "40%"});
                  $("#man-green-tie").css({"left": "45%", "top": "40%"});
                }
                if(data.item.value == "half"){
                  $(".video").css("background-size", "50% 100%");
                  $("#man-red-tie").css("left", "53%");
                  $("#woman-blue").css({"left": "60%", "top": "21%"});
                }
                if(data.item.value == "twice"){
                  $(".video").css("background-size", "100% 50%");
                  $("#man-red-tie").css("left", "58%");
                  $("#woman-blue").css({"left": "75%", "top": "35%"});
                }
                if(data.item.value == "43"){
                  $(".video").css("background-size", "75% 100%");
                  $("#woman-blue").css({"left": "67.5%", "top": "21%"});
                  $("#man-red-tie").css({"left": "55%", "top": "40%"});
                }
                if(data.item.value == "4k2k"){
                  $(".video").css("background-size", "100% 90%");
                  $("#woman-blue").css({"left": "74%", "top": "22.5%"});
                }
              }
            });
          }
          // si l'on choisit un cadrage
          else{
            var imageUrl = "./assets/woman-blue-man-red-tie-"+data.item.value+".jpg"
            $(".video").css("background-image", "url(" + imageUrl + ")");
            $(".tracklet").hide();

            $("#ratio").selectmenu({
              change: function( event, data ) {
                if(data.item.value == "original-ratio" || data.item.value == "169"){
                  $(".video").css({"background-size": "auto 100%", "width": "100%", "height": "100%"});
                }
                if(data.item.value == "half"){
                  $(".video").css({"background-size": "auto 100%", "width": "50%", "height": "100%"});
                }
                if(data.item.value == "twice"){
                  $(".video").css({"background-image": "url(./assets/woman-blue-man-red-tie-"+bg+"-twice.jpg)", "background-size": "100% auto", "width": "100%", "height": "100%"});
                }
                if(data.item.value == "43"){
                  $(".video").css({"background-size": "auto 100%", "width": "75%", "height": "100%"});
                }
                if(data.item.value == "4k2k"){
                  $(".video").css({"background-size": "100% auto", "width": "100%", "height": "90%"});
                }
              }
            });
          }
        }
      });
    }

    if($('#woman-blue .border').hasClass('greenborder') && $('#man-green-tie .border').hasClass('greenborder')){
      $("#frame").selectmenu({
        change: function( event, data ) {
          let bg = data.item.value;
          // si l'on ne choisit pas de type de cadrage
          if(data.item.value == "video"){
            var imageVideo = "./assets/video.jpg"
            $(".video").css("background-image", "url(" + imageVideo + ")");
            $(".tracklet").show();
            $("#ratio").selectmenu({
              change: function( event, data ) {
                if(data.item.value == "original-ratio" || data.item.value == "169"){
                  $(".video").css("background-size", "auto 100%");
                  $("#woman-blue").css({"left": "70%", "top": "21%"});
                  $("#man-red-tie").css({"left": "55%", "top": "40%"});
                  $("#man-green-tie").css({"left": "45%", "top": "40%"});
                }
                if(data.item.value == "half"){
                  $(".video").css("background-size", "50% 100%");
                  $("#man-red-tie").css("left", "53%");
                  $("#woman-blue").css({"left": "60%", "top": "21%"});
                }
                if(data.item.value == "twice"){
                  $(".video").css("background-size", "100% 50%");
                  $("#man-red-tie").css("left", "58%");
                  $("#woman-blue").css({"left": "75%", "top": "35%"});
                }
                if(data.item.value == "43"){
                  $(".video").css("background-size", "75% 100%");
                  $("#woman-blue").css({"left": "67.5%", "top": "21%"});
                  $("#man-red-tie").css({"left": "55%", "top": "40%"});
                }
                if(data.item.value == "4k2k"){
                  $(".video").css("background-size", "100% 90%");
                  $("#woman-blue").css({"left": "74%", "top": "22.5%"});
                }
              }
            });
          }
          // si l'on choisit un cadrage
          else{
            var imageUrl = "./assets/woman-blue-man-green-tie-"+data.item.value+".jpg"
            $(".video").css("background-image", "url(" + imageUrl + ")");
            $(".tracklet").hide();

            $("#ratio").selectmenu({
              change: function( event, data ) {
                if(data.item.value == "original-ratio" || data.item.value == "169"){
                  $(".video").css({"background-size": "auto 100%", "width": "100%", "height": "100%"});
                }
                if(data.item.value == "half"){
                  $(".video").css({"background-size": "auto 100%", "width": "50%", "height": "100%"});
                }
                if(data.item.value == "twice"){
                  $(".video").css({"background-image": "url(./assets/woman-blue-man-green-tie-"+bg+"-twice.jpg)", "background-size": "100% auto", "width": "100%", "height": "100%"});
                }
                if(data.item.value == "43"){
                  $(".video").css({"background-size": "auto 100%", "width": "75%", "height": "100%"});
                }
                if(data.item.value == "4k2k"){
                  $(".video").css({"background-size": "100% auto", "width": "100%", "height": "90%"});
                }
              }
            });
          }
        }
      });
    }

    if($('#man-red-tie .border').hasClass('greenborder') && $('#man-green-tie .border').hasClass('greenborder')){
      $("#frame").selectmenu({
        change: function( event, data ) {
          let bg = data.item.value;
          // si l'on ne choisit pas de type de cadrage
          if(data.item.value == "video"){
            var imageVideo = "./assets/video.jpg"
            $(".video").css("background-image", "url(" + imageVideo + ")");
            $(".tracklet").show();
            $("#ratio").selectmenu({
              change: function( event, data ) {
                if(data.item.value == "original-ratio" || data.item.value == "169"){
                  $(".video").css("background-size", "auto 100%");
                  $("#woman-blue").css({"left": "70%", "top": "21%"});
                  $("#man-red-tie").css({"left": "55%", "top": "40%"});
                  $("#man-green-tie").css({"left": "45%", "top": "40%"});
                }
                if(data.item.value == "half"){
                  $(".video").css("background-size", "50% 100%");
                  $("#man-red-tie").css("left", "53%");
                  $("#woman-blue").css({"left": "60%", "top": "21%"});
                }
                if(data.item.value == "twice"){
                  $(".video").css("background-size", "100% 50%");
                  $("#man-red-tie").css("left", "58%");
                  $("#woman-blue").css({"left": "75%", "top": "35%"});
                }
                if(data.item.value == "43"){
                  $(".video").css("background-size", "75% 100%");
                  $("#woman-blue").css({"left": "67.5%", "top": "21%"});
                  $("#man-red-tie").css({"left": "55%", "top": "40%"});
                }
                if(data.item.value == "4k2k"){
                  $(".video").css("background-size", "100% 90%");
                  $("#woman-blue").css({"left": "74%", "top": "22.5%"});
                }
              }
            });
          }
          // si l'on choisit un cadrage
          else{
            var imageUrl = "./assets/man-red-tie-man-green-tie-"+data.item.value+".jpg"
            $(".video").css("background-image", "url(" + imageUrl + ")");
            $(".tracklet").hide();

            $("#ratio").selectmenu({
              change: function( event, data ) {
                if(data.item.value == "original-ratio" || data.item.value == "169"){
                  $(".video").css({"background-size": "auto 100%", "width": "100%", "height": "100%"});
                }
                if(data.item.value == "half"){
                  $(".video").css({"background-size": "auto 100%", "width": "50%", "height": "100%"});
                }
                if(data.item.value == "twice"){
                  $(".video").css({"background-image": "url(./assets/man-red-tie-man-green-tie-"+bg+"-twice.jpg)", "background-size": "100% auto", "width": "100%", "height": "100%"});
                }
                if(data.item.value == "43"){
                  $(".video").css({"background-size": "auto 100%", "width": "75%", "height": "100%"});
                }
                if(data.item.value == "4k2k"){
                  $(".video").css({"background-size": "100% auto", "width": "100%", "height": "90%"});
                }
              }
            });
          }
        }
      });
    }

    if($('#woman-blue .border').hasClass('greenborder') && $('#man-red-tie .border').hasClass('greenborder') && $('#man-green-tie .border').hasClass('greenborder')){
      $("#frame").selectmenu({
        change: function( event, data ) {
          let bg = data.item.value;
          // si l'on ne choisit pas de type de cadrage
          if(data.item.value == "video"){
            var imageVideo = "./assets/video.jpg"
            $(".video").css("background-image", "url(" + imageVideo + ")");
            $(".tracklet").show();
            $("#ratio").selectmenu({
              change: function( event, data ) {
                if(data.item.value == "original-ratio" || data.item.value == "169"){
                  $(".video").css("background-size", "auto 100%");
                  $("#woman-blue").css({"left": "70%", "top": "21%"});
                  $("#man-red-tie").css({"left": "55%", "top": "40%"});
                  $("#man-green-tie").css({"left": "45%", "top": "40%"});
                }
                if(data.item.value == "half"){
                  $(".video").css("background-size", "50% 100%");
                  $("#man-red-tie").css("left", "53%");
                  $("#woman-blue").css({"left": "60%", "top": "21%"});
                }
                if(data.item.value == "twice"){
                  $(".video").css("background-size", "100% 50%");
                  $("#man-red-tie").css("left", "58%");
                  $("#woman-blue").css({"left": "75%", "top": "35%"});
                }
                if(data.item.value == "43"){
                  $(".video").css("background-size", "75% 100%");
                  $("#woman-blue").css({"left": "67.5%", "top": "21%"});
                  $("#man-red-tie").css({"left": "55%", "top": "40%"});
                }
                if(data.item.value == "4k2k"){
                  $(".video").css("background-size", "100% 90%");
                  $("#woman-blue").css({"left": "74%", "top": "22.5%"});
                }
              }
            });
          }
          // si l'on choisit un cadrage
          else{
            var imageUrl = "./assets/woman-blue-man-red-tie-man-green-tie-"+data.item.value+".jpg"
            $(".video").css("background-image", "url(" + imageUrl + ")");
            $(".tracklet").hide();

            $("#ratio").selectmenu({
              change: function( event, data ) {
                if(data.item.value == "original-ratio" || data.item.value == "169"){
                  $(".video").css({"background-size": "auto 100%", "width": "100%", "height": "100%"});
                }
                if(data.item.value == "half"){
                  $(".video").css({"background-size": "auto 100%", "width": "50%", "height": "100%"});
                }
                if(data.item.value == "twice"){
                  $(".video").css({"background-image": "url(./assets/woman-blue-man-red-tie-man-green-tie-"+bg+"-twice.jpg)", "background-size": "100% auto", "width": "100%", "height": "100%"});
                }
                if(data.item.value == "43"){
                  $(".video").css({"background-size": "auto 100%", "width": "75%", "height": "100%"});
                }
                if(data.item.value == "4k2k"){
                  $(".video").css({"background-size": "100% auto", "width": "100%", "height": "90%"});
                }
              }
            });
          }
        }
      });
    }

    // si aucun acteur n'est selectionné
    if(actors.length==0){
      $('#actors-preset').removeClass('selected');
      $('#actors-preset').text('Selected actors...');
      $("#frame").selectmenu({
        change: function( event, data ) {
          var imageVideo = "./assets/video.jpg"
          $(".video").css("background-image", "url(" + imageVideo + ")");
          $(".tracklet").show();
        }
      });
      // choix de ratio (sans acteurs)
      $("#ratio").selectmenu({
        change: function( event, data ) {
          if(data.item.value == "original-ratio" || data.item.value == "169"){
            $(".video").css("background-size", "auto 100%");
            $("#woman-blue").css({"left": "70%", "top": "21%"});
            $("#man-red-tie").css({"left": "55%", "top": "40%"});
            $("#man-green-tie").css({"left": "45%", "top": "40%"});
          }
          if(data.item.value == "half"){
            $(".video").css("background-size", "50% 100%");
            $("#man-red-tie").css("left", "53%");
            $("#woman-blue").css({"left": "60%", "top": "21%"});
          }
          if(data.item.value == "twice"){
            $(".video").css("background-size", "100% 50%");
            $("#man-red-tie").css("left", "58%");
            $("#woman-blue").css({"left": "75%", "top": "35%"});
          }
          if(data.item.value == "43"){
            $(".video").css("background-size", "75% 100%");
            $("#woman-blue").css({"left": "67.5%", "top": "21%"});
            $("#man-red-tie").css({"left": "55%", "top": "40%"});
          }
          if(data.item.value == "4k2k"){
            $(".video").css("background-size", "100% 90%");
            $("#woman-blue").css({"left": "74%", "top": "22.5%"});
          }
        }
      });
    }
  })

  // boutons toggle
  $('.toggle').on('click',function(){
    $(this).toggleClass('on');
  })

  $('#keep-out').on('click',function(){
    $('.video').toggleClass('keep-out');
  })

  $('#gaze-direction').on('click',function(){
    $('.video').toggleClass('gaze-direction');
  })

  $('#stage-position').on('click',function(){
    $('.video').toggleClass('stage-position');
  })

  var i = 0;
  //créer la scène
  $('#create-scene').on('click', function(){
    let sceneBg = $('.video').css("background-image");
    let sceneW = $('.video').css("width");
    let sceneH = $('.video').css("height");
    let frameInfo = $('#frame-button .ui-selectmenu-text').html();
    let ratioInfo = $('#ratio-button .ui-selectmenu-text').html();
    i++;
    $('.timeline').append("<div class='scene-row'><div class='scene' id='"+i+"'><span id='"+i+"-info'></span></div> <div class='trash' id='"+i+"-trash'></div></div>");
    $('#'+i).css({
      "background-image": sceneBg
    });
    $('#'+i+'-info').html(actors+', '+frameInfo+', '+ratioInfo);
    $('#'+i+'-info').hide();

    //afficher les infos de la scène
    $('.scene').mouseover(function(){
      $(this).css({
        "box-shadow": "inset 2000px 0 0 0 #418CFF"
      });
      $(this).children().show();

      // afficher la scène
      $(this).on('click', function(){
        let bg = $(this).css("background-image");
        $('.video').css({
          "background-image": bg,
          "width": "100%"
        })
        $(".tracklet").hide();
      })
    })

    $('.scene').mouseout(function(){
      $(this).css({
        "box-shadow": "none"
      });
      $(this).children().hide();
    })

    $('.trash').on('click', function(){
      $(this).closest('.scene-row').remove();
      i++;
    })
  })

  $( function() {

    $( ".video" ).draggable({
      revert: true,
       start: function( event, ui ) {$(".tracklet").hide();},
     });

    $( ".timeline" ).droppable({
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function( event, ui ) {
        $( this )
        .addClass( "ui-state-highlight" )

        let sceneBg = $('.video').css("background-image");
        let sceneW = $('.video').css("width");
        let sceneH = $('.video').css("height");
        let frameInfo = $('#frame-button .ui-selectmenu-text').html();
        let ratioInfo = $('#ratio-button .ui-selectmenu-text').html();
        i++;
        $('.timeline').append("<div class='scene-row'><div class='scene' id='"+i+"'><span id='"+i+"-info'></span></div> <div class='trash' id='"+i+"-trash'></div></div>");
        $('#'+i).css({
          "background-image": sceneBg
        });
        $('#'+i+'-info').html(actors+', '+frameInfo+', '+ratioInfo);
        $('#'+i+'-info').hide();

        //afficher les infos de la scène
        $('.scene').mouseover(function(){
          $(this).css({
            "box-shadow": "inset 2000px 0 0 0 #418CFF"
          });
          $(this).children().show();

          // afficher la scène
          $(this).on('click', function(){
            let bg = $(this).css("background-image");
            $('.video').css({
              "background-image": bg,
              "width": "100%"
            })
            $(".tracklet").hide();
          })
        })

        $('.scene').mouseout(function(){
          $(this).css({
            "box-shadow": "none"
          });
          $(this).children().hide();
        })

        $('.trash').on('click', function(){
          $(this).closest('.scene-row').remove();
          i++;
        })
      }
    });
  });
})
