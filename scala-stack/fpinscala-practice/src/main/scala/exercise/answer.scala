package exercise

import exercise.answer.Stream.cons

object answer {

  case object empty extends Stream[Nothing]

  case class Cons[+A](h: () => A, t: () => Stream[A]) extends Stream[A]

  trait Stream[+A] {
    def take(n: Int): Stream[A] = this match {
      case Cons(h, t) if n > 1 => cons(h(), t().take(n - 1))
      case Cons(h, _) => Stream(h())
      case _ => empty
    }

    def toList: List[A] = this match {
      case Cons(h, t) => h() :: t().toList
      case _ => List()
    }

    def takeWhile(p: A => Boolean): Stream[A] = this match {
      case Cons(h, t) if p(h()) => cons(h(), t().takeWhile(p))
      case _ => empty
    }

    def foldRight[B](z: => B)(f: (A, => B) => B): B = // The arrow `=>` in front of the argument type `B` means that the function `f` takes its second argument by name and may choose not to evaluate it.
      this match {
        case Cons(h, t) => f(h(), t().foldRight(z)(f)) // If `f` doesn't evaluate its second argument, the recursion never occurs.
        case _ => z
      }

    def forAll(p: A => Boolean): Boolean = foldRight(true)((a, acc) => acc && p(a))
  }

  object Stream {
    def cons[A](hd: => A, tl: => Stream[A]): Stream[A] = {
      lazy val head = hd
      lazy val tail = tl
      Cons(() => head, () => tail)
    }

    def apply[A](as: A*): Stream[A] =
      if (as.isEmpty) empty
      else cons(as.head, apply(as.tail: _*))
  }

}
