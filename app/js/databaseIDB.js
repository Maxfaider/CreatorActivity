var dashboard = {
    addActivity: function(value) {
        
    },
    deleteActivity: function(name) {
        
    },
    modifyActivity: function(name) {
        
    }
}

var databaseActivities = {
    name: 'activities-list',
    result: null,
    operations: {
        upgrade: function(result) {
            result.createObjectStore("activities", {keyPath: "title"});
        },
        update: dashboardInit,
        setError: function(error) {
            console.log(error);
        }
    }
}

function dashboardInit() {
    readDatabase(databaseActivities, 'activities', {
        found: dashboard.addActivity,
        empty: emptyActivities
    })
}

function emptyActivities(value) {
    if(value) {
       console.log("Activities not found");
    }
}

function saveActivity() {
    
    var registry = {
        title: txtTitle.value;
        description: txtDescription.value;
        state: 'pending'
    }
    
    writeDatabase(databaseActivities, 'activities', registry, dashboard.addActivity);
}

connectDatabase(databaseActivities, databaseActivities.operations);
