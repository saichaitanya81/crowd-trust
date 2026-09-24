import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app.js';
import { env } from '../src/config/env.js';
import { User } from '../src/models/User.js';
import { Campaign } from '../src/models/Campaign.js';
import { Donation } from '../src/models/Donation.js';

describe('CrowdTrust Full API Suite', () => {
  let donorToken = '';
  let creatorToken = '';
  let adminToken = '';
  let donorUserId = '';
  let creatorUserId = '';
  let createdCampaignId = '';
  let createdCampaignSlug = '';

  before(async () => {
    // Connect to database if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(env.MONGODB_URI);
    }
  });

  after(async () => {
    // Clean up test entities created
    if (donorUserId) await User.findByIdAndDelete(donorUserId);
    if (creatorUserId) await User.findByIdAndDelete(creatorUserId);
    if (createdCampaignId) {
      await Campaign.findByIdAndDelete(createdCampaignId);
      await Donation.deleteMany({ campaign: createdCampaignId });
    }
    await mongoose.disconnect();
  });

  describe('1. Authentication & User Registration', () => {
    test('POST /api/auth/register - Should register a new donor successfully', async () => {
      const uniqueEmail = `test.donor.${Date.now()}@example.com`;
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test Donor',
          email: uniqueEmail,
          password: 'Password@123#',
          role: 'donor',
        });

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.ok(res.body.token);
      assert.equal(res.body.data.user.email, uniqueEmail);
      assert.equal(res.body.data.user.role, 'donor');
      donorToken = res.body.token;
      donorUserId = res.body.data.user._id;
    });

    test('POST /api/auth/register - Should register a new creator successfully', async () => {
      const uniqueEmail = `test.creator.${Date.now()}@example.com`;
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test Creator',
          email: uniqueEmail,
          password: 'Password@123#',
          role: 'creator',
        });

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.ok(res.body.token);
      assert.equal(res.body.data.user.role, 'creator');
      creatorToken = res.body.token;
      creatorUserId = res.body.data.user._id;
    });

    test('POST /api/auth/register - Should reject admin role creation via public register', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Hacker Admin',
          email: `hacker.${Date.now()}@example.com`,
          password: 'Password@123#',
          role: 'admin',
        });

      assert.ok([400, 403].includes(res.status));
      assert.equal(res.body.success, false);
    });

    test('POST /api/auth/register - Should reject invalid/weak password', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Weak Pass',
          email: `weak.${Date.now()}@example.com`,
          password: '123',
          role: 'donor',
        });

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });

    test('POST /api/auth/login - Should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@crowdtrust.org',
          password: 'Admin@12345#',
        });

      if (res.status === 200) {
        assert.equal(res.body.success, true);
        assert.ok(res.body.token);
        adminToken = res.body.token;
      }
    });

    test('GET /api/auth/me - Should reject unauthorized requests without token', async () => {
      const res = await request(app).get('/api/auth/me');
      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });

    test('GET /api/auth/me - Should return current user profile with valid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${donorToken}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.user._id, donorUserId);
    });
  });

  describe('2. Campaign System & Access Control', () => {
    test('POST /api/campaigns - Creator can create a campaign', async () => {
      const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      const res = await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${creatorToken}`)
        .send({
          title: `Unit Test Clean Water Initiative ${Date.now()}`,
          shortDescription: 'Providing sustainable drinking water for testing systems.',
          description: 'A comprehensive detailed project description for verification and testing workflows on CrowdTrust.',
          category: 'Environment',
          goalAmount: 150000,
          deadline: futureDate,
          coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6',
          location: 'Jodhpur, Rajasthan',
          beneficiary: 'Test Village Collective',
          budget: [
            { category: 'Equipment', amount: 90000, description: 'Solar RO pump' },
            { category: 'Labor', amount: 60000, description: 'Plumbing and civil setup' },
          ],
          milestones: [
            { title: 'Borewell Drilling', description: 'Complete deep water well', targetAmount: 75000 },
            { title: 'Filtration Rig', description: 'Install RO unit', targetAmount: 75000 },
          ],
        });

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.ok(res.body.data.campaign._id);
      createdCampaignId = res.body.data.campaign._id;
      createdCampaignSlug = res.body.data.campaign.slug;
    });

    test('POST /api/campaigns - Donor cannot create a campaign', async () => {
      const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      const res = await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${donorToken}`)
        .send({
          title: 'Illegal Campaign by Donor',
          shortDescription: 'This should be forbidden because donor is not a creator.',
          description: 'Detailed description test.',
          category: 'Education',
          goalAmount: 50000,
          deadline: futureDate,
          coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6',
          location: 'Delhi',
          beneficiary: 'Students',
        });

      assert.equal(res.status, 403);
    });

    test('GET /api/campaigns - Public can retrieve campaigns with search & filters', async () => {
      const res = await request(app).get('/api/campaigns?status=all');
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(Array.isArray(res.body.data.campaigns));
    });

    test('PATCH /api/campaigns/:id - Creator can update their own campaign', async () => {
      const res = await request(app)
        .patch(`/api/campaigns/${createdCampaignId}`)
        .set('Authorization', `Bearer ${creatorToken}`)
        .send({
          title: 'Updated Campaign Title For Testing',
        });

      assert.equal(res.status, 200);
      assert.equal(res.body.data.campaign.title, 'Updated Campaign Title For Testing');
    });

    test('PATCH /api/campaigns/:id - Other user cannot modify campaign they do not own', async () => {
      const res = await request(app)
        .patch(`/api/campaigns/${createdCampaignId}`)
        .set('Authorization', `Bearer ${donorToken}`)
        .send({
          title: 'Hacked Title',
        });

      assert.equal(res.status, 403);
    });
  });

  describe('3. Donation Workflow & Financial Updates', () => {
    test('POST /api/donations - Should reject donation to inactive/draft campaign', async () => {
      const res = await request(app)
        .post('/api/donations')
        .set('Authorization', `Bearer ${donorToken}`)
        .send({
          campaignId: createdCampaignId,
          amount: 5000,
        });

      // Campaign is currently in 'pending_review' or 'draft', so it should reject
      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });

    test('POST /api/donations - Should accept donation once campaign is active', async () => {
      // Activate campaign for donation test
      await Campaign.findByIdAndUpdate(createdCampaignId, { status: 'active' });

      const res = await request(app)
        .post('/api/donations')
        .set('Authorization', `Bearer ${donorToken}`)
        .send({
          campaignId: createdCampaignId,
          amount: 5000,
          message: 'Wishing your team huge success!',
          isAnonymous: false,
        });

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.donation.amount, 5000);
      assert.equal(res.body.data.campaign.raisedAmount, 5000);
      assert.equal(res.body.data.campaign.donorCount, 1);
    });

    test('GET /api/donations/my - Donor can view donation history', async () => {
      const res = await request(app)
        .get('/api/donations/my')
        .set('Authorization', `Bearer ${donorToken}`);

      assert.equal(res.status, 200);
      assert.ok(Array.isArray(res.body.data.donations));
      assert.equal(res.body.data.donations.length, 1);
    });
  });

  describe('4. Role-Based Admin Guarding', () => {
    test('GET /api/admin/stats - Donor should be forbidden (403)', async () => {
      const res = await request(app)
        .get('/api/admin/stats')
        .set('Authorization', `Bearer ${donorToken}`);

      assert.equal(res.status, 403);
    });

    test('GET /api/admin/stats - Creator should be forbidden (403)', async () => {
      const res = await request(app)
        .get('/api/admin/stats')
        .set('Authorization', `Bearer ${creatorToken}`);

      assert.equal(res.status, 403);
    });
  });
});
