# codecademy-ecommerce-rest-api
A project to practice Node/Express REST API to provide typical functionality found in an ecommerce website.  Users can create accounts, view products, add products to a cart, and place/view orders.

## Running the app
To run locally, `npm install`, then `npm start` from the root directory, and 'npm start' from within the src/view directory. 

This project requires a [PostgreSQL](https://www.postgresql.org/) database to be running locally.


## Testing
Swagger documentation available at `http://localhost:3000/docs`

You can use various HTTP clients such as [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to make requests to the API endpoints.

**Note:** Some endpoints are protected and require authentication.  In order to properly access these endpoints, you will need to have a session cookie present when making your request.  This is accessed by hitting the `/auth/login` endpoint first.  HTTP clients will automatically store cookies and send them with subsequent requests.
