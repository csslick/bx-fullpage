$(function() {
  // 슬라이더 옵션
  var slider = $(".bxslider").bxSlider({
    mode: "vertical",
    auto: false,
    autoControls: true,
    controls: false,
    stopAutoOnClick: true,
    pager: false,
    keyboardEnabled: true,
    infiniteLoop: false,
    // 모바일 터치용
    onSlideNext: function() {
      var idx = slider.getCurrentSlide();
      update_indicator(idx);
    },
    onSlidePrev: function() {
      var idx = slider.getCurrentSlide();
      update_indicator(idx);
    }
  });

  // 슬라이더 total 페이지 수
  var slider_total_count = slider.getSlideCount();
  console.log(slider_total_count);

  // 인디케이터 생성
  for (var i = 0; i < slider_total_count; i++) {
    $(".indicator").append('<li><a href="#">' + i + "</a></li>");
  }

  // 인디케이터 UI 초기화
  $(".indicator li")
    .first()
    .addClass("active");

  // 인디케이터 업데이트
  function update_indicator(i) {
    $(".indicator li").removeClass("active");
    $(".indicator li")
      .eq(i)
      .addClass("active");
    console.log("li-index " + i);

    // page enter Animation
    if (i == 0) {
      $("section.s1 .container").addClass("fade-slide-down");
    }
    if (i == 1) {
      $("section.s2 .container").addClass("fade-slide-down");
    }
    if (i == 2) {
      $("section.s3 .container").addClass("fade-slide-down");
    }
    if (i == 3) {
      $("section.s4 .container").addClass("fade-slide-down");
    }
  }

  // 인디케이터 버튼 이벤트
  $(".indicator li").on("click", function() {
    var idx = $(this).index();
    console.log("idx ", idx);
    update_indicator(idx);

    slider.goToSlide(idx);
    if (idx === slider_total_count - 1) {
      $("footer").addClass("show");
    } else {
      $("footer").removeClass("show");
    }
  });

  // 마우스휠 페이지 스크롤
  var doc = $(document).on("mousewheel", function(e, delta) {
    if (delta > 0) {
      // 올릴때
      console.log("올림");
      slider.goToPrevSlide();
    } else if (delta < 0) {
      console.log("내림");
      slider.goToNextSlide();
    }

    // 현재 슬라이더 번호 확인
    var idx = slider.getCurrentSlide();
    console.log(idx);

    // 인디케이터 업데이트
    update_indicator(idx);

    // 마지막 페이지인 경우 footer 출력(액션)
    if (idx === slider_total_count - 1) {
      $("footer").addClass("show");
    } else {
      $("footer").removeClass("show");
    }
  });

  // 메인 네비게이션 클릭시 문서내 이동
  $("#main-menu li").on("click", function() {
    var menu_idx = $(this).index();

    slider.goToSlide(menu_idx);
    update_indicator(menu_idx);
  });

  // 인디케이터 첫 페이지 업데이트
  update_indicator(0);
}); // end $()
