
// connect to Moralis server
const serverUrl = "https://5fkevnj7lttp.usemoralis.com:2053/server";
const appId = "Cjt9HBSIu34CfVHsHAAEYKlYgaKLAgrz2649HybB";
Moralis.start({ serverUrl, appId });


function change_page(){
  window.location.href = "index.html";
} 

function make_proposal(){
  window.location.href = "proposal.html";
} 

onLoad();

async function onLoad() {  
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate();
  }
  
  document.getElementById('btn-login').innerHTML = user.get('ethAddress');
  
  query = parseQuery(window.location.search);

  document.getElementById('new-project-price').innerHTML = "Proposed project has initial list price " + query.price;
  document.getElementById('new-project-fraction').innerHTML =  "Total supply of fraction token " + query.fraction;

}

function parseQuery(query) {

  object = {};
        
  if (query.indexOf('?') != -1){

    query = query.split('?');		
    query = query[1];

  }

  parseQuery = query.split("&");

  for (var i = 0; i < parseQuery.length; i++) {

      pair = parseQuery[i].split('=');
      key = decodeURIComponent(pair[0]);
      if (key.length == 0) continue;
      value = decodeURIComponent(pair[1].replace("+"," "));

      if (object[key] == undefined) object[key] = value;
      else if (object[key] instanceof Array) object[key].push(value);
      else object[key] = [object[key],value];

  }

  return object;

};

// LOG IN WITH METAMASK
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate();
  }
  console.log("logged in user:", user);
  document.getElementById('btn-login').innerHTML = user.get('ethAddress')
}

// LOG OUT
async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
  document.getElementById('btn-login').innerHTML = 'Login';
}


async function voteYes() {
  console.log("You vote yes");
  mint();
}

async function mint() {
  console.log("mint");
  const contractAddress = '0x27F3e1100023C699C3E6031D112a1f07782B7068';
  const abiJson = await fetch('./NFT.json').then(response => {
    return response.json();
  });

  const contractAbi = abiJson['abi'];
  console.log(contractAbi);

  const sendOptions = {
    contractAddress: contractAddress,
    functionName: "createCollectible",
    abi: contractAbi,
    params: {
      tokenURI: 'None',
    },
  };
  await Moralis.enableWeb3();
  console.log('ENABLEd', Moralis.isWeb3Enabled());

  const result = await Moralis.executeFunction(sendOptions);
  console.log(result);
  await Moralis.deactivateWeb3();
  console.log('DISABLED', Moralis.isWeb3Enabled());
  document.getElementById('mint-nft').innerHTML = "Mint NFT from address: " + result.to;
}


function voteNo() {
  console.log("You vote no");
}

