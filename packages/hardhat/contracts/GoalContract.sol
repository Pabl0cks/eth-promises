//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

contract GoalContract {
  // Define the Goal struct to store information about each goal.
  struct Goal {
    uint256 id;
    address payable creator;
    address payable delegate;
    uint256 deadline;
    uint256 failFee;
    bool completed;
    bool failed;
  }

  // Declare contract state variables.
  address public owner; // The contract owner's address.
  uint256 private nextGoalId; // A counter for generating unique goal IDs.
  mapping(uint256 => Goal) public goals; // A mapping from goal IDs to Goal structs.
  mapping(address => uint256[]) public delegatedGoals; // A mapping from delegate addresses to arrays of goal IDs.

  // Define events for goal creation, completion, failure, and expiration.
  event GoalCreated(uint256 indexed goalId, address indexed creator, address indexed delegate, uint256 deadline);
  event GoalCompleted(uint256 indexed goalId);
  event GoalFailed(uint256 indexed goalId);
  event GoalExpired(uint256 indexed goalId);

  // The constructor initializes the contract owner to the contract deployer.
  constructor() {
    owner = msg.sender;
  }

  // Modifier to require that the caller is the contract owner.
  modifier onlyOwner() {
    require(msg.sender == owner, "Only the contract owner can call this function.");
    _;
  }

  // Modifier to require that the caller is the delegate of a specific goal.
  modifier onlyDelegate(uint256 goalId) {
    require(msg.sender == goals[goalId].delegate, "Only the delegate can call this function.");
    _;
  }

  // Function to create a new goal.
  function createGoal(address payable delegate, uint256 deadline, uint256 failFee) external payable {
    // Ensure that the caller sent enough Ether to cover the fail fee.
    require(msg.value == failFee, "Incorrect fail fee sent.");

    // Generate a new goal ID and increment the counter.
    uint256 goalId = nextGoalId++;

    // Create a new Goal struct and store it in the goals mapping.
    goals[goalId] = Goal(goalId, payable(msg.sender), delegate, deadline, failFee, false, false);

    // Add the new goal ID to the list of goals delegated to the specified delegate.
    delegatedGoals[delegate].push(goalId);

    // Emit a GoalCreated event.
    emit GoalCreated(goalId, msg.sender, delegate, deadline);
  }

  // Function for a delegate to confirm the completion of a goal.
  function confirmCompletion(uint256 goalId) external onlyDelegate(goalId) {
    // Get a reference to the goal in storage.
    Goal storage goal = goals[goalId];

    // Ensure that the goal has not already been marked as completed or failed.
    require(!goal.completed && !goal.failed, "Goal already completed or failed.");

    // Mark the goal as completed.
    goal.completed = true;

    // Transfer the fail fee back to the goal creator.
    goal.creator.transfer(goal.failFee);

    // Emit a GoalCompleted event.
    emit GoalCompleted(goalId);
  }

  // Function for a delegate to confirm the failure of a goal.
  function confirmFailure(uint256 goalId) external onlyDelegate(goalId) {
    // Get a reference to the goal in storage.
    Goal storage goal = goals[goalId];

    // Ensure that the goal has not already been marked as completed or failed.
    require(!goal.completed && !goal.failed, "Goal already completed or failed.");

    // Mark the goal as failed.
    goal.failed = true;

    payable(owner).transfer(goal.failFee);

    emit GoalFailed(goalId);
  }

  function claimExpired(uint256 goalId) external onlyOwner {
    Goal storage goal = goals[goalId];
    require(!goal.completed && !goal.failed, "Goal already completed or failed.");
    require(block.timestamp >= goal.deadline + 2 * 365 days, "Goal not yet expired.");

    payable(owner).transfer(goal.failFee);

    emit GoalExpired(goalId);
  }

  // Updated function to return all data for the delegated goals.
  function getDelegatedGoals(address delegate) external view returns (Goal[] memory) {
    uint256[] memory goalIds = delegatedGoals[delegate];
    Goal[] memory goalsArray = new Goal[](goalIds.length);

    for (uint256 i = 0; i < goalIds.length; i++) {
      uint256 goalId = goalIds[i];
      goalsArray[i] = goals[goalId];
    }
    return goalsArray;
  }

  function getGoalCount() external view returns (uint256) {
    return nextGoalId;
  }

  // New function to return all stored goals.
  function getAllGoals() external view returns (Goal[] memory) {
    Goal[] memory allGoals = new Goal[](nextGoalId);
    for (uint256 i = 0; i < nextGoalId; i++) {
      allGoals[i] = goals[i];
    }
    return allGoals;
  }
}
