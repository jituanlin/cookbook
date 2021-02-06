package exercise

import exercise.answer.Stream.{cons, empty}

object answer {

  case object Empty extends Stream[Nothing]

  case class Cons[+A](h: () => A, t: () => Stream[A]) extends Stream[A]

  trait Stream[+A] {

    def take(n: Int): Stream[A] = this match {
      case Cons(h, t) if n > 1 => cons(h(), t().take(n - 1))
      case Cons(h, _) => Stream(h())
      case _ => Stream.empty
    }

    def toList: List[A] = this match {
      case Cons(h, t) => h() :: t().toList
      case _ => List()
    }

    def takeWhile(p: A => Boolean): Stream[A] = foldRight(Stream.empty[A])(
      (h, t) => if (p(h)) cons(h, t) else Stream.empty
    )

    def foldRight[B](z: => B)(f: (A, => B) => B): B = // The arrow `=>` in front of the argument type `B` means that the function `f` takes its second argument by name and may choose not to evaluate it.
      this match {
        case Cons(h, t) => f(h(), t().foldRight(z)(f)) // If `f` doesn't evaluate its second argument, the recursion never occurs.
        case _ => z
      }

    def forAll(p: A => Boolean): Boolean = foldRight(true)((a, acc) => acc && p(a))

    def map[B](f: A => B): Stream[B] = foldRight(empty[B])((a, bs) => cons(f(a), bs))

    def filter(p: A => Boolean): Stream[A] = foldRight(empty[A])((a, bs) => if (p(a)) cons(a, bs) else bs)

    def append[B >: A](s: => Stream[B]): Stream[B] = foldRight(s)((a, bs) => cons(a, bs))

    def flatMap[B](f: A => Stream[B]): Stream[B] = foldRight(empty[B])((a, bs) => f(a) append bs)


  }

  object Stream {
    def empty[A]: Stream[A] = Empty

    def cons[A](hd: => A, tl: => Stream[A]): Stream[A] = {
      lazy val head = hd
      lazy val tail = tl
      Cons(() => head, () => tail)
    }

    def apply[A](as: A*): Stream[A] =
      if (as.isEmpty) Empty
      else cons(as.head, apply(as.tail: _*))

    def constant[A](a: A): Stream[A] = cons(a, constant(a))

    def from(n: Int): Stream[Int] = cons(n, from(n + 1))
  }

}
