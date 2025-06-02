import { logout } from "@/actions/auth"
import { isFeatureEnabled } from "@/utils/featureflags-service"
import ActionBtn from "./action-btn";

const LogoutBtn = () => {
    const isAuthEnabled = isFeatureEnabled("auth");
    if (!isAuthEnabled) return;

    return (
        <ActionBtn
            onclick={logout}
            className="w-full items-start bg-danger/10 hover:bg-danger/20 text-foreground rounded-lg"
        >Logout</ActionBtn>
    )
}

export default LogoutBtn