//locations 
var locations_builtin = [
    ['Nin Hao', 52.512362451375004, 13.312230259842423,'Chinese','','',''],
    ['MAMECHA Green Tea', 52.52733787931988, 13.406346673335841,'Japanese','','',''],
    ['Cocolo Ramen', 52.52733460659252, 13.399351013815066,'Japanese','','',''],
    ['Cocoro Japanese Kitchen', 52.49091908101604, 13.38632444596675,'Japanese','','',''],
    ['Ishin Mittelstraße', 52.5181655951808, 13.386820790527805,'Japanese','','',''],
    ['How How Restaurantbetriebs',52.601130133487196, 13.330617427385228,'Chinese','','',''],
    ['Jing Yang',52.45606094461519, 13.32475671573826,'Chinese','','',''],
    ['Do De Li',52.5064500779616, 13.31019782923253,'Chinese','','',''],
    ['LIU Nudelhaus',52.51132796493441, 13.38756865621812,'Chinese','','',''],
    ['Heno Heno',52.50403598621028, 13.315699469710632,'Japanese','','',''],
    ['Zen',52.5010634587002, 13.325309240874818,'Japanese','','',''],
    ['Wawa Berlin',52.49038846558931, 13.355625269710188,'Korean','','',''],
    ['Angry Chicken',52.500725810242265, 13.422956342725069,'Korean','','',''],
    ['Arirang Restaurant',52.507026931111284, 13.326133145116177,'Korean','','',''],
    ['Monsieur Vuong',52.5267942084373, 13.407943410189501,'Viet','','',''],
  ];
var locations = [];
var locations_sel = [];

//versions
var versions_local = {
  id: "local",
  web_version: 202110071830,
  data_version: 202110071802
};

function upload_locations(){
  for(var i=0;i<locations.length;i++){
    var url_upload = "upload_locations.php?n="+locations[i][0]+"&lat="+locations[i][1]+"&lng="+locations[i][2]+"&type="+locations[i][3]+"&r="+locations[i][4]+"&rd="+locations[i][5];
    $.ajax({
      url: url_upload,
      success: function (data) {
        //console.log(data);
      },
      error: function (err) {
        console.log(err);
      }     
    });
  }

  var url_upload = "update_versions.php?id="+versions_local.id+"&dv="+return_version_date();
  $.ajax({
    url: url_upload,
    success: function (data) {
      //console.log(data);
    },
    error: function (err) {
      console.log(err);
    }     
  });

  window.location.reload(true);
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
  if( data_from_php == null || data_from_php == "" ){
    return locations_builtin;
  }else{
    document.getElementById("upload_loc").style = "display:none";
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
  }else{
    var url_update_version = "../update_versions.php?id="+versions_local.id+"&wv="+versions_local.web_version;
    $.ajax({
        url: url_update_version,
        success: function (data) {
            //console.log(data);
        },
        error: function (err) {
            console.log(err);
        }     
    });
  };
}

function onload_function(){
  //loading data from server
  locations = load_database_locations();
  load_database_versions();
  document.getElementById("version").innerHTML = "Version: " + versions_local.id;
  document.getElementById("web_version").innerHTML = "Web Version: " + versions_local.web_version;
  document.getElementById("data_version").innerHTML = "Data Version: " + versions_local.data_version;

  //load map
  initMap();
}