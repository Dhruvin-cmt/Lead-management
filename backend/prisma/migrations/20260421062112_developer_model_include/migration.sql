-- CreateTable
CREATE TABLE "Developer_Team" (
    "id" TEXT NOT NULL,
    "developer_name" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "joining_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "position" TEXT NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Developer_Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dev_Skills" (
    "id" TEXT NOT NULL,
    "dev_id" TEXT NOT NULL,
    "tech_id" TEXT NOT NULL,

    CONSTRAINT "Dev_Skills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dev_Skills" ADD CONSTRAINT "Dev_Skills_dev_id_fkey" FOREIGN KEY ("dev_id") REFERENCES "Developer_Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dev_Skills" ADD CONSTRAINT "Dev_Skills_tech_id_fkey" FOREIGN KEY ("tech_id") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
