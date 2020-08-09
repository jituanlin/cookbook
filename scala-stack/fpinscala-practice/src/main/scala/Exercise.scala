package exercise

import java.util.regex.{Pattern, PatternSyntaxException}


object answer {
  def traver[A](xs: List[A])(f: A => Option[A]): Option[List[A]] = xs.foldLeft(Option(List[A]()))(
    (optXs, x) => for {
      xs <- optXs
      r <- f(x)
    } yield xs.appended(r)
  )
}
