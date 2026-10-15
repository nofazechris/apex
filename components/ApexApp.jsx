'use client';

import ApexView from '@/components/ApexView';
import useApex from '@/hooks/useApex';

export default function ApexApp() {
  const vm = useApex();
  return <ApexView vm={vm} />;
}
