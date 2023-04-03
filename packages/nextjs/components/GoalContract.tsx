import { useState } from "react";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const GoalContractComponent = () => {
  // State variables for input fields
  const [delegatedAddress, setDelegatedAddress] = useState("");
  const [deadline, setDeadline] = useState("");
  const [failFee, setFailFee] = useState("");

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

  return (
    <div className="container mx-auto px-4">
      {/* Render the form to create a new goal */}
      <div className="w-full max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-5">Create Goal</h2>
        <div className="mb-4">
          <label htmlFor="delegatedAddress" className="block text-gray-700 text-sm font-semibold mb-2">
            Delegated Address:
          </label>
          <input
            id="delegatedAddress"
            type="text"
            value={delegatedAddress}
            onChange={e => setDelegatedAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="deadline" className="block text-gray-700 text-sm font-semibold mb-2">
            Deadline (in hours):
          </label>
          <input
            id="deadline"
            type="number"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="failFee" className="block text-gray-700 text-sm font-semibold mb-2">
            Fail Fee (in ETH):
          </label>
          <input
            id="failFee"
            type="text"
            value={failFee}
            onChange={e => setFailFee(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          onClick={createGoalTx.writeAsync}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Goal
        </button>
      </div>
    </div>
  );
};

export default GoalContractComponent;
