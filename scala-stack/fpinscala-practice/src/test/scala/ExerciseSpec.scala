package ExercisetSpec

import org.scalatest.flatspec.AnyFlatSpec
import exercise.answer


class ExercisetSpec extends AnyFlatSpec {
  "basic functionality" should "work" in {
    val isMatchedOpt = answer.bothMatch2("[ab]", "[bc]", "b")
    for {
      isMatched <- isMatchedOpt
    } assert(isMatched)
  }
}
