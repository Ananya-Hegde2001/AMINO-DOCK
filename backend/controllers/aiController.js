const recommendStack = async (req, res) => {
  const { goal, weight, workoutFrequency } = req.body;

  if (!goal || !weight || !workoutFrequency) {
    return res.status(400).json({ message: 'goal, weight and workoutFrequency are required' });
  }

  const normalizedGoal = String(goal).toLowerCase();
  const stack = [];
  const tips = [];

  if (normalizedGoal.includes('muscle')) {
    stack.push('Elite Whey Concentrate', 'Creatine Monohydrate', 'Elite Omega Fish Oil');
    tips.push('Target a daily protein intake between 1.6g and 2.2g per kg bodyweight.');
  } else if (normalizedGoal.includes('fat')) {
    stack.push('Elite Whey Isolate', 'Elite Omega Fish Oil');
    tips.push('Use isolate post workout to maintain lean mass during a calorie deficit.');
  } else {
    stack.push('Elite Iso Blend', 'Electrolytes', 'Elite Omega Fish Oil');
    tips.push('Prioritize hydration and recovery between endurance sessions.');
  }

  if (Number(weight) > 85) {
    stack.push('Extra Creatine serving (coach approved)');
  }

  if (Number(workoutFrequency) >= 5) {
    tips.push('Add vitamins support for high-frequency training blocks.');
  }

  res.json({
    input: { goal, weight, workoutFrequency },
    recommendedStack: [...new Set(stack)],
    tips
  });
};

module.exports = { recommendStack };
