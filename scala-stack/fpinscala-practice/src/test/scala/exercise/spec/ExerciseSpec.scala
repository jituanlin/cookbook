package exercise.spec

import exercise.answer.Stream.{constant, from, unfold}
import org.scalatest.flatspec.AnyFlatSpec
import exercise.answer.{Empty, Stream}


class ExerciseSpec extends AnyFlatSpec {
  "basic functionality" should "work" in {
    val ones = unfold(1)((_) => Some((1, 1)))
    assert(ones.take(3).toList.equals(List(1, 1, 1)))
    assert(constant(1).take(3).toList.equals(List(1, 1, 1)))
    assert(from(1).take(3).toList.equals(List(1, 2, 3)))
  }
}
