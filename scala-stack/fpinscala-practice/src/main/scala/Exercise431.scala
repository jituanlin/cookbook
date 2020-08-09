package exercise413

import java.util.regex.{Pattern, PatternSyntaxException}


object option {
  def map2[A, B, C](oa: Option[A], ob: Option[B])(ab2c: (A, B) => C) = for {
    a <- oa
    b <- ob
  } yield ab2c(a, b)

  def pattern(ps: String): Option[Pattern] = {
    try {
      Some(Pattern.compile(ps))
    } catch {
      case e: PatternSyntaxException => None
    }
  }

  def bothMatch(pa: Pattern, pb: Pattern, s: String): Boolean = pa.matcher(s).matches() && pb.matcher(s).matches()

  def bothMatch2(psa: String, psb: String, s: String): Option[Boolean] = map2(pattern(psa), pattern(psb))((pa, pb) => bothMatch(pa, pb, s))
}
