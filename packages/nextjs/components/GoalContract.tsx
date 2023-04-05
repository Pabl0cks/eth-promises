import { useState } from "react";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import { AddressInput, EtherInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const GoalContractComponent = () => {
  // State variables for input fields
  const [delegatedAddress, setDelegatedAddress] = useState("");
  const [deadline, setDeadline] = useState("");
  const [failFee, setFailFee] = useState("");
  const [goalText, setGoalText] = useState("");

  const createGoalTx = useScaffoldContractWrite({
    contractName: "GoalContract",
    functionName: "createGoal",
    args: [
      delegatedAddress,
      BigNumber.from(Date.now() + Number(deadline) * 24 * 60 * 60 * 1000),
      failFee ? ethers.utils.parseEther(failFee) : ethers.utils.parseEther("0"),
      goalText,
    ],
    value: failFee || "0",
  });

  return (
    <div className="container mx-auto px-4">
      {/* Render the form to create a new goal */}
      <div className="w-full max-w-lg mx-auto mt-10 border-primary border-8 p-10">
        <h2 className="text-2xl font-semibold mb-5">Create Goal 🏆</h2>
        <div className="mb-4">
          <label htmlFor="goalText" className="block text-gray-700 text-sm font-semibold mb-2">
            Goal Description:
          </label>
          <textarea
            id="goalText"
            value={goalText}
            onChange={e => setGoalText(e.target.value)}
            placeholder="I'll leave my job before the end of the month..."
            rows={4}
            className="h-auto border-2 border-base-300 rounded-xl bg-base-200 text-accent input focus:outline-none focus:bg-transparent focus:text-gray-400 px-4 py-2 w-full font-medium placeholder:text-accent/50 text-gray-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="failFee" className="block text-gray-700 text-sm font-semibold mb-2">
            Fail Fee (in ETH):
          </label>
          <EtherInput value={failFee} onChange={amount => setFailFee(amount)} />
        </div>

        <div className="mb-4">
          <label htmlFor="deadline" className="block text-gray-700 text-sm font-semibold mb-2">
            Deadline (in days):
          </label>
          <input
            id="deadline"
            type="number"
            value={deadline}
            placeholder="30"
            onChange={e => setDeadline(e.target.value)}
            className="flex border-2 border-base-300 bg-base-200 rounded-full text-accent input focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 w-full font-medium placeholder:text-accent/50 text-gray-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="delegatedAddress" className="block text-gray-700 text-sm font-semibold mb-2">
            Supervisor&apos;s Address:
          </label>
          <AddressInput
            value={delegatedAddress}
            onChange={address => setDelegatedAddress(address)}
            placeholder="The friend who is going to validate your goal"
          />
        </div>

        <div className="flex justify-center">
          <button onClick={createGoalTx.writeAsync} className="btn-primary btn">
            Create Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalContractComponent;
