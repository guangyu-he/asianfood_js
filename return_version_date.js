function return_version_date(){
    var time = new Date();
    var year = String(time.getFullYear());
    var month_int = time.getMonth()+1;
    var month;
    if(month_int<10){
        month = "0" + String(month_int);
    }else{
        month = String(month_int);
    }
    var day_int = time.getDate();
    var day;
    if(day_int<10){
        day = "0" + String(day_int);
    }else{
        day = String(day_int);
    }
    var hour_int = time.getHours();
    var hour;
    if(hour_int<10){
        hour = "0" + String(hour_int);
    }else{
        hour = String(hour_int);
    }
    var min_int = time.getMinutes();
    var min;
    if(min_int<10){
        min = "0" + String(min_int);
    }else{
        min = String(min_int);
    }
    return year+month+day+hour+min;
}