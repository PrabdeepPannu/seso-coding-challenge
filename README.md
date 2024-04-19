<img align="left" width="100px" height="100px" src="/assets/seso-eng-logo.png">

# Seso Engineering | Challenge: Log Sorting

<br>

## Instructions

We have a number of [**log sources**](https://github.com/sesolabor/coding-challenge/blob/master/lib/log-source.js). Each log source contains N log entries. Each entry is a javascript object with a timestamp and message. We don't know the number of log entries each source contains - however - we do know that the entries within each source are sorted 🕒 **chronologically** 🕒.

### The Objectives:

1. **_Drain all of the log sources_** for both the synchronous and asynchronous solutions.
   - [Synchronous](https://github.com/sesolabor/coding-challenge/blob/31313e303c53cebb96fa02f3aab473dd011e1d16/lib/log-source.js#L37)
   - [Asynchronous](https://github.com/sesolabor/coding-challenge/blob/31313e303c53cebb96fa02f3aab473dd011e1d16/lib/log-source.js#L45)
1. Print all of the entries, across all of the sources, in chronological order.
   - We don't need to store the log entries, just print them to stdout.
1. Do this _efficiently_. There are time and space complexities afoot!
## Run
- Make sure you have all the packages installed before running the code
- Run the code using npm start
```
   npm install
   npm start
```

## Solution
- By looking at the log Sources and number of entries, Queue (FIFO) is the best approach for sorting and storing the entries, a sorted tree which allow duplicates with same priority
### Implementation
   - Create a PriorityQueue Class which allows following operations
      1. add() - add element to the queue
      2. pop() - fetch the First element stored to the queue using date sorting
   - PriorityQueue should maintain the records or sort the records based the date they created
   - Add the element and pop the elements until al the LogSources are not drained 


## Advantages of Priority Queue

1. Effective Sorting: Elements in priority queues are automatically arranged according to their priority, which in this case is the log entry timestamp. This reduces complexity and saves time by doing away with the necessity for manual sorting methods.
1. Time Complexity: Even when the number of log entries rises, the time complexity of adding (enqueueing) and deleting (dequeuing) components using a priority queue stays efficient. This guarantees that the solution operates at its best overall.
1. Space Complexity: Because priority queues just need storage for the items themselves—rather than extra data structures needed for sorting algorithms—they make optimal use of available space. This facilitates efficient memory resource management, particularly when working with big datasets.

## Pointers & Callouts
1. We don't know how many logs each source contains. A source could contain millions of entries and be exabytes in size! In other words, reading the entirety of a log source into memory won't work well.
-  By using a priority queue, we can efficiently process log entries one by one without needing to load the entire dataset into memory at once.

1. Log sources could contain logs from last year, from yesterday, even from 100 years ago. We won't know the timeframe of a log source until we start looking.
-  Records will be added in sorted fashion, with a priority queue, we can process log entries in chronological order, regardless of the timestamp.

1. Consider what would happen when asked to merge 1 million log sources. Where might bottlenecks arise?
- processing million record could cause some processing and memory issues, to overcome that problem we can using Priority Queue with Node Streams, reading the data in pipes and storing it by chunks inside a memory buffer and processing read/write operations. In this way we can set our own bufferSize which will make it more efficient and resource friendly.

## Improvement for Future

1. To process huge pile of data it can be done in chunks using buffer and read/write operations synchronously
2. Implement Node Streams which will be more efficient in reading the data, transforming the data and writing the data.
   - [Node Streams](https://nodejs.org/api/stream.html)
