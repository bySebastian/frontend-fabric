const express = express();
const app = express();

// serve static assets normally
app.use(express.static(config.dist_dir));

// handles all routes so you do not get a not found error
app.get('*', function(request,response) {
    response.sendFile(config.dev_dir + 'index.html');
});

app.listen(port);
console.log('server started on port ' + port);