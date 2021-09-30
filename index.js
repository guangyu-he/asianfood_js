
function initMap() {

    for(var i=0;i<locations.length;i++){
        var li_ele = document.createElement('li');
        //li_ele.setAttribute('onclick','test('+i+')');
        li_ele.setAttribute('id','list_'+i);
        li_ele.innerHTML = locations[i][0];
        document.getElementById("list").appendChild(li_ele);
    };    

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: { "lat":52.517674728732054,"lng":13.393789389208452 },
      zoomControl: true,
      scaleControl: false,
      fullscreenControl:false,
      mapTypeControl:false,
      streetViewControl:false,
      gestureHandling: "greedy",
      maxZoom: 15 + 3,
      mapId: "e04d39f76af137b0",
    });

    var marker;
    var infowindow = new google.maps.InfoWindow();

    for (var i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
          map.panTo({ "lat":locations[i][1], "lng":locations[i][2]});
          map.setZoom(15);
          //alert("!!!");
        }
      })(marker, i));
    }

    let ul = document.getElementsByTagName('ul')[0];
    ul.onclick = function(e){
        if (e.target != ul) {
            var index_name = e.target.innerText;
            for(var i=0;i<locations.length;i++){
                if(locations[i][0] == index_name){
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                        map: map
                      });
                    infowindow.setContent(locations[i][0]+"<br>"+"Tel:");
                    infowindow.open(map, marker);
                    map.panTo({ "lat":locations[i][1], "lng":locations[i][2]});
                    map.setZoom(16);
                }else{};
            }
        }
    }
}

var locations = [
    ['Nin Hao', 52.512362451375004, 13.312230259842423],
    ['MAMECHA Green Tea', 52.52733787931988, 13.406346673335841],
    ['Cocolo Ramen', 52.52733460659252, 13.399351013815066],
    ['Cocoro Japanese Kitchen', 52.49091908101604, 13.38632444596675],
    ['Ishin Mittelstraße', 52.5181655951808, 13.386820790527805]
  ];
