function bubbleSort(arr) {
    let len = arr.length;
    let swapped;

    // Loop through the array multiple times
    do {
        swapped = false;  // Reset swapped flag
        for (let i = 0; i < len - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;  // Set swapped flag
                drawArray();  // Visualize the swap
            }
        }
        len--;  // Reduce the length for optimization
    } while (swapped);
}
