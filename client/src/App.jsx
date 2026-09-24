import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RoleRoute } from './components/RoleRoute';

// Public Pages
import { HomePage } from './pages/HomePage';
import { CampaignsPage } from './pages/CampaignsPage';
import { CampaignDetailPage } from './pages/CampaignDetailPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Authenticated Dashboards & Workflows
import { DonorDashboard } from './pages/DonorDashboard';
import { CreatorDashboard } from './pages/CreatorDashboard';
import { CreateCampaignWizard } from './pages/CreateCampaignWizard';
import { ManageCampaignHub } from './pages/ManageCampaignHub';
import AdminDashboard from './pages/AdminDashboard';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-900 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-slate-800 text-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-slate-200 mt-2">Page Not Found</h2>
        <p className="text-sm text-slate-400 mt-2">
          The link you followed may be broken or the verified campaign page has been removed.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Donor / Universal Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DonorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Creator Protected Routes */}
          <Route
            path="/creator/dashboard"
            element={
              <RoleRoute allowedRoles={['creator', 'admin']}>
                <CreatorDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/creator/campaigns/new"
            element={
              <RoleRoute allowedRoles={['creator', 'admin']}>
                <CreateCampaignWizard />
              </RoleRoute>
            }
          />
          <Route
            path="/creator/campaigns/:id/manage"
            element={
              <RoleRoute allowedRoles={['creator', 'admin']}>
                <ManageCampaignHub />
              </RoleRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleRoute>
            }
          />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
