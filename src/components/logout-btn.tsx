import { logout } from "@/actions/auth"
import { isFeatureEnabled } from "@/utils/featureflags-service"

const LogoutBtn = () => {
    const isAuthEnabled = isFeatureEnabled("auth");
    if (!isAuthEnabled) return;

    return <button onClick={logout} className="cursor-pointer">Logout</button>
}

export default LogoutBtn