Router.route('/', function () {
    // render the Home template with a custom data context
    this.render('start-screen');
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/lobby');

// when you navigate to "/two" automatically render the template named "Two".
Router.route('/two');