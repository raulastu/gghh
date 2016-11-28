module.exports = function(db) {
    var gatekeeper={};


    gatekeeper.getAllKeyValues = function(callback) {
        console.log('getAllKeyValues', arguments);

        db.getConnection(function(err, connection){
            connection.query(
                " SELECT name, value " +
                " FROM gate_keeper",[],
                function(err, rows) {

                    if (err){
                        callback(err);
                    }
                    else{
                        console.log('getAllKeyValues result',rows);
                        callback(rows || {});
                    }
                });
            connection.release();
        });
    };

    gatekeeper.addNewKeyValue = function(name, value, callback) {
        try{
            console.log('addNewKeyValue ', arguments)

            db.getConnection(function(err, connection){
                connection.query(
                    ' INSERT INTO gate_keeper (name, value) VALUES (?, ?) ',[name, value],
                    function(err, rows) {

                        if (err){
                            callback(err);
                        }
                        else{
                            console.log('addNewKeyValue',rows[0]);
                            callback(rows[0] || {});
                        }
                    });
                connection.release();
            });
        }catch (e){
            //console.warn(e);
        }
    };

    gatekeeper.updateEntryValue = function(name, value, callback) {
        console.log('updateEntryValue ', arguments)

        db.getConnection(function(err, connection){
            connection.query(
                ' UPDATE gate_keeper SET ' +
                ' value = ? ' +
                ' WHERE name = ? ', [value, name],

                function(err, rows) {

                    if (err){
                        callback(err);
                    }
                    else{
                        console.log('updateEntryValue',rows[0]);
                        callback(rows[0] || {});
                    }
                });
            connection.release();
        });
    };
    return gatekeeper;
};

