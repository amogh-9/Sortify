let array = [];
let isSorting = false;
let delay = 50; // Adjust delay for visualization speed

// Function to generate a random array
function generateRandomArray(size = 30) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1); // Random values from 1 to 100
    }
    drawArray(); // Call drawArray to visualize the new array
}

// Function to draw the array on the canvas
function drawArray() {
    const canvas = document.getElementById('sortingCanvas');
    const ctx = canvas.getContext('2d');
    const barWidth = canvas.width / array.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    array.forEach((value, index) => {
        ctx.fillStyle = '#185519'; // Bar color
        ctx.fillRect(index * barWidth, canvas.height - value * 4, barWidth - 2, value * 4); // Adjust height
    });
}

// Visualization helper function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Sorting Algorithms
async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                // Swap
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                drawArray();
                await sleep(delay); // Visualize the sort
            }
        }
    }
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            drawArray();
            await sleep(delay); // Visualize the sort
            j--;
        }
        array[j + 1] = key;
    }
    drawArray();
}

async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            // Swap
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            drawArray();
            await sleep(delay); // Visualize the sort
        }
    }
}

async function quickSort(low = 0, high = array.length - 1) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            drawArray();
            await sleep(delay); // Visualize the sort
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    drawArray();
    return i + 1;
}

async function mergeSort(left = 0, right = array.length - 1) {
    if (left < right) {
        const middle = Math.floor((left + right) / 2);
        await mergeSort(left, middle);
        await mergeSort(middle + 1, right);
        await merge(left, middle, right);
    }
}

async function merge(left, middle, right) {
    const leftArray = array.slice(left, middle + 1);
    const rightArray = array.slice(middle + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        drawArray();
        await sleep(delay); // Visualize the sort
        k++;
    }

    while (i < leftArray.length) {
        array[k] = leftArray[i];
        drawArray();
        await sleep(delay); // Visualize the sort
        i++;
        k++;
    }

    while (j < rightArray.length) {
        array[k] = rightArray[j];
        drawArray();
        await sleep(delay); // Visualize the sort
        j++;
        k++;
    }
}

// Add event listeners for buttons
document.querySelector('.generate').addEventListener('click', () => {
    generateRandomArray(); // Generate the array
    drawArray(); // Draw the array on the canvas
});

document.querySelectorAll('.sort-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove the 'selected' class from all buttons
        document.querySelectorAll('.sort-button').forEach(btn => btn.classList.remove('selected'));
        
        // Add the 'selected' class to the clicked button
        button.classList.add('selected');
        
        // Logic to start sorting visualization
        const algorithm = button.dataset.algorithm;
        document.querySelector('.start').onclick = async () => {
            if (isSorting) return; // Prevent starting if already sorting
            isSorting = true; // Prevent multiple sorts at once
            switch (algorithm) {
                case 'bubbleSort':
                    await bubbleSort();
                    break;
                case 'insertionSort':
                    await insertionSort();
                    break;
                case 'selectionSort':
                    await selectionSort();
                    break;
                case 'quickSort':
                    await quickSort();
                    break;
                case 'mergeSort':
                    await mergeSort();
                    break;
                default:
                    alert("Please select a sorting algorithm!");
            }
            isSorting = false; // Allow for new sorting after completion
        };
    });
});

// Initialize random array on load
generateRandomArray();
