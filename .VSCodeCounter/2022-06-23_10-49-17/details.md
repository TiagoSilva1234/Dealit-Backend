# Details

Date : 2022-06-23 10:49:17

Directory /Users/tiagosilva/Desktop/BackEndDealIt

Total : 71 files,  17552 codes, 73 comments, 635 blanks, all 18260 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [babel.config.js](/babel.config.js) | JavaScript | 4 | 0 | 3 | 7 |
| [client.ts](/client.ts) | TypeScript | 3 | 0 | 1 | 4 |
| [jest.config.js](/jest.config.js) | JavaScript | 11 | 3 | 3 | 17 |
| [package-lock.json](/package-lock.json) | JSON | 12,320 | 0 | 1 | 12,321 |
| [package.json](/package.json) | JSON | 59 | 0 | 3 | 62 |
| [prisma/migrations/20220615135746_v10/migration.sql](/prisma/migrations/20220615135746_v10/migration.sql) | SQL | 88 | 22 | 30 | 140 |
| [prisma/migrations/20220615154426_v6/migration.sql](/prisma/migrations/20220615154426_v6/migration.sql) | SQL | 88 | 22 | 30 | 140 |
| [prisma/schema.prisma](/prisma/schema.prisma) | Prisma | 94 | 0 | 11 | 105 |
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
| [src/application/auth.ts](/src/application/auth.ts) | TypeScript | 201 | 0 | 12 | 213 |
| [src/application/categories.ts](/src/application/categories.ts) | TypeScript | 47 | 1 | 3 | 51 |
| [src/application/completion.ts](/src/application/completion.ts) | TypeScript | 27 | 0 | 2 | 29 |
| [src/application/creditCards.ts](/src/application/creditCards.ts) | TypeScript | 101 | 0 | 5 | 106 |
| [src/application/index.ts](/src/application/index.ts) | TypeScript | 131 | 9 | 18 | 158 |
| [src/application/orders.ts](/src/application/orders.ts) | TypeScript | 162 | 0 | 7 | 169 |
| [src/application/products.ts](/src/application/products.ts) | TypeScript | 211 | 1 | 15 | 227 |
| [src/application/reviews.ts](/src/application/reviews.ts) | TypeScript | 166 | 0 | 7 | 173 |
| [src/application/users.ts](/src/application/users.ts) | TypeScript | 134 | 1 | 8 | 143 |
| [src/domain/__tests__/domainFunctions.test.ts](/src/domain/__tests__/domainFunctions.test.ts) | TypeScript | 270 | 0 | 39 | 309 |
| [src/domain/addresses/get-addressAuto.ts](/src/domain/addresses/get-addressAuto.ts) | TypeScript | 3 | 0 | 3 | 6 |
| [src/domain/addresses/get-addressByUserId.ts](/src/domain/addresses/get-addressByUserId.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/addresses/patch-adressIsFavorite.ts](/src/domain/addresses/patch-adressIsFavorite.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/addresses/post-address.ts](/src/domain/addresses/post-address.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/auth/post-login.ts](/src/domain/auth/post-login.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [src/domain/auth/post-user.ts](/src/domain/auth/post-user.ts) | TypeScript | 5 | 0 | 2 | 7 |
| [src/domain/categories/get-allMainCategories.ts](/src/domain/categories/get-allMainCategories.ts) | TypeScript | 12 | 0 | 2 | 14 |
| [src/domain/categories/get-categoryById.ts](/src/domain/categories/get-categoryById.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [src/domain/completion/get-textCompletion.ts](/src/domain/completion/get-textCompletion.ts) | TypeScript | 6 | 0 | 2 | 8 |
| [src/domain/creditCards/get-creditCardsByUserId.ts](/src/domain/creditCards/get-creditCardsByUserId.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/creditCards/patch-setFavorite.ts](/src/domain/creditCards/patch-setFavorite.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/creditCards/post-creditCard.ts](/src/domain/creditCards/post-creditCard.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/orders/get-ordersByUserId.ts](/src/domain/orders/get-ordersByUserId.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/orders/patch-orderDeliveryDate.ts](/src/domain/orders/patch-orderDeliveryDate.ts) | TypeScript | 6 | 0 | 2 | 8 |
| [src/domain/orders/patch-orderSendDate.ts](/src/domain/orders/patch-orderSendDate.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/orders/post-order.ts](/src/domain/orders/post-order.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/products/get-allProductsPaginated.ts](/src/domain/products/get-allProductsPaginated.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/products/get-productById.ts](/src/domain/products/get-productById.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/products/get-productsByCategoryPaginated.ts](/src/domain/products/get-productsByCategoryPaginated.ts) | TypeScript | 8 | 0 | 2 | 10 |
| [src/domain/products/get-productsByUserId.ts](/src/domain/products/get-productsByUserId.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/products/patch-product.ts](/src/domain/products/patch-product.ts) | TypeScript | 5 | 0 | 2 | 7 |
| [src/domain/products/post-product.ts](/src/domain/products/post-product.ts) | TypeScript | 6 | 0 | 2 | 8 |
| [src/domain/reviews/get-reviewsByProductId.ts](/src/domain/reviews/get-reviewsByProductId.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [src/domain/reviews/get-reviewsByReviewer.ts](/src/domain/reviews/get-reviewsByReviewer.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/domain/reviews/get-reviewsByUserId.ts](/src/domain/reviews/get-reviewsByUserId.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [src/domain/reviews/post-review.ts](/src/domain/reviews/post-review.ts) | TypeScript | 5 | 0 | 2 | 7 |
| [src/domain/users/get-UserById.ts](/src/domain/users/get-UserById.ts) | TypeScript | 11 | 0 | 2 | 13 |
| [src/domain/users/get-allUsers.ts](/src/domain/users/get-allUsers.ts) | TypeScript | 8 | 0 | 2 | 10 |
| [src/domain/users/get-userByToken.ts](/src/domain/users/get-userByToken.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [src/domain/users/patch-user.ts](/src/domain/users/patch-user.ts) | TypeScript | 5 | 0 | 2 | 7 |
| [src/index.ts](/src/index.ts) | TypeScript | 75 | 8 | 13 | 96 |
| [src/infrastructure/addresses-repository.ts](/src/infrastructure/addresses-repository.ts) | TypeScript | 71 | 0 | 7 | 78 |
| [src/infrastructure/categories-repository.ts](/src/infrastructure/categories-repository.ts) | TypeScript | 65 | 0 | 5 | 70 |
| [src/infrastructure/completion-repository.ts](/src/infrastructure/completion-repository.ts) | TypeScript | 28 | 0 | 4 | 32 |
| [src/infrastructure/creditCards-repository.ts](/src/infrastructure/creditCards-repository.ts) | TypeScript | 57 | 0 | 7 | 64 |
| [src/infrastructure/orders-repository.ts](/src/infrastructure/orders-repository.ts) | TypeScript | 62 | 0 | 6 | 68 |
| [src/infrastructure/products-repository.ts](/src/infrastructure/products-repository.ts) | TypeScript | 166 | 3 | 15 | 184 |
| [src/infrastructure/reviews-repository.ts](/src/infrastructure/reviews-repository.ts) | TypeScript | 101 | 0 | 6 | 107 |
| [src/infrastructure/users-repository.ts](/src/infrastructure/users-repository.ts) | TypeScript | 182 | 1 | 18 | 201 |
| [src/utils/types.ts](/src/utils/types.ts) | TypeScript | 74 | 0 | 7 | 81 |
| [src/utils/utils.ts](/src/utils/utils.ts) | TypeScript | 371 | 0 | 12 | 383 |
| [src/utils/verifyToken.ts](/src/utils/verifyToken.ts) | TypeScript | 36 | 0 | 3 | 39 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | 12 | 0 | 6 | 18 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)