package exercise413

trait Option[+A] {
  def map[B](f: A => B): Option[B]
  def flatMap[B](f: A => Option[B]): Option[B]
  def getOrElse[B >: A](default: => B): B
  def orElse[B >: A](ob: => Option[B]): Option[B]
  def filter(f: A => Boolean): Option[A]
}

case class Some[+A](value: A) extends Option[A] {
  def map[B](f: A => B): Option[B] = new Some(f(value))
  def flatMap[B](f: A => Option[B]): Option[B] = f(value)
  def getOrElse[B >: A](default: => B): B = value
  def orElse[B >: A](ob: => Option[B]): Option[B] = this
  def filter(f: A => Boolean): Option[A] = if (f(value)) this else new None()
}

case class None[+A]() extends Option[A] {
  def map[B](f: A => B): Option[B] = new None()
  def flatMap[B](f: A => Option[B]): Option[B] = new None[B]()
  def getOrElse[B >: A](default: => B): B = default
  def orElse[B >: A](ob: => Option[B]): Option[B] = ob
  def filter(f: A => Boolean): Option[A] = new None[A]()
}
