$(document).ready(function(){
  $('.carousel__inner').slick({
        speed: 1500,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/content/prev__arrow.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/content/next__arrow.png"></button>'
        
});

 $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab-active)', function() {
    $(this)
      .addClass('catalog__tab-active').siblings().removeClass('catalog__tab-active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content-active').eq($(this).index()).addClass('catalog__content-active');
  });

  $('.catalog__item-link').each(function(i){
    $(this).on('click', function(e){
      e.preventDefault();
      $('.catalog__item-content').eq(i).toggleClass('catalog__item-content-active');
       $('.catalog__item-list').eq(i).toggleClass('catalog__item-list-active');
       $('.catalog__item-back').eq(i).toggleClass('catalog__item-back-active');

    });
  });


  $('.catalog__item-back').each(function(i){
    $(this).on('click', function(e){
      e.preventDefault();
      $('.catalog__item-content').eq(i).toggleClass('catalog__item-content-active');
       $('.catalog__item-list').eq(i).toggleClass('catalog__item-list-active');
        $('.catalog__item-back').eq(i).toggleClass('catalog__item-back-active');
      
    });
  });
  // modals

// $('[data-modal=consultation]').fadeOut(); проверка работы дата атрибутов и кнопки должныисезнуть

$('[data-modal=consultation]').on('click' , function(){
  $('.overlay, #consultation').fadeIn('fast');

});
$('.modal__close').on('click' , function(){
  $('.overlay , #consultation , #order , #thanks').fadeOut('fast');
});

 $('.button__mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog__item-subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    $('#consultation-form').validate();
    $('#consultation form').validate({
      rules:{
       name: {
                    required: true,
                    minlength: 2
                 },
         phone: 'requared',
          email: {
            requared:true,
            email:true,
          }
      },
   
         messages: {
          name: {
                   required: "Пожалуйста, введите свое имя",
                  minlength: jQuery.validator.format("Введите {0} символа!")
                 },
          phone:'Введите ваш номер телефона',
          email: {
          required: "Пожалуйста, введите свою почту",
          email: "Не правильно введен адрес почты",
    }
  }
    });
    $('#order form').validate();

    $('input[name=phone]').mask("+7(999) 999-99-99");

     $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
});

