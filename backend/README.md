# Database Setup

- Create `capstone` databsase in mysql -- not needed 
- Run both `.sql` scripts to create tables and alter them - not needed
- Run `npm run prisma:init` to init Prisma folder - not needed if prisma folder is already there
- Change `db.Provider` in Prisma schema to "mysql"
- Run `npm run prisma:dbpull` to generate final schema/models - only done when prisma schema is not already generated
- Run `npm run prisma:dbpush` to generate tables in database

## To Generate Fake Data in DB

- Make sure you have ran `npm run prisma:generate` just to be safe!
- Run `npm run db:generate:data`
