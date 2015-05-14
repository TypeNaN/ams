module.exports = {
    site: {
        port: 8000,
        root: '/public',
        uploads: __dirname + '/public/uploads'
    },
    db: {
        db: 'your_DB_name',
        collection: 'your_collection_name'
    },
    console: {
        log: false
    }
};
