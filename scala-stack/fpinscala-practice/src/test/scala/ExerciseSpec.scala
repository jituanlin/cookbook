package ExercisetSpec

import org.scalatest.flatspec.AnyFlatSpec
import exercise.answer


class ExerciseSpec extends AnyFlatSpec {
  "basic functionality" should "work" in {
    val someXs = answer.traver(List(1, 2, 3))(n => if (n > 0) Some(n) else None)
    for {
      xs <- someXs
    } assert(xs.size === 3 && xs.head === 1)

    val noneXs = answer.traver(List(1, 2, -3))(n => if (n > 0) Some(n) else None)
    assert(noneXs === None)
  }
}
