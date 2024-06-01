import * as mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';

export default async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB Connected...');
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
}
