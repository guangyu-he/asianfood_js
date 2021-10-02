var locations_builtin = [
    ['Nin Hao', 52.512362451375004, 13.312230259842423,'cn','',''],
    ['MAMECHA Green Tea', 52.52733787931988, 13.406346673335841,'jp','',''],
    ['Cocolo Ramen', 52.52733460659252, 13.399351013815066,'jp','',''],
    ['Cocoro Japanese Kitchen', 52.49091908101604, 13.38632444596675,'jp','',''],
    ['Ishin Mittelstraße', 52.5181655951808, 13.386820790527805,'jp','',''],
    ['How How Restaurantbetriebs',52.601130133487196, 13.330617427385228,'cn','',''],
    ['Jing Yang',52.45606094461519, 13.32475671573826,'cn','',''],
    ['Do De Li',52.5064500779616, 13.31019782923253,'cn','',''],
    ['LIU Nudelhaus',52.51132796493441, 13.38756865621812,'cn','',''],
    ['Heno Heno',52.50403598621028, 13.315699469710632,'jp','',''],
    ['Zen',52.5010634587002, 13.325309240874818,'jp','',''],
    ['Wawa Berlin',52.49038846558931, 13.355625269710188,'kr','',''],
    ['Angry Chicken',52.500725810242265, 13.422956342725069,'kr','',''],
    ['Arirang Restaurant',52.507026931111284, 13.326133145116177,'kr','',''],
    ['Monsieur Vuong',52.5267942084373, 13.407943410189501,'vi','',''],
  ];

var sql_return;
var sql_array,sql_name,sql_id,sql_gold,sql_usr_str,sql_pl,sql_updated_date;

function upload_locations(){
    for(var i=0;i<locations.length;i++){
        setTimeout(upload_location(locations[i]),500);
    }
}

function upload_location(location_list){
    if(location_list == null){
        return false;
    }
    else{
        console.log("upload_locations.php?n="+location_list[0]+"&lat="+location_list[1]+"&lng="+location_list[2]+"&type="+location_list[3]+"&r="+location_list[4]+"&rd="+location_list[5]);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET","upload_locations.php?n="+location_list[0]+"&lat="+location_list[1]+"&lng="+location_list[2]+"&type="+location_list[3]+"&r="+location_list[4]+"&rd="+location_list[5],true);
        xmlhttp.send();
    }
}

function load_database_locations(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function(){
        var sql_return = this.responseText;
        if(sql_return == "" || sql_return == null){
            locations = locations_builtin;
        }
        else{
            document.getElementById("upload_loc").style = "display:none";
            var location_list = sql_return.split('<br>');
            for(var i=0;i<location_list.length - 1;i++){
                locations[i] = location_list[i].split(",");
                locations[i][1] = parseFloat(locations[i][1]);
                locations[i][2] = parseFloat(locations[i][2]);
            };
        };
        initMap();
    };
    xmlhttp.open("GET","return_locations.php",true);
    xmlhttp.send();
}

function returnuser(str){
    if(str == ""){
      document.getElementById("txtHint").innerHTML = "";
      return;
    }
    else{ 
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onload = function(){
        sql_return = this.responseText;
      };
      xmlhttp.open("GET","returnuser.php?q="+str,true);
      xmlhttp.send();
    }
    setTimeout(function(){
        return;
    },50);
}

function adduser(pass){
    if(pass == ""){
      document.getElementById("txtHint").innerHTML = "";
      return;
    }
    else{
      var usr_js = JSON.stringify(usr);
      var pl_js = JSON.stringify(pl);
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onload = function(){
      };
      xmlhttp.open("GET","adduser.php?n="+usr.name+"&p="+pass+"&g="+usr.money+"&u="+usr_js+"&pl="+pl_js,true);
      xmlhttp.send();
    }
}

function user_log(){
  returnuser(document.getElementById("username_in").value);
  setTimeout(function(){
    sql_array = sql_return.split("<br>");
    var usr_password = sql_array[2];
    if(usr_password == document.getElementById("password_in").value){
      alert("登陆成功");
      sql_id = sql_array[0];
      usr = JSON.parse(sql_array[4]);
      pl = JSON.parse(sql_array[5]);
      sql_updated_date = sql_array[6];
      onload();
      closefunction();
    }
    else{
      alert("用户不存在或密码错误");
    }
  },50);
}

function user_reg(){
  returnuser(document.getElementById("username_in").value);
  setTimeout(function(){
    sql_array = sql_return.split("<br>");
    if(sql_array[1] == document.getElementById("username_in").value){
      alert("用户已存在");
    }
    else{
      usr.name = document.getElementById("username_in").value;
      adduser(document.getElementById("password_in").value);
      setTimeout(function(){
        alert("注册成功");
        onload();
        closefunction();
      },50);
    }
  },50);
}