export function averageRating (list, key) {
  const ratings = list.map(item => item[key])

  const averageRating = ratings.reduce((acc, current) => acc + current, 0) / ratings.length
  return averageRating.toFixed(2)
}