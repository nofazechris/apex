import Landing from '@/components/views/Landing';
import Auth from '@/components/views/Auth';
import Onboarding from '@/components/views/Onboarding';
import ExamRoom from '@/components/views/ExamRoom';
import AppShell from '@/components/views/AppShell';

export default function ApexView({ vm }) {
  const { isApp, isAuth, isExam, isLanding, isOnboarding } = vm;
  return (
    <div style={{ minHeight: '100vh', color: '#021024' }}>
      {isLanding ? <Landing vm={vm} /> : null}
      {isAuth ? <Auth vm={vm} /> : null}
      {isOnboarding ? <Onboarding vm={vm} /> : null}
      {isExam ? <ExamRoom vm={vm} /> : null}
      {isApp ? <AppShell vm={vm} /> : null}
    </div>
  );
}
