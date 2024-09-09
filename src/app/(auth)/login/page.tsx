import { login, signup } from "../actions";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="w-full max-w-md rounded-lg bg-background-card p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-text-primary">
          Welcome Back
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-primary"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 bg-background-card p-3 text-text-primary shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-primary"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 bg-background-card p-3 text-text-primary shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <button
              formAction={login}
              className="w-full rounded-md bg-primary px-4 py-2 text-white shadow transition hover:bg-primary-dark"
            >
              Log in
            </button>
            <button
              formAction={signup}
              className="w-full rounded-md border border-primary px-4 py-2 text-primary shadow transition hover:bg-primary-dark hover:text-white"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
