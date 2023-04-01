import { useState } from "react";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const GoalContractComponent = () => {
  // ... other state variables

  // State variables for input fields
  const [delegatedAddress, setDelegatedAddress] = useState("");
  const [deadline, setDeadline] = useState("");
  const [failFee, setFailFee] = useState("");

  // ... other hooks and effects

  const createGoalTx = useScaffoldContractWrite({
    contractName: "GoalContract",
    functionName: "createGoal",
    args: [
      delegatedAddress,
      BigNumber.from(Date.now() + Number(deadline) * 60 * 60 * 1000),
      failFee ? ethers.utils.parseEther(failFee) : ethers.utils.parseEther("0"),
    ],
    value: failFee || "0",
  });

  // ... other write transactions

  return (
    <div>
      {/* Render the form to create a new goal */}
      <div>
        <label htmlFor="delegatedAddress">Delegated Address:</label>
        <input
          id="delegatedAddress"
          type="text"
          value={delegatedAddress}
          onChange={e => setDelegatedAddress(e.target.value)}
        />

        <label htmlFor="deadline">Deadline (in hours):</label>
        <input id="deadline" type="number" value={deadline} onChange={e => setDeadline(e.target.value)} />

        <label htmlFor="failFee">Fail Fee (in ETH):</label>
        <input id="failFee" type="text" value={failFee} onChange={e => setFailFee(e.target.value)} />

        <button onClick={createGoalTx.writeAsync}>Create Goal</button>
      </div>

      {/* Render the list of goals delegated to the current user */}
      {/* ... */}
    </div>
  );
};

export default GoalContractComponent;
