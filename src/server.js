import express from 'express'
import handlebars from'express-handlebars'
import path from 'path'
import passport from 'passport'
import database from './database.js'  
import session from  "express-session"
import mongo from  "connect-mongo"

//Inicialization
const app = express();
const MongoStore = mongo(session)
require ("./config/passport.js")
// settings

let promesa = database.configDb();
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));


// static files
app.use(express.static(path.join(__dirname, 'public')));
//Midlewares
app.use(express.json())


promesa.then(()=>{
app.use(session({
    resave:"false",
    saveUninitialized: true,
    secret:"estoessecretoshhh",
    store: new MongoStore({ client:database.client})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.admin = req.session.admin || null;
  res.locals.user = req.user || null;
  next();
});

// routes
app.set('view engine', '.hbs');
app.use(require ('./routes/index.routes.js'));
app.use(require('./routes/users.routes.js'))
app.use(require('./routes/admin.routes.js'))

console.log("Sessions configured")
})

/*app.use( (req, res, next) =>{*/
  //if (!req.session.views) {
    //req.session.views = {}
  //}
 
  //// get the url pathname
  //var pathname = parseurl(req).pathname
 
  //// count the views
  //req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
 
  //next()
/*})*/
export{promesa,app} 
