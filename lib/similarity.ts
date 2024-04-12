const getMagnitude = (vector: number[]) => {
  return Math.sqrt(vector.reduce((sum, value) => sum + value ** 2, 0));
};

export const cosineSimilarity = (
  vector1: number[],
  vector2: number[]
): number => {
  const dotProduct = vector1.reduce(
    (sum, value, index) => sum + value * vector2[index],
    0
  );

  const magnitude1 = getMagnitude(vector1);
  const magnitude2 = getMagnitude(vector2);

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }
  return dotProduct / (magnitude1 * magnitude2);
};

//Function to calculate similarity based on skills and job title

export const combinedSimilarity = (
  user1Skills: number[],
  user2Skills: number[],
  jobTitle1: string,
  jobTitle2: string
): number => {
  const skillsSimilarity = cosineSimilarity(user1Skills, user2Skills);

  //additional criteria for job title
  const jobTitleSimilarity = jobTitle1 === jobTitle2 ? 1 : 0;

  //adjust weights
  const combinedSimilarity = 0.8 * skillsSimilarity + 0.2 * jobTitleSimilarity;

  return combinedSimilarity;
};
