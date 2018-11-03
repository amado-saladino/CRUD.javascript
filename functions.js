
//Call this on page load
window.onload=function()
{
    selectAllHeroes();
}

//Get all heroes form the server
var selectAllHeroes=function(){

    //xmlhttp4GET.open("GET","http://localhost:8000/HeroesWebservice/heroesOnline.php",true);
    xmlhttp4GET.open("GET","HeroesWebservice/heroesOnline.php",true);
    xmlhttp4GET.send();
}

//Array to hold all heroes and filtered ones
var heroes=[];
var matchedHeroes=[];
var hero;

//variable holding table contents
var tableHeroes;

//Initiate XMLHttpRequest object for POST, PUT and DELETE methods
    xmlhttp=new XMLHttpRequest();

    // Return data from the server
    xmlhttp.onreadystatechange=function()
    {
        if (this.readyState==4 && this.status==200) {

            
            console.log(this.responseText);
        }
        //
    }

    //Initiate XMLHttpRequest object for GET method
    xmlhttp4GET=new XMLHttpRequest();

    //return data from the server
    xmlhttp4GET.onreadystatechange=function()
    {
        if (this.readyState==4 && this.status==200) {

            heroes=JSON.parse( this.responseText );
            
            //Draw panels and fill them with heroes data
            drawPanels(heroes);
        }
    }

    //Initialize object to get data of one hero from the server
    xmlhttpGetById=new XMLHttpRequest();

    //return hero data
    xmlhttpGetById.onreadystatechange=function(){

        if (this.readyState==4 && this.status==200){

            hero=JSON.parse(this.responseText);
            document.getElementById('lbl_name').innerHTML=hero.name;
        }
    }

    //Draw panels according to the hero list
    var drawPanels=function(listHeroes){

        //collapse panel for the rows
            tableHeroes='<div class="panel-group" id="accordion">';

            //List items in the 'heroes' Array
            listHeroes.forEach(function(item) {

                tableHeroes+='<div class="panel panel-default"><div class="panel-heading">' +
                '<h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#panel' + item.id  + '"' +
                 ' onclick=' + '"' + 'selectOne(' + item.id + ',' + "'" + item.name + "'" + ')">' + item.name + '</a>' +
                '</h4></div><div id="panel' + item.id + '" class="panel-collapse collapse">' +
                '<div class="panel-body">' + '<h4>ID: ' +  item.id + '</h4>' + 
                '<h4>Name: ' + item.name  + '</h4><br />' + '<input type="button" value="Delete" class="btn btn-danger"' +
                 'onclick="remove(' + item.id + ')"'  + '/>'                                 
                 + '</div></div></div>';

            });
            
            tableHeroes+='</div>';
            document.getElementById('div_heroeList').innerHTML=tableHeroes;
    }

    //add() function when clicking button 'Add'
    var add=function(){

        //Get txtAdd value
        input=document.getElementById("txtAdd").value;

        //if txtAdd is not empty
        if (input==""){

            document.getElementById('spanAddError').style.display="inline";
            return;
        }

        //send POST requert to the server
        //xmlhttp.open("POST","http://localhost:8000/HeroesWebservice/heroesOnline.php",true);
        xmlhttp.open("POST","HeroesWebservice/heroesOnline.php",true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("name=" + input);
        document.getElementById("txtAdd").value="";

        selectAllHeroes();

    }  //end function

    //Fire this on change txtAdd onkeyup
    var txtAdd_onChange=function(txt){

       if (txt.value==""){

            document.getElementById('spanAddError').style.display="inline";
            document.getElementById('btnAdd').disabled=true;
       }
       else{
            document.getElementById('spanAddError').style.display="none";
            document.getElementById('btnAdd').disabled=false;
       }

    } // end function

//Fire this method on updating the entry
var update=function() {

    input=document.getElementById("txtEdit").value;
    id=document.getElementById('hiddenID').value;

    //Send data to the server as a PUT request
    //xmlhttp.open("PUT","http://localhost:8000/HeroesWebservice/heroesOnline.php",true);
    xmlhttp.open("PUT","HeroesWebservice/heroesOnline.php",true);
    
    xmlhttp.send("id=" + id  + "&name=" + input);

    //Select all heroes from the server after update.
    selectAllHeroes();
}

//Fire this on clicking a panel
var selectOne=function(id,name){

    document.getElementById('hiddenID').value=id;
    document.getElementById('txtEdit').value=name;

    document.getElementById('lbl_id').innerHTML=id;

    //xmlhttpGetById.open("GET","http://localhost:8000/HeroesWebservice/heroesOnline.php?id=" + id,true);
    xmlhttpGetById.open("GET","HeroesWebservice/heroesOnline.php?id=" + id,true);
    xmlhttpGetById.send();
}

var remove=function(id){    
        
     //Send data to the server as a POST request
//    xmlhttp.open("DELETE","http://localhost:8000/HeroesWebservice/heroesOnline.php",true);
xmlhttp.open("DELETE","HeroesWebservice/heroesOnline.php",true);
    
    xmlhttp.send("id=" + id);

    selectAllHeroes();
}


//Fire this onkeyup for txtSearch
var search=function(filter){
    
    //Apply filter when txtSearch is not empty
    if (filter!=""){

        matchedHeroes=heroes.filter(  n=>n.name.toLowerCase().search(  filter  )!=-1   );
        drawPanels(matchedHeroes);
    } else{

        drawPanels(heroes);
    }    

}