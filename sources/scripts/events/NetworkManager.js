
const networkStatus = document.getElementById("network-status") ;
const networkText = document.getElementById("network-text") ;

function resetNetworkDisplay() {
    if(networkStatus.classList.length > 0)
        for(const classes of networkStatus.classList ) {
            networkStatus.classList.remove(classes) ;
        }

}
function displayNetWorkOnline() {
    resetNetworkDisplay();
    networkStatus.classList.add("network-online") ;
    networkText.innerText = "ON" ;
}

function displayNetWorkOffline() {
    resetNetworkDisplay();
    networkStatus.classList.add("network-offline") ;
    networkText.innerText = "OFF" ; 
}

class NetworkManager {
    initNetworkDisplay() {

        if(window.navigator.onLine) {
            displayNetWorkOnline() ;
        } else  displayNetWorkOffline() ;

        addEventListener('online',function (){
            displayNetWorkOnline() ;
        }) ;
        addEventListener('offline',function (){
            displayNetWorkOffline() ;
        }) ;
    };
}
export { NetworkManager };