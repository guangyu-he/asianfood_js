//versions
var versions_local = {
    id: "",
    web_version: 202110032206,
    data_version: 202110031630
};

function load_database_versions(){
    var data_from_php = $.ajax(
      {
        url: 'return_versions.php',
        success: function (data) {},
        dataType: "text",
        async: false,
        error: function (err) {
            console.log(err);
        }
      }
    ).responseText;
    var version_list = data_from_php.split('<br>');
    versions_local.data_version = parseInt(version_list[2]);
    versions_local.id = version_list[0];
    if(versions_local.web_version <= parseInt(version_list[1])){
        versions_local.web_version = parseInt(version_list[1]);
    }else{};
  
    document.getElementById("version").innerHTML = " Web Version:"+versions_local.web_version+" Data Version:"+versions_local.data_version;
}

function load_database_locations(){
    var data_from_php = $.ajax(
      {
        url: 'return_locations.php',
        success: function (data) {},
        dataType: "text",
        async: false,
        error: function (err) {
            console.log(err);
        }
      }
    ).responseText;
    if( data_from_php == null || data_from_php == ""){
      return locations_builtin;
    }else{
      var location_list = data_from_php.split('<br>');
      var locations_out = [];
      for(var i=0;i<location_list.length - 1;i++){
        locations_out[i] = location_list[i].split(",");
        locations_out[i][1] = parseFloat(locations_out[i][1]);
        locations_out[i][2] = parseFloat(locations_out[i][2]);
      };
      return locations_out;
    }
  }

function delete_function(id){
    var url_delete_location = "../delete_locations.php?id="+id;
    $.ajax({
        url: url_delete_location,
        success: function (data) {
        //console.log(data);
        },
        error: function (err) {
        console.log(err);
        }     
    });

    window.location.reload(true);
}

function save(id,i){
    var url_update_location = "../update_locations.php?n="+locations[i][0]+"&lat="+locations[i][1]+"&lng="+locations[i][2]+"&type="+locations[i][3]+"&r="+locations[i][4]+"&rd="+locations[i][5]+"&id="+locations[i][6];
    $.ajax({
        url: url_update_location,
        success: function (data) {
        //console.log(data);
        },
        error: function (err) {
        console.log(err);
        }     
    });

    versions_local.data_version = return_version_date();
    var url_update_version = "../update_versions.php?id="+versions_local.id+"&wv="+versions_local.web_version+"&dv="+versions_local.data_version;
    $.ajax({
        url: url_update_version,
        success: function (data) {
        //console.log(data);
        },
        error: function (err) {
        console.log(err);
        }     
    });

    window.location.reload(true);
}

function upload_location(array){
    var url_upload_location = "../upload_locations.php?n="+array[0]+"&lat="+array[1]+"&lng="+array[2]+"&type="+array[3]+"&r="+array[4]+"&rd="+array[5];
    $.ajax({
        url: url_upload_location,
        success: function (data) {
            //console.log(data);
        },
        error: function (err) {
            console.log(err);
        }     
    });

    versions_local.data_version = return_version_date();
    var url_update_version = "../update_versions.php?id="+versions_local.id+"&wv="+versions_local.web_version+"&dv="+versions_local.data_version;
    $.ajax({
        url: url_update_version,
        success: function (data) {
            //console.log(data);
        },
        error: function (err) {
            console.log(err);
        }     
    });

    //window.location.reload(true);
  }
  