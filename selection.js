function selectionSort(arr) {
    let len = arr.length;

    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;  // Assume the minimum is the first element
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;  // Update minIndex if a smaller element is found
            }
        }
        // Swap the found minimum element with the first element
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            drawArray();  // Visualize the swap
        }
    }
}
