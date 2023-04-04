import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useAccount } from "wagmi";
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
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-lg text-blueGray-700">My Goals</h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Goal ID
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Goal Text
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Creator
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Delegate
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Deadline
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Fail Fee
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {goals.map(goal => (
              <tr key={goal.id}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {goal.id}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {goal.goalText}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {goal.creator}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {goal.delegate}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {formatDate(goal.deadline)} (UTC)
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {formatEther(goal.failFee)} ETH
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {goal.completed ? (
                    <span className="bg-green-500 text-white font-semibold px-2 py-1 rounded-full">Completed</span>
                  ) : goal.failed ? (
                    <span className="bg-red-500 text-white font-semibold px-2 py-1 rounded-full">Failed</span>
                  ) : (
                    <span className="bg-blue-500 text-white font-semibold px-2 py-1 rounded-full">In Progress</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyGoalsList;
