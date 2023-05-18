/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import HDWalletProvider from '@truffle/hdwallet-provider';
import QuoterV2 from '@uniswap/v3-periphery/artifacts/contracts/interfaces/IQuoterV2.sol/IQuoterV2.json';
import Web3 from 'web3';

const V3Quoter = QuoterV2.abi;

// addresses
const V3quoterAddr = process.env.REACT_APP_V3QUOTERADDRESS;
const private_key = process.env.REACT_APP_ADMIN_PRIVATE;
const provider = new HDWalletProvider(private_key, process.env.REACT_APP_POLYGON_RPC);
const web3 = new Web3(provider);

async function ExactOut(TokenSelling, TokenBuying, Fee, AmountReceiving) {
  const QuoterEnc = {
    tokenIn: TokenSelling,
    tokenOut: TokenBuying,
    fee: Fee.toString(),
    amount: AmountReceiving.toString(),
    sqrtPriceLimitX96: '0',
  };

  const quoter = new web3.eth.Contract(V3Quoter, V3quoterAddr);
  /// console.log(quoter);
  const quoted = await quoter.methods.quoteExactOutputSingle(QuoterEnc).call();
  // console.log(quoted[0]);
  return quoted[0];
}
export default ExactOut;
