console.log('通知');


 function retunlis(studentNo){
      
  
                                  
                                 $.ajax({
                                       url:url+'/selectStudent.do',
                                        data:{
                                             studentNo:studentNo,
                                           
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                    if(res.data.sex==='0'){
                                                    res.data.sex='男'
                                                }else{
                                                    res.data.sex='女';
                                                }
                                                // 获取html的模板
                                                var htmlTpl = $('#table1').html();
                                                // 生成html字符串，用于渲染
                                                var htmlStr = _.template(htmlTpl)({list:res.data});
                                            
                                                $('#gt-table1').html(htmlStr);
                                                                                
                                                 
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                      

}
(function(){
    var returns={
       initi:function(){
            this.returns_bind();
           // this.initi_noce();
             //  当前页
                this.currentPg='';
                //总页数
                this.pageCount='';
                
                this.typeNBer='';
                this.studentId='';
                this.refundDetails=[];

                this.bitData=false;
                
           },
   
           returns_bind:function(){
             var self=this;
            //  返回home页面
             $('.gt-backCur,#gt-butNote,.gt-backSp').on('click',function(){
                   
                   $('iframe', parent.document).hide();
                   $('#gt-deail', parent.document).show();
                    $('.gt-NavSupply ', parent.document).removeClass('gt-navBlock');
                    $('.gt-NavStage ', parent.document).addClass('gt-navBlock');
                    $('#gt-NavSupply ', parent.document).removeClass('gt-buttonClik');
                    $('#gt-NavStage', parent.document).addClass('gt-buttonClik');
                    $('#gt-NavStage', parent.document).removeClass('gt-navBlock');
               })
                  
                 
               $('#gt-input1').on('click',function(){
                $('.gt-plaseEnte').hide();
               })
                           
                                 //   搜索 回车 搜索
                 $('#gt-input1').keydown(function(event){
                      
                              if ( event.keyCode == 13) {
                                   var val=$('#gt-input1').val();
                                  
                                 $.ajax({
                                       url:url+'/selectStudent.do',
                                        data:{
                                             studentNo:val,
                                           
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   self.returns_rend(res.data);
                                                
                                                  self.titel();
                                                  $('.gt-plaseEnte').hide();
                                             }else{
                                                $('.gt-plaseEnte').show();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };             
                 })

                        //    报名活动查询

                         $('#gt-searc1').on('click',function(){
                                var val=$('#gt-input1').val();
                                console.log(val);
                                 


                                 $.ajax({
                                        url:url+'/selectStudent.do',
                                        data:{
                                             studentNo:val,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.returns_rend(res.data);
                                              
                                                    self.titel();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })     

                                $('#gt-QchooseList').on('click',function(){
                                    $('.gt-choseScbdate').hide();
                                    console.log(111111)
                                    
                                       self.studentId= $('#gt-QnameId').data('id');
                                            
                                       if( self.studentId===''|| self.studentId===undefined|| self.studentId===null){
                                        $('.gt-plaseEnte').show();
                                          return;
                                       }else{
                                        $('.gt-plaseEnte').hide();
                                        $('#gt-trans', parent.document).show();
                                        $('.gt-trans').show();
                                        $('#gt-returenList').show();
                                        $('#gt-Qfonts').text('');
                                       }
                                       console.log( self.studentId);
                                       $.ajax({
                                       url:url+'/chooseRefundClass.do',
                                        data:{
                                           studentId: self.studentId,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.choose_rend(res.data);
                                                    self.titel();
                                                    $('.gt-plaseEnte').hide();
                                             }else{
                                                $('.gt-plaseEnte').show();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                                })
                                
                         
                        /*     选择退费科目   */
                         $('#gt-Qtable2').on('click','.gt-setButbg ',function(){
                         
                                   if($(this).hasClass('gt-setButBlbg')){
                                     //  $('.gt-setButbg').removeClass('gt-setButBlbg');
                                       $(this).removeClass('gt-setButBlbg')
                                   }else{
                                        // $('.gt-setButbg').removeClass('gt-setButBlbg');
                                           $(this).addClass('gt-setButBlbg')
                                   }
                                    var htm=''
                                   $('#gt-Qtable2 .gt-setButbg').each(function(){
                                       if($(this).hasClass('gt-setButBlbg')){
                                        var bit=$(this).parent().next().next().text();
                                      htm+=','+bit;
                                       }
                                     
                                   })
                                    htm=htm.substr(1, htm.length)

                                  $('#gt-Qfonts').text(htm);
                         })

                       $('.gt-popupRt,#gt-QcancelBut').on('click',function(){
                                     $('#gt-trans', parent.document).hide();
                                     $('.gt-trans').hide();
                                     $('#gt-returenList').hide();


                       });
                           
                       $('#gt-QsuerSave').on('click',function(){
                           var htm=''
                                $('#gt-Qtable2 .gt-setButbg').each(function(){
                                       if($(this).hasClass('gt-setButBlbg')){
                                           
                                        htm+="<tr class='gt-dataTr'>\
                          <td class='gt-Numli1'>"+ $(this).data('teamname')+"</td>\
                          <td class='gt-Numli2'>"+ $(this).data('price')+"</td>\
                          <td class='gt-Numli3'>"+ $(this).data('allclasscount')+"</td>\
                          <td class='gt-Numli4'>"+ $(this).data('unit')+"</td>\
                          <td class='gt-Numli5'>"+ $(this).data('remainingclasscount')+"</td>\
                          <td  data-classpinid='"+ $(this).data('classpinid')+"'\
                             data-refundcount='"+ $(this).data('remainingclasscount')+"'\
                              data-refundprice='"+$(this).data('refundmoney')+"'\
                            class='gt-Numli6 gt-Qlist'>"+ $(this).data('refundmoney')+"</td>\
                            <td class='gt-Numli8'><span class='gt-ListQc'>删除</span></td>\
                        </tr>"

                                       }
                                     
                                   })

                                   var htmlBox='   <tr class="gt-dataTr">\
                          <td class="gt-Numli1">课程名称</td>\
                          <td class="gt-Numli2">价格(元)</td>\
                          <td class="gt-Numli3">课程数量</td>\
                          <td class="gt-Numli4"> 单位</td>\
                          <td class="gt-Numli5">剩余数量</td>\
                          <td class="gt-Numli6">可退金额(元)</td>\
                            <td class="gt-Numli8">操作</td>\
                        </tr>';
                                    
                                    $('#gt-Qtable3').html( "<tbody>"+ htmlBox+htm+" </tbody>")
                         
                                    sumMenmy();
                                 $('#gt-trans', parent.document).hide();
                                     $('.gt-trans').hide();
                                     $('#gt-returenList').hide();
                       })
                /*      删除     */
                       $('#gt-Qtable3').on('click','.gt-ListQc',function(){
                         $(this).parent().parent().remove();
                         sumMenmy();
                       })

            var sumMenmy=function(){
                var  sum=0;
                       /*     退费金额显示  */
                   $('#gt-Qtable3 .gt-Qlist').each(function(){
                           
                          
                          sum+=Number($(this).text());

                   }) 
                       sum= returnFloat(sum); 
                   $('#gt-retunmamy').text(sum);
                      $('#gt-QhasMeny').text(sum);
            }

            $('#gt-rquesLat').change(function(){
                   
                     var sum= returnFloat(Number($('#gt-retunmamy').text())-$(this).val());
                     $('#gt-QhasMeny').text(sum);

            })

         function returnFloat(value){
                var value=Math.round(parseFloat(value)*100)/100;
                var xsd=value.toString().split(".");
                if(xsd.length==1){
                value=value.toString()+".00";
                return value;
                }
                if(xsd.length>1){
                if(xsd[1].length<2){
                value=value.toString()+"0";
                }
                return value;
                }
                }
                     
            
             /*         确定退费     */
            $('#gt-butonNext').on('click',function(){
                          self.bitData=false;
                          self.refundDetails=[];
                      var studentNo=$('#gt-QnameId').data('studentno');
                      var why=$('#gt-Qwhy').val();
                      var theMoney=$('#gt-retunmamy').text();
                      var reduceMoney=$('#gt-rquesLat').val();
                      var  reduceWhy=$('#gt-Qwhy2').val();
                       var actualMoney=$('#gt-QhasMeny').text();

                        if(studentNo===''||studentNo===null||studentNo===undefined){
                            $('.gt-plaseEnte').show();
                        return;    
                        }else{
                            $('.gt-plaseEnte').hide();
                        }
                        
                       $('#gt-Qtable3 .gt-Qlist').each(function(){
                            var objc={};
                            var classPinId=$(this).data('classpinid');
                            var refundCount=$(this).data('refundcount');
                            var refundPrice=$(this).data('refundprice');

                            if(classPinId){
                               self.bitData=false;
                            }else{
                                self.bitData=true;
                            }
                            objc.classPinId=classPinId;
                            objc.refundCount=refundCount;
                            objc.refundPrice=refundPrice;
                             self.refundDetails.push(objc);
                            
                       })
                           
                                    if(self.bitData===false){
                                        $('.gt-choseScbdate').show();
                                     return;
                                    }else{
                                        $('.gt-choseScbdate').hide();
                                    }

                                  var refundDetails=self.refundDetails;             
                                refundDetails=JSON.stringify(refundDetails);
                                console.log( self.studentId);
                                 console.log(why);
                                  console.log(studentNo);
                                   console.log(theMoney);
                                     console.log(actualMoney);
                                     console.log(reduceWhy)
                                  console.log(refundDetails);

                    $.ajax({
                                       url:url+'/refund.do',
                                        data:{
                                           studentId:self.studentId,
                                            studentNo:studentNo,
                                            why:why,
                                            theMoney:theMoney,
                                            reduceMoney:reduceMoney,
                                            reduceWhy:reduceWhy,
                                            actualMoney:actualMoney,
                                            refundDetails:refundDetails

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                $('iframe', parent.document).hide();
                                                $('#gt-deail', parent.document).show();
                                                 $('.gt-NavSupply ', parent.document).removeClass('gt-navBlock');
                                                 $('.gt-NavStage ', parent.document).addClass('gt-navBlock');
                                                 $('#gt-NavSupply ', parent.document).removeClass('gt-buttonClik');
                                                 $('#gt-NavStage', parent.document).addClass('gt-buttonClik');
                                                 $('#gt-NavStage', parent.document).removeClass('gt-navBlock');
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                  
                           })

            },


              returns_rend:function(data){
                 if(data.sex==='0'){
                    data.sex='男'
                 }else{
                       data.sex='女';
                 }
                // 获取html的模板
                var htmlTpl = $('#table1').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data});
             
                $('#gt-table1').html(htmlStr);
               
               
            },

             choose_rend:function(data){
                 console.log(data)
                // 获取html的模板
                var htmlTpl = $('#table2').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data});
             
                $('#gt-Qtable2').html(htmlStr);
               
            },

           /*  表格title属性 */
        titel:function(){
            
             $("td").each(function(){
              
            $(this).attr("title",$(this).text());
           
           });
       },
    };
   returns.initi();
})()


