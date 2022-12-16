//calgarydataScripts.js


//Top Button Functionality
window.onscroll = function() {scrolled()};

function scrolled() {
    if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
        document.getElementById("topbutton").style.display = "block";
        // document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("topbutton").style.display = "none";
        // document.getElementById("myBtn").style.display = "none";
    }
}

function setToTop() {
    document.documentElement.scrollTop = 0;
}




//Searching functions
var searchtype;

function searchtypefunction(typeid) {
    searchtype=typeid;

    if(searchtype > 0) {
        document.getElementById("search").style.display = "block";
        document.getElementById("visual").style.display = "none";
        document.getElementById("datacontent").style.display = "block";
    } else if(searchtype == 0) {
        document.getElementById("search").style.display = "none";
        document.getElementById("visual").style.display = "block";
        document.getElementById("datacontent").style.display = "none";
    }


    var trafficincidentsinfo=`
    <h2>Traffic Incidents</h2>
    <ul>
        <li><strong>Incident Info</strong><br>
            &emsp;Location of incident in Calgary<br>
            <strong>Example: Heritage Drive and Glemore Trail SE</strong>
        </li>
        <li><strong>Description</strong><br>
            &emsp;Type of accident. Road Affected<br>
            <strong>Example: Traffic incident. Partially blocking the WB exit from Glenmore TR</strong>
        </li>
        <li><strong>Modified Date</strong><br>
            &emsp;Official date of incident<br>
            &emsp;Follows format: YYYY-MM-DD<br>
            &emsp;Followed with no space by a time stamp<br>
            &emsp;Starts with 'T': Thh:mm:ss:ms<br>
            <strong>Example: 2021-11-17T05:45:14.000</strong>
        </li>
        <li><strong>Quadrant</strong><br>
            &emsp;The quadrants of Calgary:<br>
            &emsp;NW, NE, SW, SE<br>
            <strong>Example: NW</strong>
        </li>
    </ul>`;

    var trafficcamerasinfo=`
    <h2>Traffic Cameras</h2>
    <ul>
        <li><strong>Description</strong><br>
            &emsp;Uniquely identifies camera<br>
            &emsp;Starts with: Camera<br>
            &emsp;Followed by: Number<br>
            <strong>Example: Camera 137</strong>
        </li>
        <li><strong>Quadrant</strong><br>
            &emsp;The quadrants of Calgary:<br>
            &emsp;NW, NE, SW, SE<br>
            <strong>Example: NW or NW/NE</strong>
        </li>
        <li><strong>Camera Location</strong><br>
            &emsp;Address Location in Calgary<br>
            <strong>Sample Searches:</strong><br>
            &emsp;Stoney Trail / Harvest Hills Blvd N<br>
            &emsp;Glenmore Trail / Blackfoot Trail SE<br>
            &emsp;Crowchild Trail / Nosehill Drive NW<br>
        </li>
    </ul>`;

    var crimestatsinfo=`
    <h2>Crime Stats</h2>
    <ul>
        <li><strong>Sector</strong><br>
            &emsp;A sector of Calgary<br>
            <strong>Example: NORTHEAST</strong>
        </li>
        <li><strong>Community Name</strong><br>
            &emsp;A community in Calgary<br>
            <strong>Example: Sunridge</strong>
        </li>
        <li><strong>Category</strong><br>
            &emsp;Category of Crime<br>
            <strong>Sample Searches:</strong><br>
            &emsp;Theft FROM Vehicle<br>
            &emsp;Social Disorder<br>
            &emsp;Commercial Break & Enter<br>
        </li>
        <li><strong>Date</strong><br>
            &emsp;The date of the crime<br>
            &emsp;Follows format: YYYY-MM-DD<br>
            &emsp;the following time stamp isn't necessary<br>
            &emsp;The only crimes on record are from November 2019.<br>
            <strong>Example: 2019-11-01</strong>
        </li>
    </ul>`;

    var buildingpermitsinfo=`
    <h2>Building Permits</h2>
    <ul>
        <li><strong>Permit Number</strong><br>
            &emsp;A unique permit id<br>
            &emsp;Starts with prefix: BP2021-<br>
            &emsp;followed by a 5 digit number<br>
            <strong>Example: BP2021-20438</strong>
        </li>
        <li><strong>Applied Date</strong><br>
            &emsp;Date of permit<br>
            &emsp;Follows format: YYYY-MM-DD<br>
            &emsp;the following time stamp isn't necessary<br>
            <strong>Example: 2021-11-30</strong>
        </li>
        <li><strong>Permit Type</strong><br>
            &emsp;Specific permit type<br>
            <strong>Sample Searches:</strong><br>
            &emsp;Single Construction Permit<br>
            &emsp;Residential Improvement Project<br>
            &emsp;Commercial / Multi Family Project
        </li>
        <li><strong>Community Name</strong><br>
            &emsp;Communities within Calgary<br>
            <strong>Example: Cornerstone</strong>
        </li>
    </ul>`;


    //check for which dataset information to display
    if(searchtype==1) {
        document.getElementById("displayinformation").innerHTML = trafficincidentsinfo;
    }
    if(searchtype==2) {
        document.getElementById("displayinformation").innerHTML = trafficcamerasinfo;
    }
    if(searchtype==3) {
        document.getElementById("displayinformation").innerHTML = crimestatsinfo;
    }
    if(searchtype==4) {
        document.getElementById("displayinformation").innerHTML = buildingpermitsinfo;
    }
}


//Loads data that matches user selection
function searchFunction() {

    if(searchtype==1){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://data.calgary.ca/resource/35ra-9556.json", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                displayData(xhr);//display data
            }
        };


        xhr.onerror=function(){
            alert("Connection ERROR..");
        };
        xhr.send();
    }

    if(searchtype==2){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://data.calgary.ca/resource/k7p9-kppz.json", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                displayData(xhr);//display data
            }
        };


        xhr.onerror=function(){
            alert("Connection ERROR..");
        };
        xhr.send();
    }

    if(searchtype==3){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://data.calgary.ca/resource/848s-4m4z.json", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                displayData(xhr);//display data
            }
        };


        xhr.onerror=function(){
            alert("Connection ERROR..");
        };
        xhr.send();
    }

    if(searchtype==4){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://data.calgary.ca/resource/c2es-76ed.json", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                displayData(xhr);//display data
            }
        };


        xhr.onerror=function(){
            alert("Connection ERROR..");
        };
        xhr.send();
    }
}


//displays data according to user selection
function displayData(xhr) {
    var dataset = JSON.parse(xhr.responseText);
    var output = "<table>";
    var searchinput = document.getElementById("searchbar").value;
    var recordattribute="";


    if(searchtype==1) //Traffic Incidents
    {
        if (searchinput != "Search here! Results are below.") {
            output += "<tr><th>"+
                "Incident Info"+
                "</th><th>"+
                "Description"+
                "</th><th>"+
                "Modified Date"+
                "</th><th>"+
                "Quadrant"+
                "</th><th>"+
                "Location"+
                "</th></tr>";
        }


        for (var i = 0; i < dataset.length; i++) {

            var index = dataset[i];

            //get incident info
            recordattribute=""+ index.incident_info;
            if(recordattribute.toUpperCase().startsWith(" "+searchinput.toUpperCase())) {
                var location=index.latitude+","+index.longitude;
                output += "<tr><th>"+
                    index.incident_info+
                    "</th><td>"+
                    index.description+
                    "</td><td>"+
                    index.modified_dt+
                    "</td><td>"+
                    index.quadrant+
                    "</td><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td></tr>";
            }

            //get description
            recordattribute=""+ index.description;
            if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
                var location=index.latitude+","+index.longitude;
                output += "<tr><td>"+
                    index.incident_info+
                    "</td><th>"+
                    index.description+
                    "</th><td>"+
                    index.modified_dt+
                    "</td><td>"+
                    index.quadrant+
                    "</td><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td></tr>";
            }

            //get modified date
            recordattribute=""+ index.modified_dt;
            if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
                var location=index.latitude+","+index.longitude;
                output += "<tr><td>"+
                    index.incident_info+
                    "</th><td>"+
                    index.description+
                    "</td><th>"+
                    index.modified_dt+
                    "</th><td>"+
                    index.quadrant+
                    "</td><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td></tr>";
            }

            //get quadrant
            recordattribute=""+ index.quadrant;
            if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
                var location=index.latitude+","+index.longitude;
                output += "<tr><td>"+
                    index.incident_info+
                    "</th><td>"+
                    index.description+
                    "</td><td>"+
                    index.modified_dt+
                    "</td><th>"+
                    index.quadrant+
                    "</th><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td></tr>";
            }

        } //end of scanning loop
    } //end of search id 1 - traffic incidents

    if(searchtype==2) //Traffic Cameras
    {
        if (searchinput != "Search here! Results are below.") {
            output += "<tr><th>"+
                "Description"+
                "</th><th>"+
                "Quadrant"+
                "</th><th>"+
                "Camera Location"+
                "</th><th>"+
                "Location"+
                "</th><th>"+
                "Camera URL"+
                "</th></tr>";
        }


        for (var i = 0; i < dataset.length; i++) {

            var index = dataset[i];

            //get description
            recordattribute=""+ index.camera_url.description;
            if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
                var coordinates = (""+index.point.coordinates);
                var latitude= coordinates.substring(coordinates.indexOf(",")+1);
                var longitude= coordinates.substring(0,coordinates.indexOf(","));
                var location=latitude+","+longitude;
                var camerapic=index.camera_url.url;
                output += "<tr><th>"+
                    index.camera_url.description+
                    "</th><td>"+
                    index.quadrant+
                    "</td><td>"+
                    index.camera_location+
                    "</td><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td><td>"+
                    "<a href='"+camerapic+"'>Click here</a>"+
                    "</td></tr>";
            }

            //get quadrant
            recordattribute=""+ index.quadrant;
            if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
                var coordinates = (""+index.point.coordinates);
                var latitude= coordinates.substring(coordinates.indexOf(",")+1);
                var longitude= coordinates.substring(0,coordinates.indexOf(","));
                var location=latitude+","+longitude;
                var camerapic=index.camera_url.url;
                output += "<tr><td>"+
                    index.camera_url.description+
                    "</td><th>"+
                    index.quadrant+
                    "</th><td>"+
                    index.camera_location+
                    "</td><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td><td>"+
                    "<a href='"+camerapic+"'>Click here</a>"+
                    "</td></tr>";
            }

            //get camera location
            recordattribute=""+ index.camera_location;
            if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
                var coordinates = (""+index.point.coordinates);
                var latitude= coordinates.substring(coordinates.indexOf(",")+1);
                var longitude= coordinates.substring(0,coordinates.indexOf(","));
                var location=latitude+","+longitude;
                var camerapic=index.camera_url.url;
                output += "<tr><td>"+
                    index.camera_url.description+
                    "</td><td>"+
                    index.quadrant+
                    "</td><th>"+
                    index.camera_location+
                    "</th><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td><td>"+
                    "<a href='"+camerapic+"'>Click here</a>"+
                    "</td></tr>";
            }

        } //end of scanning loop
    } //end of search id 2 - traffic cameras

    if(searchtype==3) //Crime Stats
    {
        if (searchinput != "Search here! Results are below.") {
            output += "<tr><th>"+
                "Sector"+
                "</th><th>"+
                "Community Name"+
                "</th><th>"+
                "Category"+
                "</th><th>"+
                "Date"+
                "</th><th>"+
                "Location"+
                "</th></tr>";
        }


        for (var i = 0; i < dataset.length; i++) {

            var index = dataset[i];

            //get sector
            recordattribute=""+ index.sector;
            if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
                var location=index.geocoded_column.latitude+","+index.geocoded_column.longitude;
                output += "<tr><th>"+
                    index.sector+
                    "</th><td>"+
                    index.community_name+
                    "</td><td>"+
                    index.category+
                    "</td><td>"+
                    index.date+
                    "</td><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td></tr>";
            }

            //get community name
            recordattribute=""+ index.community_name;
            if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
                var location=index.geocoded_column.latitude+","+index.geocoded_column.longitude;
                output += "<tr><td>"+
                    index.sector+
                    "</td><th>"+
                    index.community_name+
                    "</th><td>"+
                    index.category+
                    "</td><td>"+
                    index.date+
                    "</td><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td></tr>";
            }

            //get category
            recordattribute=""+ index.category;
            if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
                var location=index.geocoded_column.latitude+","+index.geocoded_column.longitude;
                output += "<tr><td>"+
                    index.sector+
                    "</td><td>"+
                    index.community_name+
                    "</td><th>"+
                    index.category+
                    "</th><td>"+
                    index.date+
                    "</td><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td></tr>";
            }

            //get date
            recordattribute=""+ index.date;
            if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
                var location=index.geocoded_column.latitude+","+index.geocoded_column.longitude;
                output += "<tr><td>"+
                    index.sector+
                    "</td><td>"+
                    index.community_name+
                    "</td><td>"+
                    index.category+
                    "</td><th>"+
                    index.date+
                    "</th><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td></tr>";
            }

        } //end of scanning loop
    } //end of search id 3 - crime stats

    if(searchtype==4) //Building Permits
    {
        if (searchinput != "Search here! Results are below.") {
            output += "<tr><th>"+
                "Permit Number"+
                "</th><th>"+
                "Applied Date"+
                "</th><th>"+
                "Permit Type"+
                "</th><th>"+
                "Community Name"+
                "</th><th>"+
                "Location"+
                "</th></tr>";
        }


        for (var i = 0; i < dataset.length; i++) {

            var index = dataset[i];

            //get permit num
            recordattribute=""+ index.permitnum;
            if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
                var location=index.latitude+","+index.longitude;
                output += "<tr><th>"+
                    index.permitnum+
                    "</th><td>"+
                    index.applieddate+
                    "</td><td>"+
                    index.permittype+
                    "</td><td>"+
                    index.communityname+
                    "</td><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td></tr>";
            }

            //get applied date
            recordattribute=""+ index.applieddate;
            if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
                var location=index.latitude+","+index.longitude;
                output += "<tr><td>"+
                    index.permitnum+
                    "</td><th>"+
                    index.applieddate+
                    "</th><td>"+
                    index.permittype+
                    "</td><td>"+
                    index.communityname+
                    "</td><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td></tr>";
            }

            //get permit type
            recordattribute=""+ index.permittype;
            if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
                var location=index.latitude+","+index.longitude;
                output += "<tr><td>"+
                    index.permitnum+
                    "</td><td>"+
                    index.applieddate+
                    "</td><th>"+
                    index.permittype+
                    "</th><td>"+
                    index.communityname+
                    "</td><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td></tr>";
            }

            //get community name
            recordattribute=""+ index.communityname;
            if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
                var location=index.latitude+","+index.longitude;
                output += "<tr><td>"+
                    index.permitnum+
                    "</td><td>"+
                    index.applieddate+
                    "</td><td>"+
                    index.permittype+
                    "</td><th>"+
                    index.communityname+
                    "</th><td>"+
                    "<a href='https://www.google.com/maps/search/?api=1&query="+location+"'>Click here</a>"+
                    "</td></tr>";
            }

        } //end of scanning loop
    } //end of search id 4 - building permits


    if (searchinput == "") {
        document.getElementById("display").innerHTML = "";
    } else {
        document.getElementById("display").innerHTML = output+"</table>";
    }
}