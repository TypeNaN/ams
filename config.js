module.exports = {
    site: {
        port: 8000,
        root: '/public',
        uploads: __dirname + '/public/uploads'
    },
    db: {
        db: 'Your_DB_Name',
        collection: 'Your_Collection_Name'
    },
    console: {
        log: false
    }
};
