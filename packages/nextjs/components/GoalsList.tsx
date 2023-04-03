import { useEffect, useRef, useState } from "react";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface Goal {
  id: number;
  creator: string;
  delegate: string;
  deadline: number;
  failFee: BigNumber;
  completed: boolean;
  failed: boolean;
}

const GoalsList = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const allGoals = useScaffoldContractRead({
    contractName: "GoalContract",
    functionName: "getAllGoals",
  });

  const sliderContentRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderContentRef.current) {
      sliderContentRef.current.scrollBy({ left: -480, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderContentRef.current) {
      sliderContentRef.current.scrollBy({ left: 480, behavior: "smooth" });
    }
  };

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
        };
      });

      setGoals(fetchedGoals);
    }
  }, [allGoals.data]);

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
    <div className="goalsListContainer">
      <div className="arrow arrowLeft" onClick={scrollLeft}>
        &lt;
      </div>
      <div className="sliderWrapper">
        <div className="sliderContent" ref={sliderContentRef}>
          {goals.map(goal => (
            <div key={goal.id}>
              <div className="goalCard">
                <p className="goalTitle">Goal ID: {goal.id}</p>
                <p className="goalData">Creator: {goal.creator}</p>
                <p className="goalData">Delegate: {goal.delegate}</p>
                <p className="goalData">Deadline: {formatDate(goal.deadline)} (UTC)</p>
                <p className="goalData">Fail Fee: {goal.failFee ? formatEther(goal.failFee) : "N/A"} ETH</p>
                <p className="goalData">
                  Status: {goal.completed ? "Completed" : goal.failed ? "Failed" : "In Progress"}
                </p>
              </div>
              <hr className="divider" />
            </div>
          ))}
        </div>
      </div>
      <div className="arrow arrowRight" onClick={scrollRight}>
        &gt;
      </div>
    </div>
  );
};

export default GoalsList;
