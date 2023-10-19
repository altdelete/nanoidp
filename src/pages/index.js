import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../contexts/UserContext'; // adjust the import to your file structure

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [user]);

  return null; // You can return null or some loading indicator
}

// This gets called on every request
// export async function getServerSideProps(context) {
//   // Get the user's session based on the request
//   const { req } = context;
//   const { cookie } = req.headers;
//
//   // Check for the presence of the cookie and validate it (you'll need to implement your own validation logic)
//   if (cookie) {
//     const isValid = true; // Replace this with your validation logic
//
//     if (isValid) {
//       return {
//         redirect: {
//           destination: '/dashboard',
//           permanent: false,
//         },
//       };
//     }
//   }
//
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }
