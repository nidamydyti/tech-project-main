var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "docs"	: "list",
        "docs/page/:page"	: "list",
        "docs/add"         : "addDoc",
        "docs/:id"         : "docDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var docList = new DocCollection();
        docList.fetch({success: function(){
            $("#content").html(new DocListView({model: docList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    docDetails: function (id) {
        var doc = new Doc({_id: id});
        doc.fetch({success: function(){
            $("#content").html(new DocView({model: doc}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addDoc: function() {
        var doc = new Doc();
        $('#content').html(new DocView({model: doc}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'DocView', 'DocListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});