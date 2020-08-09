package ExercisetSpec

import org.scalatest.flatspec.AnyFlatSpec
import exercise.answer


class ExerciseSpec extends AnyFlatSpec {
  "basic functionality" should "work" in {
    val someXs = answer.sequence(List[Option[Number]](Some(1), Some(2), Some(3)))
    for {
      xs <- someXs
    } assert(xs.size === 3)

    val noneXs = answer.sequence(List[Option[Number]](Some(1), None))
    assert(noneXs === None)
  }
}
