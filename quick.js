function quickSort(arr) {
    if (arr.length <= 1) return arr;  // Base case

    const pivot = arr[arr.length - 1];  // Choose the last element as the pivot
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);  // Elements less than pivot
        } else {
            right.push(arr[i]);  // Elements greater than pivot
        }
    }

    // Recursively sort and concatenate left, pivot, and right arrays
    return [...quickSort(left), pivot, ...quickSort(right)];
}
