package exercise

import scala.{Option => _, Either => _, _}

object answer {

  sealed trait Either[+E, +A] {

    def map[B](f: A => B): Either[E, B]

    def flatMap[EE >: E, B](f: A => Either[EE, B]): Either[EE, B]

    def orElse[EE >: E, B >: A](b: => Either[EE, B]): Either[EE, B]

    def map2[EE >: E, B, C](b: Either[EE, B])(f: (A, B) => C): Either[EE, C]
  }

  case class Left[+E](error: E) extends Either[E, Nothing] {
    override def map[B](f: Nothing => B): Either[E, B] = this

    override def flatMap[EE >: E, B](f: Nothing => Either[EE, B]): Either[EE, B] = this

    override def orElse[EE >: E, B >: Nothing](b: => Either[EE, B]): Either[EE, B] = b

    override def map2[EE >: E, B, C](b: Either[EE, B])(f: (Nothing, B) => C): Either[EE, C] = this
  }

  case class Right[+A](value: A) extends Either[Nothing, A] {
    override def map[B](f: A => B): Either[Nothing, B] = Right(f(value))

    override def flatMap[EE >: Nothing, B](f: A => Either[EE, B]): Either[EE, B] = f(value)

    override def orElse[EE >: Nothing, B >: A](b: => Either[EE, B]): Either[EE, B] = this

    override def map2[EE >: Nothing, B, C](b: Either[EE, B])(f: (A, B) => C): Either[EE, C] =
      for {
        valueB <- b
        valueThis <- this
      } yield f(valueThis, valueB)
  }

}
