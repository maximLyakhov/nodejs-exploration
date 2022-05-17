export default function intensive (): number {
  let count = 0
  for (let i = 0; i <= 5_000_000_000; i++) {
    count++
  }
  return count
}
