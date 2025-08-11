export type ThresholdRule = {
  operator: string;
  value: number;
  color: string;
};

export type ThresholdState = {
  field: string;
  rules: ThresholdRule[];
};
