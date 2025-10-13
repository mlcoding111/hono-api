import { Hono } from 'hono'
import { userRoute } from './routes/user';
import { authRoute } from './routes/auth';

const app = new Hono()

app.route('/auth', authRoute)
app.route('/user', userRoute)
app.get('/', (c) => c.text('Hono JWT Auth API running ✅'));


export default app
