
// connect to Moralis server
const serverUrl = "https://5fkevnj7lttp.usemoralis.com:2053/server";
const appId = "Cjt9HBSIu34CfVHsHAAEYKlYgaKLAgrz2649HybB";
Moralis.start({ serverUrl, appId });


function change_page(){
  window.location.href = "index.html";
} 




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

async function balanceOf() {
  const user = Moralis.User.current();
  console.log(user);

  const contractAddress = '0x27F3e1100023C699C3E6031D112a1f07782B7068';
  const abiJson = await fetch('./NFT.json').then(response => {
    return response.json();
  });
  
  const contractAbi = abiJson['abi'];
  console.log(contractAbi);

  const readOptions = {
    contractAddress: contractAddress,
    functionName: "balanceOf",
    abi: contractAbi,
    params: { owner: user.get('ethAddress') },
  };
  await Moralis.enableWeb3();
  console.log('ENABLEd', Moralis.isWeb3Enabled());

  const result = await Moralis.executeFunction(readOptions);
  console.log(result);
  await Moralis.deactivateWeb3();
  console.log('DISABLED', Moralis.isWeb3Enabled());

  document.getElementById('balanceof').innerHTML = result;

}
