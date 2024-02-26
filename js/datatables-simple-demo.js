// Simple-DataTables
// https://github.com/fiduswriter/Simple-DataTables/wiki
export function dispTable(){
        const datatablesSimple = document.getElementById('datatablesSimple');
        if (datatablesSimple) {
            new simpleDatatables.DataTable(datatablesSimple);
            alert('done');
        }
}