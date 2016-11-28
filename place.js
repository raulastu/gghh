module.exports = function(db) {

    var NodeGeocoder = require('node-geocoder');

    var options = {
        provider: 'google',
        project:'pichangamaker-backend',
        // Optional depending on the providers
        httpAdapter: 'https', // Default
        apiKey: 'AIzaSyBbpKprGniogDMFiMCqK9JmhWI2SNCCuUk', // for Mapquest, OpenCage, Google Premier
        formatter: null         // 'gpx', 'string', ...
    };

    var geocoder = NodeGeocoder(options);


    var places={};


    places.getClosestPlayersFromPlace = function(placeId, distanceInMiles, callback){
        db.getConnection(function(err, connection){

            var query = ' SELECT per.email, per.*, 3956 * 2 * ASIN(SQRT( POWER(SIN((abs(p.lat) -abs(per.last_lat)) * pi()/180 / 2),2) + COS(p.lat * pi()/180 ) * COS(abs(per.last_lat) *  pi()/180) * POWER(SIN((p.lng - per.last_lng) *  pi()/180 / 2), 2) )) '+
            ' as distance FROM person per, place p ' +
            ' WHERE p.place_id = ? ' +
            ' AND per.last_lat is not null ' +
            ' having distance < ? ' +
            ' ORDER BY distance;';

            connection.query(query, [placeId, distanceInMiles], function(err, rows) {
                if (err) {
                    callback({me: err});
                }
                else {
                    callback(rows);
                }
                connection.release();
            });
        });
    }

    places.searchPlacesClosesToPoint2 = function(lat, lng, personId, q, callback){

        if(lat != undefined){

            //lat, lng
            console.log('reverser geo start',lat, lng);
            geocoder.reverse({lat:lat, lon:lng}, function(err, res) {

                console.log('geocoder.reverse.err ', err);
                console.log('geocoder.reverse.res ', res);
                db.getConnection(function(err, connection){

                    var query = ' UPDATE person SET ' +
                        ' country = ?, ' +
                        ' country_code = ?, ' +
                        ' city = ? ' +
                        ' WHERE person_id = ? ';

                    res = res[0]
                    connection.query(query, [res['country'], res['countryCode'], res['city'], personId], function(err, queryRes) {
                        if (err) {
                            console.log('searchPlacesClosesToPoint2. err', err)
                        }
                        else {
                            console.log('country city stored', queryRes)
                        }
                        connection.release();
                    });
                });

            });

            db.getConnection(function(err, connection){

                var query = ' UPDATE person SET ' +
                    ' last_lat = ?, ' +
                    ' last_lng = ?, ' +
                    ' last_location_datetime = CURRENT_TIMESTAMP()' +
                    ' WHERE person_id = ? ';

                connection.query(query, [lat, lng, personId], function(err, res) {
                    if (err) {
                        console.log('searchPlacesClosesToPoint. err', err)
                    }
                    else {
                        console.log('lat lng stored', res)
                    }
                    connection.release();
                });
            });
        }

        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
        var lowerDate = localISOTime.replace(/T/, ' ').replace(/\..+/, '');


        db.getConnection(function(err, connection){

            var query = ' SELECT p.place_id, ' +
                'p.place_id as id, p.place_pic_url, '+ 
            'p.name, p.place_pic_url_small, '+
            'p.place_pic_url_large, p.creator_id, p.address, '+
            'p.lat, p.lng, p.reference, ' +
            '(SELECT count(*) FROM pichanga pp WHERE pp.place_id = p.place_id AND pp.is_public = 1 AND pp.start_date >= ?) as public_pichangas '+
                'FROM place p '+
                'WHERE 1 = 1 ';

            var query_string = "";


            console.log('searchPlaces');

            if(q){
                query_string = '%' + q + '%';
                query += ' AND name like ? ';
                query += ' OR address like ? ';
            }

            connection.query(query, [lowerDate, query_string, query_string], function(err, rows) {
                if (err) {
                    callback({me: err});
                }
                else {
                    callback({data:rows});
                }
                connection.release();
            });
        });
    }

    places.searchPlacesClosesToPoint = function(lat, lng, personId, q, callback){

        //lat, lng

        if(lat != undefined){
            db.getConnection(function(err, connection){

                var query = ' UPDATE person SET ' +
                    ' last_lat = ?, ' +
                    ' last_lng = ?, ' +
                    ' last_location_datetime = CURRENT_TIMESTAMP()' +
                    ' WHERE person_id = ? ';

                connection.query(query, [lat, lng, personId], function(err, res) {
                    if (err) {
                        console.log('searchPlacesClosesToPoint. err', err)
                    }
                    else {
                        console.log('lat lng stored', res)
                    }
                    connection.release();
                });
            });
        }


        db.getConnection(function(err, connection){

            var query = ' SELECT place_id, '+
            'place_id as id, place_pic_url,'+ 
            'name, place_pic_url_small, '+
            'place_pic_url_large, creator_id, address, '+
            'lat, lng, reference ' +
                ' FROM place ' +
                ' WHERE 1 = 1 ';

            var query_string = "";

            console.log('searchPlaces');

            if(q){
                query_string = '%' + q + '%';
                query += ' AND name like ? ';
                query += ' OR address like ? ';
            }

            connection.query(query, [query_string, query_string], function(err, rows) {
                if (err) {
                    callback({me: err});
                }
                else {
                    callback({data:rows});
                }
                connection.release();
            });
        });
    }

    places.searchPlaces = function(q, callback){
        db.getConnection(function(err, connection){

            var query = ' SELECT place_id, place_id as id, place_pic_url, name, place_pic_url_small, place_pic_url_large, creator_id, address, lat, lng, reference ' +
                ' FROM place ' +
                ' WHERE 1 = 1 ';

            var query_string = "";

            console.log('searchPlaces');

            if(q){
                query_string = '%' + q + '%';
                query += ' AND name like ? ';
                query += ' OR address like ? ';
            }

            connection.query(query, [query_string, query_string], function(err, rows) {
                if (err) {
                    callback({me: err});
                }
                else {
                    callback({data:rows});
                }
                connection.release();
            });
        });
    }

    places.searchPlaces = function(q, callback){
        db.getConnection(function(err, connection){

            var query = ' SELECT place_id, place_id as id, place_pic_url, name, place_pic_url_small, place_pic_url_large, creator_id, address, lat, lng, reference ' +
                ' FROM place ' +
                ' WHERE 1 = 1 ';

            var query_string = "";

            console.log('searchPlaces');

            if(q){
                query_string = '%' + q + '%';
                query += ' AND name like ? ';
                query += ' OR address like ? ';
            }

            connection.query(query, [query_string, query_string], function(err, rows) {
                if (err) {
                    callback({me: err});
                }
                else {
                    callback({data:rows});
                }
                connection.release();
            });
        });
    }

    places.registerPlacePicURL = function(placeId, placePicURLSmall, placePicURLlarge, callback){
        db.getConnection(function(err, connection){
            connection.query( ' UPDATE place set ' +
            ' place_pic_url_small = ?, ' +
            ' place_pic_url_large = ? ' +
            ' WHERE place_id = ?', [placePicURLSmall, placePicURLlarge, placeId], function(err, rows) {
                if (err) {
                    console.log(err)
                    callback({me: err});
                }
                else {
                    callback(rows);
                }
                connection.release();
            });
        });

    }
    places.registerPlace = function(name, address, lat, lng, reference, personId, origin, callback){

        db.getConnection(function(err, connection){
            connection.query( ' INSERT INTO place (name, address, lat, lng, reference, creator_id, registration_origin, registration_datetime) ' +
            ' VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP()) ', [name, address, lat, lng, reference, personId, origin], function(err, rows) {
                if (err) {
                    callback({me: err});
                }
                else {
                    callback(rows);
                }
                connection.release();
            });
        });

    }

    places.getAllPlaces = function(callback){

        db.getConnection(function(err, connection){
            connection.query( " " +
            " SELECT pl.*, CONCAT(pe.first_name,' ' ,pe.last_name) as registrant_name, " +
            " pe.email as registrant_email, (SELECT count(*) FROM pichanga WHERE place_id = pl.place_id) as pichangas_played " +
            " FROM " +
            ' place pl  ' +
            ' LEFT JOIN person pe ON (pe.person_id = pl.creator_id) ' +
            ' ORDER BY pl.place_id DESC', [], function(err, rows) {
                if (err) {
                    callback({me: err});
                }
                else {
                    callback(rows);
                }
                connection.release();
            });
        });
    }


    places.removePlace = function(placeId, callback){

        db.getConnection(function(err, connection){
            connection.query( ' DELETE FROM place WHERE place_id = ? ', [placeId],
                function(err, rows) {
                    if (err) {
                        console.err(err);
                        callback({me: err});
                    }
                    else {
                        callback({data: rows});
                    }
                    connection.release();
                });

        });
    }

    places.getPlacePichangas = function(placeId, lowerDate, callback){

        db.getConnection(function(err, connection){
            var query = ' SELECT p.*, '+
                ' pl.lat, pl.lng, pl.name as place_name, pl.address, '+
                '(SELECT count(*) FROM assistant c WHERE c.pichanga_id  = p.pichanga_id) as assistant_count ' +
                ' FROM pichanga p JOIN place pl USING(place_id) ' +
                ' WHERE p.place_id = ? AND p.is_public = 1 '

            var params = []

            params.push(placeId)

            if(Boolean(lowerDate)){
                query +=  ' AND p.start_date >= ? ';
                params.push(lowerDate);
            }

            connection.query( query, params,
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        callback({me: err});
                    }
                    else {
                        callback(rows);
                    }
                    connection.release();
                });

        });
    }

    places.getPlaceDetail = function(placeId, callback){

        db.getConnection(function(err, connection){
            connection.query( ' SELECT pl.* '+
                ' FROM place pl WHERE pl.place_id = ?  ', [placeId],
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        callback({me: err});
                    }
                    else {
                        callback(rows[0]);
                    }
                    connection.release();
                });

        });
    }

    return places;
};

