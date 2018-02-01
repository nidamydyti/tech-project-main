var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('docdb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'docdb' database");
        db.collection('docs', {safe:true}, function(err, collection) {
            if (err) {
                console.log("Koleksioni docs nuk ekziston. Krijo nje model te te dhenave...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving doc: ' + id);
    db.collection('docs', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('docs', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addDoc = function(req, res) {
    var doc = req.body;
    console.log('Adding doc: ' + JSON.stringify(doc));
    db.collection('docs', function(err, collection) {
        collection.insert(doc, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateDoc = function(req, res) {
    var id = req.params.id;
    var doc = req.body;
    delete doc._id;
    console.log('Updating doc: ' + id);
    console.log(JSON.stringify(doc));
    db.collection('docs', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, doc, {safe:true}, function(err, result) {
            if (err) {
                console.log('Gabim gjatë freskimit të dokumentit: ' + err);
                res.send({'error':'Ka ndodhur nje gabim'});
            } else {
                console.log('' + result + ' Dokumnt(et) u freskuan');
                res.send(doc);
            }
        });
    });
}

exports.deleteDoc = function(req, res) {
    var id = req.params.id;
    console.log('Deleting doc: ' + id);
    db.collection('docs', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'Ka ndodhur nje gabim - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}


var populateDB = function() {

    var docs = [
    {
        name: "Nida Mydyti",
        autoret: "Nida Mydyti",
        region: "Prizren",
        description: ""
    }];

    db.collection('docs', function(err, collection) {
        collection.insert(docs, {safe:true}, function(err, result) {});
    });

};