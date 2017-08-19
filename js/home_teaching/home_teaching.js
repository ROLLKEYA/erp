console.log('招生管理');
(function(){
    var teaching={
       initi:function(){
         
         /*   我的班级  */
           this.Myclass_bind();
        /*     作业管理  */
          this.MyHomework();
        /*   考试管理   */
        this.examination_bind();
      /*   评语管理  */
        this. Myremark_bind();
           //  当前页
           this.currentPg='';
            // 总页数
           this.pageCount=''; 
              /*  课程ID */
           this.classId='';
              /*   课程子表id */
           this.classSonId='';
         /*   报名活动id */
           this.enrollId='';
      /*      班级id   */
           this.teamId='';
          /*  考试id  */
           this.ExamId='';

          
         /*   新增课程  */  
           this.classSBox=[];

      /*   新增班级内容  */
        this.homeworkContent=[];
   /*  保存成绩集合  */
         this.GraldBox=[];
     /*  评语 学生id  */
        this.studentid=''
        this.bitBig=''
           },
       
           
         /*      我的班级    */
    Myclass_bind:function(){

               $(document).on('click','.gt-inputGrades,.gt-ordeMgDeail2',function(e){ 
            stopPropagation(e); 
            }); 

        var self=this;

$('.gt-NavTeaching').on('click',function(el){
        $('.gt-centCom').hide();
         $('.gt-teaching ').show(); 
         $('#gt-Myte1').addClass('gt-clikClor');
         $('#gt-Myte1').siblings().removeClass('gt-clikClor');
         $('#gt-MyClGt1').show();
         $('#gt-MyClGt1').siblings().hide();
 
                    $.ajax({
                                 url:url+'/findTeamManageList.do',
                                        data:{
                                    
                                        employeesId:'0',
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.Teaching_render(res.data);                     
                                                   
                                                }else{
                            $('#gt-Gtable1').html('<tr>\
                             <td class="gt-activi0">班级名称</td>\
                             <td class="gt-activi1">课程名称</td>\
                             <td class="gt-activi2">上课老师</td>\
                             <td class="gt-activi3">默认教室</td>\
                            // <td class="gt-activi4">已上课次</td>\
                             <td class="gt-activi5">开班日期</td>\
                              <td class="gt-activi6">操作</td>\
                              </tr>');
                           
                                                }
                                                                 
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    }); 
                         })


                          $('#gt-Myte1').on('click',function(){
                            $(this).addClass('gt-clikClor');
                            $(this).siblings().removeClass('gt-clikClor');
                            $('#gt-MyClGt1').show();
                            $('#gt-MyClGt1').siblings().hide();


                    $.ajax({
                                 url:url+'/findTeamManageList.do',
                                        data:{
                                    
                                        employeesId:'0',
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.Teaching_render(res.data);                     
                                                   
                                                }else{
                                                    $('#gt-Gtable1').html('<tr>\
                             <td class="gt-activi0">班级名称</td>\
                             <td class="gt-activi1">课程名称</td>\
                             <td class="gt-activi2">上课老师</td>\
                             <td class="gt-activi3">默认教室</td>\
                            // <td class="gt-activi4">已上课次</td>\
                             <td class="gt-activi5">开班日期</td>\
                              <td class="gt-activi6">操作</td>\
                              </tr>');
                           
                                                }
                                                                 
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    }); 
                    
                      })


                               // 首页
              $('#gt-GhomePg1').on('click',function(){
                               $.ajax({
                                      url:url+'/findTeamManageList.do',
                                        data:{
                                             employeesId:'0',
                                             curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                         self.Teaching_render(res.data);    
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                            $('#gt-GnextPg1').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                           url:url+'/findTeamManageList.do',
                                        data:{
                                             employeesId:'0',
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                    self.Teaching_render(res.data);    
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

                                 
                                 //   搜索 回车 搜索
                 $('#gt-Ginput1').keydown(function(event){
                        
                              if ( event.keyCode==13) {
                                
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                                url:url+'/findTeamManageList.do',
                                        data:{
                                         employeesId:'0',
                                         teamName:val,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Teaching_render(res.data);    
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };             
                 })

                        //    查询

                         $('#gt-Gsearc1').on('click',function(){
                                var val=$('#gt-Ginput1').val();
                                        
                                 $.ajax({
                                url:url+'/findTeamManageList.do',
                                        data:{
                                         employeesId:'0',
                                         teamName:val,   
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.Teaching_render(res.data);    
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })     
                                
                         
                             /*   详情 */
                             $('#gt-Gtable1').on('click','.gt-Qblist',function(){
                                 $('.gt-classSheet').show();
                                   $('.gt-trans').show();
                                        self.teamId=$(this).parent().data('id');
                                     console.log(self.teamId)
                                $.ajax({
                                    url:url+'/selectTeamDetails.do',
                                        data:{
                                      employeesId:'0',
                                      teamId:self.teamId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              
                                         res.data.startDate=(new Date(res.data.startDate).Format("yyyy-MM-dd "));  
                                              
                                                 // 获取html的模板
                                            var htmlTpl = $('#Qtable6').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data});
                                        
                                            $('#gt-Qtable6').html(htmlStr);

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                             });
                                
                                   /*   班级学员 */
                             $('#gt-Gtable1').on('click','.gt-Qblist3',function(){
                                 $('#gt-QAddSdutend2').show();
                                   $('.gt-trans').show();
                                     self.teamId=$(this).parent().data('id');
                                        console.log( self.teamId)
                                    $.ajax({
                                    url:url+'/selectStudentByTeamId.do',
                                        data:{
                                         employeesId:'0',
                                         teamId:self.teamId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              LIstNwedata(res.data);

                                             }else{
                                                  $('#gt-GTtable').html('\
                                                   <tr >\
                                            <td class="gt-Sdli0">学号</td>\
                                            <td class="gt-Sdli1 ">学员姓名 </td>\
                                            <td class="gt-Sdli2">性别</td>\
                                            <td class="gt-Sdli3">入学日期</td></tr>\
                                                  ');
                                                  
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                             })

                            
                             var LIstNwedata=function(data){

                                                           // 获取html的模板
                                        for(var i=0;i<data.subList.length;i++){
                  data.subList[i].updateDate=(new Date(data.subList[i].updateDate).Format("yyyy-MM-dd ")); 
                              
                                      }
                                           
                                            //  当前页
                                        self.currentPg=data.curPage;
                                        //总页数
                                        self.pageCount=data.pageCount;
                                            var htmlTpl = $('#Qtable7').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:data.subList});
                                            $('#gt-GTtable').html(htmlStr);
                                             $('#gt-Fshow4').text(self.currentPg);
                                        
                                          $('#gt-GTtable .gtQlist').each(function(){
                                              var sex=$(this).data('sex');
                                              if(sex===0){
                                                    $(this).text('男')
                                              }else{
                                                  $(this).text('女')
                                              }
                                          })
                             };
                          $('#gt-Fhome4').on('click',function(){
                              console.log(self.teamId)
                               $.ajax({
                                     url:url+'/selectStudentByTeamId.do',
                                        data:{
                                     employeesId:'0',
                                     teamId:self.teamId,
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                        LIstNwedata(res.data);
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                            $('#gt-Fnext4').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                             url:url+'/selectStudentByTeamId.do',
                                        data:{
                                     employeesId:'0',
                                       teamId:self.teamId,
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                                if(res.code===100){
                                            LIstNwedata(res.data);
                                          
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })


    },

Teaching_render:function(data){
            
                  var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
              
                 for(var i=0;i<data.subList.length;i++){
             data.subList[i].startDate=(new Date(data.subList[i].startDate).Format(" yyyy-MM-dd "));                     
                  }
               
        
                // 获取html的模板
                var htmlTpl = $('#Gtable1').html();
                // 生成html字符串，用于渲染
               
                var htmlStr = _.template(htmlTpl)({list:data.subList});
             
                $('#gt-Gtable1').html(htmlStr);
               $('#gt-Gshow1').text(self.currentPg);
               $('#gt-Gtatlo1').text(data.rowCount);
       
                                           /* 遍历 数据为空情况 */
                                $('#gt-Gtable1 .gt-Qlist').each(function(){
                                    var val=$(this).data('status');
                                  
                                    if(val===1){
                                       $(this).text('结业');
                                      
                                    }else{
                                        
                                          $(this).text('在读');
                                    }
                                })
           },

       /*    我的作业管理   */ 
       MyHomework:function(){
                var self=this;     
        $('#gt-Myte2').on('click',function(){
        $(this).addClass('gt-clikClor');
        $(this).siblings().removeClass('gt-clikClor');
        $('#gt-MyClGt2').show();
       $('#gt-MyClGt2').siblings().hide();
           $.ajax({
                                       url:url+'/findHomeworkList.do',
                                        data:{
                                          employeesId:'0',
                                                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){ 
                                           self.Homework_render(res.data);
                                            
                                             }else{
                                                  $('#gt-Gtable2').html('<tr >\
                                            <td class=" gt-HoWk0 ">作业名称</td>\
                                            <td class=" gt-HoWk1"> 班级</td>\
                                            <td class=" gt-HoWk3"> 发送时间</td> \
                                            <td class="  gt-HoWk4 ">操作</td>\
                                        </tr>');
                                                    }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
               });

                      
                            /*      作业详情    */
                            $('#gt-Gtable2').on('click','.gt-ordeMgDeail',function(){
                                
                         $('#gt-deailListhomework').html('')
                        
                         var id=$(this).data('id');
                         var teamname=$(this).data('teamname');
                         $('#gt-deaiFont').text(teamname+'-作业详情')
                         $('.gt-trans').show();
                         $('#gt-deailHomeWd').show();
                         console.log(id);
                         $.ajax({
                             url:url+'/selectHomeworkDetails.do',
                                      data:{
                                         employeesId:'0',
                                         homeworkId:id,
                                      },
                                      type:'post',
                                      dataType:'json',
                                      success: function(res){                                       
                                        console.log(res)
                                           if(res.code===100){
                                               var Dat=res.data;
                                               console.log(Dat)
                                             var htl='';
                                             for(var i=0;i<Dat.length;i++){
                                                 htl=+" <li><div class='gt-homeBox'><span class='gt-prClor'></span><span>作业内容 :</span></div><span>"+Dat[0].content+"</span></li>"
                                              }
                                             
                                             $('#gt-deailListhomework').html(htl)
                                           }
                                      },
                                      error: function(){
                                          console.log('网络出错');
                                      }
                                  });
                        })
 


                                 //   搜索 回车 搜索
                 $('#gt-GlistIpnsc').keydown(function(event){
                        
                              if ( event.keyCode==13) {
                                
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                               url:url+'/findHomeworkList.do',
                                        data:{
                                        homeworkName:val,
                                          employeesId:'0',
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                            self.Homework_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };             
                 })

                        //    查询

                         $('#gt-GsearcList').on('click',function(){
                                var val=$('#gt-GlistIpnsc').val();
                                        
                                 $.ajax({
                                url:url+'/findHomeworkList.do',
                                        data:{
                                                homeworkName:val,   
                                                  employeesId:'0',
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                     self.Homework_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })   


                                         // 首页
              $('#gt-GhomePg2').on('click',function(){
                               $.ajax({
                                         url:url+'/findHomeworkList.do',
                                        data:{
                                       employeesId:'0',
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.Homework_render(res.data);
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                            $('#gt-GnextPg2').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                  url:url+'/findHomeworkList.do',
                                        data:{
                                       employeesId:'0',
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                     self.Homework_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            });




               $('#gt-GnewAdd').on('click',function(){   

                $('#gt-QlistHome2').html('\
                <li><div class="gt-homeBox"><span class="gt-prClor">*</span><span>作业内容 :</span></div>  <input class="gt-AddNewwork" type="text"></li>\
                ');
                $('.gt-addHomeWd2 input').val('');
                    $('.gt-trans').show();
                    $('.gt-addHomeWd2').show();


      /*    所有班级 */
                 $.ajax({
                                       url:url+'/findTeamOption.do',
                                        data:{
                                               employeesId:'0',                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){ 
                                             var html=''
                                           for(var i=0;i<res.data.length;i++){
                                    html+=" <option value='' data-id="+ res.data[i].id+" >"+ res.data[i].teamName +"</option> "      
                                
                                        }
                                               $('#gt-QallClassroom2').html(" <option value=''>请选择班级</option> " +html);
                                                 
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    })


               });

/*     添加    */
$('#gt-QCouBut2').on('click',function(){
   
  $('#gt-QlistHome2').append('\
  <li><div class="gt-homeBox"><span class="gt-prClor">*</span><span>作业内容 :</span></div>  <input class="gt-AddNewwork" type="text"></li>\
  ')

});

        /*            取消   */
        $('.gt-butNoSave,.gt-popupRt,.gt-inpuNsave').on('click',function(){
              $('.gt-trans').hide();
           $('.gt-addHomeWd2').hide();
           $('#gt-GinputGrades').hide();
           $('#gt-GlookGrad').hide();
           $('#gt-GNewExam').hide();

        })
        
          
        $('.gt-addHomeWd2').on('click','input ,#gt-QallClassroom2',function(){
            $(".gt-homeWorkWoring2").hide();
            $('#gt-Qhomewk2').removeClass('gt-worings');
            $('#gt-QallClassroom2').parent().removeClass('gt-worings');
            $('.gt-AddNewwork').removeClass('gt-worings');

           })


 /*      确定新增作业    */
                           $('#gt-QnewSave2').on('click',function(){
                             
                            self.bitBig=false;

    
                             self.homeworkContent=[];
                           var homeworkName= $('#gt-Qhomewk2').val();
                                var  teamId= $('#gt-QallClassroom2 option:selected').data('id');
                                var reg =( /^\s*$/g).test(homeworkName);
                               
                                    
                                        if(homeworkName==''||homeworkName==null||homeworkName==undefined||reg){
                                          $('#gt-Qhomewk2').addClass('gt-worings');
                                          $(".gt-homeWorkWoring2").text('*请输入作业名称');
                                          $(".gt-homeWorkWoring2").show();
                                          return;
                                        }else{
                                          $('#gt-Qhomewk2').removeClass('gt-worings');
                                          $(".gt-homeWorkWoring2").text('');
                                          $(".gt-homeWorkWoring2").hide();
                                        }


                                        $('#gt-QlistHome2 .gt-AddNewwork').each(function(){
                                            var workContent={};
                                              var content=$(this).val();
                                              var list =( /^\s*$/g).test(content);
                                              if(content==''||content==null||content==undefined||list){
                                                $(this).addClass('gt-worings');
                                                self.bitBig=false;
                                                return;
                                             }else{
                                                workContent.content=content;
                                                self.homeworkContent.push(workContent);
                                                 self.bitBig=true;
                                             }
                                            
                                    })


                                        if(self.bitBig==false){
  
                                          $('#gt-QlistHome2 .gt-AddNewwork').each(function(){
                                             
                                                var content=$(this).val();
                                                var list =( /^\s*$/g).test(content);
                                                if(content==''||content==null||content==undefined||list){
                                                         $(this).addClass('gt-worings');
                                                  }else{
                                                      $(this).removeClass('gt-worings');
                                                  }
                                               })
                                          $(".gt-homeWorkWoring2").text('*请输入作业内容');
                                          $(".gt-homeWorkWoring2").show();
                                          return;
                                                                                 
                                              }else{
                                                  $(".gt-homeWorkWoring2").text('');
                                                  $(".gt-homeWorkWoring2").hide();
                                              }
            


                                              if(teamId==''||teamId==null||teamId==undefined){
                                                  $('#gt-QallClassroom2').parent().addClass('gt-worings');
                                                  $(".gt-homeWorkWoring2").text('*请选择班级');
                                                  $(".gt-homeWorkWoring2").show();
                                                  return;
                                                }else{
                                                  $('#gt-QallClassroom2').parent().removeClass('gt-worings');
                                                  $(".gt-homeWorkWoring2").text('');
                                                  $(".gt-homeWorkWoring2").hide();
                                                }

                                                var homeworkContents=self.homeworkContent;             
                                                homeworkContents=JSON.stringify(homeworkContents);
                                                console.log(teamId)
                                                console.log( homeworkName)
                                                console.log(homeworkContents);
  
                                $.ajax({
                                       url:url+'/addHomework.do',
                                        data:{
                                               homeworkName:homeworkName,
                                               teamId: teamId,
                                               homeworkContent:homeworkContents,
                                                 employeesId:'0',
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){ 
                                                 $('#gt-Qhomewk2,.gt-AddNewwork').val('');           
                                               $('.gt-trans').hide();
                                             $('.gt-addHomeWd2').hide();
                                                 newAddhome();

                                              }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    })



                           })


               /*      新增作业后刷新   */

               var newAddhome=function(){$.ajax({
                                       url:url+'/findHomeworkList.do',
                                        data:{
                                     
                                                 employeesId:'0',                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){ 
                                          self.Homework_render(res.data);
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    })
};

       },

         Homework_render:function(data){
             
                  var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
              
                 for(var i=0;i<data.subList.length;i++){
             data.subList[i].updateDate=(new Date(data.subList[i].updateDate).Format("yyyy-MM-dd hh:mm:ss")); 
                                
                  }
               
                // 获取html的模板
                var htmlTpl = $('#Gtable2').html();
                // 生成html字符串，用于渲染
               
                var htmlStr = _.template(htmlTpl)({list:data.subList});
             
                $('#gt-Gtable2').html(htmlStr);
               $('#gt-Gshow2').text(self.currentPg);
            //    $('#gt-Ptatlo1').text(data.rowCount);
       
           },
    /*     考试管理   */
    examination_bind:function(){
            var self=this;     
        $('#gt-Myte3').on('click',function(){
        $(this).addClass('gt-clikClor');
        $(this).siblings().removeClass('gt-clikClor');
        $('#gt-MyClGt3').show();
       $('#gt-MyClGt3').siblings().hide();
                       $.ajax({
                                    url:url+'/selectExamList.do',
                                        data:{
                                            
                                    employeesId:'0',
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.Examination_render(res.data);
                                              
                                             }else{
                                                 $('#gt-Gtable3').html('<tr >\
                          <td class=" gt-exam0 ">考试时间</td>\
                          <td class=" gt-exam1  "> 考试名称</td>\
                          <td class=" gt-exam2 ">参加考试班级 </td>\
                          <td class=" gt-exam3"> 参与人数</td>\
                          <td  class="gt-edu5  gt-exam4">操作</td>\
                          </tr>\
                                      ')
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });




                             
                                                      // 首页
              $('#gt-GhomePg3').on('click',function(){
                               $.ajax({
                                        url:url+'/selectExamList.do',
                                        data:{
                                       employeesId:'0',
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                           
                                               self.Examination_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                            $('#gt-GnextPg3').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                   url:url+'/selectExamList.do',
                                        data:{
                                       employeesId:'0',
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.Examination_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            });
           
                                             //   搜索 回车 搜索
                 $('#gt-Gsecher2').keydown(function(event){
                        
                              if ( event.keyCode==13) {
                                
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                                     url:url+'/selectExamList.do',
                                        data:{
                                         employeesId:'0',
                                         examName:val,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.Examination_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };             
                 })

                            
                        //   关键词查询

                         $('#gt-Gswrtsearc2').on('click',function(){
                                var val=$('#gt-Gsecher2').val();
                               
                                        
                                 $.ajax({
                                      url:url+'/selectExamList.do',
                                        data:{
                                                 employeesId:'0',
                                                examName:val,   
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.Examination_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         }) 


/*  新增考试 */
          $('#gt-Gsupply').on('click',function(){
              $('#gt-GNewExam,.gt-trans').show();
              $('#gt-GaddClassEm').removeClass('gt-warning');
              $('#gt-GaddClassEm2').removeClass('gt-warning');
              $('#gt-GaddClassEm3').removeClass('gt-warning');
              $('#gt-GclassId').parent().removeClass('gt-warning');
              $('.gt-QnewExam1').hide();
              $('.gt-QnewExam2').hide();
              $('.gt-QnewExam3').hide();
              $('.gt-QnewExam4').hide();
               
           /*    所有班级 */
                 $.ajax({
                                       url:url+'/findTeamOption.do',
                                        data:{
                                     
                                            employeesId:'0',                          
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             
                                            
                                             var html=''
                                           for(var i=0;i<res.data.length;i++){
                                  html+=" <option value='' data-id="+ res.data[i].id+" >"+ res.data[i].teamName +"</option> "      
                                
                                        }
                                               $('#gt-GclassId').html(html);
                                                 
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

             
          })

          $('#gt-GNewExam').on('click','input,#gt-GclassId',function(){
            
                            $('#gt-GaddClassEm').removeClass('gt-warning');
                            $('#gt-GaddClassEm2').removeClass('gt-warning');
                            $('#gt-GaddClassEm3').removeClass('gt-warning');
                            $('#gt-GclassId').parent().removeClass('gt-warning');
                            $('.gt-QnewExam1').hide();
                            $('.gt-QnewExam2').hide();
                            $('.gt-QnewExam3').hide();
                            $('.gt-QnewExam4').hide();
            
                          })

         /*  确定新增 */
          $('#gt-GaddExam').on('click',function(){

                       var examName=$('#gt-GaddClassEm').val();
                        var endDate=$('#gt-GaddClassEm3').val();
                         var startDate=$('#gt-GaddClassEm2').val();
                   var  teamId= $('#gt-GclassId option:selected').data('id');

                   var reg =( /^\s*$/g).test( examName);
                                  /*           名字     */
                    if( examName===''|| examName===null|| examName===undefined||reg){
                        
                            $('#gt-GaddClassEm').addClass('gt-warning');
                            $('.gt-QnewExam1').show();
                            return;
                        }else{
                            $('.gt-QnewExam1').hide();
                            $('#gt-GaddClassEm').removeClass('gt-warning');
                        }
                               /*   开始时间   */
                     if( startDate==''||startDate===null||startDate===undefined){
                        
                        $('#gt-GaddClassEm2').addClass('gt-warning');
                        $('.gt-QnewExam2').show();
                             return;
                         }else{
                            $('.gt-QnewExam2').hide();
                            $('#gt-GaddClassEm2').removeClass('gt-warning');
                         }
    
                                    /*    结束时间   */
                         if(  endDate==''||  endDate===null||  endDate===undefined){
                            
                            $('#gt-GaddClassEm3').addClass('gt-warning');
                            $('.gt-QnewExam3').show();
                                 return;
                             }else{
                                $('.gt-QnewExam3').hide();
                                $('#gt-GaddClassEm3').removeClass('gt-warning');
                             }
    
    
                             var  start =  startDate.replace(new RegExp("-","gm"),"/");
                             var  endDat =  endDate.replace(new RegExp("-","gm"),"/");
                            start = (new Date( start)).getTime();
                            endDat = (new Date( endDat)).getTime();
                              console.log( start)
                              console.log( endDat)
                            if( start>endDat|| start==endDat){
                                $('.gt-QnewExam2').text('*开始时间应该比结束时间早');
                                $('.gt-QnewExam3').text('*结束时间应该比开始时间晚');
                                $('.gt-QnewExam2').show();
                                $('.gt-QnewExam3').show();
                                $('#gt-GaddClassEm2').addClass('gt-warning');
                                $('#gt-GaddClassEm3').addClass('gt-warning');
                                
                                return;
    
                            }else{
                                $('.gt-QnewExam2').text('*请选择考试开始时间');
                                $('.gt-QnewExam3').text('*请选择考试结束时间');
                                $('#gt-GaddClassEm2').removeClass('gt-warning');
                                $('#gt-GaddClassEm3').removeClass('gt-warning');
                                $('.gt-QnewExam2').hide();
                                $('.gt-QnewExam3').hide();
                             }
    
    
                                   /*         班级    */
                             if(  teamId===''||  teamId===null||teamId===undefined){
                                
                                $('#gt-GclassId').parent().addClass('gt-warning');
                                $('.gt-QnewExam4').show();
                                     return;
                                 }else{
                                    $('.gt-QnewExam4').hide();
                                    $('#gt-GclassId').parent().removeClass('gt-warning');
                                 }




                  $.ajax({
                                    url:url+'/addExam.do',
                                        data:{
                                               employeesId:'0',  
                                             endDate:endDate,
    			                             startDate:startDate,
                                             teamId: teamId,
                                             examName:examName,

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                
                                           $('#gt-GaddClassEm').val('');
                                         $('#gt-GaddClassEm2').val('');
                                            $('#gt-GaddClassEm3').val('');
                                               $('#gt-GNewExam,.gt-trans').hide();
                                               addExam();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });  

          })


      
       /* 确定刷新 */
                 var   addExam=function(){

                     $.ajax({
                                    url:url+'/selectExamList.do',
                                        data:{
                                 employeesId:'0',  
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.Examination_render(res.data);
                                              
                                          
                                             }else{
                                                 $('#gt-Gtable3').html('<tr >\
                          <td class=" gt-exam0 ">考试时间</td>\
                          <td class=" gt-exam1  "> 考试名称</td>\
                          <td class=" gt-exam2 ">参加考试班级 </td>\
                          <td class=" gt-exam3"> 参与人数</td>\
                          <td  class="gt-edu5  gt-exam4">操作</td>\
                          </tr>\
                                      ')
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                 }


 $('#gt-Gtable3').on('click','.gt-Toper',function(){
                 $(this).prev().show();

          })






 /* 录入成绩 */
            $('#gt-Gtable3').on('click','.gt-QList',function(){
                $('#gt-GinputGrades,.gt-trans').show();
                    self.ExamId=$(this).parent().data('id');
                    console.log(self.ExamId);
                     $.ajax({
                                    url:url+'/selectStudentTeamExamList.do',
                                        data:{
                                              employeesId:'0',  
                                    examId: self.ExamId,

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                            
                                            List_newGrad(res.data);
                                             }else{
                                                 $('#gt-Qtable13').html(' <tr >\
                                            <td class="gt-Sdli0">学号</td>\
                                            <td class="gt-Sdli1 ">学员姓名 </td>\
                                            <td class="gt-Sdli2">考试成绩</td></tr>\
                                               ')
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

            })

                                                       //录入成绩分页 首页
              $('#gt-GListhomePg2').on('click',function(){
                               $.ajax({
                                       url:url+'/selectStudentTeamExamList.do',
                                        data:{
                                             employeesId:'0',    
                                       examId:self.ExamId,
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                           
                                                  List_newGrad(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                            $('#gt-GListnextPg2').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                  url:url+'/selectStudentTeamExamList.do',
                                        data:{
                                               employeesId:'0',  
                                       examId: self.ExamId,
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   List_newGrad(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            });


                       var List_newGrad=function(data){
                    
                                             var self=this;
                                                //  当前页
                                            self.currentPg=data.curPage;
                                            //总页数
                                            self.pageCount=data.pageCount;
                                                 
                                    
                                            // 获取html的模板
                                           var htmlTpl = $('#Qtable13').html();
                                            // 生成html字符串，用于渲染
                                           var htmlStr = _.template(htmlTpl)({list:data.subList}); 
                                            $('#gt-Gtable13').html(htmlStr);
                                            $('#gt-GListshowPg2').text(self.currentPg);
                                    }



                              /*     保存成绩   */
                              $('#gt-GListSaver').on('click',function(){
                                   self.GraldBox=[];
                                   console.log(self.ExamId)
                                 $('#gt-Gtable13 .gt-ListIt').each(function(){
                                     
                                    var  list ={};
                                    var resultsNumber=$(this).val();
                                    var  id=$(this).data('resultsid');
                                    var   studentId=$(this).data('resultsid');
                                      var examId=self.ExamId;
                                      var studentId= $(this).data('studentid');  
                                      
                                         list.id=id;
                                         list.studentId=studentId;
                                          list.examId=examId;
                                         list.resultsNumber= resultsNumber;
                                        if( resultsNumber|| !resultsNumber===undefined){
                                       self.GraldBox.push(list);
                                        }
                                      
                                 })
                                 var   list=self.GraldBox;             
                                  list=JSON.stringify(list);
                                  console.log(list)
                               

                                 $.ajax({
                                    url:url+'/addResults.do',
                                        data:{
                                         list:list,
                                           employeesId:'0',  

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){    
                                            
                                               $('#gt-GinputGrades,.gt-trans').hide();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                              });
                                

   /* 查看成绩 */
            $('#gt-Gtable3').on('click','.gt-QList2',function(){
                  self.ExamId=$(this).parent().data('id');
                $('#gt-GlookGrad,.gt-trans').show();
                 $.ajax({
                                    url:url+'/selectStudentTeamExamList.do',
                                        data:{
                                    examId: self.ExamId,
                                    employeesId:'0',  
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                         console.log(res)
                                             if(res.code===100){  
                                            var data=res.data;  
                                          
                                                //  当前页
                                            self.currentPg=data.curPage;
                                            //总页数
                                            self.pageCount=data.pageCount;
                                       
                                            // 获取html的模板
                                            var htmlTpl = $('#Qtable14').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:data.subList}); 
                                            $('#gt-Gtable14').html(htmlStr);
                                             $('#gt-GListshowPg3').text(self.currentPg);

                                             }else{
                                                 $('#gt-Qtable14').html(' <tr >\
                                            <td class="gt-Sdli0">学号</td>\
                                            <td class="gt-Sdli1 ">学员姓名 </td>\
                                            <td class="gt-Sdli2">考试成绩</td></tr>\
                                               ')
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


            })


            
                                                       //查看成绩分页 首页
              $('#gt-GListhomePg3').on('click',function(){
                               $.ajax({
                                       url:url+'/selectStudentTeamExamList.do',
                                        data:{
                                             employeesId:'0',    
                                       examId:self.ExamId,
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              var data=res.data;  
                                           
                                                //  当前页
                                            self.currentPg=data.curPage;
                                            //总页数
                                            self.pageCount=data.pageCount;
                                       
                                            // 获取html的模板
                                            var htmlTpl = $('#Qtable14').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:data.subList}); 
                                            $('#gt-Gtable14').html(htmlStr);
                                             $('#gt-GListshowPg3').text(self.currentPg);


                                             }else{
                                                 $('#gt-Qtable14').html(' <tr >\
                                            <td class="gt-Sdli0">学号</td>\
                                            <td class="gt-Sdli1 ">学员姓名 </td>\
                                            <td class="gt-Sdli2">考试成绩</td></tr>\
                                               ')
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                            $('#gt-GListnextPg3').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                  url:url+'/selectStudentTeamExamList.do',
                                        data:{
                                               employeesId:'0',  
                                       examId: self.ExamId,
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             var data=res.data;  
                                             var self=this;
                                                //  当前页
                                            self.currentPg=data.curPage;
                                            //总页数
                                            self.pageCount=data.pageCount;
                                       
                                            // 获取html的模板
                                            var htmlTpl = $('#Qtable14').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:data.subList}); 
                                            $('#gt-Gtable14').html(htmlStr);
                                              $('#gt-GListshowPg3').text(self.currentPg);
                                             }else{
                                                 $('#gt-Qtable14').html(' <tr >\
                                            <td class="gt-Sdli0">学号</td>\
                                            <td class="gt-Sdli1 ">学员姓名 </td>\
                                            <td class="gt-Sdli2">考试成绩</td></tr>\
                                               ')
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            });

                        
            

              /* 删除成绩 */
            $('#gt-Gtable3').on('click','.gt-QList3',function(){
                $('#gt-GdelGrad,.gt-trans').show();
                   self.ExamId=$(this).parent().data('id');

            })
          /*   确定删除 */
          $('#gt-GdelYe').on('click',function(){
              console.log(self.ExamId)
              $.ajax({
                                    url:url+'/deleteExam.do',
                                        data:{
                                     examId:self.ExamId,
                                     employeesId:'0', 
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 $('.gt-trans').hide(); 
                                                 $('#gt-GdelGrad').hide();
                                                 addExam();
  
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })


       })
            

    },
      Examination_render:function(data){

            
                  var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
              
                 for(var i=0;i<data.subList.length;i++){
               data.subList[i].startDate=(new Date(data.subList[i].startDate).Format("yyyy-MM-dd  hh:mm:ss ")); 
               data.subList[i].endDate=(new Date(data.subList[i].endDate).Format(" hh:mm:ss "));                    
                  }
                      
                // 获取html的模板
                var htmlTpl = $('#Gtable3').html();
                // 生成html字符串，用于渲染
               
                var htmlStr = _.template(htmlTpl)({list:data.subList});
             
                $('#gt-Gtable3').html(htmlStr);
               $('#gt-Gshow3').text(self.currentPg);
                     

        },

               //评语管理
        Myremark_bind: function(){
          
        var self=this;
      
        $('#gt-Myte4').on('click',function(){
        $(this).addClass('gt-clikClor');
        $(this).siblings().removeClass('gt-clikClor');
       $('#gt-MyClGt4').show();
       $('#gt-MyClGt4').siblings().hide();
           
                      $.ajax({
                                    url:url+'/findTeamManageList.do',
                                        data:{
                                   
                                           employeesId:'0',
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             self.StudentComments_render(res.data);
                                 
                                             }else{
                                               $('#gt-Gtable4').html(
                                                '<tr >\
                           <td class=" gt-atten0 gt-rem0">班级</td>\
                           <td class="gt-atten1 gt-rem1 "> 课程名称</td>\
                          <td class="gt-atten2 gt-rem2">  上课老师</td>\
                            <td class="gt-atten3 gt-rem3"> 默认教室</td> \
                           <td class="  gt-atten5 gt-rem4">状态  </td>\
                            <td class=" gt-atten7 gt-rem5">操作</td> </tr>\
                            '
                                               );

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                                });

                                
                                 //   搜索 回车 搜索
                 $('#gt-GTPinput1').keydown(function(event){
                        
                              if ( event.keyCode==13) {
                                
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                                 url:url+'/findTeamManageList.do',
                                        data:{
                                         employeesId:'0',
                                        teamName:val,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self. StudentComments_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };             
                 })

                        //    查询

                         $('#gt-GTPsearc1').on('click',function(){
                                var val=$('#gt-GTPinput1').val();
                                        
                                 $.ajax({
                                 url:url+'/findTeamManageList.do',
                                        data:{
                                             employeesId:'0',
                                            teamName:val,   
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self. StudentComments_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })   
                        
           

                             
                 /*       写评语     */
                 $('#gt-Gtable4').on('click','.gt-writeWor',function(){
                            self.teamId=$(this).data('id');
                            $('#gt-Gclassrod2').text($(this).data('class'));
                    $('#gt-Gsinged,.gt-trans').show();
                    console.log(self.teamId)
                     $.ajax({
                              url:url+'/selectStudentComments.do',
                                        data:{
                                       employeesId:'0',
                                      teamId:self.teamId, 
                                                                
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                singList(res.data);

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                 })
 
                 var  singList=function(data){
                  
 
                // 获取html的模板
                var htmlTpl = $('#Ptable2').html();
                // 生成html字符串，用于渲染
               
                var htmlStr = _.template(htmlTpl)({list:data});
             
                $('#gt-GPtable2').html(htmlStr);
                $('#gt-Pmany2').text(data.length);
                $('#gt-GPtable2 .gt-smallSpuer').each(function(){
                    console.log($(this).data('count'))
                     if($(this).data('count')===0){
                         $(this).removeClass('gt-came');
                         $(this).addClass(' gt-notyet');
                     }else{
                        
                          $(this).removeClass('gt-notyet');
                         $(this).addClass('gt-came');
                     }

                })
              
                 }

            /*   关闭   */
            $('.gt-sigedImg').on('click',function(){

                  $('#gt-Gsinged,.gt-trans').hide();
            })


             /*   查看评语    */
                  $('#gt-GPtable2').on('click','.gt-smallSpuer',function(){
                            $('#gt-GclassNo').text($(this).data('sdno'));
                            $('#gt-GstudentName').text($(this).data('sudentname'))
                    $('.gt-sYwordAd,#gt-GQsTiwss').show();
                            
                          self.studentid=$(this).data('studentid')        
                            $.ajax({
                                 url:url+'/ selectCommentsByStudentId.do',
                                        data:{
                                              employeesId:'0',
                                              teamId: self.teamId,  
                                               studentId:self.studentid,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               htmList(res.data);

                                             }else{
                                                 var htm='<tr >\
                                            <td class="gt-cond1 ">评论时间 </td>\
                                            <td class="gt-cond1 ">评语内容 </td>\
                                            <td class="gt-cond1 ">家长回复内容 </td> </tr>';
                                                   $('#gt-GCtable4').html(htm)
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                         });

                         var NewteamData=function(){
                               $.ajax({
                                 url:url+'/ selectCommentsByStudentId.do',
                                        data:{
                                              employeesId:'0',
                                              teamId:self.teamId,  
                                               studentId:self.studentid,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               htmList(res.data);

                                             }else{
                                                 var htm='<tr >\
                                            <td class="gt-cond1 ">评论时间 </td>\
                                            <td class="gt-cond1 ">评语内容 </td>\
                                            <td class="gt-cond1 ">家长回复内容 </td> </tr>';
                                                   $('#gt-GCtable4').html(htm)
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
    
                         }
                                
                         var htmList=function(data){

                              console.log(data)
                              var htm='<tr >\
                            <td class="gt-cond1 ">评论时间 </td>\
                             <td class="gt-cond1 ">评语内容 </td>\
                            <td class="gt-cond1 ">家长回复内容 </td> </tr>';
                            var htmlBx=''
                         for(var i=0;i<data.length;i++){
                             if(data[i].reply===null||data[i].reply===''||data[i].reply===undefined){data[i].reply='未回复'}
                            
                           htmlBx+= "<tr >\
                          <td class='gt-condY'>"+ data[i].updateDate+"</td>\
                          <td class='gt-condY'> "+ data[i].content +"</td>\
                          <td class='gt-condY'>"+ data[i].reply+" </td> </tr>"
            
                        }
                           $('#gt-GCtable4').html(htm+htmlBx);
                     
                         }


                        /*   关闭   */

                        $('.gt-popupR,.gt-butNoSv').on('click',function(){
                             $('.gt-GQsTiwss,.gt-sYwordAd,#gt-GQsTiwss').hide();

                        })
                   /*      取消警告   */
                        $('#gt-GListCount').on('click',function(){
                            $('.gt-pingYU').hide();

                        })
                    /* 新增评语管理 */

                    $('#gt-GQsingCome').on('click',function(){
                         var content=$('#gt-GListCount').val();
                         var reg =( /^\s*$/g).test(content);
                         if(content===''||content===undefined||content===null||reg){
                             $('.gt-pingYU').show();
                           return;
                         }else{
                            $('.gt-pingYU').hide();
                         }
                    
                               
                         console.log( self.teamId);
                         console.log(self.studentid)
                         console.log(content);
                           if(content){
                               $.ajax({
                                 url:url+'/addComments.do',
                                        data:{
                                             employeesId:'0',
                                              teamId: self.teamId,  
                                               studentId:self.studentid,
                                               content:content,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               
                                                       NewteamData();
                                                       $('#gt-GListCount').val('');
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                           }else{
                               alert('未写评语内容');
                           }


                    })




                    


                                         
              },

            StudentComments_render:function(data){
             
                  var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
              
                 for(var i=0;i<data.subList.length;i++){
             data.subList[i].startDate=(new Date(data.subList[i].startDate).Format(" yyyy-MM-dd "));                     
                  }
               
                // 获取html的模板
                var htmlTpl = $('#Gtable4').html();
                // 生成html字符串，用于渲染
               
                var htmlStr = _.template(htmlTpl)({list:data.subList});
             
                $('#gt-Gtable4').html(htmlStr);
               $('#gt-Gshow4').text(self.currentPg);
            //    $('#gt-Ptatlo1').text(data.rowCount);
       
                                           /* 遍历 数据为空情况 */
                                $('#gt-Gtable4 .gt-Plist').each(function(){
                                    var val=$(this).data('status');
                                  
                                    if(val===1){
                                       $(this).text('结业');
                                      
                                    }else{
                                        
                                          $(this).text('在读');
                                    }
                                })

           },


             
    };
    teaching.initi();
})()


