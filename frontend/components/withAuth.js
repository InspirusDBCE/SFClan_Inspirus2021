/* eslint-disable react/display-name */

import { useRouter } from "next/router";
import useAuth from "../contexts/auth";
import AuthLayout from "../layouts/auth";

export default function withAuth(Component) {
  return (props) => {
    const { user } = useAuth();
    const router = useRouter();

    if (!user) router.push("/bus/login");

    return (
      <AuthLayout>
        <Component {...props} />
      </AuthLayout>
    );
  };
}
