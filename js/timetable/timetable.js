console.log('点名课表');
(function(){
    var timetable={
       initi:function(){
            this.timetable_bind();
           // this.initi_noce();
             //  当前页
                this.currentPg='';
                //总页数
                this.pageCount='';
                 this.table_bind();
                //  排课id
               this.rowId='';
                   //  学员id
               this.studentId='';
                   // 课表id
               this.classSonId='';
                   //  班级课id
               this.teamId='';
                
           },
   
           timetable_bind:function(){
             var self=this;
            //  返回home页面
             $('.gt-backCur,.gt-backSp').on('click',function(){
                   $('iframe', parent.document).hide();
                   $('#gt-deail', parent.document).show();
             })
                 $('#gt-timetable', parent.document).on('click',function(){
                      self.initi_table(); 
                 })
              
            },
          initi_table:function(){



                var self=this;
              $.ajax({
                                       url:url+'/findToDayClassList.do',
                                        data:{
                                                                               
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.timetable_rend(res.data); 
                                                 $('.gt-paging').show()
                                             }else{
                                                 $('#gt-table1').html(
                                                     '<tr>\
                          <td class="gt-Edatli0 "> 班级名称 </td>\
                          <td class="gt-Edatli1">课程名称</td>\
                          <td  class="gt-Edatli2">教室名称</td>\
                          <td class="gt-Edatli3">上课老师</td>\
                          <td class="gt-Edatli4">上课时间</td>\
                          <td class="gt-Edatli5">状态</td>\
                          <td  class="gt-Edatli6">操作</td></tr>'
                          );
                          $('.gt-paging').hide();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
            },

            table_bind:function(){
                        var self=this;              
                                     // 公告首页
              $('#gt-homePg1').on('click',function(){
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
                                             self.timetable_rend(res.data); 
                                                $('.gt-paging').show()
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            // 点名 课表下一页
                          
                            $('#gt-nextPg1').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                  url:url+'/findToDayClassList.do',
                                        data:{
                                     
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                            self.timetable_rend(res.data); 
                                               $('.gt-paging').show()
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                              
                            // 时间课程查询
                                  $('.gt-MIS').on('change','#gt-tableInput',function(event){
                                   var val=$(this).val();
                                   console.log(val);
                                 $.ajax({
                                      url:url+'/findToDayClassList.do',
                                        data:{
                                             startDate:val,
                                         
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.timetable_rend(res.data); 
                                                    $('.gt-paging').show()
                                             }else{
                                                 $('#gt-table1').html(
                                                     '<tr>\
                          <td class="gt-Edatli0 "> 班级名称 </td>\
                          <td class="gt-Edatli1">课程名称</td>\
                          <td  class="gt-Edatli2">教室名称</td>\
                          <td class="gt-Edatli3">上课老师</td>\
                          <td class="gt-Edatli4">上课时间</td>\
                          <td class="gt-Edatli5">状态</td>\
                          <td  class="gt-Edatli6">操作</td></tr>'
                          );
                          $('.gt-paging').html('');
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });                      
                 })
                
                //  上课签到
                   $(document).on('click','.gt-sign',function(){
                           $('#gt-trans', parent.document).show();
                            $('.gt-trans').show();
                           $('.gt-signed').show();
                           
                           var className=$(this).data('teamname');
                            self.rowId=$(this).data('id');
                                
                                // 课表id
                            self.classSonId=$(this).data('classionid');
                                //  班级课id
                            self.teamId=$(this).data('teamid');
                           $('#gt-className').text(className);
                             self.singge_intni();
                   })
                        
                     /* 未到状态，签到 请假 */
                     $(document).on('click','.gt-smallSpuer',function(){
                             var status=$(this).data('status');
                                 self.studentId=$(this).data('id');
                             if(status===''){
                                   $('.gt-signedNew').show();
                                   $('.gt-trans2').show();
                             }
                         
                     })
                //   取消
                       $('.gt-sigedImgds').on('click',function(){
                             $('.gt-signedNew').hide();
                              $('.gt-trans2').hide();
                       })

                //签到 确定

                 $('#gt-singgeId').on('click',function(){

                              console.log("排课"+self.rowId)
                              console.log("学员"+self.studentId)
                              console.log("课程子表"+self.classSonId)
                              console.log("班级id"+self.teamId)
                                $('.gt-signedNew').hide();
                              $('.gt-trans2').hide();
                      $.ajax({
                                      url:url+'/signIn.do',
                                        data:{
                                        rowId: self.rowId,
                                        studentId: self.studentId,
                                        classSonId: self.classSonId,
                                        teamId:self.teamId,
                                        status:'0'       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self.singge_intni();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    }); 
                 })
                  
                //  请假
                $('#gt-hWork').on('click',function(){
              var html= '<div class="gt-singedHeader"><span class="gt-haveSign">学员状态</span> <span class="gt-sigedImgds"><img src="../image/ico/u2527.png" alt=""></span></div>\
     <div class="gt-relate"><div class="gt-relateGt gt-SmsLf"> <span>请假内容 : </span> </div><textarea   name="" id="gt-noticeContent2" cols="30" rows="10"> </textarea></div>\
    <div class="gt-boxsingge gt-listMto"><span id="gt-singoId"class="gt-singge">确定</span>  <span id="gt-backWork" class="gt-haswork">取消</span>\ </div>';
                   
              $('#gt-singList').html(html)
                })


                // 确定请假
                $(document).on('click','#gt-singoId',function(){
         
                     var why=$('#gt-noticeContent2').val();
                      console.log("排课"+self.rowId)
                              console.log("学员"+self.studentId)
                              console.log("课程子表"+self.classSonId)
                              console.log("班级id"+self.teamId)
                                $('.gt-signedNew').hide();
                              $('.gt-trans2').hide();
                      $.ajax({
                                      url:url+'/signIn.do',
                                        data:{
                                        rowId: self.rowId,
                                        studentId: self.studentId,
                                        classSonId: self.classSonId,
                                        teamId:self.teamId,
                                        status:'1',
                                        why:why,     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self.singge_intni();
                                                  $('#gt-noticeContent2').val(' ');
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    }); 
                })

                $(document).on('click','#gt-backWork',function(){
                     $('.gt-signedNew').hide();
                              $('.gt-trans2').hide();
                })


                   $('.gt-sigedImg').on('click',function(){
                          $('#gt-trans', parent.document).hide();
                            $('.gt-trans').hide();
                            $('.gt-signed').hide();
                             $('#gt-table2').html('');
                             $('#gt-notCome').text(0);
                             $('#gt-className').text(0);
                             $('#gt-howPeplo').text(0);
                   })

            },
                // 刷新状态
                singge_intni:function(){
                    var self=this;
                      $.ajax({
                                      url:url+'/callTheRoll.do',
                                        data:{
                                            rowClassId:self.rowId,
                                         
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.list_rend(res.data);
                                                self.initi_data(res)
                                             }else{
                                                 $('#gt-table2').html('');
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    }); 
                },
        //   遍历初始状态
        initi_data:function(res){
             $('#gt-table2 .gt-smallSpuer').each(function(){
                                                    var nub=0;
                                                    var status=$(this).data('status');
                                                    console.log(status)
                                                    if(status===0){
                                                      $(this).addClass('gt-bulespuare');
                                                    }else if(status===1){
                                                     $(this).addClass('gt-redspuare');
                                                    }else{
                                                         $(this).addClass('gt-notyet');
                                                         nub=nub+1;
                                                           $('#gt-notCome').text(nub);
                                                         
                                                    }
                                                })
                                                var length=res.data.length;
                                                 $('#gt-howPeplo').text(length);

        },
            // 点名
               timetable_rend:function(data){
                  var self=this;
                     for(var i=0;i<data.subList.length;i++){
                           data.subList[i].startDate=(new Date(data.subList[i].startDate).Format(" hh:mm"));  
                             data.subList[i].endDate=(new Date(data.subList[i].endDate).Format("  hh:mm"));                     
                                        
                                 }
        
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
        
                // 获取html的模板
                var htmlTpl = $('#table1').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data.subList});
             
                $('#gt-table1').html(htmlStr);
               $('#gt-showPg1').text(self.currentPg);  
            },
               // 签到
               list_rend:function(data){
                  var self=this;
                
                // 获取html的模板
                var htmlTpl = $('#table2').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data});
             
                $('#gt-table2').html(htmlStr);
                
            },


           /*  表格title属性 */
        titel:function(){
            
             $("td").each(function(){
              
            $(this).attr("title",$(this).text());
           
           });
       },
    };
    timetable.initi();
})()


