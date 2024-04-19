/**
 * Implement Priority Queue for the sorting and fetching the records
 * Sync add those records to the queue and print the logs till the queue is Empty
 * @params
 * logSource - array of log sources
 * printer - printer instance
 */
"use strict";
const PriorityQueue = require("../lib/priority-queue");


module.exports = (logSources, printer) => {
  // Initialize a priority queue
  const queue = new PriorityQueue();
  
  // load the queue with records
  logSources.forEach((logSource, index) => {
    const log = logSource.pop();
    if (log) queue.add({ ...log, sourceIndex: index });
  });

  // loop till queue is not empty
  while (!queue.isEmpty()) {
    // get the oldest record
    const { date, msg, sourceIndex } = queue.pop();
    printer.print({date, msg});
    const nextLogEntry = logSources[sourceIndex].pop();
    // if there are more records 
    if (nextLogEntry) {
      queue.add({ ...nextLogEntry, sourceIndex });
    }
  }
  // exit printer
  printer.done();
};
