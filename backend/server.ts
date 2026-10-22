import express from 'express';
import cors from 'cors';
import pool, { initializeDatabase } from './db';

// Import all routers
import adminLoginRouter from './pages/admin/adminlogin'; 
import adminRoutes from './pages/admin/admin';
import adminStatsRoutes from './pages/admin/adminStats';
import addGroupRouter from './pages/admin/addgroup';
import subgroupsRouter from './pages/admin/addsubgroup';
import userRoutes from './pages/users/userAuth'; 
import viewProfileRoutes from './pages/users/viewprofile'; 
import onboardingUsersRouter from './pages/admin/onboardingUsers';
import addUserRouter from './pages/admin/adduser'; 

const app = express();

app.use(express.json());
app.use(cors());

// API Routes Mounting
app.use('/api', adminLoginRouter); 
app.use('/api', adminRoutes);
app.use('/api', adminStatsRoutes);
app.use('/api', addGroupRouter);
app.use('/api', subgroupsRouter);
app.use('/api', userRoutes); 
app.use('/api', viewProfileRoutes); 
app.use('/api', onboardingUsersRouter);
app.use('/api', addUserRouter); 

// Server initialization and starting function
const startServer = async () => {
  await initializeDatabase(); 
  app.listen(5000, () => {
    console.log('🚀 Server is running on port 5000');
  });
};

startServer();