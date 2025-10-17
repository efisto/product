# Product stranica

## Opis
Ovo je testni zadatak za Product stranicu i uključuje: 
  - Backend: Medusa 
  - Frontend: Next.js, Typescript, TailwindCSS 

Cilj zadatka je izraditi Product stranicu koja prikazuje proizvod 
i njegove detalje, te omogućuje odabir varijanti (boja i materijal)
Stranica također omogućuje dodavanje odabrane varijante u košaricu 
s odabranom količinom i pregled sadržaja košarice. 

## Upute za pokretanje

### 1. Instalirati PostgresSQL i postaviti default podatke: 
  - Username: postgres 
  - Password: postgres
  - Baza: medusa-product 

### 2. Klonirati repozitorij 
```
git clone https://github.com/efisto/product 
cd product
```
### 3. Instalirati ovisnosti 
```
cd backend 
yarn install 
cd ../frontend
yarn install 
cd .. 
```
### 4. Postavljanje .env u backend-u 
```
cd backend
cp .env.template .env
```
### 5. Pokretanje seed skripte
```
cd backend
yarn build
yarn medusa db:migrate
yarn seed
```
### 6. Stvaranje user-a
```
yarn medusa user -e test@test.com -p test
```
Podaci za prijavu u Medusa Admin:
  - Email: test@test.com
  - Password: test
  
### 7. Pokretanje backend i frontend projekta 
U root-u projekta
```
yarn dev
```
- Backend: http://localhost:9000/app
- Frontend: http://localhost:3000
### 8. Postavljanje ID proizvoda
Otvori http://localhost:9000/app i prijavi se s podacima.
Idi na Products i odaberi proizvod Cypress Retreat u URL-u u pregledniku pronađi ID proizvoda: http://localhost:9000/app/products/<PRODUCT_ID>. Kopiraj <PRODUCT_ID> i zalijepi ga u product/frontend/src/app/page.tsx u liniji 24 (const productId = “OVDJE ZALIJEPI”)

### 9. Postavljanje Publishable API key-a
Idi u Settings->Publishable API Keys
Kopiraj postojeći APi key i zalijepi ga u product/frontend/src/hooks/useProduct.ts u liniji 38 ("x-publishable-api-key": “OVDJE ZALIJEPI”)

## Procijenjeno vrijeme izrade
Približno 5 dana (ne punog radnog vremena)

## Kratkim osvrt na najzahtjevnije dijelove zadatka
Najzahtjevniji dio zadatka bio mi je razumjeti kako Medusa Admin radi, 
s obzirom da sam Medusu koristio/la prvi put, te kako povezati podatke 
unesene u admin sučelje s frontend aplikacijom kako bi se pravilno prikazivale 
varijante proizvoda. Također, prilikom izrade uputa za pokretanje problema su mi 
stvarali API ključevi i ID proizvoda — trebalo mi je vremena da shvatim kako to 
funkcionira, dakle opet Medusa Admin.
