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
      <div className="container mx-auto px-4 text-center my-10">
        <h1 className="text-3xl font-bold">Promise on ETH</h1>
        <p className="mt-0">Put your ETH where your mouth is!</p>
      </div>

      <div>
        <GoalContractComponent />
      </div>
      {/* Add the MyGoalsList component as a section */}
      <div className="w-[90%] max-w-7xl m-auto mt-20">
        <MyGoalsList />
      </div>
      {/* Add the DelegatedGoalsList component as a section */}
      <div className="w-[90%] max-w-7xl m-auto mt-20">
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
