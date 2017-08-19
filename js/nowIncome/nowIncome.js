console.log('当班收入');
(function(){
    var nowIncome={
       initi:function(){
            this.nowIncome_bind();
           
                
           },
   
           nowIncome_bind:function(){
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
                 $('#gt-query', parent.document).on('click',function(){
                  $.ajax({     
                                       url:url+'/nowIncome.do',
                                        data:{
                                                                               
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                          console.log('当班收入');
                                             if(res.code===100){
                                           self.nowIncome_rend(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });


                 })

               
                                        // 首页
              $('#gt-homePg1').on('click',function(){
                               $.ajax({
                                       url:url+'/nowIncome.do',
                                        data:{
                                     
                                     curPage:1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                    self.nowIncome_rend(res.data);
                                              
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })
                        
                            //  下一页
                          
                            $('#gt-nextPg1').on('click',function(){
                                console.log( self.currentPg)
                               $.ajax({
                                url:url+'/nowIncome.do',
                                        data:{
                                     
                                      curPage: self.currentPg+1, //当前页                                     
                                        },
                                        type:'post',
                                        dataType:'json',
                                        success: function(res){                                       
                                          console.log(res)
                                             if(res.code===100){
                                                    self.nowIncome_rend(res.data);
                                             }
                                        },
                                        error: function(){
                                            console.log('网络出错');
                                        }
                                    });

                            })

           },
             


    //   
               nowIncome_rend:function(data){
                  var self=this;
                    //  当前页
                self.currentPg=data.curPage;
                //总页数
                self.pageCount=data.pageCount;
                for(var i=0;i<data.subList.length;i++){
                    if(data.subList[i].actualMoney===null||data.subList[i].actualMoney===''||data.subList[i].actualMoney===undefined){
                            data.subList[i].actualMoney=0;
                    }

                }
        
                // 获取html的模板
                var htmlTpl = $('#table1').html();
                // 生成html字符串，用于渲染
                var htmlStr = _.template(htmlTpl)({list:data.subList});
             
                 
                $('#gt-table1').html(htmlStr);
               $('#gt-showPg1').text(self.currentPg);  

                $('#gt-table1 .gt-payfor').each(function(){

                  var payfor=($(this).data('pafor'))
                    if( payfor===0){
                        $(this).text('现金支付');
                    }else if( payfor===1){
                                 $(this).text('银行卡支付');
                    }else if( payfor===2){
                                 $(this).text('储值卡支付');
                    }else if( payfor===3){
                                 $(this).text('扫码支付');
                    }
                })
            },


           /*  表格title属性 */
        titel:function(){
            
             $("td").each(function(){
              
            $(this).attr("title",$(this).text());
           
           });
       },
    };
    nowIncome.initi();
})()


