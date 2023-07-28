interface MemoizeProps<T> {
    key: string;
    update: () => Promise<T>;
    updateTime: number;
}

// Open database
const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('myDatabase', 1);

        request.onupgradeneeded = function () {
            const db = request.result;
            if (!db.objectStoreNames.contains('cache')) {
                db.createObjectStore('cache');
            }
        };

        request.onsuccess = function () {
            resolve(request.result);
        };

        request.onerror = function (event) {
            reject((event.target as IDBRequest).error);
        };
    });
};

// Get from database
const getFromDatabase = <T>(db: IDBDatabase, key: string): Promise<T | undefined> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['cache'], 'readonly');
        const store = transaction.objectStore('cache');
        const request = store.get(key);

        request.onsuccess = function () {
            resolve(request.result as T | undefined);
        };

        request.onerror = function (event) {
            reject((event.target as IDBRequest).error);
        };
    });
};

// Set in database
const setInDatabase = <T>(db: IDBDatabase, key: string, value: T): Promise<void> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['cache'], 'readwrite');
        const store = transaction.objectStore('cache');
        const request = store.put(value, key);

        request.onsuccess = function () {
            resolve();
        };

        request.onerror = function (event) {
            reject((event.target as IDBRequest).error);
        };
    });
};

/**
 * Function to memoize the data in the database
 * @param param0 key, update function and updateTime
 * @returns cached data
 */
const memoize = async <T>({ key, update, updateTime }: MemoizeProps<T>): Promise<T> => {
    
    const db = await openDatabase();
    let value = await getFromDatabase<T>(db, key);
    const lastUpdate = await getFromDatabase<number>(db, `${key}-lastUpdate`) || 0;
    
    const now = Date.now();
    const diff = now - lastUpdate;
    if (diff > updateTime || !value) {
        value = await update();
        await setInDatabase<T>(db, key, value);
        await setInDatabase<number>(db, `${key}-lastUpdate`, now);
    } else {
        // console.log(`Using cached data for ${key}`);
    }

    return value;
}

export default memoize;