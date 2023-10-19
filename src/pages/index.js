import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const loginUser = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/login', {
      body: JSON.stringify({
        email: event.target.email.value,
        password: event.target.password.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const result = await res.json();

    if (res.status === 200) {
      // Login successful
      router.push('/dashboard');
    } else {
      // Login failed
      alert(`Failed to log in: ${result.message}`);
    }
  };

  return (
      <div className="flex items-center justify-center h-screen">
        <form className="bg-white p-6 rounded-lg" onSubmit={loginUser}>
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
                id="email"
                type="email"
                name="email"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
                id="password"
                type="password"
                name="password"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Your password"
            />
          </div>
          <button
              type="submit"
              className="w-full px-3 py-2 text-white bg-blue-500 rounded-md mb-2"
          >
            Login
          </button>
          <a href="/register" className="w-full px-3 py-2 text-white bg-blue-500 rounded-md block text-center">
            Register
          </a>
        </form>
      </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  // Get the user's session based on the request
  const { req } = context;
  const { cookie } = req.headers;

  // Check for the presence of the cookie and validate it (you'll need to implement your own validation logic)
  if (cookie) {
    const isValid = true; // Replace this with your validation logic

    if (isValid) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
