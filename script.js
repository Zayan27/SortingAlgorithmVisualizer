let array = [];
let arraySize = 50;
let speed = 50;

function generateArray() {
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    displayArray();
}

function displayArray() {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value}%`;
        bar.style.width = `${80 / arraySize}%`;
        arrayContainer.appendChild(bar);
    });
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateSpeed(value) {
    speed = value;
    document.getElementById('speedValue').textContent = value;
}

function updateSize(value) {
    arraySize = value;
    document.getElementById('sizeValue').textContent = value;
    generateArray();
}

async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                displayArray();
                await sleep(speed);
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
            j = j - 1;
            displayArray();
            await sleep(speed);
        }
        array[j + 1] = key;
        displayArray();
        await sleep(speed);
    }
}

async function mergeSort() {
    async function merge(arr, l, m, r) {
        let n1 = m - l + 1;
        let n2 = r - m;

        let L = new Array(n1);
        let R = new Array(n2);

        for (let i = 0; i < n1; i++)
            L[i] = arr[l + i];
        for (let j = 0; j < n2; j++)
            R[j] = arr[m + 1 + j];

        let i = 0;
        let j = 0;
        let k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
            displayArray();
            await sleep(speed);
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
            displayArray();
            await sleep(speed);
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
            displayArray();
            await sleep(speed);
        }
    }

    async function mergeSortHelper(arr, l, r) {
        if (l >= r) {
            return;
        }
        let m = l + Math.floor((r - l) / 2);
        await mergeSortHelper(arr, l, m);
        await mergeSortHelper(arr, m + 1, r);
        await merge(arr, l, m, r);
    }

    await mergeSortHelper(array, 0, array.length - 1);
}

async function quickSort() {
    async function partition(arr, low, high) {
        let pivot = arr[high];
        let i = (low - 1);

        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                displayArray();
                await sleep(speed);
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        displayArray();
        await sleep(speed);
        return (i + 1);
    }

    async function quickSortHelper(arr, low, high) {
        if (low < high) {
            let pi = await partition(arr, low, high);
            await quickSortHelper(arr, low, pi - 1);
            await quickSortHelper(arr, pi + 1, high);
        }
    }

    await quickSortHelper(array, 0, array.length - 1);
}

async function heapSort() {
    async function heapify(arr, n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest])
            largest = left;

        if (right < n && arr[right] > arr[largest])
            largest = right;

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            displayArray();
            await sleep(speed);
            await heapify(arr, n, largest);
        }
    }

    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        await heapify(array, array.length, i);
    }

    for (let i = array.length - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        displayArray();
        await sleep(speed);
        await heapify(array, i, 0);
    }
}

generateArray();
