import type { Area, Length } from 'convert';
import { convert } from 'convert';

const PY_TO_M2 = 3.305785124;

export const convertArea = (
  value: number,
  from: Area | 'py',
  to?: Area | 'py',
): {
  val: number;
  unit: string;
} => {
  // 평 단위 처리
  if (from === 'py') {
    value = value * PY_TO_M2;
    from = 'm2';
  }

  if (!to) {
    const result = convert(value, from).to('best');
    return {
      val: result.quantity,
      unit: result.unit,
    };
  }

  if (to === 'py') {
    const result = convert(value, from).to('m2');
    return { val: result / PY_TO_M2, unit: 'py' };
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
