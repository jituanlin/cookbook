package exercise.spec

import exercise.answer.Stream.{constant, unfold}
import org.scalatest.flatspec.AnyFlatSpec
import exercise.answer.{Empty, Stream}


class ExerciseSpec extends AnyFlatSpec {
  "basic functionality" should "work" in {
    val fib = unfold((0, 1))({
      case (a, b) => Some(a, (b, a + b))
    })

    assert(fib.take(7).toList.equals(List(0, 1, 1, 2, 3, 5, 8)))
  }
}
