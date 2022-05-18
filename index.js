// import Web3 from "web3";

// connect to Moralis server
const serverUrl = "https://5fkevnj7lttp.usemoralis.com:2053/server";
const appId = "Cjt9HBSIu34CfVHsHAAEYKlYgaKLAgrz2649HybB";
Moralis.start({ serverUrl, appId });

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

// bind button click handlers
document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
document.getElementById("btn-balanceof").onclick = balanceOf;
document.getElementById("btn-mint").onclick = mint;
document.getElementById("btn-token-balanceof").onclick = balanceOfToken;
document.getElementById("btn-vote-yes").onclick = voteYes;
document.getElementById("btn-vote-no").onclick = voteNo;

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

async function balanceOfToken() {
  const user = Moralis.User.current();
  console.log(user);

  // const contractAddress = '0x150b077aFF5D0cC64A42e4260A5F52cC9a863a2d';
  // const contractAddress = '0x0fb19e83d740af9d7642a17e8e3fe2977f3fbf96';
  // const contractAddress = '0x486c4ceaea947a67523ac44229dbb9dca7c53282';
  const contractAddress = '0xe914863a1ef30ff526bdf03d9d98787bd3e34895';
  const abiJson = await fetch('./TokenERC20.json').then(response => {
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


function voteYes() {
  console.log("You vote yes");

}


function voteNo() {
  console.log("You vote no");
}