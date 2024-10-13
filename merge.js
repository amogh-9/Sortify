function mergeSort(arr) {
    if (arr.length <= 1) return arr;  // Base case

    const mid = Math.floor(arr.length / 2);  // Find the middle index
    const left = mergeSort(arr.slice(0, mid));  // Recursively sort the left half
    const right = mergeSort(arr.slice(mid));     // Recursively sort the right half

    return merge(left, right);  // Merge the sorted halves
}

// Function to merge two sorted arrays
function merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);  // Push from left array
        } else {
            result.push(right[j++]);  // Push from right array
        }
    }

    // Concatenate remaining elements (if any)
    return result.concat(left.slice(i)).concat(right.slice(j));
}
