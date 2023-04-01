import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface Goal {
  id: number;
  creator: string;
  delegate: string;
  deadline: number;
  failFee: BigNumber;
  completed: boolean;
  failed: boolean;
}

const DelegatedGoalsList = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoalIdForCompletion, setnewGoalIdForCompletion] = useState("");
  const [newGoalIdForFailure, setnewGoalIdForFailure] = useState("");
  const { address } = useAccount();

  const delegatedGoals = useScaffoldContractRead({
    contractName: "GoalContract",
    functionName: "getDelegatedGoals",
    args: [address],
  });

  useEffect(() => {
    if (delegatedGoals.data) {
      const fetchedGoals: Goal[] = delegatedGoals.data.map((goalData: any) => {
        return {
          id: goalData.id.toNumber(),
          creator: goalData.creator,
          delegate: goalData.delegate,
          deadline: goalData.deadline.toNumber(),
          failFee: BigNumber.from(goalData.failFee.toString()),
          completed: goalData.completed,
          failed: goalData.failed,
        };
      });

      setGoals(fetchedGoals);
    }
  }, [delegatedGoals.data]);

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const confirmCompletionTx = useScaffoldContractWrite({
    contractName: "GoalContract",
    functionName: "confirmCompletion",
    args: [newGoalIdForCompletion ? BigNumber.from(newGoalIdForCompletion) : BigNumber.from("0")],
  });

  const confirmFailureTx = useScaffoldContractWrite({
    contractName: "GoalContract",
    functionName: "confirmFailure",
    args: [newGoalIdForFailure ? BigNumber.from(newGoalIdForFailure) : BigNumber.from("0")],
  });

  // ...
  return (
    <div>
      {goals.map(goal => (
        <div key={goal.id}>
          {/* ... (All previous rendering code remains the same) */}
          <p>Goal ID: {goal.id}</p>
          <p>Creator: {goal.creator}</p>
          <p>Delegate: {goal.delegate}</p>
          <p>Deadline: {formatDate(goal.deadline)} (UTC)</p>
          <p>Fail Fee: {goal.failFee ? formatEther(goal.failFee) : "N/A"} ETH</p>
          <p>Status: {goal.completed ? "Completed" : goal.failed ? "Failed" : "In Progress"}</p>
          {/* Add the complete and fail buttons */}
          {!goal.completed && !goal.failed && (
            <>
              <button
                onClick={() => {
                  setnewGoalIdForCompletion(goal.id.toString());
                  console.log("newGoalIdForCompletion: " + newGoalIdForCompletion);
                  confirmCompletionTx.write();
                }}
                className="btn btn-green"
              >
                Mark as Complete
              </button>
              <button
                onClick={() => {
                  setnewGoalIdForFailure(goal.id.toString());
                  console.log("newGoalIdForFailure: " + newGoalIdForFailure);
                  confirmFailureTx.write();
                }}
                className="btn btn-green"
              >
                Mark as Failed
              </button>
            </>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
};
// ...

export default DelegatedGoalsList;
