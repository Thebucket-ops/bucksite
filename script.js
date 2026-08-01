

let splashtext =['<a href="https://youtu.be/tYzMYcUty6s?si=yoMmFTHR7PbMrvK4">NEVER GIVE UP</a>',"Made by Mary!",
    "Eat lemons -Sun Tzu",
    "random splash texts my beloveds","100% organic no OGM!",
    "li mortacci.","daje.","running out of splash texts ideas very quikcly",
    "Banana.","still too little splash texts",
    "go listen to Takanaka, hes a cool ass japanese guy!",
    "theres only 1 pacific rim film",
    "insert splash text here","now with 300% more grammatical errors!","spdow","from Italy with fury", "Rasberry Pi Pico my beloved"
];

//need 68 sealion texts

let sealioncaretext =[
"this is Fred, hes a sea lion","Fred notices you",
"you clicked Fred, hes happy :3", "you gave the Fred belly rubs, he's enthusiastic about it","Fred really likes you"

];


document.getElementById("splash").innerHTML=splashtext[Math.floor(Math.random()*splashtext.length)];


let sealionclicks=0;
document.getElementById("tooltiptext").textContent=sealioncaretext[(sealionclicks%sealioncaretext.length)];


document.getElementById("seal").onclick = function(){
  sealionclicks+=1;
  if (sealioncaretext[(sealionclicks%sealioncaretext.length)]==sealioncaretext[0]){sealionclicks+=1;}

    document.getElementById('sealionid').play();
  //TODO CHANGE TO TEXT SHOWING UP ON TOP
  
    if(sealionclicks==68){
    document.getElementById("tooltiptext").textContent="spdow";
    }else{
    document.getElementById("tooltiptext").textContent=sealioncaretext[(sealionclicks%sealioncaretext.length)];
    console.log(sealionclicks);
    }

  //YAY IT WORKSS
}


//// API ////
var url = "https://api.github.com/users/Thebucket-ops/repos?per_page=100";

$.get(url, function(data) {
  var sortedRepos = data.sort((a,b) => parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count));
  


  let repoName= [];
  let repoDescription= [];
  let repoLink= [];
  let repoImg=[];
  let repoStars = [];
  let postitcolors=['#c6ff2b','#4fda4f','#0c94ee','#f08040'];
  let randomcolor=0;

  for(let i= 0; i<sortedRepos.length;i++){
      repoName[i]= sortedRepos[i].name;
      repoDescription[i]= sortedRepos[i].description;
      repoLink[i]= sortedRepos[i].html_url;
      repoStars[i] = sortedRepos[i].stargazers_count;       //NOTE TO CHANGE BELOW IF I CHANGE NAME
      repoImg[i]="https://raw.githubusercontent.com/Thebucket-ops/"+repoName[i]+"/refs/heads/main/siteimage.png"
      console.log(repoName);
    }


    
  $(document).ready(function() {
    
    for (let i =0;i<4;i++){
    $(".repoLink"+i).attr('href', repoLink[i]);
    $("#repoTitle"+i).html(repoName[i]);
    $("#repoStars"+i).html(repoStars[i]);
    $("#repoDescription"+i).html(repoDescription[i]);
    $(".projImg"+i).attr('src', repoImg[i]);
    
    randomcolor = postitcolors[Math.floor(Math.random() * (postitcolors.length))];
    console.log(randomcolor)
    $("#postit"+i).css('background-color', randomcolor);
    }
  })
/// https://raw.githubusercontent.com/Thebucket-ops/Bucksite/refs/heads/main/siteimage.png


})