var dashboard = {
    addActivity: function(value) {
        
        var col_small = createElement('div', {class: 'col col-small'});
        
        var section = createElement('section', {class: 'activity'});
        
        //header
        var header = createElement('section', {class: 'row header'});
        var headerTitle = createElement('section', {class: 'col col-big-3'});
        headerTitle.innerHTML = value.title;
        var headerOptions = createElement('section', {class: 'col options'});
        headerOptions.innerHTML = '...';
        header.appendChild(headerTitle);
        header.appendChild(headerOptions);
        
        //content
        var content = createElement('section', {class: 'content'});
        content.innerHTML = value.description;
        
        //options
        var options = createElement('section', {class: 'row options'});
        var state = createElement('section', {class: 'col col-big-2'});
        state.innerHTML = value.state;
        var show = createElement('section', {class: 'col col-short button'});
        show.innerHTML = 'show';
        options.appendChild(state);
        options.appendChild(show);
        
        section.appendChild(header);
        section.appendChild(content);
        section.appendChild(options);
        col_small.appendChild(section);
        
        htmldashboard.appendChild(col_small);
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
        upgrade: function(db) {
            var store = db.createObjectStore("activities", {keyPath: "title"});
            //initial data
            store.put({title: 'untitled Activity', description: 'none', state: 'complete'});
            store.put({title: 'Welcome CreateActivity', description: 'Genera y organiza tus distintas actividades', state: 'review'});
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
    });
}

function emptyActivities(value) {
    if(value) {
       console.log("Activities not found");
    }
}

function createElement(name, attributes) {
    var element = document.createElement(name);
    
    for(let index in attributes) {
        var attribute = document.createAttribute(index);
        attribute.value = attributes[index];
        element.setAttributeNode(attribute);
    }
    
    return element;
}

function saveActivity() {
    var registry = {
        title: txtTitle.value,
        description: txtDescription.value,
        state: 'pending'
    }
    
    writeDatabase(databaseActivities, 'activities', registry, dashboard.addActivity);
}

connectDatabase(databaseActivities, databaseActivities.operations);
