JS AMAZONA
bab 1
1.Create Folder Strcutur
1.craeate toot folder as jsecomerce
2.ass frontend and backend folder
3.create src folder in frontend
4.create index.html with heading jsamazona in src
5.run npm init in frontend folder
6.npm install liveserver (-D\_)
7.add start command pkgjson as live-sever src--verbose
8.run npm start

bab2:
Design website
1.create styles.css
2.link style.css to index.html
3.creat div.grid-container
4.creawte header,main,adn foooter
5.style html,body
6.style grid-container,header,main and footer

3.Create Static Home Screem
1.create ul product
2.create li
3.create div.product
4.add .product-image,.product-name,.product-bradn, .product-price
5.style ul.products and internals divs
.dulicate 3 times to show 3 products

4.render Dynamic Home Screen
1.create data.js
2.export an array of 6 products
3.create screen /homeScreen.js
4.export HomeScreen as an object with render(0 method)
5.implement render(0
6.import data.js
7.return products mapped to li's inside an ul
8.create app.js
9.link int to index.html as module
10.set main id to main_container
11.create router() function
12.set main_container innerHTML to homeScreen.render()
13.set load event of window to router() function
)
5.uild Url Router
1.Create routes as router:screen object for home screen
( jadi ke screet product kalau gak bisa 404 error)
note: edit hmtlnya utk di bagian ul yg benar adalah #/ bukan
/#/ biart tidak error karena tangkap hash stlahnya /dirnya!
2.create util.js
3.export parseRequestURL()
4.exporturl as hash addresssplit by slsah
5.return resource id and verb of url
6.update router
7.set request as perparseURL
8.build procedure url and compare with routes
9.if route exist render it else render error 404
10.create screen error404.js and render error message

6.Create NodeJs Server
run npm init in root jsamazona folder
npm install express
create server.js
add start commad as node backend/server.js
require express
movedata.js from frontedn to backend
create route for /api/rpdocuts
retrun prodiuct in data.js
run npm start
7.Loada Products From backend
1.a running both backend server and fornt end
1.Edit HomeScree.js
2.make render async server.js
3.fetch products from 'api/products' in render (async -await)
4.make router() async and call await HomeScreen.render()
5.use cors on backend ( with install cors pkg)

7.  8.Add Webpack
    1.cd frontend
    2.npm install -D webpack webpack-cli webpack-dev-server
    3.npm uninstall live-server
    4."start":"webpack-dev-server --mode development --watch-content-base --open"
    5.move index.html,style.css and images to frontend folder
    6.rename app.js to index.js
    7.update index.html
    add <script src="main.js"></script> before </body>
    npm start
    npm install axios
    change fetch to axios in homeScreen