# Diff Details

Date : 2022-06-23 10:49:17

Directory /Users/tiagosilva/Desktop/BackEndDealIt

Total : 78 files,  8273 codes, -46 comments, 465 blanks, all 8692 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [babel.config.js](/babel.config.js) | JavaScript | 4 | 0 | 3 | 7 |
| [client.ts](/client.ts) | TypeScript | 3 | 0 | 1 | 4 |
| [jest.config.js](/jest.config.js) | JavaScript | 11 | 3 | 3 | 17 |
| [package-lock.json](/package-lock.json) | JSON | 4,118 | 0 | 0 | 4,118 |
| [package.json](/package.json) | JSON | 21 | 0 | 2 | 23 |
| [prisma/migrations/20220613120815_v3/migration.sql](/prisma/migrations/20220613120815_v3/migration.sql) | SQL | -85 | -21 | -29 | -135 |
| [prisma/migrations/20220615135746_v10/migration.sql](/prisma/migrations/20220615135746_v10/migration.sql) | SQL | 88 | 22 | 30 | 140 |
| [prisma/migrations/20220615154426_v6/migration.sql](/prisma/migrations/20220615154426_v6/migration.sql) | SQL | 88 | 22 | 30 | 140 |
| [prisma/schema.prisma](/prisma/schema.prisma) | Prisma | 2 | -2 | -1 | -1 |
| [src/application/__tests__/addresses.test.ts](/src/application/__tests__/addresses.test.ts) | TypeScript | 238 | 1 | 33 | 272 |
| [src/application/__tests__/auth.test.ts](/src/application/__tests__/auth.test.ts) | TypeScript | 48 | 1 | 11 | 60 |
| [src/application/__tests__/categories.test.ts](/src/application/__tests__/categories.test.ts) | TypeScript | 109 | 0 | 13 | 122 |
| [src/application/__tests__/completion.test.ts](/src/application/__tests__/completion.test.ts) | TypeScript | 43 | 0 | 8 | 51 |
| [src/application/__tests__/creditCards.test.ts](/src/application/__tests__/creditCards.test.ts) | TypeScript | 190 | 0 | 28 | 218 |
| [src/application/__tests__/orders.test.ts](/src/application/__tests__/orders.test.ts) | TypeScript | 229 | 0 | 38 | 267 |
| [src/application/__tests__/products.test.ts](/src/application/__tests__/products.test.ts) | TypeScript | 346 | 0 | 47 | 393 |
| [src/application/__tests__/reviews.test.ts](/src/application/__tests__/reviews.test.ts) | TypeScript | 304 | 0 | 38 | 342 |
| [src/application/__tests__/users.test.ts](/src/application/__tests__/users.test.ts) | TypeScript | 294 | 0 | 46 | 340 |
| [src/application/addresses.ts](/src/application/addresses.ts) | TypeScript | 136 | 0 | 5 | 141 |
| [src/application/auth.ts](/src/application/auth.ts) | TypeScript | 79 | 0 | 0 | 79 |
| [src/application/categories.ts](/src/application/categories.ts) | TypeScript | 24 | 0 | 1 | 25 |
| [src/application/completion.ts](/src/application/completion.ts) | TypeScript | 27 | 0 | 2 | 29 |
| [src/application/creditCards.ts](/src/application/creditCards.ts) | TypeScript | 101 | 0 | 5 | 106 |
| [src/application/index.ts](/src/application/index.ts) | TypeScript | 92 | 5 | 13 | 110 |
| [src/application/orders.ts](/src/application/orders.ts) | TypeScript | 162 | 0 | 7 | 169 |
| [src/application/products.ts](/src/application/products.ts) | TypeScript | 39 | 0 | 4 | 43 |
| [src/application/reviews.ts](/src/application/reviews.ts) | TypeScript | 166 | 0 | 7 | 173 |
| [src/application/users.ts](/src/application/users.ts) | TypeScript | 65 | 0 | 5 | 70 |
| [src/domain/__tests__/domainFunctions.test.ts](/src/domain/__tests__/domainFunctions.test.ts) | TypeScript | 270 | 0 | 39 | 309 |
| [src/domain/addresses/get-addressAuto.ts](/src/domain/addresses/get-addressAuto.ts) | TypeScript | 3 | 0 | 3 | 6 |
| [src/domain/addresses/get-addressByUserId.ts](/src/domain/addresses/get-addressByUserId.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/addresses/patch-adressIsFavorite.ts](/src/domain/addresses/patch-adressIsFavorite.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/addresses/post-address.ts](/src/domain/addresses/post-address.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/auth/post-login.ts](/src/domain/auth/post-login.ts) | TypeScript | 9 | 0 | 0 | 9 |
| [src/domain/auth/post-user.ts](/src/domain/auth/post-user.ts) | TypeScript | 0 | 0 | -1 | -1 |
| [src/domain/auth/verifyToken.ts](/src/domain/auth/verifyToken.ts) | TypeScript | -32 | 0 | -5 | -37 |
| [src/domain/categories/get-allMainCategories.ts](/src/domain/categories/get-allMainCategories.ts) | TypeScript | 10 | 0 | 0 | 10 |
| [src/domain/categories/get-categoryById.ts](/src/domain/categories/get-categoryById.ts) | TypeScript | 12 | 0 | 0 | 12 |
| [src/domain/completion/get-textCompletion.ts](/src/domain/completion/get-textCompletion.ts) | TypeScript | 6 | 0 | 2 | 8 |
| [src/domain/creditCards/get-creditCardsByUserId.ts](/src/domain/creditCards/get-creditCardsByUserId.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/creditCards/patch-setFavorite.ts](/src/domain/creditCards/patch-setFavorite.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/creditCards/post-creditCard.ts](/src/domain/creditCards/post-creditCard.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/orders/get-ordersByUserId.ts](/src/domain/orders/get-ordersByUserId.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/orders/patch-orderDeliveryDate.ts](/src/domain/orders/patch-orderDeliveryDate.ts) | TypeScript | 6 | 0 | 2 | 8 |
| [src/domain/orders/patch-orderSendDate.ts](/src/domain/orders/patch-orderSendDate.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/orders/post-order.ts](/src/domain/orders/post-order.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/products/get-allProductsPaginated.ts](/src/domain/products/get-allProductsPaginated.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/domain/products/get-latestProducts.ts](/src/domain/products/get-latestProducts.ts) | TypeScript | -3 | 0 | -2 | -5 |
| [src/domain/products/get-productById.ts](/src/domain/products/get-productById.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [src/domain/products/get-productsByCategoryPaginated.ts](/src/domain/products/get-productsByCategoryPaginated.ts) | TypeScript | 5 | 0 | 0 | 5 |
| [src/domain/products/get-productsByUserId.ts](/src/domain/products/get-productsByUserId.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [src/domain/products/patch-product.ts](/src/domain/products/patch-product.ts) | TypeScript | 5 | 0 | 2 | 7 |
| [src/domain/products/post-product.ts](/src/domain/products/post-product.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/domain/reviews/get-reviewsByProductId.ts](/src/domain/reviews/get-reviewsByProductId.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [src/domain/reviews/get-reviewsByReviewer.ts](/src/domain/reviews/get-reviewsByReviewer.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/reviews/get-reviewsByUserId.ts](/src/domain/reviews/get-reviewsByUserId.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [src/domain/reviews/post-review.ts](/src/domain/reviews/post-review.ts) | TypeScript | 5 | 0 | 2 | 7 |
| [src/domain/users/get-UserById.ts](/src/domain/users/get-UserById.ts) | TypeScript | 11 | 0 | 2 | 13 |
| [src/domain/users/get-allUsers.ts](/src/domain/users/get-allUsers.ts) | TypeScript | 8 | 0 | 2 | 10 |
| [src/domain/users/get-userById.ts](/src/domain/users/get-userById.ts) | TypeScript | -2 | 0 | -2 | -4 |
| [src/domain/users/get-userByToken.ts](/src/domain/users/get-userByToken.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [src/domain/users/get-userOrdersById.ts](/src/domain/users/get-userOrdersById.ts) | TypeScript | -2 | 0 | -2 | -4 |
| [src/domain/users/patch-user.ts](/src/domain/users/patch-user.ts) | TypeScript | 5 | 0 | 2 | 7 |
| [src/index.ts](/src/index.ts) | TypeScript | 33 | 8 | 2 | 43 |
| [src/infrastructure/addresses-repository.ts](/src/infrastructure/addresses-repository.ts) | TypeScript | 71 | 0 | 7 | 78 |
| [src/infrastructure/categories-repository.ts](/src/infrastructure/categories-repository.ts) | TypeScript | 17 | 0 | -2 | 15 |
| [src/infrastructure/completion-repository.ts](/src/infrastructure/completion-repository.ts) | TypeScript | 28 | 0 | 4 | 32 |
| [src/infrastructure/creditCards-repository.ts](/src/infrastructure/creditCards-repository.ts) | TypeScript | 57 | 0 | 7 | 64 |
| [src/infrastructure/orders-repository.ts](/src/infrastructure/orders-repository.ts) | TypeScript | 62 | 0 | 6 | 68 |
| [src/infrastructure/products-repository.ts](/src/infrastructure/products-repository.ts) | TypeScript | 62 | 0 | 3 | 65 |
| [src/infrastructure/reviews-repository.ts](/src/infrastructure/reviews-repository.ts) | TypeScript | 101 | 0 | 6 | 107 |
| [src/infrastructure/users-repository.ts](/src/infrastructure/users-repository.ts) | TypeScript | 74 | 1 | 6 | 81 |
| [src/types.ts](/src/types.ts) | TypeScript | -31 | 0 | -2 | -33 |
| [src/utils.ts](/src/utils.ts) | TypeScript | -27 | 0 | -9 | -36 |
| [src/utils/types.ts](/src/utils/types.ts) | TypeScript | 74 | 0 | 7 | 81 |
| [src/utils/utils.ts](/src/utils/utils.ts) | TypeScript | 371 | 0 | 12 | 383 |
| [src/utils/verifyToken.ts](/src/utils/verifyToken.ts) | TypeScript | 36 | 0 | 3 | 39 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | 2 | -86 | -5 | -89 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details