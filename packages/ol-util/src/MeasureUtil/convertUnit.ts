import type { Area, Length } from 'convert';
import { convert } from 'convert';

export const convertArea = (
  value: number,
  from: Area,
  to?: Area,
): {
  val: number;
  unit: string;
} => {
  if (!to) {
    const result = convert(value, from).to('best');
    return {
      val: result.quantity,
      unit: result.unit,
    };
  }

  return {
    val: convert(value, from).to(to),
    unit: to,
  };
};

export const convertLength = (
  value: number,
  from: Length,
  to?: Length,
): {
  val: number;
  unit: string;
} => {
  if (!to) {
    const result = convert(value, from).to('best');
    return {
      val: result.quantity,
      unit: result.unit,
    };
  }

  return {
    val: convert(value, from).to(to),
    unit: to,
  };
};
