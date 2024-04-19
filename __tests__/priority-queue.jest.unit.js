const PriorityQueue = require("../lib/priority-queue");

describe("Priority Queue Behaviors", () => {


  const unSortedListDates = [
    { date: new Date('2024-04-19T12:00:00'), message: 'Message 3' },
    { date: new Date('2024-04-20T12:00:00'), message: 'Message 1' },
    { date: new Date('2024-04-21T12:00:00'), message: 'Message 2' },
  ];

  const sortedListDates = [
    { date: new Date('2024-04-19T12:00:00'), message: 'Message 3' },
    { date: new Date('2024-04-20T12:00:00'), message: 'Message 1' },
    { date: new Date('2024-04-21T12:00:00'), message: 'Message 2' },
  ];

  const popedSortedList = [
    { date: new Date('2024-04-20T12:00:00'), message: 'Message 1' },
    { date: new Date('2024-04-21T12:00:00'), message: 'Message 2' },
  ];

  let priorityQueue;

  beforeEach(() => {
    priorityQueue = new PriorityQueue();
  })

  test("add records, check sorted array", () => {
    unSortedListDates.forEach(record => {
      priorityQueue.add(record);
    })
    expect(priorityQueue.queue).toEqual(sortedListDates);
  });

  test("add records, empty record", () => {
    unSortedListDates.forEach(record => {
      priorityQueue.add({});
    })
    expect(priorityQueue.getSize()).toBe(3);
  });

  test("add records, null records", () => {
    unSortedListDates.forEach(record => {
      priorityQueue.add(null);
    })
    expect(priorityQueue.queue).toEqual([]);
  });


  test('popping elements from the queue', () => {
    unSortedListDates.forEach(record => {
      priorityQueue.add(record);
    })
    expect(priorityQueue.pop()).toEqual(sortedListDates[0]);
    expect(priorityQueue.queue).toEqual(popedSortedList);

    expect(priorityQueue.pop()).toEqual(sortedListDates[1]);
    expect(priorityQueue.pop()).toEqual(sortedListDates[2]);
    expect(priorityQueue.pop()).toBeUndefined();
  });

  test('popping elements from the queue; deal with null', () => {
    unSortedListDates.forEach(record => {
      priorityQueue.add(null);
    })
    expect(priorityQueue.pop()).toBeUndefined();
    expect(priorityQueue.queue).toEqual([]);
  });

  test('popping elements from the queue; deal with empty', () => {
    unSortedListDates.forEach(record => {
      priorityQueue.add({});
    })
    expect(priorityQueue.pop()).toEqual({});
  });

  test('checking if priority queue is empty', () => {
    expect(priorityQueue.isEmpty()).toBe(true);

    priorityQueue.add(sortedListDates[0]);
    expect(priorityQueue.isEmpty()).toBe(false);

    priorityQueue.pop();
    expect(priorityQueue.isEmpty()).toBe(true);
  });

  test('checking if priority queue is empty; null values', () => {
    priorityQueue.add(null);
    expect(priorityQueue.isEmpty()).toBe(true);
  });

  test('checking if priority queue is empty; empty values values', () => {
    priorityQueue.add({});
    expect(priorityQueue.isEmpty()).toBe(false);
    priorityQueue.pop();
    expect(priorityQueue.isEmpty()).toBe(true);
  });

});
