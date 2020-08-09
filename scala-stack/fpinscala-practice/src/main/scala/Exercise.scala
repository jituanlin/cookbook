package exercise

import java.util.regex.{Pattern, PatternSyntaxException}


object answer {
  def sequence[A](xs: List[Option[A]]): Option[List[A]] = xs.foldLeft(Option(List[A]()))(
    (optXs, optX) => for {
      xs <- optXs
      x <- optX
    } yield xs.appended(x)
  )
}
