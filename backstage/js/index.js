    console.log(25);

    $(function(){

      var backst={
        // 初始化
        intn:function(){
      this.Campuses();
      this.classRoom();
      this.basis();
      this.recommend();
        // 每次请求返回的总页数
        this.contPg='';
        // 学校id集合
        this.schoolId='1';
        // 当前页
        this.currentPg=''
        // 获取修改的id
        this.classRoomId='';
        // 已选择个数
        this.Number=0;
       this.ObjctArry ={}; 
        //  id 活动名称 集合
       this.obj=[];  
    //    会员叠加状态
        this.members=1; 
         this.giveIntegral='';
        this.giveFans='';
        this.giveCash='';
        // 规则Id
        this.setRecommendId=''
        //  推荐规则ID
        this.ruleId='';

          // 判断活动的id集合
       this.activtId=[];
        // 判断活动的对比ID集合
        this.compare=[];
        //    推荐 活动 之间ID
      this.commonId=[];
    //   指定删除id
      this.delId='';
    //   取消打钩ID
      this.canbackId='';

    },

     
    
  
   //表格数据时调用，可以显示titel值
       titel:function(){
            
             $("td").each(function(){
              
                       $(this).attr("title",$(this).text());
            
           });
       },
        // 校区管理
        Campuses:function(){
            var self=this;
            $('#gt-navLi1').on('click',function(){
                $(this).addClass('gt-bludBack');
                $(this).siblings().removeClass('gt-bludBack');
                $('.gt-schooladmini').show();
                $('.gt-schooladmini').siblings().hide();
                   $.ajax({
                                        url:url+'/findSchoolList.do',
                                        data:{
                                       
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

            
            })


            $('#gt-CampuAdd').on('click',function(){
            $('.gt-schooladmini').hide();
            $('.gt-Addadmini').show();

            })


            $('#adminEs').on('click',function(){
              $('.gt-Addadmini').hide();
              $('.gt-schooladmini').show();
            })


            $('.gt-roomEsc').on('click',function(){

              $('.gt-roomadmini').show();
            $('.gt-AddClassroom').hide();
            })

           

          
           
           
            $('.gt-setheradImg').on('click',function(){
              $('.gt-setbox').hide();
              $('.gt-NoClickBg').hide();
            })

                
                },
                // 教室管理
                classRoom:function(){
                   
                   var self=this;
                
                        
                        $('.gt-newAddroom').on('click',function(){
                      $('.gt-NoClickBg').show();
                      $('#gt-newaddRm').show();
                    })
                    //  尾页
                  $('#gt-epage').on('click',function(){
                                    console.log(self.contPg)
                                    console.log(self.schoolId)
                                      $.ajax({
                                        url:url+'/findClassroomList.do',
                                        data:{
                                        schoolId :self.schoolId,
                                        curPage:self.contPg ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res.data)
                                             if(res.code===100){
                                               
                                                 self.NewRoomrender(res.data);

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                  

                  })
                    //  首页
                  $('#gt-hpage').on('click',function(){
                                  
                                    console.log(self.schoolId)
                                      $.ajax({
                                        url:url+'/findClassroomList.do',
                                        data:{
                                        schoolId : self.schoolId,
                                        curPage:1 ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res.data)
                                             if(res.code===100){
                                                 self.NewRoomrender(res.data);

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                  

                  })

                   //  上一页
                  $('#gt-pre').on('click',function(){
                                   console.log('上一页'+( self.currentPg-1));
                                                  console.log('学校ID'+self.schoolId)
                                      $.ajax({
                                        url:url+'/findClassroomList.do',
                                        data:{
                                        schoolId : self.schoolId,
                                        curPage: self.currentPg-1 ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                               console.log(res)
                                             if(res.code===100){
                                                
                                                 self.NewRoomrender(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });                                 
                  })

                   //  下一页
                  $('#gt-next').on('click',function(){
                                   console.log('下一页'+( self.currentPg+1));
                                   console.log('学校ID'+self.schoolId)
                                                
                                      $.ajax({
                                        url:url+'/findClassroomList.do',
                                        data:{
                                        schoolId : self.schoolId,
                                        curPage: self.currentPg+1 ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){  
                                           console.log(res)                                     
                                              if(res.code===100){
                                                 self.NewRoomrender(res.data);
                                                
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });                                 
                                     }) 
                   //  教室                     
              $('#gt-navLi2').on('click',function(){
                           var jqThis=$(this);
                         
                
                      $.ajax({
                    url:url+'/findSchoolList.do',
                    data:{
                      
                    },
                    type:'post',
                    dataType:'json',
                    success: function(res){
                   console.log(res.data)
                     if(res.code==100){
                     
                        console.log(self.schoolId)
                         jqThis.addClass('gt-bludBack');
                       jqThis.siblings().removeClass('gt-bludBack');
                       $('.gt-roomadmini').show();
                      $('.gt-roomadmini').siblings().hide();
                        self.Roomrender(res.data);
                          
                       }
                      
                    },
                    error: function(){
                        console.log('网络出错');
                    }
                });

                        
            })

        
            // 教室管理
            $(document).on('click','#gt-cotrnt',function(){
                        
                               $('.gt-roomadmini').hide();
                                 $('.gt-AddClassroom').show();
                                     self.schoolId= $(this).parent().parent().find('.gt-datli1').data('id');
                                   
                                      $.ajax({
                                        url:url+'/findClassroomList.do',
                                        data:{
                                        schoolId : self.schoolId,
                                        curPage:1 ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res.data);
                                             if(res.code===100){
                                             
                                                 self.NewRoomrender(res.data);
                                                   
                                             }else{
                                                  $('#gt-classRoomad').html('<tr>  <td class="gt-Room1"></td><td class="gt-Room2">教室名称</td> <td class="gt-Room3">操作</td>   </tr>')}
                                        
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

            })
           
            
            //  点击选择
            $(document).on('click','#gt-classRoomad .gt-setButbg',function(){
              
            if(!$(this).hasClass('gt-setButBlbg')){
                  $(this).addClass('gt-setButBlbg');
                  $(this).children('span').addClass('gt-SetbutCall');
            }else{
                    $(this).removeClass('gt-setButBlbg');
                    $(this).children('span').removeClass('gt-SetbutCall') ;
            }
                         
            })

            //  全选
            $('#gt-SelectAll').on('click',function(){
               $(' #gt-classRoomad .gt-setButbg').addClass('gt-setButBlbg');
                  $('.gt-setButbg').children('span').addClass('gt-SetbutCall');
            })


            // 取消
              $('#gt-SelectNo').on('click',function(){
               $('.gt-setButbg').removeClass('gt-setButBlbg');
                $('.gt-setButbg').children('span').removeClass('gt-SetbutCall');
            })

            // 编辑
            $(document).on('click','.gt-roomEnte',function(){
                 $('.gt-addChange').show();
                 $('.gt-NoClickBg').show();
                  var textVal= $(this).parent().prev().text();
                  self.classRoomId=$(this).parent().parent().data('id');
                   console.log(textVal)
                   console.log(self.classRoomId)
                  
                
                   $.ajax({
                    url:url+'/fromClassroom.do',
                    data:{
                      classroomId : self.classRoomId,
                    //    classroomName:classroomName,

                    },
                    type:'post',
                    dataType:'json',
                    success: function(res){
                      
                          console.log(res);
                          if(res.code===100){
                             $('#gt-Addroom2').val(textVal);
                           
                          }
                    
                    },
                    error: function(){
                        console.log('网络出错');
                    }
                });


            })

               //  编辑修改教室 保存
            $('#gt-chngSavSave').on('click',function(){
                  $('.gt-addChange').hide();
                 $('.gt-NoClickBg').hide();
                    var saveVal= $('#gt-Addroom2').val();
                   $.ajax({
                    url:url+'/saveClassroom.do',
                    data:{
                        id:self.classRoomId,
                       schoolId : self.schoolId,
                       classroomName:saveVal,

                    },
                    type:'post',
                    dataType:'json',
                    success: function(res){
                      
                          console.log(res);
                          if(res.code===100){
                           self.saveReload();
                           
                          }
                    
                    },
                    error: function(){
                        console.log('网络出错');
                    }
                });

                 
                
            })


            //删除
               $('#gt-SelectDel').on('click',function(){
                   // 删除ID集合
                     var idarry='';
                  
                 if($('.gt-setButbg').hasClass('gt-setButBlbg')){
                   $(".gt-setButBlbg").each(function(){
                     var id=$(this).parents('tr').data('id');
                       idarry=idarry+id+',';
                     
                      
                    });
                       idarry=idarry.substring(0,idarry.length-11);
                     console.log(idarry)
                       $.ajax({
                    url:url+'/deleteClassroom.do',
                    data:{
                     classroomIds: idarry,

                    },
                    type:'post',
                    dataType:'json',
                    success: function(res){ 
                          console.log(22)
                          if(res.code==100){
                              console.log(1)
                           self.saveReload();

                          }
                    
                    },
                    error: function(){
                        console.log('网络出错');
                    }
                });


               
                



                 }
            })

          
               
              //  保存
            $('#gt-ClbutSave').on('click',function(){
                      $('.gt-NoClickBg').hide();
                     $('.gt-addClass').hide();  
                     var classroomName=$('#gt-Addroom').val();
                     console.log(classroomName);
                  $.ajax({
                    url:url+'/saveClassroom.do',
                    data:{
                      schoolId : self.schoolId,
                       classroomName:classroomName,

                    },
                    type:'post',
                    dataType:'json',
                    success: function(res){
                      
                          console.log(res);
                          if(res.code===100){
                           self.saveReload();
                           
                          }
                    
                    },
                    error: function(){
                        console.log('网络出错');
                    }
                });

            
            })


         
                  

                },
                   
                  // 保存刷新
                  saveReload:function(){
                             var self=this;
                             console.log(2525)
                      $.ajax({
                                        url:url+'/findClassroomList.do',
                                        data:{
                                        schoolId : self.schoolId,
                                        curPage:self.currentPg ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res.code)
                                             if(res.code===100){
                                            
                                                 self.NewRoomrender(res.data);
                                             }else{
                                                  $('#gt-classRoomad').html('<tr>  <td class="gt-Room1"></td><td class="gt-Room2">教室名称</td> <td class="gt-Room3">操作</td>   </tr>')}
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                  },

                  //  新增教室渲染
                    



               NewRoomrender: function(data){
                 var self=this;
            // 获取html的模板
               self.contPg=data.pageCount;
               self.currentPg=data.curPage;
              
            var htmlTpl = $('#table').html();
            // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data.subList});
            // 执行渲染，使用append是为了使该渲染方法得以复用
             $('#gt-classRoomad').html(htmlStr);   
              $('#gt-present').text(data.curPage);     
              $('#gt-contPg').text(data.pageCount); 
                   
        },
              
                // 教室渲染
          Roomrender: function(data){
            // 获取html的模板
            var htmlTpl = $('#tpl').html();
            // 生成html字符串，用于渲染
            var htmlStr = _.template(htmlTpl)({list:data});
            // 执行渲染，使用append是为了使该渲染方法得以复用
            $('#gt-Datetab').html(htmlStr);
          
                
        },



         // 推荐管理
                recommend:function(){
                 var self=this;
                 
                      
                $('#gt-newSet').on('click',function(){
                            $('.gt-NoClickBg').show();
                            $('.gt-setbox').show();
                               self.NuberInit();
                           

                             $.ajax({
                                       url:url+'/findEnrollList.do',
                                        data:{
                                      
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){   
                                            var newId=res.data.subList;                                    
                                          console.log(res)
                                             if(res.code===100){
                                                 self.activeRend(res.data);
                                                //  添加原有值
                                                 self.oldList();
                                                 // console.log(self.compare);
                                                  console.log(self.activtId);
                                               
                                            
                                              

                                                //   }

                                                
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

                //    添加规则    

                    $('.gt-addSetBut').on('click',function(){

                            
                        $('.gt-addSetup').hide();
                        $('.gt-NewaddSetup').show();
                        self.setRecommendId=''
                         self.activtId=[];
                         $('#gt-extras1').val('');
                           $('#gt-extras2').val('');
                           $('#gt-extras3').val('');
                          $('#gt-extras4').val( '');

                })
           

                
                // 点击选择  选择活动
                      $(document).on('click','#gt-newAddset .gt-setButbg',function(){
                           
                         
                  if(!$(this).hasClass('gt-setButBlbg')){
                      self.Number= self.Number+1;
                      $('#gt-Nuber').text( self.Number);
                  $(this).addClass('gt-setButBlbg');
                  $(this).children('span').addClass('gt-SetbutCall');         
               var texValue= $(this).parent().parent().find('.gt-steLi3').text(); 
               var id=  $(this).parent().parent().attr('id') ;
               
                  var html= " <tr class='gt-trweb ' id='"+id+"p' > <td><div class='gt-lihBox'><span class='gt-Mglft'>"+texValue+ "<span  class='gt-delImg gt-ctl'><img src='../img/ico/u1157.png' alt=''></span></div></td></tr>"
        
                 $('#gt-nsdw').append(html);

            }else{
                
                 var id=  $(this).parent().parent().attr('id')  
                  var texValue= $(this).parent().parent().find('.gt-steLi3').text();  
                   self.Number=self.Number-1;
                    $(this).removeClass('gt-setButBlbg');
                    $(this).children('span').removeClass('gt-SetbutCall') ;
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
                      $("#"+id+"").find('.gt-setButbg span').removeClass('gt-SetbutCall');                   
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
                // 删除确定
                $('#gt-but1').on('click',function(){
   
                     console.log( self.delId)
                       
                 $.ajax({
                                       url:url+'/deleteEnrollRecommendId.do',
                                        data:{
                                     enrollRecommendId:self.delId,
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                                
                                           self.Number= self.Number-1;
                                            $('#gt-Nuber').text( self.Number)
                                        
                                            $("#"+self.canbackId+"").find('.gt-setButbg').removeClass('gt-setButBlbg');
                                            $("#"+self.canbackId+"").find('.gt-setButbg span').removeClass('gt-SetbutCall');                   
                                            console.log(self.canbackId)
                                             $("#"+self.delId+"t").parent().parent().parent().remove();
                                            $('.gt-NoClickBg2').hide();
                                            $('.gt-deltan').hide(); 
                                               

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

 
                })

                    $('#gt-but2').on('click',function(){
                         $('.gt-NoClickBg2').hide();
                         $('.gt-deltan').hide(); 
                                               
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

                 
                // 确定  保存 名称和ID
                $('#gt-tRig').on('click',function(){
                             
                             $('.gt-setbox').hide();
                             $('.gt-NoClickBg').hide();
                            
                           
                      if($('.gt-setButBlbg').hasClass('gt-setButBlbg')){
                        $(".gt-setButBlbg").each(function(index){
                         var prId=$(this).parent().parent().attr('id');
                          var prVal=$(this).parent().parent().find('.gt-steLi2').text();
                            var newid=$(this).parent().parent().data('nuber');
                          var antherObec={enrollId: prId,enrollName:prVal,id:newid }
                          self.obj.push(antherObec);
                           
                         });
                        
                    }
                       
                            console.log(self.obj);
                                        
                })


                // 选择会员叠加
                    $(document).on('click','.gt-setButnew',function(){
              
            if(!$(this).hasClass('gt-setButBlbg')){
                  $(this).addClass('gt-setButBlbg');
                  $(this).children('span').addClass('gt-SetbutCall');
                   self.members=0;
                  

            }else{
                    $(this).removeClass('gt-setButBlbg');
                    $(this).children('span').removeClass('gt-SetbutCall') ;
                      self.members=1;
            }
                         
        })

             // 被推荐人得到的优惠
            $('#gt-recom1').on('click',function(){
                
                       if(!$(this).hasClass('gt-BludClick')){
                    $(this).children('span').addClass('gt-smallRun');
                    $(this).addClass('gt-BludClick');
                   self.giveFans= $('#gt-extras2').val();
                   }else{
                    $(this).children('span').removeClass('gt-smallRun');
                    $(this).removeClass('gt-BludClick');
                   self.giveFans='';
                   }       
                  
          })
           $('#gt-recom2').on('click',function(){
                
                       if(!$(this).hasClass('gt-BludClick')){
                    $(this).children('span').addClass('gt-smallRun');
                    $(this).addClass('gt-BludClick');
                       self.giveIntegral= $('#gt-extras3').val();
                   }else{
                    $(this).children('span').removeClass('gt-smallRun');
                    $(this).removeClass('gt-BludClick');
                     self.giveIntegral='';
               
                          
                   }
          })
           $('#gt-recom3').on('click',function(){
                
                       if(!$(this).hasClass('gt-BludClick')){
                    $(this).children('span').addClass('gt-smallRun');
                    $(this).addClass('gt-BludClick');
                      self.giveCash= $('#gt-extras4').val();
                   }else{
                    $(this).children('span').removeClass('gt-smallRun');
                    $(this).removeClass('gt-BludClick');
                  self.giveCash='';
                        
                }
                
                 
          })
            // 取消
             $('#gt-setLiEs').on('click',function(){

              $('.gt-NewaddSetup').hide();
              $('.gt-addSetup').show();
            })

        
        //    保存

                 $('#gt-buter').on('click',function(){

                       
                           self.aganin();
                       var reductionMoney=$('#gt-extras1').val();
                      
                         // console.log(JSON.stringify(self.obj))
                          console.log( reductionMoney)
                          console.log(  self.giveFans)
                          console.log(  self.giveIntegral)
                          console.log(  self.giveCash)
                          console.log("规则ID"+self.setRecommendId)
                          self.obj=JSON.stringify(self.obj);
                              console.log( self.obj)    
                    
                 $.ajax({
                                      url:url+'/saveSetRecommend.do',
                                        data:{
                                    id:self.setRecommendId,
                                    reductionMoney: reductionMoney,
                                    giveIntegral: self.giveIntegral,
                                    giveFans:self.giveFans,
                                    giveCash: self.giveCash,
                                    schoolId:self.schoolId,   
                                    overlap:self.members,
                                    list:self.obj ,
                                      
                            },              
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   self.obj=[];
                                                 $('.gt-NewaddSetup').hide();
                                                $('.gt-addSetup').show();
                                                console.log(55555);
                                                console.log( self.obj)
                                                self.reloadRd();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                
                
                 })

                //  推荐设置编辑 修改
                $(document).on('click','.gt-editors',function(){
                        //    清空活动ID
                      
                         
                        self.setRecommendId =$(this).parent().parent().data('id');
                        console.log("保存ID"+self.setRecommendId)   
                                 self.obj=[];
                                   self.activtId=[];
                            var reductionMoney= $(this).parent().prev().find('.gt-reductionMoney').text();
                            var giveIntegral= $(this).parent().prev().find('.gt-giveIntegral').text();
                            var giveFans= $(this).parent().prev().find('.gt-giveFans').text();
                            var giveCash= $(this).parent().prev().find('.gt-giveCash').text();
                            $('#gt-extras1').val(reductionMoney);
                            $('#gt-extras2').val(giveFans);
                            $('#gt-extras3').val(giveIntegral);
                            $('#gt-extras4').val( giveCash);
                             $('.gt-recomRun').children('span').removeClass('gt-smallRun');
                            $('.gt-recomRun').removeClass('gt-BludClick');
                        
                            
                 $.ajax({
                                      url:url+'/fromSetRecommend.do',
                                        data:{
                                            setRecommendId:self.setRecommendId,
                                   

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){  
                                            var dat=res.data.enrollList;                                     
                                            console.log(res.data.enrollList)
                                            console.log('修改')
                                             if(res.code===100){
                                             for(var i=0;i<dat.length;i++){
                                                 if(dat[i].id==''){
                                                    dat[i].id==0;
                                                     var antherObec={enrollId: dat[i].enrollId,enrollName:dat[i].enrollName,id:dat[i].id}
                                                  var act=dat[i].enrollId;
                                                       self.obj.push(antherObec);
                                                        self.activtId.push(act);
                                                        self.commonId.push(dat[i].id)
                                                 }else{
                                                     var antherObec={enrollId: dat[i].enrollId,enrollName:dat[i].enrollName,id:dat[i].id}
                                                       var act=dat[i].enrollId;
                                                       self.obj.push(antherObec);
                                                         self.commonId.push(dat[i].id)
                                                        self.activtId.push(act);

                                                 }
                                              
                                                     
                                                }
                                                console.log(self.activtId);
                                                console.log(self.obj);

                                             $('.gt-addSetup').hide();
                                             $('.gt-NewaddSetup').show();
                                              
                        

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                })



                    
                //  推荐设置编辑 删除
                $(document).on('click','.gt-del',function(){
                         self.setRecommendId =$(this).parent().parent().data('id');
                        console.log("保存frID"+self.setRecommendId)     
                            
                              
                      $.ajax({
                                      url:url+'/deleteSetRecommend.do',
                                        data:{
                                           setRecommendId : self.setRecommendId,
                                   

                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 console.log(999999)
                                                  self.reloadRd();

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                        })

                //  进入推荐管理       
          $('#gt-navLi3').on('click',function(){
                            self.activtId=[];     
                      var jqThis=$(this);
                         
                      $.ajax({
                    url:url+'/findSchoolList.do',
                    data:{
                      
                    },
                    type:'post',
                    dataType:'json',
                    success: function(res){
                   console.log(res.data)
                     if(res.code==100){
                         jqThis.addClass('gt-bludBack');
                       jqThis.siblings().removeClass('gt-bludBack');
                       $('.gt-setup').show();
                      $('.gt-setup').siblings().hide();
                        self.Recorender(res.data);
                          
                       }
                      
                    },
                    error: function(){
                        console.log('网络出错');
                    }
                });

                
            })
     

     
                       //  推荐设置
              $(document).on('click','.gt-sugesSrt',function(){
                        $('.gt-setup').hide();
                        $('.gt-addSetup').show();

                         self.schoolId= $(this).parent().parent().find('.gt-datli1').data('id') ;
                         
                         console.log( self.schoolId);   
                      $.ajax({
                                     url:url+'/findSetRecommendList.do',
                                        data:{
                                       schoolId: self.schoolId,
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             self.ruleRd(res.data)
                                            }
                                            else{
                                                    $('#gt-recoTby').html(' <tr class="gt-dataTr"><td class="gt-datli2">推荐规则</td> <td class="gt-datli5">操作</td> </tr>')
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
                                                        var html= " <tr class='gt-trweb ' id='"+id+"p' > <td  ><div class='gt-lihBox'><span class='gt-Mglft'>"+texValue+ "<span  id='"+ self.commonId[j]+"t' class='gt-delImg gt-ctl'><img src='../img/ico/u1157.png' alt=''></span></div></td></tr>"

                                                      $('#gt-nsdw').append(html);
                                                               
                                                         if(!$(this).hasClass('gt-setButBlbg')){
                                                                 self.Number= self.Number+1;
                                                                  $('#gt-Nuber').text( self.Number);
                                                         }

                                                   }
                                                  }
                                                    
                                                 })




                },
                  // 推荐渲染
          Recorender: function(data){
            // 获取html的模板
            
            var htmlTpl = $('#tplT').html();
            // 生成html字符串，用于渲染
            var htmlStr = _.template(htmlTpl)({list:data});
            // 执行渲染，使用append是为了使该渲染方法得以复用
            $('#gt-LIstScm').html(htmlStr);
          },

            //   刷新渲染
            reloadRd:function(){
                    var self=this;
                       console.log( self.schoolId)
                      $.ajax({
                                     url:url+'/findSetRecommendList.do',
                                        data:{
                                        setRecommendId : self.schoolId,
                                      
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 //console.log(8888)
                                              self.ruleRd(res.data)
                                             }
                                             else{
                                                    $('#gt-recoTby').html(' <tr class="gt-dataTr"><td class="gt-datli2">推荐规则</td> <td class="gt-datli5">操作</td> </tr>')
                                             }

                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

            },


            //  规则渲染
              
               ruleRd:function(data){
              
            // 获取html的模板
            var htmlTpl = $('#table3').html();
            // 生成html字符串，用于渲染
            var htmlStr = _.template(htmlTpl)({list:data});
           
            $('#gt-recoTby').html(htmlStr);
       
               },


          
            //  再次判断是否勾选
            aganin:function(){
                   if(!$('#gt-recom1').hasClass('gt-BludClick')){
                
                      self.giveCash= $('#gt-extras2').val();
                   }else{
                   
                  self.giveCash='';
                        
                }
                
                   if(!$('#gt-recom2').hasClass('gt-BludClick')){
                   
                       self.giveIntegral= $('#gt-extras3').val();
                   }else{
                  
                     self.giveIntegral='';}
                

                       if(!$('#gt-recom3').hasClass('gt-BludClick')){
                   
                   self.giveFans= $('#gt-extras4').val();
                   }else{
                   
                   self.giveFans='';
                   }       



            },


             
        
            // 初始化选择
            NuberInit:function(){
                  var self=this;
                       self.Number= 0;
                        $('#gt-Nuber').text( self.Number);
                        if(self.Number==0){
                         $('#gt-nsdw').children().remove();
                         $('.gt-setButbg').removeClass('gt-setButBlbg');
                          $('.gt-setButbg span').removeClass('gt-SetbutCall');    
                        }
            },
           
              

        // 新增报名活动列表
          activeRend:function(data){
    
                  var self=this;
                // 总页数
               self.contPg=data.pageCount;
              // console.log('pg'+self.contPg)
            //    当前页
               self.currentPg=data.curPage;
                  //   console.log('pg'+self.currentPg)
             
            // 获取html的模板
            var htmlTpl = $('#activi').html();
            // 生成html字符串，用于渲染
            var htmlStr = _.template(htmlTpl)({list:data.subList});
           
            $('#gt-newAddset').html(htmlStr);
            $('#NewPg').text(self.currentPg);
          
                  

          },




          basis:function(){

         var self=this;
    // 基础管理
              $('#gt-navLi4').on('click',function(){
                $(this).addClass('gt-bludBack');
                $(this).siblings().removeClass('gt-bludBack');
                  $('.gt-basisBox').show();
                 $('.gt-basisBox').siblings().hide();
                 
                       $.ajax({
                                        url:url+'/findGradeList.do',
                                        data:{
                                                                           
                                  },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res.data)
                                             if(res.code===100){
                                           
                                         self. ClassRender(res.data);
                                                                                           
                                             }else{
                                                   $('#gt-newClassTb').html(' <tr>  <td class="gt-basis1">年级</td> <td class="gt-basis2">创建时间</td> <td class="gt-basis3">操作</td> </tr>');
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                      

            })

            //  年级
            $('.gt-basisBut').on('click',function(){
              $(this).addClass('gt-basisclick');
              $(this).siblings().removeClass('gt-basisclick');
              $('.gt-newClass').show();
             $('.gt-newSubjects').hide();

                       $.ajax({
                                        url:url+'/findGradeList.do',
                                        data:{
                                                                           
                                  },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res.data)
                                             if(res.code===100){
                                         self. ClassRender(res.data);
                                                  
                                             }else{
                                                   $('#gt-newClassTb').html(' <tr>  <td class="gt-basis1">年级</td> <td class="gt-basis2">创建时间</td> <td class="gt-basis3">操作</td> </tr>');
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
            

            })



               //   新增 年级 分页

            
               //  尾页
                  $('#gt-classNg').on('click',function(){
                                    console.log(self.contPg)
                                      $.ajax({
                                        url:url+'/findGradeList.do',
                                        data:{
                                        schoolId : self.schoolId,
                                        curPage:self.contPg,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res.data)
                                             if(res.code===100){
                                               
                                                 self.ClassRender(res.data);

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                  

                  })
                    //  首页
                  $('#gt-classHg').on('click',function(){
                                  
                                    console.log(self.schoolId)
                                      $.ajax({
                                        url:url+'/findGradeList.do',
                                        data:{
                                        schoolId : self.schoolId,
                                        curPage:1 ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res.data)
                                             if(res.code===100){
                                                  
                                                 self.ClassRender(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                  

                  })

                   //  上一页
                  $('#gt-classPg').on('click',function(){
                                   console.log('上一页'+( self.currentPg-1));
                                                  console.log('学校ID'+self.schoolId)
                                      $.ajax({
                                     url:url+'/findGradeList.do',
                                        data:{
                                        schoolId : self.schoolId,
                                        curPage: self.currentPg-1 ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                               console.log(res)
                                             if(res.code===100){
                                                
                                            self.ClassRender(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });                                 
                  })

                   //  下一页
                  $('#gt-classEg').on('click',function(){
                                   console.log('下一页'+( self.currentPg+1));
                                   console.log('学校ID'+self.schoolId)
                                                
                                      $.ajax({
                                    url:url+'/findGradeList.do',
                                        data:{
                                        schoolId : self.schoolId,
                                        curPage:self.currentPg+1 ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){  
                                           console.log(res)                                     
                                              if(res.code===100){
                                                 self.ClassRender(res.data);
                                                
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });                                 
                                     }) 



                                    //  年级 操作 删除
                                    
                                        //删除
                    $(document).on('click','.gt-classDel',function(){
                        
                            var id=$(this).parent().parent().data('id');
                            console.log(id);
                        
                    
                            $.ajax({
                            url:url+'/deleteGrade.do',
                            data:{
                            gradeId: id,

                            },
                            type:'post',
                            dataType:'json',
                            success: function(res){ 
                                
                                if(res.code===100){
                                    
                                self.Classsave();
                                }
                            
                            },
                            error: function(){
                                console.log('网络出错');
                            }
                        });
                    })





              // 新增 年级 保存调用接口
            $('#gt-yearSave').on('click',function(){
               $('.gt-NoClickBg').hide();
               $('.gt-year').hide();
                  var val= $('#gt-Addyear').val();
                        console.log(val)
                         $.ajax({
                                        url:url+'/saveGrade.do',
                                        data:{
                                           gradeName:val,                                    
                                  },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               self.Classsave();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                   })

                 

            
            // 年级新增
            $('#gt-newClas').on('click',function(){
                $('.gt-NoClickBg').show();
                $('.gt-year').show();
            })


            // 取消
            $('#gt-ClbutEs').on('click',function(){
            $('.gt-NoClickBg').hide();
            $('#gt-newaddRm').hide();
        })
            $('.gt-heradRt').on('click',function(){
            $('.gt-NoClickBg').hide();
            $('#gt-newaddRm').hide();
            $('.gt-year').hide();
            $('.gt-addClass').hide();

        })
          
          $('.gt-getaway').on('click',function(){

              $('.gt-addClass').hide();
              $('.gt-NoClickBg').hide();
          })


        
        // 科目
            $('.gt-basisNexe').on('click',function(){
                $(this).addClass(' gt-basisclick');
                 $(this).siblings().removeClass('gt-basisclick');
                 $('.gt-newClass').hide();
                 $('.gt-newSubjects').show();
                
                        $.ajax({
                                        url:url+'/findSubjectList.do',
                                        data:{
                                    
                                        curPage:1,
                                        
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               
                                                 self.SubjectsRender(res.data);  
                                                
                                             }else{
                                                   $('#gt-SubjectsTab').html('  <tr><td class="gt-basis1">科目名称</td> <td class="gt-basis2">创建时间</td><td class="gt-basis3">操作</td></tr>');
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                  


            })

            
                // 新增 科目
            $('#gt-newSubj').on('click',function(){
                $('.gt-NoClickBg').show();
                $('.gt-addSubjects').show();

            })

            //   新增 科目 分页

            
               //  尾页
                  $('#gt-Subng').on('click',function(){
                                    console.log(self.contPg)
                                    console.log(self.schoolId)
                                      $.ajax({
                                        url:url+'/findSubjectList.do',
                                        data:{
                                        schoolId : self.schoolId,
                                        curPage:self.contPg ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res.data)
                                             if(res.code===100){
                                               
                                                 self.SubjectsRender(res.data);

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                  

                  })
                    //  首页
                  $('#gt-SubHpg').on('click',function(){
                                  
                                    console.log(self.schoolId)
                                      $.ajax({
                                        url:url+'/findSubjectList.do',
                                        data:{
                                        schoolId : self.schoolId,
                                        curPage:1 ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res.data)
                                             if(res.code===100){
                                                 self.SubjectsRender(res.data);

                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                  

                  })

                   //  上一页
                  $('#gt-Subpr').on('click',function(){
                                   console.log('上一页'+( self.currentPg-1));
                                                  console.log('学校ID'+self.schoolId)
                                      $.ajax({
                                        url:url+'/findSubjectList.do',
                                        data:{
                                        schoolId : self.schoolId,
                                        curPage: self.currentPg-1 ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                               console.log(res)
                                             if(res.code===100){
                                                
                                                 self.SubjectsRender(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });                                 
                  })

                   //  下一页
                  $('#gt-Subepg').on('click',function(){
                                   console.log('下一页'+( self.currentPg+1));
                                   console.log('学校ID'+self.schoolId)
                                                
                                      $.ajax({
                                        url:url+'/findSubjectList.do',
                                        data:{
                                        //schoolId : self.schoolId,
                                        curPage: self.currentPg+1  ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){  
                                           console.log(res)                                     
                                              if(res.code===100){
                                                 self. SubjectsRender(res.data);
                                                
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });                                 
                                     }) 


             
                                        //删除
               $(document).on('click','.gt-subDel',function(){
                   
                     var id=$(this).parent().parent().data('id');
                     console.log(id);
                  
            
                       $.ajax({
                    url:url+'/deleteSubject.do',
                    data:{
                     subjectId: id,

                    },
                    type:'post',
                    dataType:'json',
                    success: function(res){ 
                        
                          if(res.code===100){
                              
                          self.Subjectssave();
                          }
                    
                    },
                    error: function(){
                        console.log('网络出错');
                    }
                });
               })




           
 
              // 新增科目保存调用接口
            $('#gt-Prese').on('click',function(){
              $('.gt-NoClickBg').hide();
              
               $('.gt-addSubjects').hide();
              var val= $('#gt-subAdd').val();
                      
                         $.ajax({
                                        url:url+'/saveSubject.do',
                                        data:{
                                          subjectName:val,                                    
                                  },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.Subjectssave();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

            })

            // 取消
            $('#gt-preseEs').on('click',function(){
            $('.gt-NoClickBg').hide();
          $('.gt-addSubjects').hide();
        })
          
          },

            // 年级设计渲染
         ClassRender:function(data){
                var self=this;
                // 总页数
               self.contPg=data.pageCount;
              // console.log('pg'+self.contPg)
            //    当前页
               self.currentPg=data.curPage;
                  //   console.log('pg'+self.currentPg)
             
            // 获取html的模板
            var htmlTpl = $('#classTb').html();
            // 生成html字符串，用于渲染
            var htmlStr = _.template(htmlTpl)({list:data.subList});
           
            $('#gt-newClassTb').html(htmlStr);
            $('#gt-cuntWor').text(self.contPg);
            $('#gt-classwor').text(self.currentPg);
          

         }, 


          // 科目设计渲染
         SubjectsRender:function(data){
                var self=this;
               self.contPg=data.pageCount;
               self.currentPg=data.curPage;
             
            // 获取html的模板
            var htmlTpl = $('#table2').html();
            // 生成html字符串，用于渲染
            var htmlStr = _.template(htmlTpl)({list:data.subList});
           
            $('#gt-SubjectsTab').html(htmlStr);
            $('#subCont').text(data.pageCount);
            $('#gt-subNweg').text(data.curPage)
          

         }, 

         // 新增科目保存刷新
               Subjectssave:function(){
                             var self=this;
                      $.ajax({
                                        url:url+'/findSubjectList.do',
                                        data:{
                                        schoolId : self.schoolId,
                                        curPage:self.currentPg ,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                               
                                                 self.SubjectsRender(res.data);
                                             }else{
                                                   $('#gt-SubjectsTab').html('  <tr><td class="gt-basis1">科目名称</td> <td class="gt-basis2">创建时间</td><td class="gt-basis3">操作</td></tr>');
                                             }
                                                
                                                
                                             
                                            
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                  },

                    // 新增年级保存刷新
               Classsave:function(){
                             var self=this;
                      $.ajax({
                                        url:url+'/findGradeList.do',
                                        data:{
                                        schoolId : self.schoolId,
                                        curPage:  self.currentPg,
                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                             
                                             if(res.code===100){
                                               
                                                 self.ClassRender(res.data);
                                             }else{
                                                   $('#gt-newClassTb').html(' <tr>  <td class="gt-basis1">年级</td> <td class="gt-basis2">创建时间</td> <td class="gt-basis3">操作</td> </tr>');
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                  },
        
      }
      

    backst.intn();

      
    })
