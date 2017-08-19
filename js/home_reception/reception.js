
console.log('前台业务JS!');

(function(){
    var reception = {
        
        init: function(){
        //    数据初始化
            this.bettering();
            this.eventBind_reception();
            this.activities();
            this.SignUpList();
            this. DayClassList();
            this.Teachers();
             // 教师操作
             this.teaDeail();
            //  当前页
           this.currentPg='';
        // 总页数
          this.pageCount='';
        //    今日上课教室查询Id
        this.classId='';
      /*   请假传的参数 */
      
         this.rowId='';
         this.employeesId='';
         this.classSonId='';
         this.teamId='';

        },
           titel:function(){
            
             $("td").each(function(){
              
            $(this).attr("title",$(this).text());
            
           });
       },

                // 前台业务
              eventBind_reception:function(){
                  // 活动 表名列表  今日上课 教师出勤 事件
                       
                        var self=this;

                             
                    $('.gt-NavStage').on('click',function(el){
                     $('.gt-centCom').hide();
                     $('.gt-deails').show();
                     $('iframe').hide();
                    $('#gt-lista').addClass('gt-hoverClor');
                    $('#gt-lista').siblings().removeClass('gt-hoverClor');
                    $('.gt-provided').show();
                        self.bettering();
        
                        })
                

                            // 选择 打钩

                            $(document).on('click','.gt-squarChose',function(){
                            if($(this).hasClass('gt-squareImg')==false){
                                $(this).addClass('gt-squareImg');
                                $(this).find('span').addClass('gt-squareImgHook')
                            }else{
                                    $(this).removeClass('gt-squareImg');
                                    $(this).find('span').removeClass('gt-squareImgHook')
                            }
                            
                            })
                            // 全选 取消
                            $('.gt-chekAll').on('click',function(){
                                $('.gt-squarChose').addClass('gt-squareImg');
                                $('.gt-squarChose').find('span').addClass('gt-squareImgHook')

                            })
                            $('.gt-chekNo').on('click',function(){
                                $('.gt-squarChose').removeClass('gt-squareImg');
                                $('.gt-squarChose').find('span').removeClass('gt-squareImgHook')
                            })



                  }  ,           

      
            
            //   报名活动

           activities:function() {
               var self=this;
               
                
                    // 报名活动
                            $('#gt-lista').click(function(){
                            $(this).addClass('gt-hoverClor');
                            $(this).siblings().removeClass('gt-hoverClor');
                            $('.gt-provided').show();
                            $('.gt-provided').siblings().hide();
                               
                              self.bettering();

                        })

                            // 翻页 shou页
                          
                            $('#gt-homePg1').on('click',function(){
                               $.ajax({
                                       url:url+'/findEnrollList.do',
                                        data:{
                                     
                                      curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Recorender(res.data);
                                                self.titel();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                             // 翻页 下一页
                          
                            $('#gt-nextPg1').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                       url:url+'/findEnrollList.do',
                                        data:{
                                     
                                      curPage:self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Recorender(res.data);
                                                self.titel();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

                  

                //   时间搜索
                 $('#gt-dateInpu1').change(function(event){
                      

                                    var starTime= $('#gt-dateInpu1').val();
                                   starTime= new Date(starTime).Format("yyyy-MM-dd ")
                                    console.log(starTime);
                                    $('#gt-dateInpu1').val(starTime)


                                 $.ajax({
                                       url:url+'/findEnrollList.do',
                                        data:{
                                          
                                             startDate:starTime,
                                             curPage:self.currentP,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Recorender(res.data);
                                                self.titel();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                                    
                 })

                     

                        
                                 //   搜索 回车 搜索
                 $('#gt-input1').keydown(function(event){
                        
                              if ( event.keyCode==13) {
                                
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                                       url:url+'/findEnrollList.do',
                                        data:{
                                            enrollName:val,
                                             curPage:self.currentPg,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Recorender(res.data);
                                                self.titel();
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
                                  console.log( self.currentPg)


                                 $.ajax({
                                       url:url+'/findEnrollList.do',
                                        data:{
                                             enrollName:val,
                                           
                                             curPage:self.currentPg,

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Recorender(res.data);
                                                self.titel();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })                

                  },

                //   初始刷新数据 报名活动
                 bettering:function () {
                     var self=this;
                       var Noenter=0;
                      var  hasEnter=0;
                       $('#gt-toalNb2').text(hasEnter);
                         $('#gt-toalNb1').text(Noenter);
                           
                      $.ajax({
                                          
                                       url:url+'/findEnrollList.do',
                                        data:{
                                     
                                      curPage:1, //当前页

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self.Recorender(res.data);
                                          
                                                 $('#gt-toalNb').text(res.data.rowCount)
                                               
                                                  $(' #gt-List1 .gt-entr').each(function(){
                                                      var pr=Number($(this).find('.gt-entr1').text());
                                                      var next=Number($(this).find('.gt-entr2').text());

                                                      if(pr===next){
                                                          hasEnter=hasEnter+1;
                                                         
                                                         $('#gt-toalNb2').text(hasEnter)
 
                                                      }else{
                                                       Noenter =Noenter+1;
                                                         $('#gt-toalNb1').text(Noenter);
                                                        
                                                      }
                                                       
                                                  });
                                                      self.titel();
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                   },
                // 报名活动渲染
          Recorender: function(data){
             var self=this;
                //  当前页
           self.currentPg=data.curPage;
            //总页数
              self.pageCount=data.pageCount;
       for(var i=0;i<data.subList.length;i++){
             data.subList[i].startDate=(new Date(data.subList[i].startDate).Format("yyyy-MM-dd"));  
              data.subList[i].endDate=(new Date(data.subList[i].endDate).Format("yyyy-MM-dd "));                     
                  }
            // 获取html的模板
            var htmlTpl = $('#table').html();
            // 生成html字符串，用于渲染
            var htmlStr = _.template(htmlTpl)({list:data.subList});
            // 执行渲染，
            $('#gt-List1').html(htmlStr);
           $('#gt-showPg1').text(self.currentPg);
             

          },


          //报名列表
        SignUpList:function () { 
                var self=this;
                 
               // 报名列表
                            $('#gt-listb').click(function(){
                            $(this).addClass('gt-hoverClor');
                            $(this).siblings().removeClass('gt-hoverClor');
                            $('.gt-enroll').show();
                            $('.gt-enroll').siblings().hide();
                            var Noenter=0;
                            var  hasEnter=0;
                               $('#gt-taolPsont2').text("("+Noenter+")");
                             $('#gt-taolPsont1').text("("+hasEnter+")");
                            
                  $.ajax({
                                       url:url+'/findSignUpList.do',
                                        data:{
                                     
                                          

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   
                                               self.Sigrender(res.data);
                                               self.eachShow();
                                               
                                                    $('#gt-taolPsont').text(res.data.rowCount);
                                                    $('#gt-table2 .gt-forme').each(function(index){
                                                       if($(this).text()==='微信'){

                                                            Noenter=Noenter+1;
                                                           $('#gt-taolPsont2').text("("+Noenter+")");
                                                       
                                                       }else{
                                                        hasEnter=hasEnter+1;
                                                           $('#gt-taolPsont1').text("("+hasEnter+")");
                                                       
                                                       }
                                                          
                                                     
 
                                                    });
                                                       self.titel();



                                             }else{
                                                  $('#gt-table2').html( 
                                                 
                                          ' <tr class="gt-dataTr">\
                                            <td class="gt-Edatli0"></td>\
                                            <td class="gt-Edatli1">来源</td>\
                                            <td class="gt-Edatli2">订单号</td>\
                                            <td class="gt-Edatli3">姓名</td>\
                                            <td  class="gt-Edatli4">联系电话</td>\
                                            <td class="gt-Edatli5">班级</td>\
                                            <td class="gt-Edatli6">课程名称</td>\
                                            <td class="gt-Edatli7">是否付费</td>\
                                            <td class="gt-Edatli8">定金</td>\
                                            <td class="gt-Edatli9">操作</td>\
                                                   </tr>'
                                                  );
                                                
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                       })
                        
                                 // 翻页 shou页
                          
                            $('#gt-homePg2').on('click',function(){
                               $.ajax({
                                       url:url+'/findSignUpList.do',
                                        data:{
                                     
                                      curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              self.Sigrender(res.data);
                                               self.eachShow();
                                                  self.titel();
                                             }else{
                                                     $('#gt-table2').html( 
                                                 
                                          ' <tr class="gt-dataTr">\
                                            <td class="gt-Edatli0"></td>\
                                            <td class="gt-Edatli1">来源</td>\
                                            <td class="gt-Edatli2">订单号</td>\
                                            <td class="gt-Edatli3">姓名</td>\
                                            <td  class="gt-Edatli4">联系电话</td>\
                                            <td class="gt-Edatli5">班级</td>\
                                            <td class="gt-Edatli6">课程名称</td>\
                                            <td class="gt-Edatli7">是否付费</td>\
                                            <td class="gt-Edatli8">定金</td>\
                                            <td class="gt-Edatli9">操作</td>\
                                                   </tr>'
                                                  );
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                             // 翻页 下一页
                          
                            $('#gt-nextPg2').on('click',function(){
                               $.ajax({
                                    url:url+'/findSignUpList.do',
                                        data:{
                                     
                                      curPage:self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Sigrender(res.data);
                                               self.eachShow();
                                                  self.titel();
                                             }else{
                                                   $('#gt-table2').html( 
                                                 
                                          ' <tr class="gt-dataTr">\
                                            <td class="gt-Edatli0"></td>\
                                            <td class="gt-Edatli1">来源</td>\
                                            <td class="gt-Edatli2">订单号</td>\
                                            <td class="gt-Edatli3">姓名</td>\
                                            <td  class="gt-Edatli4">联系电话</td>\
                                            <td class="gt-Edatli5">班级</td>\
                                            <td class="gt-Edatli6">课程名称</td>\
                                            <td class="gt-Edatli7">是否付费</td>\
                                            <td class="gt-Edatli8">定金</td>\
                                            <td class="gt-Edatli9">操作</td>\
                                                   </tr>'
                                                  );
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                         
                        //  下拉搜索
                    $('#gt-selec1').change(function(){
                                       console.log('abcde')
                            
                                var from= $('#gt-selec1 option:selected').text('frame');
                                    
                                 $.ajax({
                                       url:url+'/findSignUpList.do',
                                        data:{
                                            from:from,
                                           // orderNo:val,
                                             curPage:self.currentPg,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              self.Sigrender(res.data);
                                               self.eachShow();
                                                  self.titel();
                                             }
                                                 
                                             
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                    })

                     $('#gt-selec2').change(function(){
                       
                                 var orderStatus= $('#gt-selec2 option:selected').data('order');
                         

                                    console.log('orderStatus'+orderStatus);
                                    console.log(self.currentPg);

                                 $.ajax({
                                       url:url+'/findSignUpList.do',
                                        data:{
                                             curPage:self.currentPg,
                                             orderStatus:orderStatus,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              self.Sigrender(res.data);
                                               self.eachShow();
                                                  self.titel();
                                             }
                                                                                              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                    })

                            

                    //   搜索 回车 搜索
                 $('#gt-searcinput2').keydown(function(event){
                      
                              if ( event.keyCode == 13) {
                                   var val=$('#gt-searcinput2').val();
                             
                                    console.log(val);
                                        console.log(self.currentPg);


                                 $.ajax({
                                       url:url+'/findSignUpList.do',
                                        data:{
                                            orderNo:val,
                                             curPage:self.currentPg,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              self.Sigrender(res.data);
                                               self.eachShow();
                                                  self.titel();
                                             }
                                                 
                                             
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };

                            
                  
                 })

            //点击搜索
                     $('#gt-searc2').on('click',function(){

                                   var val=$('#gt-searcinput2').val();
                                   
                                      console.log(val);
                                        console.log(self.currentPg);

                                 $.ajax({
                                       url:url+'/findSignUpList.do',
                                        data:{

                                            orderNo:val,
                                             curPage:self.currentPg,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              self.Sigrender(res.data);
                                               self.eachShow();
                                                  self.titel();
                                             }
                                                                                              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                     })


                  /*    收款   */
                  $('#gt-table2').on('click','.gt-cheques',function(){
                           
                    if(!$(this).hasClass('gt-chequBg')){
                        var data=$(this).data('orderno');
                        top.frames['gt-homeTree'].payfor(data);
                         $('iframe',document).hide();
                         $('#gt-deail').hide();
                         $('#gt-Caddclass').hide();
                         $('#gt-homeTree',document).show();
                    }
                      

                  })
                          




                    
         },
      
        // 遍历数据

        eachShow:function(){
            var self=this;
                $('#gt-table2 .gt-forme').each(function(index){
                          var text=$(this).data('forme').toString();
                        if( text==='0'){
                            $(this).text('微信');
                        }else if(text==='1'){
                            $(this).text('前台');
                        }else{
                                $(this).text(' ');
                        }
                           

                });

                $('#gt-table2 .gt-PayorNoe').each(function(index){
                      var text=$(this).data('payment').toString();
                        if( text==='0'||text===''||text===null||text===undefined){
                            $(this).text('否');
                            $(this).next().next().find('div').addClass('gt-chequImg');
                                $(this).next().next().find('div').removeClass('gt-chequBg');
                        }else if(text==='1'){
                            $(this).text('已付定金');
                            $(this).next().next().find('div').addClass('gt-chequImg');
                                $(this).next().next().find('div').removeClass('gt-chequBg');
                        } if(text==='2'){
                                $(this).text('已关闭');
                                $(this).next().next().find('div').removeClass('gt-chequImg');
                                $(this).next().next().find('div').addClass('gt-chequBg');
                        }

                });
                
        },

       


        // 渲染页面
         Sigrender: function(data){                      
             var self=this;
                //  当前页
              self.currentPg=data.curPage;
              console.log( '当前页'+ self.currentPg)
            //总页数
              self.pageCount=data.pageCount;
                    for(var i=0;i<data.subList.length;i++){
                   if(data.subList[i].deposit===''||data.subList[i].deposit===undefined||data.subList[i].deposit===null){
                            data.subList[i].deposit=0;
                   }
                    }
            // 获取html的模板
            var htmlTpl = $('#table2').html();
            // 生成html字符串，用于渲染
            var htmlStr = _.template(htmlTpl)({list:data.subList});
            // 执行渲染，使用append是为了使该渲染方法得以复用
            $('#gt-table2').html(htmlStr);
           $('#gt-showPg2').text(self.currentPg);
             
              },

 

              //今日上课
              DayClassList:function(){
                 var self=this;
                            // 今日上课
                            $('#gt-listc').click(function(){

                                    $(this).addClass('gt-hoverClor');
                                    $(this).siblings().removeClass('gt-hoverClor');
                                    $('.gt-class').show();
                                    $('.gt-class').siblings().hide();
  
                        //   今日上课了渲染          
                       $.ajax({
                                       url:url+'/findToDayClassList.do',
                                        data:{
                                    
                                             

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self.Dayder(res.data);
                                                  var html=''
                                                 $(' #gt-table3 .gt-classRooe').each(function(){
                                                  var classroom=$(this).text();
                                                  var classroomId=$(this).data('id');
                                                  console.log(classroom);
                                                   console.log(classroomId);
                                                   
                                                  html+="<option value='' data-id="+classroomId +">"+classroom+"</option>"
                                                 })
                                                  $('#gt-selec3').html(html);

                                               
                                             } else{
                                                  $('#gt-table3').html(
                                            '<tr class="gt-dataTr">\
                                            <td class="gt-Cdatli0">班级名称</td>\
                                            <td class="gt-Cdatli1">课程名称</td>\
                                            <td class="gt-Cdatli2">上课时间</td>\
                                            <td class="gt-Cdatli3">上课老师</td>\
                                            <td  class="gt-Cdatli4">上课教室</td>\
                                            <td class="gt-Cdatli5">班级总人数</td>\
                                            <td class="gt-Cdatli6">请假人数</td>\
                                            <td class="gt-Cdatli7">旷课人数</td></tr>'
                                                )
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
    
                            })

                                   // 翻页 shou页
                          
                            $('#gt-homePg3').on('click',function(){
                               $.ajax({
                                    url:url+'/findToDayClassList.do',
                                        data:{
                                     
                                      curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                            self.Dayder(res.data);
                                             
                                                  self.titel();
                                             }else{
                                                     $('#gt-table3').html(
                                            '<tr class="gt-dataTr">\
                                            <td class="gt-Cdatli0">班级名称</td>\
                                            <td class="gt-Cdatli1">课程名称</td>\
                                            <td class="gt-Cdatli2">上课时间</td>\
                                            <td class="gt-Cdatli3">上课老师</td>\
                                            <td  class="gt-Cdatli4">上课教室</td>\
                                            <td class="gt-Cdatli5">班级总人数</td>\
                                            <td class="gt-Cdatli6">请假人数</td>\
                                            <td class="gt-Cdatli7">旷课人数</td></tr>'
                                                )
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                             // 翻页 下一页
                          
                            $('#gt-nextPg3').on('click',function(){
                               $.ajax({
                                  url:url+'/findToDayClassList.do',
                                        data:{
                                     
                                      curPage:self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Dayder(res.data);
                                             
                                                  self.titel();
                                             }else{
                                                    $('#gt-table3').html(
                                            '<tr class="gt-dataTr">\
                                            <td class="gt-Cdatli0">班级名称</td>\
                                            <td class="gt-Cdatli1">课程名称</td>\
                                            <td class="gt-Cdatli2">上课时间</td>\
                                            <td class="gt-Cdatli3">上课老师</td>\
                                            <td  class="gt-Cdatli4">上课教室</td>\
                                            <td class="gt-Cdatli5">班级总人数</td>\
                                            <td class="gt-Cdatli6">请假人数</td>\
                                            <td class="gt-Cdatli7">旷课人数</td></tr>'
                                                )
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

         


                        // 下拉查询

                           $('#gt-selec3').change(function(){
                       
                                 var orderStatus= $('#gt-selec3 option:selected').data('id')
                           

                                    console.log('orderStatus'+orderStatus);
                                    console.log(self.currentPg);

                                 $.ajax({
                                       url:url+'/findToDayClassList.do',
                                        data:{
                                             classroomId:orderStatus,
                                             curPage:self.currentPg,
                                           
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Dayder(res.data);
                                             }
                                                                                              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                
                    })

                    
                           $('#gt-selec4').change(function(){
                       
                                 var orderStatus= $('#gt-selec4 option:selected').text()
                                     if(orderStatus=='请假'){
                                         orderStatus=0;
                                     }else{
                                         orderStatus=1;
                                     }

                                    console.log('orderStatus'+orderStatus);
                                    console.log(self.currentPg);

                                 $.ajax({
                                       url:url+'/findToDayClassList.do',
                                        data:{
                                             curPage:self.currentPg,
                                             status:orderStatus,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Dayder(res.data);
                                                   self.titel();
                                             }
                                                                                              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                
                    })

                            

                    //   搜索 回车 搜索
                 $('#gt-searcinput3').keydown(function(event){
                      
                              if ( event.keyCode == 13) {
                                   var val=$('#gt-searcinput3').val();
                             
                                    console.log(val);
                                        console.log(self.currentPg);


                                 $.ajax({
                                       url:url+'/findToDayClassList.do',
                                        data:{
                                           // from:from,
                                             teamName:val,
                                             curPage:self.currentPg,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Dayder(res.data);
                                                 
                                             }                                             
                                             
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };

                            
                  
                 })

            //点击搜索
                     $('#gt-searc3').on('click',function(){

                           
                                   var val=$('#gt-searcinput3').val();
                                   
                                      console.log(val);
                                        console.log(self.currentPg);

                                 $.ajax({
                                       url:url+'/findToDayClassList.do',
                                        data:{
 
                                             teamName:val,
                                             curPage:self.currentPg,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.Dayder(res.data);
                                             }
                                                                                              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                     })
                          

                       //   时间搜索
                 $('#gt-dateInpu2').change(function(event){
                      

                                    var starTime= $('#gt-dateInpu2').val();
                                         starTime= new Date(starTime).Format("yyyy-MM-dd ")
                                           $('#gt-dateInpu2').val(starTime)

                                    console.log(starTime);
                                 $.ajax({
                                        url:url+'/findToDayClassList.do',
                                        data:{
                                          
                                             startDate:starTime,
                                            
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self.Dayder(res.data);
                                                  self.titel();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
        
                                    
                 })

              },


                    // 报名活动渲染
            Dayder: function(data){
                var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
                for(var i=0;i<data.subList.length;i++){
                data.subList[i].startDate=(new Date(data.subList[i].startDate).Format(" hh:mm:ss ")); 
                 data.subList[i].endDate=(new Date(data.subList[i].endDate).Format("  hh:mm:ss "));                    
                    }
        
                // 获取html的模板
                var htmlTpl = $('#table3').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data.subList});
                // 执行渲染，使用append是为了使该渲染方法得以复用
                $('#gt-table3').html(htmlStr);
                $('#gt-showPg3').text(self.currentPg);
                
            },

             Teachers:function(){
                       var self=this;
                               

                       
                            // 教师出勤
                            $('#gt-listd').click(function(){
                                        $(this).addClass('gt-hoverClor');
                                        $(this).siblings().removeClass('gt-hoverClor');
                                        $('.gt-teach').show();
                                        $('.gt-teach').siblings().hide();
                                          Rquet_bind();
                    

                        })
                        var Rquet_bind=function(){
                                       //   出勤         
                       $.ajax({
                                     url:url+'/findTeachAttendanceList.do',
                                        data:{
                                     
                                               

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self.Teachers_Dayder(res.data);
                                                 
                                                  self.TeaEach();
                                                   self.titel();
                                             } else{
                                                  $('#gt-table4').html('\
                                                 <tr class="gt-dataTr">\
                                            <td class="gt-Tdatli0">工号</td>\
                                            <td class="gt-Tdatli1">姓名</td>\
                                            <td class="gt-Tdatli2">部门</td>\
                                            <td class="gt-Tdatli3">职位</td>\
                                            <td  class="gt-Tdatli4">应上课</td>\
                                            <td class="gt-Tdatli5">出勤情况</td>\
                                                <td class="gt-Tdatli7">操作</td> </tr>')
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                        }


                          // 翻页 shou页
                          
                            $('#gt-homePg4').on('click',function(){
                               $.ajax({
                                      url:url+'/findTeachAttendanceList.do',
                                        data:{
                                     
                                      curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Teachers_Dayder(res.data);
                                                 self.TeaEach();
                                                  self.titel();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                             // 翻页 下一页
                          
                            $('#gt-nextPg4').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                  url:url+'/findTeachAttendanceList.do',
                                        data:{
                                     
                                      curPage:self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              self.Teachers_Dayder(res.data);
                                                self.TeaEach();
                                                 self.titel();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

                //   教师查询列表

                //   时间搜索
                  $('#gt-dateInpu3').change(function(event){
                      
                            var valt=$(this).val();
                           valt= new Date(valt).Format("yyyy-MM-dd ")
                           $(this).val(valt);
                
                                    
                 })
  
                     

                        
                                 //   搜索 回车 搜索
                 $('#gt-input4').keydown(function(event){
                      
                              if ( event.keyCode == 13) {
                                   var val=$('#gt-input4').val();
                                  
                                 $.ajax({
                                  url:url+'/findTeachAttendanceList.do',
                                        data:{
                                            className:val,
                                          
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                         
                                                self.Teachers_Dayder(res.data);
                                                 self.TeaEach();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };             
                 })

                        //   点击查询

                         $('#gt-searc4').on('click',function(){
                                var val=$('#gt-input4').val();
                                console.log(val);
                                


                                 $.ajax({
                                    url:url+'/findTeachAttendanceList.do',
                                        data:{
                                            className:val,
                                            

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Teachers_Dayder(res.data);
                                                 self.TeaEach();
                                                  self.titel();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })                

                            // 下拉查询
                               $('#gt-selec5').change(function(){
                       
                                 var orderStatus= $('#gt-selec5 option:selected').data('status');
                                
                                    // if(orderStatus=='正常'){
                                    //       orderStatus=0;
                                    // }else if(orderStatus=='请假'){
                                    //     orderStatus=1;
                                    // }else{
                                    //      orderStatus=' ';
                                    // }
                              console.log('orderStatus'+orderStatus);
                                 $.ajax({
                                       url:url+'/findTeachAttendanceList.do',
                                        data:{
                                            
                                             status:orderStatus,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Teachers_Dayder(res.data);
                                                self.TeaEach();
                                                 self.titel();
                                             }
                                                                                              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                    })


                           

             },
           
             
                TeaEach:function(){
                     $('#gt-table4 .gt-ListSex, #gt-Ctable1 .gt-ListSex').each(function(){
                        
                         var text=$(this).data('sex');
                          console.log(text)
                         if(text===''||text===undefined){
                          $(this).text('');
                           $(this).removeClass('gt-enroPass');
                         }else if(text===0){
                               $(this).text('正常');
                                $(this).removeClass('gt-enroPass');
                         }else{
                               $(this).text('请假');
                               $(this).addClass('gt-enroPass');
                         }
                     })

                     

                },

                    //教师考勤渲染
             Teachers_Dayder: function(data){
                var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
        
                // 获取html的模板
                var htmlTpl = $('#table4').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data.subList});
                // 执行渲染，使用append是为了使该渲染方法得以复用
                $('#gt-table4').html(htmlStr);
                $('#gt-showPg4').text(self.currentPg);
                
            },

             // 教师操作  签到 详情 查看记录 
             teaDeail:function(){
                   var  self=this;
                            // 阻止事假冒泡兼容写法
                            function stopPropagation(e) {
                                            if (e.stopPropagation) 
                                                e.stopPropagation();
                                            else 
                                                e.cancelBubble = true;
                                        }


                             // 教室出勤签到
                            $(document).on('click','.gt-Toper',function(e){
                                
                                $('.gt-Toperlist').hide();
                            $(this).parent().find('.gt-Toperlist').show();
                              stopPropagation(e)
                            })

                           
                             $(document).on( 'click','.gt-trans,.gt-transReport,.gt-classReport,#gt-QAddSdutend2 ',function(e){
                                  stopPropagation(e)
                            })
                            
                            $(document).on('click',function(){
                                $('.gt-Toperlist').hide();
                            })

                            // 签到
                           $('#gt-table4,#gt-Ctable1').on('click','.gt-sign',function(e){
                                     
                                      var data= $(this).data('status');
                                      console.log(data)
                                          if(data===''){
                                              
                                        self.rowId=$(this).parent().data('id');
                                         self.employeesId=$(this).parent().data('employeesid');
                                         self.classSonId=$(this).parent().data('classsonid');
                                         self.teamId=$(this).parent().data('teamid');
                                          self.status=$(this).parent().data('status');
                                            $('.gt-trans').show();
                                            $('.gt-singwy').show();
                                           return
                                          }
                                         if(data===0){
                                             $('#gt-wrtrBox').text('已签到过')
                                               $('.gt-trans').show();
                                               $('.gt-hasSing').show();
                                             return
                                          }
                                             if(data===1){
                                             $('#gt-wrtrBox').text('已请假')
                                             $('.gt-trans').show();
                                              $('.gt-hasSing').show();
                                             return
                                          }
                                   
                                           
                                stopPropagation(e)
                         
                        })
                           /*  取消 */
                           $('.gt-sure2,.gt-canceImg').click(function(){
                               $('.gt-trans').hide();
                                $('.gt-singwy').hide();
                                 $('.gt-workPas').hide();
                                   $('.gt-hasSing').hide();
                           })
                           $('.gt-notSuer').click(function(){
                                 $('.gt-singwy').hide();
                                  $('.gt-trans').hide();
                                 $('.gt-hasSing').hide();
                                 $('.gt-workPas').hide();
                           })
                      
                     /*    确认签到 */
                     $(document).on('click','#gt-sure',function(){

                            
                                               console.log(self.rowId);
                                               console.log(self.employeesId);
                                               console.log(self.classSonId);
                                                console.log(self.teamId);
                                                 console.log(self.status);
                            
                                   $.ajax({
                                       url:url+'/signIn.do',
                                        data:{
                                               rowId:self.rowId,
                                               employeesId:self.employeesId,
                                               classSonId:self.classSonId,
                                               teamId:self.teamId,
                                               status:'0' ,   
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   newDatasing();

                                                 $('.gt-trans').hide();
                                                 $('.gt-singwy').hide();
                                                 
                                             }
                                                                                              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                     })

                     var newDatasing=function(){

                          $.ajax({
                                     url:url+'/findTeachAttendanceList.do',
                                        data:{
                                     
                                               

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self.Teachers_Dayder(res.data);
                                                   self.Getwork_renders(res.data);
                                                  self.TeaEach();
                                                   self.titel();
                                             } else{
                                                  $('#gt-table4').html('\
                                                 <tr class="gt-dataTr">\
                                            <td class="gt-Tdatli0">工号</td>\
                                            <td class="gt-Tdatli1">姓名</td>\
                                            <td class="gt-Tdatli2">部门</td>\
                                            <td class="gt-Tdatli3">职位</td>\
                                            <td  class="gt-Tdatli4">应上课</td>\
                                            <td class="gt-Tdatli5">出勤情况</td>\
                                            <td class="gt-Tdatli6">本月上课次数</td>\
                                                <td class="gt-Tdatli7">操作</td> </tr>')
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                     };
                        
                      /*   确定请假 */
                    
                           $('#gt-table4,#gt-Ctable1').on('click','.gt-Passwork',function(e){
                               
                                   stopPropagation(e)
                                    var data= $(this).data('status');
                                      console.log(data)
                                          if(data===''){
                                                                                            
                                          $('#gt-pasworkWhy').val('');
                                       self.rowId=$(this).parent().data('id');
                                       self.employeesId=$(this).parent().data('employeesid');
                                        self.classSonId=$(this).parent().data('classsonid');
                                        self.teamId=$(this).parent().data('teamid');
                                        self.status=$(this).parent().data('status');
                               
                                            $('.gt-trans').show();
                                            $('#gt-passwork').show();
                                           return
                                          }
                                         if(data===0){
                                             $('#gt-wrtrBox').text('已签到过')
                                               $('.gt-trans').show();
                                               $('.gt-hasSing').show();
                                             return
                                          }
                                             if(data===1){
                                             $('#gt-wrtrBox').text('已请假')
                                             $('.gt-trans').show();
                                              $('.gt-hasSing').show();
                                             return
                                          }
                                 

                        })
                        
                                $('#gt-passworkSave').on( 'click',function(){
                                      var why=$('#gt-pasworkWhy').val();


                                              console.log( self.rowId);
                                              console.log(  self.employeesId);
                                              console.log(self.classSonId);
                                                console.log(  self.teamId);
                                                 console.log( self.status);
                                                 console.log(why);
                            
                                   $.ajax({
                                       url:url+'/signIn.do',
                                        data:{
                                               rowId:self.rowId,
                                               employeesId:self.employeesId,
                                               classSonId:self.classSonId,
                                               teamId:self.teamId,
                                               status:'1' ,
                                               why:why,                                   
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   newDatasing();
                                                $('.gt-trans').hide();
                                               $('.gt-transReport').hide();
                                             }
                                                                                              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                                })


                            // 退出
                            $(document).on('click','.gt-canceImg',function(e){
                            $('.gt-trans').hide();
                            $('.gt-transReport').hide();
                            stopPropagation(e)
                            })

                            // 详情
                            $('#gt-Ctable1,#gt-table4').on('click','.gt-details',function(e){
               

                                $('#gt-jobNumber').text($(this).data('jobnumber'));
                                   $('#gt-employeesName').text($(this).data('employeesname'));
                                      $('#gt-branchName').text($(this).data('branchname'));
                                         $('#gt-posName').text($(this).data('posname'));
                                    var  employeesId=$(this).parent().data('employeesid');       
                                     var month=$('#gt-dateInpu3').val();
                                        
                                   if(month){
                                           month=month.split('-');
                                           month=month[1].split('');
                                           if( month[0]=='0'){
                                                month=month[1];
                                           }else{
                                               month=month[0]+month[1]; 
                                           }
                                           
                                         }
                              console.log(employeesId);    
                                         
                                           console.log( month)
                                                
                            
                                   $.ajax({
                                       url:url+'/restList.do',
                                        data:{
                                              
                                               employeesId:employeesId,
                                               month:month,
                                                status:'1' ,
                                             
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){                                           
                                              self.Teachers_sign(res.data);                                
                                         }else{
                                                $('#gt-table6').html(
                                                    '\
                                            <td class="gt-Rdatli0">请假日期</td>\
                                            <td class="gt-Rdatli1">请假时长(小时)</td>\
                                            <td class="gt-Rdatli2">请假缘由</td>\
                                            <td class="gt-Rdatli3">录入人</td>\
                                                    '
                                            
                                            );
                                         }
                                                                                              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                                stopPropagation(e)
                            $('.gt-trans').show();
                         
                            $('#gt-jobNb').show();





                            })

                            //查看上课记录 获取id 和教室
                            $('#gt-table4,#gt-Ctable1').on('click','.gt-notes',function(e){
                                            
                                  self.teamId=$(this).parent().data('teamid');

                                   $.ajax({
                                       url:url+'/findTeamOption.do',
                                        data:{
                                              teamId: self.teamId,
                                               
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                              
                                             if(res.code===100){
                                              
                                                  var html=''
                                                  var dat=res.data;
                                               for(var i=0;i<dat.length;i++){
                                                   html+="<option  data-id="+dat[i].id+" value=''> "+dat[i].teamName +"</option>" ;
                                             
                                                $('#gt-class-sect').html(html);
                                               }
                                              self.Teacher_srt();
                                             }                                             
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                                stopPropagation(e)
                            $('.gt-trans').show();
                            $('.gt-classReport').show();
                        })

                      /*   时间轴 查询*/

                       $('#gt-datestareId').change(function(event){
                      

                                    var startDate= $('#gt-datestareId').val();
                                     var endDate= $('#gt-dateendId').val();
                                    
                                    console.log(startDate);
                                 $.ajax({
                                       url:url+'/restByRowList.do',
                                        data:{
                                             startDate:startDate, 
                                             endDate:endDate,
                                               
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                              
                                             if(res.code===100){
                                              
                                            
                                            self.Teachers_rest(res.data);
                                             }                                             
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });                   
                 })
                       
                  $('#gt-dateendId').change(function(event){
                      

                                   
                                      var startDate= $('#gt-datestareId').val();
                                     var endDate= $('#gt-dateendId').val();
                                  
                                 $.ajax({
                                     url:url+'/restByRowList.do',
                                        data:{
                                           
                                             startDate:startDate, 
                                             endDate:endDate,
                                               
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                              
                                             if(res.code===100){
                                              
                                           
                                           self.Teachers_rest(res.data);
                                             }                                             
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });                   
                 })


                                /*  下拉查询 */
                                
                               
                               $('#gt-class-sect').change(function(){
                       
                                 var teamId= $('#gt-class-sect option:selected').data('id');
                                //    var startDate= $('#gt-datestareId').val();
                                //  var endDate= $('#gt-dateendId').val();
                              console.log('orderStatus'+teamId);
                                 $.ajax({
                                          url:url+'/restByRowList.do',
                                        data:{
                                            //    endDate:endDate, 
                                            //  startDate:startDate, 
                                             teamId:teamId,
                                               
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                              
                                             if(res.code===100){
                                           
                                            
                                              self.Teachers_rest(res.data);
                                                  self.titel();
                                             }                                             
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });                   


                    })


                        
                             /*   查看上课记录 翻页 shou页 */
                          
                            $('#gt-homePg5').on('click',function(){
                               $.ajax({
                                        url:url+'/restByRowList.do',
                                        data:{
                                     
                                      curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Teachers_rest(res.data);
                                                  self.titel();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //  查看上课记录 翻页 下一页
                          
                            $('#gt-nextPg5').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                    url:url+'/restByRowList.do',
                                        data:{
                                     
                                      curPage:self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              
                                                 self.Teachers_rest(res.data);
                                                 self.titel();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                            


                            // 退出
                            $(document).on( 'click','.gt-ReportcanceImg', function(e){
                            $('.gt-trans').hide();
                            $('.gt-classReport').hide();
                            stopPropagation(e)
                            })                    
                   },
            //  查看记录刷新
              Teacher_srt:function(){
                       var self=this;
                    
                                       
                  $.ajax({
                                    url:url+'/restByRowList.do',
                                        data:{
                                   
                                      curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              
                                                self.Teachers_rest(res.data);
                                                 self.titel();
                                             }else{
                                                    $('#gt-table5').html('  <tr>\
                                                <td class="gt-CLdatli0">上课时间</td>\
                                                <td class="gt-CLdatli1">班级</td>   \
                                            </tr>'
                                            );
                                                                    
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                      }) 

              },
                    //教师考勤查看详情记录渲染
             Teachers_rest: function(data){
                var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
                  for(var i=0;i<data.subList.length;i++){
                           data.subList[i].startDate=(new Date(data.subList[i].startDate).Format("yyyy-MM-dd   hh:mm:ss"));  
                             data.subList[i].endDate=(new Date(data.subList[i].endDate).Format("yyyy-MM-dd  hh:mm:ss "));                     
                                        
                                 }
        
                // 获取html的模板
                var htmlTpl = $('#table5').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data.subList});
                // 执行渲染，使用append是为了使该渲染方法得以复用
                $('#gt-table5').html(htmlStr);
                $('#gt-showPg5').text(self.currentPg);
                
            },
        
              //教师考勤查看详情记录渲染
             Teachers_sign: function(data){
                var self=this;
                var htmlTpl = $('#table6').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data});
                // 执行渲染，使用append是为了使该渲染方法得以复用
                $('#gt-table6').html(htmlStr);
             
                
            },

            Getwork_renders:function(data){
             
                 var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
        
                // 获取html的模板
                var htmlTpl = $('#Ctable1').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data.subList});
                // 执行渲染，使用append是为了使该渲染方法得以复用
                $('#gt-Ctable1').html(htmlStr);
                $('#gt-CshowPg1').text(self.currentPg);
       
                         

           }
        
            };
    reception.init();
})();






