---
title: Elements of Statistical Learning - Chapter 4 Partial Solutions
layout: post
mathjax: true
intro: |
    The third set of solutions is for Chapter 4, *Linear Methods for Classification*, covering logistic regression, perceptrons, and LDA/QDA methods for classification of classes using linear methods.

    
---

The third set of solutions is for Chapter 4, *Linear Methods for Classification*, covering logistic regression, perceptrons, and LDA/QDA methods for classification of classes using linear methods.

### Exercise Solutions

See the solutions in [PDF][chap4-pdf] format ([source][chap4-tex]) for a more pleasant reading experience.  This webpage was created from the LaTeX source using the [LaTeX2Markdown](/projects/LaTeX2Markdown) utility - check it out on [GitHub](https://github.com/ajtulloch/LaTeX2Markdown).

[chap4-pdf]: /PDFs/ESL-Solutions.pdf
[chap4-tex]: /Files/ESL-Chap4Solutions.tex



#### Exercise 4.1

> Show how to solve the generalised eigenvalue problem $\max a^T B a$ subject to $a^T W a = 1$ by transforming it to a standard eigenvalue problem.


#### Proof

By Lagrange multipliers, we have that the function $\mathcal{L}(a) = a^T B a - \lambda(a^T W a - 1)$ has a critical point where \[
\frac{d \mathcal{L}}{da} = 2 a^T B^T - 2 \lambda a^T W^T = 0,
\] that is, where $Ba = \lambda Wa$.  If we let $W = D^T D$ (Cholesky decomposition), $C = D^{-T} B D^{-1}$, and $y = Da$, we obtain that our solution becomes \[
Cy = \lambda y,
\] and so we can convert our problem into an eigenvalue problem.  It is clear that if $y_m$ and $\lambda_m$ are the maximal eigenvector and eigenvalue of the reduced problem, then $D^{-1} y_m$ and $\lambda_m$ are the maximal eigenvector and eigenvalue of the generalized problem, as required.



#### Exercise 4.2

> Suppose that we have features $x \in \mathbb{R}^p$, a two-class response, with class sizes $N_1, N_2$, and the target coded as $-N/N_1, N/N_2$.
> 
> 
> 
> 1.  Show that the LDA rule classifies to class 2 if
> \[
> x^T \hat \Sigma^{-1} (\hat \mu_2 - \hat \mu_1) > \frac{1}{2} \hat \mu_2^T \hat \Sigma^{-1} \hat \mu_2 - \frac{1}{2} \hat \mu_1^T \hat \Sigma^{-1} \hat \mu_1 + \log \frac{N_1}{N} - \log \frac{N_2}{N}
> \]
> 1.  Consider minimization of the least squares criterion
> \[
> \sum_{i=1}^N \left(y_i - \beta_0 - \beta^T x_i \right)^2
> \]
> Show that the solution $\hat \beta$ satisfies
> \[
> \left( (N-2) \hat \Sigma + \frac{N_1 N_2}{N} \hat \Sigma_B \right) \beta = N (\hat \mu_2 - \hat \mu_1 )
> \] where $\hat \Sigma_B = (\hat \mu_2 - \hat \mu_1) (\hat \mu_2 - \hat \mu_1)^T$.
> 1.  Hence show that $\hat \Sigma_B \beta$ is in the direction $(\hat \mu_2 - \hat \mu_1)$, and thus \[
> \hat \beta \propto \hat \Sigma^{-1}(\hat \mu_2 - \hat \mu_1)
> \] and therefore the least squares regression coefficient is identical to the LDA coefficient, up to a scalar multiple.
> 1.  Show that this holds for any (distinct) coding of the two classes.
> 1.  Find the solution $\hat \beta_0$, and hence the predicted values $\hat \beta_0 + \hat \beta^T x$.  Consider the following rule: classify to class 2 if $\hat y_i > 0$ and class 1 otherwise.  Show that this is not the same as the LDA rule unless the classes have equal numbers of observations.


#### Proof

We use the notation of Chapter 4.


1.  Since in the two class case, we classify to class 2 if $\delta_1(x) < \delta_2(x)$.  Substituting this into our equation for the Linear discriminant functions, we have \begin{align}
\delta_1(x) &< \delta_2(x) \\\\
x^T \hat \Sigma^{-1} (\hat \mu_2 - \hat \mu_1) &> \frac{1}{2} \hat \mu_2^T \hat \Sigma^{-1} \hat \mu_2 - \frac{1}{2} \hat \mu_1^T \hat \Sigma^{-1} \hat \mu_1 + \log \frac{N_1}{N} - \log \frac{N_2}{N}
\end{align}
as required.
1.  Let $U_i$ be the $n$ element vector with $j$-th element $1$ if the $j$-th observation is class $i$, and zero otherwise.  Then we can write our target vector $Y$ as $t_1 U_1 + t_2 U_2$, where $t_i$ are our target labels, and we have $\mathbf{1} = U_1 + U_2$.  Note that we can write our estimates $\hat \mu_1, \hat \mu_2$ as $X^T U_i = N_i \hat \mu_i$, and that $X^T Y = t_1 N_1 \hat \mu_1 + t_2 N_2 \hat \mu_2$.
By the least squares criterion, we can write \[
RSS = \sum_{i=1}^{N} (y_i - \beta_0 - \beta^T X)^2 = (Y - \beta_0 \mathbf{1} - X \beta)^T (Y - \beta_0 \mathbf{1} - X\beta)
\] Minimizing this with respect to $\beta$ and $\beta_0$, we obtain \begin{align} 2 X^T X \beta - 2X^T Y + 2 \beta_0 X^T \mathbf{1} &= 0 \\\\ 2N \beta_0 - 2 \mathbf{1}^T (Y - X \beta) &= 0. \end{align}
These equations can be solved for $\beta_0$ and $\beta$ by substitution as \begin{align} \hat \beta_0 &= \frac{1}{N} \mathbf{1}^T (Y - X\beta) \\\\
\left(X^T X - \frac{1}{N}X^T \mathbf{1} \mathbf{1}^T X\right) \hat \beta &= X^T Y - \frac{1}{N} X^T \mathbf{1} \mathbf{1}^T Y
\end{align}
The RHS can be written as \begin{align}
X^T Y - \frac{1}{N} X^T \mathbf{1} \mathbf{1}^T Y &= t_1 N_1 \hat \mu_1 + t_2 N_2 \hat \mu_2 - \frac{1}{N} (N_1 \hat \mu_1 + N_2 \hat \mu_2)(t_1 N_1 + t_2 N_2) \\\\
&= \frac{N_1 N_2}{N} (t_1 - t_2) (\hat \mu_1 - \hat \mu_2)
\end{align} where we use our relations for $X^T U_i$ and the fact that $\mathbf{1} = U_1 + U_2$.

  Similarly, the bracketed term on the LHS of our expression for $\beta$ can be rewritten as \begin{align}
X^T X = (N-2) \hat \Sigma + N_1 \hat \mu_1 \hat \mu_1^T + N_2 \hat \mu_2 \hat \mu_2^T,
\end{align} and by substituting in the above and the definition of $\hat \Sigma_B$, we can write \begin{align}
X^T X - \frac{1}{N}X^T \mathbf{1} \mathbf{1}^T X &= (N-2) \hat \Sigma + \frac{N_1 N_2}{N} \hat \Sigma_B
\end{align} as required.
Putting this together, we obtain our required result, \[
\left( (N-2) \hat \Sigma + \frac{N_1 N_2}{N} \hat \Sigma_B \right) \hat \beta = \frac{N_1 N_2}{N} (t_1 - t_2)(\hat \mu_1 - \hat \mu_2),
\]
and then substituting $t_1 = -N/N_1, t_2 = N/N_2$, we obtain our required result, \[
\left( (N-2) \hat \Sigma + \frac{N_1 N_2}{N} \hat \Sigma_B \right) \hat \beta = N(\hat \mu_2 - \hat \mu_1)
\]
1.  All that is required is to show that $\hat \Sigma_B \beta$ is in the direction of $(\hat \mu_2 - \hat \mu_1)$.  This is clear from the fact that \[
\hat \Sigma_B \hat \beta = (\hat \mu_2 - \hat \mu_1)(\hat \mu_2 - \hat \mu_1)^T \hat \beta = \lambda (\hat \mu_2 - \hat \mu_1)
\] for some $\lambda \in \mathbb{R}$.  Since $\hat \Sigma \hat \beta$ is a linear combination of terms in the direction of $(\hat \mu_2 - \hat \mu_1)$, we can write \[
\hat \beta \propto \hat \Sigma^{-1} (\hat \mu_2 - \hat \mu_1)
\] as required.
1.  Since our $t_1, t_2$ were arbitrary and distinct, the result follows.
1.  From above, we can write \begin{align}
\hat \beta_0 &= \frac{1}{N} \mathbf{1}^T (Y - X \hat \beta) \\\\
&= \frac{1}{N}(t_1 N_1 + t_2 N_2)  - \frac{1}{N} \mathbf{1}{^T} X \hat \beta \\\\
&= -\frac{1}{N}(N_1 \hat \mu_1^T + N_2 \hat \mu_2^T) \hat \beta.
\end{align}
We can then write our predicted value $\hat f(x) = \hat \beta_0 + \hat \beta^T x$ as \begin{align}
\hat f(x) &= \frac{1}{N}\left( N x^T - N_1 \hat \mu_1^T - N_2 \hat \mu_2^T \right) \hat \beta \\\\
&=  \frac{1}{N}\left( N x^T - N_1 \hat \mu_1^T - N_2 \hat \mu_2^T \right) \lambda \hat \Sigma^{-1} (\hat \mu_2 - \hat \mu_1)
\end{align} for some $\lambda \in \mathbb{R}$, and so our classification rule is $\hat f(x) > 0$, or equivalently, \begin{align}
N x^T \lambda \hat \Sigma^{-1} (\hat \mu_2 - \hat \mu_1) > (N_1 \hat \mu_1^T + N_2 \hat \mu_2^T) \lambda \hat \Sigma^{-1}(\hat \mu_2 - \hat \mu_1) \\\\
x^T \hat \Sigma^{-1} (\hat \mu_2 - \hat \mu_1) > \frac{1}{N} \left( N_1 \hat \mu^T_1 + N_2 \hat \mu_2^T \right) \hat \Sigma^{-1} (\hat \mu_2 - \hat \mu_1)
\end{align} which is different to the LDA decision rule unless $N_1 = N_2$.


#### Exercise 4.3

> Suppose that we transform the original predictors $X$ to $\hat Y$ by taking the predicted values under linear regression.  Show that LDA using $\hat Y$ is identical to using LDA in the original space.


#### Exercise 4.4

> Consier the multilogit model with $K$ classes.  Let $\beta$ be the $(p+1)(K-1)$-vector consisting of all the coefficients.  Define a suitable enlarged version of the input vector $x$ to accommodate this vectorized coefficient matrix.  Derive the Newton-Raphson algorithm for maximizing the multinomial log-likelihood, and describe how you would implement the algorithm.


#### Exercise 4.5

> Consider a two-class regression problem with $x \in \mathbb{R}$.  Characterise the MLE of the slope and intercept parameter if the sample $x_i$ for the two classes are separated by a point $x_0 \in \mathbb{R}$.  Generalise this result to $x \in \mathbb{R}^p$ and more than two classes.


#### Exercise 4.6

> Suppose that we have $N$ points $x_i \in \mathbb{R}^p$ in general position, with class labels $y_i \in \{-1, 1 \}$.  Prove that the perceptron learning algorithm converges to a separating hyperplane in a finite number of steps.
> 
> 
> 1.  Denote a hyperplane by $f(x) = \beta^T x^\star = 0$.  Let $z_i = \frac{x_i^\star}{\\\| x_i^\star \\\|}$.  Show that separability implies the existence of a $\beta_{\text{sep}}$ such that $y_i \beta_{\text{sep}}^T z_i \geq 1$ for all $i$.
> 1.  Given a current $\beta_{\text{old}}$, the perceptron algorithm identifies a pint $z_i$ that is misclassified, and produces the update $\beta_{\text{new}} \leftarrow \beta_{\text{old}} + y_i z_i$.  Show that
> \[
> \\\| \beta_{\text{new}} - \beta_{\text{sep}} \\\|^2 \leq \\\| \beta_{\text{old}} - \beta_{\text{sep}} \\\|^2 - 1
> \] and hence that the algorithm converges to a separating hyperplane in no more than $\\\| \beta_{\text{start}} - \beta_{\text{sep}} \\\|^2$ steps.


#### Proof

Recall that the definition of separability implies the existence of a separating hyperplane - that is, a vector $\beta_\text{sep}$ such that $\text{sgn}\left( \beta^T_\text{sep} x^\star_i \right) = y_i$.


1.  By assumption, there exists $\epsilon > 0$ and $\beta_\text{sep}$ such that \[
y_i \beta^T_\text{sep} z^\star_i \geq \epsilon
\] for all $i$.  Then the hyperplane $\frac{1}{\epsilon} \beta_\text{sep}$ is a separating hyperplane that by linearity satisfies the constraint \[
y_i \beta^T_\text{sep} z^\star_i \geq 1.
\]
1.  We have \begin{align}
\\\| \beta_\text{new} - \beta_\text{sep} \\\|^2 &= \\\| \beta_\text{new} \\\|^2 + \\\| \beta_\text{sep} \\\|^2 - 2 \beta_\text{sep}^T \beta_\text{new} \\\\
&= \\\| \beta_\text{old} + y_i z_i \\\|^2 + \\\| \beta_\text{sep} \\\|^2 - 2 \beta_\text{sep}^T \left( \beta_\text{old} + y_i z_i \right) \\\\
&= \\\| \beta_\text{old} \\\|^2 + \\\| y_i z_i \\\|^2 + 2 y_i \beta_\text{old}^T z_i + \\\| \beta_\text{sep} \\\|^2 - 2 \beta_\text{sep}^T \beta_0 - 2 y_i \beta^T_\text{sep} z_i \\\\
&\leq \\\| \beta_\text{old} \\\|^2 + \\\| \beta_\text{sep} \\\|^2 - 2 \beta_\text{sep}^T \beta_\text{old} + 1 - 2 \\\\
&= \\\| \beta_\text{old} - \beta_\text{sep} \\\|^2 - 1.
\end{align} Let $\beta_k, k = 0, 1, 2, \dots$ be the sequence of iterates formed by this procedure, with $\beta_0 = \beta_\text{start}$. Let $k^\star = \left\lceil \\\| \beta_\text{start} - \beta_\text{sep} \\\|^2 \right\rceil$.
Then by the above result, we must have $\\\| \beta_{k^\star} - \beta_\text{sep} \\\|^2 = 0$, and by properties of the norm we have that $\beta_{k^\star} = \beta_\text{sep}$, and so we have reached a separating hyperplane in no more than $k^\star$ steps.