
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
  getStats();
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
document.getElementById("btn-get-stats").onclick = getStats;
document.getElementById("btn-transfer-ETH").onclick = transfer;
document.getElementById("btn-create-collection").onclick = createCollection;
document.getElementById("btn-mint").onclick = mint;
document.getElementById("btn-vote-yes").onclick = voteYes;
document.getElementById("btn-vote-no").onclick = voteNo;

// refresh stats
function getStats() {
  const user = Moralis.User.current();
  if (user) {
    getUserTransactions(user);
  }
  getAverageGasPrices();
}

// HISTORICAL TRANSACTIONS
async function getUserTransactions(user) {
  // create query
  const query = new Moralis.Query("EthTransactions");
  query.equalTo("from_address", user.get("ethAddress"));

  // subscribe to query updates
  const subscription = await query.subscribe();
  handleNewTransaction(subscription);

  // run query
  const results = await query.find();
  console.log("user transactions:", results);
}

// REAL-TIME TRANSACTIONS
async function handleNewTransaction(subscription) {
  // log each new transaction
  subscription.on("create", function (data) {
    console.log("new transaction: ", data);
  });
}

// CLOUD FUNCTION
async function getAverageGasPrices() {
  const results = await Moralis.Cloud.run("getAvgGas");
  console.log("average user gas prices:", results);
  renderGasStats(results);
}

function renderGasStats(data) {
  const container = document.getElementById("gas-stats");
  container.innerHTML = data
    .map(function (row, rank) {
      return `<li>#${rank + 1}: ${Math.round(row.avgGas)} gwei</li>`;
    })
    .join("");
}

//get stats on page load
getStats();


async function transfer() {
  // sending 0.5 ETH
  const options = {
    type: "native",
    amount: Moralis.Units.ETH("0.05"),
    receiver: "0x66aB6D9362d4F35596279692F0251Db635165871",
  };
  await Moralis.enableWeb3();
  console.log('ENABLEd', Moralis.isWeb3Enabled());
  let result = await Moralis.transfer(options);
  console.log(result);
  await Moralis.deactivateWeb3();
  console.log('DISABLED', Moralis.isWeb3Enabled())

}

async function createCollection() {
  const user = Moralis.User.current();
  console.log(user);

  const contractAddress = '0x235866371E64b0c9298683757c7A6Ca8083fb966';
  const abiJson = await fetch('./CarbonNFT_abi.json').then(response => {
    return response.json();
  });
  //console.log(abiJson);
  //.then(abiJIson => {
    const ABI = abiJson['abi'];
    console.log(ABI);

    const options = {
      //chain: "eth",
      address: contractAddress,
      function_name: "balanceOf",
      abi: ABI,
      params: { owner: '0x7b3b81A5314bBF923FAaf55f1DAd517698fD0E4e' },
    };
    await Moralis.enableWeb3();
    console.log('ENABLEd', Moralis.isWeb3Enabled());
  
    const allowance = await Moralis.Web3API.native.runContractFunction(options);
    console.log(allowance);
    await Moralis.deactivateWeb3();
    console.log('DISABLED', Moralis.isWeb3Enabled())
  
  //});

}


function mint() {
  const contractAddress = '0x235866371E64b0c9298683757c7A6Ca8083fb966';
  // abi
  //const abi =
  //console.log(json);
  fetch('./CarbonNFT_abi.json').then(response => {
    return response.json();
  }).then(abiJIson => {
    console.log(abiJIson);
  });
  //const abiJson= JSON.parse(CarbonNFT_abi)
  //console.log(abiJson);

}

function voteYes() {
  console.log("You vote yes");

}


function voteNo() {
  console.log("You vote no");
}