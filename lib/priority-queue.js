/** Implement Priority Queue, to store the records in 
 * sorted tree and fetch the records with help FIFO method
 * 
 * records are stored using add() method, and fetched using pop()
 * @param
 * queue - list to store the number of records
**/ 

module.exports = class PriorityQueue {

    constructor() {
        this.queue = [];
    }
    // add elements to the Priority Queue 
    // move the element according to order
    add(record) {
        if (record) {
            this.queue.push(record);
            this.traverseUp(this.queue.length - 1);
        }
    }

    // get the oldest element in the list
    // move the element according to order
    pop() {
        const first = this.queue[0];
        const lastRecord = this.queue.pop();
        if (this.queue.length > 0) {
            this.queue[0] = lastRecord;
            this.traverseDown(0);
        }
        return first;
    }

    // return the size of queue
    getSize() {
        return this.queue.length;
    }

    // check the records by there date and swap based on date
    traverseUp(index) {
        while (index > 0) {
            const parentIndex = this._getParentIndex(index);
            const parent = this._getParent(index);
            if (parent && this.queue[index].date && parent.date) {
                if (this._isLatestDate(this.queue[index].date, parent.date)) {
                    this.swap(parentIndex, index);
                    index = parentIndex
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

    // check the last popped element 
    // and move the current element if date order sync is required
    traverseDown(index) {
        while (true) {
            let currentIndex = index;
            const leftChildIndex = this._getLeftChildIndex(index);
            const rightChildIndex = this._getRightChildIndex(index);
            const hasLeftChild = this._hasLeftChild(index);
            const hasRightChild = this._hasRightChild(index);

            if (hasLeftChild && this._isLatestDate(this.queue[leftChildIndex].date, this.queue[currentIndex].date)) {
                currentIndex = leftChildIndex;
            }
            if (hasRightChild && this._isLatestDate(this.queue[rightChildIndex].date, this.queue[currentIndex].date)) {
                currentIndex = rightChildIndex;
            }

            if (currentIndex !== index) {
                this.swap(currentIndex, index);
                index = currentIndex;
            } else {
                break;
            }
        }
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    swap(indexA, indexB) {
        const value = this.queue[indexA];
        this.queue[indexA] = this.queue[indexB];
        this.queue[indexB] = value;
    }

    _isLatestDate(currentDate, comparedToDate) {
        return currentDate - comparedToDate < 0;
    }
    _isLeftChildSmallest(leftChildIndex, currentIndex) {
        return this._isLatestDate(this.queue[leftChildIndex].date, this.queue[currentIndex].date);
    }

    _isRightChildSmallest(rightChildIndex, currentIndex) {
        return this._isLatestDate(this.queue[rightChildIndex].date, this.queue[currentIndex].date);
    }

    _hasLeftChild(index) {
        return this._getLeftChildIndex(index) < this.queue.length;
    }

    _hasRightChild(index) {
        return this._getRightChildIndex(index) < this.queue.length;
    }

    _hasParent(index) {
        return this._getParentIndex(index) >= 0;
    }

    _getLeftChild(index) {
        return this.queue[this._getLeftChildIndex(index)];
    }

    _getRightChild(index) {
        return this.queue[this._getRightChildIndex(index)];
    }

    _getParent(index) {
        return this.queue[this._getParentIndex(index)];
    }

    _getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    _getRightChildIndex(index) {
        return 2 * index + 2;
    }

    _getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
}