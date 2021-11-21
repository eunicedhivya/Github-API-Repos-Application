
function changeUser(){

  // get value from input field
  var input = document.getElementById("inputfield").value;
  
  // empty repolist container
  document.getElementById('repolist').innerHTML = "";
  
  getUserData(input);

}

// On click change call changeuser function
document.getElementById("submit").addEventListener("click", changeUser);


// Reusable function to get user info and display
async function getUserData(userinput){
  
  let userName = userinput;
  console.log(userName)
  // Generate The User URL using userinput
  let url = `https://api.github.com/users/${userName}/repos`;

  try{
    
    let response = await fetch(url);
    let repos = await response.json();
    // Display the username and no of repos under the username
    document.getElementById('repoownerdetails').innerHTML = `
    <h2>${userName}</h2>
    <p>${repos.length} Repo(s) Found</p>
    `
    // Iterate through arrat to find each repo object to get detailed info
    repos.forEach(repo => {  
        // create parent div to add responsive column
        var repocontainer = document.createElement('div')
            // repocontainer.className = "col-md-4";
            repocontainer.classList.add('col-md-4', 'col-sm-6')
            // create div to contain card data and inner html
            var card = document.createElement('div');
                card.className = "card";
                card.innerHTML = `<div class="card-body">
                    <h3 class="card-title"><img src="img/repository.svg" > ${repo.name}</h3>
                    <p class="card-text" id="repos">
                    </p>
                    <ul class="icon-list">
                        <li><img src="img/star.svg" alt=""> <span>${repo.stargazers_count}</span></li>
                        <li><img src="img/fork.svg" alt=""> <span>${repo.forks_count}</span></li>
                        <li><img src="${repo.owner.avatar_url}" alt=""> <span>${repo.owner.login}</span></li>
                    </ul>
                    <a class="btn btn-primary" href="${repo.html_url}">Go to Repo</a>
                </div>`; 
            repocontainer.appendChild(card); // append card to parent div
            document.getElementById('repolist').appendChild(repocontainer); // add parent div to list container
     });
  }catch(err){
    // Handle errors here
    document.getElementById('repoownerdetails').innerHTML = `
          <h2>Erro Message</h2>
          <p>${err}</p>
          `
  }
} // end getUserData function 

// Call the reusable funtion to render Github User Info
getUserData("mbostock");

