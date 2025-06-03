import { logout } from "@/actions/auth"
import { isFeatureEnabled } from "@/utils/featureflags-service"
import ActionBtn from "./action-btn";

const LogoutBtn = ({ translations }: { translations: string }) => {
    const isAuthEnabled = isFeatureEnabled("auth");
    if (!isAuthEnabled) return;

    return (
        <ActionBtn
            onclick={logout}
            className="w-full items-start bg-danger/10 hover:bg-danger/20 text-foreground rounded-lg"
        >{translations}</ActionBtn>
    )
}

export default LogoutBtn