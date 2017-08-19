console.log(225);

     $('.gt-Name').on('click',function(){
  $('.gt-tishi').hide();
   $('.gt-Pag').hide();
    })

   $('.gt-passg').on('click',function(){
  $('.gt-Pag').hide();
  $('.gt-tishi').hide();
    })
$('.gt-entry').on('click',function(){

   var val=$('.gt-Name').val();
   var passgVal=$('.gt-passg').val();
     if(!val){
        $('.gt-tishi').show();
        return;
     }
    
    if(!passgVal){
        $('.gt-Pag').show();
        return;
     }

$.ajax({
              url:'https://api.asilu.com/weather/',
                data:{
                    sessionId: self.sessionId,
                    isMore: self.isMore
                },
                type:'get',
                dataType:'jsonp',
                success: function(res){
                       console.log(res)
                     if(res.resCode==='000'){
                    
                   
                     }
               },
                error: function(){
                   console.log('网络出错');
                  
                }
             });

})

 