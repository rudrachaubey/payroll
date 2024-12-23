import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Settings from './pages/Settings';
import Alerts from './pages/UiElements/Alerts';
import DefaultLayout from './layout/DefaultLayout';
import ResumeUploadForm from './pages/TechRecruiter/ResumeManagement/ResumeUpload';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const router = createBrowserRouter([
    {
      path: '/dashboard',
      element: (
        <DefaultLayout>
          <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <ECommerce />
        </DefaultLayout>
      ),
    },
    {
      path: '/settings',
      element: (
        <DefaultLayout>
          <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Settings />
        </DefaultLayout>
      ),
    },
    {
      path: '/chart',
      element: (
        <DefaultLayout>
          <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Chart />
        </DefaultLayout>
      ),
    },
    {
      path: '/ui/alerts',
      element: (
        <DefaultLayout>
          <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Alerts />
        </DefaultLayout>
      ),
    },
    {
      path: '/auth/signin',
      element: (
        <>
          <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <SignIn />
        </>
      ),
    },
    {
      path: '/auth/signup',
      element: (
        <>
          <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <SignUp />
        </>
      ),
    },
    // ------> Tech recruiter
    {
      path: '/resume-upload',
      element: (
        <>
          <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <ResumeUploadForm/>
        </>
      ),
    },

  ]);

  return loading ? <Loader /> : <RouterProvider router={router} />;
}

export default App;
