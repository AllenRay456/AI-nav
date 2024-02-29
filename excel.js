const xlsx = require('xlsx');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function importExcelDataToDatabase() {
  // 加载 Excel 文件
  const workbook = xlsx.readFile('./link.xls');
  // 假设你的数据在第一个工作表
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  // 将工作表转换为 JSON
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  // 处理每条记录，可能需要为 `key` 字段生成值或做其他转换
  // const processedData = jsonData.map(row => {
  //   // 假设 Excel 文件中没有 `key` 字段，这里我们为它生成一个值
  //   // 实际应用中，你可能需要根据具体情况来生成这个值
  //   row.key = generateKeyForRow(row);
  //   return row;
  // });

  // 使用 Prisma Client 批量插入数据
  const result = await prisma.link.createMany({
    data: jsonData,
    skipDuplicates: true, // 跳过重复项，根据需要调整
  });

  console.log(`Inserted ${result.count} records.`);
}

function generateKeyForRow(row) {
  // 这里只是一个示例函数，实际上你应该根据需要来实现这个函数
  return `key-${Date.now()}`;
}

importExcelDataToDatabase()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
