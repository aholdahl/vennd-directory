--database name "vennd_directory"

CREATE TABLE access_type (
    id SERIAL PRIMARY KEY,
    clearance text NOT NULL
);

CREATE UNIQUE INDEX access_type_pk ON access_type(id int4_ops);

INSERT INTO "access_type" ("clearance") VALUES ('admin'), ('user'), ('guest');

CREATE TABLE business (
    id SERIAL PRIMARY KEY,
    name text NOT NULL UNIQUE,
    category_id integer REFERENCES categories(id) ON DELETE SET NULL,
    address text,
    city text,
    state_code character varying(3),
    zip text,
    image_url text,
    business_url text,
    google_places_url text,
    google_places_id text,
    verified boolean NOT NULL DEFAULT false,
    warning boolean NOT NULL DEFAULT false
);

CREATE UNIQUE INDEX business_pk ON business(id int4_ops);
CREATE UNIQUE INDEX business_name_key ON business(name text_ops);

INSERT INTO "business" ("name", "category_id", "address", "city", "state_code", "zip", "image_url", "business_url", "google_places_url", "verified", "warning") VALUES ('Prime Digital Academy',75,'301 S 4th Ave #577','Minneapolis','MN','55415','https://media.licdn.com/dms/image/C560BAQGmsyAb9AeMpA/company-logo_400_400/0?e=1576108800&v=beta&t=_8bqJJggYhCj9HVUksd5G_xoIFV_yVL-cjs3jH9Pi_w','https://primeacademy.io/','https://goo.gl/maps/86PUYHrudDFCrD819',true,false), ('Glam Doll Donuts',15,'2605 Nicollet Ave','Minneapolis','MN','55408','https://scontent-msp1-1.xx.fbcdn.net/v/t1.0-9/69355500_2428811297165027_8789016634091110400_n.jpg?_nc_cat=103&_nc_oc=AQmxr4sqcmX1PfCyT6IHNaWh9jZ02m6xvM1sgbUH8mUa2jUY_04o5eBV599KPSVAUXI&_nc_ht=scontent-msp1-1.xx&oh=1188dc86805d12176f0a1fc563e7245d&oe=5DF465C7','https://glamdolldonuts.com/','https://g.page/glamdolldonutsmpls?share', 'true','false');

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    description text NOT NULL
);

CREATE UNIQUE INDEX categories_pk ON categories(id int4_ops);

INSERT INTO "categories" ("description") VALUES ('accounting'),('airport'),('amusement park'),('aquarium'),('art gallery'),('atm'),('bakery'),('bank'),('bar'),('beauty salon'),('bicycle store'),('book store'),('bowling alley'),('bus station'),('cafe'),('campground'),('car dealer'),('car rental'),('car repair'),('car wash'),('casino'),('cemetery'),('church'),('city hall'),('clothing store'),('convenience store'),('courthouse'),('dentist'),('department store'),('doctor'),('electrician'),('electronics store'),('embassy'),('fire station'),('florist'),('funeral home'),('furniture store'),('gas station'),('gym'),('hair care'),('hardware store'),('hindu temple'),('home goods store'),('hospital'),('insurance agency'),('jewelry store'),('laundry'),('lawyer'),('library'),('liquor store'),('local government office'),('locksmith'),('lodging'),('meal delivery'),('meal takeaway'),('mosque'),('movie rental'),('movie theater'),('moving company'),('museum'),('night club'),('painter'),('park'),('parking'),('pet store'),('pharmacy'),('physiotherapist'),('plumber'),('police'),('post office'),('real estate agency'),('restaurant'),('roofing contractor'),('rv park'),('school'),('shoe store'),('shopping mall'),('spa'),('stadium'),('storage'),('store'),('subway station'),('supermarket'),('synagogue'),('taxi stand'),('train station'),('transit station'),('travel agency'),('veterinary care'),('zoo');

CREATE TABLE demographics (
    id SERIAL PRIMARY KEY,
    general text NOT NULL,
    specific text NOT NULL
);

CREATE UNIQUE INDEX demographics_pk ON demographics(id int4_ops);

INSERT INTO "demographics" ("specific", "general") VALUES ('gay','gender/relationships'), ('lesbian','gender/relationships'), ('bisexual','gender/relationships'),('trans','gender/relationships'), ('queer','gender/relationships'), ('intersex','gender/relationships'), ('agender','gender/relationships'), ('pansexual','gender/relationships'), ('non-binary','gender/relationships'), ('genderfluid','gender/relationships'), ('african-american','heritage'),('asian-american','heritage'),('latinx','heritage'),('first-nations','heritage'), ('mobility-impaired','disabled'),('visually-impaired','disabled'),('hearing-impaired','disabled'),('neuro-diverse','disabled');

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    business_id integer NOT NULL REFERENCES business(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX favorites_pk ON favorites(id int4_ops);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    business_id integer NOT NULL REFERENCES business(id) ON DELETE CASCADE,
    user_rating integer
);

CREATE UNIQUE INDEX ratings_pk ON ratings(id int4_ops);

CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    access_id integer NOT NULL DEFAULT 2 REFERENCES access_type(id) ON DELETE SET DEFAULT
);

CREATE UNIQUE INDEX user_pk ON user(id int4_ops);
CREATE UNIQUE INDEX user_username_key ON user(username text_ops);

CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    business_id integer NOT NULL REFERENCES business(id) ON DELETE CASCADE,
    demographic_id integer NOT NULL REFERENCES demographics(id) ON DELETE CASCADE,
    vote text
);

CREATE UNIQUE INDEX votes_pk ON votes(id int4_ops);

--STRETCH

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id integer NOT NULL REFERENCES user(id) ON DELETE SET NULL,
    message character varying(160) NOT NULL
);

CREATE UNIQUE INDEX messages_pk ON messages(id int4_ops);

CREATE TABLE save_for_later (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    business_id integer NOT NULL REFERENCES business(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX save_for_later_pk ON save_for_later(id int4_ops);

CREATE TABLE user_demographics (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    demographic_id integer NOT NULL REFERENCES demographics(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX user_demographics_pk ON user_demographics(id int4_ops);