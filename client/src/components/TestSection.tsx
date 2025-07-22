import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TestSectionProps {
  id?: string;
  title: string;
  icon: string;
  iconColor?: string;
  children: ReactNode;
}

export function TestSection({ id, title, icon, iconColor = "text-primary", children }: TestSectionProps) {
  return (
    <section id={id} className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <i className={`${icon} ${iconColor} mr-3`} />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </section>
  );
}
