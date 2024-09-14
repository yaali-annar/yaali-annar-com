function gcd(a: number, b: number): number {
  let x = a;
  let y = b;
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) {
    return 0; // LCM of 0 and any number is 0
  }
  return Math.abs(a * b) / gcd(a, b);
}

export { gcd, lcm };
