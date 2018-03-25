function getComponents() {
    //modal
    btnClose = document.getElementById('btnClose');
    btnCancel = document.getElementById('btnCancel');
    btnOpen = document.getElementById('btnOpen');
    modal = document.getElementById('modal');
    
    //input modal
    txtTitle = document.getElementById('txtTitle');
    txDescription = document.getElementById('txtDescription');
    
    //addActivity
    btnadd = document.getElementById('btnAdd');
    
    //dashboard
    htmldashboard = document.getElementById('dashboard');
}
getComponents();

btnCancel.onclick = hiddenModal;
btnClose.onclick = hiddenModal;
btnOpen.onclick = showModal;

modal.onclick = function(evt) {
    if(evt.target.id == 'modal') {
       hiddenModal();
    }
}

btnadd.onclick = function() {
    if(txtTitle.value != null && txtTitle.value !== "") {
        saveActivity();
        clearModal();
    }
    hiddenModal();
}

function hiddenModal() {
    modal.style.display = "none";
}

function showModal() {
    modal.style.display = "block";
}
    
function clearModal() {
    txtTitle.value = "";
    txtDescription.value = "";
}