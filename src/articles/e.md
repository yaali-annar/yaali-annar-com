---
title: "The constant known as e"
description: "Explanation about what is the Euler's number and how to calculate it."
---

What is $$e$$?

To grasp the concept of $$e$$, imagine this scenario: You've invested $$100$$ units into a financial scheme promising a $$100%$$ return over a year. While such a scheme is definitely a scam in real life, let's overlook that for this explanation.

A year later, your investment doubles to $$200$$ units, marking a growth factor of $$2$$. But what happens if you opt for a semester-long investment instead, achieving a $$50%$$ return, then reinvest the total (now $$150$$ units) for another semester? The growth factor of your investment becomes:

$$
(1,5)^2 = 2,25
$$

Notice how it increases. Let's break down the investment further into quarters, each with a 25% return. The growth now becomes to:

$$
(1,25)^4 = 2,441
$$

What if the investment were even more frequent, say monthly? This is the total growth factor at the end of the year:

$$
(1 + \frac{1}{12})^{12} = 2,613
$$

The formula for calculating the growth factor is thus:

$$
(1 + \frac{1}{n})^n
$$

Does this mean the growth factor increases infinitely? Not quite. Eventually, it approaches a constant value, known as $$e$$. Hence, $$e$$ is defined by the term:

$$
\lim\limits_{n \to \infty} (1 + \frac{1}{n})^n
$$

## Calculating e

But, how do we calculate this? Well, this is where binomial expansion comes to place. Remember the formula for binomial expansion:

$$
(a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k
$$

Where $$\binom{n}{k}$$ is defined as:

$$
\frac{n!}{(k!)(n-k)!}
$$

Now let's plug our definition for $$e$$ to the binomial expansion:

$$
\begin{split}
e &= \lim\limits_{n \to \infty} \sum_{k=0}^{n} (\frac{n!}{(k!)(n-k)!}) 1^{n-k} (\frac{1}{n})^k \\
&= \sum_{k=0}^{n} \lim\limits_{n \to \infty} \frac{n!}{(k!)(n-k)!} \cdot \frac{1}{n^k}\\
&= \sum_{k=0}^{n} \lim\limits_{n \to \infty} \frac{1}{k!} \cdot \frac{n!}{(n^k)(n-k)!}
\end{split}
$$

Now, we can focus on this part of the equation:

$$
\frac{n!}{(n^k)(n-k)!} = \frac{n!}{(n-k)!} \cdot \frac{1}{n^k}
$$

The fraction $$\frac{n!}{(n-k)!}$$ means $$(n)(n-1)(n-2)\cdots(n-k+1)$$. Since $$n-k$$ becomes closer to $$n$$ as $$n$$ reaches infinity, then:

$$
\begin{split}
\lim\limits_{n \to \infty} \frac{n!}{(n-k)!} \cdot \frac{1}{n^k} &= \lim\limits_{n \to \infty} \frac{n}{n} \cdot \frac{n-1}{n} \cdots \frac{n-k+1}{n} \\
&= 1 \cdot 1 \cdots 1 \\
&= 1
\end{split}
$$

From here we can incorporate it to our binomial expansion:

$$
\begin{split}
e &= \sum_{k=0}^{n} \lim\limits_{n \to \infty} \frac{n!}{(n^k)(n-k)!} \cdot \frac{1}{k!} \\
e &= \sum_{k=0}^{\infty} \frac{1}{k!}
\end{split}
$$

## Approximating $$e^x$$

Getting the value of $$e$$ using binomial expansion is basically implementing a specific case of $$e^x$$ where $$x=1$$

Let us try to get the approximation of $$e^x$$ then, by expanding $$\lim\limits_{n \to \infty} (1 + \frac{1}{n})^{nx}$$:

$$
\begin{split}
e^x &= \lim\limits_{n \to \infty} \sum_{k=0}^{n} \binom{nx}{k} 1^{nx-k}(\frac{1}{n})^k \\
&= \lim\limits_{n \to \infty} \sum_{k=0}^{n} (\frac{nx!}{(k!)(nx-k)!})(\frac{1}{n})^k \\
&= \sum_{k=0}^{n} \lim\limits_{n \to \infty} \frac{nx!}{(k!)(nx-k)!} \cdot \frac{1}{n^k}\\
&= \sum_{k=0}^{n} \lim\limits_{n \to \infty} \frac{1}{k!} \cdot \frac{nx!}{(n^k)(nx-k)!}
\end{split}
$$

Just like with $$\frac{n!}{(n-k)!}$$ we can expand $$\frac{nx!}{(nx-k)!}$$ as $$n$$ approaches infinity, $$nx-k$$ becomes closer to $$nx$$:

$$
\begin{split}
\lim\limits_{n \to \infty} \frac{nx!}{(nx-k)!} \cdot \frac{1}{n^k} &= \lim\limits_{n \to \infty} \frac{nx}{n} \cdot \frac{nx-1}{n} \cdots \frac{nx-k+1}{n} \\
&= x \cdot x \cdots x \\
&= x^k
\end{split}
$$

Plugging it back to the sum, we get:

$$
\begin{split}
e^x &= \sum_{k=0}^{n} \lim\limits_{n \to \infty} \frac{nx!}{(n^k)(nx-k)!} \cdot \frac{1}{k!} \\
&= \sum_{k=0}^{\infty} \frac{x^k}{k!}
\end{split}
$$

To derive $$e^x$$ we can do the following:

$$
\begin{split}
e^x &= \sum_{k=0}^{\infty} \frac{x^k}{k!}\\
&= \frac{x^0}{0!} + \sum_{k=1}^{\infty} \frac{x^k}{k!}\\
&= 1 + \sum_{k=1}^{\infty} \frac{x^k}{k!}\\
\frac{de^x}{dx} &= 0 + \sum_{k=1}^{\infty} \frac{k \cdot x^{k-1}}{k!} \\
&= \sum_{k=1}^{\infty} \frac{x^{k-1}}{(k-1)!}\\
&= \sum_{k=0}^{\infty} \frac{x^{k}}{k!}\\
&= e^x
\end{split}
$$

## Understanding Euler's Identity

TODO
