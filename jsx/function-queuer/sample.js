var functionQueuer = require('functionQueuer');

var app = {
    a: function () {
        var reservation = this.print.reserve();

        return new Promise(function (resolve) {
            setTimeout(function () {
                reservation.use('called from a');
                resolve();
            }, 3000);
        });
    },

    b: function () {
        this.print('called from b');
    },

    print: function (message) {
        console.log(message);
    },
};

functionQueuer.wrap({
    scope: app,
    name: 'print',
});

app.a();
app.b();

// result:
// called from a
// called from b
