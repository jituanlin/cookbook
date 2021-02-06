package exercise.spec

import exercise.answer.Stream.constant
import org.scalatest.flatspec.AnyFlatSpec
import exercise.answer.{Empty, Stream}


class ExerciseSpec extends AnyFlatSpec {
  "basic functionality" should "work" in {
    val s = Stream(1, 2, 3)
    assert(constant(1).take(2).toList.equals(List(1,1)))
  }
}
