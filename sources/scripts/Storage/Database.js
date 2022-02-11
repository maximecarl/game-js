
class Database {
     #openDB() {
        return new Promise(function (resolve,reject){
            const open = indexedDB.open("poker21",6.0) ;

            open.onupgradeneeded = function(){
                const db = open.result;
                //Si l'objet de stockage users n'existe pas, on le crée
                if (! db.objectStoreNames.contains('users')){
                    db.createObjectStore('users', {keyPath: 'id'});
                }
                resolve(db) ;
            };
            open.onsuccess = function () {
                resolve(open.result) ;
            }
            open.onerror = function () {
                reject(open.error) ;
            }

        })
    }

    addUser(user) {
         const that = this ;
         return this.#openDB().then(function (db){
                if(user) {
                    if(typeof user === "object") {
                       return that.getAllUser().then(
                           function (userList) {
                               if(!isUserExist(userList,user)) {
                                   const transaction = db.transaction("users","readwrite") ;
                                   const users = transaction.objectStore("users") ;
                                   users.add(user);
                               }
                           }) ;
                    }
                }
         }) ;
    }

    getAllUser() {
        return this.#openDB().then(function (db){
            const transaction = db.transaction("users","readonly") ;
            const users = transaction.objectStore("users") ;
            const userList = users.getAll() ;

            return new Promise(function (resolve, reject){
                userList.onsuccess = function () {
                    resolve(userList.result) ;
                }
                userList.onerror = function () {
                    reject(userList.error) ;
                }
            })
        }) ;
    }


}



function  isUserExist(userList, user) {

    if(userList.length === 0) return  false ;

    let isUserExist = false ;
    for (const u of userList) {
        if (u.username === user.username)
            isUserExist = true;
    }
    return isUserExist ;
}




export {Database} ;