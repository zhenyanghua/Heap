class HeapItem {
  /**
   * item: value each heap node stores
   * priority: key for heap sort
   */
  constructor(item, priority) {
    this.item = item;
    this.priority = priority;
  }
}

module.exports = HeapItem;