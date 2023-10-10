import Navbar from '@/components/Navbar/Navbar'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal  from '@/components/modals/LoginModal'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from '@/components/modals/RentModal'
import { headers } from 'next/headers'
import logoCircle from '@/public/images/logo_circle.png'



export function generateMetadata() {
  const headersList = headers();

  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto');
  const url = headersList.get('next-url');

  const existsUrl = url ? url : '';

  const baseUrl = (protocol as string) + '://' + (host as string) + existsUrl;
  return {
    title: 'Airbnb',
    description: 'Airbnb clone',
    openGraph: {
      images: [baseUrl + logoCircle.src],
    },
  };
}

const font = Nunito({
  subsets: ["latin"]
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className} >
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <div className='pb-20 pt-28'>
        {children}
        </div>
      </body>
    </html>
  )
}