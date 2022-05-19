
function change_page(){
  window.location.href = "dao.html";
} 

// bind button click handlers
// document.getElementById("btn-token-balanceof").onclick = balanceOfToken;

// TODO not working here
async function balanceOfToken() {
  const user = Moralis.User.current();
  console.log(user);

  // const contractAddress = '0x150b077aFF5D0cC64A42e4260A5F52cC9a863a2d';
  // const contractAddress = '0x0fb19e83d740af9d7642a17e8e3fe2977f3fbf96';
  // const contractAddress = '0x486c4ceaea947a67523ac44229dbb9dca7c53282';
  const contractAddress = '0x021FBa3BA7327B1cbf34bF386C8a906156a52ae5';
  const abiJson = await fetch('./TokenERC20.json').then(response => {
    return response.json();
  });
  
  const contractAbi = abiJson['abi'];
  console.log(contractAbi);

  const readOptions = {
    contractAddress: contractAddress,
    functionName: "balanceOf",
    abi: contractAbi,
    params: { owner: '0x0Fb19E83D740af9D7642a17e8E3fe2977F3FBf96' }
    //params: { owner: user.get('ethAddress') },
  };
  await Moralis.enableWeb3();
  console.log('ENABLEd', Moralis.isWeb3Enabled());

  const result = await Moralis.executeFunction(readOptions);
  console.log(result);
  await Moralis.deactivateWeb3();
  console.log('DISABLED', Moralis.isWeb3Enabled());

  document.getElementById('balanceof').innerHTML = result;

}


