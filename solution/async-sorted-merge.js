/**
 * AsycSortedMerge - Utilize priority queue to stored the records Asycsly
 * @params
 * logSource - array of log sources
 * printer - printer instance
 */

"use strict";
const PriorityQueue = require("../lib/priority-queue");

//add all the records to the queue using promise
async function addItemsQueue(logSources, queue) {
  await Promise.all(
    logSources.map(async (logSource, index) => {
      const log = await logSource.popAsync();
      if (log) {
        queue.add({ ...log, sourceIndex: index });
      }
    })
  );
}


module.exports = async (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    const queue = new PriorityQueue();
    
    await addItemsQueue(logSources, queue);

    // print the records till queue is Empty
    while (!queue.isEmpty()) {

      const { date, msg, sourceIndex } = queue.pop();

      // print
      printer.print({ date, msg });

      const nextLog = await logSources[sourceIndex].popAsync();
      // add to queue if there are more records to process
      if (nextLog) {
        queue.add({ ...nextLog, sourceIndex: log.sourceIndex });
      }
    }

    // exit printer
    printer.done();
  });
};
