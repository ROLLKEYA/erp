
var url='http://localhost/erp/education';
   // 输入数字及一个小数点
            function clearNoNum(obj)
    {
        //先把非数字的都替换掉，除了数字和.
        obj.value = obj.value.replace(/[^\d.]/g,"");
        //必须保证第一个为数字而不是.
        obj.value = obj.value.replace(/^\./g,"");
        //保证只有出现一个.而没有多个.
        obj.value = obj.value.replace(/\.{2,}/g,".");
        //保证.只出现一次，而不能出现两次以上
        obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    }
    
    Date.prototype.Format = function (fmt) { //author: meizz  
            var o = {  
                "M+": this.getMonth() + 1, //月份  
                "d+": this.getDate(), //日  
                "h+": this.getHours(), //小时  
                "m+": this.getMinutes(), //分  
                "s+": this.getSeconds(), //秒  
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度  
                "S": this.getMilliseconds() //毫秒  
            };  
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
            for (var k in o)  
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
            return fmt;  
        };  
            function stopPropagation(e) { 
            if (e.stopPropagation) 
            e.stopPropagation(); 
            else 
            e.cancelBubble = true; 
            } 

            //   for(var i=0;i<data.subList.length;i++){
            //                data.subList[i].startDate=(new Date(data.subList[i].startDate).Format("yyyy-MM-dd  hh:mm:ss"));  
            //                  data.subList[i].endDate=(new Date(data.subList[i].endDate).Format("yyyy-MM-dd "));                     
                                        
            //                      }
        