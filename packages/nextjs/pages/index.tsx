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
      <div className="grid lg:grid-cols-2 flex-grow">
        <div className="">
          <div className="container mx-auto px-4 text-center my-10">
            <h1 className="text-3xl font-bold">Promise on ETH</h1>
            <p className="mt-0">Put your ETH where your mouth is!</p>
          </div>
          <div className="">
            <GoalContractComponent />
          </div>
        </div>
        <div className="container mx-auto px-4 text-center my-10">
          <h2 className="text-xl font-bold">Take inspiration to define your next goal</h2>
          <p className="mt-0">Check other&apos;s promises on ETH to inspire yours</p>
          <div className="w-[90%] max-w-7xl m-auto mt-10">
            <GoalsList />
          </div>
        </div>
      </div>

      {/* Add the MyGoalsList component as a section */}
      <div className="w-[90%] max-w-7xl m-auto mt-20">
        <MyGoalsList />
      </div>
      {/* Add the DelegatedGoalsList component as a section */}
      <div className="w-[90%] max-w-7xl m-auto mt-20">
        <DelegatedGoalsList />
      </div>
    </div>
  );
};

export default EthPromise;
