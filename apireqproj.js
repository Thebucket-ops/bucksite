let splashtext =["Made by Mary!","Eat lemons -Sun Tzu",
    "random splash texts my beloveds","100% organic no OGM!",
    "li mortacci.","daje.","running out of splash texts ideas very quikcly",
    "Banana.","NEVER GIVE UP","still too little splash texts",
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
//ricordate de differenziare in base alla pagina in cui si è (progetti o main)

let sealionclicks=0;
document.getElementById("tooltiptext").textContent=sealioncaretext[(sealionclicks%sealioncaretext.length)];


document.getElementById("seal").onclick = function(){
  sealionclicks+=1;
    
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







var url = "https://api.github.com/users/Thebucket-ops/repos?per_page=100";


  // var sortType= 'stargazers_count';

  if (document.querySelector("select").value=='stars'){
   sortType='stargazers_count';
  }else if (document.querySelector("select").value=='updated'){
   sortType='updated_at';
  }else if (document.querySelector("select").value=='created'){
   sortType='created_at';
  }



document.querySelector("select").addEventListener('change', putboxes());

function putboxes(){
    try{document.getElementById('repobox').remove();}catch(err){}  //removes all pre existing boxes to replace them

    $.get(url, function(data) {
  console.log(document.querySelector("select").value);

  if (document.querySelector("select").value=='stars'){
   var sortedRepos = data.sort((a,b) => parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count));
  }else if (document.querySelector("select").value=='updated'){
   var sortedRepos = data.sort((a,b) => parseFloat(b.updated_at) - parseFloat(a.updated_at));
  }else if (document.querySelector("select").value=='created'){ 
   var sortedRepos = data.sort((a,b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  }else if(document.querySelector("select").value=='AtoZ'){
    var sortedRepos = data.sort((a,b) => parseFloat(b.name) - parseFloat(a.name));
  }else if(document.querySelector("select").value=='ZtoA'){
    var sortedRepos = data.sort((a,b) => parseFloat(a.name) - parseFloat(b.name));
  }

  // var sortedRepos = data.sort((a,b) => parseFloat(b.sortType) - parseFloat(a.sortType));

  console.log(sortedRepos);


  let repoName= [];
  let repoDescription= [];
  let repoLink= [];
  let repoStars = [];
  let repoImg=[];
  let postitcolors=['#c6ff2b','#4fda4f','#0c94ee','#f08040','#34b8da','#2dd649'];
  let randomcolor=0;
  var randomSign = () => Math.random() >= 0.5 ? 1 : -1;


  for(let i= 0; i<sortedRepos.length;i++){
      repoName[i]= sortedRepos[i].name;
      repoDescription[i]= sortedRepos[i].description;
      repoLink[i]= sortedRepos[i].html_url;
      repoStars[i] = sortedRepos[i].stargazers_count;
      repoImg[i]="https://raw.githubusercontent.com/Thebucket-ops/"+repoName[i]+"/refs/heads/main/siteimage.png"
      console.log(repoName);
    }

   

    
  $(document).ready(function() {

    
    for (let i =0;i<sortedRepos.length;i++){
      
      var a = document.createElement("a");
      a.setAttribute("class", "repoLink"+i);
      a.setAttribute("id","repobox")
      a.setAttribute("href", repoLink[i]);
      a.innerHTML='<div class="projectsel" id="postit'+i+'"><div id="projContent"><pre id="repoTitle'+i+'" class="pen"></pre></br><pre id="repoDescription'+i+'" class="projDesc"></pre></div><img id="imageProj" class="projImg'+i+'" src="'+repoImg[i]+'" alt="proj img"></div>';
      document.getElementById("main").appendChild(a);

    }




  for (let i =0;i<sortedRepos.length;i++){
    $(".repoLink"+i).attr('href', repoLink[i]);
   
    $("#repoTitle"+i).html(repoName[i]);
    $("#repoStars"+i).html(repoStars[i]);
    $("#repoDescription"+i).html(repoDescription[i]);

    randomcolor = postitcolors[Math.floor(Math.random() * (postitcolors.length))];
    console.log(randomcolor);

    $("#postit"+i).css('background-color', randomcolor);
    $("#postit"+i).css('rotate', ''+((randomSign)* Math.floor(Math.random()*90))+'deg');
    
    }
  })

});
console.log("done")
};