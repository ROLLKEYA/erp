
function binddata(dataNb){
    console.log(dataNb.data[0].id);
         console.log(dataNb)
         var htmlTpl = $('#Ptable1').html();
                // 生成html字符串，用于渲染
               
                var htmlStr = _.template(htmlTpl)({list:dataNb.data});
             
                $('#gt-Ptable1').html(htmlStr);

                console.log(88888);



}
            
(function(){
    var enronNameTwo={
       initi:function(){
            this.returned();
              this.Number=0;
              this.dataLIst=[];
              this.sduent='';
              this. orderList=[];
               this.activtId=[];
                //    推荐 活动 之间ID
      this.commonId=[];
           },
         titel:function(){
            
             $("td").each(function(){
              
            $(this).attr("title",$(this).text());
           
           });
       },
           returned:function(){
           var self=this;


           $('#gt-backUp,.gt-backSp,#gt-KgNosave').on('click',function(){
                               $('iframe', parent.document).hide();
                               $('#gt-deail', parent.document).show();
                                $('.gt-NavSupply ', parent.document).removeClass('gt-navBlock');
                                $('.gt-NavStage ', parent.document).addClass('gt-navBlock');
                                $('#gt-NavSupply ', parent.document).removeClass('gt-buttonClik');
                                $('#gt-NavStage', parent.document).addClass('gt-buttonClik');
                                $('#gt-NavStage', parent.document).removeClass('gt-navBlock');
    
                        });
                            
                                                   
                    // $('.gt-backCur,.gt-backSp').on('click',function(){
                    //            $('iframe', parent.document).hide();
                    //            $('#gt-deail', parent.document).show();
                    //             $('.gt-NavSupply ', parent.document).removeClass('gt-navBlock');
                    //             $('.gt-NavStage ', parent.document).addClass('gt-navBlock');
                    //             $('#gt-NavSupply ', parent.document).removeClass('gt-buttonClik');
                    //             $('#gt-NavStage', parent.document).addClass('gt-buttonClik');
                    //             $('#gt-NavStage', parent.document).removeClass('gt-navBlock');
    
                    //     });
                    
                    
                        $('.gt-deails').on('click','.gt-traineeChoose',function(){

                                 self.activtId=[];

                            $('#gt-aa').html("<span  id='gt-tRig'class='gt-entRig'>确定</span>")
                             $(document).find('#gt-tRig').attr('data-id','')
                                 $('.gt-setbox,.gt-trans').show();
                                  $('#gt-trans', parent.document).show();
                                     self.sduent=$(this).data('id');
                                   $(document).find('#gt-tRig').attr('data-id', self.sduent)

                                  self.NuberInit();
                                  $.ajax({
                                       url:url+'/findEnrollList.do',
                                        data:{
                                      
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){   
                                                                             
                                          console.log(res)
                                             if(res.code===100){
                                                 self.activeRend(res.data);
                                             
         
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                  

                             
                        })

                        $('.gt-setheradImg').on('click',function(){

                              $('.gt-setbox,.gt-trans').hide();
                             $('#gt-trans', parent.document).hide();
                        })
// 点击选择  选择活动
                      $(document).on('click','#gt-newAddset .gt-setButbg',function(){
                           
                         
                  if(!$(this).hasClass('gt-setButBlbg')){
                      self.Number= self.Number+1;
                      $('#gt-Nuber').text( self.Number);
                  $(this).addClass('gt-setButBlbg');
                   
               var texValue= $(this).parent().parent().find('.gt-steLi3').text(); 
               var id=  $(this).parent().parent().attr('id') ;

               
                  var html= " <tr class='gt-trweb ' id='"+id+"p' > <td><div class='gt-lihBox'><span class='gt-Mglft'>"+texValue+ "<span  class='gt-delImg gt-ctl'><img src='../image/ico/u1157.png' alt=''></span></div></td></tr>"

  $('#gt-nsdw').append(html);

            }else{
                
                 var id=  $(this).parent().parent().attr('id')  
                  var texValue= $(this).parent().parent().find('.gt-steLi3').text();  
                   self.Number=self.Number-1;
                    $(this).removeClass('gt-setButBlbg');
                  
                    $('#gt-Nuber').text( self.Number)
                    console.log(id)
                    $('#gt-nsdw').find("#"+id+"p").remove();
            }
                         
            })
        //    单个删除
                $(document).on('click','.gt-ctl',function(){
                          self.delId='';
                         var datId=$(this).attr('id') ;
                          
                         var HL=$(this).parent().parent().parent().parent();
                         var id=HL.attr('id');
                           id=id.substring(0,id.length-1);
                         console.log(datId)

                          if(!datId){
                            self.Number= self.Number-1;
                        $('#gt-Nuber').text(self.Number)                    
                     
                       $("#"+id+"").find('.gt-setButbg').removeClass('gt-setButBlbg');
                                       
                    console.log(id)
                    HL.remove();
                       }else{
                               datId=datId.substring(0,datId.length-1);
                            $('.gt-NoClickBg2').show();
                           $('.gt-deltan').show(); 
                             self.delId= datId;
                             self.canbackId=id;
                       }

                     

                     
                })
                        //   全删除
            $('.gt-delImg').on('click',function(){
                      self.NuberInit();

            })

   //   搜索 回车 搜索
                 $('#gt-searcIput').keydown(function(event){
                      
                            var enrollName=$('#gt-searcIput').val();
                      
                              if ( event.keyCode == 13) {
                                                       
                       console.log(enrollName)
                 $.ajax({
                                       url:url+'/findEnrollList.do',
                                        data:{
                                      enrollName:enrollName,
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){         
                                       
                                          console.log(res)
                                             if(res.code===100){
                                               
                                                self.activeRend(res.data);
                                               
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });                 
                           };

                            
                  
                 })
                          //   搜索 模糊 搜索
            $('#gt-searc').on('click',function(){
                
                var enrollName=$('#gt-searcIput').val();
                
                 $.ajax({
                                       url:url+'/findEnrollList.do',
                                        data:{
                                      enrollName:enrollName,
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){  
                               console.log(res)
                                             if(res.code===100){
                                               
                                                self.activeRend(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                 

            })
                                        //  首页
                  $('#gt-hPag').on('click',function(){
                                  
                                  
                                      $.ajax({
                                          url:url+'/findEnrollList.do',
                                        data:{
                                       
                                        curPage:1 ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          
                                          console.log(res.data)
                                             if(res.code===100){
                                                  
                                                 self.activeRend(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                  

                  })
                               
                    //  xia一页
                  $('#nextPg').on('click',function(){
                                 
                                                  console.log( self.currentPg)
                                      $.ajax({
                                       url:url+'/findEnrollList.do',
                                        data:{
                                  
                                        curPage: self.currentPg+1 ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                   console.log(res)
                                             if(res.code===100){
                                                
                                            self.activeRend(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });                                 
                        })

               $(document).on('click','#gt-tRig',function(){
                                  self.dataLIst=[];
                                  self.sduent='';
                                  self.sduent=$('#gt-tRig').data('id');
                                  console.log("start="+$('#gt-tRig').data('id'))
                               $('#gt-newAddset .gt-setButbg').each(function(){
                                   
                                  if($(this).hasClass('gt-setButBlbg')){

                            var dataobj={};
                                     var parent=$(this).parent().parent();
                                     var enrollName=parent.find('.gt-steLi2').text();
                                     var money=parent.find('.gt-steLi4').text();
                                     var id=$(this).data('id');
                                       dataobj.enrollName= enrollName;
                                       dataobj.money=money;
                                       dataobj.id=id; 
                                       self.dataLIst.push(dataobj);
                                  
                                  }
                                      console.log("sss"+self.sduent.toString())

                               })
                                console.log(self.dataLIst);
                                    console.log(self.sduent.toString())
                               $('#gt-Ptable1 .gt-enrotabl').each(function(){
                                    console.log(5558585)
                                    console.log($(this).data('id').toString())
                                    console.log(self.sduent.toString())
                                  if($(this).data('id').toString()===self.sduent.toString()){
                                      console.log(5558585)
                                      var html=''
                                      for(var i=0;i< self.dataLIst.length;i++){

                         html+="<tr class='gt-dataTr gt-QlistParent'>\
                          <td data-enrollid="+self.dataLIst[i].id+" class='gt-Edatli1 gt-Qlist2 gt-LIst'>"+self.dataLIst[i].enrollName+"</td>\
                          <td class='gt-Edatli2 gt-Qlist'>"+self.dataLIst[i].money+"</td>\
                          <td class='gt-Edatli3 gt-Qlist3'>1</td>\
                          <td  class='gt-Edatli4 gt-Qlist4'>期</td>\
                           <td class='gt-Edatli5 gt-Qlist5'>"+self.dataLIst[i].money+"</td>\
                             <td class='gt-Edatli6 gt-delte'>删除</td>\
                       </tr> "
                                      }

                                 var htmlList="\
                                          <tr class='gt-dataTr'>\
                          <td class='gt-Edatli1'>报名活动名称</td>\
                          <td class='gt-Edatli2'>单价(元)</td>\
                          <td class='gt-Edatli3 '>数量</td>\
                          <td  class='gt-Edatli4'>单位</td>\
                           <td class='gt-Edatli5'>实收金额(元)</td>\
                           <td class='gt-Edatli6'>操作</td>\
                         </tr>"
                    $(this).html( " <tbody>"+htmlList+html+"</tbody>" );
                                       var  sum=0;
                           $(this).find('.gt-Qlist').each(function(){
                              
                            sum = sum + parseInt($(this).text());  
                              
                           });
                             $(this).parents('.gt-trainee').find('.gt-Qtotal').text(sum);
                       

                                    }else{console.log(55555555555)}

                                   

                               })
                                 $('.gt-setbox,.gt-trans').hide();
                             $('#gt-trans', parent.document).hide();
                            
                        })

                   /*      删除     */
                   $('#gt-Ptable1').on('click','.gt-delte',function(){
                          $(this).parent().remove();
                  
                   })
 /*  提交订单 */

                 $('#gt-butonNext').on('click',function(){
                    self.orderList=[];

                     $('#gt-Ptable1 .gt-enrotabl .gt-QlistParent').each(function(){
                            var  orderListObj={};
                            var studentId=$(this).parent().parent().data('id');
                            var studentNo=$(this).parent().parent().data('studentno');
                            var  enrollName=$(this).find('.gt-Qlist2').text();
                            var   enrollId=$(this).find('.gt-Qlist2').data('enrollid');
                            var  price=$(this).find('.gt-Qlist').text();
                             orderListObj.studentId=studentId;
                             orderListObj.studentNo=studentNo;
                             orderListObj.enrollName=enrollName;
                             orderListObj.enrollId= enrollId;
                             orderListObj.price= price;
                             orderListObj.count='1';
                              orderListObj.unit='期';
                               orderListObj.summary= price*1;
                             self.orderList.push(orderListObj);

                     })
                      var   orderList=self.orderList;             
                                  orderList=JSON.stringify( orderList);
                                  console.log(orderList)
                             $.ajax({
                                          url:url+'/newOrder.do',
                                        data:{
                                       
                                         orderList: orderList,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       

                                        console.log(res)
                                             if(res.code===100){
                                                   top.frames['gt-homeTree'].payfor(res.data);
                                                   $('iframe', parent.document).hide();
                                                 $('#gt-homeTree', parent.document).show();
                                                
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                   })

           },
                 // 添加原有选项
                oldList:function(){
                                var self=this;
                                       

                                    $('#gt-newAddset tr').each(function(index){
                                         var id=$(this).attr('id');
                                                   
                                            for(var j=0;j<self.activtId.length;j++){
                                                 if( id==self.activtId[j]){
                                                        $(this).find('.gt-setButbg ').addClass('gt-setButBlbg');
                                                         $(this).attr('data-Nuber',self.commonId[j]);
                                                       $(this).find('.gt-setButbg ').children().addClass('gt-SetbutCall');
                                                        //$(this).find('.gt-setButbg ').children().addClass('gt-SetbutCall');
                                                        var texValue= $(this).find('.gt-steLi3').text(); 
                                                        var html= " <tr class='gt-trweb ' id='"+id+"p' > <td  ><div class='gt-lihBox'><span class='gt-Mglft'>"+texValue+ "<span  id='"+ self.commonId[j]+"t' class='gt-delImg gt-ctl'><img src='../image/ico/u1157.png' alt=''></span></div></td></tr>"

                                                      $('#gt-nsdw').append(html);
                                                               
                                                         if(!$(this).hasClass('gt-setButBlbg')){
                                                                 self.Number= self.Number+1;
                                                                  $('#gt-Nuber').text( self.Number);
                                                         }

                                                   }
                                                  }
                                                    
                                                 })




                },
                // 初始化选择
            NuberInit:function(){
                  var self=this;
                       self.Number= 0;
                        $('#gt-Nuber').text( self.Number);
                        if(self.Number===0){
                         $('#gt-nsdw').children().remove();
                         $('.gt-setButbg').removeClass('gt-setButBlbg');
                          
                        }
            },
             activeRend:function(data){
    
                  var self=this;
                // 总页数
               self.contPg=data.pageCount;
              // console.log('pg'+self.contPg)
            //    当前页
               self.currentPg=data.curPage;
                  //   console.log('pg'+self.currentPg)
                    for(var i=0;i<data.subList.length;i++){
                        if(data.subList[i].enrollCount==''){
                            data.subList[i].enrollCount=0;
                        }

               data.subList[i].endDate=(new Date(data.subList[i].endDate).Format("yyyy-MM-dd"));  
               data.subList[i].startDate=(new Date(data.subList[i].startDate).Format("yyyy-MM-dd"));  
                    }
            // 获取html的模板
            var htmlTpl = $('#activi').html();
            // 生成html字符串，用于渲染
            var htmlStr = _.template(htmlTpl)({list:data.subList});
           
            $('#gt-newAddset').html(htmlStr);
            $('#NewPg').text(self.currentPg);
                 $('.gt-trainee .gt-QlistParent').each(function(){
                                                 var enberid= $(this).find('.gt-LIst').data('enrollid');

                                                   $('.gt-setbox .gt-setButbg ').each(function(){
                                                       if(enberid===$(this).data('id')){
                                                           $(this).addClass('gt-setButBlbg');
                                                           self.activtId.push($(this).data('id'))
                                                           
                                                       }
                                                   })

                                                     })
                  
                      self.oldList();
          },
    };
    enronNameTwo.initi();
})()










