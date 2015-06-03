module.exports = {
    port: 8000,
    path: {
        root: '/public',
        uploads: __dirname + '/public/uploads',
        views: __dirname + '/public/views',
        thumbnails: __dirname + '/public/thumbnails'
    },
    db: {
        db: 'Your_DB_Name',
        collection: 'Your_Collection_Name'
    },
    console: {
        log: false
    },
    check: {
        extension: [/jpg/, /jpeg/]
    },
    gen: {
        view: {
            width: 916,
            height: 576
        },
        thumb: {
            width: 80,
            height: 80
        }
    }
};
