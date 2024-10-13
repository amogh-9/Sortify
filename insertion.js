function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];  // The element to be inserted
        let j = i - 1;

        // Move elements of arr[0..i-1], that are greater than key,
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            drawArray();  // Visualize the shift
        }
        arr[j + 1] = key;  // Place key in its correct position
        drawArray();  // Visualize the array after insertion
    }
}
