export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { connectDB } from '@/services/db';
import { handleWebhook } from '@/controllers/bot';

await connectDB();

export const POST = handleWebhook;