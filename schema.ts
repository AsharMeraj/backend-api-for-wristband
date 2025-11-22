import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";



export const vital_data = pgTable("vital_data", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  Timestamp: varchar("Timestamp", { length: 100 }),   // timestamp stored as string
  Diastolic: varchar("Diastolic", { length: 100 }),
  Mean: varchar("Mean", { length: 100 }),
  Systolic: varchar("Systolic", { length: 100 }),
  Heart_Rate: varchar("Heart Rate", { length: 100 }),
  Oxygen: varchar("Oxygen", { length: 100 }),
  Pulse_Rate: varchar("Pulse Rate", { length: 100 }),
  Respiratory_Rate: varchar("Respiratory Rate", { length: 100 }),
  Temperature: varchar("Temperature", { length: 100 }),
  PVCs: varchar("PVCs", { length: 100 }),
  ST_I: varchar("ST_I", { length: 100 }),
  QT: varchar("QT", { length: 100 }),
  QTc: varchar("QTc", { length: 100 }),
  QTc_alt: varchar("QTc_alt", { length: 100 }),
  QT_HR: varchar("QT_HR", { length: 100 }),
  Temperature_2: varchar("Temperature 2", { length: 100 }),
  Temperature_Difference: varchar("Temperature Difference", { length: 100 }),
  Perfusion_Index: varchar("Perfusion Index", { length: 100 }),
});

// ✅ Demographic Data Table
export const demographic_data = pgTable("demographic_data", {
  Timestamp: varchar("Timestamp", { length: 255 }),
  PhoneNumber: varchar("Phone Number", { length: 255 }),
  FirstName: varchar("First Name", { length: 255 }),
  LastName: varchar("Last Name", { length: 255 }),
  Dateofbirth: varchar("Date of birth", { length: 255 }),
  Gender: varchar("Gender", { length: 255 }),
});



export const vital_data_from_wristband = pgTable("vital_data_from_wristband", {
  timestamp: varchar("timestamp", { length: 100 }),   // timestamp stored as string
  temperature: varchar("temperature", { length: 100 }),
  heartRate: varchar("heartRate", { length: 100 }),
  spo2: varchar("spo2", { length: 100 }),
});

