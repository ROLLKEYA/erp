console.log('招生管理');
(function(){
    var registrar={
       initi:function(){
          this.frist_intni();
          this.eventBind_registrar();

       /*    课程管理 */
          this.Arrangement();
       /*    报名管理 */
          this.EnrollList();
        /*   班级管理 */
        this.TeamManageList();
      /*   考试管理 */
      this.Examination();
        /*    评语     */
     /*    作业管理    */
     this.addHomework();
        this. StudentComments();
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

          /*  课程管理修改 id*/
          this.ClasschageId='';
          
         /*   新增课程  */  
           this.classSBox=[];

      /*   新增班级内容  */
      this.homeworkContent=[];
   /*  保存成绩集合  */
       this.GraldBox=[];
     /*  评语 学生id  */
     this.studentid='';
     this.bitBig='';
     
           },
       
      
     /* 第一次数据请求 */
                 
              frist_intni:function(){
                   var self=this;
                      $('.gt-NavReg').on('click',function(el){
                              $('#gt-AdminGT1').addClass('gt-clikClor');
                               $('#gt-AdminGT1').siblings().removeClass('gt-clikClor')
                         $('#gt-ClAdin1').show();
                        $('#gt-ClAdin1').siblings().hide();
                         $('.gt-centCom').hide();
                        $('.gt-educational').show();
                             $.ajax({
                                     url:url+'/ findClassSonList.do',
                                        data:{
                                     
                                                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               
                                        self.Arrangement_render(res.data);
                                               $('#gt-QhasPrent').text(res.data.rowCount);

                                             }else{
                                                 var html='  <tr >\
                                <td class="gt-edu0">课程名称</td>\
                                <td class="gt-edu1 gt-eduTabRal">单价 </td>\
                                <td class="gt-edu2 gt-eduTabRal"> 级别</td>\
                                <td class="gt-edu3 gt-eduTabRal"> 科目 </td>\
                                <td  class="gt-edu4 ">每期节(小时) 数</td>\
                                <td class="gt-edu5">操作</td> </tr>'
                                                $('#gt-Qtable1').html(html);
                                                   
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                    
                   })

                     // 首页
              $('#gt-QhomePg1').on('click',function(){
                               $.ajax({
                                       url:url+'/ findClassSonList.do',
                                        data:{
                                     
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.Arrangement_render(res.data);
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                            $('#gt-QnextPg1').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                               url:url+'/ findClassSonList.do',
                                        data:{
                                     
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self.Arrangement_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

                                 
                                 //   搜索 回车 搜索
                 $('#gt-Qinput1').keydown(function(event){
                        
                              if ( event.keyCode==13) {
                                
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                                  url:url+'/ findClassSonList.do',
                                        data:{
                                         className :val,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Arrangement_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };             
                 })

                        //    查询

                         $('#gt-Qsearc1').on('click',function(){
                                var val=$('#gt-Qinput1').val();
                                        
                                 $.ajax({
                                    url:url+'/ findClassSonList.do',
                                        data:{
                                               className:val,   
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.Arrangement_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })      
                                
                         
                      /*    新增 */
                      $('#gt-Caddsuply').on('click',function(){
                          $('.gt-centCom').hide();
                             $('#gt-NewDataList').text('新增课程')
                          $('#gt-Caddclass').show();
                            $('#gt-QlistIpt').val('');
                            $('#gt-QlistIpt2').val('');
                            $('#gt-QlistIpt3').val('');
                            $('.gt-alBoxIpu').val('');
                            $('.gt-QBOxiput3').val('');
                            $('.gt-QwaringL1').hide();
                            $('.gt-QwaringL2').hide();
                            $('.gt-QwaringL3').hide();
                            $('.gt-QwaringL4').hide();
                            $('.gt-QwaringL5').hide();
                            $('input').removeClass('gt-warning');


                             var html='\
                      <ul class="gt-QlistLi">\
                  <li> <div class="gt-alignedBox"> \
                 <div class="gt-agnedL"><span class="gt-alignColor">* </span><span>级别：</span></div>\
                 </div> <input class="gt-alBoxIpu gt-QBOxiput1" value="" type="text" placeholder="无">\
                 <span class="gt-alignColor gt-aligLf">* </span><span>单价：</span><input  onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,"");}).call(this)" class="gt-alBoxIpu gt-QBOxiput2 "  type="text" placeholder="">\
                  <div class="gt-QwaringL4">*请输入课程级别</div> <div class="gt-QwaringL5">*请输入课程单价</div>\
            </li>\
            <li class="gt-bttonBoxLi"> <div class="gt-alignedBox"> \
                 <div class="gt-agnedL"><span>课程介绍：</span></div>\
                 </div>  <textarea class="gt-QBOxiput3" data-id=" "  name="" id="" cols="20" rows="10"></textarea> </li>\
             <li class="gt-bttonBoxLi"> <div class="gt-alignedBox"> \
                 <div class="gt-agnedL"><span>课程图片：</span></div>\
                 </div>  <div class="gt-bttonImg"> <img src="../image/ico/u8995.png" alt=""></div> \
                  <div class="gt-alignChoose">\
                      <div class="gt-chooseBut"> 选择图片</div>\
                      <p>提示：可添加多张图片，图片将在手机端课程详情页展示</p>\
                  </div></li>\
               </ul>';
                             $('#gt-QlistLiBox').html(html);



                             
                                                       
                              self.classSonId='';
                             self.ClasschageId='';
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
                                   html+=" <option value=''  data-id="+ res.data[i].id+" >"+ res.data[i].subjectName +"</option> " ;     
                                             
                                        }
                                               $('#gt-QselctList').html(" <option value=''  >请选择科目</option> "+html);

                                             }

                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                      });

               /*     刷新 数据    */

               var mydata_addcla=function(){

                $.ajax({
                                     url:url+'/findClassSonList.do',
                                        data:{
                                     
                                                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               
                                        self.Arrangement_render(res.data);

                                        $('#gt-QhasPrent').text(res.data.rowCount);

                                             }else{
                                                 var html='  <tr >\
                                <td class="gt-edu0">课程名称</td>\
                                <td class="gt-edu1 gt-eduTabRal">单价\
                               </td>\
                          <td class="gt-edu2 gt-eduTabRal">级别 </td>\
                          <td class="gt-edu3 gt-eduTabRal">科目\
                          </td>\
                          <td  class="gt-edu4 ">每期节(小时) 数</td>\
                           <td class="gt-edu5">操作</td> </tr>'
                                                $('#gt-Qtable1').html(html);
                                                   
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
               };


                         /*        添加级别    */ 
                         $('#gt-QaddClass').on('click',function(){
                             var html='\
                      <ul class="gt-QlistLi">\
                  <li> <div class="gt-alignedBox"> \
                 <div class="gt-agnedL"><span class="gt-alignColor">* </span><span>级别：</span></div>\
                 </div> <input class="gt-alBoxIpu gt-QBOxiput1" value="" type="text" placeholder="无">\
                 <span class="gt-alignColor gt-aligLf">* </span><span>单价：</span><input onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,"");}).call(this)" class="gt-alBoxIpu gt-QBOxiput2 "  type="text" placeholder="">\
                  <div class="gt-QwaringL4">*请输入课程级别</div> <div class="gt-QwaringL5">*请输入课程单价</div>  \
            </li>\
            <li class="gt-bttonBoxLi"> <div class="gt-alignedBox"> \
                 <div class="gt-agnedL"><span>课程介绍：</span></div>\
                 </div>  <textarea class="gt-QBOxiput3" data-id=" "  name="" id="" cols="20" rows="10"></textarea> </li>\
             <li class="gt-bttonBoxLi"> <div class="gt-alignedBox"> \
                 <div class="gt-agnedL"><span>课程图片：</span></div>\
                 </div>  <div class="gt-bttonImg"> <img src="../image/ico/u8995.png" alt=""></div> \
                  <div class="gt-alignChoose">\
                      <div class="gt-chooseBut"> 选择图片</div>\
                      <p>提示：可添加多张图片，图片将在手机端课程详情页展示</p>\
                  </div></li>\
               </ul>';
                             $('#gt-QlistLiBox').append (html);


                         })

                              $(' .gt-changesBox input').on('focus',function(){
                                          $('#gt-QlistIpt').removeClass('gt-warning');
                                          $('.gt-QwaringL1').hide();
                                          $('#gt-QlistIpt2').removeClass('gt-warning');
                                       $('.gt-QwaringL2').hide();
                                        $('#gt-QlistIpt3').removeClass('gt-warning');
                                       $('.gt-QwaringL3').hide();
                                       $('.gt-chosetype').hide();

                            })
                            $('#gt-Qbjecte,#gt-QselctList').on('click',function(){
                                $('#gt-QlistIpt').removeClass('gt-warning');
                                $('.gt-QwaringL1').hide();
                                $('#gt-QlistIpt2').removeClass('gt-warning');
                               $('.gt-QwaringL2').hide();
                               $('#gt-QlistIpt3').removeClass('gt-warning');
                              $('.gt-QwaringL3').hide();
                              $('.gt-chosetype').hide();
                            })

                 /*      新增保存    */

                 $('#gt-QlSon').on('click',function(){
                                 self.classSBox=[];
                                 self.bitBig=false;
                                 var billingType=$('#gt-Qbjecte option:selected').data('type');
                                  /*        名字 不能为空  */
                                   if($('#gt-QlistIpt').val()===''||$('#gt-QlistIpt').val()===undefined||$('#gt-QlistIpt').val()===null){
                                  
                                       $('#gt-QlistIpt').addClass('gt-warning');
                                       $('.gt-QwaringL1').show();
                                          return;
                                   } else{   $('#gt-QlistIpt').removeClass('gt-warning');
                                       $('.gt-QwaringL1').hide();}
                                      /*    选择计费方式    */
                                      if (billingType===''|| billingType===undefined|| billingType===null){
                                        $('.gt-chosetype').show();
                                      return;
                                    }else{
                                        $('.gt-chosetype').hide();
                                    }
                                        

                                         /*        期数 不能为空  */
                                   if($('#gt-QlistIpt2').val()===''||$('#gt-QlistIpt2').val()===undefined||$('#gt-QlistIpt2').val()===null){
                                  
                                       $('#gt-QlistIpt2').addClass('gt-warning');
                                       $('.gt-QwaringL2').show();
                                          return;
                                   } else{   
                                       $('#gt-QlistIpt2').removeClass('gt-warning');
                                       $('.gt-QwaringL2').hide();
                                    }

                                        /*        上课时长 不能为空  */
                                   if($('#gt-QlistIpt3').val()===''||$('#gt-QlistIpt3').val()===undefined||$('#gt-QlistIpt3').val()===null){
                                  
                                       $('#gt-QlistIpt3').addClass('gt-warning');
                                       $('.gt-QwaringL3').show();
                                          return;
                                   } else{  
                                        $('#gt-QlistIpt3').removeClass('gt-warning');
                                       $('.gt-QwaringL3').hide();
                                    }

                                    var subjectId=$('#gt-QselctList option:selected').data('id');

                                    if (subjectId===''|| subjectId===undefined|| subjectId===null){
                                        $('.gt-woringSelec').show();
                                      return;
                                    }else{
                                        $('.gt-woringSelec').hide();
                                    }


                                      $('#gt-QlistLiBox .gt-QlistLi').each(function(){

                                         var valt=$(this).find('.gt-QBOxiput1').val();
                                         if(valt===''||valt===undefined||valt===null){
                                            $(this).find('.gt-QBOxiput1').addClass('gt-warning');
                                            $(this).find('.gt-QwaringL4').show();
                                            self.bitBig=false;
                                                return;
                                         }else{
                                            $(this).find('.gt-QBOxiput1').removeClass('gt-warning');
                                            $(this).find('.gt-QwaringL4').hide();
                                            self.bitBig=true;
                                         }

                                           var valtl=$(this).find('.gt-QBOxiput1').val();
                                         if(valtl===''||valtl===undefined||valtl===null){
                                            $(this).find('.gt-QBOxiput2').addClass('gt-warning');
                                            $(this).find('.gt-QwaringL5').show();
                                            self.bitBig=false;
                                                return;
                                         }else{
                                            $(this).find('.gt-QBOxiput2').removeClass('gt-warning');
                                            $(this).find('.gt-QwaringL5').hide();
                                            self.bitBig=true;
                                         }

                                      })
                                if( self.bitBig===false){
                                 return;
                                }



                      console.log(self.classId)
                                if(self.classId===''||self.classId===undefined||self.classId===null){
                                    
                                var className=$('#gt-QlistIpt').val();
                                 var  count=$('#gt-QlistIpt2').val();
                                 var  classTime=$('#gt-QlistIpt3').val();
                                 var billingType=$('#gt-Qbjecte option:selected').data('type');
                              
                                
                                     console.log( className)
                                      console.log( count)
                                      console.log( billingType)
                                      console.log( subjectId)
                                      console.log( classTime)

                        $('#gt-QlistLiBox .gt-QlistLi').each(function(){
                           
                            var  classSons={};
                            var   classImage='';
                            var   classIntroduce=$(this).find('.gt-QBOxiput3').val();  
                            var   levelName=$(this).find('.gt-QBOxiput1').val();  
                             var    money=$(this).find('.gt-QBOxiput2 ').val();  
                             var subjectId=$('#gt-QselctList option:selected').data('id');
                                  classSons.classImage=classImage;
                                  classSons. classIntroduce= classIntroduce;
                                  classSons.levelName=levelName;
                                  classSons.money=money;
                                  classSons.subjectId=subjectId;
                                  self.classSBox.push(classSons)
                        })
                                var   classSons=self.classSBox;             
                                  classSons=JSON.stringify(classSons);
                                   console.log(classSons)

                       $.ajax({
                                       url:url+'/addClassSon.do',
                                        data:{
                                     
                                                 className:className,
                                                 count: count,
                                                 classTime:classTime,
                                                 subjectId:subjectId,
                                                 billingType:billingType,
                                                 classSonArray:classSons,
                             
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               $('.gt-educational').show();
                                               $('#gt-Caddclass').hide();
                                        mydata_addcla();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                }else{
                             
                                       
                                var className=$('#gt-QlistIpt').val();
                                 var  count=$('#gt-QlistIpt2').val();
                                 var  classTime=$('#gt-QlistIpt3').val();
                                 var billingType=$('#gt-Qbjecte option:selected').data('type');
                                var subjectId=$('#gt-QselctList option:selected').data('id');
                                
                                     console.log( className)
                                      console.log( count)
                                      console.log( billingType)
                                      console.log( subjectId)
                                      console.log( classTime)

                        $('#gt-QlistLiBox .gt-QlistLi').each(function(){
                           
                            var  classSons={};
                            var   classImage='';
                            var   classIntroduce=$(this).find('.gt-QBOxiput3').val(); 
                             var   id=$(this).find('.gt-QBOxiput3').data('id'); 
                            var   levelName=$(this).find('.gt-QBOxiput1').val();  
                             var    money=$(this).find('.gt-QBOxiput2 ').val();  
                             var subjectId=$('#gt-QselctList option:selected').data('id');
                                 classSons.id=id;
                                  classSons.classImage=classImage;
                                  classSons.classIntroduce= classIntroduce;
                                  classSons.levelName=levelName;
                                  classSons.money=money;
                                  classSons.subjectId=subjectId;
                                  self.classSBox.push(classSons)
                        })
                                var   classSons=self.classSBox;             
                                  classSons=JSON.stringify(classSons);
                                   console.log(classSons)

                       $.ajax({
                                       url:url+'/addClassSon.do',
                                        data:{
                                                  id:self.classId,
                                                 className:className,
                                                 count: count,
                                                 classTime:classTime,
                                                 subjectId:subjectId,
                                                 billingType:billingType,
                                                 classSonArray:classSons,
                             
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               $('.gt-educational').show();
                                               $('#gt-Caddclass').hide();
                                        mydata_addcla();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                                }

                 });



                 $('#gt-QnosaveClass,#gt-Qbackhome,#gt-QfanBack').on('click',function(){
                            $('.gt-educational').show();
                             $('#gt-Caddclass').hide();


                 })

               

                 

                 },

           /*   课程管理 */
           Arrangement:function(){
                var self=this;
            
            $(document).on('click',function(){ 
            $('.gt-eductUl,.gt-activiUl,.gt-attenOptUl').css('display','none'); 

            }); 

            $(document).on('click','.gt-NewClassAd,#gt-QAddSdutend,.gt-eductUl,.gt-activiUl,.gt-enterDeail,.gt-ClassDeail,#gt-Qdelclass,#gt-QCourse,.gt-classSheet ',function(e){ 
            stopPropagation(e); 
            }); 
          $(document).on('click','#gt-QinputGrades,.gt-signed,#gt-QAddstudents ',function(e){ 
            stopPropagation(e); 
            }); 

           
          
           /*  关闭 */
           $('.gt-popupRt').on('click',function(){
               $('.gt-enterDeail').hide();
                 $('.gt-trans').hide();
                 $('#gt-QupDown,.gt-enterAdd,.gt-classSheet,.gt-ClassDeail,.gt-classSduten,#gt-Qpopu,.gt-addHomeWd').hide();
               
           });
           
               
        
          $('.gt-classAdnim').on('click','.gt-Toper',function(){
                      $('.gt-eductUl').hide();
                    $(this).prev().show();
          })
             
      $('#gt-AdminGT1').on('click',function(){
              $(this).addClass('gt-clikClor');
              $(this).siblings().removeClass('gt-clikClor')
             $('#gt-ClAdin1').show();
             $('#gt-ClAdin1').siblings().hide();
                $.ajax({
                                     url:url+'/findClassSonList.do',
                                        data:{
                                     
                                                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               
                                        self.Arrangement_render(res.data);

                                        $('#gt-QhasPrent').text(res.data.rowCount);

                                             }else{
                                                 var html='  <tr >\
                                <td class="gt-edu0">课程名称</td>\
                                <td class="gt-edu1 gt-eduTabRal">单价\
                               </td>\
                          <td class="gt-edu2 gt-eduTabRal">级别 </td>\
                          <td class="gt-edu3 gt-eduTabRal">科目\
                          </td>\
                          <td  class="gt-edu4 ">每期节(小时) 数</td>\
                           <td class="gt-edu5">操作</td> </tr>'
                                                $('#gt-Qtable1').html(html);
                                                   
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


          })

       /*    详情       */
       $(document).on('click','#gt-Qtable1 .gt-Qlist',function(){
                 $('#gt-Qcourse').show();
                 $('.gt-trans').show();
                   self.classId=$(this).parent().data('classid');
                  console.log(self.classId)
                        $.ajax({
                                     url:url+'/selectClassDetails.do',
                                        data:{
                                     classId:self.classId,                            
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  // 获取html的模板
                                                var htmlTpl = $('#Qtable2').html();
                                                // 生成html字符串，用于渲染
                                                var htmlStr = _.template(htmlTpl)({list:res.data});                                          
                                                  $('#gt-Qtble2').html(htmlStr);
                                                   var billingType= $('#gt-listabig').data('billingType');
                                                   if(billingType==0){
                                                       $('#gt-listabig').text('以节计费');
                                                   }else{
                                                          $('#gt-listabig').text('以小时计费');
                                                   }
                                     
                                             }else{
                                                 
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });





       })

      /*  关闭详情 */

    $('.gt-supSpanRt').on('click',function(){
      $('#gt-Qcourse').hide();

    })
    
                      /*    请求课目集合  */ 
                      var RquerSbLIst=function(){
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
                                               $('#gt-QselctList').html(" <option value=''   >请选择科目</option> "+html);

                                             }

                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                      }


                /*    修改       */
       $('#gt-ClAdin1').on('click','#gt-Qtable1 .gt-Qlist2',function(){

                //  $('#gt-addClass').show();
                //  $('.gt-educational').hide();
                          $('.gt-centCom').hide();
                          $('#gt-NewDataList').text('修改课程');
                             RquerSbLIst();
                       self.classId=$(this).parent().data('classid');
                         $.ajax({
                                     url:url+'/selectClassDetails.do',
                                        data:{
                                     classId:self.classId,                            
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                          $('#gt-QlistIpt').val(res.data.className);
                                           $('#gt-QlistIpt2').val(res.data.count);
                                            $('#gt-QlistIpt3').val(res.data.classTime);

                                             var htmlTpl = $('#GTAtable4').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data.classSons});
                                            $('#gt-QlistLiBox').html(htmlStr);
                                            $('#gt-Qbjecte option ').each(function(){
                                              
                                                if(res.data.billingType===$(this).data('type')){
                                                    $(this).attr("selected",true)
                                                }
                                            })

                                            $('#gt-QselctList option ').each(function(){
                                                if(res.data.subjectId===$(this).data('id')){
                                                    $(this).attr("selected",true)
                                                }
                                                
                                             
                                            })

                                              $('#gt-Caddclass').show();   
                                         

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                         })



                    





                /*    删除       */
       $(document).on('click','#gt-Qtable1 .gt-Qlist3',function(){

                $('#gt-QYpote').show();
                 $('.gt-trans').show();
                  self.classSonId=$(this).parent().data('id');

       })
               /*  取消 关闭 课程弹窗 */
               $('.gt-butNoSave,.gt-popupRt').on('click',function(){
                    $('#gt-QYpote').hide();
                 $('.gt-trans,#gt-QinputGrades,#gt-QlookGrad,#gt-QdelGrad').hide();
                 $('#gt-QupDown,.gt-enterAdd,.gt-ClassDeail,#gt-Qpopu,#gt-QNewExam').hide();
               })

              /*  删除后刷新 */

              var newClassList=function(){
                   $.ajax({
                                     url:url+'/ findClassSonList.do',
                                        data:{
                                     
                                                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               
                                        self.Arrangement_render(res.data);
                                               $('#gt-QhasPrent').text(res.data.rowCount);

                                             }else{
                                                 var html='  <tr >\
                                <td class="gt-edu0">课程名称</td>\
                                <td class="gt-edu1 gt-eduTabRal">\
                                    <span class="gt-chosChang ">单价\
                                  <span class="gt-eduImg"> </span>\
                                   <span class="gt-eduImgUp"> </span> -->\
                                   </span>\
                               </td>\
                          <td class="gt-edu2 gt-eduTabRal">\
                                   <span class="gt-chosChang">级别<span class="gt-ImgClass"> <img src="../image/ico/u2448w.png" alt=""></span>\
                                   <ul>  <li>初级</li> <li>高级</li> </ul> </span>\
                          </td>\
                          <td class="gt-edu3 gt-eduTabRal">\
                              <span class="gt-chosChang">科目<span class="gt-ImgClass"> <img src="../image/ico/u2448w.png" alt=""></span>\
                                   <ul>  <li>语文</li>  <li>数学</li> <li>英语</li> <li>美术</li> </ul> </span>\
                          </td>\
                          <td  class="gt-edu4 ">每期节(小时) 数</td>\
                           <td class="gt-edu5">操作</td> </tr>'
                                                $('#gt-Qtable1').html(html);
                                                   
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
              };

              /*  确定删除 */
                 $('#gt-QYpote').on('click','#gt-Qbutsuer',function(){
                  $('#gt-QYpote').hide();
                 $('.gt-trans').hide();
                 
                  console.log(self.classSonId)
                        $.ajax({
                                     url:url+'/deleteClass.do',
                                        data:{
                                     classSonId:self.classSonId,                            
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               
                                              newClassList();
                                     
                                             }else{
                                                 
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                          })

           },
              /*   课程管理渲染 */
       Arrangement_render:function(data){

                  var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
        
                // 获取html的模板
                var htmlTpl = $('#Qtable1').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data.subList});
             
                $('#gt-Qtable1').html(htmlStr);
               $('#gt-QshowPg1').text(self.currentPg);
                
       },


     /*   报名管理 */
            EnrollList:function(){
                    var self=this;
                 /*    报名管理 点击请求数据 */
                $('#gt-AdminGT2').on('click',function(){
                    $(this).addClass('gt-clikClor');
                    $(this).siblings().removeClass('gt-clikClor')
                    $('#gt-ClAdin2').show();
                    $('#gt-ClAdin2').siblings().hide();

                     $.ajax({
                                     url:url+'/ findEnrollList.do',
                                        data:{
                                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.EnrollList_render(res.data);
                                                    var Nber=0;
                                                var data=res.data.subList;
                                                 for(var i=0;i<data.lenght;i++){
                                                     if(data[i].recruitCount>=data[i].enrollCount){
                                                        Nber=Nber+1;
                                                     } 
                                                 }
                                        $('#gt-QNberYes').text(Nber);
                                         $('#gt-QNberNot').text($('#gt-QheradWor').text()-Nber);



                                             }else{
                                                 $('#gt-Qtable3').html(' <tr>\
                              <td class="gt-activi0">报名活动名称</td>\
                              <td class="gt-activi1">课程名称</td>\
                              <td class="gt-activi2">价格</td>\
                              <td class="gt-activi3">招生人数</td>\
                              <td class="gt-activi4">报名结束时间</td>\
                              <td class="gt-activi5">开班时间</td>\
                              <td class="gt-activi6">操作</td> </tr>\
                              ')
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                })

          // 首页
              $('#gt-QhomePg2').on('click',function(){
                               $.ajax({
                                   url:url+'/ findEnrollList.do',
                                        data:{
                                     
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self. EnrollList_render(res.data);
                                                 
                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                            $('#gt-QnextPg2').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                               url:url+'/ findEnrollList.do',
                                        data:{
                                     
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self. EnrollList_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

                                 
                                 //   搜索 回车 搜索
                 $('#gt-Qinput2').keydown(function(event){
                        
                              if ( event.keyCode==13) {
                                
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                                 url:url+'/ findEnrollList.do',
                                        data:{
                                         enrollName:val,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self. EnrollList_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };             
                 })

                        //    查询

                         $('#gt-Qsearc2').on('click',function(){
                                var val=$('#gt-Qinput2').val();
                               
                                        
                                 $.ajax({
                                   url:url+'/ findEnrollList.do',
                                        data:{
                                              enrollName:val,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   self. EnrollList_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })                
                    
                                         //   时间 搜索
                 $('#gt-QdateIput').change(function(event){
                        
                            
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                                 url:url+'/ findEnrollList.do',
                                        data:{
                                         startDate:val,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self. EnrollList_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
            
                 })

                     /*        操作     */
                     $(document).on('click','.gt-Toper',function(){
                         $('.gt-activiUl').hide();
                           $(this).next().show();
                     })
                          /*    详情 */
                     $('#gt-Qtable3').on('click','.gt-Qlist',function(){
                             $('.gt-enterDeail').show();
                                 $('.gt-trans').show();
                                 self.enrollId=$(this).parent().data('enrollid');
                                 console.log( self.enrollId)
                                       $.ajax({
                                 url:url+'/enrollDetails.do',
                                        data:{
                                         enrollId:self.enrollId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 
                                                  res.data.endDate=(new Date(res.data.endDate).Format("yyyy-MM-dd "));  
                                                   res.data.startDate=(new Date(res.data.startDate).Format("yyyy-MM-dd "));  

                                    // 获取html的模板
                                    var htmlTpl = $('#Qtable4').html();
                                    // 生成html字符串，用于渲染
                                    var htmlStr = _.template(htmlTpl)({list:res.data});
                                
                                    $('#gt-Qtable4').html(htmlStr);
                                    
                                                                              /*    遍历 数据为空情况 */
                                $('#gt-Qtable4 .gt-Clisr').each(function(){
                                    if($(this).text()==''){
                                        $(this).text(0);
                                    } 
                                })

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                              
                     })
                           /*   下架 */
                         $('#gt-Qtable3').on('click','.gt-Qlist2',function(){
                             $('#gt-QupDown').show();
                             $('.gt-trans').show();
                             self.enrollId=$(this).parent().data('enrollid');
                              
                     })
                           /*  确定下架 */
                   $('#gt-QupDown .gt-butSave').on('click',function(){
                       $('#gt-QupDown,.gt-trans').hide();
                                console.log( self.enrollId)
                                       $.ajax({
                                 url:url+'/enrollOut.do',
                                        data:{
                                         enrollId:self.enrollId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 
                                       enrollNweData();

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });                 
                   })
                   
               /*     下架 后 刷新 结果 */
               var enrollNweData=function(){
                    $.ajax({
                                     url:url+'/ findEnrollList.do',
                                        data:{
                                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self. EnrollList_render(res.data);
                                                $('#gt-QheradWor').text(res.data.rowCount);
                                                 var Nber=0;
                                                var data=res.data.subList;
                                                 for(var i=0;i<data.lenght;i++){
                                                     if(data[i].recruitCount==data[i].enrollCount){
                                                        Nber=Nber+1;
                                                     } 
                                                 }
                                        $('#gt-QNberYes').text(Nber);
                                         $('#gt-QNberNot').text($('#gt-QheradWor').text()-Nber);
                                                          
                                             }else{
                                                 $('#gt-Qtable3').html(' <tr>\
                              <td class="gt-activi0">报名活动名称</td>\
                              <td class="gt-activi1">课程名称</td>\
                              <td class="gt-activi2">价格</td>\
                              <td class="gt-activi3">招生人数</td>\
                              <td class="gt-activi4">报名结束时间</td>\
                              <td class="gt-activi5">开班时间</td>\
                              <td class="gt-activi6">操作</td> </tr>\
                              ')
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
               }
                  
              /*    新增报名活动 */
              $('#gt-QAddActivi').on('click',function(){

                $('.gt-choseList').hide(); 
                $('.gt-choseList2').hide(); 
                $('.gt-choseList3').hide(); 
                $('.gt-choseList4').hide(); 
                $('.gt-choseList5').hide(); 
                $('.gt-choseList6').hide(); 
                $('.gt-choseList7').hide(); 
                $('.gt-choseList8').hide(); 
                $('#gt-Qselec2').parent().removeClass('gt-warning');
                $('.gt-enterAdd input').removeClass('gt-warning');

                $('.gt-enterAdd input').val('');

                  $('.gt-enterAdd,.gt-trans').show();
                         $.ajax({
                                 url:url+'/findAllClassOption.do',
                                        data:{
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 var data=res.data;
                                             
                                                  console.log(data)
                                                  var html=" <option value=''>选择课程名称</option>";
                                               for(var i=0;i<data.length;i++){
                                                     
                                                    html+=" <option  data-id="+data[i].id+" value=''>"+data[i].className +"</option>";

                                                }
                                             
                                             $('#gt-Qselec2').html(html); 
                                             console.log(data[0].id)
                                           //  fristRques(data[0].id);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

              })
                       
        
         

           /*    课程级别 */
              $('#gt-Qselec2').change(function(){
                                   $('#gt-QgtrecomA').html(''); 
                                    $('#gt-Qmoney').val('');  
                            
                              var classid= $('#gt-Qselec2 option:selected').data('id');
                              console.log( classid)
                                
                $.ajax({
                                 url:url+'/findClassSons.do',
                                        data:{
                                     classId:classid,


                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                         
                                             if(res.code===100){
                                                var data=res.data;
                                             
                                                  console.log(data)
                                                  var html='';
                                                 
                                               for(var i=0;i<data.length;i++){
                                                     html+=" <div class='gt-recomA'> <span class='gt-recomRun' data-id="+data[i].id +" data-money="+data[i].money +" id=''> <span class='gt-smallRun'></span></span>  <span class='gt-setInput'>"+data[i].levelName +"  </span></div>"
                                                 }
                                               $('#gt-QgtrecomA').html(html);
                                      
                                                     $('#gt-QgtrecomA').on('click','.gt-recomRun',function(){
                                                       $('.gt-recomRun').removeClass('gt-BludClick');
                                                        $('.gt-recomRun').find('span').removeClass('gt-smallRun');
                                                         $(this).addClass('gt-BludClick');
                                                          $(this).find('span').addClass('gt-smallRun');
                                                        var val=$(this).data('money');
                                                            $('#gt-Qmoney').val(val);


                                                     })


                                                }
                                                                 
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                               
                                        }
                                    });
              })

              $('.gt-enterAdd').on('click','#gt-Qselec2,#gt-QenrollName,#gt-Qmoney,#gt-QenrollCount,#gt-QendDate,3gt-QstartDate,#gt-Qdeposit,.gt-recomRun',function(){

                $('.gt-choseList').hide(); 
                $('.gt-choseList2').hide(); 
                $('.gt-choseList3').hide(); 
                $('.gt-choseList4').hide(); 
                $('.gt-choseList5').hide(); 
                $('.gt-choseList6').hide(); 
                $('.gt-choseList7').hide(); 
                $('.gt-choseList8').hide(); 
                $('#gt-Qselec2').parent().removeClass('gt-warning');
                $('.gt-enterAdd input').removeClass('gt-warning');
              })
           

             /* 发布 */
             $('#gt-QputBut').on('click',function(){
                        var  classid= $('#gt-Qselec2 option:selected').data('id');
                        var classSonId=''
                        var enrollName=$('#gt-QenrollName').val();
                        var money=$('#gt-Qmoney').val();
                        var enrollCount=$('#gt-QenrollCount').val();
                        var startDate=$('#gt-QstartDate').val();
                        var endDate=$('#gt-QendDate').val();
                        var deposit=$('#gt-Qdeposit').val();
                        var reg =( /^\s*$/g).test(enrollName);
                       
                        $('#gt-QgtrecomA .gt-recomRun').each(function(){
                              if($(this).hasClass('gt-BludClick')){
                                classSonId=$(this).data('id');
                              }

                        })

                        if( classid===''|| classid===null|| classid===undefined){
                            $('.gt-choseList').show();
                            $('#gt-Qselec2').parent().addClass('gt-warning');
                            return;
                         }else{
                            $('.gt-choseList').hide(); 
                            $('#gt-Qselec2').parent().removeClass('gt-warning');
                         }
                         
                        if(classSonId===''||classSonId===null||classSonId===undefined){
                            $('.gt-choseList2').show();
                            return;
                         }else{
                            $('.gt-choseList2').hide(); 
                         }

                          
                         if(  enrollName===''|| enrollName===null|| enrollName===undefined||reg){
                            $('.gt-choseList3').show();
                            $('#gt-QenrollName').addClass('gt-warning');
                            return;
                         }else{
                            $('.gt-choseList3').hide(); 
                            $('#gt-QenrollName').removeClass('gt-warning');
                         }
                         if(  enrollCount===''|| enrollCount===null|| enrollCount===undefined){
                            $('.gt-choseList4').show();
                            $('#gt-QenrollCount').addClass('gt-warning');
                            return;
                         }else{
                            $('.gt-choseList4').hide(); 
                            $('#gt-QenrollCount').removeClass('gt-warning');
                         }
                         if( endDate==''|| endDate==null|| endDate==undefined){
                            $('.gt-choseList5').show();
                            $('#gt-QendDate').addClass('gt-warning');
                            return;
                         }else{
                            $('.gt-choseList5').hide(); 
                            $('#gt-QendDate').removeClass('gt-warning');
                         }
                         if(  startDate==''|| startDate==null|| startDate==undefined){
                            $('.gt-choseList6').show();
                            $('#gt-QstartDate').removeClass('gt-warning');
                            return;
                         }else{
                            $('.gt-choseList6').hide(); 
                            $('#gt-QstartDate').removeClass('gt-warning');
                         }
                         
                         var  start =  startDate.replace(new RegExp("-","gm"),"/");
                         var  endDat =  endDate.replace(new RegExp("-","gm"),"/");
                        start = (new Date( start)).getTime();
                        endDat = (new Date( endDat)).getTime();
                        console.log(start)
                        console.log(endDat)
                        if( start<= endDat){
                            $('.gt-choseList7').show();
                            $('#gt-QstartDate').addClass('gt-warning');
                            return;

                        }else{
                            $('.gt-choseList7').hide(); 
                            $('#gt-QstartDate').removeClass('gt-warning');
                         }
                         if( deposit===''|| deposit===null||deposit===undefined){
                            $('.gt-choseList8').show();
                            $('#gt-Qdeposit').addClass('gt-warning');
                            return;
                         }else{
                            $('.gt-choseList8').hide(); 
                            $('#gt-Qdeposit').removeClass('gt-warning');
                         }



                        console.log(classSonId);
                        console.log(enrollName);
                        console.log(money);
                        console.log(enrollCount);
                         console.log( startDate);
                        console.log(endDate);

                        console.log(deposit);

                    if(!classSonId==false){
                        $.ajax({
                                 url:url+'/addEnroll.do',
                                        data:{
                                    
                                        classSonId:classSonId,

                                        enrollName: enrollName,
                                         money:money,

                                        enrollCount: enrollCount,

                                        startDate:startDate,

                                        endDate:endDate,

                                        deposit:deposit,

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){    
                                                  $('.gt-enterAdd,.gt-trans').hide();                                           
                                                    enrollNweData();
                                                $('#gt-QenrollName').val('');
                                                $('#gt-Qmoney').val('');
                                                $('#gt-QenrollCount').val('');
                                                $('#gt-QstartDate').val('');
                                               $('#gt-QendDate').val('');
                                                $('#gt-Qdeposit').val('');
                                                  $('#gt-QgtrecomA').html(''); 
                                               
                                                }
                                                                 
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                            $('#gt-QenrollName').val('');
                                                $('#gt-Qmoney').val('');
                                                $('#gt-QenrollCount').val('');
                                                $('#gt-QstartDate').val('');
                                               $('#gt-QendDate').val('');
                                                $('#gt-Qdeposit').val('');
                                                  $('#gt-QgtrecomA').html(''); 
                                        }
                                    });

                    }

                  
             })
            },

           EnrollList_render:function(data){
            
                  var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
                
                 for(var i=0;i<data.subList.length;i++){
                           data.subList[i].startDate=(new Date(data.subList[i].startDate).Format("yyyy-MM-dd "));  
                             data.subList[i].endDate=(new Date(data.subList[i].endDate).Format("yyyy-MM-dd "));                     
                                        
                                 }
        
                // 获取html的模板
                var htmlTpl = $('#Qtable3').html();
                // 生成html字符串，用于渲染

                var htmlStr = _.template(htmlTpl)({list:data.subList});
             
                $('#gt-Qtable3').html(htmlStr);
               $('#gt-Qshow2').text(self.currentPg);
                              $('#gt-QheradWor').text(data.rowCount);
                                              
                                                                            /*    遍历 数据为空情况 */
                              
                                  $('#gt-Qtable3 .gt-activi3 .gt-activiLIst').each(function(){
                                      var valt=$(this).text();
                                      var valt2=$(this).next().text();
                                    if(valt===''){
                                        $(this).text(0);
                                    } 
                                   if(Number(valt)>=Number(valt2)){
                                       $(this).parent().addClass('gt-enroPass');

                                   }else{
                                         $(this).parent().removeClass('gt-enroPass');
                                   }

                                    
                                })




           },

     /*  班级管理 */
     TeamManageList:function(){
                var self=this;
       $('#gt-AdminGT3').on('click',function(){
              $(this).addClass('gt-clikClor');
              $(this).siblings().removeClass('gt-clikClor')
                 $('#gt-ClAdin3').show();
             $('#gt-ClAdin3').siblings().hide();
                $.ajax({
                                 url:url+'/findTeamManageList.do',
                                        data:{
                                    
                                        
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.TeamManage_render(res.data);                     
                                                   
                                                }else{
                                                    $('#gt-Qtable5').html('<tr>\
                             <td class="gt-activi0">班级名称</td>\
                             <td class="gt-activi1">课程名称</td>\
                             <td class="gt-activi2">上课老师</td>\
                             <td class="gt-activi3">默认教室</td>\
                            // <td class="gt-activi4">已上课次</td>\
                             <td class="gt-activi5">开班日期</td>\
                              <td class="gt-activi6">操作</td>\
                              </tr>')
                                                }
                                                                 
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });           
             })
                                                        // 首页
              $('#gt-QhomePg3').on('click',function(){
                               $.ajax({
                                         url:url+'/findTeamManageList.do',
                                        data:{
                                     
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                            self.TeamManage_render(res.data);
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                            $('#gt-QnextPg3').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                               url:url+'/findTeamManageList.do',
                                        data:{
                                     
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.TeamManage_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

                                 
                                 //   搜索 回车 搜索
                 $('#gt-Qinput3').keydown(function(event){
                        
                              if ( event.keyCode==13) {
                                
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                                   url:url+'/findTeamManageList.do',
                                        data:{
                                         teamName :val,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.TeamManage_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };             
                 })

                        //    查询

                         $('#gt-Qsearc3').on('click',function(){
                                var val=$('#gt-Qinput3').val();
                               
                                        
                                 $.ajax({
                                      url:url+'/findTeamManageList.do',
                                        data:{
                                               teamName:val,   
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.TeamManage_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })         
                                
                          
                                         //  开始  时间 搜索
                 $('#gt-QstartDat').change(function(event){
                        
                            
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                                    url:url+'/findTeamManageList.do',
                                        data:{
                                         startDate:val,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                     self.TeamManage_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                 })
                                                        //  结束  时间 搜索
                                  $('#gt-QendDat').change(function(event){
                        
                            
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                                    url:url+'/findTeamManageList.do',
                                        data:{
                                         endDate:val,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.TeamManage_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                      })

                        /*  状态 查询 */
                          $('#gt-QsearSlec').change(function(){
                                       console.log('abcde')
                            

                              var status= $('#gt-QsearSlec option:selected').data('status');
                                    console.log(status)
                                $.ajax({
                                    url:url+'/findTeamManageList.do',
                                        data:{
                                        status:status,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                      self.TeamManage_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                                 })

                                           /* 新增  班级 */
                                           $('#gt-QnewAddButn').on('click',function(){
                                                     
                                            $('.gt-classNum-input').val(' ');
                                            $('#gt-QclassLetion2').text('');
                                            $('#gt-dateList2').text(' ');
                                              
                                         /*    清除警告 样式 */
                                         $('.gt-woringList').hide(); 
                                         $('#gt-QlistintVal').removeClass('gt-warning');
                                         $('.gt-woringList2').hide(); 
                                         $('#gt-QlistLL1').parent().removeClass('gt-warning');
                                         $('.gt-woringList3').hide(); 
                                         $('#gt-QlistLL2').parent().removeClass('gt-warning');
                                         $('.gt-woringList4').hide(); 
                                         $('#gt-QlistintVal2').removeClass('gt-warning');
                                         $('.gt-woringList5').hide(); 
                                         $('#gt-QlistLL3').parent().removeClass('gt-warning');
                                            

                                         $('#gt-QnewAddtem,.gt-trans').show();
                                                    Listrevisions(); 
                                                    QlistrqueTeacher();
                                                    QlistrqueClass();
 

                                           })

                                           
                                /*  请求 报名活动  */
                           var  Listrevisions=function(){
                
                                       
                                $.ajax({
                                  
                                        url:url+'/selectAllEnrollList.do',
                                        data:{
                                   
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){  
                                             if(res.code===100){   
                                                 console.log(res)                               
                                           var data=res.data;
                                           var html='';
                                            for(var i=0;i<data.length;i++){
                                                      html+= "<option class='gt-lists' data-id="+data[i].id +" value=''>"+data[i].enrollName +"</option>"
                                                    
                                                  }

                                                     $('#gt-QlistLL1').html( "<option class='gt-lists' value=''>请选择报名活动</option>"+html);
                                              }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                           }


                            /*    请求所有教师 */
                            var  QlistrqueTeacher=function(){
                               $.ajax({
                                    url:url+'/findAllTeacher.do',
                                        data:{
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             
                                               var data=res.data
                                                 var html='';
                                                  for(var i=0;i<data.length;i++){
                                                      html+= "<option class='gt-lists' data-id="+data[i].id +" value=''>"+data[i].name +"</option>"
                                                    
                                                  }
                                                 $('#gt-QlistLL2').html("<option class='gt-lists' value=''>请选择教师</option>"+html);
                                                

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            };

                             /*    请求所有教室 */
                            var  QlistrqueClass=function(){
                               $.ajax({
                                    url:url+'/findAllClassroom.do',
                                        data:{
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             
                                               var data=res.data
                                                 var html='';
                                                 for(var i=0;i<data.length;i++){
                                                      html+= "<option class='gt-lists'  data-schoolid="+data[i].id +"  value=''>"+data[i].classroomName +"</option>"
                                                    
                                                  }
                                                 $('#gt-QlistLL3').html("<option class='gt-lists' value=''>请选择默认教室</option>"+html);

                                                   
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            };

                            $('#gt-QnewAddtem').on('click','#gt-QlistintVal,#gt-QlistLL1,#gt-QlistLL2,#gt-QlistLL3,#gt-QlistintVal2',function(){

                                $('.gt-woringList').hide(); 
                                $('#gt-QlistintVal').removeClass('gt-warning');
                                $('.gt-woringList2').hide(); 
                                $('#gt-QlistLL1').parent().removeClass('gt-warning');
                                $('.gt-woringList3').hide(); 
                                $('#gt-QlistLL2').parent().removeClass('gt-warning');
                                $('.gt-woringList4').hide(); 
                                $('#gt-QlistintVal2').removeClass('gt-warning');
                                $('.gt-woringList5').hide(); 
                                $('#gt-QlistLL3').parent().removeClass('gt-warning');
                                
                            })
                                  
                  
                                        /*     保存   */
                                         $('#gt-QbutnSave1').on('click',function(){
                          
                                              var  teamName=$('#gt-QlistintVal').val();
                                              var  count=$('#gt-QlistintVal2').val();
                                              var enrollId = $('#gt-QlistLL1 option:selected').data('id');
                                             var employeesId= $('#gt-QlistLL2 option:selected').data('id');
                                              var classroomId= $('#gt-QlistLL3 option:selected').data('schoolid');
                                               var  automatic=$(' .gt-ClassDeail .gt-square ').data('automatic');
                                               var reg =( /^\s*$/g).test(teamName);
                                              if( teamName===' '|| teamName===null|| teamName===undefined||reg ){
                                                      $('.gt-woringList').show();
                                                      $('#gt-QlistintVal').addClass('gt-warning')
                                                  return;
                                              }else{
                                                $('.gt-woringList').hide(); 
                                               $('#gt-QlistintVal').removeClass('gt-warning');
                                             }


                                              if( enrollId===''|| enrollId===null|| enrollId===undefined){
                                                $('.gt-woringList2').show();
                                                $('#gt-QlistLL1').parent().addClass('gt-warning');
                                                 return;
                                             }else{
                                                $('.gt-woringList2').hide(); 
                                                $('#gt-QlistLL1').parent().removeClass('gt-warning');
                                             }

                                             if( employeesId===''||employeesId===null|| employeesId===undefined){
                                                $('.gt-woringList3').show();
                                                $('#gt-QlistLL2').parent().addClass('gt-warning')
                                                 return;
                                             }else{
                                                $('.gt-woringList3').hide(); 
                                               $('#gt-QlistLL2').parent().removeClass('gt-warning');
                                             }
                                             if(  count===''|| count===null|| count===undefined){
                                                $('.gt-woringList4').show();
                                                $('#gt-QlistintVal2').addClass('gt-warning')
                                            return;
                                        }else{
                                            $('.gt-woringList4').hide(); 
                                            $('#gt-QlistintVal2').removeClass('gt-warning');
                                         }
                                         if( classroomId===''||classroomId===null|| classroomId===undefined){
                                            $('.gt-woringList5').show();
                                            $('#gt-QlistLL3').parent().removeClass('gt-warning');
                                             return;
                                         }else{
                                            $('.gt-woringList5').hide(); 
                                            $('#gt-QlistLL3').parent().removeClass('gt-warning');
                                         }
                                         

                                             

                                              console.log(teamName);
                                              console.log(count);
                                              console.log(enrollId);
                                              console.log(employeesId);
                                              console.log(classroomId);
                                              console.log( automatic);
                                              

                                               $.ajax({
                                    url:url+'/saveTeam.do',
                                        data:{
                                    
                                               teamName:teamName,
                                                   count:count,
                                                   enrollId:enrollId,
                                                   employeesId:employeesId,
                                                   classroomId:classroomId,
                                                   automatic: automatic,
                                                   recruitCount:'0',

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  $('#gt-QnewAddtem,.gt-trans').hide();
                                                    newDataHasRq();
                                                    

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                         })

                                    /*     数据刷新    */

                                    var   newDataHasRq=function(){

                                         $.ajax({
                                 url:url+'/findTeamManageList.do',
                                        data:{
                                    
                                        
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.TeamManage_render(res.data);                     
                                                   
                                                }else{
                                                    $('#gt-Qtable5').html('<tr>\
                                                <td class="gt-activi0">班级名称</td>\
                                                <td class="gt-activi1">课程名称</td>\
                                                <td class="gt-activi2">上课老师</td>\
                                                <td class="gt-activi3">默认教室</td>\
                                                <td class="gt-activi5">开班日期</td>\
                                                <td class="gt-activi6">操作</td>\
                                                </tr>')
                                                }
                                                                 
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });           
                                    }

                                  /*   联动数据请求 */
                           $('.gt-ClassDeail').on('change','#gt-QlistLL1',function(e){
                                      
                            
                              var id= $('#gt-QlistLL1 option:selected').data('id');
                              console.log(id)
                                   
                                $.ajax({
                                    url:url+'/selectClassNameAndDate.do',
                                        data:{
                                        id:id,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                    var data=res.data
                                                     data.startDate=(new Date(data.startDate).Format("yyyy-MM-dd "));  
                                                  $('#gt-dateList2').text(data.startDate);
                                                  $('#gt-QclassLetion2').text(data.className +" ("+ data.levenName+")");

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                                 })



                               /*  操作 */
                               $(document).on('click','gt-Toper',function(){
                                   $('.gt-butClassUl').hide();
                                   $(this).next().show();

                               })

                             /*   详情 */
                             $('#gt-Qtable5').on('click','.gt-Qblist',function(){
                                 $('.gt-classSheet').show();
                                   $('.gt-trans').show();
                                        self.teamId=$(this).parent().data('id');
                                     
                                $.ajax({
                                    url:url+'/selectTeamDetails.do',
                                        data:{
                                      teamId:self.teamId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 // 获取html的模板
                                        res.data.startDate=(new Date(res.data.startDate).Format("yyyy-MM-dd "));  
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



                             })
                                   /*   修改 */

                             $('#gt-Qtable5').on('click','.gt-Qblist2',function(){
                                 $('.gt-ClassDeail').show();
                                   $('.gt-trans').show();
                                        self.teamId=$(this).parent().data('id');
                                       $.ajax({
                                  url:url+'/selectTeamDetails.do',
                                        data:{
                                      teamId:self.teamId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                            
                                             var htmlTpl = $('#Qtable8').html();
                                             res.data.startDate= (new Date(res.data.startDate)).Format("yyyy-MM-dd hh:mm:ss")
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data});
                                            $('#gt-Qtable8').html(htmlStr);
                                           
                                                    revisions();
                                                     rqueTeacher();
                                                     rqueClass();
                                             
                                                     
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                             })

                            

                                /*  请求 报名活动  */
                           var  revisions=function(){
                
                                       
                                $.ajax({
                                  
                                        url:url+'/selectAllEnrollList.do',
                                        data:{
                                   
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){  
                                                             if(res.code===100){                       
                                           var data=res.data;
                                           var html='';
                                            for(var i=0;i<data.length;i++){
                                                      html+= "<option class='gt-lists' data-id="+data[i].id +" value=''>"+data[i].enrollName +"</option>"
                                                    
                                                  }

                                                     $('#gt-QlistSlec').html(html);

                                                     
                                                $('#gt-QlistSlec .gt-lists').each(function(){
                                                   
                                                       var faterDate= $(this).parent().data('enrollid');
                                                       var employeesid= $(this).data('id');
                                                 
                                              if(faterDate==employeesid){
                                                 $(this).attr('selected',true);
                                              }

                                                })
                                             }

                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                           }
                              /*    请求所有教师 */
                            var  rqueTeacher=function(){
                               $.ajax({
                                    url:url+'/findAllTeacher.do',
                                        data:{
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             
                                               var data=res.data
                                                 var html='';
                                                  for(var i=0;i<data.length;i++){
                                                      html+= "<option class='gt-lists' data-id="+data[i].id +" value=''>"+data[i].name +"</option>"
                                                    
                                                  }
                                                 $('#gt-QlistSlec2').html(html);
                                                
                                              
                                                $('#gt-QlistSlec2 .gt-lists').each(function(){
                                                   
                                                       var faterDate= $(this).parent().data('employeesid');
                                              var employeesid= $(this).data('id');
                                                 console.log(faterDate)
                                                    console.log(employeesid)
                                              if(faterDate==employeesid){
                                                 $(this).attr('selected',true);
                                              }

                                                })

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            };

                            /*    请求所有教室 */
                            var  rqueClass=function(){
                               $.ajax({
                                    url:url+'/findAllClassroom.do',
                                        data:{
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             
                                               var data=res.data
                                                 var html='';
                                                 for(var i=0;i<data.length;i++){
                                                      html+= "<option class='gt-lists'  data-schoolid="+data[i].id +"  value=''>"+data[i].classroomName +"</option>"
                                                    
                                                  }
                                                 $('#gt-QlistSlec3').html(html);

                                                   
                                                $('#gt-QlistSlec3 .gt-lists').each(function(){
                                                  
                                            var faterDate= $(this).parent().data('classroomid');
                                              var schoolId= $(this).data('schoolid');
                                                 
                                              if(faterDate===schoolId){
                                                 $(this).attr('selected',true);
                                              }

                                                })

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            };

                         /*  是否自动分配 */
                         $('.gt-ClassDeail').on('click','.gt-square',function(){
                              
                               if($(this).hasClass('gt-squareImg')){
                               $('.gt-square').removeClass('gt-squareImg');
                               $('.gt-square').find('span').removeClass('gt-squareImgHook')
                               $(this).attr('data-automatic',1);
                              
                               }else{
                              $('.gt-square').removeClass('gt-squareImg');
                              $('.gt-square').find('span').removeClass('gt-squareImgHook')
                               $(this).addClass('gt-squareImg');
                               $(this).find('span').addClass('gt-squareImgHook');
                                 $(this).attr('data-automatic',0);
                               }

                         })

                       /*   联动数据请求 */
                           $('.gt-ClassDeail').on('change','#gt-QlistSlec',function(e){
                                      
                            
                              var id= $('#gt-QlistSlec option:selected').data('id');
                              console.log(id)
                                   
                                $.ajax({
                                    url:url+'/selectClassNameAndDate.do',
                                        data:{
                                        id:id,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                    var data=res.data


                                                       data.startDate=(new Date(data.startDate).Format("yyyy-MM-dd "));
                                                  $('#gt-dateList').text(data.startDate);
                                                  $('#gt-QclassLetion').text(data.className +" ("+ data.levenName+")");

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                                 })

                                 /*   保存 */
                                 $('#gt-QbutnSave').on('click',function(){
                                                 
                                            var teamName=$('#gt-QclassName').val();
                                            var enrollId=$('#gt-QlistSlec option:selected').data('id');
                                            var employeesId=$('#gt-QlistSlec2 option:selected').data('id');;
                                            var count=$('#gt-Qcount').val();
                                            var  classroomId=$('#gt-QlistSlec3 option:selected').data('schoolid');
                                            var  automatic= $('.gt-ClassDeail .gt-square').data('automatic');
                                                   console.log(teamName)
                                                   console.log(enrollId)
                                                   console.log(employeesId)
                                                    console.log(count)
                                                    console.log(classroomId)
                                                    console.log(automatic)

                                                 $.ajax({
                                    url:url+'/saveTeam.do',
                                        data:{
                                                id:self.teamId,                       
                                                teamName: teamName,
                                                enrollId: enrollId,
                                                employeesId:employeesId,
                                                count:count,
                                                classroomId: classroomId,
                                                automatic:'1',

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   $('.gt-ClassDeail').hide();
                                                 $('.gt-trans').hide();
                                                 newDAtaClass();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                                     })




                                 /*    保存刷新 */

                                 var newDAtaClass=function(){

                                     $.ajax({
                                 url:url+'/findTeamManageList.do',
                                        data:{
                                    
                                        
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.TeamManage_render(res.data);                     
                                                   
                                                }else{
                                                    $('#gt-Qtable5').html('<tr>\
                             <td class="gt-activi0">班级名称</td>\
                             <td class="gt-activi1">课程名称</td>\
                             <td class="gt-activi2">上课老师</td>\
                             <td class="gt-activi3">默认教室</td>\
                            // <td class="gt-activi4">已上课次</td>\
                             <td class="gt-activi5">开班日期</td>\
                              <td class="gt-activi6">操作</td>\
                              </tr>')
                                                }
                                                                 
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });    
                                 };
                                

                                   /*   班级学员 */
                             $('#gt-Qtable5').on('click','.gt-Qblist3',function(){
                                 $('#gt-QAddSdutend').show();
                                   $('.gt-trans').show();
                                     self.teamId=$(this).parent().data('id');
                                        console.log( self.teamId)
                                    $.ajax({
                                    url:url+'/selectStudentByTeamId.do',
                                        data:{
                                         teamId:self.teamId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              LIstNwedata(res.data);

                                             }else{
                                                  $('#gt-Qtable7').html('\
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
                                            $('#gt-Qtable7').html(htmlStr);
                                             $('#gt-DQshow4').text(self.currentPg);
                                        
                                          $('#gt-Qtable7 .gtQlist').each(function(){
                                              var sex= $(this).data('sex');
                                              if(sex===0){
                                                    $(this).text('男')
                                              }else{
                                                  $(this).text('女')
                                              }
                                          })
                             }
                                                                              // 首页
                  $('#gt-Qhome4').on('click',function(){
                               $.ajax({
                                     url:url+'/selectStudentByTeamId.do',
                                        data:{
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
                          
                            $('#gt-Qnext4').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                             url:url+'/selectStudentByTeamId.do',
                                        data:{
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


                                   /*   打印花名册 */
                             $('#gt-Qtable5').on('click','.gt-Qblist4',function(){
                                //  $('.gt-classSheet').show();
                                //    $('.gt-trans').show();
                             })
                                   /*   排课 */
                             $('#gt-Qtable5').on('click','.gt-Qblist5',function(){
                                 $('#gt-QCourse').show();
                                   $('.gt-trans').show();
                                   
                                       self.teamId=$(this).parent().data('id');
                                       console.log( self.teamId)
                                         $.ajax({
                                    url:url+'/findRowClassByTeamId.do',
                                        data:{
                                        teamId: self.teamId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){

                                                for(var i=0;i<res.data.subList.length;i++){
                 res.data.subList[i].comerTime= ((res.data.subList[i].endDate)-(res.data.subList[i].startDate))/60000;
                res.data.subList[i].startDate=(new Date(res.data.subList[i].startDate).Format("yyyy-MM-dd  hh:mm:ss ")); 
                  res.data.subList[i].endDate=(new Date(res.data.subList[i].endDate).Format("yyyy-MM-dd   hh:mm:ss "));                    
                    }
                                                 self.currentPg=res.data.curPage;
                                            //总页数
                                            self.pageCount=res.data.pageCount;
                                                 // 获取html的模板
                                            var htmlTpl = $('#Qtable9').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data.subList});
                                            $('#gt-Qtable9').html(htmlStr);
                                             $('#gt-Qshow5').text(self.currentPg);
                                          
                                             }else{
                                                  $('#gt-Qtable9').html('')

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                             })

                                    // 首页
              $('#gt-QCourse').on('click','#gt-Qhome5',function(){
                               $.ajax({
                                    url:url+'/findRowClassByTeamId.do',
                                        data:{
                                        teamId: self.teamId,
                                      curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 // 获取html的模板
                                                 for(var i=0;i<res.data.subList.length;i++){
                             res.data.subList[i].comerTime= ((res.data.subList[i].endDate)-(res.data.subList[i].startDate))/60000;
                     res.data.subList[i].startDate=(new Date(res.data.subList[i].startDate).Format("yyyy-MM-dd  hh:mm:ss ")); 
                      res.data.subList[i].endDate=(new Date(res.data.subList[i].endDate).Format(" yyyy-MM-dd   hh:mm:ss "));                    
                                      }
                                                        self.currentPg=res.data.curPage;
                                            //总页数
                                            self.pageCount=res.data.pageCount;
                                            var htmlTpl = $('#Qtable9').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data.subList});
                                            $('#gt-Qtable9').html(htmlStr);
                                             $('#gt-Qshow5').text(self.currentPg);
                                          
                                                 
                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                          $('#gt-QCourse').on('click','#gt-Qnext5',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                url:url+'/findRowClassByTeamId.do',
                                        data:{
                                        teamId: self.teamId,
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   // 获取html的模板
                                                 for(var i=0;i<res.data.subList.length;i++){
                             res.data.subList[i].comerTime= ((res.data.subList[i].endDate)-(res.data.subList[i].startDate))/60000;
                     res.data.subList[i].startDate=(new Date(res.data.subList[i].startDate).Format("yyyy-MM-dd  hh:mm:ss ")); 
                      res.data.subList[i].endDate=(new Date(res.data.subList[i].endDate).Format(" yyyy-MM-dd   hh:mm:ss "));                    
                                      }
                                                        self.currentPg=res.data.curPage;
                                            //总页数
                                            self.pageCount=res.data.pageCount;
                                            var htmlTpl = $('#Qtable9').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data.subList});
                                            $('#gt-Qtable9').html(htmlStr);
                                             $('#gt-Qshow5').text(self.currentPg);
                                          
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })






                                    /*   新增排课 */
                                    $('#gt-QCourse').on('click','#gt-QCourseBut',function(){
                                        $('.gt-AllClassAd').show();
                                        $('#gt-QnewAddClas').show();
                                             $.ajax({
                                    url:url+'/findAllClassroom.do',
                                        data:{
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             
                                               var data=res.data
                                                 var html='';
                                                 for(var i=0;i<data.length;i++){
                                                      html+= "<option class='gt-lists'  data-classid="+data[i].id +"  value=''>"+data[i].classroomName +"</option>"
                                                    
                                                  }
                                                 $('#gt-QlistSlec4').html(html);

                                                   
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                                    })

                                   /*  判断时间先后 */



                                    /* 确定排课 */
                                    $('#gt-QbutSave').on('click',function(){
                                        
                                         var startDate=$('#gt-QstarDate1').val();
                                         var  endDate=$('#gt-endDate').val();
                                         var classroomId=$('#gt-QlistSlec4 option:selected').data('classid');
                                        var  start =  startDate .replace(new RegExp("-","gm"),"/");
                                        var  endDat =  endDate.replace(new RegExp("-","gm"),"/");
                                       start = (new Date( start)).getTime();
                                       endDat = (new Date( endDat)).getTime();
                                          
                                         if( start>endDat){
                                            $('.gt-waring').show();
                                          return;
                                         }else{
                                            $('.gt-waring').hide();
                                            $.ajax({
                                                url:url+'/addRowClass.do',
                                                 data:{
                                              
                                                         teamId: self.teamId,
         
                                                         startDate:startDate,
         
                                                         endDate:endDate,
         
                                                         classroomId:classroomId,
                                    
                                                 },
                                                 type:'post',
                                                 dataType:'json',
                                                 success: function(res){                                       
                                                   console.log(res)
                                                      if(res.code===100){ 
                                                           delNewdata();
                                                           $('.gt-AllClassAd').hide();
                                                           $('#gt-QnewAddClas').hide();
                                                          
                                                      }
                                                 },
                                                 error: function(){
                                                     console.log('网络出错');
                                                 }
                                             });
         

                                         }

                                        console.log( start);
                                        console.log( endDat);
                                        
                                   
                                    })

                                 /*    删除 */
                                 $('#gt-Qtable9').on('click','.gt-addClor',function(){
                                       var  rowClassId=$(this).data('id');
                                       console.log( rowClassId)
                                       console.log(self.teamId)
                                      $.ajax({
                                url:url+'/deleteRowClass.do',
                                        data:{
                                             //  teamId: self.teamId,
                                               rowClassId: rowClassId,
                           
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 
                                              delNewdata();

                                             }else{
                                                 $('#gt-Qtable9').html('\
                                                 <tr >\
                                      <td class="gt-Addli0">开始时间</td>\
                                    <td class="gt-Addli1 ">结束时间 </td>\
                                     <td class="gt-Addli2">课程时长(分钟)</td>\
                                   <td class="gt-Addli3">上课教室</td>\
                          <td class="gt-Addli4">操作</td></tr>\
                                                 '
                                                );
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                                 })

                                /* 删除后刷新 */

                                var delNewdata=function(){
                                    console.log(self.teamId)
                                     $.ajax({
                                    url:url+'/findRowClassByTeamId.do',
                                        data:{
                                        teamId: self.teamId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                
                                                 // 获取html的模板
                                                 for(var i=0;i<res.data.subList.length;i++){
                             res.data.subList[i].comerTime= ((res.data.subList[i].endDate)-(res.data.subList[i].startDate))/60000;
                     res.data.subList[i].startDate=(new Date(res.data.subList[i].startDate).Format("yyyy-MM-dd  hh:mm:ss ")); 
                      res.data.subList[i].endDate=(new Date(res.data.subList[i].endDate).Format(" yyyy-MM-dd   hh:mm:ss "));                    
                                      }
                                                        self.currentPg=res.data.curPage;
                                            //总页数
                                            self.pageCount=res.data.pageCount;
                                            var htmlTpl = $('#Qtable9').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data.subList});
                                            $('#gt-Qtable9').html(htmlStr);
                                             $('#gt-Qshow5').text(self.currentPg);
                                          
                                             }else{
                                                  $('#gt-Qtable9').html('\
                                                 <tr >\
                                      <td class="gt-Addli0">开始时间</td>\
                                    <td class="gt-Addli1 ">结束时间 </td>\
                                     <td class="gt-Addli2">课程时长(分钟)</td>\
                                   <td class="gt-Addli3">上课教室</td>\
                          <td class="gt-Addli4">操作</td></tr>\
                                                 '
                                                );

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                }
                                  /*   取消 */
                                  $('#gt-QnewAddClas').on('click','.gt-popRt,#gt-Qnotbut',function(){
                                       $('.gt-AllClassAd').hide();
                                        $('#gt-QnewAddClas').hide();
                                         
                                  })
                                
                                /*   结业 */
                             $('#gt-Qtable5').on('click','.gt-Qblist6',function(){
                                 $('#gt-Qpopu').show();
                                   $('.gt-trans').show();
                                      self.teamId=$(this).parent().data('id');
                                    console.log(self.teamId)

                             })
                           /*  确定结业 */
                             $('#gt-QbutSavers').on('click',function(){

                                       console.log(self.teamId)
                                       $.ajax({
                                url:url+'/updateTeamStatus.do',
                                        data:{
                                          id:self.teamId,
                                          status:'1',
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   $('#gt-Qpopu').hide();
                                                        $('.gt-trans').hide();
                                               newDAtaClass();

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                             })


                                /*   分班 */
                             $('#gt-Qtable5').on('click','.gt-Qblist7',function(){
                                 $('#gt-Qdelclass').show();
                                   $('.gt-trans').show();
                                    self.enrollid=$(this).parent().data('enrollid');
                                    self.teamId=$(this).data('id');
                                          $.ajax({
                                 url:url+'/selectStudentByTeamId.do',
                                        data:{
                                     teamId: self.teamId,
                                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                          
                                                    Q_delclass(res.data);

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                               })
                               

                           var Q_delclass=function(data){
                                                                
                                            var self=this;
                                                //  当前页
                                            self.currentPg=data.curPage;
                                            //总页数
                                            self.pageCount=data.pageCount;
                                        
                                            for(var i=0;i<data.subList.length;i++){
                                        data.subList[i].updateDate=(new Date(data.subList[i].updateDate).Format(" yyyy-MM-dd "));   

                                            }        
                                    
                                            // 获取html的模板
                                            var htmlTpl = $('#Qtable11').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:data.subList}); 
                                            $('#gt-Qtable11').html(htmlStr);
                                            $('#gt-QshowPg5').text(self.currentPg);

                                             $('#gt-Qtable11 .gt-Qsex').each(function(){
                                              var sex= $(this).data('sex');
                                              if(sex===0){
                                                    $(this).text('男')
                                              }else{
                                                  $(this).text('女')
                                              }
                                          })
                           }

                                    // 首页
              $('#gt-QhomePg5').on('click',function(){
                               $.ajax({
                                         url:url+'/selectStudentByTeamId.do',
                                        data:{
                                      teamId: self.teamId,
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              Q_delclass(res.data);
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                            $('#gt-QnextPg5').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                url:url+'/selectStudentByTeamId.do',
                                        data:{
                                      teamId: self.teamId,
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   Q_delclass(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })



                               /*  添加学员 */
                               $('#gt-QAddsd').on('click',function(){
                                    $('.gt-AllClassAd').show();
                                    $('#gt-QAddstudents').show();
                                    console.log(self.enrollid)
                                        $.ajax({
                                url:url+'/selectTeamStudentList.do',
                                        data:{                          
                                        enrollId:self.enrollid,
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){                                         
                                                 gt_addStudens(res.data);
                                             }else{
                                                 $('#gt-Qtable12').html('<tr >\
                          <td class="gt-Sdli0">学号</td>\
                          <td class="gt-Sdli1 ">学员姓名 </td>\
                          <td class="gt-Sdli2">性别</td>\
                          <!-- <td class="gt-Sdli3">入学日期</td> -->\
                           <td class="gt-Sdli3">操作</td>  </tr>\
                           ')
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                               })


                         /*    进入班级    */

                         $('#gt-Qtable12').on('click', '.gt-butr',function(){
                                    var studentId=$(this).data('id');
                                    console.log(studentId);
                                    console.log(self.teamId)
                                   $.ajax({
                                url:url+'/addStudentTeam.do',
                                        data:{                          
                                        teamId: self.teamId,
                                      studentId:studentId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){                                         
                                                 
                                               Gnewdata_new();
                                                 $('.gt-AllClassAd').hide();
                                                 $('#gt-QAddstudents').hide();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                         })

                        /*  刷新数据  进入班级成功后 */

                        var Gnewdata_new=function(){

                             $.ajax({
                                 url:url+'/selectStudentByTeamId.do',
                                        data:{
                                     
                                        teamId: self.teamId,      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                          
                                                    Q_delclass(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                        };

                               /* 取消 */
                               $('.gt-pRt').on('click',function(){
                                     $('.gt-AllClassAd').hide();
                                    $('#gt-QAddstudents').hide();
                               })

                     var gt_addStudens=function(data){
                                                              
                                            var self=this;
                                                //  当前页
                                            self.currentPg=data.curPage;
                                            //总页数
                                            self.pageCount=data.pageCount;
                                        
                                        //     for(var i=0;i<data.subList.length;i++){
                                        //   data.subList[i].startDate=(new Date(data.subList[i].startDate).Format(" yyyy-MM-dd "));                     
                                        //     }        
                                    
                                            // 获取html的模板
                                            var htmlTpl = $('#Qtable12').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:data.subList}); 
                                            $('#gt-Qtable12').html(htmlStr);
                                            $('#gt-LishowPg1').text(self.currentPg);
                                             $('#gt-Qtable12 .gt-Qsex').each(function(){
                                              var sex= Number($(this).data('sex'));
                                              if(sex===0){
                                                    $(this).text('男')
                                              }else{
                                                  $(this).text('女')
                                              }
                                          })

                     }

                                                      // 首页
              $('#gt-LihomePg1').on('click',function(){
                               $.ajax({
                                      url:url+'/selectTeamStudentList.do',
                                        data:{
                                      enrollId:self.enrollid,
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                           
                                              gt_addStudens(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                            $('#gt-LinexyPg1').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                url:url+'/selectTeamStudentList.do',
                                        data:{
                                      enrollId:self.enrollid,
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               gt_addStudens(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            });


     },
          TeamManage_render:function(data){
            
                  var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
              
                 for(var i=0;i<data.subList.length;i++){
             data.subList[i].startDate=(new Date(data.subList[i].startDate).Format(" yyyy-MM-dd "));                     
                  }
               
        
                // 获取html的模板
                var htmlTpl = $('#Qtable5').html();
                // 生成html字符串，用于渲染
               
                var htmlStr = _.template(htmlTpl)({list:data.subList});
             
                $('#gt-Qtable5').html(htmlStr);
               $('#gt-Qshow3').text(self.currentPg);
               $('#gt-Qtatlo1').text(data.rowCount);
       
                                           /* 遍历 数据为空情况 */
                                $('#gt-Qtable5 .gt-Qlist').each(function(){
                                    var val=$(this).data('status');
                                  
                                    if(val===1){
                                       $(this).text('结业');
                                      
                                    }else{
                                        
                                          $(this).text('在读');
                                    }
                                })
                             

                              

           },
        /*    考试管理 */
         Examination:function(){
               var  self=this;
           $('#gt-AdminGT4').on('click',function(){
              $(this).addClass('gt-clikClor');
              $(this).siblings().removeClass('gt-clikClor')
                 $('#gt-ClAdin4').show();
                 $('#gt-ClAdin4').siblings().hide();
                 $.ajax({
                                    url:url+'/selectExamList.do',
                                        data:{
                                
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.Examination_render(res.data);
                                              
                                          
                                             }else{
                                                 $('#gt-Qtable10').html('<tr >\
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
          })

               
                                 //   搜索 回车 搜索
                 $('#gt-Gsecher').keydown(function(event){
                        
                              if ( event.keyCode==13) {
                                
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                                     url:url+'/selectExamList.do',
                                        data:{
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

                         $('#gt-Gswrtsearc1').on('click',function(){
                                var val=$('#gt-Gsecher').val();
                               
                                        
                                 $.ajax({
                                      url:url+'/selectExamList.do',
                                        data:{
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
                    

                         
                                                      // 首页
              $('#gt-QhomePg4').on('click',function(){
                               $.ajax({
                                        url:url+'/selectExamList.do',
                                        data:{
                                    
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
                          
                            $('#gt-QnextPg4').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                   url:url+'/selectExamList.do',
                                        data:{
                                    
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



           /*  新增考试 */
          $('#gt-QsulyAdd').on('click',function(){
            $('#gt-addClassEm').removeClass('gt-warning');
            $('#gt-addClassEm2').removeClass('gt-warning');
            $('#gt-addClassEm3').removeClass('gt-warning');
            $('#gt-QclassId').parent().removeClass('gt-warning');
            $('.gt-QnewExam1').hide();
            $('.gt-QnewExam2').hide();
            $('.gt-QnewExam3').hide();
            $('.gt-QnewExam4').hide();

              $('#gt-QNewExam,.gt-trans').show();
               
                       $('#gt-addClassEm,#gt-addClassEm2,#gt-addClassEm3').val('');



           /*    所有班级 */
                 $.ajax({
                                       url:url+'/findTeamOption.do',
                                        data:{
                                     
                                                                    
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
                                               $('#gt-QclassId').html(" <option value=''  >请选择参与班级</option> "    +html);
                                                 
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

             
          })

              $('#gt-QNewExam').on('click','#gt-addClassEm,#gt-addClassEm2,#gt-addClassEm3,#gt-QclassId',function(){

                $('#gt-addClassEm').removeClass('gt-warning');
                $('#gt-addClassEm2').removeClass('gt-warning');
                $('#gt-addClassEm3').removeClass('gt-warning');
                $('#gt-QclassId').parent().removeClass('gt-warning');
                $('.gt-QnewExam1').hide();
                $('.gt-QnewExam2').hide();
                $('.gt-QnewExam3').hide();
                $('.gt-QnewExam4').hide();

              })

         /*  确定新增 考试 */
          $('#gt-QaddExam').on('click',function(){

                       var examName=$('#gt-addClassEm').val();
                        var  startDate=$('#gt-addClassEm2').val();
                         var endDate=$('#gt-addClassEm3').val();
                   var  teamId= $('#gt-QclassId option:selected').data('id');  
                   var reg =( /^\s*$/g).test(examName); 
                                 /*           名字     */
                    if( examName===''|| examName===null|| examName===undefined||reg ){
                    
                        $('#gt-addClassEm').addClass('gt-warning');
                        $('.gt-QnewExam1').show();
                        return;
                    }else{
                        $('.gt-QnewExam1').hide();
                        $('#gt-addClassEm').removeClass('gt-warning');
                    }
                           /*   开始时间   */
                 if(   startDate==''||startDate===null||startDate===undefined){
                    
                    $('#gt-addClassEm2').addClass('gt-warning');
                    $('.gt-QnewExam2').show();
                         return;
                     }else{
                        $('.gt-QnewExam2').hide();
                        $('#gt-addClassEm2').removeClass('gt-warning');
                     }

                                /*    结束时间   */
                     if(  endDate==''||  endDate===null||  endDate===undefined){
                        
                        $('#gt-addClassEm3').addClass('gt-warning');
                        $('.gt-QnewExam3').show();
                             return;
                         }else{
                            $('.gt-QnewExam3').hide();
                            $('#gt-addClassEm3').removeClass('gt-warning');
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
                            $('#gt-addClassEm2').addClass('gt-warning');
                            $('#gt-addClassEm3').addClass('gt-warning');
                            
                            return;

                        }else{
                            $('.gt-QnewExam2').text('*请选择考试开始时间');
                            $('.gt-QnewExam3').text('*请选择考试结束时间');
                            $('#gt-addClassEm2').removeClass('gt-warning');
                            $('#gt-addClassEm3').removeClass('gt-warning');
                            $('.gt-QnewExam2').hide();
                            $('.gt-QnewExam3').hide();
                         }


                               /*         班级    */
                         if(  teamId===''||  teamId===null||teamId===undefined){
                            
                            $('#gt-QclassId').parent().addClass('gt-warning');
                            $('.gt-QnewExam4').show();
                                 return;
                             }else{
                                $('.gt-QnewExam4').hide();
                                $('#gt-QclassId').parent().removeClass('gt-warning');
                             }

                  $.ajax({
                                    url:url+'/addExam.do',
                                        data:{
                                
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
                                           $('#gt-addClassEm').val('');
                                           $('#gt-addClassEm2').val('');
                                            $('#gt-addClassEm3').val('');
                                               $('#gt-QNewExam,.gt-trans').hide();
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
                                
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                
                                              self.Examination_render(res.data);
                                          
                                             }else{
                                                 $('#gt-Qtable10').html('<tr >\
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


       /* 录入成绩 */
            $('#gt-Qtable10').on('click','.gt-QList',function(){
                $('#gt-QinputGrades,.gt-trans').show();
                    self.ExamId=$(this).parent().data('id');
                    console.log(self.ExamId);
                     $.ajax({
                                    url:url+'/selectStudentTeamExamList.do',
                                        data:{
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

                                        //      var htmlLi= ' <tr>\
                                        //   <td class="gt-Sdli0">学号</td>\
                                        //   <td class="gt-Sdli1 ">学员姓名 </td>\
                                        //  <td class="gt-Sdli2">考试成绩</td></tr>'
                        //                 var list=data.subList;
                        //                   var htl=''
                        //  for(var i=0,len=list.length; i<len; i++) {
                        //       htl+= "<tr >\
                        //   <td class='gt-Sdli0'>"+list[i].studentNo+"</td>\
                        //   <td class='gt-Sdli1'>"+list[i].studentName+" </td>\
                        //   <td class='gt-Sdli2'><div class='gt-inputGd'>\
                        //   <input class='gt-ListIt' data-resultsid="+ list[i].resultsId +"\
                        //   data-studentid="+list[i].studentId+" value="+list[i].resultsNumber+" type='text'></div></td></tr> "
                        //  }
                    
                                            $('#gt-Qtable13').html(htmlStr);
                                            $('#gt-ListshowPg2').text( self.currentPg);
                                    }

        
                                                      // 首页
              $('#gt-ListhomePg2').on('click',function(){
                               $.ajax({
                                       url:url+'/selectStudentTeamExamList.do',
                                        data:{
                                       examId: self.ExamId,
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
                          
                            $('#gt-ListnextPg').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                  url:url+'/selectStudentTeamExamList.do',
                                        data:{
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





                              /*     保存成绩   */
                              $('#gt-ListSaver').on('click',function(){
                                   self.GraldBox=[];
                                   console.log(self.ExamId)
                                 $('#gt-Qtable13 .gt-ListIt').each(function(){
                                     
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

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){    
                                            
                                               $('#gt-QinputGrades,.gt-trans').hide();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                              });

                               /*     取消    */
                               $('.gt-inpuNsave').on('click',function(){
                                 $('#gt-QinputGrades,.gt-trans').hide();

                               })

              /* 查看成绩 */
            $('#gt-Qtable10').on('click','.gt-QList2',function(){
                  self.ExamId=$(this).parent().data('id');
                $('#gt-QlookGrad,.gt-trans').show();
                 $.ajax({
                                    url:url+'/selectStudentTeamExamList.do',
                                        data:{
                                    examId: self.ExamId,

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
                                            $('#gt-Qtable14').html(htmlStr);
                                                   $('#gt-GTListshow').text(self.currentPg);
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
              $('#gt-GThomePg').on('click',function(){
                               $.ajax({
                                       url:url+'/selectStudentTeamExamList.do',
                                        data:{
                                              
                                       examId:self.ExamId,
                                     curPage:1, //当前页                                     
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
                                            $('#gt-Qtable14').html(htmlStr);
                                                   $('#gt-GTListshow').text(self.currentPg);
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
                          
                            $('#gt-GTListnext').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                  url:url+'/selectStudentTeamExamList.do',
                                        data:{
                                              
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
                                            $('#gt-Qtable14').html(htmlStr);
                                                   $('#gt-GTListshow').text(self.currentPg);
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
            $('#gt-Qtable10').on('click','.gt-QList3',function(){
                $('#gt-QdelGrad,.gt-trans').show();
                   self.ExamId=$(this).parent().data('id');

            })
          /*   确定删除 */
          $('#gt-QdelYe').on('click',function(){
              console.log(self.ExamId)
              $.ajax({
                                    url:url+'/deleteExam.do',
                                        data:{
                                     examId:self.ExamId,

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 $('.gt-trans').hide(); 
                                                 $('#gt-QdelGrad').hide();
                                                 addExam();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

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
                var htmlTpl = $('#Qtable10').html();
                // 生成html字符串，用于渲染
               
                var htmlStr = _.template(htmlTpl)({list:data.subList});
             
                $('#gt-Qtable10').html(htmlStr);
               $('#gt-Qshow4').text(self.currentPg);
               $('#gt-Qtatlo3').text(data.rowCount);
       
                             

        },
         /*    评语     */
       StudentComments:function(){
            var self=this;
        $('#gt-AdminGT6').on('click',function(){
                    $(this).addClass('gt-clikClor');
                    $(this).siblings().removeClass('gt-clikClor')
                        $('#gt-ClAdin6').show();
                    $('#gt-ClAdin6').siblings().hide();

                      $.ajax({
                                    url:url+'/findTeamManageList.do',
                                        data:{
                                   

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             self.StudentComments_render(res.data);
                                 
                                             }else{
                                               $('#gt-Ptable1').html(
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
                })

             
                                 //   搜索 回车 搜索
                 $('#gt-Pinput1').keydown(function(event){
                        
                              if ( event.keyCode==13) {
                                
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                                 url:url+'/findTeamManageList.do',
                                        data:{
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

                         $('#gt-Psearc1').on('click',function(){
                                var val=$('#gt-Pinput1').val();
                                        
                                 $.ajax({
                                 url:url+'/findTeamManageList.do',
                                        data:{
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
                                
                        
                
                                                      // 首页
              $('#gt-PhomePg1').on('click',function(){
                               $.ajax({
                                     url:url+'/findTeamManageList.do',
                                        data:{
                                     
                                     curPage:1, //当前页                                     
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
                        
                            //   翻页 下一页
                          
                            $('#gt-PnextPg1').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                              url:url+'/findTeamManageList.do',
                                        data:{
                                     
                                      curPage: self.currentPg+1, //当前页                                     
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

                            });

                       $('.gt-sigedImg').on('click',function(){
                            $('#gt-Psinged,.gt-trans').hide();


                       });



                 /*       写评语     */
                 $('#gt-Ptable1').on('click','.gt-writeWor',function(){
                            self.teamId=$(this).data('id');
                               $('#gt-Gclassrod').text($(this).data('class'));
                    $('#gt-Psinged,.gt-trans').show();
                    console.log(self.teamId)
                     $.ajax({
                              url:url+'/selectStudentComments.do',
                                        data:{
                                     
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
             
                $('#gt-Ptable2').html(htmlStr);
                  $('#gt-Pmany').text(data.length);
                $('#gt-Ptable2 .gt-smallSpuer').each(function(){
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


               /*   新增 数据刷新   */
               var newWrits=function(){
                         $.ajax({
                              url:url+'/selectStudentComments.do',
                                        data:{
                                     
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

               }


                    /*   查看评语    */
                  $('#gt-Ptable2').on('click','.gt-smallSpuer',function(){
                              $('#gt-GclassNo2').text($(this).data('sdno'));
                            $('#gt-GstudentName2').text($(this).data('sudentname'))
                    $('.gt-QsTiwss,.gt-sYwordAd,#gt-QsTiwss').show();
                            
                          self.studentid=$(this).data('studentid')        
                            $.ajax({
                                 url:url+'/ selectCommentsByStudentId.do',
                                        data:{
                                              teamId: self.teamId,  
                                               studentId:self.studentid,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 var data=res.data;
                                                 for(var i=0;i<data.lenght;i++){
                                                       if(data[i].reply===null||data[i].reply===undefined){
                                                          data[i].reply='未回复';
                                                 }
                                                 }
                                                  
                                               htmList(data);

                                             }else{
                                                 var htm='<tr >\
                                            <td class="gt-cond1 ">评论时间 </td>\
                                            <td class="gt-cond1 ">评语内容 </td>\
                                            <td class="gt-cond1 ">家长回复内容 </td> </tr>';
                                                   $('#gt-Ctable4').html(htm)
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
                                               teamId:self.teamId,  
                                               studentId:self.studentid,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  var data=res.data;
                                                
                                                   
                                               htmList(data);

                                             }else{
                                                 var htm='<tr >\
                                            <td class="gt-cond1 ">评论时间 </td>\
                                            <td class="gt-cond1 ">评语内容 </td>\
                                            <td class="gt-cond1 ">家长回复内容 </td> </tr>';
                                                   $('#gt-Ctable4').html(htm)
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
    
                         }
                                
                         var htmList=function(data){
                               for(var i=0;i<data.length;i++){
                data[i].updateDate=(new Date(data[i].updateDate).Format(" yyyy-MM-dd ")); 
                if(data[i].reply===''||data[i].reply===null||data[i].reply==='undefined'){
                                                          data[i].reply='未回复';
                                                      }                    
                  }
                           
                              console.log(data)
                              var htm='<tr >\
                            <td class="gt-cond1 ">评论时间 </td>\
                             <td class="gt-cond1 ">评语内容 </td>\
                            <td class="gt-cond1 ">家长回复内容 </td> </tr>';
                            var htmlBx=''
                         for(var i=0;i<data.length;i++){
                           htmlBx+= "<tr >\
                          <td class='gt-condY'>"+ data[i].updateDate+"</td>\
                          <td class='gt-condY'> "+ data[i].content +"</td>\
                          <td class='gt-condY'>"+ data[i].reply+" </td> </tr>"
            
                        }
                           $('#gt-Ctable4').html(htm+htmlBx);
                     
                         }


                        /*   关闭   */

                        $('.gt-popupR,.gt-butNoSv').on('click',function(){
                            newWrits();
                             $('.gt-QsTiwss,.gt-sYwordAd,#gt-QsTiwss').hide();
                                        


                        })
                    /* 新增评语管理 */

                    $('#gt-QsingCome').on('click',function(){
                         var content=$('#gt-ListCount').val();
                         
                         console.log( self.teamId);
                         console.log(self.studentid)
                         console.log(content);
                         var reg =( /^\s*$/g).test(content);
                         if(content===''||content===undefined||content===null||reg){
                            $('.gt-pingYU2').show();
                          return;
                        }else{
                           $('.gt-pingYU2').hide();
                        }
                           if(content){
                               $.ajax({
                                 url:url+'/addComments.do',
                                        data:{
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
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
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
                var htmlTpl = $('#Ptable1').html();
                // 生成html字符串，用于渲染
               
                var htmlStr = _.template(htmlTpl)({list:data.subList});
             
                $('#gt-Ptable1').html(htmlStr);
               $('#gt-Pshow1').text(self.currentPg);
            //    $('#gt-Ptatlo1').text(data.rowCount);
       
                                           /* 遍历 数据为空情况 */
                                $('#gt-Ptable1 .gt-Plist').each(function(){
                                    var val=$(this).data('status');
                                  
                                    if(val===1){
                                       $(this).text('结业');
                                      
                                    }else{
                                        
                                          $(this).text('在读');
                                    }
                                })

           },

       addHomework:function(){
            var self=this;
         $('#gt-AdminGT7').on('click',function(){
              $(this).addClass('gt-clikClor');
              $(this).siblings().removeClass('gt-clikClor')
            $('#gt-ClAdin7').show();
             $('#gt-ClAdin7').siblings().hide();
             ListClass_bind();
         
   $.ajax({
                                       url:url+'/findHomeworkList.do',
                                        data:{
                                     
                                                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){ 
                                           self.addHomework_render(res.data);
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    })



          });
                             /*      作业详情    */
                       $('#gt-Ptable3').on('click','.gt-ordeMgDeail',function(){
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
                 $('#gt-QlistIpnsc').keydown(function(event){
                        
                              if ( event.keyCode==13) {
                                
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                               url:url+'/findHomeworkList.do',
                                        data:{
                                        homeworkName:val,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.addHomework_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };             
                 })

                        //    查询

                         $('#gt-PsearcList').on('click',function(){
                                var val=$('#gt-QlistIpnsc').val();
                                        
                                 $.ajax({
                                url:url+'/findHomeworkList.do',
                                        data:{
                                                homeworkName:val,   
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                    self.addHomework_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })   

                                        // 首页
              $('#gt-PhomePg3').on('click',function(){
                               $.ajax({
                                         url:url+'/findHomeworkList.do',
                                        data:{
                                     
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.addHomework_render(res.data);
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                            $('#gt-PnextPg3').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                  url:url+'/findHomeworkList.do',
                                        data:{
                                     
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   self.addHomework_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            });




     /*    请求班级  */ 
     var ListClass_bind=function(){
         $.ajax({
                                       url:url+'/findTeamOption.do',
                                        data:{
                                     
                                                                    
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
                                               $('#gt-QListClassRoom').html(html);
                                                 
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    })

                   }
   
                       $('#gt-QListClassRoom').on('change',function(){
                          var teamId= $('#gt-QListClassRoom option:selected').data('id');
                                    console.log(teamId)
                                $.ajax({
                                   url:url+'/findHomeworkList.do',
                                        data:{
                                        teamId:teamId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                            self.addHomework_render(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                                 })
  


     /*    gt-addHomeWd */

     $('#gt-QaddHomewk').on('click',function(){

        $('#gt-QlistHome').html('\
        <li><div class="gt-homeBox"><span class="gt-prClor">*</span><span>作业内容 :</span></div>  <input class="gt-AddNewwork" type="text"></li>\
        ')
        $('#gt-Qhomewk').val('');
        $('.gt-trans').show();
        $('#gt-addHomeWd').show();
      /*    所有班级 */
                 $.ajax({
                                       url:url+'/findTeamOption.do',
                                        data:{
                                                                    
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
                                               $('#gt-QallClassroom').html(" <option value='' >请选择班级</option> " +html);
                                                 
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    })


     });


     


/*     添加    */
$('#gt-QCouBut').on('click',function(){
   
  $('#gt-QlistHome').append('\
  <li><div class="gt-homeBox"><span class="gt-prClor">*</span><span>作业内容 :</span></div>  <input class="gt-AddNewwork" type="text"></li>\
  ')

});

                           $('.gt-addHomeWd').on('click','input ,#gt-QallClassroom',function(){
                            $(".gt-homeWorkWoring").hide();
                            $('#gt-Qhomewk').removeClass('gt-worings');
                            $('#gt-QallClassroom').parent().removeClass('gt-worings');
                            $('.gt-AddNewwork').removeClass('gt-worings');
                
                           })

                  /*       确定新增作业    */
                           $('#gt-QnewSave').on('click',function(){

                            self.bitBig=false;
                                
                             self.homeworkContent=[];
                           var homeworkName= $('#gt-Qhomewk').val();
                                var  teamId= $('#gt-QallClassroom option:selected').data('id');
                              
                                   
                                    var reg =( /^\s*$/g).test(homeworkName);
                                      if(homeworkName==''||homeworkName==null||homeworkName==undefined||reg){
                                        $('#gt-Qhomewk').addClass('gt-worings');
                                        $(".gt-homeWorkWoring").text('*请输入作业名称');
                                        $(".gt-homeWorkWoring").show();
                                        return;
                                      }else{
                                        $('#gt-Qhomewk').removeClass('gt-worings');
                                        $(".gt-homeWorkWoring").text('');
                                        $(".gt-homeWorkWoring").hide();
                                      }

                                $('#gt-QlistHome .gt-AddNewwork').each(function(){
                                          var workContent={};
                                          var content=$(this).val();
                                          var testlist =( /^\s*$/g).test(content);
                                          if(content==''||content==null||content==undefined||testlist ){
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

                                        $('#gt-QlistHome .gt-AddNewwork').each(function(){
                                            var workContent={};
                                              var content=$(this).val();
                                              var testlist =( /^\s*$/g).test(content);
                                              if(content==''||content==null||content==undefined||testlist){
                                                       $(this).addClass('gt-worings');
                                                }else{
                                                    $(this).removeClass('gt-worings');
                                                }
                                             })
                                        $(".gt-homeWorkWoring").text('*请输入作业内容');
                                        $(".gt-homeWorkWoring").show();
                                        return;
                                                                               
                                            }else{
                                                $(".gt-homeWorkWoring").text('');
                                                $(".gt-homeWorkWoring").hide();
                                            }
          

                                         /*     选择班级   */
                                            if(teamId==''||teamId==null||teamId==undefined){
                                                $('#gt-QallClassroom').parent().addClass('gt-worings');
                                                $(".gt-homeWorkWoring").text('*请选择班级');
                                                $(".gt-homeWorkWoring").show();
                                                return;
                                              }else{
                                                $('#gt-QallClassroom').parent().removeClass('gt-worings');
                                                $(".gt-homeWorkWoring").text('');
                                                $(".gt-homeWorkWoring").hide();
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
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){ 
                                                 $('#gt-Qhomewk,.gt-AddNewwork').val('');           
                                              $('.gt-trans').hide();
                                             $('.gt-addHomeWd').hide();
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
                                     
                                                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){ 
                                           self.addHomework_render(res.data);
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    })
};

       },

         addHomework_render:function(data){
             
                  var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
              
                 for(var i=0;i<data.subList.length;i++){
             data.subList[i].updateDate=(new Date(data.subList[i].updateDate).Format("yyyy-MM-dd hh:mm:ss")); 
                                
                  }
               
                // 获取html的模板
                var htmlTpl = $('#Ptable3').html();
                // 生成html字符串，用于渲染
               
                var htmlStr = _.template(htmlTpl)({list:data.subList});
             
                $('#gt-Ptable3').html(htmlStr);
               $('#gt-PshowPg3').text(self.currentPg);
            

           },

                 //教务管理 出勤管理
        eventBind_registrar: function(){
          
            var self=this;

           $('#gt-AdminGT5').on('click',function(){
              $(this).addClass('gt-clikClor');
              $(this).siblings().removeClass('gt-clikClor')
                 $('#gt-ClAdin5').show();
             $('#gt-ClAdin5').siblings().hide();

                     $.ajax({
                                     url:url+'/findTeachAttendanceList.do',
                                        data:{
                                               
                                               

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                            self.Getwork_render(res.data)
                                               self.TeaEachs()
                                                  
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
             
          });

                                     // 首页
              $('#gt-QhomeCPg').on('click',function(){
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
                                               self.Getwork_render(res.data)
                                               self.TeaEachs()
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                            $('#gt-QnextCPg').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                 url:url+'/findTeachAttendanceList.do',
                                        data:{
                                     
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self.Getwork_render(res.data)
                                               self.TeaEachs()
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            });


                        
                        
                                 //   搜索 回车 搜索
                 $('#gt-Mysech').keydown(function(event){
                      
                              if ( event.keyCode == 13) {
                                   var val=$(this).val();
                                  
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
                                           self.Getwork_render(res.data)
                                               self.TeaEachs()
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };             
                 })

                        //   点击查询

                         $('#gt-GMysech').on('click',function(){
                                var val=$('#gt-Mysech').val();
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
                                                self.Getwork_render(res.data)
                                               self.TeaEachs()
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })                




          $('#gt-Ctable1').on('click','.gt-Toper',function(){
                 $(this).prev().show();

          })
          
          

        },
Getwork_render:function(data){
             
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
                $('#gt-QshowCpg').text(self.currentPg);
       
                         

           },

 TeaEachs:function(){
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


                }
             
    };
    registrar.initi();
})()


