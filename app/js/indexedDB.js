var connectDatabase = function(database, operations) {
    var request = indexedDB.open(database.name);
    request.onupgradeneeded = function(evt) {
        database.result = evt.target.result;
        operations.upgrade(database.result);
    };
    
    request.onsuccess = function(evt) {
        operations.update(evt.target.result);
    }
    
    request.onerror = function(evt) {
        operations.setError('no connection has been established with the browser');
    }
}

var readDatabase = function(database, nameStore, operations) {
    var tx = database.transaction(nameStore, "readonly");
    var store = tx.objectStore(nameStore);
    var empty = true;
    
    store.openCursor().onsuccess = function(evt) {
        var cursor = evt.target.result;
        if(cursor) {
            empty = false;
            operations.found(cursor.value);
            cursor.continue();
        } else {
            operations.empty(empty);
        }
    } 
}

var writeDatabase = function(database, nameStore, Data, operation) {
    var tx = database.transaction(nameStore, "readwrite");
    var store = tx.objectStore(nameStore);
    
    store.put(data);
    
    tx.oncomplete = function() {
        operation(data);
    };  
}

//actualizar-registros
//eliminar-registros

