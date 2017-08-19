console.log(54255);
(function(){
    var enronName={
       initi:function(){
            this.returned();
            this.subjecId=[];
            this.subjectNames=[];
             this.analysis=[];
            this.parents=[];
            this.htmlBox=''
            this.indexarry=[];
                
           },
       
           returned:function(){
             var self=this;
        
                         $('#gt-deAdmincenter', parent.document).click(function(){
                        //  $('#gt-homeOne', parent.document).show();
                        //  $('#gt-homeOne', parent.document).siblings().hide();
                        //  $('.gt-deails', parent.document).hide();
                         /*     本页面刷新   */ 
                            // location.reload() ;

                                     $('#gt-IFinput1').val('');
                                   $('#gt-IFinput3').val('');
                                   $('#gt-IFinput2').val('');
                                   $('#gt-BoxsubList').html('');
                               
                                  $('#gt-IFinput6').val('');
                                  $('#gt-IFinput4').val('');
                                    $('#gt-IFinput7').val('');
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
                                               $('#gt-Bselect').html("+<option value=''  > 请选择年级</option>+"+html);
                                                  allSbj();

                                            
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

          
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
                                               self.subjecId.push(res.data[i].id);
                                            self.subjectNames.push(res.data[i].subjectName);
                                        }
                                               $('#gt-Bsbujs').html("<option value='' >选择科目</option>"+html);

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                  }
                               
                /*   选择性别 */
                $('#gt-Bman').on('click',function(){
                     $('.gt-round').removeClass('gt-roundRB');
                     $(this).addClass('gt-roundRB');
                     $('#gt-Bsex').attr('data-sex','0')
                    
                })
                     $('#gt-BWoman').on('click',function(){
                     $('.gt-round').removeClass('gt-roundRB');
                     $(this).addClass('gt-roundRB');
                     $('#gt-Bsex').attr('data-sex','1')
                    
                })

            /*   添加科目 */
                 
              $('#gt-BaddSbj').on('click',function(){
                                     var llogdat=$(".gt-BselecList").size();
                               
                                   
                                             if(llogdat===0){
                                                
                                                var html=''
                                                for(var i=0;i<self.subjecId.length;i++){
                                        html+=" <option value=''  data-id="+ self.subjecId[i]+" >"+ self.subjectNames[i] +"</option> "      
                                       
                                             }
                                                    $('#gt-sbjOrclass').html("<div id='gt-capySbj' class='gt-Qcaysbjs'><span  class='gt-selecA'>\
                                                    <select name='' id='gt-Bsbujs' class='gt-selecAa gt-BselecList'> <option value=''   >请选择科目</option>"+ html+"</select>\
                                          </span>\<input  onkeyup='(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)'  class='gt-textInput' type='text' > \
                                          <span>分</span>  <div  class='gt-delfater'><span>点击删除</span></div>  </div>\
                                          <div  class='gt-Qcaysbjs' id='gt-BoxsubList'></div>\ ");
     
                                                  
       
                                             }else if(llogdat<self.subjecId.length){
                                               
                                                    $('#gt-sbjOrclass .gt-BselecList').each(function(index){
                                                        var html='';
                                                        self.htmlBox='';
                                                        var index=$(this).find('option:selected').data('id');
                                                        for(var i=0;i<self.subjecId.length;i++){
                                                         
                                                         html+= "<option value=''  > 请选择科目</option><option class='gt-list' data-id="+self.subjecId[i] +" value=''>"+self.subjectNames[i] +"</option>"
                                                         self.htmlBox=" <div class='gt-Qcaysbjs'> <span  class='gt-selecA'>\
                                                 <select name=''  class='gt-selecAa gt-BselecList'> "+html+"</select> </span>\
                                                 <input  onkeyup=(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this) \
                                                 onblur=this.v(); class='gt-textInput' type='text' > <span>分</span>  <div  class='gt-delfater'><span>点击删除</span></div>  </div>"
                                               
                                                     }   
                                                           
                                                    })
                                                     

                                                      
                                                    

                                                    $('#gt-BoxsubList').append(self.htmlBox);
                                            }
                                                     

                                            })
                                              
                                    /*      删除科目    */
                                    $('#gt-sbjOrclass').on('click','.gt-delfater',function(){
                                        $(this).parent().remove();

                                    })


                    $('.gt-backCur,.gt-backSp').on('click',function(){
                               $('iframe', parent.document).hide();
                               $('#gt-deail', parent.document).show();
                                $('.gt-NavSupply ', parent.document).removeClass('gt-navBlock');
                                $('.gt-NavStage ', parent.document).addClass('gt-navBlock');
                                $('#gt-NavSupply ', parent.document).removeClass('gt-buttonClik');
                                $('#gt-NavStage', parent.document).addClass('gt-buttonClik');
                                $('#gt-NavStage', parent.document).removeClass('gt-navBlock');
    
                        });


                       /*  添加家长 */
                           $('#gt-BAddparent').on('click',function(){
                                     html= " <div class='gt-Parents'><span>家长姓名:</span> <input class='gt-BparentList' type='text'>\
                            <span class='gt-margiSpan gt-ParentsMar'>关系:</span>\
                            <span  class='gt-selecA'> <input class='gt-listInpt gt-IFaddLIst2' type='text'>\
                            </span><span class='gt-ParentsMar' >联系电话:</span> <input class='gt-IFaddLIst3' type='text'> </div>"
                                
                               $(' #gt-Bprent').append(html);
                           });

                /*   保存信息 */


                    $(' .gt-deails input').on('focus',function(){
                                          $('#gt-IFinput1').parent().removeClass('gt-warning');
                                       $('.gt-waringName').hide();
                                       $('#gt-IFinput3').parent().removeClass('gt-warning');
                                        $('.gt-waringPhote').hide();


                            })


                $('#gt-butonNext').on('click',function(){
                    
                                          self.analysis=[];
                                           self.parents=[];
                                 
                                    var studentName= $('#gt-IFinput1').val();
                                    var studentPhone= $('#gt-IFinput3').val();
                                     var school= $('#gt-IFinput2').val();
                                     var gradeId= $('#gt-Bselect option:selected').data('id');
                                     var sex=$('#gt-Bsex').data('sex');
                                     var address=$('#gt-IFinput6').val();
                                     var  email=$('#gt-IFinput4').val();
                                     var studentAnalysis=$('#gt-IFinput7').val();
                                   /*        名字 不能为空  */
                                   if($('#gt-IFinput1').val()===''||$('#gt-IFinput1').val()===undefined||$('#gt-IFinput1').val()===null){
                                  
                                       $('#gt-IFinput1').parent().addClass('gt-warning');
                                       $('.gt-waringName').show();
                                          return;
                                   } else{  $('#gt-IFinput1').parent().removeClass('gt-warning');$('.gt-waringName').hide();}

                                                       /*  电话验证 */
                                                      if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($('#gt-IFinput3').val()))){ 
                                                                       $('#gt-IFinput3').parent().addClass('gt-warning');
                                                                        $('.gt-waringPhote').show();
                                                                        return ; 
                                                                        } else{  $('#gt-IFinput3').parent().removeClass('gt-warning');$('.gt-waringPhote').hide();}
                              
                                                 
                                   

                                      
                                                    /*  学科添加传的参数 */
                                      $('.gt-letMari .gt-BselecList').each(function(){
                                          var  obj={};
                                           var date1= $(this).find('option:selected').data('id');
                                           var dataCoser=$(this).parent().next().val();
                                              obj.subjectId=date1;
                                              obj.score=dataCoser;
                                           self.analysis.push(obj);
                                        

                                      })            
                                                  
                                           /*  添加家长关系 传的参数*/
                  
                                             $('.gt-familyInforma .gt-BparentList').each(function(){
                                                      var  obj={};
                                                      console.log('dedadwd')
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
   					                    onceIntention:'1', 
  					                     nowIntention:'0', 
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
                                                   $('#gt-entrone').attr('data-nubdata',res.data);
                                                 top.frames['gt-homeTow'].binddata(res);
                                            
                                                    $('#gt-homeTow', parent.document).show();
                                                $('#gt-homeOne', parent.document).hide();
                                                $('#gt-IFinput1').val('');
                                                $('#gt-IFinput3').val('');
                                                $('#gt-IFinput2').val('');
                                                $('#gt-IFinput6').val('');
                                                $('#gt-IFinput4').val('');
                                                $('#gt-IFinput7').val('');
                                                $('.gt-textInput').val('');
                                              $('#gt-BoxsubList').html( '');
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                })


                         },
                      titel:function(){
            
             $("td").each(function(){
              
            $(this).attr("title",$(this).text());
           
           });
       },
    };
    enronName.initi();

    
})()


