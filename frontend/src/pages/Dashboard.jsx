import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import StatsOverview from '../components/StatsOverview';
import SkillMatches from '../components/SkillMatches';
import UpcomingSessions from '../components/UpcomingSessions';
import CreateSessionForm from '../components/CreateSessionForm';
import Announcements from '../components/Announcements';
import ProfileShowcase from '../components/ProfileShowcase';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <DashboardHeader userName="Kartik" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <StatsOverview />
        <UpcomingSessions />
        <CreateSessionForm />
      </div>

      <div className="mt-10">
        <SkillMatches />
      </div>

      <div className="mt-10">
        <ProfileShowcase />
      </div>

      <div className="mt-10">
        <Announcements />
      </div>
    </div>
  );
};

export default Dashboard;
