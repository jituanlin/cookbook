package exercise.spec

import exercise.answer.Stream.constant
import org.scalatest.flatspec.AnyFlatSpec
import exercise.answer.{Empty, Stream}


class ExerciseSpec extends AnyFlatSpec {
  "basic functionality" should "work" in {
    val s = Stream(1, 2, 3)
    assert(Stream.from(2).take(2).toList.equals(List(2, 3)))
  }
}
