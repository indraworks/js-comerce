Features
    1. Home Screen
        i. Static Web Page Design
        ii. CSS Grid to create website layout
        iii. Flexbox to shape product thumbnails and responsive design
    2. Product Screen
        i. create single page application
        ii. Create buttons and add events to buttons
    3. Cart Screen
        i. Save and retrieve data in local storage
        ii. Master in javascript array functions
        iii. Use combo box and add event to it
        iv. re-render screen based on changes in item count
    4. Sign-in and Register Screen
        i. Create dynamic form
        ii. Input validation in frontend and backend
        iii. Create web server using node.js
        iv. Connect to Mongodb database
        v. Add registered user to the database
        vi. Authenticate user based on email and password
        vii. Using Jsonwebtoken to authorize users
    5. Shipping and Payment Screen
        i. Create wizard form to get user data in multiple steps
        ii. Save user info in the local storage
    6. Place Order Screen
        i. Validate and create order in the database
    7. Order Screen
        i. Payment with paypal
        ii. Show order state based on user and admin activities
    8. Profile Screen
        i. Create authenticated routes
        ii. enable user to update their informations
        iii. enable user to logout and clear local storage
        iv. show list of orders to user and link it to details
    9. Dashboard Screen
        i. Create professional dashboard using pure CSS
        ii. Using chart library to show sales information
    10. Order Screen
        i. Enable admin to mange orders
        ii. show loading message and alert message
    11. Product Screen
        i. enable admin to manage products
        ii. upload product images to server
Lessons
    1. Create Folder Structure
        i. create root folder as jsamazona
        ii. add frontend and backend folder
        iii. create src folder in frontend
        iv. create index.html with heading jsamazona in src
        v. run npm init in frontend folder
        vi. npm install live-server
        vii. add start command as live-server src --verbose
        viii. run npm start
        ix. check result
    2. Design Website
        i. create style.css
        ii. link style.css to index.html
        iii. create div.grid-container
        iv. create header, main and footer
        v. style html, body
        vi. style grid-container, header, main and footer
    3. Create Static Home Screen
        i. create ul.products
        ii. create li
        iii. create div.product
        iv. add .product-image, .product-name, .product-brand, .product-price
        v. style ul.products and internal divs
        vi. duplicate 2 times to show 3 products
    4. Render Dynamic Home Screen
        i. create data.js
        ii. export an array of 6 products
        iii. create screens/HomeScreen.js
        iv. export HomeScreen as an object with render() method
        v. implement render()
        vi. import data.js
        vii. return products mapped to lis inside an ul
        viii. create app.js
        ix. link it to index.html as module
        x. set main id to main-container
        xi. create router() function
        xii. set main_container innerHTML to HomeScreen.render()
        xiii. set load event of window to router() function
    5. Build Url Router
        i. create routes as route:screen object for home screen
        ii. create utils.js
        iii. export parseRequestURL()
        iv. set url as hash address split by slash
        v. return resource, id and verb of url
        vi. update router()
        vii. set request as parseRequestURL()
        viii. build parsedUrl and compare with routes
        ix. if route exists render it, else render Error404
        x. create screens/Error404.js and render error message
    6. Create Node.JS Server
        i. run npm init in root jsamazona folder
        ii. npm install express
        iii. create server.js
        iv. add start command as node backend/server.js
        v. require express
        vi. move data.js from frontend to backend
        vii. create route for /api/products
        viii. return products in data.js
        ix. run npm start
    7. Load Products From Backend
        i. edit HomeScreen.js
        ii. make render async
        iii. fetch products from '/api/products' in render()
        iv. make router() async and call await HomeScreen.render()
        v. use cors on backend
        vi. check the result
    8. Add Webpack
        i. cd frontend
        ii. npm install -D webpack webpack-cli webpack-dev-server
        iii. npm uninstall live-server
        iv. "start": "webpack-dev-server --mode development --watch-content-base --open"
        v. move index.html, style.css and images to frontend folder
        vi. rename app.js to index.js
        vii. update index.html
        viii. add script main.js before body tag
        ix. npm start
        x. npm install axios
        xi. change fetch to axios in HomeScreen
    9. Install Babel For ES6 Syntax
        i. npm install -D babel core, cli, node, preset-env
        ii. Create .babelrc and set presets to @babel/preset-env
        iii. npm install -D nodemon
        iv. set start: nodemon --watch backend --exec babel-node backend/server.js
        v. convert require to import in server.js
        vi. npm start
    10. Enable Code Linting
        i. npm install -D eslint
        ii. install VSCode eslint extension
        iii. create .eslintrc and set module.exports for env to node
        iv. Set VSCode setting for editor.codeActionsOnSave source.fixAll.eslint to true
        v. check result for linting error
        vi. npm install eslint-config-airbnb-base and eslint-plugin-import
        vii. set extends to airbnb-base
        viii. set parserOptions to ecmaVersion 11 and sourceType to module
        ix. set rules for no-console to 0 to ignore linting error
    11. Install VSCode Extension
        i. JavaScript (ES6) code snippets
        ii. ES7 React/Redux/GraphQL/React-Native snippets
        iii. Prettier - Code formatter
        iv. HTML&LESS grammar injections
    12. Create Rating Component
        i. create components/Rating.js
        ii. link to fontawesome.css in index.html
        iii. create div.rating
        iv. define Rating object with render()
        v. if !props.value return empty div
        vi. else use fa fa-star, fa-star-half-o and fa-star-o
        vii. last span for props.text || ''
        viii. style div.rating, span and last span
        ix. Edit HomeScreen
        x. Add div.product-rating and use Rating component
    13. Product Screen
        i. get product id from request
        ii. implement /api/product/:id api
        iii. send Ajax request to product api
    14. Product Screen UI
        i. create back to result link
        ii. create div.details with 3 columns
        iii. column 1 for product image
        iv. column 2 for product information
        v. column 3 form product action
        vi. style .details and all columns
        vii. create add to cart button with add-button id
    15. Product Screen Action
        i. after_render() to add event to the button
        ii. add event handler for the button
        iii. redirect user to cart/:product_id
        iv. implement after_render in index.js
    16. Add To Cart Action  on going
        i. create CartScreen.js
        ii. parseRequestUrl
        iii. getProduct(request.id)
        iv. addToCart
        v. getCartItems
        vi. cartItems.find
        vii. if existItem update qty
        viii. else add item
        ix. setCartItems
    17. Cart Screen UI  on going
        i. cartItems = getCartItems()
        ii. create 2 columns for cart items and cart action
        iii. cartItems.length === 0 ? cart is empty
        iv. show item image, name, qty and price
        v. cart action
        vi. Subtotal
        vii. Proceed to Checkout button
        viii. Add CSS Style
    18. Update and Delete Cart Items on going
        i. add qty select next to each item
        ii. after_render()
        iii. add change event to qty select
        iv. getCartItems() and pass to addToCart()
        v. set force to true to addToCart()
        vi. create rerender() as (component, areaName = 'content')
        vii. component.render and component.after_render
        viii. if force is true then rerender()
        ix. add delete button next to each item
        x. add click event to qty button
        xi. call removeFromCart(deleteButton.id)
        xii. implement removeFromCart(id)
        xiii. setCartItems( getCartItems().filter)
        xiv. if id === parseRequestUrl().id? redirect to '/cart'
        xv. else rerender(CartScreen);
    19. Connect To MongoDB and Create Admin User on going
        i. npm install mongoose
        ii. connect to mongodb
        iii. create config.js
        iv. npm install dotenv
        v. export MONGODB_URL
        vi. create models/userModel.js
        vii. create userSchema and userModel
        viii. create userRoute
        ix. create createadmin route
    20. Sign-in Screen UI   on going 
        i. create SigninScreen
        ii. render email and password fields
        iii. style signin form
    21. Sign-in Screen Backend
        i. create signin api in backend
        ii. create route for /api/users/signin
        iii. create check user name and password
        iv. if it is not ok the return 401 error
        v. install express-async-handler
        vi. wrap it in expressAsyncHandler
        vii. add error middleware in server.js
        viii. install Postman
        ix. send post request
        x. test with invalid user password
        xi. otherwise generate token
        xii. install jsonwebtoken
        xiii. set config.JWT_SECRET to somethingsecret
        xiv. add generateToken to utils.js
        xv. return token
        xvi. test with correct user and password
    22. Sign-in Screen Action
        i. after_render handle form submit
        ii. create signin request in frontend
        iii. show alert if email or password is incorrect
        iv. Add getUserInfo and setUserInfo to localStorage
        v. create Header component
        vi. if userInfo.email exist show user name otherwise show signin
    23. Create Progress Indicator and Alert Component
        i. create overlay loading div in index.html
        ii. Style overlay loading
        iii. create showLoading() function
        iv. set loading-overlay classList add active
        v. create hideLoading() function
        vi. create overlay message div in index.html
        vii. add style overlay message
        viii. create showMessage(message, callback)
        ix. document message-overlay set inner HTML
        x. div > div id message-overlay-content
        xi. show message
        xii. button id message-overlay-close-button OK
        xiii. add class active to it
        xiv. add event listener for button to call callback
    24. Register Screen
        i. create RegisterScreen.js
        ii. add form elements
        iii. after_render handle form submit
        iv. create register request in frontend
        v. create register api in backend
    25. User Profile Screen
        i. create ProfileScreen.js
        ii. add form elements
        iii. after_render handle form submit
        iv. create profile update request in frontend
        v. create profile update api in backend
        vi. create isAuth in utils.js and use in update profile
        vii. implement sign out
    26. Checkout Wizard
        i. create CheckoutSteps.js
        ii. create div elements for step 1 to 4
        iii. create redirectUser() in utils.js
        iv. copy profile screen and as shipping screen
        v. use CheckoutStep
        vi. define getShipping and setShipping
        vii. copy shipping screen and as payment screen
        viii. define getPayment and setPayment
        ix. redirect user to PlaceOrder.js
    27. PlaceOrder Screen UI
        i. create PlaceOrder.js
        ii. style elements
    28. PlaceOrder Screen Action
        i. handle place order button click
        ii. createOrder api
        iii. create orderModel
        iv. create orderRouter
        v. create post order route
    29. Order Screen
        i. create OrderScreen.js
        ii. style elements
    30. PayPal Payment
        i. get client id from paypal
        ii. set it in .env file
        iii. create route form /api/paypal/clientId
        iv. create getPaypalClientID in api.js
        v. add paypal checkout script in OrderScreen.js
        vi. show paypal button
        vii. update order after payment
        viii. create payOrder in api.js
        ix. create route for /:id/pay in orderRouter.js
        x. rerender after pay order
    31. Display Orders History
        i. create customer orders api
        ii. create api for getMyOrders
        iii. show orders in profile screen
        iv. style orders
    32. Admin Dashboard UI
        i. Header.js
        ii. if user is admin show Dashboard
        iii. create DashboardScreen
        iv. create DashboardMenu
        v. Style dashboard
    33. Admin Products UI
        i. create ProductListScreen.js
        ii. show products with edit and delete button
        iii. show create product button
    34. Create Product
        i. create product model
        ii. implement create product route
        iii. create product function in api.js
        iv. call create product function in ProductListScreen
        v. redirect to edit product
    35. Edit Product UI
        i. create ProductEditScreen.js
        ii. load product data from backend
        iii. handle form submit
        iv. save product in backend
    36. Edit Product Backend
        i. handle form submit
        ii. create updateProduct
        iii. save product in backend
    37. Upload Product Image
        i. npm install multer
        ii. create routes/uploadRoute.js
        iii. import express and multer
        iv. create disk storage with Date.now().jpg as filename
        v. set upload as multer({ storage })
        vi. router.post('/', upload.single('image'))
        vii. return req.file.path
        viii. app.use('/api/uploads',uploadRoute) in server.js
        ix. create uploads folder and put empty file.txt there.
        x. ProductEditScreen.js
        xi. create file input and set id to image-file
        xii. after_render() handle image-file change
        xiii. create form data
        xiv. call uploadProductImage()
        xv. create uploadProductImage in api.js
        xvi. update server.js
    38. Build Project
        i. create build script for frontend
        ii. create build script for backend
        iii. update sever.js to serve frontend build folder and uploads folder
        iv. stop running frontend
        v. npm run build
        vi. check localhost:5000 for running website and showing images
    39. Delete Product
        i. update ProductListScreen.js
        ii. handle delete button
        iii. rerender after deletion
    40. Admin Orders
        i. create Admin Order menu in header
        ii. create AdminOrder.js
        iii. load orders from backend
        iv. list them in the screen
        v. show delete and edit button
        vi. redirect to order details on edit action
    41. Deliver Order
        i. if order is payed show deliver button for admin
        ii. handle click on deliver button
        iii. set state to delivered
    42. Show Summary Report in Dashboard
        i. create summary section
        ii. style summary
        iii. create summary backend
        iv. create getSummary in api.js
        v. load data in dashboard screen
        vi. show 3 boxes for Users, Orders and Sales
    43. Show Chart in Dashboard
        i. import chartist
        ii. add chartist css to index.html
        iii. create linear chart for daily sales
        iv. create pie chart for product categories
    44. Publish heroku
        i. Create git repository
        ii. Create heroku account
        iii. install Heroku CLI
        iv. heroku login
        v. heroku apps:create jsamazona
        vi. Edit package.json for heroku-prebuild
        vii. Edit package.json for heroku-postbuild
        viii. Edit package.json for node engines
        ix. Create Procfile
        x. Edit server.js for PORT
        xi. Create mongodb atlas database
        xii. create MongoDB Account
        xiii. open cloud.mongodb.com
        xiv. add new user and save username and password
        xv. set Network Access to accept all requests
        xvi. Create new database
        xvii. create connection string based on db name and user and password
        xviii. Set Cloud MongoDB connection in heroku env variables
        xix. Commit and push
    45. Product Search Bar
        i. create search bar in Header.js
        ii. add style
        iii. handle submit form
        iv. edit parse url to get query string
        v. update product list api for search keyword
    46. Show Categories In Sidebar Menu
        i. create aside-open-button in Header.js
        ii. add event to open aside
        iii. create Aside.js component
        iv. Add style aside
        v. after render close it on click on close button
        vi. Use it in index.html
        vii. Update index.js to render aside 9.
        viii. call getCategories
        ix. create getCategories in api.js

note disini install mongoose@5.11.15 sbab ada bug jadi downgrae aja 
biar tidak ada warning
