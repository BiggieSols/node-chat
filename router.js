function Router(req, res) {
  this.req = req;
  this.res = res;
}


/*
If the url is /, serve public/index.html.
Otherwise, try to load the name of the url as a filename in our app.
    If this fails, render 404 error.
*/
