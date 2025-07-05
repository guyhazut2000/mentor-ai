import { redirect } from "next/navigation";
import { appConfig } from "@/app-config";

const HomePage = async () => {
  redirect(appConfig.routes.signIn);
};

export default HomePage;
