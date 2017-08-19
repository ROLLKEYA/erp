console.log('通知');
(function(){
    var notice={
       initi:function(){
            this.notice_bind();
           // this.initi_noce();
             //  当前页
                this.currentPg='';
                //总页数
                this.pageCount='';
                
                this.typeNBer='';
                
           },
   
           notice_bind:function(){
             var self=this;
            //  返回home页面
             $('.gt-backCur,.gt-backSp').on('click',function(){
                $('iframe', parent.document).hide();
                $('#gt-deail', parent.document).show();
                 $('.gt-NavSupply ', parent.document).removeClass('gt-navBlock');
                 $('.gt-NavStage ', parent.document).addClass('gt-navBlock');
                 $('#gt-NavSupply ', parent.document).removeClass('gt-buttonClik');
                 $('#gt-NavStage', parent.document).addClass('gt-buttonClik');
                 $('#gt-NavStage', parent.document).removeClass('gt-navBlock');
             })
                 $('#gt-noties', parent.document).on('click',function(){
                      self.initi_noce(); 
                 })
                // 公告通知
             $('#gt-StuIfromtion').on('click',function(){
                 $(this).addClass('gt-clikStyl');
                 $(this).siblings().removeClass('gt-clikStyl');
                 $('.gt-MIS').show();
                 $('.gt-SMS').hide();
                    $.ajax({
                                       url:url+'/noticeList.do',
                                        data:{
                                                                               
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                            self.notice_rend(res.data);
                                            self.notice_Type();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
             })

          // 公告首页
              $('#gt-homePg1').on('click',function(){
                               $.ajax({
                                        url:url+'/noticeList.do',
                                        data:{
                                     
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.notice_rend(res.data)
                                                 self.notice_Type();
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //  公告 翻页 下一页
                          
                            $('#gt-nextPg1').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                  url:url+'/noticeList.do',
                                        data:{
                                     
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                self.notice_rend(res.data)
                                                 self.notice_Type();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

      
                                 //   公告搜索 回车 搜索
                 $('#gt-input1').keydown(function(event){
                      
                              if ( event.keyCode == 13) {
                                   var val=$('#gt-input1').val();
                                  
                                 $.ajax({
                                         url:url+'/noticeList.do',
                                        data:{
                                             noticeTitle:val,
                                         
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                  self.notice_rend(res.data)
                                                   self.notice_Type();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                
                           };             
                 })

                        //    公告查询

                         $('#gt-searc1').on('click',function(){
                                var val=$('#gt-input1').val();
                               

                                 $.ajax({
                                         url:url+'/noticeList.do',
                                        data:{
                                            noticeTitle:val,
                                    
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   self.notice_rend(res.data)
                                                    self.notice_Type();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
 
                         })                
                           
                                //内外公告查询              
                    $('#gt-notice').change(function(){
                                            var id= $('#gt-notice option:selected').text();

                                            if(id==='内部公告'){
                                                id='0';
                                            }else{
                                                id='1';
                                            }
                                            console.log(id)
                                            
                               $.ajax({
                                        url:url+'/noticeList.do',
                                        data:{
                                       noticeType:id,
                                                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.notice_rend(res.data)
                                                    self.notice_Type();
                                                
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                                                 
                    })
                          
                    // 新加公告
                    $('#gt-newAddBut').on('click',function(){
                        $('#gt-trans', parent.document).show();
                            $('.gt-trans').show();
                            $('#gt-typig').show();
                            $('#gt-titleCent').val('');
                            $('#gt-noticeContent').val('') ;
                          
                    })
                        // 取消
                        $('.gt-supSpanRt ,.gt-butNoSave').on('click',function(){
                            $('#gt-trans', parent.document).hide();
                            $('.gt-trans').hide();
                            $('#gt-typig').hide();
                             $('#gt-typigSms').hide();
                        })
                    // 选择公告类型
                    $('.gt-round').on('click',function(){
                        $('.gt-round').removeClass('gt-roundRB')
                       $('.gt-round').find('span').removeClass('gt-roundSpan')
                        $(this).addClass('gt-roundRB');
                        $(this).find('span').addClass('gt-roundSpan');
                    })

                    /*  隐藏警告   */
                    $('#gt-titleCent,#gt-noticeContent').on('click',function(){
                        $('.gt-repateconts2').hide();
                        $('.gt-repateconts').hide();
                    })
                    //    确定添加公告
                    $('#gt-butSave').on('click',function(){
                         
                        $('#gt-typeNotice1 .gt-round').each(function(){
                            
                            if($(this).hasClass('gt-roundRB')){
                                 self.typeNBer=0;
                                    }else{
                                        self.typeNBer=1;
                                    }
                                })


                         var noticeTitle =$('#gt-titleCent').val();
                           var  noticeContent=$('#gt-noticeContent').val() ;
                           var reg =( /^\s*$/g).test(noticeTitle);
                            
                           if(noticeTitle==''||noticeTitle==null||noticeTitle==undefined||reg){
                              $('.gt-repateconts2').show();
                            return;
                           }else{
                            $('.gt-repateconts2').hide();
                           }
                           if( noticeContent==''|| noticeContent==null||noticeContent==undefined){
                            $('.gt-repateconts').show();
                            return;
                           }else{
                            $('.gt-repateconts').hide();
                           }
                        
                            console.log(self.typeNBer);  
                           console.log(noticeTitle)  ;
                            console.log(noticeContent)        
                               $.ajax({
                                        url:url+'/addNotice.do',
                                        data:{
                                      noticeContent:noticeContent,
                                          noticeTitle:noticeTitle,
                                          noticeType:self.typeNBer,                             
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                 self.initi_noce();
                                                  self.notice_Type();
                                               

                                             $('#gt-trans', parent.document).hide();
                                             $('.gt-trans').hide();
                                             $('#gt-typig').hide();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                    })
                    //   删除公告
                    $(document).on('click','.gt-noticDel',function(){
                        var id=$(this).data('id');
                          $.ajax({
                                        url:url+'/deleteNotice.do',
                                        data:{
                                       id:id,
                                                                       
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   self.initi_noce();
                                                    self.notice_Type();
                                                
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                                         

                    })
                // 短信通知
              $('#gt-StuFile').on('click',function(){
                 $(this).addClass('gt-clikStyl');
                 $(this).siblings().removeClass('gt-clikStyl');
                 $('.gt-MIS').hide();
                 $('.gt-SMS').show();
                  $.ajax({
                                       url:url+'/smsList.do',
                                        data:{
                                                                               
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             self.message_rend(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                })

                          // 短信首页
              $('#gt-homePg2').on('click',function(){
                               $.ajax({
                                        url:url+'/smsList.do',
                                        data:{
                                     
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   self.message_rend(res.data);
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //  短信 翻页 下一页
                          
                            $('#gt-nextPg2').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                  url:url+'/smsList.do',
                                        data:{
                                     
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                   self.message_rend(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })




                    /*   发送短信 */
                    $('#gt-sendMAge').on('click',function(){
                          $('#gt-trans', parent.document).show();
                            $('.gt-trans').show();
                            $('#gt-typigSms').show();
                    })

                   /*   取消警告   */
                   $('#gt-noticeContent2,#gt-noticeContent3').on('click',function(){
                    $('.gt-nolySmcent').hide();

                   })

                    //  确定发送
                    $('#gt-butSaveSms').on('click',function(){
                       
                        var  smsContent=$('#gt-noticeContent2').val();
                        var reg =( /^\s*$/g).test( smsContent);
                        //  如果是空，或者""
                       
                        if(smsContent===''||smsContent===undefined||smsContent==null||reg){
                                $('.gt-nolySmcent').show();
                                 return;
                        }else{
                            $('.gt-nolySmcent').hide();
                        }
                        console.log(smsContent);
                         $.ajax({
                                       url:url+'/addSms.do',
                                        data:{
                                            smsContent:smsContent,
                                            teamId:'1',   
                                            
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                              self.initi_Sms();
                                              $('#gt-trans', parent.document).hide();
                                              $('.gt-trans').hide();
                                              $('#gt-typigSms').hide();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                    })


           },
            // 遍历公告类型
            notice_Type:function(){
               $('#gt-table1 .gt-list').each(function(){
                   var noticeType=$(this).data('noticetype');
                   if(noticeType==0){
                      $(this).text('内部公告')
                   }else{
                       $(this).text('外部公告')
                   }
               })

            },
   

            
           initi_Sms:function(){
               var self=this;
                    $.ajax({
                                       url:url+'/smsList.do',
                                        data:{
                                                                               
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                             self.message_rend(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                            
           },


           initi_noce:function(){
               var self=this;
                    $.ajax({
                                       url:url+'/noticeList.do',
                                        data:{
                                                                               
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                            self.notice_rend(res.data);
                                            self.notice_Type();
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });
                            
           },


            //   公告
               notice_rend:function(data){
                  var self=this;
                    //  当前页

                       for(var i=0;i<data.subList.length;i++){
                           data.subList[i].updateDate=(new Date(data.subList[i].updateDate).Format("yyyy-MM-dd  hh:mm:ss"));  
          
                                 }
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
          
            // 短信
               message_rend:function(data){
                  var self=this;
                   for(var i=0;i<data.subList.length;i++){
                           data.subList[i].updateDate=(new Date(data.subList[i].updateDate).Format("yyyy-MM-dd  hh:mm:ss"));  
          
                                 }
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
        
                // 获取html的模板
                var htmlTpl = $('#table2').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data.subList});
             
                $('#gt-table2').html(htmlStr);
               $('#gt-showPg2').text(self.currentPg);  
            },



           /*  表格title属性 */
        titel:function(){
            
             $("td").each(function(){
              
            $(this).attr("title",$(this).text());
           
           });
       },
    };
    notice.initi();
})()


