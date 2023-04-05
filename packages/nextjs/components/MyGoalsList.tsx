import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface Goal {
  id: number;
  creator: string;
  delegate: string;
  deadline: number;
  failFee: BigNumber;
  goalText: string;
  completed: boolean;
  failed: boolean;
}

const MyGoalsList = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const { address } = useAccount();

  const allGoals = useScaffoldContractRead({
    contractName: "GoalContract",
    functionName: "getAllGoals",
  });

  useEffect(() => {
    if (allGoals.data) {
      const fetchedGoals: Goal[] = allGoals.data
        .filter((goalData: any) => goalData.creator === address)
        .map((goalData: any) => {
          return {
            id: goalData.id.toNumber(),
            creator: goalData.creator,
            delegate: goalData.delegate,
            deadline: goalData.deadline.toNumber(),
            failFee: BigNumber.from(goalData.failFee.toString()),
            goalText: goalData.goalText,
            completed: goalData.completed,
            failed: goalData.failed,
          };
        });

      setGoals(fetchedGoals);
    }
  }, [allGoals.data, address]);

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

  return (
    <div>
      <h3 className="font-semibold text-xl mb-4">My Goals</h3>
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
              {formatDate(goal.deadline)} (UTC)
            </li>
            <li className="pb-4">
              <strong>Fail fee: Ξ </strong>
              {formatEther(goal.failFee)}
            </li>
            <li className="pb-4 absolute top-6 right-6">
              {goal.completed ? (
                <span className="bg-green-500 text-xs text-white font-semibold px-2 py-1 rounded-full">Completed</span>
              ) : goal.failed ? (
                <span className="bg-red-500 text-xs text-white font-semibold px-2 py-1 rounded-full">Failed</span>
              ) : (
                <span className="bg-blue-500 text-xs text-white font-semibold px-2 py-1 rounded-full">In Progress</span>
              )}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MyGoalsList;
