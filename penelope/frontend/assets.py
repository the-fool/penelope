from flask_assets import Environment, Bundle


#: application css bundle
css_penelope = Bundle("less/penelope.less",
                       filters="less", output="css/penelope.css",
                       debug=False)

#: consolidated css bundle
css_all = Bundle("bower_components/bootstrap/dist/css/bootstrap.min.css", 
                 "css/bootstrap-responsive.min.css")

#: vendor js bundle
js_vendor = Bundle("bower_components/jquery/dist/jquery.js",
                   "bower_components/bootstrap/dist/js/bootstrap.js",
                   "bower_components/angular-route/angular-route.js",
                   "bower_components/angular-resource/angular-resource.js",
                   "bower_components/angular/angular.js")

#: application js bundle
js_main = Bundle("js/*.js")


def init_app(app):
    webassets = Environment(app)
    webassets.register('css_all', css_all)
    webassets.register('js_vendor', js_vendor)
    webassets.register('js_main', js_main)
    webassets.manifest = 'cache' if not app.debug else False
    webassets.cache = not app.debug
    webassets.debug = app.debug