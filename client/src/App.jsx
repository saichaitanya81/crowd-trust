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
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F7F0E3] px-4">
      <div className="text-center max-w-md p-8 bg-[#FBF7EF] border border-[#DCCBB5] rounded-3xl shadow-warm">
        <div className="w-16 h-16 bg-[#F0DDC7] text-[#C96F4A] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#E8DAC6]">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-[#3A2418] tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-[#6B5140] mt-2">Page Not Found</h2>
        <p className="text-sm text-[#8A7463] mt-2 leading-relaxed">
          The link you followed may be broken or the verified campaign page has been removed.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="btn-primary inline-flex items-center space-x-2 text-sm"
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
    <div className="min-h-screen flex flex-col bg-[#F7F0E3] text-[#3A2418] selection:bg-[#C96F4A] selection:text-[#FFF8EE]">
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
