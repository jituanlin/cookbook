package exercise.spec

import org.scalatest.flatspec.AnyFlatSpec
import exercise.answer.{empty, Stream}


class ExerciseSpec extends AnyFlatSpec {
  "basic functionality" should "work" in {
    val s = Stream(1, 2, 3)
    assert(s.take(1).toList.equals(List(1)))
    assert(s.take(4).toList.equals(List(1, 2, 3)))
    assert(empty.take(4).toList.equals(List.empty))
  }
}
