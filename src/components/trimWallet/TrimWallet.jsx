const TrimWallet = (wallet) => {
  const newAddress = wallet
    ? `${wallet.slice(0, 10)}...${wallet.slice(wallet.length - 4, wallet.length)}`
    : wallet;
  return newAddress;
};

export default TrimWallet;
