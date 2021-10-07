//list highlight
function mouseover_function(id){
    document.getElementById(id).style = "border: solid 1px gray; border-radius: 2em";
}
function mouseout_function(id){
    document.getElementById(id).style = "border: solid 0px gray; border-radius: 2em";
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
        } else {
            if(txtValue == "Add a restaurant"){
                li[i].style.display = "";
            }else{
                li[i].style.display = "none";
            }
        }
    }
}

function create_list_function(location_list){
    for(var i=0;i<location_list.length;i++){
        var li_ele = document.createElement('li');
        li_ele.setAttribute('id','list_'+i);
        var a_ele = document.createElement('a');
        a_ele.innerHTML = location_list[i][0];
        a_ele.href = "#";
        li_ele.appendChild(a_ele);
        li_ele.setAttribute("onmouseout","mouseout_function('list_"+i+"')");
        li_ele.setAttribute("onmouseover","mouseover_function('list_"+i+"')");
        document.getElementById("list").appendChild(li_ele);
    };
}

//content div control
function show_detail(index){      
    document.getElementById("list").style = "display:none";
    document.getElementById("search_bar").style = "display:none";
    document.getElementById("detail").style = "display:block";

    document.getElementById("name").value = locations[index][0];
    document.getElementById("lat").value = locations[index][1];
    document.getElementById("lng").value = locations[index][2];
    document.getElementById("review").value = locations[index][4];
    document.getElementById("review_detail").value = locations[index][5];
    document.getElementById("myList").value = locations[index][3];

    document.getElementById("name").addEventListener("change", function() {
        document.getElementById("name_link").style = "display: block";
        document.getElementById("name_link").href = "http://maps.google.co.in/maps?q=" + document.getElementById("name").value;
        document.getElementById("name_latlng").style = "display:block;";
        document.getElementById("name_latlng_btn").style = "display:block;";
        document.getElementById("name_btn").addEventListener("click", function() {
            locations[index][0] = document.getElementById("name").value;
        }, false);
    }, false);

    document.getElementById("name_latlng").addEventListener("change", function() {
        document.getElementById("name_latlng_btn").addEventListener("click", function() {
            locations[index][1] = document.getElementById("name_latlng").value.split(", ")[0];
            locations[index][2] = document.getElementById("name_latlng").value.split(", ")[1];
            document.getElementById("lat").value = locations[index][1];
            document.getElementById("lng").value = locations[index][2];
            document.getElementById("name_latlng").style = "display:none;";
            document.getElementById("name_latlng_btn").style = "display:none;";
        }, false); 
    }, false);

    document.getElementById("lat").addEventListener("change", function() {
        locations[index][1] = document.getElementById("lat").value;
    }, false);

    document.getElementById("lng").addEventListener("change", function() {
        locations[index][2] = document.getElementById("lng").value;
    }, false);

    document.getElementById("review").addEventListener("change", function() {
        locations[index][4] = document.getElementById("review").value;
    }, false);

    document.getElementById("review_detail").addEventListener("change", function() {
        locations[index][5] = document.getElementById("review_detail").value;
    }, false);
    
    document.getElementById("back_btn").style = "display:inline";
    document.getElementById("back_btn").addEventListener("click", function() {
        main_list();
    }, false);

    document.getElementById("del_btn").style = "display:inline";
    document.getElementById("del_btn").addEventListener("click", function() {
        delete_function(locations[index][6]);
    }, false);

    document.getElementById("save_btn").style = "display:block"; 
    document.getElementById("save_btn").addEventListener("click", function() {
        locations[index][3] = type;
        for(var i=0;i<4;i++){
            if(locations[index][i] == null){
                alert("insufficient input");
                return false;
            }else{}
        }
        for(var i=4;i<6;i++){
            if(locations[index][i] == null){
                locations[index][i] = "";
            }else{}
        }
        save(locations[index][6],index);
    }, false);
}
function main_list(){
    type = null;
    document.getElementById("list").style = "display:block";
    document.getElementById("search_bar").style = "display:block";
    document.getElementById("detail").style = "display:none";
    document.getElementById("back_btn").style = "display:none";
    document.getElementById("save_btn").style = "display:none";
    document.getElementById("name_latlng").style = "display:none;";
    document.getElementById("name_latlng_btn").style = "display:none;";
}

function add_location(){
    document.getElementById("list").style = "display:none";
    document.getElementById("search_bar").style = "display:none";
    document.getElementById("detail").style = "display:block";

    document.getElementById("myList").value = "";
    document.getElementById("name").value = "";
    document.getElementById("lat").value = "";
    document.getElementById("lng").value = "";
    document.getElementById("review").value = "";
    document.getElementById("review_detail").value = "";


    document.getElementById("name").value = document.getElementById("search_bar").value;
    var upload_location_array = [];

    document.getElementById("name_btn").addEventListener("click", function() {
        document.getElementById("name_link").href = "http://maps.google.co.in/maps?q=" + document.getElementById("name").value;
        document.getElementById("name_latlng").style = "display:block;";
        document.getElementById("name_latlng_btn").style = "display:block;";
        upload_location_array[0] = document.getElementById("name").value;
    }, false);

    document.getElementById("name_latlng_btn").addEventListener("click", function() {
        upload_location_array[1] = document.getElementById("name_latlng").value.split(", ")[0];
        upload_location_array[2] = document.getElementById("name_latlng").value.split(", ")[1];
        document.getElementById("lat").value = upload_location_array[1];
        document.getElementById("lng").value = upload_location_array[2];
        document.getElementById("name_latlng").style = "display:none;";
        document.getElementById("name_latlng_btn").style = "display:none;";
    }, false); 

    document.getElementById("lat").addEventListener("change", function() {
        upload_location_array[1] = document.getElementById("lat").value;
    }, false);

    document.getElementById("lng").addEventListener("change", function() {
        upload_location_array[2] = document.getElementById("lng").value;
    }, false);

    document.getElementById("review").addEventListener("change", function() {
        upload_location_array[4] = document.getElementById("review").value;
    }, false);

    document.getElementById("review_detail").addEventListener("change", function() {
        upload_location_array[5] = document.getElementById("review_detail").value;
    }, false);
    
    document.getElementById("back_btn").style = "display:inline";
    document.getElementById("back_btn").addEventListener("click", function() {
        main_list();
    }, false);

    document.getElementById("save_btn").style = "display:block"; 
    document.getElementById("save_btn").addEventListener("click", function() {
        upload_location_array[3] = type;
        for(var i=0;i<4;i++){
        if(upload_location_array[i] == null){
            alert("insufficient input");
            return false;
        }else{}
        }
        for(var i=4;i<6;i++){
        if(upload_location_array[i] == null){
            upload_location_array[i] = "";
        }else{}
        }
        upload_location(upload_location_array);
    }, false);
}

var locations;
var type;
function onload_function(){
    //loading data from server
    locations = load_database_locations();
    create_list_function(locations);
    load_database_versions();


    let ul = document.getElementsByTagName('ul')[0];
    ul.onclick = function(e){
        if (e.target != ul) {
            for(var i=0;i<locations.length;i++){
                if(locations[i][0] == e.target.innerText){
                    show_detail(i);
                }else if(e.target.innerText == "Add a restaurant"){
                    add_location();
                }
                else{};
            }
        }
    }

    document.getElementById("myList").addEventListener("change", function() {
        type = this.value;
    }, false);

}