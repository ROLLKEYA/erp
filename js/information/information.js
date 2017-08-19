console.log(54255);
(function(){
    var information={
       initi:function(){
              
              this.envent_bind();
            //   this.findStudent();
               //  当前页
                this.currentPg='';
                //总页数
                this.pageCount='';
                //  this.cotr_bind();
                //  this.List_bind();
               
                 this.enrollid='';
                //  学员Id
                 this.studentId='';
                 this.subjectid='';
                 this.stdentName='';
                 this.stdentCade='';
                 this.analysis=[];
                 this.parents=[];
                /*  保存 科目 到本地 */
                this.arrySub=[];
                this.arrySubID=[];
                this.studentNo='';
                
           
            
              
                
           },
         titel:function(){
            
             $("td").each(function(){
              
            $(this).attr("title",$(this).text());
           
           });
       },
       envent_bind:function(){
           var self=this;
                      $('#gt-inFroM', parent.document).on('click',function(){
                            // 默认第一个已选课程
                          
                      self.findStudent();
                       self.cotr_bind();
                      self.List_bind();
                 })

                          
                          
                        $('.gt-backCur,.gt-backCur').on('click',function(){
                          $('iframe', parent.document).hide();
                           $('#gt-deail', parent.document).show();
                            
                        })
                    // 阻止事假冒泡兼容写法
                    function stopPropagation(e) {
                                    if (e.stopPropagation) 
                                        e.stopPropagation();
                                    else 
                                        e.cancelBubble = true;
                                }
                    // 点其他地方隐藏
                    $(document).on('click',function(){
                        $('.gt-convInter').hide();
                        $('.gt-chosChang').find('ul').hide();
                       
                    })

                    $(document).on('click','.gt-cheques',function(e){
                       $('#gt-grade2').html('');
                         $('.gt-subjects').html('');

                        $('.gt-convInter').hide();
                    $(this).siblings('.gt-convInter').show();
                    stopPropagation(e)
                    })

                    $(document).on('click','li,ul,.gt-revisions,.gt-attendance,.gt-onClick,.gt-detailList','.gt-trans' ,function(e){
                    stopPropagation(e)})
                  

                  

                    $(document).on('click','.gt-canl,.gt-cancelled',function(){
                    $('#gt-trans', parent.document).hide();
                    $('.gt-trans').hide();
                    $('#gt-revisions').hide();
                    $('#gt-divideCl').hide();
                    $('#gt-transfe').hide();
                    $('#gt-attendance').hide();
                    $('#gt-stopClass').hide();
                    $('#gt-tranNotes').hide();
                    $('#gt-reopened').hide();
                    $('#gt-dropOut').hide();
                    $('.gt-detailList').hide();
                    $('#gt-revisions').hide();
                    $('#gt-stopClass').hide();
                    $('#gt-addgt-BoxsubList').html(' ');
                     $('.gt-addPrents').find('span').html(' ');
               
                    })

                   

                    $(document).on('click','.gt-ImgIco',function(e){
                           stopPropagation(e)
                          $(this).next().show();

                    })
                     

       },

       cotr_bind:function(){

                       var self=this;
                             /*   查看上课记录 翻页 shou页 */
                          
                            $('#gt-homePg1').on('click',function(){
                               $.ajax({
                                        url:url+'/findStudentList.do',
                                        data:{
                                     
                                      curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.findStudent_rend(res.data);
                                                 self.gt_overdue();
                                                  self.titel();
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //  查看上课记录 翻页 下一页
                          
                            $('#gt-nextPg1').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                   url:url+'/findStudentList.do',
                                        data:{
                                     
                                      curPage:self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.findStudent_rend(res.data);
                                                 self.gt_overdue();
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
                      
                              if ( event.keyCode == 13) {
                                   var val=$('#gt-input1').val();
                                  
                                 $.ajax({
                                       url:url+'/findStudentList.do',
                                        data:{
                                             search:val,
                                            //  curPage:self.currentPg,
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self.findStudent_rend(res.data);
                                                   self.gt_overdue();
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
                                       url:url+'/findStudentList.do',
                                        data:{
                                             search:val,
                                       

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self.findStudent_rend(res.data);
                                                   self.gt_overdue();
                                                    self.titel();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })                

                 
       },

        // 列表
        List_bind:function(){
            var self=this;
         /*   修改信息 */
      $('#gt-table1').on('click','.gt-tablelist',function(){
         
        
                    self.studentId=$(this).parent().data('id');
                    console.log (self.studentId);    
                   $('.gt-trans').show();
                     $('#gt-trans', parent.document).show();
                   $('#gt-revisions').show();

                         var sex= $(this).parent().data('sex');
                         if(sex==='0'){
                             $('#gt-man').find('.gt-round').addClass('gt-roundRB');
                              $('#gt-woman').find('.gt-round').removeClass('gt-roundRB');
                          
                         }else{
                               $('#gt-woman').find('.gt-round').addClass('gt-roundRB');
                               $('#gt-man').find('.gt-round').removeClass('gt-roundRB');
                         }

                       $.ajax({
                                       url:url+'/fromStudent.do',
                                        data:{
                                            studentId: self.studentId,                                           
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self.revisions_rend(res.data);
                                                 var list=res.data.parents
                                                 var html=''
                                                 for(var i=0;i<list.length;i++){
              html+= " <div class='gt-perDiv gt-multidMargi gt-parenMort'>\
      <span class='gt-parenNameSpan'>姓名 : </span> <span class='gt-parenName'><input class='gt-IFinList' data-id="+list[i].id+"  type='text' value="+list[i].parentName+"></span> \
      <span class='gt-multidMargi'>关系 : </span></span> <span class=' gt-parenName'><input class='gt-IFinList2'  type='text' value="+ list[i].parentCall+"></span>  \
      <span class='gt-phtoe'>联系电话 : </span> <span class='gt-parenName'><input class='gt-IFinList3 gt-parenNameIput' type='text' value="+ list[i].phone+"  ></span> \
      <span data-memberid="+ list[i].memberId+" class='gt-membersIcoBox'><span class='gt-membersIco'><img src='../image/ico/u14422.png' alt=''></span><span class='gt-membersIcoMg'>已经成为会员</span></span>\
      </div> "
                                                 }
                                                                                                                        
                                      $('#gt-prens').html(html)                                    
                                                  self.class_request();
                                                  self.subjects_request();
                                                   self.intnit_sex();
                                        $('.gt-membersIcoBox').each(function(){
                                            var id=$(this).data('id');
                                            if(id===1){
                                             $(this).hide();
                                            }else{
                                                    $(this).hide();
                                            }

                                        })
                                                  
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                   
         })           
                               /*      删除科目    */
                               $(document).on('click','#gt-listDatepre .gt-delfater',function(){
                                   console.log(0)
                                $(this).parent().remove();

                            })
                                 

                              $('.gt-revisions').on('click','#gt-addSeb',function(){
                                           
                                                
                                                 var llogdat=$("#gt-BoxsubList .gt-IFselr").size();
                                                 if( llogdat<self.arrySubID.length){
                                                    var html='';
                                                    for(var i=0;i<self.arrySubID.length;i++){
                                                        html+= "<option class='gt-list'  data-id="+self.arrySubID[i] +" value=''>"+self.arrySub[i] +"</option>"   
                                                    } 
                                                      var htmlBox="<div class='gt-sbjLtse'>\
                                                          <span  class='gt-rveYear gt-multid'><select name='' class='gt-rveYearSlec gt-subjects gt-IFselr'><option class='gt-list'   value=''>请选择科目</option>"+ html+"</select></span>\
                                                          <input  class='gt-textInput' type='text' value=''>\
                                                          <span>分</span> <div  class='gt-delfater'><span>点击删除</span></div>  </div> "
                                                        $('#gt-addgt-BoxsubList').append(htmlBox);
                                                 }else{
                                                     return;
                                                 }
                                             
                                                  
                                                   })   
                      /*    保存 */
                               $('#gt-revisions').on('click','#gt-IfaddStudents',function(){
                                          self.analysis=[];
                                           self.parents=[];
                                         
                                   console.log('学生id'+self.studentId)
                                  var studentName= $('#gt-IFinput1').val();
                                   var studentPhone= $('#gt-IFinput3').val();
                                    var school= $('#gt-IFinput2').val();
                                    var gradeId= $('#gt-grade2 option:selected').data('id');
                                    var sex=$('#gt-idsex').data('sex');
                                     var address=$('#gt-IFinput6').val();
                                   var  email=$('#gt-IFinput4').val();
                                     var studentAnalysis=$('#gt-IFinput7').val();
                                     

                                     if(gradeId==''||gradeId==undefined||gradeId==null){
                                          alert('选择班级')
                                         return;
                                     }
                                  



                                      
                                                    /*  学科添加传的参数 */
                                      $('#gt-revisions .gt-IFselr').each(function(){
                                          var  obj={};
                                           var date1= $(this).find('option:selected').data('id');
                                           var dataCoser=$(this).parent().next().val();
                                              obj.subjectId=date1;
                                              obj.score=dataCoser;
                                           self.analysis.push(obj);
                                        

                                      })               /*  学科分析修改传的参数 */
                                                $('#gt-revisions .gt-IFsubject').each(function(){
                                          var  obj={};
                                           var id=$(this).data('id');
                                           console.log(id)
                                            var subjectid=$(this).find('option:selected').data('id');
                                           var dataCoser=$(this).parent().next().val();
                                              obj.id=id;
                                              obj.subjectId=subjectid;
                                              obj.score=dataCoser;
                                             self.analysis.push(obj);
                                          

                                      })
                                                  /*  家长关系 修改传的参数*/
                                             $('#gt-revisions .gt-IFinList').each(function(){
                                                      var  obj={};
                                              var parentName=$(this).val();
                                                var parentCall=$(this).parent().parent().find('.gt-IFinList2').val();
                                                   var phone=$(this).parent().parent().find('.gt-IFinList3').val();
                                                    var id=$(this).data('id')
                                              obj.id=id;
                                              obj.parentName=parentName;
                                              obj.parentCall=parentCall;
                                               obj.phone=phone;
                                            self.parents.push(obj);
                                           

                                             })
                                           /*  添加家长关系 传的参数*/
                  
                                             $('#gt-revisions .gt-IFaddLIst').each(function(index){
                                                      var  obj={};
                                              var parentName=$(this).val();
                                                var parentCall=$(this).parent().parent().find('.gt-IFaddLIst2').val();
                                                   var phone=$(this).parent().parent().find('.gt-IFaddLIst3').val();      
                                              obj.parentName=parentName;
                                              obj.parentCall=parentCall;
                                               obj.phone=phone;
                                              self.parents.push(obj);
                                            

                                             })
                                    var students= [
                                         {
	                                               id:self.studentId, 
				                          studentName:studentName, 
   				                    	  studentPhone: studentPhone, 
    					                      headImage:'',      
    					                         school:school, 
   					                           gradeId:gradeId, 
   				                                   sex:sex, 
    				                           address:address, 
    			                       	         email: email, 
    					               studentAnalysis:studentAnalysis, 
   					                    // onceIntention:'', 
  					                    //  nowIntention:'', 
    				                    //         train:'', 
    					                //       classId:'', 
                                       analysis:self.analysis
                                         }
                                
                                    ];
                        
                                    
                          var  parents=self.parents;             
                                  students=JSON.stringify(students);
                                  parents=JSON.stringify(parents);

                                 console.log(students)
                                   console.log(parents)


                                $.ajax({
                                       url:url+'/ newStudent.do',
                                        data:{  
                                             students: students,
                                              parents:  parents,

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                //   self.findStudent_rend(res.data);
                                                   self.gt_overdue();
                                                    self.titel();
                                        $('#gt-trans', parent.document).hide();
                                        $('.gt-trans').hide();
                                        $('#gt-revisions').hide();
                                        $('#gt-revisions').html(' ');
                                        $('#gt-addgt-BoxsubList').html(' ');
                                         self.findStudent();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                  

                           })


                                    /*  添加家长 */
                           $('#gt-revisions').on('click','#gt-IFaddprent',function(){
                                     html= " <div class='gt-perDiv gt-multidMargi gt-parenMort'>\
      <span class='gt-parenNameSpan'>姓名 : </span> <span class='gt-parenName'><input class='gt-IFaddLIst' value='' type='text'></span> \
      <span class='gt-multidMargi'>关系 : </span></span> <span class=' gt-parenName'><input class='gt-IFaddLIst2' value=''  type='text'></span>  \
      <span class='gt-phtoe'>联系电话 : </span> <span class='gt-parenName'><input class='gt-IFaddLIst3 gt-parenNameIput' value=''  type='text'></span> \
      </div> "
                                
                               $(' #gt-revisions #gt-IFprent').append(html);
                           })

                          /*  关闭 */
                        $('#gt-revisions').on('click','#gt-canLive',function(){
                               $('#gt-trans', parent.document).hide();
                                        $('.gt-trans').hide();
                                        $('#gt-revisions').hide();
                                        $('#gt-revisions').html(' ');
                                        $('#gt-addgt-BoxsubList').html(' ');
                          })


                /* 分班 */
                $('#gt-table1').on('click','.gt-tablelist2',function(){
                     
                    self.stdentName=$(this).parent().data('studentname');
                   self.stdentCade=$(this).parent().data('studentno');

                     self.enrollid='';
                    $('.gt-trans').show();
                     $('#gt-trans', parent.document).show();
                    $('#gt-divideCl').show();
                       self.studentId=$(this).parent().data('id');
                       console.log(self.studentId)
                       $.ajax({
                                       url:url+'/findSignUpByStudent.do',
                                        data:{
                                            studentId:self.studentId,                                           
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){  
                                            console.log('888')                                     
                                          console.log(res)
                                             if(res.code===100){
                                                 $('#gt-sduten-deail').html(
                                                     "\
                                                 <span>"+self.stdentCade +"-"+  self.stdentName+"</span> <span>(分班)</span></span>\
                                                 "
                                                )

                                                 var html='';
                                                 var data=res.data;
                                                  
                                               for(var i=0;i<data.length;i++){
                                                   html+="<option data-enrollid="+data[i].enrollId+" value=''>"+ data[i].className+"("+data[i].levelName+")</option> " 
                                                   $('#gt-rveYearSlec').html(html);
                                                    self.enrollid=data[0].enrollId;
                                               }
                                                  
                                                console.log('分班')
                                                console.log(self.enrollid)
                                             self.findTeamList(self.enrollid)
                                             }else{
                                                 $('#gt-divTables').html('');
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                })


                  


                        
                    // 选择性别
                    $(document).on('click','#gt-man',function(){
                        $(this).find('.gt-round').removeClass('gt-roundRad');
                         $(this).find('.gt-round').addClass('gt-roundRB');
                        $(this).next().find('.gt-round').addClass('gt-roundRad');
                          $(this).next().find('.gt-round').removeClass('gt-roundRB');
                          $('#gt-sexdata').html("<i id='gt-idsex' data-sex='0'><i>")
                    })
                         $(document).on('click','#gt-woman',function(){
                        $(this).find('.gt-round').removeClass('gt-roundRad');
                         $(this).find('.gt-round').addClass('gt-roundRB');
                         $(this).prev().find('.gt-round').addClass('gt-roundRad');
                          $(this).prev().find('.gt-round').removeClass('gt-roundRB');
                          $('#gt-sexdata').html("<i id='gt-idsex' data-sex='1'><i>");
                    })

                //    分班选择
                       $('#gt-divTables').on('click','.gt-square',function(){
                           if(!$(this).hasClass('gt-squareImg')){
                             $('.gt-square').removeClass('gt-squareImg');
                           $('.gt-square').find('span').removeClass('gt-squareImgHook');
                           $(this).addClass('gt-squareImg');
                           $(this).find('span').addClass('gt-squareImgHook');
                            var text=$(this).parent().next().text();
                            var id=$(this).parent().next().data('id');
                         console.log(text)
                          console.log('班级id'+id);
                          $('#gt-choseHas').attr('data-id',id);
                          
                          $('#gt-choseHas').text(text);
                           }else{
                             $('.gt-square').removeClass('gt-squareImg');
                           $('.gt-square').find('span').removeClass('gt-squareImgHook');
                          
                          $('#gt-choseHas').attr('data-id','');
                          $('#gt-choseHas').text('');
                           }
                          
                       })

                    //   下拉选择已报课程
                      
                    $('#gt-rveYearSlec').change(function(){
                                       console.log('abcde')
                            
                               self.enrollid= $('#gt-rveYearSlec option:selected').data('enrollid');
                                   

                                  
                                    console.log('下拉选择')
                                self.findTeamList(self.enrollid);

                                 })
                            //分班分页
                           
                            

                            $(document).on('click','#gt-homepg',function(){
                      self.enrollid= $('#gt-rveYearSlec option:selected').data('enrollid');
                               $.ajax({
                                        url:url+'/findTeamListByEnrollId.do',
                                        data:{
                                    enrollId:self.enrollid,
                                      curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.delf_rend(res.data);
                                                  self.titel();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })


                             $(document).on('click','#gt-nextpg',function(){
                               $.ajax({
                                        url:url+'/findTeamListByEnrollId.do',
                                        data:{
                                      enrollId:self.enrollid,
                                      curPage:self.currentPg+1,                                 
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.delf_rend(res.data);
                                                  self.titel();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

                    //  确定fen班
                    $(document).on('click','#gt-suer-confirm',function(){
                        
                            var id=$('#gt-choseHas').data('id');
                            console.log('4班级id'+id);
                            console.log('5学员id'+self.studentId)
                           
                                 $.ajax({
                                       url:url+'/addStudentTeam.do',
                                        data:{
                                            teamId:id, 
                                            studentId:self.studentId,                                          
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                           
                                               $('.gt-trans').hide();
                                            $('#gt-trans', parent.document).hide();
                                            $('#gt-divideCl').hide();

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                            


                    })
                    // 取消fenban
                     $(document).on('click','.gt-cancelled',function(){
                        $('#gt-divideCl').hide();
                         $('#gt-trans', parent.document).hide();
                       $('.gt-trans').hide();

                     })


          
                 /* 转班 */
                $(document).on('click','.gt-tablelist3',function(){
                      
                 self.stdentName=$(this).parent().data('studentname');
                 self.stdentCade=$(this).parent().data('studentno');
                       self.studentId=$(this).parent().data('id');
                      $('#gt-trans', parent.document).show();
                   $('.gt-trans').show();
                    $('#gt-transfe').show();
                           console.log(self.studentId)
                      $.ajax({
                                       url:url+'/findStudentTeam.do',
                                        data:{
                                             studentId:self.studentId,                                   
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){  
                                                                       
                                          console.log(res)
                                             if(res.code===100){

                                                 $('.gt-classNameAnd').html(
                                                     "\
                                                 <span>"+self.stdentCade +"-"+  self.stdentName+"</span> </span>\
                                                 "
                                                )
                                           /*  res.data.studentTeamId 分班表id  */
                                           /*   res.data.enrollid 报名活动id */
                                           /*    res.data.id 所在班级id */
                                             var html=''
                                           for(var i=0;i<res.data.length;i++){
                                  html+=" <option value='' data-id="+ res.data[i].id+" data-enrollId="+ res.data[i].enrollId +" data-studentteamid="+ res.data[i].studentTeamId +">"+ res.data[i].teamName +"</option> "      
                                 $('#gt-hasClass').html(html);
                                        }

                                             console.log('转班')
                                               var id= $('#gt-hasClass option:selected').data('id');
                                               console.log( "所在班级"+id)
                                               var enrollid= $('#gt-hasClass option:selected').data('enrollid');
                                                console.log('活动'+enrollid)   
                                            
                                                self.findTeamClass(enrollid);
                                             } 
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    })                                
                })

                 //  确定转班
                        $(document).on('click','#gt-yesSure',function(){
                                 var  studentTeamId=$('#gt-hasClass option:selected').data('studentteamid');
                                            var  turnOutTeamId=$('#gt-hasClass option:selected').data('id');
                                            var turnInTeamId= $('#gt-transfer').data('id');
                                            console.log('学生id'+self.studentId)
                                            console.log('所在班级id'+ turnOutTeamId)
                                                console.log('转入班级id'+turnInTeamId)
                                                console.log('分班列表'+studentTeamId)

                          if(turnInTeamId){
                                   $.ajax({
                                       url:url+'/studentTurn.do',
                                        data:{
                                    studentId :self.studentId,
                                    turnOutTeamId: turnOutTeamId,

                                    turnInTeamId :turnInTeamId,

                                    studentTeamId :studentTeamId,  
                              
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){  
                                        console.log('确定转班')                                     
                                          console.log(res)
                                             if(res.code===100){
                                                    $('#gt-trans', parent.document).hide();
                                                 $('.gt-trans').hide();
                                                  $('#gt-transfe').hide();
                                            

                                             } 
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                          }else{
                              alert('选择班级')
                          }


                        })



                   //转班分页 首页
                   
                            $(document).on('click','#gt-homepg2',function(){
                                       self.enrollid= $('#gt-hasClass option:selected').data('enrollid');
                               $.ajax({
                                        url:url+'/findTeamListByEnrollId.do',
                                        data:{
                                       enrollId:self.enrollid,
                                       curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.transfer_rend(res.data);
                                                  self.selected_eche();    
                                                
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

                                        //  下一页
                             $(document).on('click','#gt-nextpg2',function(){
                                   self.enrollid= $('#gt-hasClass option:selected').data('enrollid');
                               $.ajax({
                                        url:url+'/findTeamListByEnrollId.do',
                                        data:{
                                        enrollId:self.enrollid,
                                      curPage:self.currentPg+1,                                 
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   self.transfer_rend(res.data);   
                                                    self.selected_eche();                                           
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

                            // 下拉转班              
                    $('#gt-hasClass').change(function(){
                                            self.enrollid= $('#gt-hasClass option:selected').data('enrollid');
                               $.ajax({
                                        url:url+'/findTeamListByEnrollId.do',
                                        data:{
                                       enrollId:self.enrollid,
                                                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self.transfer_rend(res.data);
                                                  self.selected_eche();    
                                                
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                                                 
                    })

                  //    转班选择
                       $(document).on('click',' #gt-table6 .gt-square',function(){
                           if(!$(this).hasClass('gt-squareImg')){
                               $('.gt-square').removeClass('gt-squareImg');
                           $('.gt-square').find('span').removeClass('gt-squareImgHook');
                           $(this).addClass('gt-squareImg');
                           $(this).find('span').addClass('gt-squareImgHook');
                            var text=$(this).parent().next().text();
                            var id=$(this).parent().next().data('id');
                         console.log(text)
                          $('#gt-transfer').attr('data-id',id);
                          $('#gt-transfer').text(text);
                          console.log('转入id'+id)
                           }else{
                                $('.gt-square').removeClass('gt-squareImg');
                                $('.gt-square').find('span').removeClass('gt-squareImgHook');                          
                               $('#gt-transfer').attr('data-id',' ');
                               $('#gt-transfer').text(' ');
                              console.log('转入id'+id) 
                              console.log(text)
                           }
                       })

                      
                           



                      /*   出勤情况 */
              $(document).on('click','.gt-tablelist4',function(){
                    self.stdentName=$(this).parent().data('studentname');
                   self.stdentCade=$(this).parent().data('studentno');
                     $('.gt-classNameAnd').html( "<span>"+self.stdentCade +"-"+  self.stdentName+"</span> </span> ")
                     self.studentId=$(this).parent().data('id');
                     $('#gt-trans', parent.document).show();
                   $('.gt-trans').show();
                   $('.gt-trans').show();
                    $('#gt-attendance').show();
                
                      console.log(self.studentId)
                   $.ajax({
                                       url:url+'/findAttendanceByStudent.do',
                                        data:{
                                             studentId:self.studentId,                                   
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){  
                                                                       
                                             console.log(res)
                                             if(res.code===100){
                                               
                                               self.attendance_rend(res.data);
                                                $('#gt-attendance .gt-list').each(function(){
                                                   var status= $(this).data('status');
                                                   if(status==0){
                                                      $(this).text('到课');
                                                   }else{
                                                       $(this).text('请假');
                                                   }
                                                })

                                        }else{
                                              $('#gt-attend').html('');
                                        }
        
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                       


                })

                  //出勤情况分页 首页
                   
                            $(document).on('click','#gt-homePg4',function(){
                                     
                               $.ajax({
                                        url:url+'/findAttendanceByStudent.do',
                                        data:{
                                      studentId:self.studentId, 
                                       curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 
                                                self.attendance_rend(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

                                        //  下一页
                             $(document).on('click','#gt-nextPg4',function(){
                                  
                               $.ajax({
                                        url:url+'/findAttendanceByStudent.do',
                                        data:{
                                      studentId:self.studentId, 
                                      curPage:self.currentPg+1,                                 
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                    self.attendance_rend(res.data);                                      
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })



              /*    转班记录 */
                     $(document).on('click','.gt-tablelist5',function(){
                            self.studentId=$(this).parent().data('id');
                   $('#gt-trans', parent.document).show();
                   $('.gt-trans').show();
                 $('#gt-trans', parent.document).show();
                    $('#gt-tranNotes').show();

              console.log(self.studentId)
                   $.ajax({
                                       url:url+'/findTurnList.do',
                                        data:{
                                             studentId:self.studentId,                                   
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){  
                                                                       
                                             console.log(res)
                                             if(res.code===100){
                                              self.TurnList(res.data)
                                        }
        
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                       
                })

                     
                //转班记录分页 首页
                   
                            $(document).on('click','#gt-homePg3',function(){
                                     
                               $.ajax({
                                        url:url+'/findTurnList.do',
                                        data:{
                                      studentId:self.studentId, 
                                       curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 
                                                self.TurnList(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

                                        //  下一页
                             $(document).on('click','#gt-nextPg3',function(){
                                  
                               $.ajax({
                                        url:url+'/findTurnList.do',
                                        data:{
                                      studentId:self.studentId, 
                                      curPage:self.currentPg+1,                                 
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                    self.TurnList(res.data);                                      
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })


                     /*  停课 */
                    $(document).on('click','.gt-tablelist6',function(){
                        self.stdentName=$(this).parent().data('studentname');
                      self.stdentCade=$(this).parent().data('studentno');
                     $('.gt-classNameAnd').html( "<span>"+self.stdentCade +"-"+  self.stdentName+"</span> </span> ")
                    self.studentId=$(this).parent().data('id');
                    $('#gt-trans', parent.document).show();
                    $('.gt-trans').show();
                    $('#gt-stopClass').show();
                    console.log(self.studentId)
                               $.ajax({
                                        url:url+'/findClassPinList.do',
                                        data:{
                                      studentId:self.studentId, 
                                       status:'0',                              
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.suspended_rend(res.data);    
                                                /*  遍历状态   */      
                                                $('#gt-table8 .gt-list').each(function(){
                                                    var dataNb=$(this).data('status');
                                                    if(dataNb=='0'){
                                                         $(this).text('正常');
                                                    }else{
                                                           $(this).text('停课');
                                                    }
                                                })                       
                                             }else{
                                                 $('#gt-table8').html('');
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                    
                })



                   /*  选择停课科目 */
                   $(document).on('click','#gt-table8 .gt-square',function(){
                        if(!$(this).hasClass('gt-squareImg')){
                           $('.gt-square').removeClass('gt-squareImg');
                           $('.gt-square').find('span').removeClass('gt-squareImgHook');
                           $(this).addClass('gt-squareImg');
                           $(this).find('span').addClass('gt-squareImgHook');
                          var text= $(this).parent().next().next().text();
                           var id=$(this).parent().next().next().data('id');
                            $('#gt-hasclass2').text(text);
                            // 课销id
                             $('#gt-hasclass2').attr('data-id',id);
                             $('')
                             console.log(id)
                        }else{
                            $('#gt-table8 .gt-square').removeClass('gt-squareImg');
                            $('#gt-table8 .gt-square').find('span').removeClass('gt-squareImgHook');
                           $('#gt-hasclass2').text('');
                           $('#gt-hasclass2').attr('data-id','');
                        }
                     
                   })
                    // 确定停课
                    $(document).on('click','#gt-choosSuspended',function(){
                     self.stdentName=$(this).parent().data('studentname');
                   self.stdentCade=$(this).parent().data('studentno');
                     $('.gt-classNameAnd').html( "<span>"+self.stdentCade +"-"+  self.stdentName+"</span> </span> ")
                           $('#gt-trans', parent.document).hide();
                          $('.gt-trans').hide();
                        $('#gt-stopClass').hide();
                        var idClass= $('#gt-hasclass2').data('id');
                        if(idClass){
                        $.ajax({
                                        url:url+'/updateClassPinStatus.do',
                                        data:{
                                      id:idClass, 
                                       status:'1',                              
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                                     
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                        }
                         console.log(idClass)
                        console.log('停课')
                        
                    })




                 /*   复课 */
                      $(document).on('click','.gt-tablelist7',function(){
                     self.stdentName=$(this).parent().data('studentname');
                      self.stdentCade=$(this).parent().data('studentno');
                     $('.gt-classNameAnd').html( "<span>"+self.stdentCade +"-"+  self.stdentName+"</span> </span> ");
                       self.studentId=$(this).parent().data('id');
                    $('.gt-trans').show();
                    $('#gt-trans', parent.document).show();
                    $('#gt-reopened').show();
                    console.log(self.studentId)
                         $.ajax({
                                        url:url+'/findClassPinList.do',
                                        data:{
                                      studentId:self.studentId, 
                                       status:'1',                              
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.reopened_rend(res.data);  
                                                      $('#gt-table9 .gt-list').each(function(){
                                                    var dataNb=$(this).data('status');
                                                    console.log(dataNb)
                                                    if(dataNb=='0'){
                                                         $(this).text('正常');
                                                    }else{
                                                           $(this).text('停课中');
                                                    }
                                                })                                    
                                             }else{
                                                 $('#gt-table9').html(' ')
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                    


                   })

                    /*  选择复课科目 */
                   $(document).on('click','#gt-table9 .gt-square',function(){
                        if(!$(this).hasClass('gt-squareImg')){
                           $('.gt-square').removeClass('gt-squareImg');
                           $('.gt-square').find('span').removeClass('gt-squareImgHook');
                           $(this).addClass('gt-squareImg');
                           $(this).find('span').addClass('gt-squareImgHook');
                          var text= $(this).parent().next().next().text();
                           var id=$(this).parent().next().next().data('id');
                            $('#gt-haschooseClas').text(text);
                             $('#gt-haschooseClas').attr('data-id',id);
                             console.log(id);
                        }else{
                            $('#gt-table9 .gt-square').removeClass('gt-squareImg');
                            $('#gt-table9 .gt-square').find('span').removeClass('gt-squareImgHook');
                           $('#gt-haschooseClas').text('');
                           $('#gt-haschooseClas').attr('data-id','');
                        }
                     
                   })
                    //  确定复课
                      
                   $(document).on('click','#gt-reopenedSuer',function(){
                             $('.gt-trans').hide();
                             $('#gt-trans', parent.document).hide();
                             $('#gt-reopened').hide();
                                   var idClass= $('#gt-haschooseClas').data('id');
                                   if(idClass){
                            $.ajax({
                                        url:url+'/updateClassPinStatus.do',
                                        data:{
                                      id:idClass, 
                                       status:'0',                              
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                                     
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                   }
                               

                   })
                /*  退学 */
                      $(document).on('click','.gt-tablelist8',function(){
                    $('.gt-trans').show();
                    $('#gt-trans', parent.document).show();
                    $('#gt-dropOut').show();
                   self.studentNo=$(this).parent().data('studentno');


                   })
                           
                   $("#gt-dropOut").on('click','#gt-leave',function(){
                      $('.gt-trans').hide();
                    $('#gt-trans', parent.document).hide();
                    $('#gt-dropOut').hide();
                      $('.gt-centrTontr').hide();
                    top.frames['gt-retw'].retunlis(self.studentNo);
                     $('iframe', parent.document).hide();
                         
                     $('#gt-ret', parent.document).show();
                   
                       

                   })


                    // 学员档案详情
                    $(document).on('click','.gt-details',function(){
                         self.stdentName=$(this).parent().data('studentname');
                   self.stdentCade=$(this).parent().data('studentno');
                     $('.gt-classNameAnd').html( "<span>"+self.stdentCade +"-"+  self.stdentName+"</span> </span> ")
                           self.studentId=$(this).parent().data('id');
                           console.log(self.studentId)
                     
                   $('.gt-trans').show();
                   $('#gt-trans', parent.document).show();
                    $('.gt-detailList').show();

                       $.ajax({
                                       url:url+'/fromStudent.do',
                                        data:{
                                            studentId:self.studentId,                                           
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                            self.deali_rend(res.data);
                                            var list=res.data.parents;
                                            var html='';
                                            for(var i=0;i<list.length;i++){
                                 html+=" <div class='gt-paprentDate'> \
                        <span>家长姓名 :&nbsp</span><span>"+list[i].parentName+"</span> \
                        <span class='gt-Space'>关系 :&nbsp </span><span>"+list[i].parentCall+"</span>\
                        <span class='gt-Space'>联系电话 :&nbsp</span> <span>"+list[i].phone+"</span>\
                        <span  data-memberid="+list[i].memberId+" class='gt-membersIcoBox gt-Space' >\
                       <span class='gt-membersIco'><img src='../image/ico/u14422.png' alt=''></span><span class='gt-membersIcoMg'>已经成为会员</span></span>\
                        </div> "
                                                         }
                                   $('#gt-deailBox').html(html);
                                        
                                    self.sexAndclass();

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                    })


              
        },
                 sexAndclass:function(){
                             var cade=$('.gt-galdCade').text();
                             if(!cade){
 
                                 $('.gt-galdCade').text('');
                             }
                     
                      $('.gt-membersIcoBox').each(function(){
                                           
                                            var id=$(this).data('id');
                                            if(id==1){
                                             $(this).hide();
                                            }else{
                                                    $(this).hide();
                                            }

                                        })


       $('.gt-detaildata .gt-sexList').each(function(){
                 var text=$(this).data('sex');
               
                 if(text===0){
                      $(this).text('男');
                 }else{
                      $(this).text('女');
                 }
              })


                 },
                intnit_sex:function(){
                  var text = $('#gt-sex').data('sex')
                     
                       console.log(text)
                   if(text===0){
                       $('#gt-man').find('.gt-round').removeClass('gt-roundRad');
                         $('#gt-man').find('.gt-round').addClass('gt-roundRB');
                        $('#gt-man').next().find('.gt-round').addClass('gt-roundRad');
                          $('#gt-man').next().find('.gt-round').removeClass('gt-roundRB');
                   }else{
                         $('#gt-woman').find('.gt-round').removeClass('gt-roundRad');
                         $('#gt-woman').find('.gt-round').addClass('gt-roundRB');
                         $('#gt-woman').prev().find('.gt-round').addClass('gt-roundRad');
                        $('#gt-woman').prev().find('.gt-round').removeClass('gt-roundRB');
                   }

                } ,
            // 年级
        class_request:function(){
            var self=this;
                   $.ajax({
                                 url:url+'/findGradeAllList.do',
                                 data:{
                                                                                 
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){ 
                                              console.log('年级')                                        
                                          console.log(res)
                                             if(res.code===100){
                                                 var data=res.data
                                                 var html=''
                                                  for(var i=0;i<data.length;i++){
                                                      html+= "<option class='gt-lists' data-id="+data[i].id +" value=''>"+data[i].gradeName +"</option>"
                                                    
                                                  }
                                                 $('#gt-grade2').html('<option class="gt-lists"  value="">请选择班级</option>'+html)
                                                 self.class_ecche();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
        },
    // 年级 科目遍历   
    class_ecche:function(){
    $('#gt-grade2 .gt-lists').each(function(){
        var text=$('#gt-grade2').data('gradeid');
      
        if($(this).data('id')===text){
               $(this).attr('selected',"selected");    
        }      


    })
 
         
    
    }  ,                    
    // 科目
 subjects_request:function(){
     var self=this;
                   $.ajax({
                                 url:url+'/findSubjectAllList.do',
                                 data:{
                                                                                 
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){  
                                            console.log('科目')                                     
                                          console.log(res)
                                             if(res.code===100){
                                                 var data=res.data
                                                 var html=''
                                                  for(var i=0;i<data.length;i++){
                                                      html+= "<option class='gt-list' data-id='"+ data[i].id+"'  value=''>"+data[i].subjectName +"</option>"
                                                        self.arrySub.push(data[i].subjectName);
                                                         self.arrySubID.push(data[i].id);
                                                  } 
                                                      $('.gt-subjects').html(html);

                                            
                                                   $('.gt-subjects .gt-list').each(function(){
                                                        var text=$(this).data('id');
                                                        var inputId=$(this).parent().parent().next().data('id')
                                                        // console.log('dededwd'+text)
                                                        // console.log('dededwd'+inputId)
                                                        if(inputId==text){ 
                                                            $(this).attr('selected' ,"selected");  
                                                           
                                                        }
                                
                                                    })     

                                          
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                                     $('.gt-subjects ').change(function(){
                                                              
                                     $(this).parent().parent().next().val('');
                                 })

 
        },
     /*  数据初始化 请求  */
     findStudent:function(){
             var self=this;
             $.ajax({
                                       url:url+'/findStudentList.do',
                                        data:{
                                            curPage:1,                                
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){  
                                            console.log('学员信息')                                     
                                          console.log(res)
                                             if(res.code===100){
                                            self.findStudent_rend(res.data);
                                            self.gt_overdue();
                                             self.titel();
                                               
                                                

                                             }else{
                                                 $('#gt-table1').html('<tr class="gt-dataTr">\
                              <td class="gt-Edatli0 gt-onClick">来源\
                          </td><td class="gt-Edatli1">学号</td><td class="gt-Edatli2">姓名</td>\
                          <td class="gt-Edatli3">性别</td><td  class="gt-Edatli4">联系电话</td>\
                           <td class="gt-Edatli5">班级</td><td class="gt-Edatli6 gt-onClick ">状态\
                         </td><td class="gt-Edatli6">操作</td></tr>\
                         '   
                         ); 
                         self.titel();                  
                        }
                                                                   
                                      },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

     },
        // 遍历状态
       gt_overdue:function(){
        //    来源
             $('#gt-table1 .gt-form').each(function(){
                 var text=$(this).data('trom');
               
                 if(text===0){
                      $(this).text('微信');
                 }else{
                      $(this).text('前台');
                 }
              })

                  
              $('#gt-table1 .gt-overdue').each(function(index){
                 var text= $(this).data('overdue');
                 if(text==='n'){
                      $(this).text('结业');
                 }else{
                      $(this).text('在读');
                 }
              })

              $('#gt-table1 .gt-Boxsex').each(function(){
                 var text=$(this).data('sex');
               
                 if(text===0){
                      $(this).text('男');
                 }else{
                      $(this).text('女');
                 }
              })
               

                 $('#gt-table1 .gt-tableUl').each(function(index){
                 var text= $(this).data('overdue');
                 if(text==='n'){
                     $(this).parent().css("height",'136px');
                      $(this).html(' <li class="gt-tablelist">修改信息</li>\
                                       <li class="gt-tablelist4">出勤情况</li>\
                                       <li class="gt-tablelist5">转班记录</li>\
                                        <li class="gt-details gt-tablelist9">详情</li>'             
                    )
                                    
                 }else{
                      $(this).html(' <li class="gt-tablelist">修改信息</li>\
                                      <li class="gt-tablelist2">分班</li>\
                                      <li class="gt-tablelist3">转班</li>\
                                       <li class="gt-tablelist4">出勤情况</li>\
                                       <li class="gt-tablelist5">转班记录</li>\
                                       <li class="gt-tablelist6">停课</li>\
                                       <li class="gt-tablelist7">复课</li>\
                                       <li class="gt-tablelist8">退学</li>\
                                        <li class="gt-details gt-tablelist9">详情</li>'
                    )
                                       $(this).parent().css("height",'270px');
                 }
              })

       },   
               /*    转班已选班级遍历 隐藏*/
               selected_eche:function(){
                   
                  var  text=$('#gt-hasClass option:selected').data('id');
                  text=text.toString();
                  console.log(text)
                  $('#gt-table6 .gt-haveBeen').each(function(index){
                      var data=$(this).data('id');
                     data= data.toString()
                     console.log(data)
                    if(data===text){
                     $(this).parent().hide();

                    }
                  

                  })

                },  




            // 分班已报课程班级集合
            findTeamList:function(res){
                var self=this;
                console.log('活动ID'+res)
                $.ajax({
                                 url:url+'/findTeamListByEnrollId.do',
                                 data:{
                                         enrollId:res,                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                
                                                self.delf_rend(res.data);
                                                
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

            },  
                
             // 转班已报课程班级集合
            findTeamClass:function(res){
                var self=this;
                console.log('活动ID'+res)
                $.ajax({
                                 url:url+'/findTeamListByEnrollId.do',
                                 data:{
                                        enrollId:res,                
                                      curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){        
                                             self.transfer_rend(res.data);
                                             self.selected_eche();
                                                
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

            },  
            
              // 停课
           suspended_rend:function(data){
              
        
                // 获取html的模板
                var htmlTpl = $('#table8').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data});
             
                $('#gt-table8').html(htmlStr);
              
                
            },  
              // 复课
         reopened_rend:function(data){
                
                var htmlTpl = $('#table9').html();
                // 生成html字符串，用于渲染
               var htmlStr = _.template(htmlTpl)({list:data});
             
                $('#gt-table9').html(htmlStr);
              
                
            },  

             // 分班
           delf_rend:function(data){
                console.log(data.subList);
                  var self=this;

                    for(var i=0;i<data.subList.length;i++){
                           data.subList[i].startDate=(new Date(data.subList[i].startDate).Format("yyyy-MM-dd "));  
                            //  data.subList[i].endDate=(new Date(data.subList[i].endDate).Format("yyyy-MM-dd "));                     
                                        
                                 }
        
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
        
                // 获取html的模板
                var htmlTpl = $('#table4').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data.subList});
             
                $('#gt-divTables').html(htmlStr);
               $('#gt-showpg').text(self.currentPg);
                
            },  
            // 转班渲染
           transfer_rend:function(data){
                 var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
                console.log(data)
                  console.log( "page"+self.currentPg)
                // 获取html的模板
                var htmlTpl = $('#table6').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data.subList});
                $('#gt-table6').html(htmlStr);
                 $('#gt-showpg2').text(self.currentPg);
                
            },  
            // 修改信息渲染
             revisions_rend:function(data){
                // 获取html的模板
            
                var htmlTpl = $('#table3').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data});
              
                $('#gt-revisions').html(htmlStr);
               
                
            },  

             // 转班记录渲染
           TurnList:function(data){
                 var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
                console.log(data)
                  console.log( "page"+self.currentPg)
                // 获取html的模板
                var htmlTpl = $('#table10').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data.subList});
              
                $('#gt-tranNotesList').html(htmlStr);
                $('#gt-showPg3').html(self.currentPg);
               
                
            },  
            // 出勤情况渲染
            attendance_rend:function(data){
                var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
        
                // 获取html的模板
                var htmlTpl = $('#table7').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data.subList});
                $('#gt-attend').html(htmlStr);
               $('#gt-homeShow4').html(self.currentPg);
                
            },  
            // 详情
            deali_rend:function(data){
                
                // 获取html的模板
                var htmlTpl = $('#table2').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data});
                // 执行渲染，使用append是为了使该渲染方法得以复用
                $('#gt-table2').html(htmlStr);
               
                
            },                     
      findStudent_rend: function(data){
                var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
        
                // 获取html的模板
                var htmlTpl = $('#table1').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data.subList});
                // 执行渲染，使用append是为了使该渲染方法得以复用
                $('#gt-table1').html(htmlStr);
                $('#gt-showPg1').text(self.currentPg);
                
            },


    };
    information.initi();
})()


