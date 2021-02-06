package exercise.spec

import org.scalatest.flatspec.AnyFlatSpec
import exercise.answer.{empty, Stream}


class ExerciseSpec extends AnyFlatSpec {
  "basic functionality" should "work" in {
    val s = Stream(1, 2, 3)
    assert(s.takeWhile(n => n < 3).toList.equals(List(1, 2)))
  }
}
