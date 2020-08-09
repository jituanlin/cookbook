package exercise413test

import org.scalatest.flatspec.AnyFlatSpec
import exercise413.option


class Exercise431tSpec extends AnyFlatSpec {
  "basic functionality" should "work" in {
    val isMatchedOpt = option.bothMatch2("[ab]", "[bc]", "b")
    for {
      isMatched <- isMatchedOpt
    } assert(isMatched)
  }
}
