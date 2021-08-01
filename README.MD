
# TRAC-BACK App

 ## What is it?
 This is a basic API that orchestrates operations between entities, companies, assets, and units.

It was made with [Typescript](https://www.typescriptlang.org), [Mongoose](https://mongoosejs.com/),
and [Express](https://expressjs.com/pt-br/)

### [Demo] https://tracback.herokuapp.com/
  
## Available Scripts

  

In the project directory, you can run:

  

### `yarn dev`

  

Runs the app in the development mode.\

Open [http://localhost:700](http://localhost:700) to view it in the browser.


## Avaiable Routes

``` typescript 
// Company Routes
get("/company", findAll);
get("/company/:company_id", findById);
delete("/company/:company_id", removeById);
post("/company", store);

// Unit Routes
post("/company/:company_id/unit", store);
get("/unit", findAll);
get("/unit/:unit_id", findById);
delete("/unit/:unit_id", removeById);

// Assets Routes
post("/unit/:unit_id/asset", store);
get("/asset", findAll);
get("/asset/:asset_id", findById);
delete("/asset/:asset_id", removeById);
patch("/asset/:asset_id", update);
```

## Missing funcionalities
- Users and Authentication	
- Unit tests