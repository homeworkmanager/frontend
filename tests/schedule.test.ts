import { SEM_START } from '@/utils/constants/dates';
import { calculateWeek } from '@/utils/helpers/calculateWeek';
import { scheduleDaysGenerate } from '@/utils/services/scheduleDays/generate';
import { scheduleMatrixFindIndexes } from '@/utils/services/scheduleMatrix/findIndexes';
import { scheduleMatrixCreate } from '@/utils/services/scheduleMatrix/generate';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../constants/dates', () => ({
  SEM_START: SEM_START
}));

describe('calculateWeek', () => {
  it('возвращает 1 для стартовой даты', () => {
    expect(calculateWeek({ year: 2025, month: 9, day: 1 })).toBe(1);
  });

  it('возвращает 2 для даты через неделю', () => {
    expect(calculateWeek({ year: 2025, month: 9, day: 8 })).toBe(2);
  });

  it('корректно считает дату через несколько недель', () => {
    expect(calculateWeek({ year: 2025, month: 9, day: 29 })).toBe(5);
  });

  it('работает с датой до начала семестра (отрицательные недели)', () => {
    expect(calculateWeek({ year: 2025, month: 8, day: 25 })).toBe(0);
  });
});

describe('scheduleDaysGenerate', () => {
  it('генерирует 3 дня подряд внутри месяца', () => {
    const result = scheduleDaysGenerate({
      currentYear: 2024,
      currentMonthIndex: 1,
      currentDayIndex: 1,
      daysCount: 3
    });

    expect(result).toEqual([
      { year: 2024, month: 1, day: 1, lessons: [] },
      { year: 2024, month: 1, day: 2, lessons: [] },
      { year: 2024, month: 1, day: 3, lessons: [] }
    ]);
  });

  it('корректно переходит на следующий месяц', () => {
    const result = scheduleDaysGenerate({
      currentYear: 2024,
      currentMonthIndex: 1,
      currentDayIndex: 30,
      daysCount: 5
    });

    expect(result[0]).toMatchObject({ month: 1, day: 30 });
    expect(result[1]).toMatchObject({ month: 1, day: 31 });
    expect(result[2]).toMatchObject({ month: 2, day: 1 });
  });
});

describe('scheduleMatrixFindIndexes', () => {
  const daysByMonth = [
    [
      { year: 2024, month: 1, day: 1 },
      { year: 2024, month: 1, day: 2 }
    ],
    [
      { year: 2024, month: 1, day: 3 },
      { year: 2024, month: 1, day: 4 }
    ]
  ];

  it('возвращает индексы, если дата найдена', () => {
    expect(scheduleMatrixFindIndexes({ year: 2024, month: 1, day: 4 }, daysByMonth)).toEqual([1, 1]);
  });

  it('возвращает [-1, -1], если даты нет', () => {
    expect(scheduleMatrixFindIndexes({ year: 2024, month: 2, day: 1 }, daysByMonth)).toEqual([-1, -1]);
  });
});

describe('scheduleMatrixCreate', () => {
  it('разбивает массив по slideSize', () => {
    const values = [
      { year: 2024, month: 1, day: 1, lessons: [] },
      { year: 2024, month: 1, day: 2, lessons: [] },
      { year: 2024, month: 1, day: 3, lessons: [] },
      { year: 2024, month: 1, day: 4, lessons: [] }
    ];

    const result = scheduleMatrixCreate(values, 2);

    expect(result).toEqual([
      [
        { year: 2024, month: 1, day: 1, lessons: [] },
        { year: 2024, month: 1, day: 2, lessons: [] }
      ],
      [
        { year: 2024, month: 1, day: 3, lessons: [] },
        { year: 2024, month: 1, day: 4, lessons: [] }
      ]
    ]);
  });

  it('последний блок может быть неполным', () => {
    const values = [
      { year: 2024, month: 1, day: 1, lessons: [] },
      { year: 2024, month: 1, day: 2, lessons: [] },
      { year: 2024, month: 1, day: 3, lessons: [] }
    ];

    const result = scheduleMatrixCreate(values, 2);

    expect(result[1]).toEqual([{ year: 2024, month: 1, day: 3, lessons: [] }]);
  });
});
