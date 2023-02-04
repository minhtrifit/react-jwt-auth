-- ----------------------------
-- Table structure for accounts
-- ----------------------------

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "accounts";
CREATE TABLE "accounts" (
  "id" uuid DEFAULT uuid_generate_v4(),
  "username" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL
)
;

-- ----------------------------
-- Primary Key structure for table accounts
-- ----------------------------
ALTER TABLE "accounts" ADD CONSTRAINT "PK_Accounts" PRIMARY KEY ("id");