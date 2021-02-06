package exercise.spec

import org.scalatest.flatspec.AnyFlatSpec
import exercise.answer.{empty, Stream}


class ExerciseSpec extends AnyFlatSpec {
  "basic functionality" should "work" in {
    val s = Stream(1, 2, 3)
    assert(s.forAll(n => n > 0))
    assert(!s.forAll(n => n > 1))
  }
}
