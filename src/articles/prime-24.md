---
title: "Prime and 24"
description: "Relationship Between Prime Numbers and 24."
---

The square of any prime number greater than 3 has an intriguing property: it is always one more than a multiple of 24. This characteristic can be a handy tool for preliminary checks when identifying prime numbers, although additional verification is still required.

### Exploring the Pattern with Examples

To illustrate, consider the square of each prime number greater than 3, subtract 1 from it, and divide the result by 24:

| Prime Number (a) | $( b = a^2 - 1 )$ | $\frac {b} {24}$ |
| ---------------- | ----------------- | ---------------- |
| 5                | 24                | 1                |
| 7                | 48                | 2                |
| 11               | 120               | 5                |
| 13               | 168               | 7                |
| 17               | 288               | 12               |

Although this pattern can suggest primality, it is not definitive. For example, numbers like 25, 35, and 49 also fit this pattern, yet they are not primes.

### Why the Pattern Exists

To understand why this pattern holds, we can apply a bit of number theory using base 12. Any integer can be expressed in the form $12n + k$ where $k$ ranges from 0 to 11.

When we square $12n + k$ and subtract 1, the expression simplifies as follows:

$$
\begin{split}
(12n+k)^2 - 1 & = 144n^2 + 24kn + k^2 - 1 \\
& = 24n(6n + k) + (k^2 - 1)
\end{split}
$$

This expression is clearly divisible by 24, except for the term $k^2 - 1$, which requires specific conditions for divisibility by 24. Only certain values of $k$ associated with primes will satisfy this.

### Validating the Values of $k$

When investigating which values of $k$ may lead to prime numbers, most are disqualified by divisibility rules:

| Expression | Divisibility    |
| ---------- | --------------- |
| $12n + 0$  | Divisible by 12 |
| $12n + 1$  | Potential prime |
| $12n + 2$  | Divisible by 2  |
| $12n + 3$  | Divisible by 3  |
| $12n + 4$  | Divisible by 4  |
| $12n + 5$  | Potential prime |
| $12n + 6$  | Divisible by 6  |
| $12n + 7$  | Potential prime |
| $12n + 8$  | Divisible by 4  |
| $12n + 9$  | Divisible by 3  |
| $12n + 10$ | Divisible by 2  |
| $12n + 11$ | Potential prime |

Testing the viable values of k yields:

| $k$ | $k^2 - 1$ |
| --- | --------- |
| 1   | 0         |
| 5   | 24        |
| 7   | 48        |
| 11  | 120       |

Interestingly, 5, 7, 11 are indeed prime numbers, confirming the pattern.
