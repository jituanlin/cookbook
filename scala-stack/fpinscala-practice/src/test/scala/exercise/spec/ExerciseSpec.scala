package exercise.spec

import org.scalatest.flatspec.AnyFlatSpec
import exercise.answer.{Empty, Stream}


class ExerciseSpec extends AnyFlatSpec {
  "basic functionality" should "work" in {
    val s = Stream(1, 2, 3)
    assert(s.map(_ + 1).toList.equals(List(2, 3, 4)))
    assert(s.filter(_ % 2 == 0).toList.equals(List(2)))
    assert(s.append(Stream(4, 5, 6)).toList.equals(List(1, 2, 3, 4, 5, 6)))
    assert(s.flatMap(n => Stream(n, n)).toList.equals(List(1, 1, 2, 2, 3, 3)))
  }
}
