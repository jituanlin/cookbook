package exercise.spec

import org.scalatest.flatspec.AnyFlatSpec


class ExerciseSpec extends AnyFlatSpec {
  "basic functionality" should "work" in {
    val inc = (a: Int) => a + 1
    val left2 = Left(1).map(inc)
    val right2 = Right(1).map(inc)
    left2 match {
      case Left(n) => assert(n === 1)
    }
    right2.map(v2 => assert(v2 === 2))


  }
}
