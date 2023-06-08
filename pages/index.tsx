import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const contractAddress = "0x26275251a2380bCfa4F32059FbF83f31824FED4e"

  const { contract } = useContract(contractAddress)
  const { data: proposal, isLoading: proposalLoading } = useContractRead(contract, "proposals", [0]);
  const { data: voter, isLoading: voterLoading } = useContractRead(contract, "voters", [0, address]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.card}>
          <ConnectWallet />
          <h1>Voting Dapp</h1>
          <div>
            {address ? (
              <div>
                {proposalLoading ? (
                  <div>
                    <p>ちょっとまってね...</p>
                  </div>
                ) : (
                  <div>
                    <h2>{proposal[0]}</h2>
                    <div>
                      <Web3Button
                        contractAddress={contractAddress}
                        action={(contract) => contract.call("Vote", [0, true])}
                        isDisabled={voter}
                      >Yes</Web3Button>
                      
                      <Web3Button
                        contractAddress={contractAddress}
                        action={(contract) => contract.call("Vote", [0, false])}
                        isDisabled={voter}
                      >No</Web3Button>
                    </div>
                    <div>
                      {!voterLoading && voter && voter.voted ? (
                        <div>
                          <h3>Results:</h3>
                          <p>Yes: {proposal[1].toNumber()}</p>
                          <p>No: {proposal[2].toNumber()}</p>
                        </div>
                      ) : (
                        <div>
                          <p>You have not voted yet. Results will show after you vote.</p>
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>Connect your wallet to get started.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
