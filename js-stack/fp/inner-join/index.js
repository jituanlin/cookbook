const innerJoin = ({predicate, mergeBy}, recordsA, recordsB) =>
  recordsA.reduce((result, recordInA) => {
    const matchedRecordInB = recordsB.find(recordInB =>
      predicate(recordInA, recordInB)
    );
    if (matchedRecordInB) {
      result.push(mergeBy(recordInA, matchedRecordInB));
      return result;
    }

    return result;
  }, []);
