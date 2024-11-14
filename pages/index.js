// "use client";
import Login from "@/components/Login";
import { AuthActions } from "@/pages/auth/utils";
import { fetcher } from "@/pages/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";

const Home = () => {
  const router = useRouter();

  const { data: user } = useSWR("/auth/users/me", fetcher);

  const { logout, removeTokens } = AuthActions();

  const handleLogout = () => {
    logout()
      .res(() => {
        removeTokens();

        router.push("/");
      })
      .catch(() => {
        removeTokens();
        router.push("/");
      });
  };
  return (
    <main>
      <Login />
      <button onClick={handleLogout}>Log out</button>
    </main>
  );
};

export default Home;
