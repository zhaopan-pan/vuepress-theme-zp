function createRandomNum(min: number, max: number) {
  const num = Math.floor(Math.random() * (max - min + 1) + min)
  return num
}

export { createRandomNum }
