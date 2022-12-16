//thequizScript.js

/**
 * Stores the quiz answers
 */
var answers;

/**
 * Processes the xml file to display on the page
 * @type {getFinalQuizFile}
 */
window.onload = getFinalQuizFile;

function getFinalQuizFile() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            processFinalQuizQuestions(xhr);
        }
    };
    xhr.open("GET", "data/FinalQuiz.xml", true);
    xhr.send();


}

function processFinalQuizQuestions(xhr) {

    var i;
//get data as xml file
    var xmldoc = xhr.responseXML;

//create a list of questions
    var qlist="";
//process data by record
    var x = xmldoc.getElementsByTagName("question");
    for (i = 0; i <x.length; i++) {
        qlist +=
            "<div id='questionblock"+(1+i)+"' class='center'>"+
                "<h3>"+ x[i].getElementsByTagName("qnumber")[0].childNodes[0].nodeValue +".</h3>"+
                "<p>"+ x[i].getElementsByTagName("qtitle")[0].childNodes[0].nodeValue +"</p>"+ "<table><tr>" +
                "<td><input name='question"+(1+i)+"' type='radio' value='a'>"+ "A) " + x[i].getElementsByTagName("a")[0].childNodes[0].nodeValue + "</td>" +
                "<td><input name='question"+(1+i)+"' type='radio' value='b'>"+ "B) " + x[i].getElementsByTagName("b")[0].childNodes[0].nodeValue + "</td>" +
                "<td><input name='question"+(1+i)+"' type='radio' value='c'>"+ "C) " + x[i].getElementsByTagName("c")[0].childNodes[0].nodeValue + "</td>" +
                "<td><input name='question"+(1+i)+"' type='radio' value='d'>"+ "D) " + x[i].getElementsByTagName("d")[0].childNodes[0].nodeValue + "</td>" +
            "</tr></table></div>";
    }
    answers = xmldoc.getElementsByTagName("rightanswers")[0].childNodes[0].nodeValue;

    document.getElementById("questionsdisplay").innerHTML = qlist;

}


/**
 * Scans the answers and displays score
 */
function checkAnswers() {

    var scoretotal=0;
    var results = answers.split(",");



    //Question 1
    if(document.querySelector('input[name=question1]:checked') && document.querySelector('input[name=question1]:checked').value+"" == results[0]) {
        scoretotal++;
        document.getElementById("questionblock1").style.backgroundColor = "lawngreen";
    } else {
        document.getElementById("questionblock1").style.backgroundColor = "tomato";
    }

    //Question 2
    if(document.querySelector('input[name=question2]:checked') && document.querySelector('input[name=question2]:checked').value+"" == results[1]) {
        scoretotal++;
        document.getElementById("questionblock2").style.backgroundColor = "lawngreen";
    } else {
        document.getElementById("questionblock2").style.backgroundColor = "tomato";
    }

    //Question 3
    if(document.querySelector('input[name=question3]:checked') && document.querySelector('input[name=question3]:checked').value+"" == results[2]) {
        scoretotal++;
        document.getElementById("questionblock3").style.backgroundColor = "lawngreen";
    } else {
        document.getElementById("questionblock3").style.backgroundColor = "tomato";
    }

    //Question 4
    if(document.querySelector('input[name=question4]:checked') && document.querySelector('input[name=question4]:checked').value+"" == results[3]) {
        scoretotal++;
        document.getElementById("questionblock4").style.backgroundColor = "lawngreen";
    } else {
        document.getElementById("questionblock4").style.backgroundColor = "tomato";
    }

    //Question 5
    if(document.querySelector('input[name=question5]:checked') && document.querySelector('input[name=question5]:checked').value+"" == results[4]) {
        scoretotal++;
        document.getElementById("questionblock5").style.backgroundColor = "lawngreen";
    } else {
        document.getElementById("questionblock5").style.backgroundColor = "tomato";
    }

    document.getElementById("scoredisplay").innerHTML = ""+scoretotal;

}