console.log(54255);

function payfor(dataNb){
    console.log(dataNb);
       var orderNo=dataNb;
       $('#gt-Qcodepay').val(' ');
       $('.gt-backCur,.gt-backSp,#gt-Nobug').on('click',function(){
                               $('iframe', parent.document).hide();
                               $('#gt-deail', parent.document).show();
                                $('.gt-NavSupply ', parent.document).removeClass('gt-navBlock');
                                $('.gt-NavStage ', parent.document).addClass('gt-navBlock');
                                $('#gt-NavSupply ', parent.document).removeClass('gt-buttonClik');
                                $('#gt-NavStage', parent.document).addClass('gt-buttonClik');
                                $('#gt-NavStage', parent.document).removeClass('gt-navBlock');
    
                        });
                            $('#gt-continu').on('click',function(){

                                $.ajax({
                                       url:url+'/findGradeAllList.do',
                                        data:{
                                     
                                                                    
                                        }, 
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             
                                            
                                             var html=''
                                           for(var i=0;i<res.data.length;i++){
                                  html+=" <option value='' data-id="+ res.data[i].id+" >"+ res.data[i].gradeName +"</option> "      
                                
                                        }

                                top.frames['gt-homeOne'].document.getElementById('gt-Bselect').innerHTML= html;
                                                  allSbj();                        
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                              $('iframe', parent.document).hide();
                               $('#gt-deail', parent.document).hide();
                               $('.gt-trans',parent.document).hide();
                                 $('#gt-homeOne', parent.document).show();
                               
                            })

                            
                  /*    所有科目 */
                  var allSbj=function(){
                         $.ajax({
                                       url:url+'/findSubjectAllList.do',
                                        data:{
                                     
                                                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             
                                             var html=''
                                           for(var i=0;i<res.data.length;i++){
                                   html+=" <option value=''  data-id="+ res.data[i].id+" >"+ res.data[i].subjectName +"</option> "      
                                              
                                        }
                                top.frames['gt-homeOne'].document.getElementById('gt-Bsbujs').innerHTML= html;
                               

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                  }
       $('#gt-butonNext').attr('data-id',orderNo)
                 $.ajax({
          url:url+'/selectOrderByOrderNo.do',
                data:{
                 orderNo:orderNo,                   
          
                },
                       type:'post',
                    dataType:'json',
                    success: function(res){                                       

                console.log(res)
                    if(res.code===100){
                      /*  consumption 为空则没有会员信息*/
                      if(res.data.consumption===undefined||res.data.consumption===''||res.data.consumption===null)
                        {
                           $('#gt-Qmeber').hide();
                            $('.gt-consumption').hide();
                        }
                      $('#gt-Qtotal').text(res.data.allMoney);
                      $('#gt-haspay').text();
                      var neddpay= Number($('#gt-Qtotal').text())- Number($('#gt-haspay').text());
                      $('#gt-QneedPay').text(neddpay);
                      $('#gt-butonNext').attr('data-signid',res.data.signId)
                                                
                      }
                        },
                         error: function(){
                            console.log('网络出错');
                                        }
                                    });

}
         

(function(){
    var enronNameTree={
       initi:function(){
            this.returned();
           this.paymentType='';
                
           },
         titel:function(){
            
             $("td").each(function(){
              
            $(this).attr("title",$(this).text());
           
           });
       },
           returned:function(){
             var self=this;
              /*   选择积分，优惠 */
                $('.gt-orders').on('click','.gt-cube',function(){

                    if($(this).hasClass('gt-bakImg')){

                        $(this).removeClass('gt-bakImg');
                    }else{
                        $(this).addClass('gt-bakImg');
                    }
                })


             /*    选择支付方式 */

             $('.gt-paymentWay').on('click','.gt-paymentDiv ',function(){
                 $('.gt-paymentDiv').removeClass('gt-cashBack')
                 $(this).addClass('gt-cashBack');
                
             })
          
            


             $('#gt-butback').on('click',function(){
                  $('#gt-homeTree', parent.document).hide();
                   $('#gt-homeTow', parent.document).show();
             })
                $('#gt-canback,#gt-back').on('click',function(){
                      $('#gt-trans', parent.document).hide();
                      $('.gt-trans').hide();
                      $('.gt-success').hide();
                      $('iframe', parent.document).hide();
                               $('#gt-deail', parent.document).show();
                                $('.gt-NavSupply ', parent.document).removeClass('gt-navBlock');
                                $('.gt-NavStage ', parent.document).addClass('gt-navBlock');
                                $('#gt-NavSupply ', parent.document).removeClass('gt-buttonClik');
                                $('#gt-NavStage', parent.document).addClass('gt-buttonClik');
                                $('#gt-NavStage', parent.document).removeClass('gt-navBlock');
                     
                })
                 
             $('#gt-butonNext').on('click',function(){
                   $('.gt-paymentWay .gt-paymentDiv').each(function(){
                  if($(this).hasClass('gt-cashBack')){
                  self.paymentType=$(this).data('type');
                  }
              }) 
                 var orderNo=$(this).data('id');
                var  actualMoney= $('#gt-Qcodepay').val();
                var   allMoney=$('#gt-QneedPay').text();
                // var  signId=$(this).data('signid')
              
                 console.log(orderNo);
                 console.log(self.paymentType);
                 console.log( actualMoney);
                      console.log(allMoney);
                    //   console.log(signId)
                        $.ajax({
          url:url+'/payOrder.do',
                data:{     
                    orderNo:orderNo,
                    memberId:'',
                    deposit:'0',
                    buckleMoney :'0',
                    paymentStatus:'2',
                    paymentType:self.paymentType,
                    incomeType:'0',
                    discount:'',
                    integral:'0',
                    // signId: signId,
                    actualMoney:actualMoney,
                    allMoney: allMoney,

          
                },
                       type:'post',
                    dataType:'json',
                    success: function(res){                                       

                console.log(res)
                    if(res.code===100){
                    
             $('#gt-trans', parent.document).show();
             $('.gt-trans').show();
             $('.gt-success').show();

                      }
                        },
                         error: function(){
                            console.log('网络出错');
                                        }
                                    });
           
             })
           },
    };
    enronNameTree.initi();
})()


