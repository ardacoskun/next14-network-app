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
