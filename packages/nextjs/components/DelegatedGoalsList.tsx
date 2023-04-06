import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface Goal {
  id: number;
  creator: string;
  delegate: string;
  deadline: number;
  failFee: BigNumber;
  completed: boolean;
  failed: boolean;
  goalText: string;
}

const DelegatedGoalsList = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoalIdForCompletion, setnewGoalIdForCompletion] = useState<number>(0);
  const [newGoalIdForFailure, setnewGoalIdForFailure] = useState<number>(0);
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
          goalText: goalData.goalText,
        };
      });

      setGoals(fetchedGoals);
    }
  }, [delegatedGoals.data]);

  useEffect(() => {
    if (newGoalIdForCompletion) {
      confirmCompletionTx.writeAsync();
    }
  }, [newGoalIdForCompletion]);

  useEffect(() => {
    if (newGoalIdForFailure) {
      confirmFailureTx.writeAsync();
    }
  }, [newGoalIdForFailure]);

  const formalDate = (timestamp: number): string => {
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

  return (
    <div>
      <h3 className="font-semibold text-xl mb-4">Your supervisions</h3>
      <p className="mt-0 mb-8">Mark the goals assigned to your supervision as completed or as failed</p>
      <div className="flex flex-wrap gap-8">
        {goals.map(goal => (
          <ul className="card bg-secondary w-[23%] p-6" key={goal.id}>
            <li className="pb-4">
              <strong>Goal id: </strong>
              {goal.id}
            </li>
            <li className="pb-4">
              <strong>Goal: </strong>
              {goal.goalText}
            </li>
            <li className="pb-4">
              <strong>Creator: </strong>
              <Address address={goal.creator} />
            </li>
            <li className="pb-4">
              <strong>Supervisor: </strong>
              <Address address={goal.delegate} />
            </li>
            <li className="pb-4">
              <strong className="block">Deadline: </strong>
              {formalDate(goal.deadline)} (UTC)
            </li>
            <li className="pb-4">
              <strong>Fail fee: Ξ </strong>
              {formatEther(goal.failFee)}
            </li>
            <li className="pb-4 absolute top-6 right-6">
              {goal.completed ? (
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Completed</span>
              ) : goal.failed ? (
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Failed</span>
              ) : (
                <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">In Progress</span>
              )}
            </li>
            <li className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {!goal.completed && !goal.failed && (
                <div className="flex flex-col">
                  <button
                    onClick={() => setnewGoalIdForCompletion(goal.id)}
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Mark as Complete
                  </button>
                  <button
                    onClick={() => setnewGoalIdForFailure(goal.id)}
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Mark as Failed
                  </button>
                </div>
              )}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default DelegatedGoalsList;
