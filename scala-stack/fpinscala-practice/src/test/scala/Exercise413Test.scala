package exercise413test

import org.scalatest.flatspec.AnyFlatSpec
import exercise413.{Some, Option, None}

class Exercise431tSpec extends AnyFlatSpec {
  "Option" should "support map operation" in {
    println("run test 1")
    val someA = new Some(1)
    val someB = someA.map(value => value + 1)
    assert(someB.getOrElse(3) === 2)
  }
}
