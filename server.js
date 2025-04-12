const express = require('express');
const app = express();
const PORT = 5004;

const capacity = 5;
const leakrate = 1;

let bucket = 0;

setInterval(() => {
    if (bucket > 0) {
        bucket--;
        console.log(`Leaked 1 request. Remaining in the bucket: ${bucket}`);
    }
}, 1000);

function leakybucketlimitter(req, res, next) {
    if (bucket < capacity) {
        bucket++;
        console.log(`Request allowed, Bucket size: ${bucket}`);
        next();
    } else {
        console.log('Request denied, Bucket full.');
        res.status(429).send("Too many requests - Try again later");
    }
}

app.get('/', leakybucketlimitter, (req, res) => {
    res.send("Request processed successfully!");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
