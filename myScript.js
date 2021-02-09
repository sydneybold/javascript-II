myDiv = document.getElementById("myDiv");
console.log(myDiv);

function myClick () { // function to be called when the user clicks submit
  // variables from the user input
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var teams = document.getElementsByName("team");
  var allPlayers = document.getElementsByName("player");

  // determines which radio button is checked
  for (var i = 0; i < teams.length; i++) {
    if (teams[i].checked) {
      var team = teams[i].value;
    }
  }

  // determines which checkboxs are checked
  filledOut = false;
  var players = [];
  for (var i = 0; i < allPlayers.length; i++) {
    if (allPlayers[i].checked) {
      filledOut = true;
      players.push(allPlayers[i].value);
    }
  }

  // make sure all fields are filled out
  if (team != null && fname != "" && lname != "" && filledOut == true){
    // create the JSON object with the user information
    myJSON = {
      "fname": fname,
      "lname": lname,
      "team": team,
      "players": players,
    }

    // clear the main div to delete the previous content on the page
    myDiv.innerHTML = "\n";

    // title
    var title = document.createElement("h1");
    var titleName = myJSON["fname"] + " " + myJSON["lname"] + "'s NFL Game Result";
    title.textContent = titleName;
    myDiv.appendChild(title);

    // space
    myDiv.appendChild(document.createElement("br"));

    // favorite team title
    var teamTitle = document.createElement("h2");
    teamTitle.textContent = "Favorite Team:";
    myDiv.appendChild(teamTitle);

    // draw photo of favorite team
    var teamImageUrl = String(myJSON["team"]) + ".jpg";
    teamImage = document.createElement("img");
    teamImage.src = teamImageUrl;
    teamImage.width = "700";
    myDiv.appendChild(teamImage);

    // space
    myDiv.appendChild(document.createElement("br"));
    myDiv.appendChild(document.createElement("br"));
    myDiv.appendChild(document.createElement("br"));

    // favorite players title
    var playerTitle = document.createElement("h2");
    playerTitle.textContent = "Favorite Players:";
    myDiv.appendChild(playerTitle);

    // draw photos of favorite players
    for (var i = 0; i < players.length; i++) {
      var playerImageUrl = String(myJSON["players"][i]) + ".jpg";
      var playerImage = document.createElement("img");
      playerImage.src = playerImageUrl;
      playerImage.width = "700";
      myDiv.appendChild(playerImage);
    }

    // space
    myDiv.appendChild(document.createElement("br"));
    myDiv.appendChild(document.createElement("br"));
    myDiv.appendChild(document.createElement("br"));

    // create a list of the users previous inpputs in JSON objects
    var previous = [myJSON];
    var previousLists = JSON.parse(localStorage.getItem("userPrev"));
    if (previousLists != null) {
      for (var i = 0; i < previousLists.length; i++) {
        previous.push(previousLists[i]);
      }
    }

    // space
    myDiv.appendChild(document.createElement("br"));
    myDiv.appendChild(document.createElement("br"));
    myDiv.appendChild(document.createElement("br"));

    // previous input title
    var prevTitle = document.createElement("h1");
    var prevTitleName = myJSON["fname"] + " " + myJSON["lname"] + "'s Previous NFL Game Result";
    prevTitle.textContent = prevTitleName;
    myDiv.appendChild(prevTitle);

    // previous favorite team title
    var prevTeamTitle = document.createElement("h2");
    prevTeamTitle.textContent = "Previous Favorite Team:";
    myDiv.appendChild(prevTeamTitle);

    // count the number of times each team has been selected
    var numberTeams = [ ["chiefs", 0], ["packers", 0], ["bills", 0], ["seahawks", 0], ["saints", 0] ];
    for (var i = 0; i < previous.length; i++) {
      if (previous[i]["team"] == "chiefs") {
        numberTeams[0][1] += 1;
      }
      else if (previous[i]["team"] == "packers") {
        numberTeams[1][1] += 1;
      }
      else if (previous[i]["team"] == "bills") {
        numberTeams[2][1] += 1;
      }
      else if (previous[i]["team"] == "seahawks") {
        numberTeams[3][1] += 1;
      }
      else if (previous[i]["team"] == "saints") {
        numberTeams[4][1] += 1;
      }
    }

    // draw the bar graph for the popularity of each team
    for (var i = 0; i < numberTeams.length; i++) {
      imageName = numberTeams[i][0] + "_logo.jpg";

      var div = document.createElement("div");
      div.className = "container";

      var team = document.createElement("div");
      team.textContent = numberTeams[i][0];
      team.className = "percent";
      var width = String(numberTeams[i][1] / previous.length * (window.innerWidth - 45)) + "px";
      team.style.width = width;
      div.appendChild(team);

      // only draw the logo if the percentage is less than 80 %
      if (numberTeams[i][1] / previous.length < 0.8) {
        var logo = document.createElement("img");
        logo.src = imageName;
        logo.className = "logo";
        div.appendChild(logo);
      }

      myDiv.appendChild(div);
    }

    // space
    myDiv.appendChild(document.createElement("br"));
    myDiv.appendChild(document.createElement("br"));
    myDiv.appendChild(document.createElement("br"));;

    // previous favorite players title
    var prevTeamTitle = document.createElement("h2");
    prevTeamTitle.textContent = "Previous Favorite Players:";
    myDiv.appendChild(prevTeamTitle);

    // count the number of times each player has been selected
    var numberPlayers = [ ["mahomes", 0], ["donald", 0], ["wilson", 0], ["allen", 0], ["jackson", 0], ["mccaffrey", 0], ["hopkins", 0], ["kittle", 0], ["rodgers", 0], ["kelce", 0] ];
    var totalPlayers = 0;
    for (var j = 0; j < previous.length; j++) {
      var previousPlayers = previous[j]["players"];
      for (var i = 0; i < previousPlayers.length; i++) {
        if (previousPlayers[i] == "mahomes") {
          numberPlayers[0][1] += 1;
        }
        else if (previousPlayers[i] == "donald") {
          numberPlayers[1][1] += 1;
        }
        else if (previousPlayers[i] == "wilson") {
          numberPlayers[2][1] += 1;
        }
        else if (previousPlayers[i] == "allen") {
          numberPlayers[3][1] += 1;
        }
        else if (previousPlayers[i] == "jackson") {
          numberPlayers[4][1] += 1;
        }
        else if (previousPlayers[i] == "mccaffrey") {
          numberPlayers[5][1] += 1;
        }
        else if (previousPlayers[i] == "hopkins") {
          numberPlayers[6][1] += 1;
        }
        else if (previousPlayers[i] == "kittle") {
          numberPlayers[7][1] += 1;
        }
        else if (previousPlayers[i] == "rodgers") {
          numberPlayers[8][1] += 1;
        }
        else if (previousPlayers[i] == "kelce") {
          numberPlayers[9][1] += 1;
        }
        totalPlayers += 1
      }
    }

    // draw the bar graph for the popularity of each player
    for (var i = 0; i < numberPlayers.length; i++) {
      imageName = numberPlayers[i][0] + "_logo.jpg";

      var div = document.createElement("div");
      div.className = "container";

      var player = document.createElement("div");
      player.textContent = numberPlayers[i][0];
      player.className = "percent";
      var width = String(numberPlayers[i][1] / totalPlayers * (window.innerWidth - 45)) + "px";
      player.style.width = width;
      div.appendChild(player);

      // only draw the logo if the percentage is less than 80 %
      console.log(numberPlayers[i][1] / totalPlayers)
      if (numberPlayers[i][1] / totalPlayers < 0.8) {
        var logo = document.createElement("img");
        logo.src = imageName;
        logo.className = "logo";
        div.appendChild(logo);
      }

      myDiv.appendChild(div);
    }

    // set the local storage
    previous.push(myJSON);
    localStorage.setItem("userPrev", JSON.stringify(previous));
  }

  else {   // if not all the fields are completed
    var alert = document.createElement("h3");
    alert.textContent = "ALL FIELDS MUST BE COMPLETED";
    alert.style.color = "red";
    myDiv.appendChild(alert);
  }
}

// function to change the background of the radio butttons or checkboxs if they
// are checked and to clear them if they are not
function changeBackground(type) {
  inputs = document.getElementsByName(type);

  for (var i = 0; i < inputs.length; i++) {
    imgName = inputs[i].id + "_logo.jpg";
    var div = document.getElementsByClassName(inputs[i].id)[0];
    var label = div.getElementsByTagName("label");
    if (inputs[i].checked) {
      label[0].style.backgroundImage = 'url('+imgName+')';
      label[0].style.backgroundSize = "cover";
      label[0].style.backgroundPosition = "center";
      label[0].style.border = "thick solid #333";
    }
    else {
      label[0].style.backgroundImage = "";
      label[0].style.border = "";
    }
  }
}
