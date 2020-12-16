# zen2woo
Script that migrates zen cart stores to woocommerce.

**Setup** 
***Local***

Install local Node/Yarn and mongoDb server.

`yarn`

`yarn run`

Server runs at localhost:3000

***Docker***

`cd zen2woo`

`docker-compose up -d`

---

Restfull routes:

localhost:3000/import
Loads data from Zen Cart api(see bellow) and stores it in local mongo db.
localhost:3000/export
Formats data and sends it to WooCommerce api.

Backend zen cart API

http://www.outofbodypiercings.com/wpoob/?attributes

http://www.outofbodypiercings.com/wpoob/?products

http://www.outofbodypiercings.com/wpoob/?categories

{returns} json response.

MVC structure:

classes/

Contains setting files for mongo database:

zen2woo/classes/database.js

Contains string pointing to local or remote mongo addreess.

zen2woo/classes/woocommerce.js

Configuration for woocommerce api

zen2woo/classes/import.js

Contains functions that load json from Zen cart api.

classes/migrate/

Classes that format data from mongodb after import, via async methods posts to woocommere api.
Each belongs to an entity such as products, categories, attributes and terms.

classes/schema classes/models

Handles mongoose orm mapping for mongodb

---

controllers/

Handles importing of data and exporting via classes and mongodb

---

views/

Not used

---

WooCommerce is hosted on Digital Ocean server.
It is not for production, so can be rebuilt as needed.
