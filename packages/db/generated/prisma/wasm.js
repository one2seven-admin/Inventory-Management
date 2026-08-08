
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  passwordHash: 'passwordHash',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  restaurantId: 'restaurantId'
};

exports.Prisma.RestaurantScalarFieldEnum = {
  id: 'id',
  name: 'name',
  ownerUserId: 'ownerUserId',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.UserRoleScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  role: 'role'
};

exports.Prisma.UserLocationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  locationId: 'locationId'
};

exports.Prisma.RefreshTokenScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  tokenHash: 'tokenHash',
  restaurantId: 'restaurantId',
  rememberMe: 'rememberMe',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  revokedAt: 'revokedAt'
};

exports.Prisma.LocationScalarFieldEnum = {
  id: 'id',
  restaurantId: 'restaurantId',
  name: 'name',
  type: 'type',
  address: 'address',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.StorageAreaScalarFieldEnum = {
  id: 'id',
  locationId: 'locationId',
  name: 'name',
  type: 'type'
};

exports.Prisma.ItemScalarFieldEnum = {
  id: 'id',
  sku: 'sku',
  name: 'name',
  category: 'category',
  subCategory: 'subCategory',
  description: 'description',
  imageUrl: 'imageUrl',
  barcode: 'barcode',
  purchaseUom: 'purchaseUom',
  stockUom: 'stockUom',
  recipeUom: 'recipeUom',
  purchaseToStockFactor: 'purchaseToStockFactor',
  stockToRecipeFactor: 'stockToRecipeFactor',
  isPerishable: 'isPerishable',
  defaultShelfLifeDays: 'defaultShelfLifeDays',
  lastPurchasePrice: 'lastPurchasePrice',
  averageCost: 'averageCost',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StockLevelScalarFieldEnum = {
  id: 'id',
  itemId: 'itemId',
  locationId: 'locationId',
  quantityOnHand: 'quantityOnHand',
  parLevel: 'parLevel',
  minLevel: 'minLevel',
  maxLevel: 'maxLevel'
};

exports.Prisma.StockTransactionScalarFieldEnum = {
  id: 'id',
  itemId: 'itemId',
  locationId: 'locationId',
  storageAreaId: 'storageAreaId',
  type: 'type',
  quantity: 'quantity',
  runningBalance: 'runningBalance',
  unitCost: 'unitCost',
  batchId: 'batchId',
  referenceType: 'referenceType',
  referenceId: 'referenceId',
  reasonCode: 'reasonCode',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.BatchScalarFieldEnum = {
  id: 'id',
  itemId: 'itemId',
  locationId: 'locationId',
  batchNumber: 'batchNumber',
  expiryDate: 'expiryDate',
  receivedQuantity: 'receivedQuantity',
  remainingQuantity: 'remainingQuantity',
  unitCost: 'unitCost',
  createdAt: 'createdAt'
};

exports.Prisma.WastageLogScalarFieldEnum = {
  id: 'id',
  itemId: 'itemId',
  locationId: 'locationId',
  station: 'station',
  quantity: 'quantity',
  reason: 'reason',
  costImpact: 'costImpact',
  photoUrl: 'photoUrl',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.StockTransferRequestScalarFieldEnum = {
  id: 'id',
  itemId: 'itemId',
  sourceLocationId: 'sourceLocationId',
  destinationLocationId: 'destinationLocationId',
  requestedQuantity: 'requestedQuantity',
  dispatchedQuantity: 'dispatchedQuantity',
  receivedQuantity: 'receivedQuantity',
  status: 'status',
  requestedByUserId: 'requestedByUserId',
  approvedByUserId: 'approvedByUserId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SupplierScalarFieldEnum = {
  id: 'id',
  name: 'name',
  contactName: 'contactName',
  contactEmail: 'contactEmail',
  contactPhone: 'contactPhone',
  paymentTerms: 'paymentTerms',
  leadTimeDays: 'leadTimeDays',
  deliverySchedule: 'deliverySchedule',
  rating: 'rating',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SupplierItemPriceScalarFieldEnum = {
  id: 'id',
  supplierId: 'supplierId',
  itemId: 'itemId',
  price: 'price',
  packSize: 'packSize',
  moq: 'moq',
  isPreferred: 'isPreferred',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PurchaseOrderScalarFieldEnum = {
  id: 'id',
  poNumber: 'poNumber',
  supplierId: 'supplierId',
  locationId: 'locationId',
  status: 'status',
  totalAmount: 'totalAmount',
  createdByUserId: 'createdByUserId',
  approvedByUserId: 'approvedByUserId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PurchaseOrderLineScalarFieldEnum = {
  id: 'id',
  purchaseOrderId: 'purchaseOrderId',
  itemId: 'itemId',
  quantityOrdered: 'quantityOrdered',
  unitPrice: 'unitPrice',
  quantityReceived: 'quantityReceived'
};

exports.Prisma.PurchaseOrderStatusEventScalarFieldEnum = {
  id: 'id',
  purchaseOrderId: 'purchaseOrderId',
  status: 'status',
  byUserId: 'byUserId',
  at: 'at'
};

exports.Prisma.GrnScalarFieldEnum = {
  id: 'id',
  purchaseOrderId: 'purchaseOrderId',
  locationId: 'locationId',
  storageAreaId: 'storageAreaId',
  hasDiscrepancy: 'hasDiscrepancy',
  receivedByUserId: 'receivedByUserId',
  createdAt: 'createdAt'
};

exports.Prisma.GrnLineScalarFieldEnum = {
  id: 'id',
  grnId: 'grnId',
  itemId: 'itemId',
  poLineId: 'poLineId',
  quantityOrdered: 'quantityOrdered',
  quantityReceived: 'quantityReceived',
  discrepancy: 'discrepancy',
  discrepancyType: 'discrepancyType',
  batchNumber: 'batchNumber',
  expiryDate: 'expiryDate'
};

exports.Prisma.RecipeScalarFieldEnum = {
  id: 'id',
  recipeGroupId: 'recipeGroupId',
  name: 'name',
  type: 'type',
  yieldQuantity: 'yieldQuantity',
  yieldUnit: 'yieldUnit',
  sellingPrice: 'sellingPrice',
  version: 'version',
  effectiveFrom: 'effectiveFrom',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.RecipeIngredientScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  ingredientItemId: 'ingredientItemId',
  ingredientRecipeId: 'ingredientRecipeId',
  quantity: 'quantity',
  unit: 'unit'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  type: 'type',
  title: 'title',
  message: 'message',
  targetUserId: 'targetUserId',
  targetRoles: 'targetRoles',
  locationId: 'locationId',
  referenceId: 'referenceId',
  isRead: 'isRead',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Restaurant: 'Restaurant',
  UserRole: 'UserRole',
  UserLocation: 'UserLocation',
  RefreshToken: 'RefreshToken',
  Location: 'Location',
  StorageArea: 'StorageArea',
  Item: 'Item',
  StockLevel: 'StockLevel',
  StockTransaction: 'StockTransaction',
  Batch: 'Batch',
  WastageLog: 'WastageLog',
  StockTransferRequest: 'StockTransferRequest',
  Supplier: 'Supplier',
  SupplierItemPrice: 'SupplierItemPrice',
  PurchaseOrder: 'PurchaseOrder',
  PurchaseOrderLine: 'PurchaseOrderLine',
  PurchaseOrderStatusEvent: 'PurchaseOrderStatusEvent',
  Grn: 'Grn',
  GrnLine: 'GrnLine',
  Recipe: 'Recipe',
  RecipeIngredient: 'RecipeIngredient',
  Notification: 'Notification'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "E:\\Projects\\Inventory-Management\\packages\\db\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters",
      "multiSchema"
    ],
    "sourceFilePath": "E:\\Projects\\Inventory-Management\\packages\\db\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../../prisma",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// Single shared Prisma schema for the whole platform. Every backend service\n// (except reporting-service, which is fully stateless) reads/writes through\n// this one generated client via @platform/db — no per-service schema.prisma\n// or generated client anymore. Each service still owns its own Postgres\n// **schema** (identity/inventory/purchasing/recipes/notifications) inside\n// the one shared database — the `multiSchema` preview feature + `@@schema(...)`\n// on every model is what enforces that boundary, not separate connections.\n//\n// Multi-restaurant tenancy scope (as of the Restaurant model below): an\n// Owner can own multiple Restaurants; every other role belongs to exactly\n// one. Restaurant -> Location is properly isolated (every Location carries\n// a restaurantId, listLocations/createLocation are scoped to the caller's\n// active restaurant). Item/Supplier/PurchaseOrder/Recipe/Notification are\n// NOT yet restaurant-scoped — they remain global catalogs shared across all\n// of an owner's restaurants for now (e.g. Item.sku is still globally\n// unique). Deepening isolation into those models is a deliberate follow-up,\n// not an oversight — flagged here so it isn't mistaken for full isolation.\ngenerator client {\n  provider        = \"prisma-client-js\"\n  // Generated as a sibling of both src/ and dist/ (not nested inside src/)\n  // so the same relative import — \"../generated/prisma/index.js\" — resolves\n  // correctly from both src/index.ts (dev/typecheck) and the tsc-compiled\n  // dist/index.js (same relative depth from packages/db/ either way).\n  output          = \"../generated/prisma\"\n  // The default native query engine loads a binary via code that isn't\n  // bundler-safe (breaks with \"__dirname is not defined\" under Vercel's\n  // Node.js Function bundler). The Neon driver adapter (see src/client.ts)\n  // replaces it with Neon's WebSocket driver — no native engine to load.\n  previewFeatures = [\"driverAdapters\", \"multiSchema\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n  schemas  = [\"identity\", \"inventory\", \"purchasing\", \"recipes\", \"notifications\"]\n}\n\n// ============================================================================\n// identity-service — users, roles (RBAC), JWT auth\n// ============================================================================\n\nmodel User {\n  id           String   @id @default(cuid())\n  name         String\n  email        String   @unique\n  passwordHash String\n  isActive     Boolean  @default(true)\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  // Non-owner staff belong to exactly one restaurant. Owners leave this null\n  // — their accessible restaurants come from `ownedRestaurants` instead, and\n  // they pick an *active* one per session (the restaurantId JWT claim /\n  // RestaurantSwitcher), not a fixed home like staff have.\n  restaurantId String?\n  restaurant   Restaurant? @relation(\"StaffOfRestaurant\", fields: [restaurantId], references: [id])\n\n  ownedRestaurants Restaurant[] @relation(\"OwnedRestaurants\")\n\n  roles         UserRole[]\n  locations     UserLocation[]\n  refreshTokens RefreshToken[]\n\n  @@index([restaurantId])\n  @@schema(\"identity\")\n}\n\n// A restaurant business, owned by exactly one User (must hold the OWNER\n// role — enforced at the application layer via MANAGE_RESTAURANTS, not a DB\n// constraint). An Owner can own many; every other role belongs to exactly\n// one via User.restaurantId. Locations, items, suppliers etc. all live\n// \"inside\" a restaurant conceptually, but only Location actually carries a\n// restaurantId column today — see packages/db/prisma/schema.prisma's top\n// comment on scope for what's NOT yet tenant-isolated.\nmodel Restaurant {\n  id          String   @id @default(cuid())\n  name        String\n  ownerUserId String\n  isActive    Boolean  @default(true)\n  createdAt   DateTime @default(now())\n\n  owner User   @relation(\"OwnedRestaurants\", fields: [ownerUserId], references: [id])\n  staff User[] @relation(\"StaffOfRestaurant\")\n\n  @@index([ownerUserId])\n  @@schema(\"identity\")\n}\n\nmodel UserRole {\n  id     String @id @default(cuid())\n  userId String\n  role   String\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, role])\n  @@schema(\"identity\")\n}\n\nmodel UserLocation {\n  id         String @id @default(cuid())\n  userId     String\n  locationId String\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, locationId])\n  @@schema(\"identity\")\n}\n\nmodel RefreshToken {\n  id           String    @id @default(cuid())\n  userId       String\n  tokenHash    String    @unique\n  // Carried forward across rotation (see issueTokenPair.ts) so a refresh —\n  // or a restaurant switch, which rotates the pair too — doesn't silently\n  // reset the session's active restaurant or remember-me persistence.\n  restaurantId String?\n  rememberMe   Boolean   @default(false)\n  expiresAt    DateTime\n  createdAt    DateTime  @default(now())\n  revokedAt    DateTime?\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@schema(\"identity\")\n}\n\n// ============================================================================\n// inventory-service — items, locations, stock ledger, batches, wastage,\n// transfers\n// ============================================================================\n\nmodel Location {\n  id           String   @id @default(cuid())\n  // Plain id, not a Prisma `@relation` — Location lives in the `inventory`\n  // schema (inventory-service's), Restaurant lives in `identity`\n  // (identity-service's). Cross-service references are always opaque ids\n  // here, never a relation, same convention as e.g. StockTransaction.userId.\n  restaurantId String\n  name         String\n  type         String\n  address      String?\n  isActive     Boolean  @default(true)\n  createdAt    DateTime @default(now())\n\n  storageAreas StorageArea[]\n\n  @@index([restaurantId])\n  @@schema(\"inventory\")\n}\n\nmodel StorageArea {\n  id         String @id @default(cuid())\n  locationId String\n  name       String\n  type       String\n\n  location Location @relation(fields: [locationId], references: [id], onDelete: Cascade)\n\n  @@schema(\"inventory\")\n}\n\nmodel Item {\n  id                    String   @id @default(cuid())\n  sku                   String   @unique\n  name                  String\n  category              String\n  subCategory           String?\n  description           String?\n  imageUrl              String?\n  barcode               String?  @unique\n  purchaseUom           String\n  stockUom              String\n  recipeUom             String\n  purchaseToStockFactor Float\n  stockToRecipeFactor   Float\n  isPerishable          Boolean  @default(false)\n  defaultShelfLifeDays  Int?\n  lastPurchasePrice     Float?\n  averageCost           Float?\n  status                String   @default(\"ACTIVE\")\n  createdAt             DateTime @default(now())\n  updatedAt             DateTime @updatedAt\n\n  stockLevels  StockLevel[]\n  transactions StockTransaction[]\n  batches      Batch[]\n  wastageLogs  WastageLog[]\n\n  @@schema(\"inventory\")\n}\n\n// On-hand balance is tracked per item+location (not per storage sub-area —\n// storage area is captured as descriptive metadata on individual\n// transactions instead, keeping the ledger's unique-balance key simple).\nmodel StockLevel {\n  id             String @id @default(cuid())\n  itemId         String\n  locationId     String\n  quantityOnHand Float  @default(0)\n  parLevel       Float?\n  minLevel       Float?\n  maxLevel       Float?\n\n  item Item @relation(fields: [itemId], references: [id], onDelete: Cascade)\n\n  @@unique([itemId, locationId])\n  @@schema(\"inventory\")\n}\n\nmodel StockTransaction {\n  id             String   @id @default(cuid())\n  itemId         String\n  locationId     String\n  storageAreaId  String?\n  type           String\n  quantity       Float\n  runningBalance Float\n  unitCost       Float?\n  batchId        String?\n  referenceType  String?\n  referenceId    String?\n  reasonCode     String?\n  userId         String\n  createdAt      DateTime @default(now())\n\n  item Item @relation(fields: [itemId], references: [id], onDelete: Cascade)\n\n  @@schema(\"inventory\")\n}\n\nmodel Batch {\n  id                String    @id @default(cuid())\n  itemId            String\n  locationId        String\n  batchNumber       String\n  expiryDate        DateTime?\n  receivedQuantity  Float\n  remainingQuantity Float\n  unitCost          Float\n  createdAt         DateTime  @default(now())\n\n  item Item @relation(fields: [itemId], references: [id], onDelete: Cascade)\n\n  @@schema(\"inventory\")\n}\n\nmodel WastageLog {\n  id         String   @id @default(cuid())\n  itemId     String\n  locationId String\n  station    String?\n  quantity   Float\n  reason     String\n  costImpact Float\n  photoUrl   String?\n  userId     String\n  createdAt  DateTime @default(now())\n\n  item Item @relation(fields: [itemId], references: [id], onDelete: Cascade)\n\n  @@schema(\"inventory\")\n}\n\nmodel StockTransferRequest {\n  id                    String   @id @default(cuid())\n  itemId                String\n  sourceLocationId      String\n  destinationLocationId String\n  requestedQuantity     Float\n  dispatchedQuantity    Float?\n  receivedQuantity      Float?\n  status                String   @default(\"REQUESTED\")\n  requestedByUserId     String\n  approvedByUserId      String?\n  createdAt             DateTime @default(now())\n  updatedAt             DateTime @updatedAt\n\n  @@schema(\"inventory\")\n}\n\n// ============================================================================\n// purchasing-service — suppliers, supplier item prices, purchase orders, GRNs\n// ============================================================================\n\nmodel Supplier {\n  id               String   @id @default(cuid())\n  name             String\n  contactName      String?\n  contactEmail     String?\n  contactPhone     String?\n  paymentTerms     String?\n  leadTimeDays     Int?\n  deliverySchedule String?\n  rating           Float?\n  isActive         Boolean  @default(true)\n  createdAt        DateTime @default(now())\n  updatedAt        DateTime @updatedAt\n\n  itemPrices     SupplierItemPrice[]\n  purchaseOrders PurchaseOrder[]\n\n  @@schema(\"purchasing\")\n}\n\n// PRD §3.2 — item-supplier price list with a preferred supplier per item.\n// `isPreferred` is enforced as \"at most one per itemId\" at the application\n// layer (see upsertSupplierItemPrice), not a DB constraint, since Postgres\n// partial-unique-index support isn't modeled through Prisma's schema DSL.\nmodel SupplierItemPrice {\n  id          String   @id @default(cuid())\n  supplierId  String\n  itemId      String\n  price       Float\n  packSize    String?\n  moq         Float?\n  isPreferred Boolean  @default(false)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  supplier Supplier @relation(fields: [supplierId], references: [id], onDelete: Cascade)\n\n  @@unique([supplierId, itemId])\n  @@index([itemId])\n  @@schema(\"purchasing\")\n}\n\n// PRD §3.3 — Draft -> Pending Approval -> Sent -> Confirmed -> Partially\n// Received -> Received -> Closed (or Rejected), with timestamped history.\nmodel PurchaseOrder {\n  id               String   @id @default(cuid())\n  poNumber         String   @unique\n  supplierId       String\n  locationId       String\n  status           String   @default(\"DRAFT\")\n  totalAmount      Float    @default(0)\n  createdByUserId  String\n  approvedByUserId String?\n  createdAt        DateTime @default(now())\n  updatedAt        DateTime @updatedAt\n\n  supplier      Supplier                   @relation(fields: [supplierId], references: [id])\n  lines         PurchaseOrderLine[]\n  statusHistory PurchaseOrderStatusEvent[]\n  grns          Grn[]\n\n  @@index([status])\n  @@index([locationId])\n  @@index([supplierId])\n  @@schema(\"purchasing\")\n}\n\nmodel PurchaseOrderLine {\n  id               String @id @default(cuid())\n  purchaseOrderId  String\n  itemId           String\n  quantityOrdered  Float\n  unitPrice        Float\n  quantityReceived Float  @default(0)\n\n  purchaseOrder PurchaseOrder @relation(fields: [purchaseOrderId], references: [id], onDelete: Cascade)\n  grnLines      GrnLine[]\n\n  @@index([purchaseOrderId])\n  @@schema(\"purchasing\")\n}\n\n// Immutable append-only status trail backing `PurchaseOrder.statusHistory`\n// in the API contract — modeled as a related table (rather than a JSON\n// column) so it reads/writes like every other audit-log pattern in this\n// platform and stays queryable.\nmodel PurchaseOrderStatusEvent {\n  id              String   @id @default(cuid())\n  purchaseOrderId String\n  status          String\n  byUserId        String\n  at              DateTime @default(now())\n\n  purchaseOrder PurchaseOrder @relation(fields: [purchaseOrderId], references: [id], onDelete: Cascade)\n\n  @@index([purchaseOrderId])\n  @@schema(\"purchasing\")\n}\n\n// PRD §3.4 — Goods Receipt Note: received quantities + per-line discrepancy\n// vs. ordered quantity, captured at receiving time.\nmodel Grn {\n  id               String   @id @default(cuid())\n  purchaseOrderId  String\n  locationId       String\n  storageAreaId    String?\n  hasDiscrepancy   Boolean  @default(false)\n  receivedByUserId String\n  createdAt        DateTime @default(now())\n\n  purchaseOrder PurchaseOrder @relation(fields: [purchaseOrderId], references: [id])\n  lines         GrnLine[]\n\n  @@index([purchaseOrderId])\n  @@schema(\"purchasing\")\n}\n\nmodel GrnLine {\n  id               String    @id @default(cuid())\n  grnId            String\n  itemId           String\n  poLineId         String\n  quantityOrdered  Float\n  quantityReceived Float\n  discrepancy      Float\n  discrepancyType  String\n  batchNumber      String?\n  expiryDate       DateTime?\n\n  grn    Grn               @relation(fields: [grnId], references: [id], onDelete: Cascade)\n  poLine PurchaseOrderLine @relation(fields: [poLineId], references: [id])\n\n  @@index([grnId])\n  @@schema(\"purchasing\")\n}\n\n// ============================================================================\n// recipes-service — recipe/BOM definitions + versions and their ingredient\n// lines. Raw item master data and stock levels live in inventory-service and\n// are only ever reached over HTTP, never joined here.\n// ============================================================================\n\n// A recipe is versioned: editing ingredients never mutates a row in place,\n// it inserts a new row and flips isActive. `recipeGroupId` is the stable\n// identifier for \"this recipe\" across all its versions — it defaults to the\n// row's own id on first creation (see createRecipe) and is copied forward\n// on every subsequent version (see updateRecipe).\nmodel Recipe {\n  id            String   @id @default(cuid())\n  recipeGroupId String\n  name          String\n  type          String // \"MENU_ITEM\" | \"SUB_RECIPE\"\n  yieldQuantity Float\n  yieldUnit     String\n  sellingPrice  Float?\n  version       Int      @default(1)\n  effectiveFrom DateTime @default(now())\n  isActive      Boolean  @default(true)\n  createdAt     DateTime @default(now())\n\n  ingredients RecipeIngredient[]\n\n  @@index([recipeGroupId])\n  @@schema(\"recipes\")\n}\n\n// An ingredient line references exactly one of a raw inventory-service item\n// (ingredientItemId) or another recipe (ingredientRecipeId, for nested\n// sub-recipes) — never both, enforced in application code since Prisma\n// doesn't support cross-field XOR constraints.\nmodel RecipeIngredient {\n  id                 String  @id @default(cuid())\n  recipeId           String\n  ingredientItemId   String?\n  ingredientRecipeId String?\n  quantity           Float\n  unit               String\n\n  recipe Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)\n\n  @@index([recipeId])\n  @@schema(\"recipes\")\n}\n\n// ============================================================================\n// notifications-service — in-app notification center rows, plus the\n// internal bookkeeping alert-rules detection uses to dedupe repeat\n// LOW_STOCK/EXPIRING_SOON alerts.\n// ============================================================================\n\nmodel Notification {\n  id           String   @id @default(cuid())\n  type         String\n  title        String\n  message      String\n  targetUserId String?\n  targetRoles  String[] @default([])\n  locationId   String?\n  // Internal-only correlation key (itemId for LOW_STOCK, batchId for\n  // EXPIRING_SOON) used by alert-rules to dedupe repeat alerts within a\n  // rolling window. Not part of the public Notification DTO.\n  referenceId  String?\n  isRead       Boolean  @default(false)\n  createdAt    DateTime @default(now())\n\n  @@schema(\"notifications\")\n}\n",
  "inlineSchemaHash": "31c6aad32f9e3a82dfcfe6639007be83b9ef47b4db1086d5938430a401d1679e",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"passwordHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"restaurantId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"restaurant\",\"kind\":\"object\",\"type\":\"Restaurant\",\"relationName\":\"StaffOfRestaurant\"},{\"name\":\"ownedRestaurants\",\"kind\":\"object\",\"type\":\"Restaurant\",\"relationName\":\"OwnedRestaurants\"},{\"name\":\"roles\",\"kind\":\"object\",\"type\":\"UserRole\",\"relationName\":\"UserToUserRole\"},{\"name\":\"locations\",\"kind\":\"object\",\"type\":\"UserLocation\",\"relationName\":\"UserToUserLocation\"},{\"name\":\"refreshTokens\",\"kind\":\"object\",\"type\":\"RefreshToken\",\"relationName\":\"RefreshTokenToUser\"}],\"dbName\":null},\"Restaurant\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ownerUserId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"owner\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"OwnedRestaurants\"},{\"name\":\"staff\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"StaffOfRestaurant\"}],\"dbName\":null},\"UserRole\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToUserRole\"}],\"dbName\":null},\"UserLocation\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"locationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToUserLocation\"}],\"dbName\":null},\"RefreshToken\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tokenHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"restaurantId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"rememberMe\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"revokedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"RefreshTokenToUser\"}],\"dbName\":null},\"Location\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"restaurantId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"address\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"storageAreas\",\"kind\":\"object\",\"type\":\"StorageArea\",\"relationName\":\"LocationToStorageArea\"}],\"dbName\":null},\"StorageArea\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"locationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"location\",\"kind\":\"object\",\"type\":\"Location\",\"relationName\":\"LocationToStorageArea\"}],\"dbName\":null},\"Item\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sku\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"subCategory\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"barcode\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"purchaseUom\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stockUom\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"recipeUom\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"purchaseToStockFactor\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"stockToRecipeFactor\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"isPerishable\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"defaultShelfLifeDays\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"lastPurchasePrice\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"averageCost\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"stockLevels\",\"kind\":\"object\",\"type\":\"StockLevel\",\"relationName\":\"ItemToStockLevel\"},{\"name\":\"transactions\",\"kind\":\"object\",\"type\":\"StockTransaction\",\"relationName\":\"ItemToStockTransaction\"},{\"name\":\"batches\",\"kind\":\"object\",\"type\":\"Batch\",\"relationName\":\"BatchToItem\"},{\"name\":\"wastageLogs\",\"kind\":\"object\",\"type\":\"WastageLog\",\"relationName\":\"ItemToWastageLog\"}],\"dbName\":null},\"StockLevel\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"itemId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"locationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"quantityOnHand\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"parLevel\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"minLevel\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"maxLevel\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"item\",\"kind\":\"object\",\"type\":\"Item\",\"relationName\":\"ItemToStockLevel\"}],\"dbName\":null},\"StockTransaction\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"itemId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"locationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"storageAreaId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"quantity\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"runningBalance\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"unitCost\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"batchId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"referenceType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"referenceId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"reasonCode\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"item\",\"kind\":\"object\",\"type\":\"Item\",\"relationName\":\"ItemToStockTransaction\"}],\"dbName\":null},\"Batch\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"itemId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"locationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"batchNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expiryDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"receivedQuantity\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"remainingQuantity\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"unitCost\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"item\",\"kind\":\"object\",\"type\":\"Item\",\"relationName\":\"BatchToItem\"}],\"dbName\":null},\"WastageLog\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"itemId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"locationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"station\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"quantity\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"reason\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"costImpact\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"photoUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"item\",\"kind\":\"object\",\"type\":\"Item\",\"relationName\":\"ItemToWastageLog\"}],\"dbName\":null},\"StockTransferRequest\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"itemId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sourceLocationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"destinationLocationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"requestedQuantity\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"dispatchedQuantity\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"receivedQuantity\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"requestedByUserId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"approvedByUserId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Supplier\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contactName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contactEmail\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contactPhone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"paymentTerms\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"leadTimeDays\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"deliverySchedule\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"rating\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"itemPrices\",\"kind\":\"object\",\"type\":\"SupplierItemPrice\",\"relationName\":\"SupplierToSupplierItemPrice\"},{\"name\":\"purchaseOrders\",\"kind\":\"object\",\"type\":\"PurchaseOrder\",\"relationName\":\"PurchaseOrderToSupplier\"}],\"dbName\":null},\"SupplierItemPrice\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"supplierId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"itemId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"packSize\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"moq\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"isPreferred\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"supplier\",\"kind\":\"object\",\"type\":\"Supplier\",\"relationName\":\"SupplierToSupplierItemPrice\"}],\"dbName\":null},\"PurchaseOrder\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"poNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"supplierId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"locationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"totalAmount\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"createdByUserId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"approvedByUserId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"supplier\",\"kind\":\"object\",\"type\":\"Supplier\",\"relationName\":\"PurchaseOrderToSupplier\"},{\"name\":\"lines\",\"kind\":\"object\",\"type\":\"PurchaseOrderLine\",\"relationName\":\"PurchaseOrderToPurchaseOrderLine\"},{\"name\":\"statusHistory\",\"kind\":\"object\",\"type\":\"PurchaseOrderStatusEvent\",\"relationName\":\"PurchaseOrderToPurchaseOrderStatusEvent\"},{\"name\":\"grns\",\"kind\":\"object\",\"type\":\"Grn\",\"relationName\":\"GrnToPurchaseOrder\"}],\"dbName\":null},\"PurchaseOrderLine\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"purchaseOrderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"itemId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"quantityOrdered\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"unitPrice\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"quantityReceived\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"purchaseOrder\",\"kind\":\"object\",\"type\":\"PurchaseOrder\",\"relationName\":\"PurchaseOrderToPurchaseOrderLine\"},{\"name\":\"grnLines\",\"kind\":\"object\",\"type\":\"GrnLine\",\"relationName\":\"GrnLineToPurchaseOrderLine\"}],\"dbName\":null},\"PurchaseOrderStatusEvent\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"purchaseOrderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"byUserId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"purchaseOrder\",\"kind\":\"object\",\"type\":\"PurchaseOrder\",\"relationName\":\"PurchaseOrderToPurchaseOrderStatusEvent\"}],\"dbName\":null},\"Grn\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"purchaseOrderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"locationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"storageAreaId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hasDiscrepancy\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"receivedByUserId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"purchaseOrder\",\"kind\":\"object\",\"type\":\"PurchaseOrder\",\"relationName\":\"GrnToPurchaseOrder\"},{\"name\":\"lines\",\"kind\":\"object\",\"type\":\"GrnLine\",\"relationName\":\"GrnToGrnLine\"}],\"dbName\":null},\"GrnLine\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"grnId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"itemId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"poLineId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"quantityOrdered\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"quantityReceived\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"discrepancy\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"discrepancyType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"batchNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expiryDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"grn\",\"kind\":\"object\",\"type\":\"Grn\",\"relationName\":\"GrnToGrnLine\"},{\"name\":\"poLine\",\"kind\":\"object\",\"type\":\"PurchaseOrderLine\",\"relationName\":\"GrnLineToPurchaseOrderLine\"}],\"dbName\":null},\"Recipe\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"recipeGroupId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"yieldQuantity\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"yieldUnit\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sellingPrice\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"version\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"effectiveFrom\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"ingredients\",\"kind\":\"object\",\"type\":\"RecipeIngredient\",\"relationName\":\"RecipeToRecipeIngredient\"}],\"dbName\":null},\"RecipeIngredient\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"recipeId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ingredientItemId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ingredientRecipeId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"quantity\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"unit\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"recipe\",\"kind\":\"object\",\"type\":\"Recipe\",\"relationName\":\"RecipeToRecipeIngredient\"}],\"dbName\":null},\"Notification\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"message\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"targetUserId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"targetRoles\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"locationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"referenceId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isRead\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

