--database name "prime_app"

--DBDesigner formats the information very differently from how we were taught.
--I tried to update the code to match what we've learned, but it was throwing errors.

CREATE TABLE "business" (
    "id" serial NOT NULL,
    "name" TEXT UNIQUE NOT NULL,
    "category_id" integer,
    "address" TEXT,
	"city" TEXT,
	"state_code" VARCHAR (3),
	"zip" TEXT,
    "image_url" TEXT,
    "business_url" TEXT,
    "google_places_url" TEXT,
    "google_places_id" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "warning" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "business_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "user" (
    "id" serial NOT NULL,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "access_id" integer NOT NULL DEFAULT 2,
    CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "favorites" (
    "id" serial NOT NULL,
    "user_id" integer NOT NULL,
    "business_id" integer NOT NULL,
    CONSTRAINT "favorites_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "votes" (
    "id" serial NOT NULL,
    "user_id" integer NOT NULL,
    "business_id" integer NOT NULL,
    "demographic_id" integer NOT NULL,
    "vote" TEXT,
    CONSTRAINT "votes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "demographics" (
    "id" serial NOT NULL,
    "general" TEXT NOT NULL,
    "specific" TEXT NOT NULL,
    CONSTRAINT "demographics_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "user_demographics" (
    "id" serial NOT NULL,
    "user_id" integer NOT NULL,
    "demographic_id" integer NOT NULL,
    CONSTRAINT "user_demographics_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "save_for_later" (
    "id" serial NOT NULL,
    "user_id" integer NOT NULL,
    "business_id" integer NOT NULL,
    CONSTRAINT "save_for_later_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "messages" (
    "id" serial NOT NULL,
    "sender_id" integer NOT NULL,
    "message" varchar(160) NOT NULL,
    CONSTRAINT "messages_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "categories" (
    "id" serial NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "ratings" (
    "id" serial NOT NULL,
    "user_id" integer NOT NULL,
    "business_id" integer NOT NULL,
    "user_rating" integer,
    CONSTRAINT "ratings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "access_type" (
    "id" serial NOT NULL,
    "clearance" TEXT NOT NULL,
    CONSTRAINT "access_type_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

--

ALTER TABLE "business" ADD CONSTRAINT "business_fk0" FOREIGN KEY ("category_id") REFERENCES "categories"("id");

ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("access_id") REFERENCES "access_type"("id");

ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk1" FOREIGN KEY ("business_id") REFERENCES "business"("id");

ALTER TABLE "votes" ADD CONSTRAINT "votes_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "votes" ADD CONSTRAINT "votes_fk1" FOREIGN KEY ("business_id") REFERENCES "business"("id");
ALTER TABLE "votes" ADD CONSTRAINT "votes_fk2" FOREIGN KEY ("demographic_id") REFERENCES "demographics"("id");

ALTER TABLE "user_demographics" ADD CONSTRAINT "user_demographics_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "user_demographics" ADD CONSTRAINT "user_demographics_fk1" FOREIGN KEY ("demographic_id") REFERENCES "demographics"("id");

ALTER TABLE "save_for_later" ADD CONSTRAINT "save_for_later_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "save_for_later" ADD CONSTRAINT "save_for_later_fk1" FOREIGN KEY ("business_id") REFERENCES "business"("id");

ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("sender_id") REFERENCES "user"("id");

ALTER TABLE "ratings" ADD CONSTRAINT "ratings_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_fk1" FOREIGN KEY ("business_id") REFERENCES "business"("id");

--

INSERT INTO "access_type" ("clearance") VALUES ('admin'), ('user'), ('guest');

INSERT INTO "categories" ("description") VALUES ('accounting'),('airport'),('amusement park'),('aquarium'),('art gallery'),('atm'),('bakery'),('bank'),('bar'),('beauty salon'),('bicycle store'),('book store'),('bowling alley'),('bus station'),('cafe'),('campground'),('car dealer'),('car rental'),('car repair'),('car wash'),('casino'),('cemetery'),('church'),('city hall'),('clothing store'),('convenience store'),('courthouse'),('dentist'),('department store'),('doctor'),('electrician'),('electronics store'),('embassy'),('fire station'),('florist'),('funeral home'),('furniture store'),('gas station'),('gym'),('hair care'),('hardware store'),('hindu temple'),('home goods store'),('hospital'),('insurance agency'),('jewelry store'),('laundry'),('lawyer'),('library'),('liquor store'),('local government office'),('locksmith'),('lodging'),('meal delivery'),('meal takeaway'),('mosque'),('movie rental'),('movie theater'),('moving company'),('museum'),('night club'),('painter'),('park'),('parking'),('pet store'),('pharmacy'),('physiotherapist'),('plumber'),('police'),('post office'),('real estate agency'),('restaurant'),('roofing contractor'),('rv park'),('school'),('shoe store'),('shopping mall'),('spa'),('stadium'),('storage'),('store'),('subway station'),('supermarket'),('synagogue'),('taxi stand'),('train station'),('transit station'),('travel agency'),('veterinary care'),('zoo');

INSERT INTO "demographics" ("specific", "general") VALUES ('gay','gender/relationships'), ('lesbian','gender/relationships'), ('bisexual','gender/relationships'),('trans','gender/relationships'), ('queer','gender/relationships'), ('intersex','gender/relationships'), ('agender','gender/relationships'), ('pansexual','gender/relationships'), ('non-binary','gender/relationships'), ('genderfluid','gender/relationships'), ('african-american','heritage'),('asian-american','heritage'),('latinx','heritage'),('first-nations','heritage'), ('mobility-impaired','disabled'),('visually-impaired','disabled'),('hearing-impaired','disabled'),('neuro-diverse','disabled');

INSERT INTO "business" ("name", "category_id", "address", "city", "state_code", "zip", "image_url", "business_url", "google_places_url", "verified", "warning") VALUES ('Prime Digital Academy',75,'301 S 4th Ave #577', 'Minneapolis', 'MN', '55415','https://media.licdn.com/dms/image/C560BAQGmsyAb9AeMpA/company-logo_400_400/0?e=1576108800&v=beta&t=_8bqJJggYhCj9HVUksd5G_xoIFV_yVL-cjs3jH9Pi_w','https://primeacademy.io/','https://goo.gl/maps/Pg98PYXSUYe1vHtp6',true,false), ('Glam Doll Donuts',15,'2605 Nicollet Ave', 'Minneapolis','MN','55408','https://scontent-msp1-1.xx.fbcdn.net/v/t1.0-9/69355500_2428811297165027_8789016634091110400_n.jpg?_nc_cat=103&_nc_oc=AQmxr4sqcmX1PfCyT6IHNaWh9jZ02m6xvM1sgbUH8mUa2jUY_04o5eBV599KPSVAUXI&_nc_ht=scontent-msp1-1.xx&oh=1188dc86805d12176f0a1fc563e7245d&oe=5DF465C7','https://glamdolldonuts.com/','https://g.page/glamdolldonutsmpls?share', 'true','false');

SELECT * FROM "business" FULL OUTER JOIN "favorites" ON "business"."id" = "favorites"."business_id";

