console.log("========sum_to_n=========");
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum = sum + i;
  }
  return sum;
}

function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}
function sum_to_n_c(n: number): number {
  if (n === 0) return 0;
  return n + sum_to_n_c(n - 1);
}
const n = 10;
const s_a = sum_to_n_a(n);
const s_b = sum_to_n_b(n);
const s_c = sum_to_n_c(n);
console.log({ s_a, s_b, s_c });
