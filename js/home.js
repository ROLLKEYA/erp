
console.log('home loaded!');

(function(){
    var home = {
        
        init: function(){
           
          this.navEvent();
        
          this.eventBind_report();
          this. loction_go();

        
        },
        // 事件绑定
        // 首页 导航
        navEvent:function(){
                        $('.gt-buttonEven ').on('click',function(el){
                        $(this).parent().find('.gt-buttonEven').removeClass('gt-buttonClik');
                        $(this).addClass('gt-buttonClik') 
                    })
                    $('.gt-nav').on('click',function(){
                        $(this).siblings().removeClass('gt-navBlock');
                        $(this).addClass('gt-navBlock');
                        $('iframe').hide();
                    })

                

                                        
                        // 左侧导航栏切换效果 前进 后退
                        $('.gt-goButoon').click(function(){

                            var i=0;
                        var clre=setInterval(function(){
                            i++;
                        $('.gt-pagButoon').show(); 
                        if(i==1){
                        clearInterval(clre);
                        }   
                            },1000)
                        $(this).hide();
                        $('.gt-navActioan').show();
                        $('.gt-navBox').hide();
                        $('.gt-navActioan').animate({left:'0px'},1000);
                        $('.gt-pagButoon').animate({left: '137px'});


                        })

                        $('.gt-pagButoon').click(function(){
                        
                        $('.gt-navActioan').animate({left:'-140px'});
                        $('.gt-goButoon').show();
                            $(this).hide();
                            $('.gt-navBox').show();
                        })

                        // 左侧导航栏划过背景变深色

                        $('.gt-buttonEven').hover(function(){
                        
                            $(this).css({"background-color":"rgba(34, 46, 62, 1)","border-left":"4px solid #00cc99"})
                            $(this).siblings().css("background-color","");
                        },function(){
                            $(this).css({"background-color":"","border-left":""})
                        });


                        

                        // 修改头像
                        $('.gt-pesonName').hover(function(){
                        $('.gt-editA').show();
                        console.log(0);
                        },function(){$('.gt-editA').hide();})

                        $('.gt-sel').hover(function(){
                        $('.gt-edit').show();
                        },function(){$('.gt-edit').hide();})

                        $('.gt-edit').hover(function(){
                        $('.gt-editBt').addClass('gt-hoveBt');
                        },function(){
                            $('.gt-editBt').removeClass('gt-hoveBt');
                        })

                        $('.gt-editA').hover(function(){
                        $('.gt-editBtA').addClass('gt-hoveBt');
                        },function(){
                            $('.gt-editBtA').removeClass('gt-hoveBt');
                        })
        },

            

      
         //报表中心
        eventBind_report: function(){
                        
                $('.gt-NavReporting').on('click',function(el){
                    $('.gt-centCom').hide();
                $('.gt-reporting').show();
                    
            })
            
            $('#gt-CentGt1').on('click',function(){
                $(this).addClass('gt-clikClor');
                $(this).siblings().removeClass('gt-clikClor');
                $('#CentSub1').show();
                  $('#CentSub1').siblings().hide();
            })

             $('#gt-CentGt2').on('click',function(){
                $(this).addClass('gt-clikClor');
                $(this).siblings().removeClass('gt-clikClor');
                 $('#CentSub2').show();
                  $('#CentSub2').siblings().hide();
            })

             $('#gt-CentGt3').on('click',function(){
                $(this).addClass('gt-clikClor');
                $(this).siblings().removeClass('gt-clikClor');
                 $('#CentSub3').show();
                  $('#CentSub3').siblings().hide();
            })

             $('#gt-CentGt4').on('click',function(){
                $(this).addClass('gt-clikClor');
                $(this).siblings().removeClass('gt-clikClor');
                 $('#CentSub4').show();
                  $('#CentSub4').siblings().hide();
            })

             $('#gt-CentGt5').on('click',function(){
                $(this).addClass('gt-clikClor');
                $(this).siblings().removeClass('gt-clikClor');
                 $('#CentSub5').show();
                  $('#CentSub5').siblings().hide();
            })

            $('#gt-CentGt6').on('click',function(){
                $(this).addClass('gt-clikClor');
                $(this).siblings().removeClass('gt-clikClor');
                 $('#CentSub6').show();
                  $('#CentSub6').siblings().hide();
            })

            $('#gt-CentGt7').on('click',function(){
                $(this).addClass('gt-clikClor');
                $(this).siblings().removeClass('gt-clikClor');
                 $('#CentSub7').show();
                  $('#CentSub7').siblings().hide();
            })
      

        },
      loction_go:function(){
                            
            // 跳转
            $('#gt-deAdmincenter').click(function(){
             $('#gt-homeOne').show();
              $('#gt-homeOne').siblings().hide();
              $('.gt-deails').hide();
          
            })

            $('#gt-inFroM').on('click',function(){
              
                  
                    $('#gt-inform').show();
                    $('#gt-inform').siblings().hide();
                   $('.gt-deails').hide();
            })

          

            $('#gt-goods').on('click',function(){
                     $('#gt-good').show();
                    $('#gt-good').siblings().hide();
                      $('.gt-deails').hide();
              
            })

            $('#gt-returns').on('click',function(){
                  $('#gt-ret').show();
                 $('#gt-ret').siblings().hide();
                $('.gt-deails').hide();
            
            })

            $('#gt-query').on('click',function(){
                 $('#gt-que').show();
                 $('#gt-que').siblings().hide();
                $('.gt-deails').hide();
              
            })

            $('#gt-noties').on('click',function(){
                 $('#gt-not').show();
                 $('#gt-not').siblings().hide();
                $('.gt-deails').hide();
              
            })

            $('#gt-timetable').on('click',function(){
               $('#gt-timetab').show();
                 $('#gt-timetab').siblings().hide();
                $('.gt-deails').hide();
              
              
            })

            $('#gt-members').on('click',function(){
                 $('#gt-memb').show();
                 $('#gt-memb').siblings().hide();
                $('.gt-deails').hide();
               
            })

           
      }, 
      
        //   数据
        getData: function(){
           


        },
        // 渲染页面
        render: function(data){
            


              },
      
     
        };
    home.init();
})();






