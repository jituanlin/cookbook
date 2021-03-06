package exercise.spec

import exercise.answer.Stream.{constant, from, unfold}
import org.scalatest.flatspec.AnyFlatSpec
import exercise.answer.{Empty, Stream}


class ExerciseSpec extends AnyFlatSpec {
  "basic functionality" should "work" in {
    val s = Stream(1,2,3)
    assert(s.tails.toList(0).toList.equals(List(1,2,3)))
    assert(s.tails.toList(1).toList.equals(List(2,3)))
    assert(s.tails.toList(3).toList.equals(List.empty))
  }
}
