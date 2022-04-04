
class Database {
     #openDB() {
        return new Promise(function (resolve,reject){
            const open = indexedDB.open("poker21",6.1) ;

            open.onupgradeneeded = function(){
                const db = open.result;
                //Si l'objet de stockage users n'existe pas, on le crée
                if (! db.objectStoreNames.contains('users')){
                    db.createObjectStore('users', {keyPath: 'id',autoIncrement: true});
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

    saveUser(user) {
         const that = this ;
         return this.#openDB().then(function (db){
                if(user) {
                    if(typeof user === "object") {
                       return that.getAllUser().then(
                           function (userList) {
                               const transaction = db.transaction("users","readwrite") ;
                               const users = transaction.objectStore("users") ;
                               if(!that.isUserExist(userList,user)) users.add(user);
                               else users.put(user)
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

    isUserExist(userList, user) {

        if(userList.length === 0) return  false ;

        let isUserExist = false ;
        for (const u of userList) {
            if (u.username === user.username) {
                isUserExist = true ;
                break ;
            }
        }
        return isUserExist ;
    }

    getUserID(userList,user) {
         let userID = null ;
         for(const u of userList) {
             if(u.username === user.username) {
                 userID = u.id ;
                 break ;
             }
         }
         return userID ;
    }

    getUser(user) {
         const that = this ;
         return this.#openDB().then(function (db) {
            return that.getAllUser().then(
                function (userList) {
                    const transaction = db.transaction("users", "readonly");
                    const users = transaction.objectStore("users");
                    const response = users.get(that.getUserID(userList, user));

                    return new Promise(function (resolve, reject) {
                        response.onsuccess =function () {
                            resolve(response.result);
                        };
                        response.onerror = function () {
                            reject(response.error);
                        };
                    });

                }
            );
         });
    }


}





export {Database} ;