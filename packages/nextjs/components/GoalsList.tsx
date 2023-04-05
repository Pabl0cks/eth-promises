import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

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

const GoalsList = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const allGoals = useScaffoldContractRead({
    contractName: "GoalContract",
    functionName: "getAllGoals",
  });

  useEffect(() => {
    if (allGoals.data) {
      const fetchedGoals: Goal[] = allGoals.data.map((goalData: any) => {
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
  }, [allGoals.data]);

  return (
    <div className="goals-container w-full h-[calc(11.5*3rem)] overflow-y-auto">
      <div className="flex flex-wrap gap-4">
        {goals.map(goal => (
          <>
            <ul className="card bg-secondary w-[31%] p-6" key={goal.id}>
              <li className="pb-4 flex">
                <Address address={goal.creator} />
              </li>
              <li className="pb-4 flex">
                <blockquote className="text-xl italic pl-2 border-l-4 border-gray-300">
                  <span className="quote">{goal.goalText}</span>
                </blockquote>
              </li>
            </ul>
          </>
        ))}
      </div>
    </div>
  );
};

export default GoalsList;
