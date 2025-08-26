import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to brand guidelines as the main landing page
  redirect('/brand-guidelines?org=habo-if');
}
