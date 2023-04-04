import React from "react";
// Import the components
import DelegatedGoalsList from "~~/components/DelegatedGoalsList";
import GoalContractComponent from "~~/components/GoalContract";
import GoalsList from "~~/components/GoalsList";
import MyGoalsList from "~~/components/MyGoalsList";

// Import the MyGoalsList component

const EthPromise = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Promise on ETH</h1>
      <div>
        <GoalContractComponent />
      </div>
      {/* Add the MyGoalsList component as a section */}
      <div>
        <h2 className="text-2xl font-bold mt-8">Your Goals</h2>
        <MyGoalsList />
      </div>
      {/* Add the DelegatedGoalsList component as a section */}
      <div>
        <h2 className="text-2xl font-bold mt-8">Your Delegated Goals</h2>
        <DelegatedGoalsList />
      </div>
      {/* Add the GoalsList component as a section */}
      <div>
        <h2 className="text-2xl font-bold mt-8">All Goals</h2>
        <GoalsList />
      </div>
    </div>
  );
};

export default EthPromise;
