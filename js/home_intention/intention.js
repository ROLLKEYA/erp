console.log('招生管理');
(function(){
    var intention={
       initi:function(){
           this.frist_intni();
          this.Inte_bind(); 
          this.intent_bind(); 
             //  当前页
           this.currentPg='';
            // 总页数
           this.pageCount='';  
           this.NhasStudy=0;
           this.studentId='';
       /*     科目id */
           this.subId='';
             this.subName='';

        /*    添加家长   */
      this.parents=[];
     /*  性别 */
       this.sex='';
           },
     
     /* 第一次数据请求 */

         frist_intni:function(){
                   var self=this;
                    $('.gt-NavSupply').on('click',function(){
                        $('.gt-centCom').hide();
                        $('.gt-supply').show();
                          self.NhasStudy=0;
                             $.ajax({
                                       url:url+'/intentionStudentList.do',
                                        data:{
                                     
                                                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               
                                             self.Inte_Recorender(res.data);
                                               self.each_list();

                                             }else{
                                                 $('#gt-Ytable1').html(
                                                     '<tr>\
                                        <td class="gt-supp1">学员姓名</td>\
                                        <td class="gt-supp2">性别</td>\
                                        <td class="gt-supp3">联系电话</td>\
                                        <td class="gt-supp5">意向课程</td>\
                                            <td class="gt-supp6">年级</td>\
                                            <td class="gt-supp8">课程体验</td>\
                                        <td class="gt-supp9">操作</td>\
                                               </tr>'
                                                    );
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                    
                   })
                                    $('#gt-supplylist1').on('click',function(){
            $(this).addClass('gt-listClik');
            $(this).siblings().removeClass('gt-listClik');
            $('#gt-suppSdu').show();
             $('#gt-suppSdu').siblings().hide();
           $.ajax({
                                       url:url+'/intentionStudentList.do',
                                        data:{
                                     
                                                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               
                                             self.Inte_Recorender(res.data);
                                               self.each_list();

                                             }else{
                                                 $('#gt-Ytable1').html(
                                                     '<tr>\
                                        <td class="gt-supp1">学员姓名</td>\
                                        <td class="gt-supp2">性别</td>\
                                        <td class="gt-supp3">联系电话</td>\
                                        <td class="gt-supp5">意向课程</td>\
                                            <td class="gt-supp6">年级</td>\
                                            <td class="gt-supp8">课程体验</td>\
                                        <td class="gt-supp9">操作</td>\
                                               </tr>'
                                                    );
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

        })


                     // 首页
              $('#gt-YhomePg1').on('click',function(){
                               $.ajax({
                                       url:url+'/intentionStudentList.do',
                                        data:{
                                     
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.Inte_Recorender(res.data);
                                                 self.each_list();
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //   翻页 下一页
                          
                            $('#gt-YnextPg1').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                url:url+'/intentionStudentList.do',
                                        data:{
                                     
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   self.Inte_Recorender(res.data);
                                               self.each_list();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

                                 
                                 //   搜索 回车 搜索
                 $('#gt-Yinput1').keydown(function(event){
                        
                              if ( event.keyCode==13) {
                                
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                                     url:url+'/intentionStudentList.do',
                                        data:{
                                         studentName:val,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.Inte_Recorender(res.data);
                                               self.each_list();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };             
                 })

                            
                        //    报名活动查询

                         $('#gt-Ysearc1').on('click',function(){
                                var val=$('#gt-Yinput1').val();
                               
                                        
                                 $.ajax({
                                      url:url+'/intentionStudentList.do',
                                        data:{
                                                studentName:val,   
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.Inte_Recorender(res.data);
                                               self.each_list();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })                

                 

                 },

         each_list:function(){
              var self=this;
                                             $('#gt-Ytable1 .gt-homr').each(function(){
                                                  var sex=$(this).data('sex');
                                                  if(sex.toString()==='0'){
                                                    $(this).text('男')
                                                  }else{
                                                      $(this).text('女')
                                                  }
                                            
                                             })

                                            
                                             $('#gt-Ytable1 .gt-hassaty').each(function(){
                                                 var text=$(this).data('give');
                                                 
                                                 if(text.toString()==='0'){
                                                     self.NhasStudy=self.NhasStudy+1;
                                                     $('#gt-NhasTy').text( self.NhasStudy);
                                                      $(this).find('span').text('否');
                                                       $(this).find('span').addClass('gt-prClor');
                                                      $(this).find('span').removeClass('gt-spanYes');
                                                 }else{
                                                    $('#gt-NhasTy').text(self.NhasStudy);
                                                     var Has= $('#gt-willStudent').text()-self.NhasStudy;
                                                      $('#gt-hasTy').text( Has);
                                                      $(this).find('span').text(text);
                                                       $(this).find('span').addClass('gt-spanYes');
                                                        $(this).find('span').removeClass('gt-prClor');
                                                 }
                                                    
                                                     
                                            
                                             })

         },
      
    /*  意向管理学员部分 */
   
       intent_bind:function(){
           var self=this;
             function stopPropagation(e) { 
            if (e.stopPropagation) 
            e.stopPropagation(); 
            else 
            e.cancelBubble = true; 
            } 
            $(document).on('click',function(){ 
            $('.gt-suppUl').css('display','none'); 
            }); 

            $('.gt-suppUl,.gt-chooseClass').on('click',function(e){ 
            e.stopPropagation(e); 
            }); 
          
           

     $('.gt-suppUl').css('display','none'); //点击的不是div或其子元素 

       $(document).on('click','.gt-suppOperate',function(e){
              $('.gt-suppUl').hide();
             $(this).parent().find('.gt-suppUl').show();
              e.stopPropagation(e); 
             })
         
             $('.gt-butNoSave').on('click',function(){
                  $('.gt-trans').hide();
                $('.gt-suppReSdten').hide();
                $('.gt-popup').hide();


             })

              $(document).on('click','#gt-suppAdd',function(){
                                       $('#gt-lisatsavers').attr('data-id', '');
                                  $('#gt-lisatsavers').text('请选择意向课程')
                                   $('#gt-ADpant').val('');
                                   $('#gt-ADpant7').val('');
                                   $('#gt-ADpant2').val('');
                                    $('#gt-ADpant3').val('');
                                   $('#gt-ADpant5').val('');
                                    $('#gt-ADpant4').val('');
                                     $('#gt-ADpant6').val('');
                                           $('#gt-prantr').html('');   
                                    self.findGradeAllList();
                                $('.gt-trans').show();
                                $('.gt-suppReSdten').show();
               
          
                
              })

           /*    选择意向课程    */
           $('#gt-intenAdd').on('click',function(){

                 $('.gt-chooseClass').show();
            $('.gt-tranTop').show();
                  $.ajax({
                                        url:url+'/findClassSonList.do',
                                        data:{
                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             
                                                  self.currentPg=res.data.curPage;
                                                //总页数
                                                self.pageCount=res.data.pageCount;
                                                 var htmlTpl = $('#Ytable7').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data.subList});
                                            // 执行渲染，
                                            $('#gt-Ytable7').html(htmlStr);
                                            $('#gt-QshowPga').text( self.currentPg);

                                             }
              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

           })

         /*     性别选择 */
         $('#gt-suppReSdten .gt-perDiv .gt-round ').on('click',function(){
                    $('.gt-round').removeClass('gt-roundRB');
                       $(this).addClass('gt-roundRB');


         })
        
            /*     添加家长    */
            $('#gt-KKaddpraent').on('click',function(){
                var htm='<div class="gt-Parents"><span>家长姓名 :</span> <input class="gt-parnName gt-AddLIst1" type="text"> <span class="gt-margLf">关系 :  </span><span class="gt-margRt"></span>\
 <input   class="gt-parnName gt-AddLIst2" type="text">\
 <span class="gt-ParentsMar gt-margLf" >联系电话 : </span> <input onkeyup=(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,"");}).call(this); class="gt-parnPhote gt-AddLIst3" type="text"> \
              </div>';
              $('#gt-prantr').append(htm);

            })
   
             
              /*   取消警告 */
                $('#gt-ADpant,#gt-Yselect2,#gt-ADpant7,#gt-intenAdd').on('click',function(){
                    $('#gt-ADpant').parent().removeClass('gt-warning');$('.gt-waringName').hide();
                    $('#gt-ADpant7').parent().removeClass('gt-warning');$('.gt-waringPhote').hide();
                    $('.gt-inteClass').hide();
                    $('.gt-classWring').hide();
                })

            /*   确定添加意向学员   */
            $('#gt-KKsaver').on('click',function(){

                                        
                                           self.parents=[];

                                  var studentName= $('#gt-ADpant').val();
                                   var studentPhone= $('#gt-ADpant7').val();
                                    var school= $('#gt-ADpant2').val();
                                     var address=$('#gt-ADpant3').val();
                                   var  email=$('#gt-ADpant5').val();
                                     var train=$('#gt-ADpant4').val();
                                     var classid=$('#gt-lisatsavers').data('id');
                                       var gradeId= $('#gt-Yselect2 option:selected').data('id');
                                       var reg =( /^\s*$/g).test( $('#gt-ADpant').val());
                                          /*        名字 不能为空  */
                                   if($('#gt-ADpant').val()===''||$('#gt-ADpant').val()===undefined||$('#gt-ADpant').val()===null||reg){
                                  
                                       $('#gt-ADpant').parent().addClass('gt-warning');
                                       $('.gt-waringName').show();
                                          return;
                                   } else{  $('#gt-ADpant').parent().removeClass('gt-warning');$('.gt-waringName').hide();}

                                                       /*  电话验证 */
                                                      if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($('#gt-ADpant7').val()))){ 
                                                                       $('#gt-ADpant7').parent().addClass('gt-warning');
                                                                        $('.gt-waringPhote').show();
                                                                        return ; 
                                                                        } else{  $('#gt-ADpant7').parent().removeClass('gt-warning');$('.gt-waringPhote').hide();}
                              

                                              /*  选择年级     */       

                                    if(gradeId===''||gradeId===undefined||gradeId===null){ 
                                        $('.gt-classWring').show();
                                        return ; 
                                        } else{    $('.gt-classWring').hide();}  
                                              

                                    /*  选择意向课程 */
                                    if(classid===''||classid===undefined||classid===null){ 
                                         $('.gt-inteClass').show();
                                         return ; 
                                         } else{    $('.gt-inteClass').hide();}

                                        
                                        $('#gt-ADsex .gt-round').each(function(){
                                            if($(this).hasClass('gt-roundRB')){
                                                self.sex=$(this).data('sex');

                                            }
                                             
                                        })



                                          
                                           /*  添加家长关系 传的参数*/
                  
                                             $('#gt-prantr .gt-Parents').each(function(){
                                                      var  obj={};
                                                    
                                              var parentName=$(this).find('.gt-AddLIst1').val();
                                                var parentCall=$(this).find('.gt-AddLIst2').val();
                                                   var phone=$(this).find('.gt-AddLIst3').val();      
                                              obj.parentName=parentName;
                                              obj.parentCall=parentCall;
                                               obj.phone=phone;
                                              self.parents.push(obj);
                                            

                                             })
                                    var students= [
                                         {
	                                             
				                          studentName:studentName, 
   				                    	  studentPhone: studentPhone, 
    					                      headImage:'',      
    					                         school:school, 
   					                           gradeId: gradeId, 
   				                                   sex:self.sex, 
    				                           address:address, 
    			                       	         email: email, 
   					                     onceIntention:'0', 
  					                     nowIntention:'1', 
    				                            train:train, 
    					                       classId:classid, 
                                     
                                         }
                                
                                    ];
                        
                                    var  parents=self.parents;             
                                  students=JSON.stringify(students);
                                  parents=JSON.stringify(parents);

                                 console.log(students)
                                   console.log(parents)

                         $.ajax({
                                       url:url+'/newStudent.do',
                                        data:{  
                                             students: students,
                                              parents:  parents,

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   $('.gt-trans').hide();
                                             $('.gt-suppReSdten').hide();
                                             newDataInte();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

            })


                         var newDataInte=function(){
                              $.ajax({
                                       url:url+'/intentionStudentList.do',
                                        data:{
                                     
                                                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               
                                             self.Inte_Recorender(res.data);
                                               self.each_list();

                                             }else{
                                                 $('#gt-Ytable1').html(
                                                     '<tr>\
                                        <td class="gt-supp1">学员姓名</td>\
                                        <td class="gt-supp2">性别</td>\
                                        <td class="gt-supp3">联系电话</td>\
                                        <td class="gt-supp5">意向课程</td>\
                                            <td class="gt-supp6">年级</td>\
                                            <td class="gt-supp8">课程体验</td>\
                                        <td class="gt-supp9">操作</td>\
                                               </tr>'
                                                    );
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                         }


                /* 详情 */
            $(document).on('click','.gt-Ylist',function(e){
                $('#gt-YsuppDetails').show();
                $('.gt-trans').show();
                  self.studentId= $(this).parent().data('id');
                  console.log( self.studentId)
                   e.stopPropagation(e); 
                          $.ajax({
                                        url:url+'/intentionDetails.do',
                                        data:{
                                         studentId: self.studentId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             
                                         var htmlTpl = $('#Ytable2').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data});
                                            // 执行渲染，
                                            $('#gt-Ytable2').html(htmlStr);
                                                 var sexY= $('.gt-Ysex').data('sex');
                                                 if(sexY==0){
                                                    $('.gt-Ysex').text('男')
                                                 }else{
                                                        $('.gt-Ysex').text('女')
                                                 }  
                                                   var memberId= $('.gt-membersIcoBox').data('memberId') ;
                                                   if(memberId===''){
                                                         $('.gt-membersIcoBox').hide();
                                                   }   
                                             }
                                                 
                                             
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


            })


             /* 修改信息 */
            $(document).on('click','.gt-Ylist2',function(e){
                $('.gt-suppRevisions').show();
                $('.gt-trans').show();
                self.studentId= $(this).parent().data('id');
               console.log( self.studentId);
                e.stopPropagation(e); 
 
                 $.ajax({
                                        url:url+'/intentionDetails.do',
                                        data:{
                                         studentId: self.studentId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                
                                                 var htmlTpl = $('#Ytable3').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data});
                                            // 执行渲染，
                                            $('#gt-Ytable3').html(htmlStr);
                                             self.findGradeAllList();
                            
                                                /*     性别   */
                                                $('#gt-Ytable3 .gt-round').each(function(){
                                                 if($(this).data('sex').toString()===res.data.sex){
                                                      $('#gt-Ytable3 .gt-round').removeClass('gt-roundRB');
                                                     $(this).addClass('gt-roundRB');  
                                                       }
                  
                                                   })
                                                
                                                 
                                             }
              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


            })

           /*  性别选择 */
           $('#gt-Ytable3').on('click',' .gt-round',function(){
                        
                     $('.gt-round').removeClass('gt-roundRB');
                     $(this).addClass('gt-roundRB');   
                       

           })

        //    添加家长
        $('.gt-suppRevisions').on('click','#gt-YaddPrents',function(){
                var html='<div class="gt-Parents"><span>家长姓名 :</span> <input class="gt-parnName gt-AddLIst1"  value="" type="text"> \
           <span class="gt-margLf">关系 :  </span><span class="gt-margRt"></span>  <input class="gt-parnName gt-AddLIst2" value="" type="text"> \
<span class="gt-ParentsMar gt-margLf" >联系电话 : </span> <input class="gt-parnPhote gt-AddLIst3" value="" type="text">\  </div>\
';     
$('#gt-Yparets').append(html);

        })

            $('.gt-suppRevisions').on('click','#gt-chooseinIention',function(){
        
                 $('.gt-chooseClass').show();
                $('.gt-tranTop').show();
                  $.ajax({
                                        url:url+'/findClassSonList.do',
                                        data:{
                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              
                                                  self.currentPg=res.data.curPage;
                                                //总页数
                                                self.pageCount=res.data.pageCount;
                                                 var htmlTpl = $('#Ytable7').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data.subList});
                                            // 执行渲染，
                                            $('#gt-Ytable7').html(htmlStr);
                                            $('#gt-QshowPga').text( self.currentPg);
                                            var databit=$('#gt-intentionClass').data('id');
                                                 console.log(databit)
                                             $('.gt-chooseClass .gt-square').each(function(){
                                                   if(databit===$(this).data('id')){
                                                     $(this).addClass('gt-squareImg');

                                                   }

                                             })

                                             }
              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
            })
 


           /*           确定修改    */
               $('#gt-Ytable3').on('click','#gt-Kysaver',function(){

                       
                                           self.parents=[];
                                         
                                 
                                    var studentName= $('#gt-Changvalue').val();
                                    var studentPhone= $('#gt-Changvalue2').val();
                                    var school= $('#gt-Changvalue3').val();
                                     var address=$('#gt-Changvalue4').val();
                                    var  email=$('#gt-Changvalue6').val();
                                     var train=$('#gt-Changvalue7').val();
                                     var classId=$('#gt-intentionClass').data('id');
                                        var gradeId= $('#gt-Yselect option:selected').data('id');
                                        $('#gt-Ytable3 .gt-round').each(function(){
                                            if($(this).hasClass('gt-roundRB')){
                                                self.sex=$(this).data('sex');

                                            }
                                             
                                        })
                                          
                                           /*  添加家长关系 传的参数*/
                  
                                             $('#gt-Yparets .gt-Parents').each(function(){
                                                      var  obj={};
                                                    var id=$(this).data('id');
                                              var parentName=$(this).find('.gt-AddLIst1').val();
                                                var parentCall=$(this).find('.gt-AddLIst2').val();
                                                   var phone=$(this).find('.gt-AddLIst3').val(); 
                                                   obj.id=id;     
                                              obj.parentName=parentName;
                                              obj.parentCall=parentCall;
                                               obj.phone=phone;
                                              self.parents.push(obj);
                                            

                                             })
                                    var students= [
                                         {
	                                              id: self.studentId,  
				                          studentName:studentName, 
   				                    	  studentPhone: studentPhone, 
    					                      headImage:'',      
    					                         school:school, 
   					                           gradeId:gradeId, 
   				                                   sex:self.sex, 
    				                           address:address, 
    			                       	         email: email, 
   					                     onceIntention:'0', 
  					                     nowIntention:'1', 
    				                            train:train, 
    					                      classId:classId, 
                                     
                                         }
                                
                                    ];
                        
                                    var  parents=self.parents;             
                                  students=JSON.stringify(students);
                                  parents=JSON.stringify(parents);

                                 console.log(students)
                                   console.log(parents)

                         $.ajax({
                                       url:url+'/newStudent.do',
                                        data:{  
                                             students: students,
                                              parents:  parents,

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   $('.gt-trans').hide();
                                              $('.gt-suppRevisions').hide();
                                             newDataInte();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });



               })






             /* 录入沟通记录 */
            $(document).on('click','.gt-Ylist3',function(e){
                $('#gt-Ytypig').show();
                $('.gt-trans').show();
                 e.stopPropagation(e); 
                   self.studentId= $(this).parent().data('id');
                  console.log(self.studentId)
                 $.ajax({
                                        url:url+'/communication.do',
                                        data:{
                                         studentId:self.studentId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                                        
                         for(var i=0;i<res.data.length;i++){
                res.data[i].updateDate=(new Date(res.data[i].updateDate).Format("yyyy-MM-dd"));  
                          
                    }
                                                   var htmlTpl = $('#Ytable4').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data});
                                            // 执行渲染，
                                            $('#gt-Ytable4').html(htmlStr);
                                                
                                            
                                             }
              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


            })
      
          /*    取消 警告  */
          $('#gt-Ytypig').on('click','#gt-cateContent',function(){
            
            $('.gt-addcents').hide();
          })
            
             /* 新增录入沟通 */
            $('#gt-Ytypig').on('click','#gt-communSuer',function(e){
                $('#gt-Ytypig').show();
                $('.gt-trans').show();
                 e.stopPropagation(e); 
             
                 var  communicateContent=$('#gt-cateContent').val();

                 var reg =( /^\s*$/g).test(communicateContent);
                 //  如果是空，或者""
                
                 if(communicateContent===''||communicateContent===undefined||communicateContent==null||reg){
                         $('.gt-addcents').show();
                          return;
                 }else{
                     $('.gt-addcents').hide();
                 }

                     console.log(self.studentId)
                 console.log(communicateContent)
                 $.ajax({
                                        url:url+'/addCommunicate.do',
                                        data:{
                                         communicateContent:communicateContent,
                                         studentId:self.studentId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              
                                                 newDaate(self.studentId);      
                                            
                                             }
              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


            })
      
             var newDaate=function(data){
                  $.ajax({
                                        url:url+'/communication.do',
                                        data:{
                                         studentId:self.studentId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                                        
                         for(var i=0;i<res.data.length;i++){
                res.data[i].updateDate=(new Date(res.data[i].updateDate).Format("yyyy-MM-dd"));  
                          
                    }
                                                   var htmlTpl = $('#Ytable4').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data});
                                            // 执行渲染，
                                            $('#gt-Ytable4').html(htmlStr);
                                                
                                            
                                             }
              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
             };
      
             /* 录入测试成绩 */
            $(document).on('click','.gt-Ylist4',function(e){
                $('#gt-Ygrald').show();
                $('.gt-trans').show();
                e.stopPropagation(e); 
                 e.stopPropagation(e); 

                   self.studentId= $(this).parent().data('id');
                  console.log(self.studentId)
                 $.ajax({
                                        url:url+'/testList.do',
                                        data:{
                                         studentId:self.studentId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                         for(var i=0;i<res.data.length;i++){
                res.data[i].updateDate=(new Date(res.data[i].updateDate).Format("yyyy-MM-dd"));  
                          
                    }
                                                   var htmlTpl = $('#Ytable5').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data});
                                            // 执行渲染，
                                            $('#gt-Ytable5').html(htmlStr);
                                                
                                            
                                             }
              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

            })

            $('#gt-Ygrald input').on('focus',function(){
                $('.gt-tename').hide(); 
                $('.gt-tename2').hide();

       })


            $('#gt-Ygrald').on('click','#gt-addTest',function(){


                   var testName= $('#gt-addTestINm').val();
                    var testAchievement= $('#gt-addTestGd').val();

                     if(testName.indexOf(" ") >= 0 ||testName===''|| testName===null){
                        $('.gt-tename').show();
                        return;
                     }else{
                        $('.gt-tename').hide();  
                     }
                     if( testAchievement===''|| testAchievement===null){
                        $('.gt-tename2').show();
                          return;
                    }else{
                           $('.gt-tename2').hide();
                                 }

                     console.log(testName)
                      console.log(testAchievement)
                       console.log(self.studentId)

                 $.ajax({
                                        url:url+'/addTest.do',
                                        data:{
                                            testName :testName,

    			                        testAchievement:testAchievement ,
                                         studentId:self.studentId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  
                                                addDaate(self.studentId);
                                            
                                             }
              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

            })


                    var addDaate=function(data){
                           $.ajax({
                                        url:url+'/testList.do',
                                        data:{
                                         studentId:self.studentId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 for(var i=0;i<res.data.length;i++){
                res.data[i].updateDate=(new Date(res.data[i].updateDate).Format("yyyy-MM-dd"));  
                          
                    }
                                                   var htmlTpl = $('#Ytable5').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data});
                                            // 执行渲染，
                                            $('#gt-Ytable5').html(htmlStr);
                                                
                                            
                                             }
              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
             };


             /* 赠送课程体验 */
            $(document).on('click','.gt-Ylist5',function(e){
                $('.gt-giveaway').show();
                $('.gt-trans').show();
                 e.stopPropagation(e); 
                    self.studentId= $(this).parent().data('id');
                  console.log(self.studentId)
                 $.ajax({
                                       url:url+'/givingList.do',
                                        data:{
                                         studentId:self.studentId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 
                                            for(var i=0;i<res.data.length;i++){
                                   res.data[i].updateDate=(new Date(res.data[i].updateDate).Format("yyyy-MM-dd  hh:mm:ss"));  
                                                    
                                        
                                   }
                                     
                                                   var htmlTpl = $('#Ytable6').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data});
                                            // 执行渲染，
                                            $('#gt-Ytable6').html(htmlStr);
                                                
                                            
                                             }
              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

            })

    /* 添加课程 */
           $('.gt-giveaway').on('click','#gt-sendCalss',function(){
                            self.subId='';
                            self.subName='';


                            if($('#gt-QsengSbj').val()===''||$('#gt-QsengSbj').val()===undefined||$('#gt-QsengSbj').val()===null){

                                $('#gt-QsengSbj').addClass('gt-warning');
                                $('.gt-Qwraing').show();
                                return;

                            }else{
                                 $('#gt-QsengSbj').removeClass('gt-warning');
                                $('.gt-Qwraing').hide();
                            }
                       var classid=$('#gt-QsengSbj').data('id');

                    $.ajax({
                                         url:url+'/ addGiving.do',
                                        data:{
                                         studentId:self.studentId,
                                         classId :classid,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  addDClass(self.studentId); 
                                                
                                            
                                             }
              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

           })

            
            // 刷新添加结果
                    var addDClass=function(data){
                           $.ajax({
                                        url:url+'/givingList.do',
                                        data:{
                                         studentId:self.studentId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){

                                            for(var i=0;i<res.data.length;i++){
                                   res.data[i].updateDate=(new Date(res.data[i].updateDate).Format("yyyy-MM-dd  hh:mm:ss"));  
                                                    
                                        
                                   }
                                               var htmlTpl = $('#Ytable6').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data});
                                            // 执行渲染，
                                            $('#gt-Ytable6').html(htmlStr);
                                        
                                             }
              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
             };




        // 选择课程
        $('.gt-giveaway').on('click','#gt-choosClass',function(){
                        $('#gt-QsengSbj').removeClass('gt-warning');
                                $('.gt-Qwraing').hide();

            $('.gt-chooseClass').show();
            $('.gt-tranTop').show();
                  $.ajax({
                                        url:url+'/findClassSonList.do',
                                        data:{
                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             
                                                  self.currentPg=res.data.curPage;
                                                //总页数
                                                self.pageCount=res.data.pageCount;
                                                 var htmlTpl = $('#Ytable7').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data.subList});
                                            // 执行渲染，
                                            $('#gt-Ytable7').html(htmlStr);
                                            $('#gt-QshowPga').text( self.currentPg);

                                             }
              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                    })

                            
                    
                            $('#gt-QhomePga').on('click',function(){
                               $.ajax({
                                       url:url+'/findClassSonList.do',
                                        data:{
                                     
                                      curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.currentPg=res.data.curPage;
                                                //总页数
                                                self.pageCount=res.data.pageCount;
                                                 var htmlTpl = $('#Ytable7').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data.subList});
                                            // 执行渲染，
                                            $('#gt-Ytable7').html(htmlStr);
                                            $('#gt-QshowPga').text( self.currentPg);
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                             // 翻页 下一页
                          
                            $('#gt-QnexyPga').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                       url:url+'/findClassSonList.do',
                                        data:{
                                     
                                      curPage:self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.currentPg=res.data.curPage;
                                                //总页数
                                                self.pageCount=res.data.pageCount;
                                                 var htmlTpl = $('#Ytable7').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data.subList});
                                            // 执行渲染，
                                            $('#gt-Ytable7').html(htmlStr);
                                            $('#gt-QshowPga').text( self.currentPg);
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                              })


                                 
                                 //   搜索 回车 搜索
                 $('#gt-ginput1').keydown(function(event){
                        
                              if ( event.keyCode==13) {
                                
                                   var val=$(this).val();
                                   console.log(val)
                                 $.ajax({
                                        url:url+'/findClassSonList.do',
                                        data:{
                                             className :val,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              self.currentPg=res.data.curPage;
                                                //总页数
                                                self.pageCount=res.data.pageCount;
                                                 var htmlTpl = $('#Ytable7').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data.subList});
                                            // 执行渲染，
                                            $('#gt-Ytable7').html(htmlStr);
                                            $('#gt-QshowPga').text( self.currentPg);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };             
                 })
                                 
                        //    报名活动查询

                         $('#gt-gsearc1').on('click',function(){
                                var val=$('#gt-ginput1').val();
                                console.log(val);
                                  console.log( self.currentPg)


                                 $.ajax({
                                        url:url+'/findClassSonList.do',
                                        data:{
                                             className :val,

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.currentPg=res.data.curPage;
                                                //总页数
                                                self.pageCount=res.data.pageCount;
                                                 var htmlTpl = $('#Ytable7').html();
                                            // 生成html字符串，用于渲染
                                            var htmlStr = _.template(htmlTpl)({list:res.data.subList});
                                            // 执行渲染，
                                            $('#gt-Ytable7').html(htmlStr);
                                            $('#gt-QshowPga').text( self.currentPg);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })                
                    
                        

         
    /*        选择 赠送 科目 */

    $('#gt-Ytable7').on('click','.gt-square',function(){
            
                     $('.gt-square').removeClass('gt-squareImg');
                      $(this).addClass('gt-squareImg');                 
               })
                    $('#gt-Qcantuer,#gt-Qcantuer2').on('click',function(){
                         $('.gt-chooseClass,.gt-tranTop').hide();

                    })

                /*     关闭 窗口  刷新数据 */
                $('.gt-giveaway').on('click','#gt-saveroldData,#gt-saveroldData2',function(){
                    $('.gt-giveaway').hide();
                     $('#gt-trans').hide();

                      $.ajax({
                                       url:url+'/intentionStudentList.do',
                                        data:{
                                     
                                                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               
                                             self.Inte_Recorender(res.data);
                                               self.each_list();

                                             }else{
                                                 $('#gt-Ytable1').html(
                                                     '<tr>\
                                        <td class="gt-supp1">学员姓名</td>\
                                        <td class="gt-supp2">性别</td>\
                                        <td class="gt-supp3">联系电话</td>\
                                        <td class="gt-supp5">意向课程</td>\
                                            <td class="gt-supp6">年级</td>\
                                            <td class="gt-supp8">课程体验</td>\
                                        <td class="gt-supp9">操作</td>\
                                               </tr>'
                                                    );
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                 
           
                     

                })
                
      
            /*     确定赠送  */
                $('#gt-Qhassaver').on('click',function(){
                      $('#gt-Ytable7 .gt-square').each(function(){
                              if($(this).hasClass('gt-squareImg')){
                                self.subId=$(this).data('id');
                                self.subName=$(this).parent().next().text();

                                 


                              }
                      })           
                            $('#gt-lisatsavers').attr('data-id', self.subId);
                                $('#gt-lisatsavers').text(self.subName);
                                $('#gt-Qbitspan').html("<span id='gt-intentionClass' data-id="+ self.subId +" class='gt-intentionSpan'> "+self.subName+"</span>")
                             
                           
                           $('#gt-QsengSbj').val(self.subName);
                           $('#gt-QsengSbj').attr('data-id', self.subId);
                 
                             $('.gt-chooseClass,.gt-tranTop').hide();


                })



          /*报名 */
            $('#gt-Ytable1').on('click','.gt-Ylist6',function(e){
                
                         var studentName=$(this).parent().data('studentname');
                          var studentNo=$(this).parent().data('studentno');
                           var id=$(this).parent().data('id');
                           var obj={};
                           obj.studentName=studentName;
                            obj.studentNo=studentNo;
                           obj.id=id;
                           
                       var res={
                         data:[
                                       obj,
                                
                                    ]
                       } ; 

                                // res= JSON.stringify(res);
                                   console.log(res)
                     
                     top.frames['gt-homeTow'].binddata(res);
                     $('#gt-homeTow', parent.document).show();
                            //   $('#gt-homeOne', parent.document).hide();
                     $('.gt-supply').hide();




            })
              /* 删除 */
            $(document).on('click','.gt-Ylist7',function(e){
                $('#gt-Ypote').show();
                $('.gt-trans').show();
                 e.stopPropagation(e); 
                   self.studentId= $(this).parent().data('id');

            })
             /*    确定删除 */
             $('#gt-delxue').on('click',function(){
                      $('#gt-Ypote').hide();
                       $('.gt-trans').hide();
                 $.ajax({
                                        url:url+'/deleteStudent.do',
                                        data:{
                                         studentId:self.studentId,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              newDatIniti();
                                              
                                             }
              
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
             })
           /*   删除后刷新 */
             var  newDatIniti=function(){
                  $.ajax({
                                       url:url+'/intentionStudentList.do',
                                        data:{
                                     
                                                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               
                                             self.Inte_Recorender(res.data);
                                               self.each_list();

                                             }else{
                                                 $('#gt-Ytable1').html(
                                                     '<tr>\
                                        <td class="gt-supp1">学员姓名</td>\
                                        <td class="gt-supp2">性别</td>\
                                        <td class="gt-supp3">联系电话</td>\
                                        <td class="gt-supp5">意向课程</td>\
                                            <td class="gt-supp6">年级</td>\
                                            <td class="gt-supp8">课程体验</td>\
                                        <td class="gt-supp9">操作</td>\
                                               </tr>'
                                                    );
                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

             };

$('.gt-suppDetails,.gt-suppRevisions,.gt-typig,.gt-giveaway,.gt-popup,.gt-chooseClass').on('click',function(e){
     e.stopPropagation(e); 
})
      /*   关闭 */
      $('.gt-supSpanRt').on('click',function(e){
                $('#gt-YsuppDetails').hide();
                $('.gt-trans').hide();
                $('.gt-suppRevisions').hide();
                $('#gt-Ytypig').hide();
                $('#gt-Ygrald').hide();
                 $('.gt-giveaway').hide();
                   $('#gt-Ypote').hide();
                   $('.gt-chooseClass').hide();
                      $('.gt-suppReSdten,.gt-tranTop').hide();
                   
      })
     
$('.gt-typig ,.gt-suppRevisions').on('click','.gt-popupRt,.gt-butNoSave',function(){
        $('#gt-YsuppDetails').hide();
                $('.gt-trans').hide();
                $('.gt-suppRevisions').hide();
                $('#gt-Ytypig').hide();
                $('#gt-Ygrald').hide();
                 $('.gt-giveaway').hide();
                   $('#gt-Ypote').hide();
                 
})


       },
         
       findGradeAllList:function(){
          
                    


                     $.ajax({
                                        url:url+'/findGradeAllList.do',
                                        data:{
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  var data=res.data
                                                  console.log(data)
                                                   var html=''
                                                  for(var i=0;i<data.length;i++){
                                                      html+= "<option class='gt-lists' data-id="+data[i].id +" value=''>"+data[i].gradeName +"</option>"
                                                    
                                                  }
                                                 $('#gt-Yselect,#gt-Yselect2').html("<option class='gt-lists'  value=''>请选择年级</option>"+html);
                                                    $('#gt-Yselect .gt-lists').each(function(){
                                            var text=$('#gt-Yselect').data('gradeid');
                                          
                                            if($(this).data('id')===text){
                                                $(this).attr('selected',"selected");    
                                            }      


                                        })



                                                     }   
                                                                       
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

       },


      // 报名活动渲染
          Inte_Recorender: function(data){
             var self=this;
                //  当前页
             self.currentPg=data.curPage;
            //总页数
              self.pageCount=data.pageCount;
       
            // 获取html的模板
            var htmlTpl = $('#Ytable1').html();
            // 生成html字符串，用于渲染
            var htmlStr = _.template(htmlTpl)({list:data.subList});
            // 执行渲染，
            $('#gt-Ytable1').html(htmlStr);
           $('#gt-YshowPg1').text(self.currentPg);
           $('#gt-willStudent').text(data.rowCount);
    
          },





        Inte_bind:function(){

        

          $('#gt-supplylist2').on('click',function(){
            $(this).addClass('gt-listClik');
            $(this).siblings().removeClass('gt-listClik');
            $('#gt-mysuppSdu').show();
               $('#gt-mysuppSdu').siblings().hide();
        })

          $('#gt-supplylist3').on('click',function(){
            $(this).addClass('gt-listClik');
            $(this).siblings().removeClass('gt-listClik');
            $('#gt-countsupp').show();
             $('#gt-countsupp').siblings().hide();

        })

        
      
    
        },

              

         titel:function(){
            
             $("td").each(function(){
              
            $(this).attr("title",$(this).text());
           
           });
       },

    };
    intention.initi();
})()


