//initialization
let map;
let markers = [];
var infowindow;

//locations 
var locations = [
  ['Nin Hao', 52.512362451375004, 13.312230259842423,'cn'],
  ['MAMECHA Green Tea', 52.52733787931988, 13.406346673335841,'jp'],
  ['Cocolo Ramen', 52.52733460659252, 13.399351013815066,'jp'],
  ['Cocoro Japanese Kitchen', 52.49091908101604, 13.38632444596675,'jp'],
  ['Ishin Mittelstraße', 52.5181655951808, 13.386820790527805,'jp'],
  ['How How Restaurantbetriebs',52.601130133487196, 13.330617427385228,'cn'],
  ['Jing Yang',52.45606094461519, 13.32475671573826,'cn'],
  ['Do De Li',52.5064500779616, 13.31019782923253,'cn'],
  ['LIU Nudelhaus',52.51132796493441, 13.38756865621812,'cn'],
  ['Heno Heno',52.50403598621028, 13.315699469710632,'jp'],
  ['Zen',52.5010634587002, 13.325309240874818,'jp'],
  ['Wawa Berlin',52.49038846558931, 13.355625269710188,'kr'],
  ['Angry Chicken',52.500725810242265, 13.422956342725069,'kr'],
  ['Arirang Restaurant',52.507026931111284, 13.326133145116177,'kr'],
  ['Monsieur Vuong',52.5267942084373, 13.407943410189501,'vi'],
];
var locations_sel = locations;
var locations_cn = [];
var locations_jp = [];
var locations_kr = [];
var locations_vi = [];
var i_cn = 0,i_jp = 0,i_kr = 0,i_vi = 0;
for(var i=0;i<locations.length;i++){
  if(locations[i][3] == 'cn'){
    locations_cn[i_cn] = locations[i];
    i_cn++;
  }else if(locations[i][3] == 'jp'){
    locations_jp[i_jp] = locations[i];
    i_jp++;
  }else if(locations[i][3] == 'kr'){
    locations_kr[i_kr] = locations[i];
    i_kr++;
  }else if(locations[i][3] == 'vi'){
    locations_vi[i_vi] = locations[i];
    i_vi++;
  }else{}
}

function initMap() {
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
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

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const measle = new google.maps.Marker({
          position: pos,
          map: map,
          icon: {
            url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
            size: new google.maps.Size(7, 7),
            anchor: new google.maps.Point(4, 4),
          }
        });

        google.maps.event.addListener(measle, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent("your location");
            infowindow.open(map, marker);
            map.setCenter(pos);
          }
        })(measle, i));
      },
      () => {
        handleLocationError(true, infowindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infowindow, map.getCenter());
  }

  create_list_function(locations_sel);
  create_markers_function(locations_sel);
  create_marker_listener_function(locations_sel);

  let ul = document.getElementsByTagName('ul')[0];
  ul.onclick = function(e){
      if (e.target != ul) {
          for(var i=0;i<locations_sel.length;i++){
              if(locations_sel[i][0] == e.target.innerText){
                  click_marker_function(locations_sel,i,markers[i])
              }else{};
          }
      }
  }

  document.getElementById("myList").addEventListener("change", function() {

    document.getElementById("search_bar").value = "";
    document.getElementById("search_bar").placeholder = "Search for names..";

    for (var i = 0; i < locations_sel.length; i++) {
      var list =document.getElementById('list_'+i);
      list.parentNode.removeChild(list);
    }
    if(this.value == "All"){
      locations_sel = locations;
    }else if(this.value == "Chinese"){
      locations_sel = locations_cn;
    }else if(this.value == "Jap"){
      locations_sel = locations_jp;
    }else if(this.value == "Korean"){
      locations_sel = locations_kr;
    }else if(this.value == "Viet"){
      locations_sel = locations_vi;
    }else{}

    deleteMarkers();
    create_list_function(locations_sel);
    create_markers_function(locations_sel);
    create_marker_listener_function(locations_sel);
    showMarkers()
    map.setZoom(13);

  }, false);

}

//content div control
function show_detail(location,index){
  for(var i=0;i<markers.length;i++){
    if(i != index){
      markers[i].setMap(null);
    }else{
      markers[i].setMap(map);
    }
  }
  
  document.getElementById("list").style = "display:none";
  document.getElementById("select_type").style = "display:none";

  document.getElementById("detail").style = "display:block";

  var text_ele = document.createElement('text');
  text_ele.innerHTML = location[index][0] + '<br>';
  text_ele.id = "name";
  document.getElementById("detail").appendChild(text_ele);

  var link_ele = document.createElement('a');
  //link_ele.href = "http://maps.google.com/maps?q=loc:" + location[index][1] + "," + location[index][2] + " (" + location[index][0] + ")";
  link_ele.href = "http://maps.google.co.in/maps?q=" + location[index][0];
  link_ele.innerHTML = "Open in Google";
  link_ele.target="_blank";
  link_ele.id = "name_link";
  document.getElementById("detail").appendChild(link_ele);

  document.getElementById("back_btn").style = "display:inline";
}
function main_list(){
  showMarkers();
  document.getElementById("list").style = "display:block";
  document.getElementById("select_type").style = "display:block";
  document.getElementById("search_bar").style = "display:block";

  document.getElementById("detail").style = "display:none";
  var text_ele = document.getElementById("name");
  text_ele.parentNode.removeChild(text_ele);
  var link_ele = document.getElementById("name_link");
  link_ele.parentNode.removeChild(link_ele);

  document.getElementById("back_btn").style = "display:none";
  map.setZoom(13);
}

//search bar control
function search_function() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search_bar");
  filter = input.value.toUpperCase();
  ul = document.getElementById("list");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
          markers[i].setMap(map);
      } else {
          li[i].style.display = "none";
          markers[i].setMap(null);
      }
  }
}

//control events
function create_list_function(location_list){
  for(var i=0;i<location_list.length;i++){
    var li_ele = document.createElement('li');
    li_ele.setAttribute('id','list_'+i);
    var a_ele = document.createElement('a');
    a_ele.innerHTML = location_list[i][0];
    a_ele.href = "#";
    li_ele.appendChild(a_ele);
    document.getElementById("list").appendChild(li_ele);
  };   
}
function create_markers_function(location_list){
  for (var i = 0; i < location_list.length; i++) {  
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(location_list[i][1], location_list[i][2]),
      map: map
    });
  markers.push(marker);
  }
}
function create_marker_listener_function(location_list){
  for (var i = 0; i < location_list.length; i++) {
    google.maps.event.addListener(markers[i], 'click', (function(marker, i) {
      return function() {
        click_marker_function(location_list,i,markers[i]);
      }
    })(markers[i], i));
  }
}
function click_marker_function(location_list,index,marker){
  document.getElementById("search_bar").style = "display:none";
  infowindow.setContent(location_list[index][0]);
  infowindow.open(map, marker);
  map.panTo({ "lat":location_list[index][1], "lng":location_list[index][2]});
  map.setZoom(16);
  show_detail(location_list,index);
}

//control markers
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
function deleteMarkers() {
  hideMarkers();
  markers = [];
}
function hideMarkers() {
  setMapOnAll(null);
}
function showMarkers() {
  setMapOnAll(map);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

//menu button
const menuButton = document.querySelector(".menu-button");
const menuOverlay = document.querySelector(".menu-overlay");
menuButton.addEventListener("click", function () {
  menuButton.classList.toggle("active");
  menuOverlay.classList.toggle("open");
});