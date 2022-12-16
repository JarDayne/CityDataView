
//Gets the current date and time to display
function date() {

    var datetime = new Date();

    document.getElementById("datetime").innerHTML=datetime+"";
}



//Loads the ClientData JSON file and finds matching attributes to display
function clientsearch() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "data/rentalclients.json", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            displayclientdata(xhr);//display data
        }
    };

    xhr.onerror=function(){
        alert("Connection ERROR..");
    };
    xhr.send();


}

var clientdatarecords; //Stores server sent data
function displayclientdata(xhr) {
    document.getElementById("clientsearchresults").style.display= "block";

    var clientdataset = JSON.parse(xhr.responseText);
    clientdatarecords = clientdataset;

    var output = "";
    var searchinput = document.getElementById("clientsearchbar").value;
    var recordattribute="";

    if (searchinput != "Search by Last Name here") {
        output += "<div>"+
            "Client Names"+
            "</div>";
    }


    for (var i = 0; i < clientdataset.length; i++) {

        var index = clientdataset[i];

        //get last name
        recordattribute=""+ index.last_name;
        if(recordattribute.toUpperCase().startsWith(searchinput.toUpperCase())) {
            var fullname = "<tr><td>"+index.first_name+"</td><td>"+index.last_name+"</td></tr>";

            output += "<div>"+
                "<button onclick='activeform("+i+"); return false;'>"+
                "<table>"+
                fullname+
                "</table>"+
                "</button>"+
                "</div>";
        }

    } //end of scanning loop

    if (searchinput == "") {
        document.getElementById("clientsdisplay").innerHTML = "";
        document.getElementById("clientsearchresults").style.display= "none";
        if(document.getElementById("clientinfodisplay").innerHTML != "") {
            document.styleSheets[0].addRule('#carrentalform::after','background-color: transparent;');
            document.styleSheets[0].addRule('#carrentalform::after','z-index: -4;');
        }
    } else {
        document.getElementById("clientsdisplay").innerHTML = output;
        document.styleSheets[0].addRule('#carrentalform::after','background-color: rgba(169,169,169,0.6);');
        document.styleSheets[0].addRule('#carrentalform::after','z-index: 98;');
    }


}


var clientfullname;
var clientaddress;
var clientstate_prov;
var clientemail;
var clientphone;

function activeform(clientindex) {

    document.getElementById("clientsearchbar").value = "";
    document.getElementById("clientsearchresults").style.display= "none";
    document.styleSheets[0].addRule('#carrentalform::after','background-color: transparent;');
    document.styleSheets[0].addRule('#carrentalform::after','z-index: -4;');

    var chosenclient = clientdatarecords[clientindex];

    var clientinfooutput = "<table>"+
        "<tr><th>Last Name:</th><td>"+chosenclient.last_name+"</td></tr>"+
        "<tr><th>First Name:</th><td>"+chosenclient.first_name+"</td></tr>"+
        "<tr><th>Address:</th><td>"+chosenclient.address+"</td></tr>"+
        "<tr><th>State/Province:</th><td>"+chosenclient.state_prov+"</td></tr>"+
        "<tr><th>Email:</th><td>"+chosenclient.email+"</td></tr>"+
        "<tr><th>Phone:</th><td>"+chosenclient.phone+"</td></tr>"+
        "</table>";

    document.getElementById("clientinfodisplay").innerHTML = clientinfooutput;


    clientfullname = chosenclient.first_name+" "+chosenclient.last_name;
    clientaddress = chosenclient.address + "";
    clientstate_prov = chosenclient.state_prov + "";
    clientemail = chosenclient.email+ "";
    clientphone = chosenclient.phone+ "";
}





//Form Scripts
function calculaterentalfee() {

    if(document.getElementById("rentperiodnumber").value != undefined && document.querySelector("input[name=vehicletyperent]:checked") && clientfullname != undefined) {
        document.getElementById("rentaldisplaypanel").style.display= "block";
        document.styleSheets[0].addRule('#carrentalform::after','background-color: rgba(169,169,169,0.6);');
        document.styleSheets[0].addRule('#carrentalform::after','z-index: 98;');
        document.getElementById("formsubmissionprompt").style.border= "hidden";
        document.getElementById("clientsearchbar").style.border= "unset";


        var output = "<table><tr><th colspan='2'>"+
            "Your Order Receipt"+
            "</th></tr>"+
            "<tr><th colspan='2'>"+
            clientfullname+
            "</th></tr>"+
            "<tr><th colspan='2'>"+
            clientaddress+", "+clientstate_prov+
            "</th></tr>"+
            "<tr><th colspan='2'>"+
            clientemail+", "+clientphone+
            "</th></tr>"+
            "<tr><th>"+"&emsp;"+"</th></tr>"+
            "<tr><th>"+"&emsp;"+"</th></tr>";
        var rate = 0;
        var total = 0; //stored after rental period calculation


        if(document.querySelector("input[name=vehicletyperent]:checked").value == "compact") {
            rate += 15;
            output +="<tr><th style='text-align: left'>"+
                "Compact Vehicle:"+
                    "</th><td style='text-align: right'>"+
                "$15/Day"+
                    "</td></tr>";
        }
        if(document.querySelector("input[name=vehicletyperent]:checked").value == "midsize") {
            rate += 20;
            output +="<tr><th style='text-align: left'>"+
                "Mid-Size Vehicle:"+
                    "</th><td style='text-align: right'>"+
                "$20/Day"+
                    "</td></tr>";
        }
        if(document.querySelector("input[name=vehicletyperent]:checked").value == "luxury") {
            rate += 35;
            output +="<tr><th style='text-align: left'>"+
                "Luxury Vehicle:"+
                    "</th><td style='text-align: right'>"+
                "$35/Day"+
                    "</td></tr>";
        }
        if(document.querySelector("input[name=vehicletyperent]:checked").value == "vantruck") {
            rate += 40;
            output +="<tr><th style='text-align: left'>"+
                "Van/Truck Vehicle:"+
                    "</th><td style='text-align: right'>"+
                "$40/Day"+
                    "</td></tr>";
        }

        if(document.querySelector('input[type=radio][name=racktype]:checked') && document.querySelector("input[name=racktype]:checked").value == "roofrack") {
            rate += 5;
            output +="<tr><th style='text-align: left'>"+
                "Roof Rack Addition:"+
                    "</th><td style='text-align: right'>"+
                "$5/Day"+
                    "</td></tr>";
        }
        if(document.querySelector('input[type=radio][name=racktype]:checked') && document.querySelector("input[name=racktype]:checked").value == "bicyclerack") {
            rate += 5;
            output +="<tr><th style='text-align: left'>"+
                "Bicycle Addition:"+
                    "</th><td style='text-align: right'>"+
                "$5/Day"+
                    "</td></tr>";
        }

        if(document.querySelector("input[name=gpsextra]:checked")) {
            rate += 10;
            output +="<tr><th style='text-align: left'>"+
                "GPS Addition:"+
                    "</th><td style='text-align: right'>"+
                "$10/Day"+
                    "</td></tr>";
        }
        if(document.querySelector("input[name=childseatextra]:checked")) {
            output +="<tr><th style='text-align: left'>"+
                "Child Seat Addition:"+
                "</th><td style='text-align: right'>"+
                "Free"+
                "</td></tr>";
        }

        var rentperiod =parseInt(document.getElementById("rentperiodnumber").value);
        output +=  "<tr><th style='text-align: left'>"+
            "For "+rentperiod+" days"+
            "</th></tr>"+
            "<tr><th></th></tr>"+
            "<tr><th></th></tr>";

        total = (rate * rentperiod).toFixed(2);
        output +="<tr><th style='text-align: left'>"+
            "Your Total:"+
            "</th><td style='text-align: right'>"+
            "$"+ total +
            "</td></tr>";

        document.getElementById("submissiondisplay").innerHTML = output + "</table>";
    } else {
        document.getElementById("formsubmissionprompt").style.border= "10px ridge darkred";
        document.getElementById("clientsearchbar").style.border= "5px solid darkred";
        alert("Fill out the Red");
    }

}

function closeresultpanel() {

    document.getElementById("rentaldisplaypanel").style.display= "none";
    document.styleSheets[0].addRule('#carrentalform::after','background-color: transparent;');
    document.styleSheets[0].addRule('#carrentalform::after','z-index: -4;');
    document.getElementById("rentaldisplaypanel").style.borderColor= "black";
}

function finalizesubmission() {
    if (document.querySelector('input[type=radio][name=vehicletyperent]:checked'))
    document.querySelector('input[type=radio][name=vehicletyperent]:checked').checked = false;

    if (document.querySelector('input[type=radio][name=racktype]:checked'))
    document.querySelector('input[type=radio][name=racktype]:checked').checked = false;

    if (document.querySelector('input[type=radio][name=gpsextra]:checked'))
    document.querySelector('input[type=radio][name=gpsextra]:checked').checked = false;

    if (document.querySelector('input[type=radio][name=childseatextra]:checked'))
    document.querySelector('input[type=radio][name=childseatextra]:checked').checked = false;

    document.getElementById("rentperiodnumber").value = null;

    document.getElementById("clientinfodisplay").innerHTML = "";

    document.getElementById("rentaldisplaypanel").style.borderColor= "#66ff66";

    document.getElementById("submissionbutton").style.backgroundColor= "gray";
    document.styleSheets[0].addRule('#finalsubmitprompt::after','z-index: 101;');

}