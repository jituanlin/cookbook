import * as R from 'ramda';
const leftJoin = R.curry(
  <LeftRecord, RightRecord, ResultRecord>(
    predicate: (a: LeftRecord, b: RightRecord) => boolean,
    combine: (a: LeftRecord, b: RightRecord | null) => ResultRecord,
    leftRecords: LeftRecord[],
    rightRecords: RightRecord[]
  ) =>
    R.map(
      (leftRecord: LeftRecord) =>
        combine(
          leftRecord,
          R.defaultTo(
            null,
            R.find(R.partial(predicate, [leftRecord]), rightRecords)
          )
        ),
      leftRecords
    )
);

export default leftJoin;