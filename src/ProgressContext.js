import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  // progress: { [taskId]: { steps: [bool[]], substeps: [[bool[]]] } }
  const [progress, setProgress] = useState({});

  function markSubstepComplete(taskId, stepIdx, subIdx, totalSteps, totalSubsteps) {
    setProgress(prev => {
      const taskProgress = prev[taskId] || {
        steps: Array(totalSteps).fill(false),
        substeps: Array(totalSteps).fill(null).map((_, i) => Array(totalSubsteps[i]).fill(false)),
        completed: false
      };
      const newSubsteps = taskProgress.substeps.map(arr => [...arr]);
      newSubsteps[stepIdx][subIdx] = true;
      // If all substeps in this step are complete, mark step as complete
      const stepComplete = newSubsteps[stepIdx].every(Boolean);
      const newSteps = [...taskProgress.steps];
      newSteps[stepIdx] = stepComplete;
      // If all steps are complete, mark task as complete
      const allStepsComplete = newSteps.every(Boolean);
      return {
        ...prev,
        [taskId]: {
          steps: newSteps,
          substeps: newSubsteps,
          completed: allStepsComplete
        }
      };
    });
  }

  return (
    <ProgressContext.Provider value={{ progress, markSubstepComplete }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
